[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Interface: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [applyMinify](../functions/applyMinify.md).

## Properties

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aplica [pruneCustomProps](../variables/pruneCustomProps.md) per a tree-shake les fitxes `--instui-*` no utilitzades abans d'altres transformacions.

Només és segur per a paquets autònoms que contenen tant definicions de fitxes com les
regles de components que les referencien. La poda d'una full només de fitxes elimina tot.

#### Default Value

`false`

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aplica [flattenProperty](../variables/flattenProperty.md) per a convertir regles `@property` at a declaracions simples.

`true` utilitza els valors per defecte del connector (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
Passeu un objecte [FlattenPropertyOptions](FlattenPropertyOptions.md) per sobrescriure els valors per defecte individuals.

#### Default Value

`false`

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Apliqueu [mangleCustomProps](../variables/mangleCustomProps.md) per reemplaçar noms llargs `--instui-*` amb identificadors mínims.

`true` utilitza els valors per defecte del connector (`prefix: "--instui-"`, `method: "base26"`).
Passeu un objecte [MangleCustomPropsOptions](MangleCustomPropsOptions.md) per sobrescriure els valors per defecte individuals — inclòs
`sharedManifest` per a la coordinació entre fitxers.

Només és segur per a paquets autònoms. Consulteu la documentació a nivell de mòdul.

#### Default Value

`false`
