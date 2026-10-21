# Garmin Coach export — reading and using the snapshot

Riders on Garmin devices can export a structured JSON snapshot covering zones, readiness, training load, and recent activities. It supplements or replaces the Strava sync when supplied. It is the skill's only source for readiness signals (HRV, body battery, sleep) and load analytics (ATL/CTL/ACWR).

## Getting the export

The rider creates it with the **Garmin Workout Importer** Chrome extension:
https://chromewebstore.google.com/detail/garmin-workout-importer/faebbfokokipdpkbolpbpfadmgdbanpo

Ask them to run the export and paste the JSON before each weekly session. Daily exports are unnecessary — one per planning cycle is enough. Ideally it is taken on the morning of the session so readiness reflects the current state.

## When to ask

During the weekly check-in, after availability is confirmed and before sessions are chosen:

> "Do you have a Garmin Coach export from today? Paste the JSON and I can factor in your readiness score, HRV, and training load. If not, no problem — I'll use Strava and your profile."

If both Strava and a Garmin export arrive:
- Use **Strava** for activity names and relative effort (pattern tagging)
- Use **Garmin** for zones, FTP, LTHR, readiness, and TSS/NP
- If FTP differs between them, note the discrepancy and ask which to use (Garmin's auto-detected FTP is often newer)

## JSON structure and field mapping

### `athlete` block — zones and physiology

| Garmin field | Use |
|---|---|
| `athlete.ftp` | The week's FTP. Equal authority to Strava zones; overrides `baselineFtp`. |
| `athlete.vo2max` | Context for the ceiling and aerobic-ceiling session design. Note it in the schedule header. |
| `athlete.weight_kg` | Compare with the profile's `weightKg`. If they differ, note it and ask. |
| `athlete.lthr` | Lactate-threshold heart rate. Use for HR cues alongside power targets. |
| `athlete.zones.power[]` | 7-zone power model. `floor_w` is the zone floor. Use directly instead of deriving from FTP%. |
| `athlete.zones.hr[]` | 5-zone HR model. `floor_bpm` is the zone floor. Use for HR guidance on easy or outdoor rides. |

**Power zone labels** (Garmin 7-zone model):

| Zone | Name | FTP % (approx) |
|------|------|----------------|
| 1 | Active recovery | < 56% |
| 2 | Endurance | 56–75% |
| 3 | Tempo | 76–90% |
| 4 | Lactate threshold | 91–105% |
| 5 | VO2max | 106–120% |
| 6 | Anaerobic | 121–150% |
| 7 | Neuromuscular | > 150% |

### `readiness` block — daily state

Read it every time an export is supplied. It changes how aggressive the week should be.

| Garmin field | How to use |
|---|---|
| `readiness.training_readiness_score` | 0–100. See the decision table below. |
| `readiness.training_readiness_level` | Garmin's label: `low`, `moderate`, `high`. A quick sanity check. |
| `readiness.hrv_status` | `balanced` = normal. `unbalanced` = more recovery needed. `low` = significant stress, reduce intensity. |
| `readiness.hrv_last_night_avg` | One night's HRV. Compare with the 7-day average: ≥ 10% above means primed; ≥ 10% below flags fatigue. |
| `readiness.hrv_7day_avg` | Baseline HRV. Lower means more stress. |
| `readiness.body_battery_high` | Garmin's energy reserve (0–100). Under 50 at the start of the week means warn the rider to check sleep before the first hard session. |
| `readiness.sleep_score` | 0–100. Under 70 means add one easier day or reduce hard-session reps this week. |
| `readiness.sleep_total_hours` | Context for interpreting sleep. Under 6 h plus a low score = treat as if `hrv_status` were `unbalanced`. |

**Training readiness decision table:**

| Score | Action |
|---|---|
| ≥ 70 (high) | Rider is primed. Keep the plan and allow the planned progression step if the push test in `planning-rules.md` passes. Do not add unplanned reps or intensity on top. |
| 40–69 (moderate) | Normal week. No changes. |
| < 40 (low) | Soften the week: turn one hard session into Z2, shorten the long ride, and note the reason in the schedule. |

### `load` block — fitness and fatigue

| Garmin field | How to use |
|---|---|
| `load.ctl` | Chronic Training Load (CTL) — fitness baseline (~42-day weighted average). Higher means fitter. |
| `load.atl` | Acute Training Load (ATL) — recent fatigue (~7-day weighted average). |
| `load.acwr` | Acute:Chronic Workload Ratio = ATL ÷ CTL. The key injury and performance signal. See the table below. |
| `load.training_status` | Garmin's label: `maintaining`, `peaking`, `recovering`, `overreaching`, `detraining`. Use it as a one-line status note. |
| `load.recovery_time_hours` | Do not schedule a hard session inside this window from the export time. If the week's first hard day falls inside it, move it a day later or swap it to Z2. |

**ACWR interpretation:**

| ACWR | Meaning | Action |
|---|---|---|
| < 0.7 | Under-trained / detrained | Safe to ramp volume. Add time to Z2 days before adding intensity. |
| 0.7–1.3 | Optimal range | Normal week. |
| 1.3–1.5 | Caution | Reduce one hard session to sub-threshold or Z2. Watch closely. |
| > 1.5 | High injury risk | Recovery week: cap everything at sub-threshold, extend Z2, skip the second hard session. |

### `recent_activities[]` — training history

Use it when Strava activity names are unavailable. Each entry has `date`, `type`, `tss`, `normalized_power`, `duration_min`, and `avg_cadence`.

**Classify effort from NP ÷ FTP** (use `athlete.ftp`):

| NP ÷ FTP | Classification |
|---|---|
| < 0.70 | Endurance / recovery |
| 0.70–0.84 | Tempo / aerobic |
| 0.85–0.94 | Sub-threshold / threshold |
| 0.95–1.05 | Over-threshold |
| > 1.05 | Aerobic ceiling / anaerobic |

**Estimating last week's load** (when the profile has no TSS target):
- Sum TSS across the last 7 days from `recent_activities`.
- A productive build week for an intermediate rider training 6–10 h a week sits around 350–550 TSS (bands per level in `periodization.md`). Keep the new week within 10% of the last completed week unless ACWR or a deload says otherwise.

**Activity type mapping** (Garmin → skill):

| Garmin `type` | Treat as |
|---|---|
| `road_biking` | Outdoor ride |
| `indoor_cycling` | Zwift / trainer ride |
| `mountain_biking` | Outdoor ride (lower TSS assumption) |
| `virtual_ride` | Indoor trainer |

## Showing Garmin data in the schedule

Add a **Readiness** line to the header whenever Garmin data is supplied:

```markdown
**Readiness:** score 51 / moderate · HRV balanced (58 vs 43 avg) · Sleep 95/100 · ACWR 0.80 · Status: maintaining · Recovery window: 42 h
```

State any adjustment in plain language, for example:
> "ACWR is 0.80 — a good range, so no reduction. The 42 h recovery window ends Tuesday morning, so the first hard session stays on Wednesday."
