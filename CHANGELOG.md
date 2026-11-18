# Changelog

Notable changes are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- `ultra-distance.md`: an ultra is now an event of 350 km or more, of 20 h or more in one push, or a multi-day event (was 8 h or more). Shorter events, including 200–300 km gran fondos and a 300 km brevet, are planned as gran fondos; from 8 h they borrow the guide's durability, pacing and fuelling. `SKILL.md`, `periodization.md` and `power-profiles.md` follow.
- `README.md`: describes the event guides, the evidence table, and the new validator checks.

## [1.1.0] - 2026-11-18

### Coaching knowledge (`references/`)

- New guides: `hill-climb.md` (one timed climb), `ultra-distance.md` (events of 8 h or more), and `heat-training.md` (heat sessions with a core-temperature sensor).
- `interval-catalog.md`: indoor variants with a cap on the longest unbroken work block, and fixed interval lengths at every level.
- `gym-catalog.md`: dumbbell and kettlebell substitutions, and inspiratory muscle training.
- `power-profiles.md`: hill-climb and ultra objectives, and the three-tier rider-shape pyramid.
- `fuelling.md`: a row for efforts of 12 h or more. `periodization.md`: a pointer to the ultra taper.

### Evidence

- New `references/evidence.md`: 17 papers on durability, climbing, sleep in multi-day events, and carbohydrate intake, each with its finding, evidence level, link, and the guide it supports. Guides cite rows as (E04).
- `ultra-distance.md`: new sections on durability (what it is, why intensity matters more than kJ, adjusting late targets) and on sleep in multi-day events; evidence for pacing; carbohydrate ranges by hours of effort, stated as orientation, with the debate above 90 g/h.
- `hill-climb.md`: W/kg against allometric scaling, why a flat FTP does not transfer to a climb, and pacing with critical power and W′.
- `testing-and-zones.md`: an optional durability test, built on published methodological guidance.
- `fuelling.md`: pointers to the evidence. No number changed.

### Changed

- Cycling heart-rate zones now use Coggan's five bands (Z2 = 68–83 % LTHR, was 81–89 %), in `testing-and-zones.md` and `zones.bikeHrPctLthr`. The guide also says how to estimate LTHR and HRmax when they are missing.

### Rules and tooling

- `assets/rules.json`: new `indoorMaxBlockMinutes`, `heat`, and `powerProfile.pyramid`, `base`, and `radar` blocks.
- `assets/rules.json`: new `durability-test` session, and `durabilityTest` and `fuelling` blocks. Each carries a `source` that points at a row of `references/evidence.md`.
- Validator: error `DURABILITY_TEST_SAME_DAY` (a durability test on the same day as another benchmark) and warning `CARB_ABOVE_EVIDENCE` (a session's optional `carbGPerHour` above 90 g/h).
- `assets/week-plan.schema.json`: optional `carbGPerHour` on a session.
- `npm test` checks that every `source` and every in-text citation resolves to an evidence row, and that examples raise the warnings they list in `expectWarnings`.

## [1.0.1] - 2026-10-21

### Documentation

- Windows install instructions for Claude Code, using the `tar` bundled with Windows, since `unzip` is not installed by default and `Expand-Archive` rejects the `.skill` extension.
- Install now names the folder `SKILL.md` must sit in, and the "folder too deep" layout a GUI extract can produce.

## [1.0.0] - 2026-10-21

First public release.

### Skill

- `SKILL.md` entry point in the open Agent Skills format. It works in Claude Code, the Claude apps, Hermes Agent, and other compatible agents.
- Flow: load or create the athlete profile, run the weekly check-in, gather signals, then classify the power profile, level, phase, and progression. Then build, validate, and deliver the week.
- Cycling and running (5k to marathon), alone or combined.

### Coaching knowledge (`references/`)

- Folder layout follows the Agent Skills conventions (`references/`, `assets/`, `scripts/`, `examples/`). `SKILL.md` names every shipped file, so Hermes URL installs copy the complete skill.

- Planning rules: hard constraints, age- and level-based spacing, high-intensity limits, gym placement, deload cadence, ramp caps, illness and readiness overrides, the push/hold/step-down decision, and validator codes.
- Athlete levels, periodization with load formulas and tapers, season planning, the coaching model, and power profiles.
- Cycling and running catalogs with per-block rotation and progression steps.
- Running model, gym catalog, session adjustments, testing and zones, and fuelling.

### Data and outputs

- Intervals.icu (connector or REST API, with optional calendar publishing), Strava, and Garmin export support, with a source-priority table.
- Markdown schedule, Zwift `.zwo` workouts, gym sheet, structured week plan, and Intervals.icu events.

### Rules and tooling

- `assets/rules.json`: a machine-readable mirror of every planning number, for app integration.
- `assets/athlete-profile.schema.json` and `assets/week-plan.schema.json` (JSON Schema 2020-12).
- `scripts/validate-week.mjs`: a dependency-free validator for week plans, with stable error codes.
- `examples/`: four athlete profiles with valid weeks, plus invalid weeks that must fail with specific codes.
- `npm test` checks the skill frontmatter, file references, rule consistency, and examples. CI runs it on every push; tagged releases publish `cycling-coach-skill.skill`.
