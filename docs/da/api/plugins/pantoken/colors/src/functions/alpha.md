[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# Function: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indstil en farves gennemsigtighed til `percent`% — CSS-kun spejlingen af ui-color-utils `alpha`. Blanding med
`transparent` giver præcis den farve ved den alfa-kanal.

## Parameters

### color

`string`

Basisfarven (bogstavelig, `var(--token)`, eller et indlejret hjælperesultat).

### percent

`number`

Målopaciteten, 0–100.

## Returns

`string`

Et `color-mix()` udtryk.

## Example

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
