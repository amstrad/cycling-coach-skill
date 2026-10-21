# Cycling Coach skill

[![CI](https://github.com/amstrad/cycling-coach-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/amstrad/cycling-coach-skill/actions/workflows/ci.yml)

An agent skill that plans endurance training like a professional coach, for cycling and for running from 5k to the marathon. Each week becomes a markdown schedule plus a workout for every key session, checked against explicit coaching rules before delivery.

It follows the open [Agent Skills](https://agentskills.io) format, so it runs in Claude Code, the Claude apps, Hermes Agent, and any other agent that loads `SKILL.md` skills. The coaching rules also come as machine-readable JSON with a validator, so a training app can apply the same logic without an AI in the loop.

## What it does

Ask for a week ("map my week", "plan my marathon week") or a season ("plan the 16 weeks to my event"). The skill:

1. Loads the athlete's profile. On the first run it asks setup questions and creates it.
2. Runs a short check-in: available days, group rides, how the last key sessions went, gym, and export format.
3. Pulls thresholds, load, readiness, and recent history from Intervals.icu, Strava, or a Garmin export.
4. Classifies the power profile, level, season phase, and block week. It then decides whether the progression moves up, holds, or steps back.
5. Builds an easy-heavy week: by default one high-intensity session, one threshold session, a long day, and easy volume.
6. Validates the week against the planning rules, fixes any violation, then writes the files.

The main rules include:

- no two high-intensity days in a row
- never three hard days in a row
- recovery spacing by age
- limits by level, such as no high-intensity work for new beginners
- gym never the day before a key session
- load ramp caps and a deload every 3 or 4 weeks
- running distance ramps, long-run share, and impact limits
- illness and low-readiness overrides

## Install

Download `cycling-coach-skill.skill` from the [latest release](https://github.com/amstrad/cycling-coach-skill/releases/latest). It is a zip archive with one `cycling-coach-skill/` folder inside. The folder name must stay as it is, because it has to match the skill's name.

If a skill does not appear after installing, it is almost always a folder too deep. The loader needs `SKILL.md` directly inside a directory whose name matches the `name:` in its frontmatter.

### Claude Code

```bash
unzip cycling-coach-skill.skill -d ~/.claude/skills/     # for you, in every project
unzip cycling-coach-skill.skill -d .claude/skills/       # or for one project only
```

On Windows, `unzip` is not installed by default, and `Expand-Archive` rejects the `.skill` extension. The `tar` that ships with Windows 10 1803 and later reads it:

```powershell
# for you, in every project
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null
tar -xf cycling-coach-skill.skill -C "$env:USERPROFILE\.claude\skills"

# or for one project only
New-Item -ItemType Directory -Force ".claude\skills" | Out-Null
tar -xf cycling-coach-skill.skill -C ".claude\skills"
```

The `New-Item` lines are not optional: `tar -C` exits with a usage message if the destination does not exist yet. Renaming the file to `.zip` and using `Expand-Archive` also works, and creates the destination folder for you. Use `%USERPROFILE%` in `cmd.exe`; `~` is not expanded there.

Check that `.claude/skills/cycling-coach-skill/SKILL.md` exists, with `SKILL.md` directly inside that folder. A GUI "Extract All" that makes a folder named after the archive puts the files one level too deep, at `cycling-coach-skill/cycling-coach-skill/SKILL.md`, where the loader will not find them.

Start a new session. The skill appears as `/cycling-coach-skill`.

### Claude apps (claude.ai, desktop)

Open *Settings → Capabilities*, enable Skills, and upload `cycling-coach-skill.skill`. If the uploader only accepts `.zip`, rename the file; the contents are the same.

### Hermes Agent

Hermes keeps user skills in `~/.hermes/skills/`, optionally inside a category folder ([Hermes skills docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)).

```bash
unzip cycling-coach-skill.skill -d ~/.hermes/skills/            # or ~/.hermes/skills/fitness/
```

This creates `~/.hermes/skills/cycling-coach-skill/SKILL.md`. Hermes announces newly installed skills on the next message. Run `/reload-skills` to refresh the `/cycling-coach-skill` slash command in a running session.

Hermes can also install straight from the raw `SKILL.md` URL. URL installs copy only the files that `SKILL.md` names under `references/`, `assets/`, `scripts/`, and `examples/`. This skill names every file it ships, so the result should match the zip. If anything is missing, use the zip.

```bash
hermes skills install https://raw.githubusercontent.com/amstrad/cycling-coach-skill/main/SKILL.md --name cycling-coach-skill
```

For a project-only install, unzip into `<project>/.hermes/skills/` and run `hermes skills trust`.

### Other agents

Unzip the package into the agent's skills directory, so that `<skills-dir>/cycling-coach-skill/SKILL.md` exists.

### From source

Building needs Node.js 18+, `zip`, and `perl`. The build runs the tests first.

```bash
git clone https://github.com/amstrad/cycling-coach-skill.git
cd cycling-coach-skill
npm run build            # tests, then writes ./cycling-coach-skill.skill
```

## Use

Invoke it by name where the agent supports slash commands, or just ask:

```
/cycling-coach-skill
```

> "Map my week." · "Plan my 10k week." · "I missed Tuesday's intervals, fix the rest of the week." · "Plan the weeks to my gran fondo on 16 May."

Requests in other languages work too. Schedules come back in the language and units saved in the profile.

The first run asks a short set of questions and saves the answers as `athlete-profile.json` beside the skill. If the skill folder is read-only, the file goes in the working directory. Later runs go straight to the weekly check-in. The profile holds personal data and is gitignored by default.

## Data sources

All sources are optional. With none, the skill plans from the FTP or threshold pace in the profile.

| Source | How it connects | What it provides |
|---|---|---|
| **Intervals.icu** | An Intervals.icu MCP connector, or the REST API with the athlete ID and a personal API key | Thresholds and zones, fitness and fatigue, HRV, sleep, resting HR, 84-day power and pace curves, activities with load, and the planned calendar. It can also receive the week as calendar events. |
| **Strava** | A Strava MCP connector | FTP and zones, recent rides and runs, best efforts, and activity names for tagging past sessions |
| **Garmin** | A JSON export pasted into the chat, made with the [Garmin Workout Importer](https://chromewebstore.google.com/detail/garmin-workout-importer/faebbfokokipdpkbolpbpfadmgdbanpo) extension | Training readiness, HRV status, sleep, body battery, training load and status, and recovery time |

When several sources are connected, a priority table in `references/intervals-icu.md` decides which one wins for each signal.

To connect Intervals.icu, create an API key under *Settings → Developer Settings*. Provide it through the `INTERVALS_API_KEY` environment variable, or for a single session. The skill stores only the athlete ID and never writes or prints the key. Activities that reached Intervals.icu only through Strava come back nearly empty from its API, because of Strava's terms. Connect your device to Intervals.icu directly to avoid this.

## Output

Files go to `./output/`. If the agent cannot write files, everything is printed in the chat.

| File | Contents |
|---|---|
| `YYYY-Wnn-schedule.md` | The week: objective, phase, block and week type, level, anchors used, planned load, day table, session details with watts or paces, fuelling cues, gym, and any rule that moved a session. |
| `*.zwo` | One Zwift workout per key bike session, also printed inline. |
| `YYYY-Wnn-gym.md` | The full strength session, when one is scheduled. |
| `YYYY-Wnn-plan.json` | The validated week in structured form. |
| `season-plan.md` | The week-by-week outline to the event, for multi-week requests. |
| Intervals.icu events | Optional. Structured workouts that sync to Garmin, Wahoo, or Zwift. The skill asks before writing, and re-running a week updates events instead of duplicating them. |

Runs are delivered as detail blocks with pace ranges and heart-rate caps.

## For app developers

The skill's knowledge is split into prose for agents and data for code. Both describe the same rules.

| Path | Contents |
|---|---|
| `assets/rules.json` | Every planning number: session classes and load estimates, rotation tables, progression steps, age and level limits, load and ramp caps, running caps, tapers, phases, and zones. |
| `assets/athlete-profile.schema.json` | JSON Schema for the athlete profile. |
| `assets/week-plan.schema.json` | JSON Schema for a structured week plan. |
| `scripts/validate-week.mjs` | A dependency-free validator that checks a week plan against `rules.json` and reports stable error codes. |
| `examples/` | Four athlete profiles with valid weeks, plus broken weeks that must fail with specific codes. |

Validate a plan from the command line:

```bash
node scripts/validate-week.mjs my-week.plan.json --profile athlete-profile.json
node scripts/validate-week.mjs my-week.plan.json --json      # machine-readable
```

Or from code:

```js
import { validatePlan, loadRules } from './scripts/validate-week.mjs';

const { errors, warnings, summary } = validatePlan(plan, profile, loadRules());
```

Exit code 0 means no errors, 1 means rule errors, and 2 means unreadable input. The error codes and the rules they enforce are listed at the end of `references/planning-rules.md`.

## The guides

| Guide | Contents |
|---|---|
| `planning-rules.md` | Hard constraints, sequencing, intensity distribution, the push/hold/step-down decision, age and level tables, things to avoid, and validator codes. |
| `athlete-levels.md` | Level scoring and what each level gets. |
| `periodization.md` | Load formulas, session load estimates, phases counted back from the event, tapers, block patterns, and the weekly build algorithm. |
| `season-plan.md` | Multi-week outlines and re-planning. |
| `coaching-model.md` | Limiters, the easy-heavy week, blocks, recovery by age, and session shapes. |
| `power-profiles.md` | Explosive, balanced, or steady from the power curve. |
| `interval-catalog.md` | Cycling sessions, per-block rotation, and progression steps. |
| `running-model.md` | Running zones, weekly structures for 5k to marathon, and runner-specific rules. |
| `running-catalog.md` | Running sessions, progressions, rotation per distance, and example weeks. |
| `gym-catalog.md` | Strength, core, and running-resilience work. |
| `adjustments.md` | Session scoring and repairing a week after missed or failed sessions. |
| `testing-and-zones.md` | FTP and threshold-pace tests, zones, and rules for updating them automatically. |
| `fuelling.md` | Fuelling and recovery cues, plus red flags. |
| `intervals-icu.md`, `strava-sync.md`, `garmin-snapshot.md` | The data sources. |
| `profile-schema.md`, `first-time-setup.md` | Profile fields and setup questions. |
| `schedule-format.md`, `zwift-xml.md` | Output formats. |

## Development

```
SKILL.md            skill entry point
references/         coaching knowledge for agents
assets/             machine-readable rules and JSON schemas
scripts/            week validator (shipped with the skill)
examples/           profiles and weeks that double as tests
tools/              repository checks and packaging (not shipped)
```

Run `npm test` to check the skill frontmatter, every file reference, rule consistency, and the examples. CI runs it on every push and pull request.

When you change a rule, update the guide and `assets/rules.json` together. Then add or adjust an example that shows the change.

To release, bump `version` in `package.json` and add a `CHANGELOG.md` entry. Then push a matching `vX.Y.Z` tag. The release workflow tests, packages, and publishes `cycling-coach-skill.skill` as a GitHub release.

## Scope and safety

The skill applies general endurance-training principles from public coaching practice and sports-science literature. It is not medical advice and does not replace a coach or physician. It never prescribes weight loss or diets. It flags warning signs, such as pain that changes your gait, symptoms after illness, or signs of under-fuelling, and recommends seeing a professional.

## License

MIT. See [LICENSE](LICENSE).
