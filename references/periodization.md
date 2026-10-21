# Periodization and load — from the season down to the week

This guide sets the weekly load target and the phase emphasis so each week fits a larger arc. It is written as formulas and lookups so the same logic can run inside an app.

## Load metrics

- **TSS (Training Stress Score)** = `seconds × NP × IF ÷ (FTP × 3600) × 100`, where `IF = NP ÷ FTP`. One hour at FTP = 100 TSS.
- **Running:** use rTSS from pace (`IF = NGP ÷ threshold pace` as speeds) or hrTSS from `%LTHR`. If none, use session RPE load: `RPE (0–10) × minutes`, where ~60 min Z2 ≈ 180 au ≈ 55 TSS.
- **CTL** (fitness) = 42-day exponentially weighted TSS; **ATL** (fatigue) = 7-day; **TSB** (form) = yesterday's CTL − ATL. **ACWR** = ATL ÷ CTL.
- CTL changes by roughly `(daily TSS − CTL) ÷ 42` per day, so weekly TSS ≈ 7 × CTL holds fitness and each extra ~42 TSS in a week adds about 1 CTL. A +4 CTL week therefore needs ≈ 7 × CTL + 170 TSS.
- Useful targets: race-day TSB +5 to +25 (longer events at the high end); key-session TSB above −20; TSB below −30 for more than 3 days is an overreach signal.

### Session TSS estimates (bike, for planning before data exists)

| Session (per `interval-catalog.md`) | Duration | TSS |
|---|---|---|
| Aerobic base 60 / 90 / 120 / 180 min at 65 % | — | 40 / 60 / 80 / 120 |
| Sub-threshold 2 × 20 at 90 % | 65 min | 70–80 |
| Threshold 2 × 15–20 at 97 % | 60–70 min | 75–90 |
| Oscillating threshold 3 × 8 | 50–60 min | 65–75 |
| Aerobic ceiling 5 × 4 at 115 % | 60 min | 70–80 |
| 30/15s 3 × 13 | 60 min | 70–80 |
| 40/20s 2–3 × 8–9 | 55–65 min | 65–85 |
| Low-cadence force 4 × 6 | 60 min | 55–65 |
| Torque starts / sprints | 45 min | 30–40 |
| Hard group ride 3 h | — | 180–220 |
| Easy group ride 3 h | — | 120–150 |

Running equivalents are in `running-catalog.md`.

### Weekly TSS bands by level (cycling)

| Level | Build week | Deload week |
|---|---|---|
| Beginner | 200–350 | 120–200 |
| Intermediate | 350–550 | 200–300 |
| Advanced | 550–800 | 300–450 |

## Phases

Decide the phase from `eventDate` (weeks to go) and `eventType`. With no event, cycle Base → Build on a rolling 12-week loop and keep a benchmark at each deload.

| Phase | Length | Volume | Key sessions | Emphasis |
|---|---|---|---|---|
| Transition | 1–3 wk | low, unstructured | 0 | Rest, play, strength intro. After a season or an A-race. |
| Base | 8–12 wk | rising to peak volume | 1–2 threshold-type (sub-threshold, tempo, low-cadence force), 1 short HI touch every 2nd week | Aerobic engine, strength 2×, long ride growth. |
| Build | 6–8 wk | held or slightly lower | 2 (HI + threshold-type), objective-specific | Raise FTP and VO2max; sessions follow power profile and objective. |
| Peak / specialty | 3–4 wk | −10–20 % | 2, race-specific (race simulation, group rides at race intensity) | Specificity: demands of the event, not general fitness. |
| Taper | 1–3 wk (see table) | −40–60 % by race week | 1–2 short, sharp openers | Shed fatigue, keep intensity, protect sleep. |
| Race week | — | minimal | opener 2 days out | 3–5 × 1 min at race pace, otherwise easy. |

### Phase from the event date

Count backward from `eventDate`, so short and long events get the right taper:

1. **Race week** = the final 7 days.
2. **Taper** = the length from the table below, immediately before race week (for 7–10-day tapers, race week is the taper).
3. **Peak** = 3 weeks before the taper (4 for events ≥ 4 h or the marathon).
4. **Build** = 6–8 weeks before Peak (8 when time allows).
5. **Base** = everything earlier. If fewer than 6 weeks of Base remain on day one, shorten Build first, never Peak or Taper.

Under 8 weeks to go with no prior base: skip Base, run a short Build at the rider's current level, and set expectations. Under 4 weeks: Peak and Taper only; no new pattern types.

### Taper length and depth

| Event | Taper | Volume cut | Intensity | Frequency |
|---|---|---|---|---|
| Criterium, 5k, 10k | 7–10 days | −40 % | keep, short reps | −1 session |
| Road race, gran fondo < 4 h, half marathon | 10–14 days | −40–50 % | keep | −20 % |
| Gran fondo > 4 h, marathon, ultra | 14–21 days | −50–60 % by the final week | keep but shorter | −20–30 % |

Age 50+ adds 3–4 days. Beginners taper on the short end: they lose fitness faster and carry less fatigue.

## Mesocycle patterns

- **Default 3:1** (three build weeks, one deload). Progression steps 1 → 2 → 3, then deload with a benchmark.
- **2:1** for riders 50+, beginners, and anyone failing the push test two weeks running.
- **HI block** (advanced, under 40): 1 week of 3 HI sessions + Z2, then 2–3 weeks at the normal 1 HI per week, then deload. Maximum twice a season.
- **Reverse periodization** for indoor winters or time-crunched riders: intensity first (sweet spot and HI in Base), volume added as daylight and time allow.

Week-to-week load inside a 3:1 cycle: 100 % → 105–110 % → 110–115 % → 55–65 %. Inside 2:1: 100 % → 108 % → 60 %. The next block starts at about the level of the previous block's week 2.

## Weekly build algorithm (for the app)

1. **Inputs:** profile, level (`athlete-levels.md`), phase (above), last 7–14 days of load (CTL, ATL, ACWR, completed sessions and their outcome), readiness, availability, power profile, objective.
2. **Week type:** deload if the cycle counter says so, if ACWR > 1.5, if readiness forces it, or if the rider failed two consecutive key sessions. Else build.
3. **Load target:** build → previous week × 1.05–1.10, capped by the ramp rule and the level band; deload → previous build week × 0.55–0.65.
4. **Key-session count:** `min(targetedSessionCap, level cap, phase cap)`; subtract 1 if a social ride or race is expected to be hard.
5. **Pick patterns:** new block → next row of the rotation table in `interval-catalog.md` (or `running-catalog.md`) for the profile, adjusted by phase; same block → keep the pair. Set each pattern's step from `blockWeek` and the push/hold decision in `planning-rules.md`.
6. **Place sessions:** rest day → first key session (HI) → second key session (threshold-type, ≥ 48 h later) → long day at the weekend → gym on hard days or rest days. Run every hard constraint in `planning-rules.md`; if one fails, move the offending session later, then downgrade it to Z2, then drop it, in that order.
7. **Fill remaining days:** Z2 to reach the load target without breaking the intensity distribution; shorten rather than add intensity if hours are short.
8. **Compute session TSS** from the tables, sum, compare with the target; adjust Z2 durations ±15 min until within 10 %.
9. **Write cues:** watts from the week's FTP, paces from threshold pace, fuelling and readiness notes.
10. **Final checks** (`SKILL.md`), then output and update `trainingState` (`blockWeek` +1, or a new `blockIndex` after the deload; `patternSteps` from completed sessions).

## Benchmarks

Test protocols, zone tables, and the rules for updating FTP and threshold pace automatically are in `testing-and-zones.md`. A test replaces that week's HI session and only happens fresh: at the end of a deload, never in a build week or within 7 days of illness.
