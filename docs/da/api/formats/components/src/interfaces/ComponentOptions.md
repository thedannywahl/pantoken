[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# Interface: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder fælles for hver builder.

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## Egenskaber

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Klassepræfikset. En sand streng navnegiver hver klasse (`"instui"` → `.instui-button`); enhver falsk værdi (`null`, `undefined`, `""` eller udeladelse af indstillingen) fjerner præfikset helt (`.button`), så du kan forfattere `class="heading -h1"`. Stilarkets sendt af denne pakke er bygget med `"instui"`.

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Målniveatema for udsendt CSS. Antager som standard `"rebrand"` når det udelades.
