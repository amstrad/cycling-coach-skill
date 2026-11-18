# Power profiles — derive the rider's from their own curve

Never assume a profile. Derive it from the power-duration data synced from Strava, then let profile and objective set the priorities. Treat this as a heuristic: soften the conclusion when data is thin or the latest ride was not maximal.

## What to measure

From the curve and FTP:

- burst score = best 5 s power ÷ FTP
- surge score = best 1 min power ÷ FTP
- ceiling score = best 5 min power ÷ FTP

Use the best efforts across the last 6–12 weeks, not a single ride; one ride rarely contains a true maximal 5 s, 1 min, and 5 min. When a number looks low because that duration was never ridden all-out (no sprint, for example), lean on the durations that were. If FTP is estimated and older than 8 weeks, scores are unreliable; say so and prefer `balanced`.

Typical ratios for a trained rider: 5 s ≈ 3.0–4.5 × FTP, 1 min ≈ 1.5–2.0 × FTP, 5 min ≈ 1.12–1.25 × FTP. A 5-min score above 1.30 usually means FTP is set too low; flag a re-test before deriving the profile.

## The three profiles

- **Explosive** (sprinter / puncheur): surge score ≥ 1.8 or burst score ≥ 3.8. Strong top end; the sustained engine is the limiter.
  - Priorities: sub-threshold blocks, oscillating threshold, aerobic ceiling intervals. Little or no sprint work — that strength already exists.
- **Steady** (time-triallist / diesel): surge score ≤ 1.45 and ceiling score ≤ 1.12. Strong sustained power; the limiter is the top end and repeatability.
  - Priorities: aerobic ceiling intervals, short-sharp work (40/20s, 30/30s), plus threshold to maintain. Add a little neuromuscular work.
- **Balanced** (all-rounder): anything between the two. No dominant strength or weakness.
  - Priorities: a blend, weighted by the objective (below).

## Let the objective steer

- Fast group ride or road race with late surges: lean on threshold and aerobic ceiling for everyone, and add repeated efforts for steady riders.
- Climbing or gran fondo: lean on FTP and W/kg (sub-threshold, threshold, long tempo); keep body-weight context in view.
- Hill climb (one timed climb): the climb's duration decides — under 10 min VO2max-first with race-duration efforts, over 10 min threshold-first (`hill-climb.md`).
- Ultra-distance (8 h+, 12/24 h, bikepacking): durability first — Z2 volume, long rides and back-to-backs, sweet spot and tempo, a short VO2max touch (`ultra-distance.md`).
- Criterium or track: lean on repeated anaerobic and neuromuscular work.
- Time trial: lean on threshold and FTP, in the sustained position.

State the derived profile and the resulting focus in a single line, for example: "Profile: explosive — so we build your aerobic engine and leave the sprint alone."

## The rider-shape pyramid (the app's reading)

The app reads the same efforts as three tiers, each a ratio to FTP (or a share) mapped onto 0–1 through the knots in `rules.json` → `powerProfile.pyramid`:

- **Top — five minutes and shorter** (last 12 weeks): the weighted mean of burst (best 5 s, 0.25), surge (best 1 min, 0.35) and ceiling (best 5 min, 0.40), each counted only from its qualifying floor (2.5, 1.20 and 1.02 × FTP).
- **Middle — holding threshold**: the longest effort whose best stays at 0.95 × FTP, read from 20 to 90 minutes; under 20 minutes the tier is missing.
- **Base — lasting over hours** (last six months, `powerProfile.base`): the mean of the valid sources. The long-ride intensity index — a ride's IF over the IF a raced fondo of the same moving hours is ridden at (1 h 0.90 … 16 h 0.58), the best of the three longest rides of 3 h or more with power on 90 % of them (2 h rides as short evidence). The fade against the work done — best 20 min in the last hour ÷ the fresh best 20 min, over what the kJ before it allow (max(0.80, 1 − 0.03 × MJ)), best ratio across rides, counted when the late block is ≥ 0.80 × FTP. The heart-rate drift (Pw:HR: NP ÷ mean heart rate, first half against second, over the first 3 h of moving time after a 10-minute lead-in; a window at IF 0.60–0.80 and VI ≤ 1.30 with no stop over 10 minutes; the median of the latest three rides).

The words come from the tiers, not from the three profiles above: with tilt = top − base, **explosive** at tilt ≥ +0.25 and top ≥ 0.60, **steady** at tilt ≤ −0.25 and base ≥ 0.60, **balanced** otherwise; no word while a tier is missing or the 5-minute score says re-test the FTP. The limiter is the narrowest tier when it is ≤ 0.35 and ≥ 0.20 under the widest, and only on enough evidence: the top needs two valid efforts, the middle a valid threshold time, the base two valid sources whose mean is ≤ 0.35 and none ≥ 0.60. Top → top-end work, middle → threshold, base → endurance; for an athlete with an event plan the limiter is named, never turned into a plan type. The pyramid is drawn from 90 days of history; a plan type is recommended from 300.

The radar on the same page uses its own display scale (`powerProfile.radar`: low, typical, strong → 0, 0.5, 1) so a typical amateur sits mid-chart; it never decides a word.
