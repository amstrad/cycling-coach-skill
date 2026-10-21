# First-time setup

Use this when `athlete-profile.json` is absent or incomplete. Keep it short and write the profile at the end. Use an interactive picker when the agent has one; otherwise ask the questions as one numbered list, in two or three messages at most. Start in English and switch language as soon as the athlete chooses one. Once the file is written, continue straight into the week in the same turn.

## Questions

Ask the core questions first. The sport answer decides which sport-specific questions follow; skip the others.

### Core (everyone)

1. Which language should your schedules use? (English, Español, Français, Deutsch, Nederlands, Italiano, …)
2. Which units? (metric km and km/h, or imperial mi and mph)
3. Which sport is this plan for? (cycling / running / both; default cycling)
4. What is your main aim this season? (free text, concrete: a group pace, an event, a climb, a time)
5. Is there a target event? (type and date; optional)
6. How old are you? (years; sets recovery spacing)
7. Gender? (male / female / other; used only for benchmark context; skip if you prefer)
8. Body weight? (kg or lb; stored as kg)
9. How many years have you trained consistently, and about how many hours a week? (sets the level)
10. Which days can you usually train? (default: all)
11. Typical session length? (minutes, e.g. 60 or 90; the weekly check-in can change it per day)
12. How many key sessions per week? (1, 2, or 3; default 2; the plan may use fewer for your level)
13. Gym by default? (strength + core / core only / none)
14. Any constraints the plan must respect? (injuries, fixed days off, shift work; optional)
15. Do you use Intervals.icu? If yes: your athlete ID, how the API key will be provided (`intervals-icu.md`), and whether planned workouts should go to your calendar.
16. Any wording preferences? (tone, things to avoid; optional)

### Cycling (`cycling` or `both`)

17. Do you know your FTP? (watts, or "no" to estimate from synced data or a test)
18. Any target W/kg? (optional)
19. Which days are normally social or group rides? (default: Saturday and Sunday)

### Running (`running` or `both`)

20. A recent race time (distance and time) or a 30-min time-trial pace.
21. Threshold heart rate, if known.
22. Typical weekly running distance.

> **About gender:** Strava or Intervals.icu can fill this when the field is empty. Ask anyway so the file is complete before the first sync.

## Write the profile

Map the answers to the fields in `profile-schema.md` and write `athlete-profile.json`. Leave `powerProfileOverride`, `level`, and `trainingState` null so they are derived from data. Set `exportFormat` from question 15 (`zwo`, or `zwo+intervals` when the athlete wants calendar publishing). Confirm in one line, then continue into the week.

If FTP is unknown, set `baselineFtp` to a conservative estimate (2.5 W/kg × weight) and say that the first sync or an FTP test will replace it. If running threshold pace is unknown, estimate it from a race time with the Riegel formula in `running-model.md`, or schedule a 30-min time trial in week 1 and plan that week by effort.

A complete example for each kind of athlete is in `examples/profiles/`.
