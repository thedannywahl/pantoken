---
"@pantoken/ai": patch
---

Point agent-facing skill URLs at `https://create.pantoken.app` — a new GitHub Pages site (added as
the `ai/create-pantoken-app-site` submodule) that serves the `create-pantoken-app` skill directly at
the domain root, so an agent CLI can fetch it without the `/create-pantoken-app.md` path. Updated
`getting-started.md`, `GetStartedTabs.vue`, `.well-known/api-catalog`, and the `@pantoken/ai` agent
assets to the new URL.
