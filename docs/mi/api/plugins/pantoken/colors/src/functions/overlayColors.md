[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# Mahi: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Flatten `overlay` (at `percent`% strength) over an opaque `base` — a CSS-only stand-in for
ui-color-utils `overlayColors`. That helper source-over-composites two RGBA colors into one opaque
result; the common case (a translucent tint over a solid surface) is exactly a two-color
`color-mix()`. General RGBA-over-RGBA compositing can't be a single CSS color, so this covers the
opaque-base case only.

## Ngā Tawhā

### base

`string`

The opaque background color.

### overlay

`string`

The color laid over it.

### percent?

`number` = `50`

How much of `overlay` shows through, 0–100 (default `50`).

## Whakahokia

`string`

A `color-mix()` expression.

## Tauira

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
