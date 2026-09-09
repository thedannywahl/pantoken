---
"@pantoken/scaffold": patch
"create-pantoken-app": patch
---

Fix automatic dependency installation when npm is not on PATH, keep failed-install next steps pointed at the generated app directory, print a concrete dev-server command, pre-approve `fsevents` install scripts in scaffolded apps, make Bun-created apps use Bun README/next-step commands without writing pnpm-only workspace config, and keep `create-pantoken-app` scaffold-only so Deno does not resolve the native generator dependency graph.
