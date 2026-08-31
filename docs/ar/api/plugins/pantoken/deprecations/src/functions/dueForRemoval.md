[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Function: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الإدخالات التي تم الوصول إلى الإصدار الفرعي `removeIn` بواسطة البناء الحالي — أي shims التي
يجب الآن إحالتها للتقاعد. خط أنابيب الترقية يفشل في بركة بينما يوجد أي منها.

## Parameters

### ledger

`DeprecationLedger`

دفتر الإهمال.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

إصدارات المصب الحالية المحلولة.

## Returns

`DeprecationEntry`[]

الإدخالات المستحقة للإزالة.
