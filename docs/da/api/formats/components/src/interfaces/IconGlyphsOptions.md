[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# Interface: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indstillinger for [iconGlyphsCss](../functions/iconGlyphsCss.md).

## Udvider

- [`ComponentOptions`](ComponentOptions.md)

## Egenskaber

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Klassepræfikset. En sand streng navnegiver hver klasse (`"instui"` → `.instui-button`); enhver falsk værdi (`null`, `undefined`, `""` eller udeladelse af indstillingen) fjerner præfikset helt (`.button`), så du kan forfattere `class="heading -h1"`. Stilarkets sendt af denne pakke er bygget med `"instui"`.

#### Arvet fra

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Målniveatema for udsendt CSS. Antager som standard `"rebrand"` når det udelades.

#### Arvet fra

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

***

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Udsted også de forældede InstUI-prop glyf-aliaser (`-render-icon-&lt;name&gt;`, `-render-custom-icon-&lt;name&gt;`) som funktionelle aliaser af `-icon-&lt;name&gt;`. Som standard slået fra — at slå det til fordobler cirka arket, så aktivér det kun, når du har brug for markup skrevet mod de gamle `renderIcon`/`renderCustomIcon` prop-navne for at bevare rendering. Det sendte `icons.css` er bygget med dette slået til.
