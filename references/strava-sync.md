# Strava sync and snapshot

Sync the rider's recent data before building, so the week reflects what they actually did and their current numbers. This is per-rider: each person connects their own account.

## Calls

The tool names below come from a Strava MCP connector. Other connectors or a direct Strava API client name them differently, so map each call by what it returns.

1. `get_athlete_zones` — current FTP (`ftp`) and zones. This FTP drives the week. Note `ftp_is_estimated`.
2. `get_athlete_profile` — name, weight, measurement preference, and **gender**. Fill the profile's `gender` field from this **only when it is empty** (the rider skipped it during setup). Never replace an existing value; the rider's stated choice wins. If the two disagree, mention it and ask. Strava does **not** return age — that always comes from `athlete-profile.json`.
3. `list_activities` with `range_start` about 14 days back — recent rides. Keep `Ride` and `VirtualRide`; when `sport` is `running` or `both`, also keep `Run` and `VirtualRun`. Convert `avg_speed` (m/s) to km/h (×3.6) or mph (×2.237) per `units`. Treat `relative_effort` as `re`.
4. `get_activity_performance` on the hardest rides of the last 6–12 weeks (highest relative effort, races, tests) — take the best `best_efforts` value per duration (5 s, 1 min, 5 min, 20 min, …) across them. That merged curve feeds the power-profile derivation.

## Summarise the previous week

For the last 7 days, collect rides, total distance, hours (`moving_time`), elevation, and the number of hard days. Compress it into one sentence in the rider's language and use it to set the new week's load. If Strava is unreachable, say so, use `baselineFtp`, and continue.

## Tag last week's session patterns

For each ride in the last 7 days with a high relative effort (a structured ride), take the activity `name` and map it to the nearest pattern id in `assets/rules.json` (the same ids the catalogs use), using the name as a hint. Check the more specific rows first:

| Name contains… | Pattern |
|----------------|---------|
| "sweet spot", "sweetspot", "ss" | `sub-threshold` |
| "over-under", "over under", "ou" | `oscillating-threshold` |
| "30/15", "3015", "30-15" | `30-15s` |
| "40/20", "4020", "30/30", "3030" | `40-20s` |
| "ladder" | `shrinking-ladder` |
| "vo2", "vo2max", "4x4", "5x4", "intervals" | `aerobic-ceiling` |
| "low cadence", "force", "mt" | `low-cadence-force` |
| "torque", "stomp" | `torque-starts` |
| "test", "ramp test" | `ftp-test` |
| "threshold", "ftp" | `threshold` |
| "endurance", "z2", "easy" | `aerobic-base` (over 3 h: `long-ride`) |
| "tempo" | `tempo` |
| "sprint" | `sprints` |
| *(runs)* "tempo", "threshold", "cruise" | `cruise-intervals` / `threshold-tempo` |
| *(runs)* "800", "1000", "vo2", "reps" | `vo2-reps` |
| *(runs)* "hill" | `hill-reps` |
| *(runs)* "long" | `long-run` |
| *(runs)* "mp", "marathon pace" | `mp-tempo` |

For runs without a name hint, classify by pace: average pace within 5 % of threshold pace → `threshold-tempo`; faster → `vo2-reps`; over 90 min → `long-run`. If nothing matches, mark the pattern `unknown`. Pass the list to the classification step in `SKILL.md`, so the new week continues the current block's pair at the right step.
