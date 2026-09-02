[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/typedoc-plugin-demo` — a TypeDoc plugin for the `@demo` block tag.

Authors attach a live, embeddable demo to any symbol with `@demo &lt;spec&gt;`, where `&lt;spec&gt;` is either
a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair (for example `stackblitz:abc123`, `codesandbox:xy12z`,
`wp-playground:https://…/blueprint.json`, or `self:button`). This plugin registers nothing about
providers itself — it stays deliberately dumb and reusable: it moves each `@demo` tag's spec into
a fenced `demo` block appended to the symbol's summary, and your docs renderer decides how to
turn a spec into an iframe. (See `@pantoken/demo` for a renderer that resolves the providers.)

The fence rides through markdown untouched — including any translation pipeline that preserves
code blocks — so the demo survives localization.

**Setup:** add `"@demo"` to TypeDoc's `blockTags` option. The comment parser reads that list before
plugins load, so a plugin can't register the tag late enough to suppress the "unknown block tag"
warning; it must be in your `typedoc.json`.

## Ejemplo

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"]
}
```

## Variables

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## Funciones

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
