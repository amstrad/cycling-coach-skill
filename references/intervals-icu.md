# Intervals.icu — reading data and publishing planned workouts

Intervals.icu aggregates activities from Garmin, Wahoo, Coros, Suunto, Zwift, and uploads. It computes load, fitness, and power and pace curves consistently across every sport. When an athlete uses it, it is usually the best single source. The skill can also write the week's sessions to the athlete's Intervals.icu calendar, which then syncs them to Garmin, Wahoo, or Zwift.

## Connecting

Use whichever access the agent has, in this order:

1. **An Intervals.icu MCP connector or tool**, if one is installed. Map its tools to the calls below by what they return (athlete, activities, wellness, events, curves). Tool names vary between connectors.
2. **The REST API directly** at `https://intervals.icu/api/v1`.
   - Auth is HTTP Basic, with username `API_KEY` and the athlete's personal API key as the password. The athlete creates the key under *Settings → Developer Settings*.
   - The athlete ID looks like `i123456`. It appears in the same settings page. The value `0` means "the athlete who owns this key".
   - Read the key from the environment (`INTERVALS_API_KEY`) or ask for it for this session only. Never write the key into `athlete-profile.json`, the schedule, or any output, and never echo it back.

Store only `intervalsAthleteId` in the profile. If the API returns 401 or 403, say so, fall back to Strava, Garmin, or the profile, and continue.

## Calls

All dates are local `YYYY-MM-DD`.

| Need | Request | Use |
|---|---|---|
| Athlete and thresholds | `GET /athlete/{id}` | `sportSettings[]` holds per-sport `ftp`, `indoor_ftp`, `lthr`, `max_hr`, `threshold_pace`, `w_prime`, and zone arrays. Match the entry whose `types` contains `Ride` or `Run`. Also read `icu_weight`, `sex`, and the date of birth or age when present. |
| Recent activities | `GET /athlete/{id}/activities?oldest=<today−14>&newest=<today>` | History and last week's patterns. |
| Fitness and readiness | `GET /athlete/{id}/wellness?oldest=<today−42>&newest=<today>` | `ctl`, `atl`, `rampRate`, `restingHR`, `hrv`, `sleepSecs`, `sleepScore`, `readiness`, `weight`, and subjective scores (`soreness`, `fatigue`, `stress`, `mood`, `motivation`). |
| Power curve | `GET /athlete/{id}/power-curves?type=Ride&curves=84d` | Best power per duration over 84 days. This feeds `power-profiles.md`. |
| Pace curve | `GET /athlete/{id}/pace-curves?type=Run&curves=84d` | Best paces for runners. Confirms threshold pace and race predictions. |
| Planned calendar | `GET /athlete/{id}/events?oldest=<mon>&newest=<sun>` | Sessions already planned, races (`category: RACE_A/B/C`), and notes for the week. |
| Publish the week | `POST /athlete/{id}/events/bulk?upsert=true` | See *Publishing* below. |

Exact query parameters and field names can change between API versions. If a field is missing, look for the nearest equivalent in the response and say what was used.

### Field mapping

| Intervals.icu field | Skill meaning |
|---|---|
| `sportSettings.ftp` (Ride) | The week's FTP. Prefer `indoor_ftp` for `.zwo` and indoor sessions when it is set. |
| `sportSettings.threshold_pace` (Run) | Threshold pace in metres per second. Convert with `thresholdPaceSecPerKm = 1000 ÷ value`. |
| `sportSettings.lthr` | LTHR for that sport. Keep running and cycling LTHR separate. |
| `activity.icu_training_load` | Session load. Treat it as TSS for rides and rTSS or hrTSS for runs, already on one scale. |
| `activity.icu_intensity` | Intensity factor. It may be expressed as a percentage, for example `82` for 0.82. |
| `activity.icu_weighted_avg_watts` | Normalized power. Divide by FTP to classify effort with the table in `garmin-snapshot.md`. |
| `activity.icu_ftp` | The FTP in force when the ride happened. Use it, not today's FTP, to judge past sessions. |
| `activity.icu_rpe`, `activity.feel` | The athlete's own rating. Feeds session scoring in `adjustments.md`. |
| `activity.decoupling` | Aerobic decoupling. Read it with `testing-and-zones.md`. |
| `activity.type` | `Ride`, `VirtualRide`, `Run`, `VirtualRun`, and others. Same filter as `strava-sync.md`. |
| `activity.trainer` | True for indoor rides. Useful for the indoor-versus-outdoor FTP difference. |
| `wellness.ctl`, `wellness.atl` | CTL and ATL. ACWR = `atl ÷ ctl`. TSB = the previous day's `ctl − atl`. |
| `wellness.rampRate` | CTL change per week. Compare it with ramp-cap rule 9 in `planning-rules.md`. |
| `wellness.hrv`, `wellness.restingHR` | Compare today with the 7-day mean. HRV ≥ 10 % below the mean, or resting HR 5+ bpm above it, is a readiness flag (rule 12). |
| `wellness.sleepSecs` | Under 6 h (21,600 s) is a readiness flag. |
| `wellness.soreness`, `fatigue`, `stress` | Subjective scores. A worst-of-scale value on a key-session day is treated like low readiness. Check the scale direction in the response before applying it. |

### Strava-sourced activities

Strava's terms prevent Intervals.icu from exposing activities that arrived only through Strava. Such activities may come back with few or no fields. If most recent activities look empty, tell the athlete. Suggest connecting the device (Garmin, Wahoo, Coros) to Intervals.icu directly, and meanwhile take history from the Strava sync.

## Priority when several sources exist

| Signal | First choice | Fallback |
|---|---|---|
| FTP, LTHR, threshold pace, zones | Intervals.icu `sportSettings` | Garmin export, then Strava zones, then profile |
| Load (CTL, ATL, ramp rate) and session load | Intervals.icu | Garmin export |
| Power and pace curves | Intervals.icu curves | Strava best efforts |
| HRV, sleep, resting HR | Intervals.icu wellness, when synced from a wearable | Garmin export |
| Garmin training readiness and recovery window | Garmin export (Intervals.icu does not compute them) | none |
| Activity names for pattern tags | Intervals.icu or Strava, whichever has the name | NP ÷ FTP classification |
| Races and fixed sessions this week | Intervals.icu calendar | the check-in |

If FTP differs between sources by more than 3 %, say so and ask which to trust. Intervals.icu usually holds the value the athlete set deliberately.

## Reading the calendar before planning

- A `RACE_A`, `RACE_B`, or `RACE_C` event this week counts as a hard day, and an A race sets `eventDate` when the profile has none. Apply the taper rules in `periodization.md`.
- Planned workouts the athlete created themselves are fixed. Plan around them and count them under the rules in `planning-rules.md`.
- Workouts the skill published in an earlier run carry an `external_id` that starts with `cycling-coach-skill-`. They are replaced on upsert, never duplicated.
- Notes (`category: NOTE`) such as "travel" or "sick" are constraints for that day.

## Publishing the week (optional)

Writing to the calendar changes the athlete's account and syncs to their devices. Show the week first and ask once before publishing. Save the answer as `publishToIntervals` in the profile so later weeks can follow it.

Send one event per targeted session and per easy session the athlete wants on the calendar. Use a bulk upsert so re-running the week replaces rather than duplicates.

```json
[
  {
    "category": "WORKOUT",
    "start_date_local": "2026-10-27T00:00:00",
    "type": "Ride",
    "name": "Sub-threshold 2x20",
    "external_id": "cycling-coach-skill-2026-W44-tue",
    "moving_time": 3900,
    "description": "Warmup\n- 10m ramp 45-75%\n\nMain set 2x\n- 20m 90% 88-92rpm\n- 5m 50%\n\nCooldown\n- 10m ramp 60-40%"
  }
]
```

- `external_id` is `cycling-coach-skill-<ISO week>-<day>`, lowercase. Add a suffix such as `-am` for a second session on the same day.
- `type` is `Ride`, `VirtualRide`, `Run`, or `WeightTraining` for gym sessions, which take a plain-text description.
- `moving_time` is the planned duration in seconds. Intervals.icu computes planned load from the description.
- When the `.zwo` should travel unchanged, events can instead carry the file (`filename` plus `file_contents`, or a base64 variant, depending on API version). Prefer the description syntax because Intervals.icu converts it for every device.

Every published name, date, and target must match the markdown schedule exactly. After publishing, list what was created or updated in the closing message.

## Workout description syntax

Intervals.icu parses a plain-text workout. Each step is a line that starts with `- `, followed by a duration or distance, then a target, then optional cadence and cue text.

| Element | Syntax | Example |
|---|---|---|
| Duration | `s`, `m`, `h`, combined | `30s`, `4m`, `1m30`, `1h15m` |
| Distance (runs) | `km`, `mi`, or `mtr` for metres (`m` means minutes) | `1km`, `400mtr` |
| Power | `% ` of FTP, watts, or zone | `90%`, `250w`, `Z2` |
| Range or ramp | range, or the `ramp` keyword | `88-92%`, `ramp 45-75%` |
| Heart rate | `% HR` (of max) or `% LTHR` | `75% LTHR` |
| Pace | `% Pace` (of threshold pace) or absolute | `95% Pace`, `4:30/km Pace` |
| Cadence | `rpm` | `95rpm`, `55-65rpm` |
| Repeats | `Nx` on a section header line, or on its own line before the steps | `Main set 3x` |
| Cue | free text after the target | `- 4m 115% 95rpm stay seated` |

A blank line separates sections. Cue text is shown on the device, so write it in the athlete's language.

### Translating catalog sessions

```text
30/15s 3x13
Warmup
- 15m ramp 45-75%

Set 1 13x
- 30s 118% 100rpm
- 15s 50%

- 3m 50%

Set 2 13x
- 30s 118% 100rpm
- 15s 50%

- 3m 50%

Set 3 13x
- 30s 118% 100rpm
- 15s 50%

Cooldown
- 10m ramp 60-40%
```

```text
Cruise intervals 4x5 (run)
Warmup
- 15m 70% Pace
- 4x 20s 110% Pace

Main set 4x
- 5m 100% Pace
- 1m 60% Pace

Cooldown
- 10m 70% Pace
```

- Pace percentages are of threshold speed, so 100 % is threshold pace and higher numbers are faster. To prescribe a slower pace, use a lower percentage, never a negative offset.
- Sprints and torque starts: write the step at a high target and add the cue "max effort, ERG off". Devices in ERG mode cannot follow a maximal effort.
- Over-unders: alternate the two steps inside one repeated section (`- 3m 95%` then `- 1m 105%`).

## Validation before publishing

1. Every event has `category`, `start_date_local`, `type`, `name`, and a stable `external_id`.
2. The total duration of the description matches `moving_time` within 2 minutes.
3. Every target uses the anchor stated in the schedule (FTP, indoor FTP, or threshold pace).
4. No event falls on a day the schedule marks as rest, and no fixed calendar item was overwritten.
5. The API key does not appear anywhere in the output.
