# Examples

Worked examples that double as regression tests. `npm test` checks every one of them.

| Folder | Contents | Expected result |
|---|---|---|
| `profiles/` | Four complete `athlete-profile.json` files: a beginner cyclist, a 52-year-old intermediate cyclist, a 41-year-old marathoner, and an advanced athlete who rides and runs. | Each has the required fields from `assets/athlete-profile.schema.json`. |
| `weeks/` | One week plan per profile, in the format of `assets/week-plan.schema.json`. | Passes `scripts/validate-week.mjs` with no errors. |
| `invalid/` | Weeks that break specific rules: stacked high-intensity days, masters spacing, a marathon overreach, and a beginner given high-intensity work. | Fails with exactly the codes listed in each file's `expectErrors`. |

Run one example by hand:

```bash
node scripts/validate-week.mjs examples/weeks/masters-cyclist.plan.json
```

When a rule changes in `references/` and `assets/rules.json`, update or add an example that shows the change, so the test suite catches regressions.
