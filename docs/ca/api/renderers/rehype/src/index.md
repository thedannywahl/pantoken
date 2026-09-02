[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/rehype` — renderitzar codis `:icon:` com a SVG en línia.

El plugin camina pels nodes de text hast i reemplaça tokens `:code:` amb un element SVG en línia,
resol cada codi a través d'una cadena: resolvedors del plugin `rehype` primer, després qualsevol
`resolve` explícit, després el conjunt `@pantoken/icons` integrat. Trasllada `rehype-instui-markdown` al
manifest d'icones compartit.

## Interfícies

- [RehypeOptions](interfaces/RehypeOptions.md)

## Funcions

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## Referències

### default

Reanomena i reexporta [rehypePantokenIcons](functions/rehypePantokenIcons.md)
