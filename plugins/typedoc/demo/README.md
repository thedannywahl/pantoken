# @pantoken/typedoc-plugin-demo

A TypeDoc plugin for a `@demo` block tag. Authors attach a live, embeddable demo to any symbol, and
this plugin turns it into a fenced `demo` block your docs renderer picks up as an iframe — an
MDN-style "live sample" panel.

It's deliberately provider-agnostic: it doesn't know or care what `stackblitz` or `wp-playground`
means. It just moves the spec into a fence; your renderer resolves it.

## Install

```sh
npm i -D @pantoken/typedoc-plugin-demo typedoc
```

## Setup

Add the plugin, and register `@demo` in `blockTags` (the comment parser reads that list before
plugins load, so the tag must be declared in config to avoid an "unknown block tag" warning):

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"],
}
```

## Authoring

```ts
/**
 * A button stylesheet.
 *
 * @demo self:button
 * @demo stackblitz:abc123
 */
export function buttonCss() {}
```

Each `@demo` becomes a `demo` fence in the symbol's description, in order. A spec is either a bare
URL (`@demo https://…` or `@demo /path`) or a `<provider>:<ref>` pair. Common providers a renderer
might support: `self`, `url`, `stackblitz`, `codesandbox`, `codepen`, `dartpad`, `wp-playground`.

## Rendering

The plugin only emits the fence. To display it, teach your docs to turn a `demo` fence into an
iframe — for example a markdown-it fence rule that reads the spec and renders the right embed. In
pantoken's VitePress site, `@pantoken/demo` resolves the provider spec into iframe attributes.

## API

- **`load(app)`** — the TypeDoc entry point.
- **`rewriteComment(comment)`** — move a comment's `@demo` tags into summary fences (exported for
  testing and reuse).
- **`toDemoFence(spec)`** — wrap one spec in a `demo` fence.
- **`DEMO_TAG`** (`"@demo"`), **`DEMO_FENCE`** (`"demo"`) — the tag and fence-language constants.

## License

MIT
