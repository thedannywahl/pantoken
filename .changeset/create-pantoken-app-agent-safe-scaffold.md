---
"@pantoken/ai": patch
---

The `create-pantoken-app` skill's "empty directory" step now has the agent elicit the
platform/package-manager/directory itself before shelling out to `pantoken-ai scaffold`, then
passes `--dir` and `--yes` explicitly. Read against the CLI's own resolver
(`packages/scaffold/src/cli.ts`), the old wording — no platform, no `--dir`, no `--yes` — either
throws (missing platform, non-interactively) or silently scaffolds into `.` (missing `--dir`) when
an agent (not a human at a real TTY) is the one running it.
