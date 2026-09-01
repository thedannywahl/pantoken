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

بادئة الفئة. سلسلة صحيحة القيمة تُنشئ مساحة أسماء لكل فئة (`"instui"` → `.instui-button`); أي قيمة زائفة
(`null`, `undefined`, `""`، أو حذف الخيار) تُزيل البادئة تمامًا
(`.button`)، لذلك يمكنك تأليف `class="heading -h1"`. أوراق الأنماط المرفقة بهذه الحزمة مُنشأة باستخدام `"instui"`.

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سمة الهدف لـ CSS الناتج. الافتراضي هو `"rebrand"` عند حذفها.
