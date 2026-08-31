[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# Function: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Lys op med `percent` HSL-lysstyrke-punkter — CSS-kun spejlingen af ui-color-utils `lighten`
(tinycolor øger HSL-lysstyrke). Bruger relativ farvesyntaks, så farvetone og mætning bevares.

## Parameters

### color

`string`

Basisfarven.

### percent?

`number` = `10`

Lysstyrke-punkter at tilføje (standard `10`, der matcher tinycolor's standard).

## Returns

`string`

Et `hsl(from …)` relativ-farveudtryk.

## Example

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
