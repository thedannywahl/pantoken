[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Interface: LayoutsPluginOptions

Ընտրանքներ [createLayoutsPlugin](../functions/createLayoutsPlugin.md)-ի համար:

## Properties

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

Էջի դասավորությունները, որոնք առաջարկվում են "Տեղադրել դասավորություն" ընտրիչում: Լռակյա [pageLayouts](../variables/pageLayouts.md):

---

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Կոչվում է դասավորության տեղադրումից հետո (օր.՝ կենդանի նախադիտումն թարմացնելու համար):

#### Parameters

##### layout

[`PageLayout`](PageLayout.md)

#### Returns

`void`
