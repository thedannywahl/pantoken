[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Interface: LayoutsPluginOptions

خيارات لـ [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## Properties

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

تخطيطات الصفحة المقدمة في منتقي "إدراج التخطيط". الافتراضي هو [pageLayouts](../variables/pageLayouts.md).

---

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

يُستدعى بعد إدراج التخطيط (على سبيل المثال لتحديث المعاينة المباشرة).

#### Parameters

##### layout

[`PageLayout`](PageLayout.md)

#### Returns

`void`
