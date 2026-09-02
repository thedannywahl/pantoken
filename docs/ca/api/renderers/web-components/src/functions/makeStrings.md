[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# Funció: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Construeix un objecte `WebComponentStrings` per a `locale`.
Els noms dels dies de la setmana es deriven de `Intl.DateTimeFormat` (i es giren al primer dia de
setmana de la configuració regional); totes les altres cadenes retrocedeixen a l'anglès tret que es proporcionin en `overrides`.

## Paràmetres

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## Retorna

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
