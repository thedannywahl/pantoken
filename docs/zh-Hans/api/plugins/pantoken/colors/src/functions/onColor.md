[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# 函数: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The readable foreground — black or white — for content placed *on* `surface`. This is the CSS-only
form of InstUI's recurring `*-on-color` variants (a focus ring on a brand button, a
primary-inverse button's text, an icon on a coloured surface): rather than a fixed inverse token,
it picks the contrast from the surface itself, so it stays correct as the surface changes.

It reads the surface's OKLCH lightness through relative color syntax and snaps it to `0` (black) or
`1` (white) at `threshold` using the `calc(… * infinity)` clamp trick — no JS, no fixed hex.

## 参数

### surface

`string`

The background colour content sits on (literal, `var(--token)`, or a nested helper).

### threshold?

`number` = `0.62`

OKLCH lightness (0–1) above which the surface counts as "light" (default `0.62`).

## 返回值

`string`

An `oklch(from …)` expression resolving to black or white.

## 示例

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```
