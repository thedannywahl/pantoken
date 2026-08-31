[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Function: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Ստեղծեք բաղադրիչների ընտրիչ վարձատրյալ գործարանը:
վերադարձնում է ֆունկցիա `tinymce.PluginManager.add()`-ի համար հարմար:

Օգտագործում:
tinymce.PluginManager.add(
"pantokenComponents",
createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
);

## Parameters

### options

`ComponentsPickerOptions`

## Returns

(`editor`) => `void`
