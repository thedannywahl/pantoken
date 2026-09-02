[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# Zmienna: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-button&gt;` — a token-styled `&lt;button&gt;`. The `variant` attribute maps to the `-color-&lt;variant&gt;`
modifier (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` adds spacing around the
host (InstUI keywords like `small` / `medium large`); slotted content is the label.

It is also a native invoker: `popovertarget` (with optional `popovertargetaction`) toggles any
light-DOM `[popover]` such as `&lt;instui-context-view&gt;`, `&lt;instui-popover&gt;`, or `&lt;instui-tray&gt;`, and
`command`/`commandfor` drives the command-based components (`&lt;instui-modal&gt;` with `--show`/`--close`,
etc.). The id is forwarded to the inner button via the invoker IDL, so it resolves across the shadow
boundary and may point forward to an element declared later in the document.

## Przykład

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
