[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# इंटरफेस: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Options for [applyMinify](../functions/applyMinify.md).

## प्रॉपर्टीज

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Apply [pruneCustomProps](../variables/pruneCustomProps.md) to tree-shake unused `--instui-*` tokens before other transforms.

Only safe for self-contained bundles that contain both token definitions and the component
rules that reference them. Pruning a token-only sheet removes everything.

#### डिफ़ॉल्ट मान

`false`

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Apply [flattenProperty](../variables/flattenProperty.md) to convert `@property` at-rules to plain declarations.

`true` uses plugin defaults (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
Pass a [FlattenPropertyOptions](FlattenPropertyOptions.md) object to override individual defaults.

#### डिफ़ॉल्ट मान

`false`

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Apply [mangleCustomProps](../variables/mangleCustomProps.md) to replace long `--instui-*` names with minimal identifiers.

`true` uses plugin defaults (`prefix: "--instui-"`, `method: "base26"`).
Pass a [MangleCustomPropsOptions](MangleCustomPropsOptions.md) object to override individual defaults — including
`sharedManifest` for cross-file coordination.

Only safe for self-contained bundles. See module-level docs.

#### डिफ़ॉल्ट मान

`false`
