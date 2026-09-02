[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# 함수: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Set a color's opacity to `percent`% — the CSS-only mirror of ui-color-utils `alpha`. Mixing with
`transparent` yields exactly the color at that alpha channel.

## 매개변수

### color

`string`

The base color (literal, `var(--token)`, or a nested helper result).

### percent

`number`

The target opacity, 0–100.

## 반환값

`string`

A `color-mix()` expression.

## 예제

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
