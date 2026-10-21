# Running model — zones, structure, and rules

Use this when `sport` is `running` or `both`. The planning rules, levels, and periodization guides apply unchanged; this guide adds what is specific to impact loading and pace-based prescription. Session shapes and progressions are in `running-catalog.md`.

## Anchor: threshold pace

Everything is prescribed from **threshold pace (T-pace)**: the pace sustainable for about 60 min in a race, in practice measured as:

1. A 30-min solo time trial (average pace of the full 30 min), or
2. A recent 10k race pace + 8–10 s/km (or 15k/10-mile race pace directly), or
3. Lactate threshold heart rate (`lthr`) from the same test (average HR of the final 20 min) when pace is unreliable (hills, trails, treadmill).

Store `thresholdPaceSecPerKm` in the profile. Convert race predictions with Riegel: `T2 = T1 × (D2 ÷ D1) ^ 1.06`.

### Zones from T-pace

| Zone | Name | Pace (vs T-pace) | % LTHR | Feel |
|---|---|---|---|---|
| 1 | Recovery | slower than +60 s/km | < 85 % | fully conversational |
| 2 | Easy / long | +35 to +60 s/km | 85–89 % | sentences, nose breathing possible |
| 3 | Marathon / steady | +15 to +35 s/km | 90–94 % | short sentences |
| 4 | Threshold | −5 to +10 s/km | 95–102 % | a few words |
| 5 | VO2max / 3k–5k pace | −15 to −30 s/km | > 102 %, HR lags | single words |
| 6 | Repetition / speed | −40 s/km and faster | n/a (too short) | form-focused, full recovery |

Race-pace shortcuts: marathon pace ≈ T-pace + 15–20 s/km for fast runners and + 30–35 s/km for recreational runners (the gap widens as the marathon gets longer in time), half-marathon ≈ T-pace + 5–10 s/km, 10k ≈ T-pace − 8 s/km, 5k ≈ T-pace − 15–20 s/km. Prefer a real race result over these shortcuts. Heat and hills: prescribe by HR or effort and show the pace as a guide.

When a run power meter exists, treat run power like cycling power (critical power ≈ threshold) and use the cycling zone percentages.

## Weekly structure

| Goal | Runs / week | Hard days | Long run | Typical week |
|---|---|---|---|---|
| 5k | 4–6 | 2 (VO2 reps + threshold) | 60–90 min | Tue VO2, Thu threshold, Sat easy + strides, Sun long |
| 10k | 4–6 | 2 (threshold + 10k-pace reps) | 75–105 min | Tue 10k-pace reps, Thu cruise intervals, Sun long with steady finish |
| Half marathon | 4–6 | 2 (threshold + HM-pace long) | 90–150 min | Tue cruise intervals, Thu steady/HM pace, Sun long (HM-pace segment every 2nd week) |
| Marathon | 4–6 | 2 (one is the long run) | 120–180 min, peak 30–35 km | Tue threshold, Thu easy + strides or MP tempo, Sun long (MP segments every 2nd–3rd week) |

The long run is a hard day for half-marathon and marathon plans. Count it under rules 1–3 in `planning-rules.md`.

## Hard constraints for runners (added to `planning-rules.md`)

| # | Rule |
|---|---|
| R1 | Maximum 2 hard run days per week at every level; a hard bike session counts as one of them for `both`-sport athletes. |
| R2 | No speed session (Z5–Z6) the day after a long run, and no long run the day after a speed session. Threshold the day after a long run is allowed only for advanced runners under 40. |
| R3 | Weekly distance ramp ≤ 10 %; hold distance every 4th week (every 3rd for beginners and 50+). After any ramp of two consecutive weeks, hold one week. |
| R4 | Long run ≤ 30 % of weekly distance for 5k to half marathon; ≤ 40 % for marathoners (up to 45 % at peak for low-volume runners, at most 3 times). Always ≤ 3 h, so slower runners cap by time, not distance. Marathon peak long run 30–35 km (or 3 h), done 3–5 weeks before the race; 2–4 runs ≥ 28 km in the final 10 weeks for intermediate and advanced runners. |
| R5 | Per-session caps as a share of weekly km: threshold (Z4) ≤ 10 %, 10k-pace reps ≤ 12 %, VO2 reps (Z5) ≤ 8 % and ≤ 10 km, repetition/speed (Z6) ≤ 5 %. When a cap binds, cut reps, not recovery. Weekly time at Z4 or faster ≤ 20 %. |
| R6 | Beginners (or anyone returning from > 8 weeks off): run/walk for 4 weeks, 3 runs a week, no Z4+ work for 8 consecutive weeks; strides allowed from week 5. |
| R7 | Pain that changes gait, localised bone tenderness, or pain that worsens during a run: stop the session and remove all impact until assessed. Swap to cycling or pool running. |
| R8 | Hill reps and plyometrics are HI for the legs: never on consecutive days with each other or with heavy gym. |
| R9 | Race-week openers only: 2 days out, 4–6 × 1 min at race pace. No long run in race week (marathon: ≤ 60 min easy). |
| R10 | Runs over 90 min need fuelling (30–60 g carbohydrate/h; marathon practice at 60+ g/h) and a hydration cue in the schedule. |

## Age and running

- **40+:** two hard days maximum including the long run; replace one easy run with a Z2 bike to cut impact; strength 2× with calf and hip emphasis.
- **50+:** 2 easy days after every hard day; long run capped at 2.5 h; hill reps replace flat VO2 reps (less impact at speed); taper 3–4 days longer.
- **60+:** 3–4 runs a week with cycling or walking on other days; keep one quality session with strides or short hills; Z2 by HR, not pace.

## Level and running

| Parameter | Beginner | Intermediate | Advanced |
|---|---|---|---|
| Weekly km | 15–30 | 30–55 | 55–90 |
| Runs / week | 3 | 4–5 | 5–6 (one double allowed) |
| Hard days | 1 (threshold-type from week 9) | 2 | 2 (+ long run with quality) |
| Long run | ≤ 75 min | 90–150 min | up to 180 min / 35 km |
| Strides | 2× week from week 5 | 2× week | 2–3× week |
| Marathon eligibility | not before 1 year of consistent running, ≥ 40 km/week base | 12–16-week plan | 12–20-week plan |

## Combining cycling and running (`sport = both`)

- One hard-day budget across both sports: `targetedSessionCap` is total, not per sport.
- Cycling Z2 substitutes for easy runs at ~1.5 : 1 time ratio (90 min bike ≈ 60 min easy run) with no impact cost; it does not substitute for the long run in marathon preparation.
- Hard run → next day easy bike is fine; hard bike → next day easy run is fine; hard bike → hard run next day is not.
- Duathlon / triathlon bricks: bike then run, once a week in the Peak phase only; the run is at race pace for 10–20 min.
- When both sports have events, pick a primary sport per mesocycle; the other gets one maintenance session a week.

## Injury-risk screen (ask each check-in when running)

- Any new niggle (score 0–10)? ≥ 3 → remove intensity this week; ≥ 5 → no running, cross-train.
- Shoes older than ~600–800 km → suggest rotation.
- Sudden surface change (road → track, trail) → cap the first week's speed work at half volume.

## Output for runs

Each targeted run gets a markdown detail block with distance or time, pace range (per km or per mile from `units`), HR cap where relevant, and recovery. Zwift run files follow `zwift-xml.md` with `<sportType>run</sportType>`; Garmin or app-native formats take the same targets as pace ranges. Show both pace and effort cues; pace is a target, effort is the permission to ease off.
