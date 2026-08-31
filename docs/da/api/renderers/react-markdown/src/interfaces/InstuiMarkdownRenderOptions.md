[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# Interface: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Gengivelsesvalgmuligheder, der justerer hvordan Markdown kortlægges til Instructure UI.

## Properties

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Linkopførsel.

#### external?

> `optional` **external?**: `boolean`

Vis en ekstern-link-affordance på eksterne links (standard: true).

#### permalinks?

> `optional` **permalinks?**: `boolean`

Tilføj permanent-linkforankringer til overskrifter (standard: false).

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

Klassenavn for permanent-linkforankringer (standard: `pantoken-heading-anchor`).

---

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Omhegnet kodeblokopførsel.

#### language?

> `optional` **language?**: `boolean`

Bevar sproghintningen som et `data-language` attribut (standard: true).

---

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inline `:icon:` token-opførsel.

#### enabled?

> `optional` **enabled?**: `boolean`

Aktivér `:icon:` gengivelse (standard: true).

#### color?

> `optional` **color?**: `string`

CSS-farve anvendt på gengiven ikoner.

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

Ekstra opløsere, forsøgt før det indbyggede pantoken-ikonsæt.

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

Plugins hvis `rehype` hooks bidrager med opløsere (f.eks. simple-icons).

---

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inline farveprøver (f.eks. `#03893D`).

#### enabled?

> `optional` **enabled?**: `boolean`

Aktivér farveprøver (standard: true).

---

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

GitHub-stilede citattegnsadvarsler.

#### enabled?

> `optional` **enabled?**: `boolean`

Aktivér `> [!NOTE]` → InstUI Alert-kortlægning (standard: true).

---

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Billedtekst brugt til gengiven tabeller (påkrævet af InstUI Table for a11y).
