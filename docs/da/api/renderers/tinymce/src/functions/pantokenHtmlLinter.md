[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Function: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Opret en CodeMirror 6 linter-udvidelse til pantoken HTML.
Validerer klasseattributter indeholdende `.instui-*` tokens.

Anvendelse:
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
