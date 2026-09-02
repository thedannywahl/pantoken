[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

Options for [demoMarkdownIt](../functions/demoMarkdownIt.md): the [resolveDemo](../functions/resolveDemo.md) fields plus optional live-example seaming.

## Estende

- [`ResolveOptions`](ResolveOptions.md)

## Propriedades

### base?

> `optional` **base?**: `string`

Site base path, e.g. `/pantoken/` (default `/`).

#### Herdado de

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner page path, relative to `base` (default `play/index.html`).

#### Herdado de

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

***

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-source dir, relative to `base` (default `demos/`).

#### Herdado de

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URLs the runner injects (into its chrome and every rendered result): the component
sheets, the multi-theme token sheet, and the plugin/surface sheets. The runner themes by toggling
the `data-pantoken-theme` attribute, so one token sheet covers every theme.

#### Herdado de

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

***

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

When set, appends a live preview after each `html` fence on matching pages — the same markup,
rendered live, beneath its source. Overlay examples (`&lt;dialog&gt;`, `[popover]`) are skipped: they're
hidden until opened, so a `## Demo` iframe drives their preview instead.

***

### localePrefix?

> `optional` **localePrefix?**: (`relativePath`) => `string`

Route a `demo:self:&lt;name&gt;` fence to a locale-specific self-hosted demo directory, from the current
page's markdown-it `env.relativePath` (e.g. `"hu/"` for pages under `hu/`, `""` for the root
locale). Prepended to `demosPath` so the localized clone of a demo (translated prose, same markup)
loads instead of the English source. Omit for a single-locale site.

#### Parâmetros

##### relativePath

`string`

#### Retorna

`string`
