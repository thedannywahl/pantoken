[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Funktion: pantokenHtmlCompletion()

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

## Parameter

### options

`AutocompleteOptions`

## Rückgabe

`Extension`
