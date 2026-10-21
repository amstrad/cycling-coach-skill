#!/usr/bin/env node
// Validate a structured week plan against assets/rules.json.
// Usage: node scripts/validate-week.mjs <plan.json> [--profile athlete-profile.json] [--json]
// Exit code: 0 = no errors (warnings allowed), 1 = rule errors, 2 = bad input.

import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const KEY_CLASSES = new Set(['threshold', 'hi', 'test']);

export function loadRules(path = resolve(HERE, '../assets/rules.json')) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function ageBand(rules, age) {
  return rules.age.find((b) => age >= b.minAge && age <= b.maxAge);
}

function sessionTss(rules, s, report, where) {
  if (typeof s.tss === 'number') return s.tss;
  const def = rules.sessions[s.pattern];
  if (!def) return 0;
  const step = s.step ?? 1;
  if (Array.isArray(def.tss)) return def.tss[Math.min(step, def.tss.length) - 1];
  if (typeof def.tss === 'number') return def.tss;
  const perHour = s.hard && def.tssPerHourHard ? def.tssPerHourHard : def.tssPerHour;
  if (perHour && typeof s.durationMin === 'number') return Math.round((perHour * s.durationMin) / 60);
  if (s.pattern === 'race' && typeof s.durationMin === 'number') return Math.round((70 * s.durationMin) / 60);
  report.warn('TSS_UNKNOWN', where, `cannot estimate load for "${s.pattern}"; add durationMin or tss`);
  return 0;
}

function classifyDay(rules, day) {
  const t = rules.hardDayThresholds;
  const out = { hard: false, hi: false, hiLike: false, race: false, longHard: false, longRunHard: false,
    hiRun: false, strength: false, impact: false, rest: true, key: 0, hiCount: 0, socialHard: false };
  for (const s of day.sessions || []) {
    const def = rules.sessions[s.pattern];
    if (!def) continue;
    const c = def.class;
    if (c !== 'rest' && c !== 'core') out.rest = false;
    if (KEY_CLASSES.has(c)) { out.hard = true; out.key += 1; }
    if (c === 'hi') { out.hi = true; out.hiLike = true; out.hiCount += 1; if (def.sport === 'run') out.hiRun = true; }
    if (c === 'test') out.hiLike = true;
    if (c === 'race') { out.hard = true; out.race = true; out.hiLike = true; }
    if (c === 'social' && s.hard) { out.hard = true; out.socialHard = true; }
    if (c === 'long') {
      const limit = def.sport === 'run' ? t.longRunMin : t.longRideMin;
      if ((s.durationMin ?? 0) > limit) {
        out.hard = true; out.longHard = true;
        if (def.sport === 'run') out.longRunHard = true;
      }
    }
    if (c === 'strength') out.strength = true;
    if (def.impact || c === 'strength') out.impact = out.impact || Boolean(def.impact) || c === 'strength';
  }
  return out;
}

export function validatePlan(plan, profile = {}, rules = loadRules()) {
  const errors = [];
  const warnings = [];
  const report = {
    error: (code, where, msg) => errors.push({ code, where, msg }),
    warn: (code, where, msg) => warnings.push({ code, where, msg }),
  };

  // ---- input shape -------------------------------------------------------
  const a = { ...profile, ...(plan.athlete || {}) };
  if (!plan.week || !/^\d{4}-W\d{2}$/.test(plan.week)) report.error('SCHEMA_WEEK', 'plan', 'week must look like 2026-W44');
  if (!Array.isArray(plan.days) || plan.days.length !== 7 || plan.days.some((d, i) => d.day !== DAYS[i])) {
    report.error('SCHEMA_DAYS', 'plan', 'days must list Mon..Sun in order, exactly once each');
    return { errors, warnings, summary: null };
  }
  if (typeof a.age !== 'number') report.error('SCHEMA_AGE', 'athlete', 'age is required (profile or plan.athlete)');
  if (!rules.levels[a.level]) report.error('SCHEMA_LEVEL', 'athlete', 'level must be beginner, intermediate, or advanced; derive it with athlete-levels.md');
  for (const d of [...plan.days, ...((plan.previousWeek || {}).lastDays || [])]) {
    for (const s of d.sessions || []) {
      const def = rules.sessions[s.pattern];
      if (!def) { report.error('SCHEMA_PATTERN', d.day, `unknown pattern "${s.pattern}"`); continue; }
      if (s.step != null && (s.step < 1 || s.step > rules.progression.maxStep)) {
        report.error('STEP_RANGE', d.day, `${s.pattern} step ${s.step} is outside 1..${rules.progression.maxStep}`);
      }
    }
  }
  if (errors.length) return { errors, warnings, summary: null };

  const band = ageBand(rules, a.age);
  if (!band) { report.error('AGE_OUT_OF_SCOPE', 'athlete', 'athletes under 18 are outside this skill; keep training easy and playful'); return { errors, warnings, summary: null }; }
  const level = rules.levels[a.level];
  const deload = plan.weekType === 'deload';
  const hiBlock = Boolean(a.hiBlock) && a.level === 'advanced' && a.age <= (level.hiBlockMaxAge ?? 0);

  // ---- timeline (previous days + this week) ------------------------------
  const prev = plan.previousWeek || {};
  const lastDays = prev.lastDays || [];
  const timeline = [
    ...lastDays.map((d, i) => ({ idx: i - lastDays.length, label: `prev ${d.day}`, current: false, d, c: classifyDay(rules, d) })),
    ...plan.days.map((d, i) => ({ idx: i, label: d.day, current: true, d, c: classifyDay(rules, d) })),
  ];
  const week = timeline.filter((t) => t.current);

  // Rule 1, 5: day-after checks
  for (let i = 1; i < timeline.length; i++) {
    const p = timeline[i - 1], t = timeline[i];
    if (!t.current) continue;
    if (p.c.hi && t.c.hi) report.error('HI_CONSECUTIVE', t.label, 'two high-intensity sessions on consecutive days (rule 1)');
    if (t.c.hi && (p.c.race || p.c.longHard || p.d.sessions?.some((s) => rules.sessions[s.pattern]?.class === 'test'))) {
      report.error('HI_AFTER_BIG_DAY', t.label, 'high-intensity session the day after a race, test, or long hard day (rule 5)');
    }
    if (p.c.longRunHard && t.c.hiRun) report.error('RUN_SPEED_AFTER_LONG', t.label, 'speed session the day after a long run (rule R2)');
    if (p.c.hiRun && t.c.longRunHard) report.error('RUN_LONG_AFTER_SPEED', t.label, 'long run the day after a speed session (rule R2)');
    if (p.c.impact && t.c.impact) {
      const imp = (x) => x.d.sessions.some((s) => rules.sessions[s.pattern]?.impact || s.pattern === 'hill-reps');
      if (imp(p) || imp(t)) report.error('IMPACT_CONSECUTIVE', t.label, 'hill reps, plyometrics, or heavy gym on consecutive days (rule R8)');
    }
  }

  // Rule 2/3: runs of consecutive hard days
  let run = 0;
  for (const t of timeline) {
    run = t.c.hard ? run + 1 : 0;
    if (t.current && run > band.maxConsecutiveHard) {
      const code = run >= 3 ? 'THREE_HARD_IN_ROW' : 'CONSECUTIVE_HARD';
      report.error(code, t.label, `${run} hard days in a row; the limit for age ${a.age} is ${band.maxConsecutiveHard} (rules 2-3)`);
    }
  }

  // Rule 3: minimum gaps
  const hardDays = timeline.filter((t) => t.c.hard);
  for (let i = 0; i < hardDays.length; i++) {
    for (let j = i + 1; j < hardDays.length; j++) {
      const x = hardDays[i], y = hardDays[j];
      if (!y.current) continue;
      const gap = y.idx - x.idx;
      if (x.c.hiLike && y.c.hiLike && gap < band.minGapHiToHi && !(gap === 1)) {
        report.error('GAP_HI_HI', y.label, `only ${gap} days after the high-intensity day ${x.label}; age ${a.age} needs ${band.minGapHiToHi} (rule 3)`);
      } else if (x.c.hiLike && gap < band.minGapHiToHard && gap > 1) {
        report.error('GAP_HI_HARD', y.label, `only ${gap} days after the high-intensity day ${x.label}; age ${a.age} needs ${band.minGapHiToHard} (rule 3)`);
      } else if (gap < band.minGapHardToHard && gap > 1) {
        report.error('GAP_HARD_HARD', y.label, `only ${gap} days after the hard day ${x.label}; age ${a.age} needs ${band.minGapHardToHard} (rule 3)`);
      }
    }
  }

  // Weekly counts
  const hardCount = week.filter((t) => t.c.hard).length;
  const maxHard = Math.min(band.maxHardDays, level.maxHardDays);
  if (hardCount > maxHard) report.error('HARD_DAYS_MAX', 'week', `${hardCount} hard days; the limit for this age and level is ${maxHard}`);

  const hiCount = week.reduce((n, t) => n + t.c.hiCount, 0);
  let maxHi = hiBlock ? level.hiBlockMaxHi : plan.phase === 'peak' ? level.peakMaxHi : level.maxHi;
  if (a.level === 'beginner' && (a.consistentWeeks ?? 0) < level.noHiBeforeConsistentWeeks) maxHi = 0;
  if (hiCount > maxHi) {
    const names = [...new Set(week.flatMap((t) => t.d.sessions.filter((s) => rules.sessions[s.pattern]?.class === 'hi').map((s) => s.pattern)))];
    report.error('HI_COUNT_MAX', 'week', `${hiCount} high-intensity sessions (${names.join(', ')}); the limit is ${maxHi}${maxHi === 0 ? ' until 8 consistent weeks' : ', so pair one HI session with a threshold-type session'} (rule 4)`);
  }

  const keyCount = week.reduce((n, t) => n + t.c.key + (t.c.socialHard ? 1 : 0) + (t.c.race ? 1 : 0), 0);
  const cap = Math.min(a.targetedSessionCap ?? level.maxKeySessions, hiBlock ? level.hiBlockMaxHi : level.maxKeySessions);
  if (keyCount > cap) report.error('KEY_SESSIONS_MAX', 'week', `${keyCount} key sessions including hard group rides and races; the cap is ${cap}`);

  // Rule 6: gym placement
  for (let i = 0; i < week.length - 1; i++) {
    const t = week[i], n = week[i + 1];
    if (!t.c.strength) continue;
    const nextKey = n.c.key > 0 || n.c.race || n.c.longRunHard || n.d.sessions.some((s) => s.pattern === 'long-run');
    if (nextKey) report.error('GYM_BEFORE_KEY', t.label, `heavy gym the day before ${n.label}'s key session, long run, test, or race (rule 6)`);
    else if (n.c.socialHard) report.warn('GYM_BEFORE_GROUP_RIDE', t.label, `heavy gym the day before a hard group ride on ${n.label} (rule 6)`);
  }

  // Rest day
  if (level.needsRestDay && !week.some((t) => t.c.rest)) report.warn('NO_REST_DAY', 'week', 'no rest day this week');

  // Progression
  const prevSteps = prev.patternSteps || {};
  for (const t of week) {
    for (const s of t.d.sessions) {
      if (s.step == null) continue;
      const last = prevSteps[s.pattern];
      if (last != null && s.step > last + 1) report.error('STEP_JUMP', t.label, `${s.pattern} jumps from step ${last} to ${s.step}; advance one step at a time`);
      if (deload && s.step > 1) report.warn('STEP_ON_DELOAD', t.label, `${s.pattern} at step ${s.step} in a deload week; use step 1 at about two-thirds of the reps`);
    }
  }
  if (plan.block && plan.block.week > rules.progression.maxBlockWeeksBeforeDeload) {
    report.error('BLOCK_TOO_LONG', 'week', `block week ${plan.block.week}; deload at least every ${rules.progression.maxBlockWeeksBeforeDeload} weeks (rule 7)`);
  }

  // Rotation (cycling, build phase, informative)
  const profileType = plan.powerProfile || a.powerProfileOverride;
  if ((a.sport ?? 'cycling') !== 'running' && plan.phase === 'build' && plan.block?.index != null && profileType) {
    const rows = rules.rotation.cycling[profileType];
    if (rows) {
      const expected = rows[plan.block.index % 3];
      const bikeKeys = week.flatMap((t) => t.d.sessions).filter((s) => rules.sessions[s.pattern]?.sport === 'bike' && KEY_CLASSES.has(rules.sessions[s.pattern].class)).map((s) => s.pattern);
      const off = bikeKeys.filter((p) => !expected.includes(p));
      if (off.length) report.warn('ROTATION_MISMATCH', 'week', `block ${plan.block.index} for a ${profileType} rider expects ${expected.join(' + ')}; found ${off.join(', ')}`);
    }
  }

  // Load
  const tss = week.reduce((n, t) => n + t.d.sessions.reduce((m, s) => m + sessionTss(rules, s, report, t.label), 0), 0);
  const tol = rules.load.rampTolerancePct / 100;
  if (typeof prev.tss === 'number' && prev.tss > 0) {
    if (deload) {
      const max = prev.tss * rules.load.deloadFactor[1];
      if (tss > max * (1 + tol)) report.error('DELOAD_LOAD', 'week', `deload load ${tss} TSS is above ${Math.round(max)} (65 % of last week) (rule 7)`);
    } else if (prev.weekType !== 'deload') {
      const max = prev.tss * (1 + level.rampPct / 100);
      if (tss > max * (1 + tol)) report.error('RAMP_TSS', 'week', `load ${tss} TSS is more than ${level.rampPct} % above last week's ${prev.tss} (rule 9)`);
    }
  }
  const bandTss = rules.load.weeklyTss[a.level]?.[deload ? 'deload' : 'build'];
  if (bandTss && (tss < bandTss[0] * 0.8 || tss > bandTss[1] * 1.1)) {
    report.warn('TSS_BAND', 'week', `load ${tss} TSS is outside the ${a.level} ${deload ? 'deload' : 'build'} band ${bandTss[0]}-${bandTss[1]}`);
  }

  // Long-day duration by level
  for (const t of week) {
    for (const s of t.d.sessions) {
      if (s.pattern === 'long-ride' && s.durationMin > level.longRideMaxMin) report.warn('LONG_RIDE_LEVEL', t.label, `${s.durationMin} min long ride exceeds the ${a.level} guide of ${level.longRideMaxMin} min`);
      if (s.pattern === 'long-run' && s.durationMin > Math.min(level.longRunMaxMin, rules.running.longRunMaxMin)) {
        const lim = Math.min(level.longRunMaxMin, rules.running.longRunMaxMin);
        (s.durationMin > rules.running.longRunMaxMin ? report.error : report.warn)('RUN_LONG_DURATION', t.label, `${s.durationMin} min long run exceeds ${lim} min (rule R4)`);
      }
    }
  }

  // Running checks
  const runSessions = week.flatMap((t) => t.d.sessions.map((s) => ({ s, t }))).filter(({ s }) => rules.sessions[s.pattern]?.sport === 'run');
  let runKm = null;
  if (runSessions.length) {
    const hardRunDays = week.filter((t) => t.d.sessions.some((s) => {
      const def = rules.sessions[s.pattern];
      return def?.sport === 'run' && (KEY_CLASSES.has(def.class) || (def.class === 'long' && s.durationMin > rules.hardDayThresholds.longRunMin) || def.class === 'race');
    })).length;
    if (hardRunDays > rules.running.maxHardRunDays) report.error('RUN_HARD_DAYS', 'week', `${hardRunDays} hard run days; the limit is ${rules.running.maxHardRunDays} (rule R1)`);

    if (runSessions.every(({ s }) => typeof s.distanceKm === 'number')) {
      runKm = runSessions.reduce((n, { s }) => n + s.distanceKm, 0);
      if (typeof prev.runKm === 'number' && prev.runKm > 0 && !deload && prev.weekType !== 'deload' && runKm > prev.runKm * (1 + rules.running.rampMaxPct / 100) * (1 + tol)) {
        report.error('RUN_RAMP', 'week', `${runKm} km is more than ${rules.running.rampMaxPct} % above last week's ${prev.runKm} km (rule R3)`);
      }
      const marathon = a.eventType === 'marathon';
      const share = marathon ? (plan.phase === 'peak' ? rules.running.longRunMaxShare.marathonPeak : rules.running.longRunMaxShare.marathon) : rules.running.longRunMaxShare.default;
      for (const { s, t } of runSessions) {
        if (s.pattern === 'long-run' && s.distanceKm / runKm > share + 0.005) {
          report.error('RUN_LONG_SHARE', t.label, `long run is ${Math.round((100 * s.distanceKm) / runKm)} % of the week; the limit is ${Math.round(share * 100)} % (rule R4)`);
        }
        if (typeof s.qualityKm === 'number') {
          const def = rules.sessions[s.pattern];
          const capKey = def.intensityCap || (def.class === 'threshold' ? 'threshold' : null);
          const capShare = capKey && rules.running.perSessionCapShare[capKey];
          if (capShare && s.qualityKm > runKm * capShare + 0.05) report.error('RUN_QUALITY_CAP', t.label, `${s.qualityKm} km at quality pace exceeds ${Math.round(capShare * 100)} % of ${runKm} km (rule R5)`);
          if (capKey === 'vo2' && s.qualityKm > rules.running.vo2MaxKm) report.error('RUN_QUALITY_CAP', t.label, `VO2 work over ${rules.running.vo2MaxKm} km (rule R5)`);
        }
      }
    } else {
      report.warn('RUN_DISTANCE_MISSING', 'week', 'add distanceKm to every run to check ramp, long-run share, and quality caps');
    }
  }

  const summary = { week: plan.week, tss, runKm, hardDays: hardCount, hiSessions: hiCount, keySessions: keyCount, ageBand: band.id, level: a.level };
  return { errors, warnings, summary };
}

export function loadPlan(planPath, profilePath) {
  const plan = JSON.parse(readFileSync(planPath, 'utf8'));
  const pPath = profilePath || (plan.profile ? resolve(dirname(planPath), plan.profile) : null);
  const profile = pPath ? JSON.parse(readFileSync(pPath, 'utf8')) : {};
  return { plan, profile };
}

function main(argv) {
  const args = argv.slice(2);
  const json = args.includes('--json');
  const pIdx = args.indexOf('--profile');
  const profilePath = pIdx >= 0 ? args[pIdx + 1] : null;
  const files = args.filter((x, i) => !x.startsWith('--') && !(pIdx >= 0 && i === pIdx + 1));
  if (!files.length) {
    console.error('usage: validate-week.mjs <plan.json> [--profile athlete-profile.json] [--json]');
    process.exit(2);
  }
  let failed = false;
  for (const f of files) {
    let res;
    try {
      const { plan, profile } = loadPlan(f, profilePath);
      res = validatePlan(plan, profile);
    } catch (e) {
      console.error(`${f}: ${e.message}`);
      process.exit(2);
    }
    if (res.errors.length) failed = true;
    if (json) { console.log(JSON.stringify({ file: f, ...res }, null, 2)); continue; }
    console.log(`${f}: ${res.errors.length} error(s), ${res.warnings.length} warning(s)`);
    for (const e of res.errors) console.log(`  ERROR ${e.code} [${e.where}] ${e.msg}`);
    for (const w of res.warnings) console.log(`  WARN  ${w.code} [${w.where}] ${w.msg}`);
    if (res.summary) console.log(`  summary: ${JSON.stringify(res.summary)}`);
  }
  process.exit(failed ? 1 : 0);
}

const isMain = (() => {
  try { return Boolean(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url)); }
  catch { return false; }
})();
if (isMain) main(process.argv);
