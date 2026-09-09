---
"@pantoken/scaffold": patch
"create-pantoken-app": patch
---

Fix automatic dependency installation when npm is not on PATH, keep failed-install next steps pointed at the generated app directory, print a concrete dev-server command, pre-approve `fsevents` install scripts in scaffolded apps, make Bun/Yarn-created apps use matching README/next-step commands without writing pnpm-only workspace config, keep `create-pantoken-app` scaffold-only so Deno does not resolve the native generator dependency graph, and keep `@pantoken/scaffold`'s published dependency graph free of renderer/preset packages that trip pnpm/Yarn dependency gates.
