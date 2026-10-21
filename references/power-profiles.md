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
- Criterium or track: lean on repeated anaerobic and neuromuscular work.
- Time trial: lean on threshold and FTP, in the sustained position.

State the derived profile and the resulting focus in a single line, for example: "Profile: explosive — so we build your aerobic engine and leave the sprint alone."
