[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / deprecationShims

# ฟังก์ชัน: deprecationShims()

> **deprecationShims**(`ledger`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Create the deprecation-shim plugin from a ledger.

## พารามิเตอร์

### ledger

`DeprecationLedger`

The `DeprecationLedger` (e.g. `formats/tokens/deprecations.json`).

## คืนค่า

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) whose `tokens` hook appends one shim per entry.
