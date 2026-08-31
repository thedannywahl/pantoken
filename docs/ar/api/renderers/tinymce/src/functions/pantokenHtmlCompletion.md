[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / pantokenHtmlCompletion

# Function: pantokenHtmlCompletion()

> **pantokenHtmlCompletion**(`options`): `Extension`

إنشاء امتداد الإكمال التلقائي CodeMirror 6 لـ pantoken HTML.
يوفر إكمالات لأسماء المكونات ومعدلاتها.

الاستخدام:
new EditorView({
extensions: [
basicSetup,
html(),
pantokenHtmlCompletion({ model }),
],
});

## Parameters

### options

`AutocompleteOptions`

## Returns

`Extension`
