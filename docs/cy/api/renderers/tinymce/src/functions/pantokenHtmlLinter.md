[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Swyddogaeth: pantokenHtmlLinter()

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

## Paramedrau

### \_options

`PantokenLinterOptions`

## Yn dychwelyd

`Extension`
