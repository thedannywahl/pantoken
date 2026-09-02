[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# Ինտերֆեյս: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Render ընտրանքներ, որոնք կարգավորում են, թե ինչպես Markdown-ը քարտեզագրվում է Instructure UI-ի վրա։

## Առանձնահատկություններ

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Հղում վարքագիծ։

#### external?

> `optional` **external?**: `boolean`

Ցույց տալ արտաքին հղում հնարավորություն այլ կայքերի հղումների վրա (լռելյալ՝ true)։

#### permalinks?

> `optional` **permalinks?**: `boolean`

Ավելացրեք հաստիոտ հղում խարիսխներ վերնագրերին (լռելյալ՝ false)։

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

Դասի անունը հաստիոտ հղում խարիսխների համար (լռելյալ՝ `pantoken-heading-anchor`)։

***

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատնեշված կոդի բլոկ վարքագիծ։

#### language?

> `optional` **language?**: `boolean`

Պահել լեզվի հուշումը որպես `data-language` հատկանիշ (լռելյալ՝ true)։

***

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ներգծային `:icon:` մեջբերում վարքագիծ։

#### enabled?

> `optional` **enabled?**: `boolean`

Միացնել `:icon:` rendering (լռելյալ՝ true)։

#### color?

> `optional` **color?**: `string`

CSS գույն կիրառվածի վրա rendered պատկերակներ։

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

Լրացուցիչ resolver-ներ, փորձվածներ նախ ներկառուցված pantoken պատկերակ հավաքածուից։

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

Plugin-ներ, որոնց `rehype` hooks-ներ ներդրում են resolver-ներ (օ.գ. simple-icons)։

***

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ներգծային գույն-կոդ նմուշներ (օ.գ. `#03893D`)։

#### enabled?

> `optional` **enabled?**: `boolean`

Միացնել գույնի նմուշներ (լռելյալ՝ true)։

***

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

GitHub-style blockquote ահազանգներ։

#### enabled?

> `optional` **enabled?**: `boolean`

Միացնել `> [!NOTE]` → InstUI Alert քարտեզագրում (լռելյալ՝ true)։

***

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Վերտառանց օգտագործվածի rendered աղյուսակների համար (պահանջվածի InstUI Table-ից a11y-ի համար)։
