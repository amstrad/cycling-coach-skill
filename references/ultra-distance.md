# Ultra-distance cycling — 350 km and more, 24 h races, bikepacking races

Use this guide when the objective is **350 km or more**, takes **20 hours or more** in one push, or runs over
**several days** with riding through the night or sleep stops: brevets of 400 km and more, 24 h races,
bikepacking races.

**A long gran fondo is not an ultra.** Events of 200–300 km such as Mallorca 312, La Marmotte or the
Quebrantahuesos take most riders 6–13 hours and are ridden in one day. A 300 km brevet is a gran fondo too, even
for a rider who needs 15 hours. Plan them as a gran fondo with `periodization.md` and `power-profiles.md`. For the
ones that take a rider 8 hours or more, borrow three parts of this guide: Durability, Pacing and Fuelling. Leave
out what belongs to an ultra: the sleep strategy, the race simulation at half the event's duration, the 10–20 h
weeks, and the back-to-back weekends as a standing feature.

Distance decides first. The duration test exists for what distance misses, such as a 24 h race on a short loop.

Sources:
- Race Ready Cycling Training, "Training for ultra-distance cycling".
- The TrainerRoad forum thread "Ultra-endurance training" (2022), a consensus of experienced ultra riders.
- The general principles already in `periodization.md`, `coaching-model.md` and `fuelling.md`.

The numbers marked *heuristic* are common coaching practice, not taken from those sources. Treat them as
starting points and adjust them to the rider.

Where a paper supports a point, the text cites its row in `evidence.md`, for example (E04). Most of the evidence
on ultra-cycling is weak: small field studies and reviews. Read it as a direction, not as a rule.

## What decides an ultra

- **Durability, not peak power.** The ability to hold a steady, mostly aerobic output for many hours without
  the power fading. Endurance adaptations also "stick around longer than power gains".
- **Fuelling and the stomach.** Eating for 12–24 h+ without the gut shutting down, and refuelling from what is
  on the route (shops, petrol stations).
- **Contact points and position.** Bike-fit problems often appear only after about **8 hours**. Only long
  rides find them.
- **Self-care and the head.** "A huge percentage of people who DNF in ultra-endurance events are physically
  capable of finishing." Routines (eating, clothing, lights, small repairs) must run without thought.
  Pacing works best with small intermediate goals (the next 50 km, the next stop).
- **Sleep strategy** (24 h and multi-day only): night riding, and when (or whether) to stop.

## Durability

- **What it is.** Thresholds are measured fresh, but they move during a long effort. Durability is how late that
  deterioration starts and how small it stays (E01).
- **How large.** Critical power fell by about 10 % on average after 2 h of heavy riding, and between under 1 % and
  about 32 % from one rider to the next (E02). Better-trained riders lose less: professionals held more of their
  power after 1,000–3,000 kJ than U23 riders (E07), and the more successful amateurs lost 6.5 % of their 20-min
  power after 1,000 kJ against 12.5 % (E05, a small study).
- **Intensity counts, not only kJ.** Work above threshold costs far more later power than the same kJ ridden
  easy: 10–20 % declines appear after only 2.5–15 kJ per kg of hard work, while similar or larger amounts of easy
  work cost less (E04). Record two things about the work before a late effort: the total (as kJ per kg, to compare
  riders) and how much of it was above threshold.
- **Adjusting targets late in a ride.** There is no table that fits everyone, because the spread between riders is
  so wide. Use the rider's own fade: the best 20 min of the last hour of long rides against the fresh 20-min best
  (`coaching-model.md`). *Heuristic:* scale tempo and threshold targets placed after 2–3 h by that ratio (a rider
  who holds 93 % late rides late blocks at 93 % of the fresh target), and let RPE and heart rate overrule the
  number. Re-measure it; do not assume it.
- **The app's expected fade** (`powerProfile.base.fadePerMj` in `assets/rules.json`) counts kJ only. Read it with
  care for a ride that held hard efforts, which cost more than their kJ.
- **Fuel changes the result.** Carbohydrate during the ride reduces the fall in threshold power (E03), so judge
  durability on rides fuelled the way the event will be.
- To measure it on purpose, use the optional durability test in `testing-and-zones.md`.

## Intensity distribution

- **About 90 % of sessions in Z2** (Race Ready Cycling). Most aerobic adaptations happen there.
- **One or two quality sessions a week, no more:** typically one threshold/sweet spot session and one short
  VO2max session. Riders report diminishing returns beyond two interval sessions a week for this goal.
  - Sweet spot and long tempo build the sustainable output the event is ridden just below.
  - A short VO2max session keeps the ceiling, which keeps the event pace a smaller fraction of what the
    rider can do.
- **Tempo inside long rides** (e.g. 2 × 30–45 min at 76–85 %) is specific durability work. Count it as the
  threshold-type session of the week when it is substantial.
- **Grey-zone caution still applies:** easy days genuinely easy (≤ 70 % FTP), so the long ride and the quality
  sessions can be done well.

## Volume and the long ride

- **Weekly volume** for an experienced ultra rider in build: **10–20 h** (heuristic; the forum riders report
  12–20 h for months). It scales with the rider's history. Raise volume before intensity, never both in the
  same week (`coaching-model.md`).
- **The long ride is the key session.** It grows over the plan to **5–10 h with minimal breaks**, ridden as
  the event will be: same bike, bags, position, food, and stops kept short.
- **Back-to-back days.** A long Saturday followed by a medium-long Sunday teaches riding on tired legs.
  - Keep them close together: a Saturday evening and a Sunday morning ride count as back-to-back.
  - When one very long ride does not fit, two rides **4–6 h apart** on the same day give part of the benefit.
  - One 8 h ride is generally thought to beat 4 h + 4 h, but this is anecdotal.
- Put **a full easy or rest day before and after** the big weekend.
- **Vary the long rides** (elevation, flat sustained pace, night riding) and treat them with the same attention
  as intervals: plan the route, the food and the pacing.

## Phases (on top of `periodization.md`)

| Phase | Ultra emphasis |
|---|---|
| Base (long, 10–16 wk if time allows) | Z2 volume rising; one sweet spot or tempo session; a short VO2max touch every 2nd week; **strength 2× a week** (far from the event, where its muscle fatigue costs least); long ride grows 30–60 min a week. |
| Build (6–8 wk) | Volume held high; one sweet spot/threshold and one short VO2max session; back-to-back weekends; tempo blocks inside long rides; fuelling practice at event intake; strength reduced to maintenance (1×). |
| Peak (3–4 wk) | **Race simulation about 3 weeks out**: at least **50 % of the event duration** (capped around 24 h; overnight if the event is), with the event's kit, food, stops and night riding. Then specific long rides, shorter. |
| Taper (2–3 wk) | 2 weeks out: cut endurance volume, keep the intervals. Last week: **halve the interval load, keep the intensity, finish the last intervals 3–4 days before the start**. No heavy strength. |

## Pacing (heuristic)

- **12 h:** about 60–70 % of FTP on average. **24 h:** about 55–65 %. Multi-day: lower again, set by sleep and terrain.
- Use heart rate drift and RPE as the governors late in the event. Power falls with fatigue, heat and altitude.
- **Do not chase the start.** Early surges are paid for many hours later. Work above threshold lowers later power
  more than its kJ suggest (E04), and each surge spends work capacity that refills slowly, and more slowly every
  time it is emptied (E11).
- **Expect the ceiling to come down.** After several hours the power that feels like tempo is lower than it was
  fresh (see Durability). Ride climbs late in the event by effort, not by the fresh number.

## Sleep in multi-day events

The evidence is weak (one team, one race, and a short review), but it points one way: sleep is part of the
pacing plan, not time lost.

- **Sleep loss is the norm, and it has a cost.** Studies of ultra-cycling races agree that riders sleep very
  little (E13). In a four-man RAAM team sleep fell from about 7 h to about 2 h a day, and riders were in their
  best emotional state less than half the time, with the sharpest change between the first and second day (E12).
- **More sleep went with a better result.** In 23 finishers of a 2,588 km race, riders who slept more per day
  finished higher, and less sleep went with slower reactions (E14). The study is observational, so it cannot
  prove that sleeping more made them faster. It does say that skipping sleep is not a reliable way to gain places.
- **When.** Sleepiness peaked around midnight and the urge to sleep was strongest from midnight to 04:00 (E14).
  Plan the main stop there instead of fighting through it.
- **How long.** Sleepiness built up day on day in riders averaging under about 5.3 h per 24 h (E14). Longer rest
  blocks gave far more real sleep than short ones in the RAAM team (E12). Neither figure is a prescription; they
  set the expectation that very short sleep accumulates.
- **Safety first.** Slow reactions on a descent or in traffic are the real risk. A rider who is nodding off,
  weaving, or seeing things stops and sleeps, whatever the plan says.
- **Plan the lows.** Expect a low mood on the second day and decide in advance what to do with it: eat, sleep,
  then reassess. Do not decide to abandon at night.
- **Practise it.** The race simulation includes the night and one planned sleep stop.

## Fuelling (with `fuelling.md`)

- **By duration:** up to about 8 h, 60–90 g of carbohydrate an hour from the first hour. From about 12 h and in
  24 h or multi-day events, **45–60 g an hour, aiming for 60** (about 0.5–1.0 g per kg an hour, set by heart
  rate, gut comfort and conditions), little and often.
- **Fast and slow carbohydrate together:** about half simple (drink mix, sipped steadily, is the background supply)
  and half complex, so glucose reaches the blood both quickly and steadily. Train the gut to absorb both on the
  long rides; its capacity falls with fatigue, heat and lost sleep, so never force-feed.
- **Under-fuelling beats over-fuelling:** running short is fixed in 20–30 min, gut distress from eating too much
  can take hours to ease. If the rider cannot eat enough on the bike, the pace is too high: slow to a pace that
  allows eating, eat less on long climbs and more at the top.
- **Top-ups and sleep:** in events over a day, an extra 35–60 g, mostly complex, every 6–8 h; before a sleep break,
  a large, quickly absorbed carbohydrate meal to refill glycogen.
- **What the papers say, by hours of effort.** These ranges are for orientation. Intake is individual, it depends
  on what the gut tolerates and on the pace, and it is practised in training before it is used in an event. They
  are not a prescription.

  | Effort | Range in the literature | Note |
  |---|---|---|
  | 1–2.5 h | 30–60 g/h | Professional road racing guidance (E16). |
  | 2.5–6 h | up to about 90 g/h, from glucose and fructose together | Well supported up to 90 g/h (E16, E17). |
  | Over 6 h, at ultra pace | mostly 30–66 g/h reported in the field | Higher intake went with finishing in field studies, most of them in ultra-running (E15). This is where the 45–60 g/h above sits. |

- **The debate above 90 g/h.** Professionals now take 120 g/h on hard stages, and one review argues that the
  upper limit could move toward 120 g/h in trained athletes (E15). Two others find little or no evidence of extra
  benefit above 90 g/h, a growing share that is not used, and more gut trouble, and call it premature for amateurs
  (E16, E17). The capacity to use ingested carbohydrate also varies widely between riders (E15). For an ultra,
  where the pace is low and the gut is the limit, do not plan above 90 g/h; mention the debate only when the
  rider asks.
- **Energy deficit is normal in multi-day events.** Every rider in the RAAM team was in negative energy balance
  throughout (E12). Eating is a task to plan, not something appetite will take care of.
- **Fat oxidation is trained by volume, not by fasting.** Consistent Z1–Z2 hours raise fat use at a given pace.
  Do not prescribe fasted or low-carbohydrate rides for an ultra plan; `fuelling.md` allows them only as an
  optional easy Z2 ride under 90 min, never for beginners. Fat oxidises best with some carbohydrate present ("fat
  burns in the flame of carbohydrate").
- **Train the gut** on every long ride, including the stomach's tolerance after many hours ("after 24 hours" for
  the longest events).
- Practise refuelling from shops and petrol stations, as in the race.
- Fluids and sodium follow heat and sweat rate. Plan the night-time cold and the reduced appetite.
- Sources: Uphill Athlete, "Fat adaptation" (advises against fasted and low-carb training, particularly for women);
  BarrUltra, "What does an ultra-endurance cyclist eat?"; WUCA, "Meeting Calorific Requirements" (Barr and
  Hughes); Cyclite, ultra-distance nutrition guide.

## Strength and self-care

- Strength work pays off: experienced riders rank quality lifting above an extra 1–2 h of riding in a tight
  week. Core and posterior chain protect the back and neck over long hours. See `gym-catalog.md`.
- Practise the routines (clothing changes, lights, punctures, chamois care, eating while riding) on the long
  weekend rides until they are automatic.

## What the plan should not do

- Stack more than two interval sessions a week.
- Replace the long ride with intervals.
- Run the race simulation inside the last 2 weeks.
- Start a new position, saddle or food in the last month.
- Raise volume and intensity in the same week.

## For a planning engine

- **Classify as ultra** when the distance is ≥ 350 km, the estimated duration is ≥ 20 h, the event runs over
  several days, or the event type is ultra-distance or bikepacking. Anything shorter is a gran fondo, however
  long the day; from 8 h it takes this guide's durability, pacing and fuelling.
- **Key sessions:** sweet spot or tempo as key 1; a short VO2max session every week (advanced) or every 2nd week
  (others) as key 2; the long ride as the week's main session.
- **Long ride:** grows toward 5–10 h (bounded by availability). Back-to-back weekends from build on. One race
  simulation at about 50 % of event duration (capped by availability and about 24 h) about 3 weeks out.
- **Taper:** 14–21 days per `periodization.md`. Intervals kept until 3–4 days before, at half the load in the last week.
- **Fuelling check:** a session's planned `carbGPerHour` above `fuelling.carbGPerHourEvidenceMax` in
  `assets/rules.json` draws the validator warning `CARB_ABOVE_EVIDENCE`.
- **Durability:** track the late-ride fade from long rides; the optional `durability-test` session measures it on
  purpose (`testing-and-zones.md`).
