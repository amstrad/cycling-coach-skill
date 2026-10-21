# athlete-profile.json — the athlete's personal file

This file holds the facts about the person the plan is for. Every athlete keeps their own copy, beside the skill or in the working directory when the skill folder is read-only. The skill reads it at the start of every run and updates `trainingState` at the end. The machine-readable schema is `assets/athlete-profile.schema.json`; worked examples are in `examples/profiles/`.

Only `name`, `language`, `units`, `sport`, `objective`, and `age` are required. Every other field has a default or is derived.

| Field | Type | What it means |
|---|---|---|
| `name` | string | Athlete's name, used in greetings. |
| `language` | string | Language for everything the athlete reads (`en`, `nl`, `fr`, `de`, `es`, `it`, …). Machine keys stay English. |
| `units` | string | `metric` (km, km/h) or `imperial` (mi, mph). Power is always watts. Gym loads follow `units` (kg or lb); body weight is always stored in kg. |
| `voiceGuidelines` | string | Tone and wording rules to follow, including phrases to avoid. |
| `objective` | string | The athlete's main aim in their own words. Keep it concrete. Each week is designed toward it. |
| `age` | integer | Age in years. Sets recovery spacing (riders 40+ need more room between hard days) and gives W/kg context. Strava does not provide it, so always ask during setup. |
| `gender` | string or null | `male`, `female`, or `other`. Filled from Strava or Intervals.icu only when empty; ask during setup. Used only to contextualise W/kg benchmarks and load norms. |
| `weightKg` | number | Body weight in kilograms (for W/kg). Imperial users still store kg; convert during setup. |
| `baselineFtp` | integer or null | FTP in watts, used when no data source is reachable. A synced FTP overrides it. |
| `goalWkg` | number | Target W/kg, for context and progress tracking. |
| `socialDays` | string[] | Days that normally mean a social or group ride, e.g. `["Sat","Sun"]`. No structure is imposed on them. |
| `openDays` | string[] | Days the athlete can usually train. The weekly check-in may narrow this. |
| `usualDurationMin` | number | Default session length in minutes (e.g. `60`). The weekly check-in may change it per day. |
| `targetedSessionCap` | integer | Maximum targeted key sessions in a week (usually 2). |
| `gymDefault` | string | `strength+core`, `core`, or `none`. |
| `powerProfileOverride` | string or null | Force a profile (`explosive`, `balanced`, `steady`) instead of deriving it. Null means derive from the power curve. |
| `exportFormat` | string | `"zwo"` (Zwift XML files), `"intervals"` (Intervals.icu calendar events), or `"zwo+intervals"`. Saved after the athlete confirms it during check-in. |
| `intervalsAthleteId` | string or null | Intervals.icu athlete ID, for example `i123456`. The API key is never stored here (`intervals-icu.md`). |
| `publishToIntervals` | string | `ask` (default), `always`, or `never`. Whether to write the week to the Intervals.icu calendar without asking again. |
| `sport` | string | `cycling` (default), `running`, or `both`. Selects the catalog and the sport-specific rules (`running-model.md`). |
| `level` | string or null | `beginner`, `intermediate`, `advanced`, or null to derive it with `athlete-levels.md`. |
| `trainingAgeYears` | number | Years of consistent training in the sport. Feeds the level score. |
| `weeklyHours` | number | Typical training hours per week across sports. Feeds the level score and the load bands. |
| `eventType` | string or null | `criterium`, `road-race`, `gran-fondo`, `time-trial`, `climb`, `5k`, `10k`, `half-marathon`, `marathon`, or null. Sets the phase emphasis and the taper. |
| `eventDate` | string or null | ISO date of the A-event. Weeks-to-go selects the phase in `periodization.md`. |
| `thresholdPaceSecPerKm` | integer or null | Running threshold pace in seconds per km (stored metric even for imperial users). Anchors every run zone. |
| `lthr` | integer or null | Lactate-threshold heart rate (bpm). Used for HR cues and hrTSS when pace or power is missing. |
| `maxHr` | integer or null | Maximum heart rate (bpm), optional context. |
| `weeklyKm` | number or null | Typical running distance per week. Drives the 10 % ramp rule. |
| `trainingState` | object or null | Where the athlete is in the plan, updated at the end of each delivered week: `blockIndex` (integer, counts mesocycles), `blockType` (`3:1` or `2:1`), `blockWeek` (1-based; the last week is the deload), `patternSteps` (map of pattern → last completed step), `lastDeloadWeek` (ISO week id), `missedKeySessions` (count in the last two weeks), and optionally `seasonPlan` (week rows from `season-plan.md`). Null means start a new block. |
| `constraints` | string[] | Free-text limits the plan must respect, e.g. `"no running on consecutive days"`, `"knee niggle"`, `"night shifts Wed"`. Read every week. |

## How age, gender, and level shape the design

- **Age** sets recovery spacing, deload cadence, and the strength minimum. The rules are in `planning-rules.md` (rule 3 and the age table).
- **Level** sets the key-session count, volume, and progression speed (`athlete-levels.md`). Beginners get one key session and no high-intensity work for their first 8 consistent weeks.
- **Gender** only selects the matching W/kg or race-time reference when framing progress. It never changes watt or pace targets, which already follow from FTP and threshold pace.

Day keys are the three-letter English forms `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`, so the file stays readable in any output language.
