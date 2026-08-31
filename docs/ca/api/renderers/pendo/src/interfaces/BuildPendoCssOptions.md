[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# Interface: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [buildPendoCss](../functions/buildPendoCss.md).

## Properties

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tema per obtenir la capa `--instui-*` de (per defecte `"rebrand"`).

---

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El selector d'arrel `@scope` (per defecte `._pendo-step-container`).

---

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Embolcalla les regles de component a `@scope` per a la contingència de DOM (per defecte `true`).

---

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Afegeix `!important` a les declaracions de component perquè superin els estils de Pendo (per defecte `true`).

---

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sacseja l'arbre per eliminar tokens `--instui-*` no utilitzats (per defecte `true`; apagat envia el conjunt de tokens complet).

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix les regles `@property` at a declaracions de propietats personalitzades pures via
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md) (per defecte `false`). `true` utilitza els paràmetres per defecte del connector amb
`injectSelector: ":scope"` perquè les declaracions caiguin dins del bloc `@scope`.
Passa un objecte [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) per a sobrescriure els paràmetres per defecte individuals.

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ofusca els noms `--instui-*` a identificadors mínims en base-26 via [mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)
(per defecte `false`). Segur aquí perquè el token complet + fulla d'estils de component és un
pachet autònom. Passa un objecte [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) per a sobrescriure els paràmetres per defecte.
