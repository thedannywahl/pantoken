[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Funktion: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Opret en CodeMirror 6 autoudfyld-udvidelse for pantoken HTML.
Ydelser autoudfyldninger for komponentikonnavne og deres ændringer.

Brug:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlCompletion({ model }),
    ],
  });

## Parametre

### options

`AutocompleteOptions`

## Returnerer

`Extension`
