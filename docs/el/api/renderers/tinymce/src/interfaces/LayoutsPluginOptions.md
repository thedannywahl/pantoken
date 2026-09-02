[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Διεπαφή: LayoutsPluginOptions

Options for [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## Ιδιότητες

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

The page layouts offered in the "Insert layout" picker. Defaults to [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Called after a layout is inserted (e.g. to refresh a live preview).

#### Παράμετροι

##### layout

[`PageLayout`](PageLayout.md)

#### Επιστρέφει

`void`
