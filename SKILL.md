---
name: cycling-coach-skill
description: Plan an endurance athlete's training like a professional coach, for cycling and for running from 5k to the marathon. Use when an athlete asks to plan a week or a season ("map my week", "build a training block", "plan my marathon week", "set up this week's sessions", "plan the weeks to my event", or an equivalent in any language), or reports how a session went and needs the week adjusted. Loads a personal athlete profile, syncs Intervals.icu, Strava, or a Garmin export, derives the power profile, level, and season phase, and returns a markdown schedule plus Zwift workouts or Intervals.icu calendar events. Every week is checked against explicit rules for recovery spacing, high-intensity limits, age, level, load ramps, and running impact.
license: MIT
compatibility: Works in any agent that supports Agent Skills (SKILL.md). Needs file read/write for the profile and outputs. Node.js 18+ is optional, for the bundled week validator. Network access or connectors are optional, for Intervals.icu, Strava, or a pasted Garmin export.
metadata:
  author: Diego Garcia
  version: 1.0.0
  hermes:
    tags: [cycling, running, marathon, training-plan, endurance, coaching, zwift, intervals-icu, strava, garmin]
    category: fitness
---

# Cycling Coach skill

Turn a short exchange into a training week an athlete can act on: a seven-day markdown schedule and the workouts it points to. Everything personal comes from the athlete's profile file, so the same skill serves anyone. The coaching knowledge lives in `references/`; its numbers are mirrored in `assets/rules.json`, and `scripts/validate-week.mjs` checks every planned week against them.

## Guides map

| Guide | Use it for |
|---|---|
| `references/profile-schema.md`, `references/first-time-setup.md` | Profile fields and the first-run questions. |
| `references/intervals-icu.md`, `references/strava-sync.md`, `references/garmin-snapshot.md` | Thresholds, history, readiness, and load; publishing to the Intervals.icu calendar. |
| `references/power-profiles.md` | Explosive, balanced, or steady from the power curve. |
| `references/athlete-levels.md` | Beginner, intermediate, or advanced, and what each level gets. |
| `references/periodization.md` | Load formulas, phases from the event date, tapers, the weekly build algorithm. |
| `references/season-plan.md` | Multi-week outlines from now to the event. |
| `references/coaching-model.md` | The principles: easy-heavy week, blocks, age spacing, session shapes. |
| `references/planning-rules.md` | Hard constraints, sequencing, the push/hold decision, age and level tables, validator codes. |
| `references/interval-catalog.md`, `references/running-catalog.md` | Sessions, rotation per block, progression steps. |
| `references/running-model.md` | Running zones, weekly structures per distance, runner-specific rules. |
| `references/gym-catalog.md` | Strength and core for cyclists and runners. |
| `references/adjustments.md` | Scoring sessions; repairing the week after missed, moved, or failed sessions. |
| `references/testing-and-zones.md` | Tests, zones, and rules for updating FTP and threshold pace. |
| `references/fuelling.md` | Fuelling and recovery cues; red flags to surface. |
| `references/schedule-format.md`, `references/zwift-xml.md` | Output formats. |

## Bundled files

| Path | Use it for |
|---|---|
| `assets/rules.json` | Every planning number used by the guides and the validator. |
| `assets/athlete-profile.schema.json` | The profile format. |
| `assets/week-plan.schema.json` | The structured week format written in step 4. |
| `scripts/validate-week.mjs` | Checks a week plan against `assets/rules.json`. |
| `examples/profiles/beginner-cyclist.json`, `examples/profiles/masters-cyclist.json`, `examples/profiles/marathon-runner.json`, `examples/profiles/cyclist-runner.json` | Complete profiles to copy the shape from during setup. |
| `examples/weeks/beginner-cyclist.plan.json`, `examples/weeks/masters-cyclist.plan.json`, `examples/weeks/marathon-runner.plan.json`, `examples/weeks/cyclist-runner.plan.json` | Valid week plans, one per profile, to copy the shape from in step 4. |

## Start by loading the profile

Do this on every run, before anything else.

1. Look for `athlete-profile.json` beside this skill. If the skill folder is read-only, use the current working directory instead.
2. If it is present and valid, read it and continue.
3. If it is absent or broken, run `references/first-time-setup.md`, write the file, and continue in the same turn. Never make the athlete invoke the skill twice to finish setup.

The profile is the only authority on who the plan is for. Fields are defined in `references/profile-schema.md` and `assets/athlete-profile.schema.json`. If `age` is missing, ask before planning, because recovery spacing depends on it. If `sport` is missing, assume `cycling`.

## Weekly check-in

Open each week with a short check-in. Always offer a one-step "use my saved defaults" choice built from the profile; if taken, confirm what was applied and ask only for changes. Use an interactive picker when the agent has one; otherwise ask numbered questions in a single message.

- Open days, group-ride days, and session length per day.
- How the last two key sessions went, scored with `references/adjustments.md`, plus niggles, sleep, and stress.
- Gym mode (strength, core, both, none) and number of gym slots.
- Export: Zwift files, Intervals.icu calendar events, or both. Save the answer in `exportFormat`.
- When no connector supplies readiness data, ask once whether a Garmin export is available (`references/garmin-snapshot.md`).

## The flow

### 1. Gather the signals

Use every connected source and resolve conflicts with the priority table in `references/intervals-icu.md`.

- **Intervals.icu:** thresholds and zones, CTL/ATL and ramp rate, HRV, sleep, resting HR, 84-day power or pace curve, the last 14 days of activities, and this week's calendar (`references/intervals-icu.md`).
- **Strava:** FTP and zones, the last 10–14 days of rides and runs, best efforts across 6–12 weeks, and activity names for pattern tags (`references/strava-sync.md`).
- **Garmin export:** zones, training readiness, HRV status, sleep, load, and recovery time (`references/garmin-snapshot.md`).
- **None:** plan from `baselineFtp` or `thresholdPaceSecPerKm` and the profile.

If FTP figures disagree by more than 3 %, say so and ask which to trust. Summarise the previous week and current readiness in one or two sentences, and say exactly what readiness changed.

### 2. Classify the athlete and the week

- **Power profile:** `powerProfileOverride`, else derive it with `references/power-profiles.md`. Beginners without maximal efforts on record count as `balanced`.
- **Level:** `level`, else derive it with `references/athlete-levels.md`.
- **Phase, block, and week type:** from `eventDate` and `trainingState` with `references/periodization.md`, or from `trainingState.seasonPlan` when one exists.
- **Anchors:** apply the update rules in `references/testing-and-zones.md`, and check whether a benchmark is due.
- **Progression:** push, hold, or step down with the decision table in `references/planning-rules.md`.

State the result in at most two lines: profile and focus; level, phase, week type, and whether the progression moves.

### 3. Build the week

1. Restate the objective in one sentence.
2. Pick the session pair: same block, keep the pair; new block, take the next rotation row (`references/interval-catalog.md`, `references/running-catalog.md`). The default pair is one high-intensity session plus one threshold-type session. Set each step from the block week and the progression decision.
3. Place sessions in this order: rest day, high-intensity session, threshold-type session, long day, gym. Then fill with Z2 toward the load target in `references/periodization.md`.
4. Apply `references/coaching-model.md`, `references/running-model.md` for runs, and every hard constraint in `references/planning-rules.md`. If a constraint fails, move the session; else downgrade it to Z2; else drop it.
5. Group-ride days are ridden at the group's pace with no structure. A group ride expected to be hard counts as a key session.
6. Add fuelling cues from `references/fuelling.md` to every key session and every session over 60 min.

### 4. Validate

Write the week as `YYYY-Wnn-plan.json` following `assets/week-plan.schema.json`. Include the previous week's load and last days, so the rules can see across the week boundary.

- **If the agent can run Node.js 18+:** run the validator and fix every error before delivering. Mention warnings in the schedule notes.

  ```bash
  node <skill-folder>/scripts/validate-week.mjs output/YYYY-Wnn-plan.json --profile athlete-profile.json
  ```

  Exit code 0 means no errors, 1 means rule errors, and 2 means the plan file could not be read. Add `--json` for machine-readable output.

- **Otherwise:** apply the same checks by hand, using the validator code table at the end of `references/planning-rules.md`.

### 5. Deliver

Write files to `./output/`; if that fails, return everything inline. Human-facing text follows `language` and `units` and obeys `voiceGuidelines`. Machine keys stay English; file names stay lowercase and hyphenated.

1. `YYYY-Wnn-schedule.md`, matching `references/schedule-format.md`.
2. One `.zwo` per targeted bike session (`references/zwift-xml.md`), each also printed inline as a labelled XML block. Runs get detail blocks with pace ranges.
3. `YYYY-Wnn-gym.md` when a full gym session is scheduled.
4. `YYYY-Wnn-plan.json`, the validated structured week.
5. Intervals.icu events when `exportFormat` includes them: show the week, ask once or follow `publishToIntervals`, then upsert with `references/intervals-icu.md`.
6. Update `trainingState` in the profile so next week continues the block.

For a multi-week request, follow `references/season-plan.md` first, then build the coming week as above. For a mid-week change, repair the remaining days with `references/adjustments.md` instead of rebuilding the week.

## Final checks

1. The schedule carries the week id, objective, phase, block and week type, level, profile, anchors used, previous-week line, planned load, day table, session details, and any rule that moved a session.
2. Every watt and pace figure matches the stated FTP or threshold pace.
3. Each targeted bike day names exactly one workout file; each targeted run has a pace block.
4. The validator reports no errors, or the manual check found none.
5. Every `.zwo` passes the checklist in `references/zwift-xml.md`; every Intervals.icu event passes the list in `references/intervals-icu.md`.
6. The closing message states the week id, emphasis, profile, level and phase, previous-week line, and the files created.
