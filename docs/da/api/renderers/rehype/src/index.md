[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/rehype` — gengiver `:icon:` koder som inline SVG.

Pluginen går gennem hast-tekstknuder og erstatter `:code:` tokens med et inline SVG-element,
opløser hver kode gennem en kæde: plugin `rehype` opløsere først, derefter evenuel eksplicit
`resolve`, derefter det indbyggede `@pantoken/icons` sæt. Det porter `rehype-instui-markdown` til
delt ikonmanifest.

## Interfaces

- [RehypeOptions](interfaces/RehypeOptions.md)

## Funktioner

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## Referencer

### default

Omdøber og re-eksporterer [rehypePantokenIcons](functions/rehypePantokenIcons.md)
