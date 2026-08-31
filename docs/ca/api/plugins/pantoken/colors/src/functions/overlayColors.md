[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# Function: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aplana `overlay` (amb intensitat `percent`%) sobre `base` opac — un substitut només CSS per a ui-color-utils `overlayColors`. Aquell ajudant compon la font sobre dos colors RGBA en un resultat opac; el cas comú (un tint translúcid sobre una superfície sòlida) és exactament `color-mix()` de dos colors. La composició RGBA-sobre-RGBA general no pot ser un únic color CSS, per tant aquesta només cobreix el cas de base opaca.

## Parameters

### base

`string`

El color de fons opac.

### overlay

`string`

El color posat sobre ell.

### percent?

`number` = `50`

Quant de `overlay` es veu, 0–100 (per defecte `50`).

## Returns

`string`

Una expressió `color-mix()`.

## Example

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
