[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Interface: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder for [applyMinify](../functions/applyMinify.md).

## Egenskaber

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Anvend [pruneCustomProps](../variables/pruneCustomProps.md) til tree-shake ubrugte `--instui-*` tokens før andre transformationer.

Kun sikker for selvindeholdt bundles, der indeholder både token-definitioner og komponentregler, der refererer til dem. Beskæring af et token-kun ark fjerner alt.

#### Standardværdi

`false`

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Anvend [flattenProperty](../variables/flattenProperty.md) til at konvertere `@property` at-regler til plain deklarationer.

`true` bruger plugin-standardindstillinger (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
Med [FlattenPropertyOptions](FlattenPropertyOptions.md)-objektet kan du tilsidesætte individuelle standardindstillinger.

#### Standardværdi

`false`

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Anvend [mangleCustomProps](../variables/mangleCustomProps.md) til at erstatte lange `--instui-*`-navne med minimale identifikatorer.

`true` bruger plugin-standardindstillinger (`prefix: "--instui-"`, `method: "base26"`).
Med [MangleCustomPropsOptions](MangleCustomPropsOptions.md)-objektet kan du tilsidesætte individuelle standardindstillinger — herunder
`sharedManifest` til koordinering på tværs af filer.

Kun sikker for selvstændige bundler. Se modulniveaudokumentation.

#### Standardværdi

`false`
