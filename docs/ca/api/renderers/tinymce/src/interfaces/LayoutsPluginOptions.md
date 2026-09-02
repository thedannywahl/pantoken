[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / LayoutsPluginOptions

# Interfície: LayoutsPluginOptions

Opcions per a [createLayoutsPlugin](../functions/createLayoutsPlugin.md).

## Propietats

### layouts?

> `optional` **layouts?**: readonly [`PageLayout`](PageLayout.md)[]

Els dissenys de pàgina oferts al selector "Inserir disseny". Per defecte a [pageLayouts](../variables/pageLayouts.md).

***

### onInsert?

> `optional` **onInsert?**: (`layout`) => `void`

Cridat després d'inserir un disseny (p. ex. per refrescar una vista previa en directe).

#### Paràmetres

##### layout

[`PageLayout`](PageLayout.md)

#### Retorna

`void`
