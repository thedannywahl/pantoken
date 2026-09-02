[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# פונקציה: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Create a CodeMirror 6 linter extension for pantoken HTML.
Validates class attributes containing `.instui-*` tokens.

Usage:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlLinter({ model }),
    ],
  });

## פרמטרים

### \_options

`PantokenLinterOptions`

## מחזיר

`Extension`
