# Interval catalog

Every target is % FTP. Convert to watts in prose once FTP is known. The default week has two key sessions, one high-intensity and one threshold-type; everything else stays easy. Pattern ids match the keys of `sessions` in `assets/rules.json`. Sequencing and the push/hold decision are in `planning-rules.md`; planning TSS per session is in `periodization.md`.

## Rotation and progression

Patterns rotate **per block**, not per week. A block is the 3:1 or 2:1 mesocycle from `periodization.md`. Inside a block the same pair repeats and moves up one progression step each build week; that is the deliberate progression. A new block moves to the next row. Use the patterns tagged from last week's Strava rides (`strava-sync.md`) to confirm which pair and step the rider is on.

**Rotation order.** Choose the row with `blockIndex mod 3` (`trainingState` in `profile-schema.md`). With no stored state, start at row 0 and pick the first pair that differs from last week's tags.

| Block mod 3 | Explosive | Balanced | Steady |
|------------|-----------|----------|--------|
| 0 | Sub-threshold + Oscillating threshold | 30/15s + Sub-threshold | 30/15s + Threshold |
| 1 | 30/15s + Threshold | 40/20s + Oscillating threshold | 40/20s + Sub-threshold |
| 2 | Aerobic ceiling + Sub-threshold | Aerobic ceiling + Threshold | Aerobic ceiling + Oscillating threshold |

Each pair is one high-intensity (HI) session plus one threshold-type session, except Explosive row 0, where both are threshold-type because the sustained engine is the limiter. Never pair two HI patterns (30/15s, 40/20s, aerobic ceiling, shrinking ladder) in one week; they hit the same system and double the recovery cost. Place the HI session first in the week. Phase overrides the table: Base swaps the HI slot for tempo or low-cadence force on alternate weeks, and Peak swaps the threshold slot for race simulation (`periodization.md`).

> **30/15s micro-intervals replace the classic aerobic-ceiling slot throughout.** Work by Rønnestad and colleagues shows 3 × 13 reps outperforming 4–5 min evenly paced intervals for VO2max and power in trained cyclists. A classic 4×4 min aerobic-ceiling session may fill any 30/15s slot when the rider genuinely prefers longer efforts.

**Progression within a pattern.** Build week 1 of a block uses step 1, week 2 step 2, week 3 step 3. In a 2:1 block use steps 1 and 2; advanced riders may use steps 2 and 3. Move up only when the push test in `planning-rules.md` passes; otherwise repeat the step and the block stretches by a week, capped at 5 weeks before a forced deload.

| Pattern | Step 1 | Step 2 | Step 3 |
|---------|--------|--------|--------|
| Sub-threshold | 2 × 20 min @ 88% | 2 × 20 min @ 90% | 2 × 25 min @ 90% or 3 × 15 min @ 92% |
| 30/15s | 2 sets × 13 reps @ 112% | 3 sets × 13 reps @ 115% | 3 sets × 13 reps @ 118–120% |
| Aerobic ceiling | 4 × 4 min @ 110% | 5 × 4 min @ 112% | 5 × 4 min @ 115–120% |
| 40/20s | 2 sets × 8 reps @ 118% | 2 sets × 9 reps @ 120% | 3 sets × 8 reps @ 120% |
| Oscillating threshold | 3 × (3 min / 1 min) | 3 × (4 min / 1 min) | 4 × (3 min / 1 min) |
| Threshold | 2 × 15 min @ 95% | 2 × 20 min @ 97% | 3 × 15 min @ 97% |
| Tempo | 2 × 20 min @ 80% | 2 × 30 min @ 82% | 60 min @ 85% |
| Shrinking ladder | 1 ladder (3/2/1) | 2 ladders | 2 ladders, recoveries −1 min |
| Sprints | 4 × 15 s max / 5 min | 6 × 15 s | 6 × 20 s from 30 km/h |
| Low-cadence force | 3 × 6 min @ 75% / 55–65 rpm | 4 × 6 min @ 78% | 4 × 8 min @ 80% |
| Torque starts | 6 × 10 s max | 8 × 10 s max | 8 × 12 s max |

The deload week keeps one session of the pair at step 1 with about two-thirds of the reps. A pattern returning in a later block may start at step 2 if its last step 3 was completed cleanly. **After step 3:** rotate to the next row; do not invent a step 4.

## Bike — key sessions (one high-intensity + one threshold-type per week)

### Aerobic ceiling
- **Shape:** 4–5 × 4 min @ 110–120% FTP, equal recovery (4 min) @ ~50%.
- **Progression:** begin at 4 reps / 110%, build toward 5 reps / 115–120% over a block.
- **Cadence:** 90–100 rpm — keep it cardiovascular, not a grind.
- **Purpose:** raises the ceiling so repeated surges stay survivable.
- **Avoid:** the day after any other HI session, race, or long ride; more than one per week for riders 50+ unless reps are cut to 3–4; starting the first rep above target (the last rep should match the first).

### 40/20s (or 30/30s)
- **Shape:** 2–3 sets of 8–10 reps, 40 s @ 118–125% / 20 s @ ~50%. 5 min easy between sets.
- **Variant:** 30/30s (30 s @ 115–120% / 30 s easy) for a slightly lower peak and more reps.
- **Cadence:** 95–105 rpm during work.
- **Purpose:** race-specific work for answering attacks without cracking.
- **Avoid:** pairing with 30/15s or aerobic ceiling in the same week (same stimulus, double the cost); scheduling it within 48 h before a race.

### 30/15s micro-intervals
- **Shape:** 3 sets × 13 reps, 30 s @ 115–120% / 15 s @ ~50–55%. 3 min easy between sets.
- **Progression:** start at 2 sets × 13 reps at 112%, build to 3 sets, then lift intensity to 118–120%. The right target is the highest power the rider can hold evenly across all 39 reps; if the last set fades by more than 5%, the target was too high.
- **Cadence:** accelerate hard through the first 10 s of each work rep, holding 95–105 rpm. Let cadence drop on the 15 s but keep pedalling — no coasting.
- **Purpose:** maximises accumulated time at ≥90% VO₂max. Rønnestad et al. found 3 × 13 reps produced significantly greater VO₂max and power gains than traditional 4–5 min intervals in trained cyclists. The 15 s is not full recovery — it should feel like tempo, just enough to hit the next 30 s hard.
- **Avoid:** coasting on the 15 s; stacking with any other HI session inside 48 h; beginners before 8 consistent weeks.

### Oscillating threshold
- **Shape:** 3 × (3 min @ 95% / 1 min @ 105%), 5 min easy between. Build toward 4 min blocks.
- **Cadence:** 90–100 rpm throughout — resist dropping cadence on the "over" portions.
- **Purpose:** tolerate pace changes in a fast bunch.
- **Avoid:** the day after HI work for riders 40+; letting the "under" drift below 92 % to survive the "over".

### Threshold
- **Shape:** 2 × 15 min @ 95–100% FTP, 5 min easy between. Build toward 2 × 20 or 3 × 15.
- **Cadence:** 85–95 rpm on flat or rolling ground.
- **Purpose:** raise the FTP ceiling and close the gap between threshold and aerobic-ceiling pace.
- **Avoid:** more than 45 min total at ≥ 95% in one session; pairing with sub-threshold in the same week during Base (choose one and a HI touch instead).

### Sub-threshold
- **Shape:** 2 × 20 min @ 88–94% FTP, 5 min easy between. Build toward 2 × 25 or 3 × 15.
- **Cadence:** 85–95 rpm.
- **Purpose:** lift sustained power with manageable fatigue.
- **Avoid:** turning every easy day into sub-threshold (the grey-zone trap); use as the only key session for beginners.

### Torque starts
- **Shape:** 6–10 × 10–12 s maximal seated effort in the biggest gear you can turn, from ~15 km/h. Full recovery between reps (3–5 min easy spinning).
- **Cadence:** once up to speed, aim for 95+ rpm; the effort is about torque in the first seconds, not cadence.
- **Purpose:** neuromuscular power — recruits fast-twitch fibres and builds the ability to produce very high force against resistance. Useful before sprinting or climbing blocks.
- **Caution:** keep the volume low and use only when the legs feel fresh; muscular stress is high while cardiovascular cost is low.

### Shrinking ladder
- **Shape:** maximal efforts that get shorter each rep — e.g. 3 min max / 4 min easy / 2 min max / 3 min easy / 1 min max / 2 min easy. Repeat the ladder 1–2×.
- **Cadence:** 110+ rpm throughout (starting out of the saddle is fine).
- **Purpose:** trains the ability to go hard while fatigued and builds top-end repeatability. Each shorter rep also has shorter recovery, so commitment matters.

### Tempo
- **Shape:** 2 × 20–30 min @ 76–85% FTP, 5 min easy between, or a continuous 60 min inside a long ride (final hour).
- **Cadence:** 85–95 rpm; outdoors, choose steady terrain.
- **Purpose:** durability and fuel economy with low recovery cost. The default quality in Base and for beginners; the "late tempo" variant trains power after 2–3 h for fondo and road-race objectives.
- **Avoid:** using it as an easy day; it counts as a threshold-type session for spacing.

### Sprints
- **Shape:** 4–6 × 15–20 s maximal from 30 km/h, 5 min easy between. Seated-to-standing, big gear.
- **Cadence:** reach 110+ rpm by the end of each sprint.
- **Purpose:** peak power and sprint mechanics for criterium, track, and finish-line objectives. Low metabolic cost, high neuromuscular cost.
- **Avoid:** for explosive-profile riders (already strong); the day before HI work; on fatigued legs.

### Race simulation (Peak phase)
- **Shape:** 2–3 h at Z2 with 3 × 10 min @ 95–100% and 6 × 30 s @ 150% on the final hour, or a hard group ride ridden at the front.
- **Purpose:** specificity in the last 3–4 weeks before an event; replaces one key session.
- **Avoid:** more than once a week; inside the taper.

## Bike — easy and supporting
- **Avoid:** inside the first week of a block, within 72 h of a race, or for riders over 50 without a full easy day each side.

### Aerobic base (Z2)
- **Shape:** 60–180 min @ 60–70% FTP, genuinely easy. Optional 3–5 × 10 s neuromuscular spin-ups.
- **Cadence:** 85–95 rpm.
- **Purpose:** volume that builds fitness without denting recovery.
- **Avoid:** drifting into 75–85% (grey zone). If the rider cannot stay under 70%, shorten the ride.

### Low-cadence force
- **Shape:** 3–5 × 6–8 min @ 70–80% FTP at deliberately low cadence (55–65 rpm), seated, in a harder gear than normal. 3–4 min easy spinning between reps.
- **Cadence:** 55–65 rpm — the low cadence is the stimulus; do not let it drift above 70.
- **Purpose:** better neuromuscular recruitment by engaging more muscle through each pedal stroke. Builds leg strength and climbing-specific force without the cardiovascular cost of threshold work. Useful before climbing blocks, or for riders whose legs fade before their lungs.
- **Note:** this is not gentle low-cadence endurance riding; the effort is sustained and deliberate.

### Social-ride placeholder
- Use a `<FreeRide>` block for social or group rides rather than forcing power targets.
- If a group ride is the hard session, drop one targeted hard session that week.

## Example easy-heavy week

| Day | Session | Format |
|---|---|---|
| Mon | Rest or easy spin | — / short Z2 .zwo |
| Tue | 30/15s 3×13 | .zwo |
| Wed | Aerobic base | .zwo or outdoors |
| Thu | Sub-threshold 2×20 | .zwo |
| Fri | Rest / easy | — |
| Sat | Group ride | outdoors (counts as hard) |
| Sun | Long aerobic | .zwo or outdoors |

If Saturday is hard, keep Tuesday **or** Thursday hard, not both — never three hard days. Riders 40+ move Thursday's session to Friday only if Saturday is easy; otherwise it becomes Z2.

## Gym — cycling-specific (deliver as markdown)

The goal is durable power and injury resilience, not size. Twice a week off-season, once a week in-season for maintenance. `.zwo` cannot represent this. Exercise selection, sets, reps, and cues are in `gym-catalog.md`.

Keep heavy lower-body work away from hard bike days (ideally the same day as a hard ride or on a rest day, never the day before intervals).

## Supporting cardio (off the bike)

For cross-training or active recovery:
- Easy zone-2 run or brisk walk, 30–45 min, conversational. The treadmill version can be a `run` `.zwo` if wanted.
- Mobility block, 15–20 min, hips and thoracic spine.

Keep all of it genuinely easy so it does not compete with hard bike sessions for recovery.
