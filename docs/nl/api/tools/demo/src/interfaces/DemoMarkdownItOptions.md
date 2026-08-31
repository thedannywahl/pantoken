[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

Options for [demoMarkdownIt](../functions/demoMarkdownIt.md): the [resolveDemo](../functions/resolveDemo.md) fields plus optional live-example seaming.

## Extends

- [`ResolveOptions`](ResolveOptions.md)

## Properties

### base?

> `optional` **base?**: `string`

Site base path, e.g. `/pantoken/` (default `/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

---

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner page path, relative to `base` (default `play/index.html`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

---

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-source dir, relative to `base` (default `demos/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

---

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URLs the runner injects (into its chrome and every rendered result): the component
sheets, the multi-theme token sheet, and the plugin/surface sheets. The runner themes by toggling
the `data-pantoken-theme` attribute, so one token sheet covers every theme.

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

---

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

When set, appends a live preview after each `html` fence on matching pages — the same markup,
rendered live, beneath its source. Overlay examples (`<dialog>`, `[popover]`) are skipped: they're
hidden until opened, so a `## Demo` iframe drives their preview instead.
