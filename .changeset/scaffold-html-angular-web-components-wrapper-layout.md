---
"@pantoken/scaffold": minor
---

Renamed the `web` platform to `html`, and added two new platforms: `angular` (standalone Angular via Vite, no Angular CLI, using `@pantoken/angular`) and `web-components` (plain Vite + `@pantoken/web-components`, no framework). Every platform's entry markup is now generated at build time from `@pantoken/plugin-layouts`'s `wrapper` app-shell layout (`.container`/`.header`/`.content` parts, via `scripts/wrapper-layout.ts`), so template markup stays in sync automatically when that layout changes.
