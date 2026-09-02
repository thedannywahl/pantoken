[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# 함수: pantokenHtmlCompletion()

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

## 매개변수

### options

`AutocompleteOptions`

## 반환값

`Extension`
