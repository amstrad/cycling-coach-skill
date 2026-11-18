# Sources — everything the skill's knowledge rests on

This is the index of where the guides come from, by category. It answers "what is this advice based on?" for any guide. The detail for each paper (finding, evidence level, how much of it was read) is in `evidence.md`; this file points there and adds what `evidence.md` does not hold: books and models, formulas, platforms and file formats, the versions of the papers that were read, and the guides that have no source at all.

Status words used below:

| Status | Meaning |
|---|---|
| **Verified** | The source was opened and read, and it says what the guide attributes to it. |
| **Located, not verified** | A link or citation was found, but the content was not read. |
| **Named only** | The guide names it, but no citation was checked. Treat it as common coaching knowledge. |
| **No source** | The guide gives the advice without naming where it comes from. |

## 1. Peer-reviewed papers

All are rows of `evidence.md`, each with its DOI checked against Crossref (`npm run check-dois`).

| Topic | Rows | Used in |
|---|---|---|
| Durability | E01 Maunder 2021 · E02 Jones 2024 · E03 Hunter 2025 · E04 Sánchez-Jiménez 2026 · E05 Barsumyan 2025 · E06 Spragg 2023 · E07 Leo 2021 | `ultra-distance.md`, `testing-and-zones.md`, `hill-climb.md` |
| Climbing | E08 Jobson 2008 · E09 Horvath 2025 · E10 Hovorka 2022 · E11 Chorley 2020 | `hill-climb.md`, `testing-and-zones.md` |
| Sleep in multi-day events | E12 Lahart 2013 · E13 Smith 2023 · E14 Hurdiel 2026 | `ultra-distance.md` |
| Carbohydrate during long efforts | E15 Morton 2026 · E16 Jeukendrup 2026 · E17 Plews 2026 | `ultra-distance.md`, `fuelling.md`, `rules.json` `fuelling` |
| Masters athletes | E18 Tanaka 2008 · E19 Borges 2016 · E20 Fell 2006 · E21 Fell 2008 · E22 Borges 2018 · E23 Hottenrott 2022 · E24 Moore 2021 · E25 Doering 2016 · E26 Llanos-Lagos 2026 | `masters.md`, `gym-catalog.md`, `fuelling.md` |
| Heat training | E27 Racinais 2015 · E28 Périard 2015 · E29 Tyler 2016 · E30 Daanen 2018 · E31 Gibson 2015 · E32 Pryor 2019 | `heat-training.md` |
| Training methods and formulas | E33 Rønnestad 2020 · E34 Rønnestad 2021 · E35 Tanaka 2001 | `interval-catalog.md`, `testing-and-zones.md` |

By strength of evidence: systematic reviews and meta-analyses are E04, E26, E29 and E30. Everything else is a narrative review, a consensus statement, or a single small study.

## 2. Versions of the papers that were read

A row marked `Full text` in `evidence.md` was read from one of these. Where the copy is an accepted manuscript or a pre-proof, the published version may differ in wording or page numbers, never checked line by line.

| Row | Copy read |
|---|---|
| E03 Hunter 2025 | Publisher PDF, from the AUT open repository. |
| E05 Barsumyan 2025, E09 Horvath 2025 | Publisher page (open access). |
| E11 Chorley 2020, E12 Lahart 2013, E14 Hurdiel 2026, E17 Plews 2026, E24 Moore 2021, E26 Llanos-Lagos 2026, E27 Racinais 2015 | PubMed Central page (open access). |
| E15 Morton 2026 | **Journal pre-proof** PDF. Not the final version of record. |
| E16 Jeukendrup 2026 | Publisher PDF, from a third-party copy. |
| E18 Tanaka 2008 | PubMed Central page. |
| E19 Borges 2016 | **Accepted manuscript** PDF, from the Waikato repository. |
| E29 Tyler 2016 | **Accepted manuscript** PDF, from the Roehampton repository. |
| E30 Daanen 2018 | Publisher PDF (open access). |
| E31 Gibson 2015 | **Accepted manuscript** PDF, from the Brunel repository. |

Rows marked `Abstract only` were read as the abstract indexed by Europe PMC or Crossref.

## 3. Books, models and conventions

Named in the guides. None of these was checked against the original in the evidence passes.

| Source | What the skill takes from it | Where | Status |
|---|---|---|---|
| Allen and Coggan, *Training and Racing with a Power Meter* | The power zones as a share of FTP and the cycling heart-rate bands as a share of LTHR. | `testing-and-zones.md`, `rules.json` `zones` | Named only. A convention, not an evidence-based threshold. |
| Joe Friel's heart-rate bands | The cycling bands used until 1.0.1, and the style of the running bands still in use. | `testing-and-zones.md`, `running-model.md` | Named only. |
| Training Stress Score, Normalized Power, Intensity Factor, and the fitness, fatigue and form chart (CTL, ATL, TSB) | The load formulas and the weekly load bands. | `periodization.md`, `rules.json` `load` | No source in the guide. These are the standard power-based load metrics that the connected platforms compute. |
| Acute-to-chronic workload ratio | The 0.8–1.3 range and the caution bands. | `planning-rules.md`, `garmin-snapshot.md`, `rules.json` `load.acwr` | No source. |
| Riegel's formula, `T2 = T1 × (D2 ÷ D1) ^ 1.06` | Converting a race time between distances. | `athlete-levels.md`, `running-model.md` | Named only. |
| VDOT | Named as the running performance measure in the level score; the skill uses race-time bands in its place. | `athlete-levels.md` | Named only. |
| Polarized and pyramidal intensity distribution | The time-in-zone targets by weekly volume. | `planning-rules.md`, `rules.json` `intensityDistribution` | No source. |
| Relative energy deficiency in sport (RED-S) | The red flags to surface. | `fuelling.md`, `planning-rules.md` | Named only. A referral cue, never a diagnosis. |
| Andrew Coggan's climbing model ("1 kg at 10 % is worth 4–5 W") | Context for weight on a climb. | `hill-climb.md` | Located, not verified: reported by the Roadman page, which gives no derivation. |
| Karvonen formula | Named only to say the skill does not use it. | `testing-and-zones.md` | Named only. |
| Inspiratory muscle training ("most studies used two sets a day") | The daily set and its progression. | `gym-catalog.md` | No source. The studies are not cited. |

## 4. Coaching-practice sites

Articles, forum threads and coaching sites behind the practical advice in two guides. The status of each, and what each page does and does not support, is in the table at the end of `evidence.md`.

| Guide | Sources | Status in short |
|---|---|---|
| `ultra-distance.md` | Race Ready Cycling Training; TrainerRoad forum thread; Uphill Athlete; BarrUltra; WUCA (Barr and Hughes); Cyclite | Two verified, one verified for a single point, two located but not verified, one with no URL. |
| `hill-climb.md` | Roadman Cycling | Verified. |

## 5. Platforms, devices and file formats

The integration guides describe how these behave. They rest on the platforms' own documentation and on use, and they go out of date when a platform changes.

| Source | Used for | Where |
|---|---|---|
| Intervals.icu REST API and workout-description syntax | Reading thresholds, load, wellness and curves; publishing calendar events. | `intervals-icu.md` |
| Strava, through a connector | Zones, recent activities, best efforts, activity names. | `strava-sync.md` |
| Garmin Workout Importer browser extension, and Garmin's readiness, HRV and load fields | The pasted JSON export and how to read it. | `garmin-snapshot.md` |
| Zwift workout XML (`.zwo`) | The workout files the skill writes. | `zwift-xml.md` |
| A core-temperature sensor (CORE or similar) | The heat session's target. Consumer sensors were not the thermometers used in the studies. | `heat-training.md` |
| Agent Skills format; Hermes Agent skills documentation | The shape of `SKILL.md` and how the skill installs. | `SKILL.md`, `README.md` |
| JSON Schema 2020-12 | The profile and week-plan schemas. | `assets/` |
| Crossref and Europe PMC | Checking citations and reading abstracts during the evidence passes. | `tools/check-dois.mjs` |

## 6. Guides with no listed source

These guides were written from general endurance-coaching practice. They name no source, and the evidence passes did not review them. Their numbers are coaching defaults.

| Guide | What it holds |
|---|---|
| `planning-rules.md`, `coaching-model.md` | The hard constraints, sequencing, the push/hold decision, and the age and level tables. The age rules are discussed in `masters.md`. |
| `periodization.md`, `season-plan.md` | Phases, tapers, block patterns, load ramps. |
| `athlete-levels.md`, `power-profiles.md` | The level score, the W/kg and race-time bands, the power-profile thresholds and the rider-shape pyramid. |
| `interval-catalog.md` | Session shapes, progression steps, the rotation, the indoor variants. Only the 30/15 intervals have a paper (E33, E34). |
| `running-model.md`, `running-catalog.md` | Running zones, weekly structures, the runner-specific rules, sessions and progressions. |
| `gym-catalog.md` | Exercises, sets and placement. Only the general case for strength work has a paper (E26). |
| `adjustments.md` | Session scoring and week repair. |
| `fuelling.md` | The intake table below 12 h, protein and timing cues. The range up to 90 g/h and the debate above it have papers (E15–E17). |

## Keeping this file true

- A new paper goes into `evidence.md` first, then into the table in section 1.
- A new book, model, formula, platform or site goes into the matching section with its status.
- When a guide gains its first source, move it out of section 6.
- Do not upgrade a status to **Verified** without opening the source.
