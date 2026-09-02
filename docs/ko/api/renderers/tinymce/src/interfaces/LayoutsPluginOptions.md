[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# 인터페이스: LayoutsPluginOptions

Options for [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## 속성

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

The page layouts offered in the "Insert layout" picker. Defaults to [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Called after a layout is inserted (e.g. to refresh a live preview).

#### 매개변수

##### layout

[`PageLayout`](PageLayout.md)

#### 반환값

`void`
