# @pantoken/scaffold-base

The shared [`bingo-stratum`](https://www.create.bingo/engines/stratum) `Base` every pantoken scaffold
platform Preset is built from. Provides:

- **Common options schema**: `projectName` string with `"pantoken-app"` default.
- **Shared Blocks**: `blockCssdoc` (writes `cssdoc.json`), `blockWrapperContext` (provides markup derived
  from [`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts)'s `wrapper`
  app-shell layout for platform-specific rendering).
- **Factory function**: `createPreset()` for type-safe Preset construction with `--isolatedDeclarations`
  compatibility.

Used by platform packages (`@pantoken/components`, `@pantoken/react`, `@pantoken/vue`,
`@pantoken/web-components`) to define their own presets, which are then auto-discovered and
registered by [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold).

Not meant to be used standalone — see `@pantoken/scaffold` for the full scaffolding workflow.

## API

- **`base`** — the shared `bingo-stratum` `Base`, exported for re-use in platform presets.
- **`createPreset(input)`** — factory function constructing a type-safe `Preset` with platform-specific
  options. Workaround for `--isolatedDeclarations` mode, which requires explicit types on all exports.
- **`blockCssdoc`** — a `Base`-scoped Block that writes the shared `cssdoc.json` scaffold file.
- **`getWrapperContext()`** — returns `{ wrapperRootClass, wrapperContainerHtml(depth?), wrapperContainerJsx(depth?) }`,
  derived from the `wrapper` app-shell layout, for use as Handlebars context in a platform's own
  templates.

## License

MIT
