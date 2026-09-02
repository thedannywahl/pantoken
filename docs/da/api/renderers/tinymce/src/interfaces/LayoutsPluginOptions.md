[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Interface: LayoutsPluginOptions

Muligheder for [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## Egenskaber

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

Sidelayoutsene tilbudt i "Indsæt layout" vælgeren. Standard til [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Kaldt efter et layout er indsat (f.eks. for at opdatere en live-forhåndsvisning).

#### Parametre

##### layout

[`PageLayout`](PageLayout.md)

#### Returnerer

`void`
