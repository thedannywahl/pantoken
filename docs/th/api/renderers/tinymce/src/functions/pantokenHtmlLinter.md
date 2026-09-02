[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# ฟังก์ชัน: pantokenHtmlLinter()

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

## พารามิเตอร์

### \_options

`PantokenLinterOptions`

## คืนค่า

`Extension`
