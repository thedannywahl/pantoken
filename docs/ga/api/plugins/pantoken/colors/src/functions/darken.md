[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# Feidhm: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Darken by `percent` HSL-lightness points — the CSS-only mirror of ui-color-utils `darken`
(tinycolor lowers HSL lightness). Uses relative color syntax so hue and saturation are preserved.

In relative `hsl()`, the `l` channel resolves to a `&lt;number&gt;` on the 0–100 scale — the same scale
tinycolor's `amount` uses — so the points are subtracted directly (no `%`).

## Paraiméadair

### color

`string`

The base color.

### percent?

`number` = `10`

Lightness points to subtract (default `10`, matching tinycolor's default).

## Tuairisceáin

`string`

An `hsl(from …)` relative-color expression.

## Sampla

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
