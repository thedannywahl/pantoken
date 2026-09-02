[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# ממשק: LayoutsPluginOptions

Options for [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## תכונות

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

The page layouts offered in the "Insert layout" picker. Defaults to [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Called after a layout is inserted (e.g. to refresh a live preview).

#### פרמטרים

##### layout

[`PageLayout`](PageLayout.md)

#### מחזיר

`void`
