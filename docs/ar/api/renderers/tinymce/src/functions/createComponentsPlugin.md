[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Function: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

إنشاء مصنع مكون برنامج المنتقي.
يرجع دالة مناسبة لـ `tinymce.PluginManager.add()`.

الاستخدام:
tinymce.PluginManager.add(
"pantokenComponents",
createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
);

## Parameters

### options

`ComponentsPickerOptions`

## Returns

(`editor`) => `void`
