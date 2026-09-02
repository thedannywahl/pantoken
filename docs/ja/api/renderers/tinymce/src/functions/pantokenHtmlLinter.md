[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# 関数: pantokenHtmlLinter()

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

## パラメーター

### \_options

`PantokenLinterOptions`

## 戻り値

`Extension`
