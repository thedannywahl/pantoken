[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Function: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Crea la fàbrica del connector del selector de components.
Retorna una funció adequada per a `tinymce.PluginManager.add()`.

Ús:
tinymce.PluginManager.add(
"pantokenComponents",
createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
);

## Parameters

### options

`ComponentsPickerOptions`

## Returns

(`editor`) => `void`
