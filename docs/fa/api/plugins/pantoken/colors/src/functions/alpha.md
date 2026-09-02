[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# تابع: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Set a color's opacity to `percent`% — the CSS-only mirror of ui-color-utils `alpha`. Mixing with
`transparent` yields exactly the color at that alpha channel.

## پارامترها

### color

`string`

The base color (literal, `var(--token)`, or a nested helper result).

### percent

`number`

The target opacity, 0–100.

## مقدار بازگشتی

`string`

A `color-mix()` expression.

## نمونه

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
