[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / deprecationShims

# Function: deprecationShims()

> **deprecationShims**(`ledger`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء مكون الإهمال-shim من دفتر الأستاذ.

## Parameters

### ledger

`DeprecationLedger`

الـ `DeprecationLedger` (على سبيل المثال `formats/tokens/deprecations.json`).

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

إضافة [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) التي يضيف خطاف `tokens` فيها واحد shim لكل إدخال.
