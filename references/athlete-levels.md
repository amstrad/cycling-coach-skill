# Athlete levels — classify, then scale the plan

Level decides how much volume, how many key sessions, how fast the progression moves, and how often the plan unloads. Derive it from the profile and synced history; never ask the rider to self-rate as the only input.

## Classification

Score each row, then sum. Use the sport the plan is for.

| Input | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Training age (`trainingAgeYears`, consistent years) | < 1 | 1–3 | 3–6 | > 6 |
| Weekly hours (`weeklyHours` or last 8-week average) | < 4 | 4–7 | 7–11 | > 11 |
| Performance (cycling W/kg or running VDOT, table below) | untrained | fair | good | very good / excellent |
| Consistency (weeks with ≥ 3 sessions in the last 8) | ≤ 3 | 4–5 | 6–7 | 8 |

| Total | Level |
|---|---|
| 0–3 | **Beginner** |
| 4–7 | **Intermediate** |
| 8–12 | **Advanced** (elite programming is out of scope) |

If the profile sets `level`, it wins, but note any mismatch with the derived score.

### Performance reference — cycling (FTP ÷ weight, W/kg)

| Band | Male | Female |
|---|---|---|
| Untrained | < 2.5 | < 2.0 |
| Fair | 2.5–3.2 | 2.0–2.7 |
| Good | 3.2–3.8 | 2.7–3.3 |
| Very good | 3.8–4.5 | 3.3–4.0 |
| Excellent | > 4.5 | > 4.0 |

Gender unknown → use the midpoint of the two columns. Age 50+ → shift each boundary down 0.2 W/kg; 60+ → 0.4 W/kg.

### Performance reference — running (recent race, any distance)

| Band | 5k | 10k | Half | Marathon |
|---|---|---|---|---|
| Untrained | > 30:00 | > 62:00 | > 2:20 | > 4:50 |
| Fair | 25–30 | 52–62 | 1:58–2:20 | 4:05–4:50 |
| Good | 21–25 | 44–52 | 1:38–1:58 | 3:25–4:05 |
| Very good | 18–21 | 38–44 | 1:24–1:38 | 2:58–3:25 |
| Excellent | < 18 | < 38 | < 1:24 | < 2:58 |

Times are gender-neutral; for female runners shift one band up when the time sits within 8 % of the next boundary. Convert between distances with Riegel: `T2 = T1 × (D2 ÷ D1) ^ 1.06`.

## What each level gets

| Parameter | Beginner | Intermediate | Advanced |
|---|---|---|---|
| Key (hard) sessions / week | 1 (threshold-type only; no HI for the first 8 consistent weeks) | 2 (1 HI + 1 threshold-type) | 2 (1 HI + 1 threshold-type), up to 3 HI inside a short HI block |
| Weekly hours (cycling) | 3–6 | 6–10 | 10–15 |
| Weekly km (running) | 15–30 | 30–55 | 55–90 |
| Long ride / run | ≤ 2 h / ≤ 75 min | 2–3.5 h / 90–150 min | 3–5 h / up to 180 min |
| Volume ramp | +5–8 %/wk, hold every 3rd week | +8–10 %/wk | +10 %/wk, blocks allowed |
| Progression | advance a step every 2 weeks | every week when "push" | every week; may jump two steps after a deload test |
| Deload | every 3rd week | every 4th (3rd if 40+) | every 4th (3rd if 50+) |
| Strength | 2× (movement quality, light) | 1–2× | 1–2×, heavier |
| Starting intensity | sub-threshold at 85–88 %, tempo | full catalog | full catalog plus blocks |
| Session RPE ceiling on easy days | 3/10 | 3/10 | 3–4/10 |

### Beginner specifics

- First four weeks: frequency before duration, duration before intensity. Three sessions a week, all easy plus strides or spin-ups.
- Introduce sub-threshold (2 × 10 min at 85 %) in week 5, extend by 5 min per block before raising %.
- Do not use the derived power profile to pick sessions until there is at least one maximal 5-min and one 20-min effort on record; before that, treat the rider as `balanced`.
- Technique counts as training: cadence drills, bunch skills, run form cues.

### Intermediate specifics

- The default model in `coaching-model.md` applies unchanged.
- The most common fault at this level is too much Z3: enforce the easy-day RPE ceiling.
- Benchmark every 6–8 weeks.

### Advanced specifics

- May use an HI block: 1 week with 3 HI sessions and Z2 otherwise, then 2–3 weeks at the normal 1 HI per week, then a deload. At most twice per season, under 40 only.
- Can combine a quality session with a long ride (tempo in the final hour) when rule 2 in `planning-rules.md` allows.
- Needs the most explicit deload discipline; fitness is high enough that fatigue masks itself.

## Time-crunched modifier

If `weeklyHours` < 5 regardless of level: 2 key sessions + 1 longer ride, no filler, intensity slightly higher per session (sweet spot over Z2), deload by dropping one key session rather than cutting hours further.

## Returning athletes

A rider with a high training age but a gap of > 8 weeks starts one level lower for 4 weeks, then re-scores.
