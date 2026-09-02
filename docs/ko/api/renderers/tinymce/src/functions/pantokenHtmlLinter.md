[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# 함수: pantokenHtmlLinter()

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

## 매개변수

### \_options

`PantokenLinterOptions`

## 반환값

`Extension`
