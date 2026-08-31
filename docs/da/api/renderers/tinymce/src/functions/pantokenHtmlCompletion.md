[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Function: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Opret en CodeMirror 6 autoudfyld-udvidelse for pantoken HTML.
Ydelser autoudfyldninger for komponentikonnavne og deres ændringer.

Brug:
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
