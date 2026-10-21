# Season plan — the weeks from now to the event

Use this when the athlete asks for more than one week ("plan my 16 weeks to the marathon", "build me a season", "what do the next months look like"). A season plan is an outline. Only the coming week gets full sessions and workout files; every later week is rebuilt from the outline at its own check-in, using the data available then.

## Inputs

`eventDate`, `eventType`, `age`, `level`, `sport`, current load (CTL or last 4 weeks of TSS or km), `trainingState`, and any fixed dates the athlete names (holidays, B-races). Without an event, plan 12 weeks of rolling Base and Build.

## Steps

1. **Count the weeks** from the coming Monday to the event week. Under 4 weeks: Peak and Taper only. Over 30 weeks: outline only the first 16 and add "re-plan at week 12".
2. **Lay out the phases backward** with the rules in `periodization.md`: race week, taper (length per event and age), peak, build, then base for the rest.
3. **Cut the phases into blocks**: 3:1 or 2:1 by age and level (`assets/rules.json` `age` and `levels`). A block may not cross a phase boundary; shorten the block instead. The last week before Peak and the week before the taper are deloads or test weeks.
4. **Set each week's load target**: start from the current weekly load, apply the block pattern (100 → 105–110 → 110–115 → 55–65 %), cap every rise at the ramp rule, and stay inside the level band. Runners get a km target with the 10 % rule and a hold week every 3–4 weeks.
5. **Assign each block a session pair** from the rotation (`interval-catalog.md`, `running-catalog.md`), with the phase overrides: Base favours tempo and low-cadence force; Peak swaps the threshold slot for race simulation; the taper keeps one short HI touch.
6. **Mark the long day** per week: the progression of the long ride or long run toward the event's demand (fondo duration, marathon peak long run 3–5 weeks out).
7. **Place benchmarks** at the end of the first deload and every 6–8 weeks after, never inside Peak or Taper.
8. **Place B- and C-races** as hard days in their week; a B-race gets a 3–4-day mini taper, a C-race none.

## Output

Write `season-plan.md` (and `season-plan.json` when the agent can write files) with one row per week:

| Week | Dates | Phase | Block / week | Type | Load target | Key sessions | Long day | Notes |
|---|---|---|---|---|---|---|---|---|
| 2026-W45 | 2–8 Nov | Base | 1 / 1 | build | 380 TSS | Tempo s1 + Sub-threshold s1 | 2 h 30 | |
| 2026-W48 | 23–29 Nov | Base | 1 / 4 | deload | 230 TSS | Sub-threshold s1 (⅔ reps) | 1 h 30 | FTP test Sat |

Then build the first week in full with the normal flow in `SKILL.md`. Store the outline in `trainingState.seasonPlan` as the list of week rows, so later runs follow it.

## Re-planning

Each weekly run compares the outline with what happened:

- **On track:** follow the row.
- **Missed or failed key sessions, illness, or a deload forced by readiness:** shift the remaining build weeks by one, but never move the taper or the race. If that would cut Peak below 2 weeks, shorten Build instead.
- **FTP or threshold changed:** keep the rows; targets update automatically because they are percentages.
- **Event date changed:** rebuild the outline from step 1.

State any change to the outline in one line in the weekly schedule notes.
