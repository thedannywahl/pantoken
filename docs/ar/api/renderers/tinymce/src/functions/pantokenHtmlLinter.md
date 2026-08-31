[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Function: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

إنشاء امتداد linter CodeMirror 6 لـ pantoken HTML.
تتحقق من سمات الفئة التي تحتوي على `.instui-*` tokens.

الاستخدام:
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
