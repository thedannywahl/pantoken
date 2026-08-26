---
"@pantoken/scaffold": minor
"create-pantoken-app": minor
---

`pantoken-scaffold` and `create-pantoken-app` now share a single CLI implementation
(`@pantoken/scaffold/cli`). When `--dir` is omitted and stdin is an interactive TTY, the CLI now
prompts for a target directory instead of silently scaffolding into the current folder. The
post-scaffold "next steps" message now recommends `vp install` alongside npm/pnpm/yarn/bun.
