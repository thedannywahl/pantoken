[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# Function: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Formørk med `percent` HSL-lysstyrke-punkter — CSS-kun spejlingen af ui-color-utils `darken`
(tinycolor sænker HSL-lysstyrke). Bruger relativ farvesyntaks, så farvetone og mætning bevares.

I relativ `hsl()`, løser `l` kanalen til en `&lt;number&gt;` på skalaen 0–100 — den samme skala
tinycolor's `amount` bruger — så punkterne subtraheres direkte (ingen `%`).

## Parameters

### color

`string`

Basisfarven.

### percent?

`number` = `10`

Lysstyrke-punkter at trække fra (standard `10`, der matcher tinycolor's standard).

## Returns

`string`

Et `hsl(from …)` relativ-farveudtryk.

## Example

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
