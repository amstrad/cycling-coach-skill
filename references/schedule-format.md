# Weekly schedule — markdown format

One file per week, named `YYYY-Wnn-schedule.md`. Every human-facing word and number follows the profile `language` and `units`. Watt targets appear as both `% FTP` and converted watts. File names stay lowercase, hyphenated English.

## File layout

### 1. Header

```markdown
# Training Week YYYY-Wnn
**Objective:** <objective from profile>
**Emphasis:** <one-line aim for the week>
**Phase:** <base / build / peak / taper / race week> · **Week:** <block N, build step N or deload> · **Level:** <level>
**FTP:** <N> W · **Power profile:** <profile> · **Goal W/kg:** <N> *(cycling; omit unset items)*
**Threshold pace:** <m:ss> /km or /mi *(running only)*
**Planned load:** <N> TSS vs <N> last week
**Previous week:** <one-sentence summary of recent activity>
**Readiness:** <score N / level> · HRV <status> · Sleep <score>/100 · ACWR <N> · Status: <training_status> · Recovery window: <N> h *(fill from Intervals.icu wellness or the Garmin export; omit items no source provides, and the whole line when none does)*
```

### 2. Day table

Cover every day, Monday to Sunday. Targeted sessions must name their workout file.

```markdown
| Day | Session | Duration | Notes |
|-----|---------|----------|-------|
| Mon | Rest | — | |
| Tue | Sub-threshold 2×20 + strength | 65 + 45 min | `sub-threshold-2x20.zwo`; gym ≥ 4 h after the ride |
| Wed | Aerobic base | 90 min | Easy outdoors or on the trainer |
| Thu | Aerobic ceiling 5×4 | 60 min | `aerobic-ceiling-5x4.zwo` |
| Fri | Rest or easy spin | — | |
| Sat | Group ride | — | Social, no structure |
| Sun | Long aerobic | 120 min | Z2 outdoors |
```

### 3. Targeted session detail

One subsection per targeted bike or run day. Convert every % FTP target to watts at the week's FTP.

```markdown
### Tuesday — Sub-threshold 2×20
File: `sub-threshold-2x20.zwo`
Targets: 90% FTP · 2 × 20 min @ **221 W** (90% of 245 W), 5 min easy @ 123 W between.
Warm-up 10 min ramp 45→75%, cool-down 10 min.
Total: ~65 min.
```

For runs, give pace and effort instead of watts, in the profile `units`:

```markdown
### Tuesday — Cruise intervals 4 × 5 min
Targets: 4 × 5 min @ **4:25–4:30 /km** (threshold pace), 1 min jog between. HR cap 95–100 % LTHR.
Warm-up 15 min easy + 4 strides, cool-down 10 min.
Total: ~50 min · ~65 rTSS.
```

### 4. Social-ride guidance

A short paragraph for each social day where useful (for example: "Ride at the group's pace; if the bunch went hard, treat it as the second hard day and turn Thursday into easy Z2.").

### 5. Gym and core

When gym work is scheduled, list the full exercises with sets, reps, load, and rest cues in the rider's language. For a full gym session, also save `YYYY-Wnn-gym.md` and point to it here.

```markdown
## Strength & core (Tuesday, after the ride)
Full session: `2026-W26-gym.md`

| Exercise | Sets × Reps | Load / cue | Rest |
|----------|-------------|------------|------|
| Squat | 4 × 5 | heavy, full control | 2–3 min |
| Romanian deadlift | 3 × 8 | hinge from the hips | 90 s |
| Plank | 3 × 45 s | brace hard | 45 s |
```

### 6. Notes and adjustments (optional)

Week-level caveats: fatigue, weather, race preparation. Always state the week type (build step N or deload), the phase from `periodization.md`, the planned weekly load (TSS or rTSS) against last week, and any constraint from `planning-rules.md` that moved or downgraded a session.

---

## Example (English, metric, FTP 245 W)

```markdown
# Training Week 2026-W26
**Objective:** Sit comfortably in a 34 km/h group and follow attacks.
**Emphasis:** Two targeted midweek sessions; weekends social. Raise FTP so holding the bunch stops feeling like threshold.
**Phase:** build · **Week:** block 2, build step 2 · **Level:** intermediate
**FTP:** 245 W · **Power profile:** Explosive · **Goal W/kg:** 3.7
**Planned load:** 430 TSS vs 405 last week
**Previous week:** 4 rides, 288 km, 8.5 h, 741 m climbing, 2 hard days — good load, no lingering fatigue.

## Schedule

| Day | Session | Duration | Notes |
|-----|---------|----------|-------|
| Mon | Rest | — | Recover |
| Tue | Sub-threshold 2×20 + strength | 65 + 45 min | `sub-threshold-2x20.zwo`; gym ≥ 4 h after the ride |
| Wed | Aerobic base | 90 min | Easy 60–70% FTP (147–172 W) |
| Thu | Aerobic ceiling 5×4 | 60 min | `aerobic-ceiling-5x4.zwo` |
| Fri | Rest or easy spin | — | |
| Sat | Group ride | — | Social, no structure |
| Sun | Long aerobic | 120 min | Z2 outdoors |

## Targeted sessions

### Tuesday — Sub-threshold 2×20
File: `sub-threshold-2x20.zwo`
Targets: 90% FTP · 2 × 20 min @ **221 W**, 5 min easy @ **123 W** between.
Warm-up 10 min ramp 45→75%, cool-down 10 min.
Total: ~65 min.

### Thursday — Aerobic ceiling 5×4
File: `aerobic-ceiling-5x4.zwo`
Targets: 115% FTP · 5 × 4 min @ **282 W**, 4 min easy @ **123 W** between. Cadence 95+ rpm.
Warm-up 15 min, cool-down 10 min.
Total: ~60 min.

## Social rides

**Saturday / Sunday:** Ride at the group's pace — no power targets. If both weekend rides ran hard, make Thursday easy Z2 next week.

## Strength & core (Tuesday, after the ride)
Full session: `2026-W26-gym.md`

| Exercise | Sets × Reps | Load / cue | Rest |
|----------|-------------|------------|------|
| Squat | 4 × 5 | heavy, full control | 2–3 min |
| Romanian deadlift | 3 × 8 | hinge from the hips | 90 s |
| Plank | 3 × 45 s | brace hard | 45 s |
| Pallof press | 3 × 10/side | resist the cable | 45 s |
```
