[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# 함수: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Lighten by `percent` HSL-lightness points — the CSS-only mirror of ui-color-utils `lighten`
(tinycolor raises HSL lightness). Uses relative color syntax so hue and saturation are preserved.

## 매개변수

### color

`string`

The base color.

### percent?

`number` = `10`

Lightness points to add (default `10`, matching tinycolor's default).

## 반환값

`string`

An `hsl(from …)` relative-color expression.

## 예제

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
