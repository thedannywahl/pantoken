[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# 函数: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Create a CodeMirror 6 autocomplete extension for pantoken HTML.
Provides completions for component names and their modifiers.

Usage:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlCompletion({ model }),
    ],
  });

## 参数

### options

`AutocompleteOptions`

## 返回值

`Extension`
