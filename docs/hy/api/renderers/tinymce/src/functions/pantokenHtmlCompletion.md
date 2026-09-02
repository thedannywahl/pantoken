[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Ֆունկցիա: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

Ստեղծեք CodeMirror 6 ավտոմատ լրացման ընդլայնումը pantoken HTML-ի համար:
Տրամադրում է բաղադրիչ անունների և դրանց փոփոխիչների լրացումներ:

Օգտագործում:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlCompletion({ model }),
    ],
  });

## Պարամետրեր

### options

`AutocompleteOptions`

## Վերադարձվող արժեք

`Extension`
