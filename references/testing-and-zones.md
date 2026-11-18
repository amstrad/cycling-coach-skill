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

## Durability test (optional)

FTP says what a rider can hold fresh. This test says how much of it is left after work, which decides long events
(`ultra-distance.md`). It is for intermediate and advanced riders preparing an event of 4 h or more. Pattern id
`durability-test`, a benchmark like any other.

There is no agreed protocol. A review of the methods (E03 in `evidence.md`) sets out what makes a result
comparable, and this test follows it:

| Choice | What to do | Why (E03) |
|---|---|---|
| The measure | A maximal 20-min effort, compared with the fresh 20-min test. Report the fatigued power as a share of the fresh one. | The same measure as the limiter check in `coaching-model.md`; a smaller drop means better durability. |
| Fresh and fatigued | On separate days, both rested, within about two weeks, with no change of FTP between them. | Two maximal efforts in one day disturb each other. |
| The prior work | Fix it once and repeat it exactly: the same duration and the same power, set from the rider's threshold, not from a share of maximum. | Longer and harder prior work lowers the result more. An unrepeatable ride gives an unreadable number. |
| Describe the work twice | Total kJ per kg, and how much of it was above threshold. | The same kJ cost more when they include hard efforts (E04). |
| Enough to show a change | The prior work must be long enough to lower the 20-min power at all. | A test that shows no drop cannot show an improvement. |
| Fuel | The same carbohydrate before and during, and the same caffeine, every time. Drink to thirst. | Carbohydrate reduces the fall in threshold power, so a change of fuelling reads as a change of fitness. |
| Conditions | The same bike, power meter, position, terrain (flat or climb), and similar temperature; indoors when possible. | Heat, gradient, and position each move the result (E10). |
| First attempt | Treat it as practice. | Pacing a maximal effort on tired legs is a skill. |
| When the FTP changes | Reset the power of the prior work, and note it. | Otherwise the work becomes relatively easier and looks like better durability. |

Two versions of the prior work have been published, as examples and not as standards:

- **Steady:** a 20-min warm-up, then riding at 80 % of the fresh 20-min power until 1,000 kJ are done, before the
  effort. More successful amateurs lost 6.5 % of their 20-min power, less successful ones 12.5 % (E05, 14 riders).
- **Hard:** 5 × 8 min at 105–110 % of critical power (E06, 10 professionals). It tests resistance to hard efforts,
  not to hours, and suits road-race objectives better than ultra ones.

For an ultra or gran fondo, use the steady kind and scale it to the rider: a 1,000 kJ block is about 80 min for a
rider with a 250 W FTP and close to two hours for one at 170 W. Keep whatever is chosen identical from test to test.

Rules:

- Never on the same day as an FTP test or any other benchmark (validator code `DURABILITY_TEST_SAME_DAY`).
- It is a hard day, placed fresh, like every benchmark (rule 10 in `planning-rules.md`), and it replaces the week's
  long ride. No more than once per block.
- Without the test, the same number can be read from training: the best 20 min in the last hour of long rides
  against the fresh best (`coaching-model.md`). That reading is less controlled, so treat a single ride as a hint.
- A drop of more than 10 % calls for long rides with late tempo, not more intervals (`coaching-model.md`). The
  result never changes FTP or the zones.

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

Coggan's five bands. They put endurance where a cyclist actually rides it: Friel's Z2 (81–89 % LTHR) reads 10–20 bpm high
on the bike, so an easy ride shows up as tempo.

| Zone | % LTHR |
|---|---|
| Z1 | < 68 |
| Z2 | 68–83 |
| Z3 | 84–94 |
| Z4 | 95–105 |
| Z5 | > 105 |

- Round each bound to the nearest bpm; cap the top zones at HRmax when it is known.
- The athlete's own zones (set by hand or in Intervals.icu) always win over these bands.
- No LTHR: take LTHR = 0.89 × HRmax and say it is an estimate. No HRmax either: HRmax = 208 − 0.7 × age (Tanaka), an
  estimate to replace with a test. Never Karvonen.
- An LTHR above 93 % of HRmax is probably wrong: ask the athlete to check it, change nothing.
- A power target in Z1–Z4 reads as the HR zone of the same number. Above threshold (power Z5+) there is no honest HR
  floor: say "above threshold, heart rate lags the effort".

### These bands are a convention, not a measured threshold

- **The model.** The cycling heart-rate bands are Andrew Coggan's levels as a share of LTHR, from the same scheme
  as the power zones above (Allen and Coggan, *Training and Racing with a Power Meter*). Until version 1.0.1 the
  skill used Joe Friel's cycling bands, where Z2 is 81–89 % of LTHR; version 1.1.0 moved Z2 to 68–83 %.
- **What that change was.** A choice between two coaching conventions that draw the same easy riding in different
  places. No study shows that 68 %, 83 %, 81 % or 89 % of LTHR marks a physiological boundary, and `evidence.md`
  has no row for either scheme. The boundaries that physiology does define are the two thresholds (the first rise
  in lactate or ventilation, and the maximal steady state), and they sit at a different share of LTHR in every
  rider.
- **What follows.** "Z2" in this skill means **power**: 56–75 % of FTP, capped at 70 % on easy days. Heart rate
  is the check, never the definition (see below). Where power and the heart-rate band disagree, power and RPE
  decide. A rider with a lactate or ventilatory test uses their own first threshold as the top of easy riding,
  which overrides both tables.
- **Do not mix schemes.** A heart-rate figure quoted from a Friel-based plan, a watch, or a platform is not
  comparable with these bands. Garmin's own zones are read as Garmin gives them (`garmin-snapshot.md`).
- **Two sports, two conventions.** The running bands in `running-model.md` (Z2 = 85–89 % of running LTHR) follow
  the Friel-style scheme and were not changed. Never read a cycling heart rate against them, or the reverse.

Where "Z2" appears, and what it refers to:

| Place | Meaning | Consistent with the table above |
|---|---|---|
| `interval-catalog.md` aerobic base, `coaching-model.md`, `rules.json` class `easy` | power, 60–70 % FTP | Yes. |
| `planning-rules.md` easy day and intensity distribution, `adjustments.md` over-cooked | power, with 75 % FTP as the top of Z2 | Yes for the zone. The easy-day cap is 70 %; 75 % is the zone's edge and the point where a day counts as over-cooked. |
| `ultra-distance.md` "about 90 % of sessions in Z2", `hill-climb.md`, `periodization.md`, `garmin-snapshot.md` actions | power Z2 | Yes. |
| `heat-training.md` "heart rate drifts to about 75–80 % of max" | heart rate, as a share of HRmax | Read with care: with LTHR at 0.89 × HRmax that is 84–90 % of LTHR, which is Z3 in the table above (it was Z2 in the Friel bands). The session is still an endurance ride by power; the heat raises heart rate. Judge a heat session by power and core temperature, not by its heart-rate zone. |
| `running-model.md`, `running-catalog.md`, `rules.json` `runHrPctLthr` | running pace, with the running heart-rate bands | A separate convention, by design. |
| `garmin-snapshot.md` power-zone table | Garmin's seven zones (tempo to 90 %, threshold from 91 %) | Garmin's scheme, shown for reading the export; plans use the power zones above. |
| `examples/` | no heart-rate figures | Nothing to reconcile. |

Running HR zones are in `running-model.md`. Running LTHR is usually 5–10 bpm higher than cycling LTHR; never share HR zones across sports.

## Heart rate as a check, not the target

- HR lags 1–3 min, so it cannot guide reps shorter than 3 min.
- Cardiac drift: HR rises 5–10 % over a long steady effort at constant power. Hold the power; slow down only when drift exceeds 10 % in the first 90 min (a sign of heat, dehydration, or fatigue).
- Decoupling (power or pace ÷ HR, first half vs second half of a Z2 session) under 5 % means the aerobic base is solid for that duration; over 8 % means extend Z2 work before adding long-ride intensity.
