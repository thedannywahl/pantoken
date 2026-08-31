[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / createComponentsPlugin

# Function: createComponentsPlugin()

> **createComponentsPlugin**(`options`): (`editor`) => `void`

Opret fabrikken for komponent-plukkerplugin.
Returnerer en funktion, der er egnet til `tinymce.PluginManager.add()`.

Brug:
tinymce.PluginManager.add(
"pantokenComponents",
createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
);

## Parameters

### options

`ComponentsPickerOptions`

## Returns

(`editor`) => `void`
