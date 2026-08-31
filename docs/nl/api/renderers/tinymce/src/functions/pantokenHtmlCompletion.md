[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Function: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Create a CodeMirror 6 autocomplete extension for pantoken HTML.
Provides completions for component names and their modifiers.

Usage:
new EditorView({
extensions: [
basicSetup,
html(),
pantokenHtmlCompletion({ model }),
],
});

## Parameters

### options

`AutocompleteOptions`

## Returns

`Extension`
