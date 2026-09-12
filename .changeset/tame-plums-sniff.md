---
"@pantoken/scaffold": minor
"@pantoken/ai": patch
"create-pantoken-app": patch
---

`@pantoken/scaffold` (and `create-pantoken-app`) now asks whether to install AI agent assets
(AGENTS.md, editor/Copilot rules) after scaffolding, defaulting to yes; pass `--no-ai` to skip it,
or `--yes` non-interactively still installs them unless `--no-ai` is also given. Dependency
installation also now runs asynchronously so the progress spinner animates instead of appearing
frozen while `install` runs.

`@pantoken/ai`'s `installAgentAssets`/`AGENT_TOOLS`/`AgentTool` now live in `@pantoken/scaffold`
and are re-exported from `@pantoken/ai` for backward compatibility.
