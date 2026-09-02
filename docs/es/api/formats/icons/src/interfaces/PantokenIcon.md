[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# Interfaz: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A pantoken icon, derived from an `&lt;image&gt;` token.

## Propiedades

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The icon name, without the `--instui-icon-` prefix (e.g. `arrow-left`).

***

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The `url('data:image/svg+xml;utf8,…')` value, as stored in the IR.

***

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The decoded inline SVG markup, stripped of `&lt;script&gt;` elements and event-handler attributes.
Originates from the vendored IR (pinned upstream). Safe for trusted injection contexts;
consumers should not treat this as safe for injection into attacker-controlled HTML.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The SVG `viewBox`, when known.

***

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Whether the icon flips horizontally in right-to-left contexts.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The glyph origin.
