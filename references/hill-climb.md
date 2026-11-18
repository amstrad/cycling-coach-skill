# Hill climb racing — a single climb against the clock

Use this guide when the objective is one timed climb, the typical club hill-climb season of 3–15 minutes
on steep roads (a few run to 15–20 min). Longer single climbs (20–40 min, e.g. a mountain pass TT) shift
toward threshold, as below.

Source: Roadman Cycling, "Cycling hill climb racing guide".
Andy Coggan's modelling is cited there: at 10 %, 1 kg less body weight ≈ 4–5 W of sustained power.

Where a paper supports a point, the text cites its row in `evidence.md`, for example (E10). The climbing studies
are small or modelled, so read them as a direction.

## What decides it: the climb's duration

| Climb duration | Main limiter | Training emphasis |
|---|---|---|
| Under 5 min | Anaerobic capacity and peak power | VO2max + anaerobic efforts (30 s–2 min), race-duration efforts above FTP |
| 5–10 min | Between anaerobic and VO2max | **VO2max first** (3–5 min reps), race-duration efforts |
| Over 10 min | Threshold | Threshold first (2 × 15–20 min), VO2max second, race-duration efforts at ~100–105 % |

- **Power-to-weight decides it.** Above about 8 % the aerodynamics are "almost irrelevant".
- **Weight:** manage it over the season. **Do not cut calories hard in the last 4–6 weeks.** "Arrive lean and
  fuelled", not light and flat.

## W/kg and how mass really scales

- **W/kg is the right first number on a steep climb, and less so as the road flattens.** In a model, the body-mass
  exponent that best ranks riders rose with gradient: about 0.38 on the flat, 0.72 on a moderate climb, and 0.89
  on a steep one (E09). Pure W/kg is an exponent of 1.
- **Air still counts on moderate gradients.** On a real 5.4 % climb, speed followed power per kg, but the
  relationship was curved in a way that showed air resistance still mattered (E08).
- **What to do with it.** On a steep climb (8 % and more), track W/kg. On a 4–6 % climb, or a fast one, absolute
  power and position still buy time, so a heavier, more powerful rider gives away less than W/kg suggests.
- **Compare the rider with themselves.** Use W/kg to follow one rider's progress over a season, not to set a
  body-weight target. This skill never prescribes weight loss (`fuelling.md`).

## Test on the gradient

- **A flat or indoor FTP does not transfer as it stands.** In well-trained riders, 1-min power and W′ were higher
  on a 9.8 % climb than on the flat. Critical power was the same on average, but individual riders differed too
  much, in both directions, to treat the two as equivalent (E10).
- **So anchor climb targets on a climb.** Take the race-duration effort on a matching gradient as the test, and
  set the event's pacing from it. Keep the indoor or flat FTP for the indoor sessions.
- When no matching climb is available, use the flat FTP, say that it is an estimate for the climb, and correct it
  after the first effort uphill.

## Sessions (all % FTP)

- **VO2max, the main session:** 3–5 min at 105–120 %, recovery equal or slightly longer, **5–7 repeats**.
  The source does this twice a week in build. This skill's limit is one high-intensity session a week in build
  (`assets/rules.json` `maxHi`; a race-duration effort above 106 % counts as one). So in build, **alternate**:
  VO2max one week, the race-duration effort the next, with threshold as the second key every week. The peak may
  hold both where `maxHi` allows two. An advanced rider may still run a short HI block of 3 HI sessions in one
  week (`coaching-model.md`, at most twice a season).
- **Race-duration effort, weekly in build and peak:** a maximal, all-in effort on a local climb matching the
  target climb's **duration and gradient**, 1–3 reps with full recovery.
- **Hill repeats:** a 3–5 min climb at 6–10 %, starting at **4 repeats and building to 7–8**.
- **Threshold maintenance, weekly:** 2 × 15 or 2 × 20 min at 90–100 %, so FTP doesn't erode. Within two key
  sessions, put it inside the endurance ride as a block.
- **Endurance:** keep Z2 volume. The long ride supports recovery and the base; it is not the goal (2–2.5 h is plenty).
- **Cadence:** about 75–80 rpm at race power, which sets the gearing (e.g. 50/34 with 11-34; wider above 15 %).

## Phases

- **Base:** Z2 volume, sweet spot and low-cadence climbing, a VO2max touch every 2nd week, strength.
- **Build:** one maximal climbing session a week, alternating VO2max (5–7 × 3–5 min) and the race-duration effort
  or hill repeats, plus threshold (2 × 15–20 min, low cadence on a climb) as the second key every week.
- **Final 4 weeks:** reduce total volume slightly by shortening the easy rides, keep the intensity sessions sharp,
  and keep the race-duration effort.
- **Taper:** short (7–10 days, `periodization.md`), keeping short sharp efforts.
- **Season:** several events close together are normal (e.g. 2–3 in a month for a first season). Allow full
  recovery between maximal efforts.

## Race day

- **Warm-up, 20–30 min progressive:** 10 min Z1–2, 5 min Z3, then **2–3 × 30 s at race intensity** with 2 min
  easy between. Finish 5–10 min before the start and keep moving. A cold start costs 10–15 s on a 5-minute climb.
- **Pacing:**
  - **Under 5 min:** start above sustainable power and manage the fade (5–10 %, not 30 %).
  - **5–8 min:** start at what you could hold for 8–9 min, then lift in the second half. Example for 6 min:
    110 % for minutes 1–2, 105 % for 3–4, then everything left.
  - **Over ~10 min:** conservative first third, build through the middle, empty it in the last third.
- **Why these shapes: critical power and W′.** Above critical power (CP, close to the power held for 30–60 min)
  a rider spends a fixed reserve of work, W′, in proportion to how far above CP they ride (E11). On a single
  climb there is no chance to refill it, so the even power for a climb of `t` seconds is about `CP + W′ ÷ t`.
  - **Short climb:** W′ is a large part of the effort (20 kJ over 4 min is +83 W), so the target sits well above
    threshold and the start can be hard.
  - **Long climb (20 min and more):** W′ adds little (20 kJ over 40 min is +8 W), so the pace is threshold. A surge
    early on spends W′ that will not come back while the rider is still climbing at CP: W′ refills slowly, by
    about a third in 2 min of very easy riding in one study, and more slowly after repeated efforts (E11).
  - **A climb late in a long day:** CP itself is lower after hours of riding (E02, E04), so pace it by effort
    and by the rider's own late-ride fade (`ultra-distance.md`), not by the fresh number.
  - **Estimating them:** three maximal efforts of about 2–15 min, ridden on the climb's gradient (E10, E11).
    A platform's CP and W′ will do when it used recent maximal efforts.
  - **Limits:** the models come from small studies, and live W′-balance figures are not precise enough to pace
    by (E11). Use them to choose the target before the start, then race on power and feel.
- **Equipment:** strip the bike (cages, saddlebag, pump), use the lightest wheels (not deep aero), light tyres at
  moderate pressure, and gearing that keeps 75–80 rpm on the steepest pitch.

## For a planning engine

- **Size the training by the estimated climb duration**, not by "hill climb" alone: under 5 min, 5–12 min, over 12 min.
- **Build, short and mid climbs:** key 1 alternates VO2max and the event-sized race-duration effort; key 2 is
  threshold every week. **Long climbs:** threshold first, VO2max or the rehearsal alternating.
- **Peak:** the rehearsal plus VO2max where the level's `maxHi` allows two HI sessions; otherwise alternate as in build.
- **Long ride:** capped at about 2–2.5 h. Volume trims slightly over the last 4 weeks; intensity is kept.
- **Explain:** W/kg; no crash diet in the last 4–6 weeks; the warm-up and pacing for the event's duration.
- **Anchor:** prefer an effort on a matching gradient over the flat or indoor FTP for the event's targets, and say
  which one was used.
