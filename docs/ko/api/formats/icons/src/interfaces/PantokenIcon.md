[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# 인터페이스: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A pantoken icon, derived from an `&lt;image&gt;` token.

## 속성

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The icon name, without the `--instui-icon-` prefix (e.g. `arrow-left`).

***

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The `url('data:image/svg+xml;utf8,…')` value, as stored in the IR.

***

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The decoded inline SVG markup, stripped of `&lt;script&gt;` elements and event-handler attributes.
Originates from the vendored IR (pinned upstream). Safe for trusted injection contexts;
consumers should not treat this as safe for injection into attacker-controlled HTML.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The SVG `viewBox`, when known.

***

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Whether the icon flips horizontally in right-to-left contexts.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The glyph origin.
