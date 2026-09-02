[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / deprecationShims

# Mahi: deprecationShims()

> **deprecationShims**(`ledger`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the deprecation-shim plugin from a ledger.

## Ngā Tawhā

### ledger

`DeprecationLedger`

The `DeprecationLedger` (e.g. `formats/tokens/deprecations.json`).

## Whakahokia

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) whose `tokens` hook appends one shim per entry.
