[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Function: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Crea una extensió de linter de CodeMirror 6 per a HTML de pantoken.
Valida els atributs de classe que contenen tokens `.instui-*`.

Ús:
new EditorView({
extensions: [
basicSetup,
html(),
pantokenHtmlLinter({ model }),
],
});

## Parameters

### \_options

`PantokenLinterOptions`

## Returns

`Extension`
