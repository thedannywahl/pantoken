[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# دالة: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

إنشاء امتداد إكمال تلقائي لـ CodeMirror 6 لـ pantoken HTML.
يوفر اقتراحات لإكمال أسماء المكونات والمعدِّلات الخاصة بها.

الاستخدام:
  new EditorView({
    extensions: [
      basicSetup,
      html(),
      pantokenHtmlCompletion({ model }),
    ],
  });

## المعلمات

### options

`AutocompleteOptions`

## القيم المرجعة

`Extension`
