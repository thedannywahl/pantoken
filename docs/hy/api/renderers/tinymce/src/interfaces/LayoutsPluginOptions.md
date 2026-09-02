[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Ինտերֆեյս: LayoutsPluginOptions

Ընտրանքներ [createLayoutsPlugin](../functions/createLayoutsPlugin.md)-ի համար:

## Առանձնահատկություններ

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

Էջի դասավորությունները, որոնք առաջարկվում են "Տեղադրել դասավորություն" ընտրիչում: Լռակյա [pageLayouts](../variables/pageLayouts.md):

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Կոչվում է դասավորության տեղադրումից հետո (օր.՝ կենդանի նախադիտումն թարմացնելու համար):

#### Պարամետրեր

##### layout

[`PageLayout`](PageLayout.md)

#### Վերադարձվող արժեք

`void`
