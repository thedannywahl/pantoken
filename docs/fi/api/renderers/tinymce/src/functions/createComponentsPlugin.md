[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Funktio: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Create the components picker plugin factory.
Returns a function suitable for `tinymce.PluginManager.add()`.

Usage:
  tinymce.PluginManager.add(
    "pantokenComponents",
    createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
  );

## Parametrit

### options

`ComponentsPickerOptions`

## Palauttaa

(`editor`) => `void`
