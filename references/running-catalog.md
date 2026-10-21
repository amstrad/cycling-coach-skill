# Running catalog — sessions, progressions, example weeks

All paces are relative to threshold pace (T-pace, see `running-model.md`). "MP" = marathon pace, "HMP" = half-marathon pace, "10kP" / "5kP" = race paces. Recovery jogs are Z1. Every quality session has a 15-min easy warm-up with 4 × 20 s strides and a 10-min cool-down unless stated.

## Rotation

Pick 2 hard sessions per week (for half and full marathon the long run is one of them). As for cycling, rotate per block: use `blockIndex mod 3` for the row, keep the pair through the block, and move one progression step each build week.

| Block mod 3 | 5k | 10k | Half marathon | Marathon |
|---|---|---|---|---|
| 0 | VO2 reps + Cruise intervals | 10k-pace reps + Cruise intervals | Cruise intervals + Long run (easy) | Threshold tempo + Long run (easy) |
| 1 | Hill reps + Tempo | Cruise intervals + Progression run | Tempo + Long run with HMP finish | Cruise intervals + Long run with MP segments |
| 2 | VO2 reps (shorter, faster) + Fartlek | VO2 reps + Tempo | 10k-pace reps + Long run (easy) | MP tempo + Long run with fast finish |

Deload week: keep one short quality session (half the reps) and cut the long run by 30–40 %.

## Progression steps

| Session | Step 1 | Step 2 | Step 3 |
|---|---|---|---|
| Cruise intervals (threshold) | 4 × 5 min @ T / 1 min jog | 3 × 8 min @ T / 90 s | 2 × 15 min @ T / 2 min, or 3 × 10 min |
| Threshold tempo | 15 min @ T + 5 s/km | 20 min @ T | 25–30 min @ T (advanced: 40 min @ T + 5 s/km) |
| VO2 reps | 5 × 2 min @ 5kP / 2 min jog | 5 × 3 min @ 5kP / 2.5 min | 6 × 3 min @ 5kP / 2 min, or 5 × 1000 m |
| 10k-pace reps | 5 × 1000 m @ 10kP / 90 s | 4 × 1600 m / 2 min | 5 × 1600 m / 90 s, or 3 × 3000 m / 2.5 min |
| Hill reps | 6 × 60 s @ 5k effort / jog down | 8 × 60 s | 10 × 60 s, or 6 × 90 s |
| Fartlek | 8 × (1 min hard / 1 min easy) | 10 × (1/1) | 6 × (2 min / 1 min) |
| Progression run | 40 min: 20 easy → 10 steady → 10 @ HMP | 50 min: 25/15/10 | 60 min: 30/20/10, last 10 @ T |
| MP tempo | 2 × 20 min @ MP / 3 min easy | 40 min @ MP continuous | 2 × 30 min @ MP, or 60 min @ MP |
| Long run (easy) | +10 % distance per step, max 30 % of week | | |
| Long run with HMP finish | 90 min, last 15 @ HMP | 105 min, last 20 @ HMP | 120 min, last 30 @ HMP |
| Long run with MP segments | 26 km: 3 × 3 km @ MP | 30 km: 2 × 6 km @ MP | 32–35 km: 16 km @ MP continuous (advanced) |
| Strides | 4 × 20 s | 6 × 20 s | 8 × 20 s (on easy days, full recovery) |

Advance one step when the push test in `planning-rules.md` passes. Every step must also fit the per-session caps (rule R5 in `running-model.md`): a 45 km week caps 10k-pace work at about 5.4 km, so step 1 is the ceiling there.

## Session definitions

### Easy run
- 30–75 min at Z2 (T + 35–60 s/km). Cadence 170–185 spm. Optional strides at the end.
- Purpose: aerobic volume and recovery. The most common fault is running these at Z3; cap HR at 89 % LTHR.

### Long run
- 60–180 min at Z2, first 20 min slower. Fuel after 75 min. For marathoners the final third may move to Z3.
- Purpose: fatigue resistance, fuel economy, mental rehearsal. Counts as a hard day beyond 90 min.
- Avoid: adding speed to a long run in the same week the mileage ramps; running it the day after a speed session.

### Cruise intervals (threshold)
- Repeats at T-pace with short jog recoveries, 20–30 min total at T. Flat or gently rolling route.
- Purpose: raise the lactate threshold; the backbone for every distance.

### Threshold tempo
- Continuous 15–40 min at T-pace (or 5 s/km slower when continuous). Even pacing; the last 5 min should feel like "comfortably hard", not a race.
- Purpose: same as cruise intervals with more sustained stress; use when the rider tolerates continuous efforts.

### VO2 reps
- 2–5 min at 5k pace, equal or slightly shorter jog recovery, 12–18 min total at pace. Last rep no faster than the first.
- Purpose: VO2max and running economy at speed. High impact; HI for the legs.
- Avoid: more than one VO2 session a week for marathoners; never the day after a long run.

### 10k-pace reps
- 1600–3000 m repeats at 10k pace, 90 s to 2.5 min jog. 6–9 km total at pace.
- Purpose: specific race-pace tolerance for the 10k and the sharpening phase of the half.

### Hill reps
- 60–90 s uphill at 5k effort (4–8 % grade), jog down. 6–10 reps.
- Purpose: strength and VO2 with lower impact than flat speed; good for masters and injury-prone runners.

### Fartlek
- Unstructured or timed surges inside an easy run. Total hard time 8–15 min.
- Purpose: speed without a track; early-phase or deload intensity touch.

### Progression run
- Easy → steady → HMP or T over the run. Only the final segment is hard.
- Purpose: pacing discipline and finishing strength.

### Marathon-pace tempo
- 20–60 min at MP, run on race-like terrain, practising race fuelling.
- Purpose: metabolic and mechanical specificity. Replaces a threshold session in the last 8 weeks.

### Strides
- 6–8 × 20 s builds to ~1 mile pace, walk/jog back. On easy days.
- Purpose: neuromuscular freshness and form; negligible fatigue. Allowed every level from week 5.

### Race simulation (Peak phase)
- 5k/10k: 3 × 2 km at race pace with 2 min jog, 10–14 days out.
- Half: 10 km at HMP inside a 90-min run, 14 days out.
- Marathon: 20–22 km at MP inside the final 30–32 km long run, 3–4 weeks out.

## Session load estimates (rTSS, for planning)

| Session | Duration | rTSS |
|---|---|---|
| Easy run 45 / 60 min | — | 40 / 55 |
| Long run 90 / 120 / 150 min easy | — | 85 / 115 / 145 |
| Cruise intervals 4 × 5 | 50 min | 65 |
| Threshold tempo 20 min | 50 min | 70 |
| VO2 reps 5 × 3 | 55 min | 75 |
| 10k-pace reps 5 × 1600 | 60 min | 80 |
| Hill reps 8 × 60 s | 50 min | 60 |
| MP tempo 40 min | 65 min | 85 |
| Long run with 16 km @ MP | 150 min | 175 |

## Example weeks

### 10k, intermediate, build phase (45 km)

| Day | Session | Notes |
|---|---|---|
| Mon | Rest | |
| Tue | 10k-pace reps 5 × 1000 m | HI day (5 km at pace ≈ 11 % of the week) |
| Wed | Easy 45 min | Z2 |
| Thu | Cruise intervals 3 × 8 min @ T | threshold-type |
| Fri | Rest or 30 min easy + strides | |
| Sat | Easy 50 min | Z2, strides |
| Sun | Long run 90 min | easy, last 15 min steady |

### Marathon, intermediate, 8 weeks out (70 km)

| Day | Session | Notes |
|---|---|---|
| Mon | Rest | |
| Tue | Cruise intervals 2 × 15 min @ T | ~14 km with warm-up and cool-down |
| Wed | Easy 12 km | Z2 |
| Thu | Easy 12 km + 6 strides | |
| Fri | Rest | |
| Sat | Easy 8 km | shake-out |
| Sun | Long run 24 km with 2 × 5 km @ MP | 34 % of the week; fuel 60 g/h; counts as hard |

### 5k, advanced, peak phase (70 km)

| Day | Session | Notes |
|---|---|---|
| Mon | Easy 50 min | |
| Tue | VO2 reps 6 × 3 min @ 5kP | HI |
| Wed | Easy 60 min | |
| Thu | Cruise intervals 4 × 5 min @ T | |
| Fri | Easy 40 min + strides | |
| Sat | Easy 50 min + strides | |
| Sun | Long run 80 min | easy |

Tuesday and Thursday are the two hard days. 10–14 days before the race, the race simulation (3 × 2 km at 5k pace) replaces Thursday, never a third hard day.

## Zwift run file notes

Use `zwift-xml.md` blocks with `<sportType>run</sportType>`. In Zwift run workouts the fraction attributes scale a speed reference from the runner's Zwift run profile rather than FTP, and a `pace` attribute on the block selects which reference (for example a 5k or 10k pace). The mapping varies between app versions, so verify it on import. When in doubt, deliver the run as a markdown detail block with pace ranges, which is the default.
