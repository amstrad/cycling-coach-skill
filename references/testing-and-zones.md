# Testing and zones — setting the anchors

Every target in the plan is a percentage of an anchor: FTP for the bike, threshold pace for the run, LTHR for heart rate. A wrong anchor makes every session wrong, so anchors are tested on schedule and updated by rule.

## Cycling FTP protocols

| Test | Protocol | FTP | Notes |
|---|---|---|---|
| 20-min test | 20 min warm-up with 3 × 1 min fast spin, 5 min all-out, 10 min easy, 20 min all-out | 20-min average × 0.95 | Standard. Riders with a big anaerobic capacity score high; use 0.93 for explosive profiles. |
| Ramp test | 1-min steps of +20 W (or +6 % FTP) from ~50 % until failure | best 1-min power × 0.75 | Short and repeatable. Over-estimates explosive riders and under-estimates steady ones by 3–8 %. |
| 2 × 8-min test | two 8-min all-out efforts, 10 min easy between | higher average × 0.90 | Good for beginners who cannot pace 20 min. |
| Long effort | best 40–60 min steady effort (race, climb, time trial) | the average itself | Most specific. Use it when available. |
| Passive estimate | best 20-min power in the last 6 weeks × 0.95, or a platform estimate | as stated | Only when no test is possible; flag it as estimated. |

Rules: test fresh (after a rest day, end of a deload week), same trainer, same mode (indoor or outdoor), same time of day. Do not test inside 7 days of illness or in a build week. Pace the 20-min test: first 5 min at the expected FTP + 5 %, then build.

## Running threshold protocols

| Test | Protocol | Result |
|---|---|---|
| 30-min time trial | solo, flat route or track, after 15 min warm-up | average pace of the 30 min ≈ threshold pace; average HR of the last 20 min = LTHR |
| Recent race | 10k to half marathon, run all-out within the last 6 weeks | 10k pace + 8–10 s/km, or half-marathon pace − 5–10 s/km |
| 5k race or test | all-out 5k | 5k pace + 15–20 s/km (least precise for threshold) |

## When to update the anchor automatically

- **Raise FTP by 2–3 %** when three consecutive sub-threshold or threshold sessions are completed at RPE ≤ 5, or two over-target sessions occur. Confirm with a test at the next deload.
- **Raise FTP to the measured value** when a ride shows a steady 20-min effort above the current FTP ÷ 0.95, or a 40–60 min effort above the current FTP.
- **Lower FTP by 3–5 %** after two failed threshold-type sessions with normal readiness, or after 3+ weeks off.
- Change running threshold pace the same way: by 2–4 s/km after three easy-feeling cruise sessions, and to the measured value after a race.
- Re-test every 6–8 weeks in Base and Build; not during Peak or Taper unless a race gives the number for free.

Any automatic change is stated in the schedule header ("FTP raised from 245 W to 251 W after three easy threshold sessions").

## Power zones (% FTP)

| Zone | Name | % FTP | Typical sessions |
|---|---|---|---|
| Z1 | Active recovery | < 56 | recovery spins |
| Z2 | Endurance | 56–75 | aerobic base, long rides |
| Z3 | Tempo | 76–87 | tempo, late-ride tempo |
| SST | Sweet spot | 88–94 | sub-threshold |
| Z4 | Threshold | 95–105 | threshold, over-unders |
| Z5 | VO2max | 106–120 | aerobic ceiling, 30/15s |
| Z6 | Anaerobic | 121–150 | 40/20s, shrinking ladder |
| Z7 | Neuromuscular | > 150 | sprints, torque starts |

Easy days in this skill are capped at 70 % even though Z2 runs to 75 %, so drift on rolling roads stays out of tempo.

## Heart-rate zones (% LTHR, cycling)

| Zone | % LTHR |
|---|---|
| Z1 | < 81 |
| Z2 | 81–89 |
| Z3 | 90–93 |
| Z4 | 94–99 |
| Z5 | ≥ 100 |

Running HR zones are in `running-model.md`. Running LTHR is usually 5–10 bpm higher than cycling LTHR; never share HR zones across sports.

## Heart rate as a check, not the target

- HR lags 1–3 min, so it cannot guide reps shorter than 3 min.
- Cardiac drift: HR rises 5–10 % over a long steady effort at constant power. Hold the power; slow down only when drift exceeds 10 % in the first 90 min (a sign of heat, dehydration, or fatigue).
- Decoupling (power or pace ÷ HR, first half vs second half of a Z2 session) under 5 % means the aerobic base is solid for that duration; over 8 % means extend Z2 work before adding long-ride intensity.
