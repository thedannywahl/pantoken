[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# واجهة: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [toCss](../functions/toCss.md).

## الخصائص

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

يتم إصدار التصريحات المحصورة بالمحدد تحت (الافتراضي `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإضافات التي تُشغّل لها خطافات `css` بعد بناء CSS الأساسي (الافتراضي: لا شيء).
