[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# دالة: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

امتداد linter لـ CodeMirror 6 من أجل pantoken HTML.
يتحقق من سمات class التي تحتوي على توكنات `.instui-*`.

الاستخدام:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlLinter({ model }),
    ],
  });

## المعلمات

### \_options

`PantokenLinterOptions`

## القيم المرجعة

`Extension`
