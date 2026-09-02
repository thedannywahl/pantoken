[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Funció: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Crea la fàbrica del connector del selector de components.
Retorna una funció adequada per a `tinymce.PluginManager.add()`.

Ús:
  tinymce.PluginManager.add(
    "pantokenComponents",
    createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
  );

## Paràmetres

### options

`ComponentsPickerOptions`

## Retorna

(`editor`) => `void`
