[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# دالة: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

إنشاء مصنع إضافة مُحدِّد مكونات.
يُرجع دالة مناسبة لـ `tinymce.PluginManager.add()`.

الاستخدام:
  tinymce.PluginManager.add(
    "pantokenComponents",
    createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
  );

## المعلمات

### options

`ComponentsPickerOptions`

## القيم المرجعة

(`editor`) => `void`
