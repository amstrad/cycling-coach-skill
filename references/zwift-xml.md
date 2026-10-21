# ZWO essentials

A `.zwo` file is Zwift workout XML. Power is expressed as a fraction of FTP, so the rider's device or app FTP sets the absolute watts. Tell the rider to set the device FTP to the same value used in the schedule.

## Blocks

| Block | Use | Key attributes |
|-------|-----|----------------|
| `Warmup` | Ramp up | `Duration` (s), `PowerLow` (start), `PowerHigh` (end) — fractions |
| `Cooldown` | Ramp down | `Duration` (s), `PowerHigh` (start), `PowerLow` (end) — fractions |
| `SteadyState` | Fixed power | `Duration` (s), `Power` (fraction) |
| `IntervalsT` | Repeated on/off | `Repeat`, `OnDuration` (s), `OffDuration` (s), `OnPower`, `OffPower` (fractions) |
| `FreeRide` | No target (social) | `Duration` (s) |

Durations are always seconds. Power values are fractions of FTP (`0.90` = 90%). Add `<textevent timeoffset="N" message="..."/>` inside any block; write the cues in the rider's language.

## Skeleton — SteadyState (sub-threshold example)

```xml
<workout_file>
  <author>cycling-coach-skill</author>
  <name>Sub-threshold 2x20</name>
  <description>2 × 20 min at 90% FTP, 5 min easy between. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="600" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up gradually, easy spin."/>
    </Warmup>
    <SteadyState Duration="1200" Power="0.90">
      <textevent timeoffset="0" message="Sub-threshold — steady, controlled effort."/>
      <textevent timeoffset="600" message="Halfway. Hold the power, smooth pedalling."/>
    </SteadyState>
    <SteadyState Duration="300" Power="0.50">
      <textevent timeoffset="0" message="Easy recovery — shake out the legs."/>
    </SteadyState>
    <SteadyState Duration="1200" Power="0.90">
      <textevent timeoffset="0" message="Second block. Same effort as the first."/>
      <textevent timeoffset="600" message="Last 10 min. Stay smooth."/>
    </SteadyState>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.60">
      <textevent timeoffset="0" message="Cool down — easy spin out."/>
    </Cooldown>
  </workout>
</workout_file>
```

## Skeleton — IntervalsT (aerobic ceiling 5×4 example)

```xml
<workout_file>
  <author>cycling-coach-skill</author>
  <name>Aerobic ceiling 5x4</name>
  <description>5 × 4 min at 115% FTP, 4 min easy between. Cadence 95+ rpm. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="900" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up — build pace gradually."/>
      <textevent timeoffset="600" message="2 min to the first interval. Lift cadence to 95+ rpm."/>
    </Warmup>
    <IntervalsT Repeat="5" OnDuration="240" OffDuration="240" OnPower="1.15" OffPower="0.50">
      <textevent timeoffset="0" message="Go — high cadence, push through."/>
      <textevent timeoffset="120" message="Halfway. Hold it."/>
      <textevent timeoffset="240" message="Recover — breathe out, easy spin."/>
    </IntervalsT>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.55">
      <textevent timeoffset="0" message="Well done. Cool down easy."/>
    </Cooldown>
  </workout>
</workout_file>
```

## Skeleton — IntervalsT (40/20s, two sets of 9)

Two sets need a recovery block between them — `IntervalsT` cannot nest, so use two `IntervalsT` blocks separated by a `SteadyState`.

```xml
<workout_file>
  <author>cycling-coach-skill</author>
  <name>40-20s 2x9</name>
  <description>2 sets of 9 × (40 s at 120% FTP / 20 s easy), 5 min easy between sets. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="900" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up — add 3–4 short accelerations in the last 3 min."/>
    </Warmup>
    <IntervalsT Repeat="9" OnDuration="40" OffDuration="20" OnPower="1.20" OffPower="0.50">
      <textevent timeoffset="0" message="Set 1 — punch it."/>
      <textevent timeoffset="40" message="Off — recover fast."/>
    </IntervalsT>
    <SteadyState Duration="300" Power="0.50">
      <textevent timeoffset="0" message="5 min easy between sets. Get ready."/>
    </SteadyState>
    <IntervalsT Repeat="9" OnDuration="40" OffDuration="20" OnPower="1.20" OffPower="0.50">
      <textevent timeoffset="0" message="Set 2 — same power, stay on it."/>
      <textevent timeoffset="40" message="Off."/>
    </IntervalsT>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.55">
      <textevent timeoffset="0" message="Done. Easy spin out."/>
    </Cooldown>
  </workout>
</workout_file>
```

## Skeleton — IntervalsT (30/15s, three sets of 13)

The most-used high-intensity session. Each set is its own `IntervalsT`, with a 3-min `SteadyState` between sets. Total ≈ 15 + 3 × 9:45 + 2 × 3 + 10 min ≈ 60 min.

```xml
<workout_file>
  <author>cycling-coach-skill</author>
  <name>30-15s 3x13</name>
  <description>3 sets of 13 × (30 s at 118% FTP / 15 s easy), 3 min easy between sets. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="900" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up gradually."/>
      <textevent timeoffset="720" message="3 min to go. Two short accelerations now."/>
    </Warmup>
    <IntervalsT Repeat="13" OnDuration="30" OffDuration="15" OnPower="1.18" OffPower="0.50">
      <textevent timeoffset="0" message="Set 1. Accelerate hard for the first 10 s, then hold."/>
      <textevent timeoffset="30" message="Keep pedalling. No coasting."/>
    </IntervalsT>
    <SteadyState Duration="180" Power="0.50">
      <textevent timeoffset="0" message="3 min easy."/>
    </SteadyState>
    <IntervalsT Repeat="13" OnDuration="30" OffDuration="15" OnPower="1.18" OffPower="0.50">
      <textevent timeoffset="0" message="Set 2. Same power as set 1."/>
    </IntervalsT>
    <SteadyState Duration="180" Power="0.50">
      <textevent timeoffset="0" message="3 min easy. Last set next."/>
    </SteadyState>
    <IntervalsT Repeat="13" OnDuration="30" OffDuration="15" OnPower="1.18" OffPower="0.50">
      <textevent timeoffset="0" message="Set 3. Hold it evenly to the last rep."/>
    </IntervalsT>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.60">
      <textevent timeoffset="0" message="Done. Easy spin out."/>
    </Cooldown>
  </workout>
</workout_file>
```

Set `OnPower` from the progression step (1.12 / 1.15 / 1.18–1.20). For step 1, drop the third set and its recovery block.

## Skeleton — IntervalsT (oscillating threshold 3×(3 min/1 min))

The "under" (95% FTP) is the longer on-phase; the "over" (105% FTP) is the shorter off-phase. `IntervalsT` always begins with the on-duration, so the cycle is 3 min under → 1 min over. This step-1 skeleton runs about 37 min including warm-up and cool-down; later steps add sets and usually run 50–60 min. For sets separated by 5 min rest, use separate `IntervalsT` blocks with a `SteadyState` at 0.50 between them (same pattern as the 40/20s example).

````
```xml
<!-- oscillating-threshold-3x3-1.zwo -->
<workout_file>
  <author>cycling-coach-skill</author>
  <name>Oscillating threshold 3x(3/1)</name>
  <description>3 × (3 min at 95% FTP / 1 min at 105% FTP). Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="900" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up gradually."/>
      <textevent timeoffset="720" message="3 min to the first interval."/>
    </Warmup>
    <IntervalsT Repeat="3" OnDuration="180" OffDuration="60" OnPower="0.95" OffPower="1.05">
      <textevent timeoffset="0" message="Under — 95%, hold the pace."/>
      <textevent timeoffset="180" message="Over — push to 105%, absorb the surge."/>
    </IntervalsT>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.60">
      <textevent timeoffset="0" message="Done. Easy spin out."/>
    </Cooldown>
  </workout>
</workout_file>
```
````

## Skeleton — SteadyState (threshold 2×15 example)

2 × 15 min @ 97% FTP with 5 min recovery, about 60 min total. Set `Power` to match the progression step (0.95 for step 1, 0.97 for steps 2–3) and `Duration` to 1200 s for the 20 min variant.

```xml
<workout_file>
  <author>cycling-coach-skill</author>
  <name>Threshold 2x15</name>
  <description>2 × 15 min at 97% FTP, 5 min easy between. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="900" PowerLow="0.45" PowerHigh="0.75">
      <textevent timeoffset="0" message="Warm up — build gradually."/>
      <textevent timeoffset="720" message="3 min to the first interval. Settle in."/>
    </Warmup>
    <SteadyState Duration="900" Power="0.97">
      <textevent timeoffset="0" message="Threshold — controlled, sustainable effort."/>
      <textevent timeoffset="450" message="Halfway. Hold the power."/>
    </SteadyState>
    <SteadyState Duration="300" Power="0.50">
      <textevent timeoffset="0" message="Easy recovery — breathe out."/>
    </SteadyState>
    <SteadyState Duration="900" Power="0.97">
      <textevent timeoffset="0" message="Second interval. Same effort."/>
      <textevent timeoffset="450" message="Last 7 min. Hang on."/>
    </SteadyState>
    <Cooldown Duration="600" PowerLow="0.40" PowerHigh="0.60">
      <textevent timeoffset="0" message="Well done. Easy spin out."/>
    </Cooldown>
  </workout>
</workout_file>
```

## Skeleton — SteadyState (aerobic base example)

Scale session length with `SteadyState Duration`. Warm-up, spin-ups, and cool-down account for about 19 min, so use ~4200 s for a 90 min session. The neuromuscular spin-ups are optional; drop the `IntervalsT` block for pure Z2.

````
```xml
<!-- aerobic-base-60min.zwo -->
<workout_file>
  <author>cycling-coach-skill</author>
  <name>Aerobic base 60min</name>
  <description>60 min easy at 65% FTP with optional neuromuscular spin-ups. Set your device FTP to match the schedule.</description>
  <sportType>bike</sportType>
  <workout>
    <Warmup Duration="600" PowerLow="0.45" PowerHigh="0.65">
      <textevent timeoffset="0" message="Easy warm up."/>
    </Warmup>
    <SteadyState Duration="2700" Power="0.65">
      <textevent timeoffset="0" message="Zone 2 — conversational pace. Stay easy."/>
      <textevent timeoffset="1350" message="Halfway. Stay relaxed."/>
    </SteadyState>
    <IntervalsT Repeat="4" OnDuration="10" OffDuration="50" OnPower="1.10" OffPower="0.60">
      <textevent timeoffset="0" message="Spin-up — light gear, max cadence for 10 s."/>
    </IntervalsT>
    <Cooldown Duration="300" PowerLow="0.40" PowerHigh="0.55">
      <textevent timeoffset="0" message="Easy spin down."/>
    </Cooldown>
  </workout>
</workout_file>
```
````

## Maximal efforts and cadence

- **Sprints and torque starts:** trainers in ERG mode cannot follow a 10–20 s maximal effort. Write those reps as `FreeRide` blocks with a `textevent` cue ("max effort, big gear"), and tell the rider to turn ERG off or ride in resistance mode. Do the same for shrinking-ladder "max" reps.
- **Low-cadence force:** add the optional `Cadence` attribute to the block (for example `<SteadyState Duration="360" Power="0.75" Cadence="60"/>`) so Zwift shows a cadence target. Repeat the cadence in a `textevent`, since not every app displays the attribute.
- **Over-unders and micro-intervals** stay in ERG; short off-phases of 15 s are fine.

## Validation checklist

Before delivering each `.zwo`:

1. The XML is well formed (every opened tag closes; no stray characters outside tags).
2. Every `Power`, `PowerLow`, `PowerHigh`, `OnPower`, and `OffPower` is a fraction of FTP; no raw watts. Values above 1.5 are only valid for sprints and torque starts.
3. Every `Duration`, `OnDuration`, and `OffDuration` is in seconds, not minutes.
4. `IntervalsT` `Repeat` × (`OnDuration` + `OffDuration`) matches the intended interval time.
5. Warm-up and cool-down exist in every file.
6. `textevent` messages are in the rider's language.
7. In `Cooldown`, `PowerHigh` is the starting (higher) value and `PowerLow` the ending (lower) value — it ramps down. `Warmup` is the reverse: `PowerLow` starts, `PowerHigh` ends.

## Rendering in chat

Print every `.zwo` inline as a fenced XML block labelled with its file name so the rider can read, copy, or import it straight from the chat, even when the agent cannot write files:

````
```xml
<!-- sub-threshold-2x20.zwo -->
<workout_file>
  ...
</workout_file>
```
````
