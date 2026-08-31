[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Interface: LayoutsPluginOptions

Opcions per a [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## Properties

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

Els dissenys de pàgina oferts al selector "Inserir disseny". Per defecte a [pageLayouts](../variables/pageLayouts.md).

---

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Cridat després d'inserir un disseny (p. ex. per refrescar una vista previa en directe).

#### Parameters

##### layout

[`PageLayout`](PageLayout.md)

#### Returns

`void`
