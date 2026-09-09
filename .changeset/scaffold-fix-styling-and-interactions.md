---
"@pantoken/scaffold": minor
---

fix: fix broken scaffold styling and wire in `@pantoken/interactions` out of the box

The `components` (HTML), `web-components`, and `angular` scaffold templates
imported `@pantoken/components/base.css` and `components.css` but never
`@pantoken/css`, so no `--instui-*` custom property was ever defined and every
component rendered unstyled. All three now import the theme stylesheet first
and depend on `@pantoken/css`.

Every template's `tsconfig.json` now sets `"types": ["vite/client"]` so
TypeScript resolves `.css` side-effect imports (previously "Cannot find module
or type declarations for side-effect import" in every scaffolded project).

`@pantoken/plugin-layouts/layouts.css` was only ever needed at scaffold-generate
time (to derive the wrapper markup), never at the scaffolded app's runtime —
dropped from every template's entry file and dependencies.

`@pantoken/interactions` (modal, tooltip, alert dismiss, and other component
behaviors) is now wired into every template out of the box via its full IIFE
bundle. The Next.js template gained a small client component
(`PantokenInteractions`) since the bundle touches `document` at import time,
which the App Router's default server-rendered layout can't do.
