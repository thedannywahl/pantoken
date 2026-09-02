[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# Entèfas: ResolveOptions

Options for resolving a demo spec. Only the `self` provider uses the runner/demos/css fields.

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## Pwopriyete

### base?

> `optional` **base?**: `string`

Site base path, e.g. `/pantoken/` (default `/`).

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner page path, relative to `base` (default `play/index.html`).

***

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-source dir, relative to `base` (default `demos/`).

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URLs the runner injects (into its chrome and every rendered result): the component
sheets, the multi-theme token sheet, and the plugin/surface sheets. The runner themes by toggling
the `data-pantoken-theme` attribute, so one token sheet covers every theme.
