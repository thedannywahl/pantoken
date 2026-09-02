[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Funció: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Crea una extensió d'autocompleció de CodeMirror 6 per a HTML de pantoken.
Proporciona completions per a noms de components i els seus modificadors.

Ús:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlCompletion({ model }),
    ],
  });

## Paràmetres

### options

`AutocompleteOptions`

## Retorna

`Extension`
