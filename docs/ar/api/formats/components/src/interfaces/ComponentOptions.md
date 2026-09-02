[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# واجهة: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات مشتركة لكل باني.

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## الخصائص

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بادئة الصنف. قيمة نصية صحيحة (truthy) تمنح نطاقًا لكل صنف (`"instui"` → `.instui-button`); أي قيمة زائفة (falsy) (`null`، `undefined`، `""`، أو عند حذف الخيار) تُزيل البادئة تمامًا (`.button`)، مما يتيح لك تأليف `class="heading -h1"`. أوراق الأنماط المرفقة بهذه الحزمة مُبنية باستخدام `"instui"`.

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

السمة المستهدفة لـ CSS الصادر. القيمة الافتراضية هي "rebrand" عند حذفها.
