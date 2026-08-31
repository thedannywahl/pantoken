[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Function: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Crea una extensió d'autocompleció de CodeMirror 6 per a HTML de pantoken.
Proporciona completions per a noms de components i els seus modificadors.

Ús:
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
