[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Function: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Ստեղծեք CodeMirror 6 linter ընդլայնում pantoken HTML-ի համար:
ստուգում դասային հատկությունները, որոնք պարունակում են `.instui-*` tokens:

Օգտագործում:
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
