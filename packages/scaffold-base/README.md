# @pantoken/scaffold-base

The shared [`bingo-stratum`](https://www.create.bingo/engines/stratum) `Base` every pantoken scaffold
platform Preset is built from: a common options schema (`name`), the shared `cssdoc.json` Block, and
`getWrapperContext()` — markup derived from
[`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts)'s `wrapper`
layout, for platform presets to feed into their own Handlebars context.

Not meant to be used standalone — see [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold),
which composes the platform Presets built from this Base (`@pantoken/react`, `@pantoken/next`,
`@pantoken/angular`, `@pantoken/web-components`, `@pantoken/components`) into a single `--preset`-driven
Bingo template.

## API

- **`base`** — the shared `bingo-stratum` `Base`. Platform packages call `base.createPreset({ ... })`
  to define their own Preset.
- **`blockCssdoc`** — a `Base`-scoped Block that writes the shared `cssdoc.json` schema file.
- **`getWrapperContext()`** — returns `{ wrapperRootClass, wrapperContainerHtml(depth?), wrapperContainerJsx(depth?) }`,
  derived from the `wrapper` app-shell layout, for use as Handlebars context in a platform's own
  templates.

## License

MIT
