[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# دالة: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإدخالات التي تم الوصول فيها إلى الإصدار الثانوي العلوي `removeIn` بواسطة البناء الحالي — أي الحشوات (shims) التي
يجب الآن إيقافها. يفشل خط الترقية لعملية البركة (bless) طالما أيٌّ منها موجود.

## المعلمات

### ledger

`DeprecationLedger`

سجل الإيقاف التدريجي.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

الإصدارات العلوية المحلولة الحالية.

## القيم المرجعة

`DeprecationEntry`[]

الإدخالات المقرَّر إزالتها.
