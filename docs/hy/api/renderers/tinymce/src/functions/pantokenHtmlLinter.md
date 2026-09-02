[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlLinter

# Ֆունկցիա: pantokenHtmlLinter()

> **pantokenHtmlLinter**(`_options`): `Extension`

Ստեղծեք CodeMirror 6 linter ընդլայնում pantoken HTML-ի համար:
ստուգում դասային հատկությունները, որոնք պարունակում են `.instui-*` tokens:

Օգտագործում:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlLinter({ model }),
    ],
  });

## Պարամետրեր

### \_options

`PantokenLinterOptions`

## Վերադարձվող արժեք

`Extension`
