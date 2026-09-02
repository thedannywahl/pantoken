[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# Arayüz: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Render options that tune how Markdown maps onto Instructure UI.

## Özellikler

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Link behavior.

#### external?

> `optional` **external?**: `boolean`

Show an external-link affordance on off-site links (default: true).

#### permalinks?

> `optional` **permalinks?**: `boolean`

Add permalink anchors to headings (default: false).

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

Class name for permalink anchors (default: `pantoken-heading-anchor`).

***

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Fenced code block behavior.

#### language?

> `optional` **language?**: `boolean`

Preserve the language hint as a `data-language` attribute (default: true).

***

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inline `:icon:` token behavior.

#### enabled?

> `optional` **enabled?**: `boolean`

Enable `:icon:` rendering (default: true).

#### color?

> `optional` **color?**: `string`

CSS color applied to rendered icons.

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

Extra resolvers, tried before the built-in pantoken icon set.

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

Plugins whose `rehype` hooks contribute resolvers (e.g. simple-icons).

***

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inline color-code swatches (e.g. `#03893D`).

#### enabled?

> `optional` **enabled?**: `boolean`

Enable color swatches (default: true).

***

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

GitHub-style blockquote alerts.

#### enabled?

> `optional` **enabled?**: `boolean`

Enable `> [!NOTE]` → InstUI Alert mapping (default: true).

***

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Caption used for rendered tables (required by InstUI Table for a11y).
