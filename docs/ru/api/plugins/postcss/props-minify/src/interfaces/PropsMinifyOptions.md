[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Интерфейс: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options for [applyMinify](../functions/applyMinify.md).

## Свойства

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Apply [pruneCustomProps](../variables/pruneCustomProps.md) to tree-shake unused `--instui-*` tokens before other transforms.

Only safe for self-contained bundles that contain both token definitions and the component
rules that reference them. Pruning a token-only sheet removes everything.

#### Значение по умолчанию

`false`

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Apply [flattenProperty](../variables/flattenProperty.md) to convert `@property` at-rules to plain declarations.

`true` uses plugin defaults (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
Pass a [FlattenPropertyOptions](FlattenPropertyOptions.md) object to override individual defaults.

#### Значение по умолчанию

`false`

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Apply [mangleCustomProps](../variables/mangleCustomProps.md) to replace long `--instui-*` names with minimal identifiers.

`true` uses plugin defaults (`prefix: "--instui-"`, `method: "base26"`).
Pass a [MangleCustomPropsOptions](MangleCustomPropsOptions.md) object to override individual defaults — including
`sharedManifest` for cross-file coordination.

Only safe for self-contained bundles. See module-level docs.

#### Значение по умолчанию

`false`
