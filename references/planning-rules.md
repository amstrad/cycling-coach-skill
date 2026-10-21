# Planning rules — constraints every week must satisfy

Apply these after choosing sessions and before writing files. They are written as checks so an algorithm can run them in order: hard constraints first, then sequencing, then the push/hold decision. They apply to cycling and running alike; sport-specific additions live in `running-model.md`. Every number here is mirrored in `assets/rules.json`, and `scripts/validate-week.mjs` checks a week plan against it, reporting the codes listed at the end of this guide.

## Definitions

- **Hard day:** any targeted interval session (threshold-type or HI), a race, a benchmark test, a hard group ride (`re` high or NP ≥ 0.85 × FTP), a long ride over 3 h, or a long run over 90 min. Heavy lower-body gym is not a hard day for spacing; it has its own placement rule (6).
- **Gap:** the number of calendar days from one session to the next. Consecutive days have a gap of 1; Tuesday to Thursday is a gap of 2.
- **High-intensity (HI) session:** work at or above ~106% FTP (VO2max, 30/15s, 40/20s, shrinking ladder, anaerobic, sprint) or, for runners, at or faster than 10k pace.
- **Threshold-type session:** sub-threshold, threshold, oscillating threshold, tempo, low-cadence force at ≥ 75% FTP.
- **Easy day:** Z1–Z2 only, no efforts above 75% FTP except optional 10 s spin-ups or strides.
- **Residual fatigue** (time before the next quality session is reliable): Z2 < 24 h · threshold-type 24–48 h · HI 48–72 h · long ride > 3 h or long run > 90 min 48 h · race or max test 72 h · heavy gym 48 h for the legs.

## Hard constraints (never violate)

| # | Rule | Why |
|---|------|-----|
| 1 | Never two HI sessions on consecutive days. | VO2max quality depends on freshness; the second session degrades and injury risk rises. |
| 2 | Never three hard days in a row, in any combination of sport, race, or group ride. | Cumulative fatigue outpaces adaptation. |
| 3 | Spacing by age. Under 40: at most 2 hard days in a row; HI to HI gap ≥ 2. 40–49: no back-to-back hard days (gap ≥ 2); HI to HI gap ≥ 3. 50–59: no back-to-back hard days; after an HI session or race, the next hard day has a gap ≥ 3. 60+: every hard-to-hard gap ≥ 3. | Recovery slows with age (`coaching-model.md`). |
| 4 | Maximum HI sessions per week: 1 for every level, paired with one threshold-type session (beginners: 0 until 8 consistent weeks). Peak phase: 2 for intermediate and advanced, where the second is race simulation. Advanced athletes under 40 in the single HI-block week (≥ 6 training days, readiness high; `periodization.md`): 3. A hard bike session and a hard run session both count. | Two HI sessions of the same system double the recovery cost for little extra gain. |
| 5 | No HI session the day after a race, max test, long ride > 3 h, or long run > 90 min. | Glycogen and neuromuscular recovery are incomplete. |
| 6 | Heavy lower-body gym: same day as a hard session (session first, gym ≥ 4 h later) or on an easy day. Never the day before an HI or threshold-type session, a long run, a test, or a race; avoid the day before a hard group ride. | Strength DOMS wrecks interval quality; running impact on sore muscles is an injury risk. |
| 7 | Deload week: 3:1 by default (every 4th week); 2:1 (every 3rd week) for 50+, beginners, and anyone who failed the push test two weeks running. A block never runs more than 5 weeks without a deload. Volume −35–45 %, one short intensity touch at about two-thirds of the reps, benchmark only in the final two days. | Adaptation consolidates during the unload. |
| 8 | Do not raise an interval progression step and weekly volume (> 10 % hours or TSS) in the same week. Change one lever at a time. | Isolates the stimulus; limits injury and burnout risk. |
| 9 | Weekly ramp cap: hours or TSS +10 % per week; CTL +3–5 per week sustained, up to +7 for one or two weeks (advanced only). After a missed week, resume at the last completed level, not the planned one. | ACWR stays inside 0.8–1.3. |
| 10 | Benchmarks (FTP test, time trial, 5k test) only when fresh: after ≥ 1 rest day, at the end of a deload week, never within 7 days of illness. | A fatigued test sets every zone wrong for the next block. |
| 11 | Illness: fever or symptoms below the neck (chest, muscle aches, gut) → no training until 48 h symptom-free, then 3 easy days. Above-the-neck cold without fever → easy only, no intensity. Resume at about 70 % of the pre-illness volume; add 1 easy day per day of fever before the first HI session. Chest pain, palpitations, or unusual breathlessness on return → stop and see a physician. | Myocarditis and relapse risk. |
| 12 | Readiness override: `training_readiness` < 40, HRV `low`, sleep < 6 h, or resting HR +5 bpm over baseline on a key-session morning → swap that session to Z2. Move it later in the week only if rules 1–3 still pass; otherwise drop it (`adjustments.md`). | See `garmin-snapshot.md`. |
| 13 | Two consecutive weeks of unplanned missed key sessions → do not advance the plan; repeat the week at the same step. | The progression only means something when the previous step was completed. |

## Sequencing inside the week

1. **Rest day** on Monday by default (after weekend volume), or the day after the hardest session.
2. **First key session** on the day after a rest or easy day. Put the HI session first in the week (freshest legs), threshold-type second. Example: Tue HI, Thu threshold-type, Sat social, Sun long.
3. **Long ride / long run** at the weekend; the next day is easy or rest. Do not place it the day before an HI session.
4. **Social ride** counts as the hard day it turns out to be. If Saturday ran hard, the following midweek keeps only one targeted session.
5. **Gym** goes on the hard-ride day (after the ride) or on a rest day, never the day before intervals or a long run.
6. **Strides, spin-ups, torque starts** are allowed on easy days because their metabolic cost is small; keep total sprint volume under 2 min per day.
7. **Two sports in one day:** the quality session goes first. Run after a hard bike session only for duathletes practising a brick. Do not run hard the morning after a hard ride.
8. **Time-crunched (< 5 h/week):** drop Z2 filler before dropping intensity. Keep 2 key sessions + 1 longer ride; make the long ride the third quality day by adding tempo inside it only when rule 2 allows.

## Intensity distribution (check weekly, by time in zone)

| Rider volume | Z1–Z2 | Z3–Z4 (tempo, sweet spot, threshold) | ≥ Z5 (VO2, anaerobic) |
|---|---|---|---|
| < 6 h / week | 65–75 % | 15–25 % | 5–10 % |
| 6–10 h / week | 75–80 % | 10–15 % | 5–10 % |
| > 10 h / week | 80–85 % | 8–12 % | 5–8 % |

Riders with low volume naturally sit "pyramidal"; higher volume moves toward "polarized". Either is acceptable as long as the easy time is genuinely easy (≤ 70 % FTP, conversational). Grey-zone riding (75–85 % FTP on easy days) is the most common planning fault: it adds fatigue without a distinct stimulus.

## Push or hold — the progression decision

Evaluate after each key session; decide at the weekly check-in.

| Signal | Push (+1 step) | Hold (repeat step) | Step down (−1) |
|---|---|---|---|
| Last two key sessions | both completed at ≥ 95 % of target power/pace | one missed by > 5 % | both missed, or one abandoned |
| RPE vs expected | at or below | +1 | +2 or more |
| Readiness / HRV | high or balanced | moderate | low / unbalanced |
| Sleep (7-day average) | ≥ 7 h | 6–7 h | < 6 h |
| ACWR | 0.8–1.2 | 1.2–1.3 | > 1.3 or < 0.7 after illness |
| Life stress (self-report) | normal | elevated | high |

Push only when every row sits in the Push column. Any row in Hold or one row in Step down → hold. Two Step-down rows → step down. Three or more → convert the week to a deload. A step down never goes below step 1; if step 1 fails, replace the pattern with the threshold-type session one intensity level lower.

## Age — what changes besides spacing

| Age | Hard days / week | Warm-up | Strength | Deload | Notes |
|---|---|---|---|---|---|
| < 30 | up to 3 (advanced) | 10 min | 1× in season | 3:1 | Tolerates HI blocks; volume ramps faster. |
| 30–39 | 2–3 | 10–15 min | 1× | 3:1 | Standard model. |
| 40–49 | 2 | 15 min | 1–2× | 3:1, 2:1 after two failed push tests | Keep HI work (it protects VO2max) but cut reps by ~20 %; prioritise sleep. |
| 50–59 | 2 | 15–20 min | 2× non-negotiable | 2:1 | Cut volume before intensity. Keep one HI touch weekly; muscle and VO2max fall fastest without it. |
| 60+ | 1–2 | 20 min | 2× | 2:1 | 2 easy days after every hard day; longer tapers (+3–4 days); Z2 caps at 2.5–3 h. |

Under 18 is outside this skill's scope; say so and keep everything easy and playful.

## Level — what changes

See `athlete-levels.md` for the classification. In short: beginners earn volume before intensity (no HI work in the first 8 consistent weeks), intermediates run the standard 2-key-session model, advanced riders can use short blocks and the 3-HI exception.

## Things to consider

- **Indoor vs outdoor FTP:** indoor is often 3–5 % lower. Use the indoor number for `.zwo` targets and say so.
- **Heat:** first 10–14 days of hot weather, lower targets 3–5 % and shorten HI reps; hydration cue in the schedule.
- **Altitude (> 1,500 m):** lower threshold targets ~5–7 % for the first week; HI work by RPE.
- **Travel / shift work:** treat a night of < 5 h sleep as readiness low for the next day.
- **Energy availability:** unexplained performance drop, missed menstrual cycles, frequent illness, or persistent low HRV are red flags for under-fuelling; flag it and recommend a physician or dietitian. Never prescribe weight loss.
- **Female athletes:** keep the model the same, but let the rider flag phases of low energy or heavy symptoms and treat those days as "hold". Iron status matters for endurance; suggest a check when fatigue is unexplained.
- **Fuelling:** rides > 90 min or any HI session need carbohydrate (60–90 g/h on long rides). Put the cue in the schedule; under-fuelled intervals fail and get mis-scored as "unfit".
- **Returning from a break (> 2 weeks off):** 2 weeks of Z2 and strength only, then reintroduce one threshold-type session, then HI.

## Things to avoid (final checklist)

- Two HI days in a row, or HI the day after a race or long day.
- Threshold work the day after HI when the rider is 40+.
- Heavy squats the day before intervals or a long run.
- "Hard" easy days (Z3 drift on recovery rides).
- Advancing a step the rider did not complete.
- Raising volume and intensity together.
- FTP tests while fatigued or sick.
- Skipping the deload because the rider "feels fine".
- Prescribing more than `targetedSessionCap` key sessions, even when asked, without explaining the trade-off.
- Copying last week's exact pattern (see rotation in `interval-catalog.md`).

## Validator codes

`scripts/validate-week.mjs` reports these codes. Errors block delivery; warnings go into the schedule notes.

| Code | Rule | Level |
|---|---|---|
| `HI_CONSECUTIVE` | 1 | error |
| `THREE_HARD_IN_ROW`, `CONSECUTIVE_HARD` | 2, 3 | error |
| `GAP_HI_HI`, `GAP_HI_HARD`, `GAP_HARD_HARD` | 3 | error |
| `HARD_DAYS_MAX` | age and level tables | error |
| `HI_COUNT_MAX` | 4 | error |
| `KEY_SESSIONS_MAX` | `targetedSessionCap`, level | error |
| `HI_AFTER_BIG_DAY` | 5 | error |
| `GYM_BEFORE_KEY` / `GYM_BEFORE_GROUP_RIDE` | 6 | error / warning |
| `DELOAD_LOAD`, `BLOCK_TOO_LONG` | 7 | error |
| `RAMP_TSS` | 9 | error |
| `STEP_JUMP`, `STEP_RANGE` / `STEP_ON_DELOAD` | 13, progression | error / warning |
| `RUN_HARD_DAYS`, `RUN_SPEED_AFTER_LONG`, `RUN_LONG_AFTER_SPEED`, `RUN_RAMP`, `RUN_LONG_SHARE`, `RUN_QUALITY_CAP`, `IMPACT_CONSECUTIVE` | R1–R5, R8 | error |
| `RUN_LONG_DURATION` | R4 | error above 3 h, warning above the level guide |
| `NO_REST_DAY`, `TSS_BAND`, `LONG_RIDE_LEVEL`, `ROTATION_MISMATCH`, `TSS_UNKNOWN`, `RUN_DISTANCE_MISSING` | sequencing, load bands, rotation | warning |
