# Changelog

Notable changes are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
