[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# واجهة: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [iconGlyphsCss](../functions/iconGlyphsCss.md).

## يمتد

- [`ComponentOptions`](ComponentOptions.md)

## الخصائص

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بادئة الصنف. قيمة نصية صحيحة (truthy) تمنح نطاقًا لكل صنف (`"instui"` → `.instui-button`); أي قيمة زائفة (falsy) (`null`، `undefined`، `""`، أو عند حذف الخيار) تُزيل البادئة تمامًا (`.button`)، مما يتيح لك تأليف `class="heading -h1"`. أوراق الأنماط المرفقة بهذه الحزمة مُبنية باستخدام `"instui"`.

#### موروث من

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

السمة المستهدفة لـ CSS الصادر. القيمة الافتراضية هي "rebrand" عند حذفها.

#### موروث من

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

***

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قم أيضًا بإصدار أسماء الرموز المهملة من InstUI-prop (`-render-icon-&lt;name&gt;`, `-render-custom-icon-&lt;name&gt;`) كأسماء مستعارة وظيفية لـ `-icon-&lt;name&gt;`. معطلة افتراضياً — تفعيلها يضاعف الورقة تقريبًا، لذا فعّلها فقط عند الحاجة إلى أن تستمر الوسوم المكتوبة بأسماء الخاصيتين القديمتين `renderIcon`/`renderCustomIcon` في العرض. تم بناء ملف `icons.css` الموزَّع مع هذا التفعيل.
