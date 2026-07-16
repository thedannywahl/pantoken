# pantoken.

Instructure design tokens and icons, reshaped for every platform. pantoken resolves Instructure UI's
tokens and icons once into a canonical model, then emits many small, individually-publishable
packages — CSS, SCSS/Less/Stylus, React/Vue/Svelte, Tailwind/Panda, native Swift/Kotlin, WordPress,
Figma, and more — unified by an unscoped `pantoken` meta package.

Read `README.md` for the consumer quickstart. This file is the map to everything an agent needs; open
the linked docs only when a task calls for them.

## How to work here.

- **Use the `vp` / `vpr` / `vpx` CLIs — never raw pnpm, npm, or yarn.** They're global bins. Package
  scripts must never shell out to `pnpm` internally: CI provides `vp` but not `pnpm` on PATH, so a
  `pnpm run …` inside a script breaks the docs deploy. Details in `docs/conventions/build-and-docs.md`.
- **Never kill a process you didn't start.** "Port in use" is not "stale" — the user runs their own
  dev servers in other windows. For your own preview server, bind a distinct port with `--strictPort`.
  If a port is taken, pick another or ask.
- **Decide one fork at a time.** Give a recommendation plus the tradeoff, then let the user choose.
  Verify third-party claims (upstream token names, browser support, a library's capability) before
  asserting them.
- **Writing:** active voice, contractions, plain language, Oxford comma. Don't use empowering,
  harnessing, unlocking, supercharging, transforming, game-changing, seamless, robust, leverage, or
  synergy.
- **Keep `@pantoken/components` and `@pantoken/web-components` runtime graphs Node-free** — they ship
  to the browser. A value import of a postcss-based `@cssdoc/*` package pulls a `node:module` shim
  into the bundle and kills client JS. Type-only imports are fine; value imports belong in build
  scripts and tests.

## Knowledge map.

| When you need to…                                                                  | Read…                                |
| ---------------------------------------------------------------------------------- | ------------------------------------ |
| Understand the monorepo, the pipeline, and why `@pantoken/model` exists            | `docs/architecture/overview.md`      |
| Author or extend a component (records, the modifier convention, aliases, `@scope`) | `docs/conventions/authoring.md`      |
| Work on the web components (shadow CSS, `register()`/prefix, the JS-behavior tier) | `docs/conventions/web-components.md` |
| Build, lint, release, or work on the docs site + i18n + cssdoc integration         | `docs/conventions/build-and-docs.md` |
| Avoid re-solving a known bug or gotcha                                             | `docs/engineering-log.md`            |
| Match an agent to a domain                                                         | `AGENTS.md`                          |

## Repo shape.

Organized by _how you consume_ each package: `packages/` core machinery · `formats/` importable
serializations (css, icons, scss, components, …) · `platforms/` generated foreign-ecosystem source ·
`renderers/` UI integrations (web-components, framework wrappers, bridges) · `bundlers/` build-pipeline
plugins · `design/` Figma + swatches · `plugins/{pantoken,postcss,typedoc,vite}/` · `tools/` internal
build tooling · `ai/` consumer-facing agent assets. The gate is `pnpm run ready` +
`pnpm run check:publish`.
