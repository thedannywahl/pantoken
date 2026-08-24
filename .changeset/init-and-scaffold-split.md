---
"@pantoken/ai": minor
---

Split the `bootstrap-pantoken` Claude skill in two: `init-pantoken` now covers installing pantoken's agent assets (AGENTS.md, llms.txt, editor/agent rules, skills), while `scaffold-pantoken` covers scaffolding a new project or wiring pantoken into an existing one. Renamed the `bootstrap <platform>` CLI command to `scaffold <platform>` (it now wraps the new `@pantoken/scaffold` package's scaffold plus `init`'s agent-asset install into one command), and added a `scaffoldAndInit` API. `scaffoldProject`/`SCAFFOLD_PLATFORMS`/`ScaffoldPlatform` are now re-exported from the new `@pantoken/scaffold` package instead of being implemented locally.
