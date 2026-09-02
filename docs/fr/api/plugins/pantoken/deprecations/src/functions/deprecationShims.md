[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / deprecationShims

# Fonction: deprecationShims()

> **deprecationShims**(`ledger`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Create the deprecation-shim plugin from a ledger.

## Paramètres

### ledger

`DeprecationLedger`

The `DeprecationLedger` (e.g. `formats/tokens/deprecations.json`).

## Renvoie

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) whose `tokens` hook appends one shim per entry.
