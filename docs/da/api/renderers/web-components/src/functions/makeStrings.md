[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# Funktion: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Byg et `WebComponentStrings` objekt for `locale`.
Ugeddagsnavne stammer fra `Intl.DateTimeFormat` (og roteres til lokalitets første dag i
ugen); alle andre strenge falder tilbage til engelsk medmindre leveret i `overrides`.

## Parametre

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## Returnerer

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
