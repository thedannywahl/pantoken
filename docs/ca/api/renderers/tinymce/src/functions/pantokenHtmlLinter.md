[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Funció: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Crea una extensió de linter de CodeMirror 6 per a HTML de pantoken.
Valida els atributs de classe que contenen tokens `.instui-*`.

Ús:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlLinter({ model }),
    ],
  });

## Paràmetres

### \_options

`PantokenLinterOptions`

## Retorna

`Extension`
