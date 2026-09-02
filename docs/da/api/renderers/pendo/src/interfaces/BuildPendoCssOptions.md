[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# Interface: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indstillinger for [buildPendoCss](../functions/buildPendoCss.md).

## Egenskaber

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tema at hente `--instui-*` laget fra (standard `"rebrand"`).

***

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The `@scope` root selector (default `[class*="instui"]._pendo-step-container`).

***

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Omslut komponentregler i `@scope` til DOM-indeslutning (standard `true`).

***

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tilføj `!important` til komponentdeklarationer, så de slår Pendos stilarter (standard `true`).

***

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tree-shake ubrugte `--instui-*` tokens (standard `true`; slukket leverer det fulde token-sæt).

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter `@property` at-regler til almindelige custom-property-deklarationer via
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md) (standard `false`). `true` bruger plugin-standarder med
`injectSelector: ":scope"` så deklarationerne lander inde i `@scope` blokken.
Giv et [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) objekt for at tilsidesætte individuelle standarder.

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Blanding af `--instui-*` navne til minimale base-26-identifikatorer via [mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)
(standard `false`). Sikker her, fordi det fulde token + komponentstylesheet er en
selvstyret bundle. Giv et [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) objekt for at tilsidesætte standarder.
