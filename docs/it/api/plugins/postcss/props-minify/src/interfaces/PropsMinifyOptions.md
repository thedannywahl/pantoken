[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Interfaccia: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options for [applyMinify](../functions/applyMinify.md).

## Proprietà

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Apply [pruneCustomProps](../variables/pruneCustomProps.md) to tree-shake unused `--instui-*` tokens before other transforms.

Only safe for self-contained bundles that contain both token definitions and the component
rules that reference them. Pruning a token-only sheet removes everything.

#### Valore predefinito

`false`

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Apply [flattenProperty](../variables/flattenProperty.md) to convert `@property` at-rules to plain declarations.

`true` uses plugin defaults (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
Pass a [FlattenPropertyOptions](FlattenPropertyOptions.md) object to override individual defaults.

#### Valore predefinito

`false`

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Apply [mangleCustomProps](../variables/mangleCustomProps.md) to replace long `--instui-*` names with minimal identifiers.

`true` uses plugin defaults (`prefix: "--instui-"`, `method: "base26"`).
Pass a [MangleCustomPropsOptions](MangleCustomPropsOptions.md) object to override individual defaults — including
`sharedManifest` for cross-file coordination.

Only safe for self-contained bundles. See module-level docs.

#### Valore predefinito

`false`
