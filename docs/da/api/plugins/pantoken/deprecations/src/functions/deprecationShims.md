[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / deprecationShims

# Funktion: deprecationShims()

> **deprecationShims**(`ledger`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret deprecation-shim-plugin fra en hovedbog.

## Parametre

### ledger

`DeprecationLedger`

Den `DeprecationLedger` (f.eks. `formats/tokens/deprecations.json`).

## Returnerer

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

En [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md), hvis `tokens` hook tilføjer én shim pr. post.
