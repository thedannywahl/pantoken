[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# واجهة: LayoutsPluginOptions

خيارات لـ [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## الخصائص

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

تخطيطات الصفحة المعروضة في منتقي "Insert layout". القيم الافتراضية من [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

يتم استدعاؤه بعد إدراج التخطيط (على سبيل المثال لتحديث المعاينة الحية).

#### المعلمات

##### layout

[`PageLayout`](PageLayout.md)

#### القيم المرجعة

`void`
