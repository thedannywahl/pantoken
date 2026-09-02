---
"@pantoken/scaffold": minor
---

Add `vp run scaffold:dev <platform>` — materializes a scaffold into an untracked
`.dev/<platform>` directory, links its `@pantoken/*` runtime deps to local workspace source, and
runs a real Vite dev server for live browser HMR. Editing the scaffold's own template/preset source
re-materializes the files automatically; editing a linked `@pantoken/*` package rebuilds it via
`@pantoken/vite-workspace-orchestrator` and hot-reloads the preview. `next` isn't supported yet.
