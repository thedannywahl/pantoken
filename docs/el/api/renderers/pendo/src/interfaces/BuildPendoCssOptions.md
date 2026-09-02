[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# Διεπαφή: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Options for [buildPendoCss](../functions/buildPendoCss.md).

## Ιδιότητες

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Theme to source the `--instui-*` layer from (default `"rebrand"`).

***

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The `@scope` root selector (default `[class*="instui"]._pendo-step-container`).

***

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Wrap component rules in `@scope` for DOM containment (default `true`).

***

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Add `!important` to component declarations so they beat Pendo's styles (default `true`).

***

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Tree-shake unused `--instui-*` tokens (default `true`; off ships the full token set).

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Convert `@property` at-rules to plain custom-property declarations via
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md) (default `false`). `true` uses plugin defaults with
`injectSelector: ":scope"` so the declarations land inside the `@scope` block.
Pass a [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) object to override individual defaults.

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Mangle `--instui-*` names to minimal base-26 identifiers via [mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)
(default `false`). Safe here because the full token + component stylesheet is a
self-contained bundle. Pass a [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) object to override defaults.
