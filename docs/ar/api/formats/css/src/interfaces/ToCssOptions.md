[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Interface: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [toCss](../functions/toCss.md).

## Properties

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المحدد الذي يتم إصدار الإعلانات المحدودة النطاق تحته (الافتراضي `":root"`).

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المكونات الإضافية التي تعمل خطافات `css` بعد بناء CSS الأساسي (الافتراضي: بدون).
