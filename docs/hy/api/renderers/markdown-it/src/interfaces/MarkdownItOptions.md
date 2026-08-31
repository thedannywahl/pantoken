[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# Interface: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ընտրանքներ [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md)-ի համար:

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Բացահայտ պատկերի լուծիչ, փորձված plugin լուծիչներից հետո և առաջ ներառված հավաքածուից:

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Plugin-ներ, որոնց `rehype` կեռներ ներածում պատկերի լուծիչներ (փորձվածներ նախ):

---

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Դասը, որը կիրառվում է պատկերի փաղկիչի վրա (լռելյայն: `pantoken-icon`):

---

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Դասը, որը կիրառվում է գույն-նմուշի փաղկիչի վրա (լռելյայն: `pantoken-color-swatch`):

---

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կատարել `:icon:` կոդերը որպես ընդլայն SVG (լռելյայն: `true`):

---

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կատարել ինքնուրույն գույնի արժեքներ որպես նմուշներ (լռելյայն: `true`):
