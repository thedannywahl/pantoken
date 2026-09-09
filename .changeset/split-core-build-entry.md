---
"@pantoken/core": minor
"@pantoken/tokens": patch
---

fix(core): keep the GitHub-only design-tokens dependency out of downstream consumers

`buildTokens` moved off the main `@pantoken/core` entry onto a new `@pantoken/core/build` subpath.
It was the only export needing `@instructure/instructure-design-tokens` (a `github:`-protocol,
"exotic" dependency), but every consumer of the main entry — including `platforms/{android,compose,
flutter,rust,swift}` via `@pantoken/pantoken` — pulled it in transitively, since the package bundled
to a single file. That made the exotic dependency a subdependency for anyone installing
`create-pantoken-app` or `@pantoken/pantoken`, which pnpm's `blockExoticSubdeps` policy rejects
(`ERR_PNPM_EXOTIC_SUBDEP`).

`@instructure/instructure-design-tokens` also moved from `dependencies` to `devDependencies` on
`@pantoken/core`, so published consumers no longer see it at all. In-repo callers of `buildTokens`
(`@pantoken/tokens`'s generator) now import it from `@pantoken/core/build`.

**Breaking:** `import { buildTokens } from "@pantoken/core"` no longer works — use
`import { buildTokens } from "@pantoken/core/build"` instead. All other exports are unchanged.
