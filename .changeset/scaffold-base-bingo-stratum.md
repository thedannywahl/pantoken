---
"@pantoken/scaffold-base": minor
---

Introduce `@pantoken/scaffold-base` — the shared `bingo-stratum` Base every pantoken scaffold
platform Preset is built from: a common `name` option, the shared `cssdoc.json` Block, and
`getWrapperContext()` (markup derived from `@pantoken/plugin-layouts`'s `wrapper` layout for
platform presets to feed into their own Handlebars context). Part of the migration of
`@pantoken/scaffold` onto [Bingo](https://github.com/bingo-js/bingo); not meant to be used
standalone.

Template sources use `.jsonc` for internal authoring (supports comments), while generated output
remains strict `.json` for scaffolded projects.
