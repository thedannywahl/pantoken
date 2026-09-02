[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# 함수: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Create the components picker plugin factory.
Returns a function suitable for `tinymce.PluginManager.add()`.

Usage:
  tinymce.PluginManager.add(
    "pantokenComponents",
    createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
  );

## 매개변수

### options

`ComponentsPickerOptions`

## 반환값

(`editor`) => `void`
