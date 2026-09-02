[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# Interfície: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions de renderització que ajusten com Markdown s'assigna a Instructure UI.

## Propietats

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Comportament de l'enllaç.

#### external?

> `optional` **external?**: `boolean`

Mostrar una suggerència de vincle extern en els enllaços fora del lloc (per defecte: true).

#### permalinks?

> `optional` **permalinks?**: `boolean`

Afegir ancles d'enllaç permanent als encapçalaments (per defecte: false).

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

Nom de classe per als ancles d'enllaç permanent (per defecte: `pantoken-heading-anchor`).

***

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Comportament del bloc de codi tancat.

#### language?

> `optional` **language?**: `boolean`

Preservar la pista d'idioma com a atribut `data-language` (per defecte: true).

***

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Comportament del token `:icon:` en línia.

#### enabled?

> `optional` **enabled?**: `boolean`

Habilitar la renderització `:icon:` (per defecte: true).

#### color?

> `optional` **color?**: `string`

Color CSS aplicat a les icones renderitzades.

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

Resolvedors addicionals, provats abans del conjunt d'icones de pantoken integrat.

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

Plugins als quals els seus ganxos `rehype` contribueixen resolvedors (per exemple, simple-icons).

***

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Mostres de codi de color en línia (per exemple, `#03893D`).

#### enabled?

> `optional` **enabled?**: `boolean`

Habilitar mostres de color (per defecte: true).

***

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Alertes de blockquote de l'estil GitHub.

#### enabled?

> `optional` **enabled?**: `boolean`

Habilitar l'assignació `> [!NOTE]` → InstUI Alert (per defecte: true).

***

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Llegendes utilitzades per a taules renderitzades (requerit per a InstUI Table per a a11y).
