#!/usr/bin/env node
// Repository checks: skill frontmatter, guide links, rules consistency, and examples.
// Run with `npm test`. Exits 1 on any failure.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePlan, loadPlan, loadRules } from '../scripts/validate-week.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ok  ${msg}`);

// 1. Frontmatter (Agent Skills format)
const skill = readFileSync(join(ROOT, 'SKILL.md'), 'utf8');
const fm = skill.match(/^---\n([\s\S]*?)\n---/);
if (!fm) fail('SKILL.md has no frontmatter');
else {
  const get = (k) => (fm[1].match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1];
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const name = get('name');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name || '') || name.length > 64) fail(`skill name "${name}" must be lowercase-hyphenated, at most 64 chars`);
  if (name !== pkg.name) fail(`skill name "${name}" differs from package.json name "${pkg.name}"`);
  const desc = get('description') || '';
  if (!desc || desc.length > 1024) fail(`description length ${desc.length} must be 1-1024`);
  const compat = get('compatibility') || '';
  if (compat.length > 500) fail(`compatibility length ${compat.length} exceeds 500`);
  const ver = (fm[1].match(/^  version: (.*)$/m) || [])[1];
  if (ver !== pkg.version) fail(`SKILL.md version ${ver} differs from package.json ${pkg.version}`);
  if (!failures.length) ok(`frontmatter (${name} ${ver}, description ${desc.length} chars)`);
}

// 2. Every referenced guide, rule, script, or example path exists
const docs = ['SKILL.md', 'README.md', ...readdirSync(join(ROOT, 'references')).map((f) => `references/${f}`)];
let refs = 0;
for (const doc of docs) {
  const text = readFileSync(join(ROOT, doc), 'utf8');
  for (const m of text.matchAll(/`((?:references|assets|scripts|examples|tools)\/[\w./-]+|[\w-]+\.md)`/g)) {
    const ref = m[1];
    if (['SKILL.md', 'README.md', 'CHANGELOG.md'].includes(ref)) continue;
    if (/YYYY|<|\*|\d{4}-W\d{2}/.test(ref)) continue;
    refs++;
    const candidates = ref.includes('/') ? [join(ROOT, ref)] : [join(ROOT, 'references', ref), join(ROOT, ref)];
    if (!candidates.some(existsSync)) fail(`${doc} references missing file ${ref}`);
  }
}
ok(`${refs} file references checked`);

// 2b. Every shipped file is named in SKILL.md (Hermes URL/GitHub installs copy only referenced files)
const shipped = [
  ...readdirSync(join(ROOT, 'references')).map((f) => `references/${f}`),
  ...readdirSync(join(ROOT, 'assets')).map((f) => `assets/${f}`),
  ...readdirSync(join(ROOT, 'scripts')).map((f) => `scripts/${f}`),
  ...readdirSync(join(ROOT, 'examples/profiles')).map((f) => `examples/profiles/${f}`),
  ...readdirSync(join(ROOT, 'examples/weeks')).map((f) => `examples/weeks/${f}`),
];
for (const f of shipped) if (!skill.includes(`\`${f}\``)) fail(`SKILL.md does not reference shipped file ${f}`);
ok(`${shipped.length} shipped files referenced from SKILL.md`);

// 3. Rules consistency
const rules = loadRules();
for (const [sport, profiles] of Object.entries(rules.rotation)) {
  for (const [p, rows] of Object.entries(profiles)) {
    rows.forEach((row, i) => row.forEach((pat) => { if (!rules.sessions[pat]) fail(`rotation ${sport}.${p}[${i}] uses unknown pattern ${pat}`); }));
    if (sport === 'cycling') rows.forEach((row, i) => {
      const hi = row.filter((pat) => rules.sessions[pat]?.class === 'hi').length;
      if (hi > 1) fail(`rotation cycling.${p}[${i}] pairs two HI sessions`);
    });
  }
}
let prevMax = 17;
for (const b of rules.age) { if (b.minAge !== prevMax + 1) fail(`age band ${b.id} does not continue from ${prevMax}`); prevMax = b.maxAge; }
for (const [id, s] of Object.entries(rules.sessions)) {
  if (!rules.classes[s.class]) fail(`session ${id} has unknown class ${s.class}`);
  if (Array.isArray(s.tss) && s.tss.length !== rules.progression.maxStep) fail(`session ${id} needs ${rules.progression.maxStep} tss steps`);
}
ok(`rules.json (${Object.keys(rules.sessions).length} sessions, ${rules.age.length} age bands)`);

// 3b. Strava tag table only uses known pattern ids
const strava = readFileSync(join(ROOT, 'references/strava-sync.md'), 'utf8');
for (const line of strava.split('\n').filter((l) => /^\| ("|\*\(runs\)\*)/.test(l))) {
  for (const m of line.split('|')[2].matchAll(/`([\w-]+)`/g)) {
    if (!rules.sessions[m[1]]) fail(`strava-sync.md tags unknown pattern ${m[1]}`);
  }
}
ok('Strava tag table uses known pattern ids');

// 4. Example profiles carry the required fields
const required = ['name', 'language', 'units', 'sport', 'objective', 'age'];
for (const f of readdirSync(join(ROOT, 'examples/profiles'))) {
  const p = JSON.parse(readFileSync(join(ROOT, 'examples/profiles', f), 'utf8'));
  const missing = required.filter((k) => p[k] == null);
  if (missing.length) fail(`examples/profiles/${f} is missing ${missing.join(', ')}`);
}
ok('example profiles');

// 5. Valid weeks pass; invalid weeks fail with exactly the expected codes
for (const f of readdirSync(join(ROOT, 'examples/weeks')).filter((x) => x.endsWith('.json'))) {
  const { plan, profile } = loadPlan(join(ROOT, 'examples/weeks', f));
  const res = validatePlan(plan, profile, rules);
  if (res.errors.length) fail(`examples/weeks/${f} should pass but has ${res.errors.map((e) => e.code).join(', ')}`);
  else ok(`examples/weeks/${f} passes (${res.summary.tss} TSS, ${res.warnings.length} warnings)`);
}
for (const f of readdirSync(join(ROOT, 'examples/invalid')).filter((x) => x.endsWith('.json'))) {
  const { plan, profile } = loadPlan(join(ROOT, 'examples/invalid', f));
  const res = validatePlan(plan, profile, rules);
  const got = [...new Set(res.errors.map((e) => e.code))].sort();
  const want = [...new Set(plan.expectErrors || [])].sort();
  if (JSON.stringify(got) !== JSON.stringify(want)) fail(`examples/invalid/${f}: expected [${want}] but got [${got}]`);
  else ok(`examples/invalid/${f} fails with ${got.join(', ')}`);
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:`);
  for (const f of failures) console.error(`  FAIL ${f}`);
  process.exit(1);
}
console.log('\nall checks passed');
