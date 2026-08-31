[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# Interface: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

[buildPendoCss](../functions/buildPendoCss.md) ընտրանքները:

## Properties

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Թեմա, որից `--instui-*` շերտ ստանալ (լռակյացի `"rebrand"`):

---

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@scope` արմատային ընտրիչ (լռակյացի `._pendo-step-container`):

---

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Բաղադրիչի կանոնները փաթեթապատել `@scope`-ի մեջ DOM կոնտեյներմանի համար (լռակյացի `true`):

---

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ավելացնել `!important` բաղադրիչի հայտարարություններին, որպեսզի Pendo-ի ոճերից լավ լինեն (լռակյացի `true`):

---

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ծառի թրթռիկ չօգտագործված `--instui-*` թոկենները (լռակյացի `true`; անջատ ստեղծում է ամբողջ թոկեն հավաքածուն):

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Փոխակերպել `@property` at-կանոնները պարզ custom-property հայտարարություններին
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md)-ի միջոցով (լռակյացի `false`): `true` օգտագործում է պլագինի լռակյացիները
`injectSelector: ":scope"`-ի հետ, որպեսզի հայտարարությունները մտնեն `@scope` բլոկի մեջ:
Հատկացրեք [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) օբյեկտ անհատական լռակյացիները վերակառուցելու համար:

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Մանգել `--instui-*` անունները նվազագույն base-26 նույնականացուցիչներին
[mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)-ի միջոցով (լռակյացի `false`): Ապահով այստեղ, քանի որ ամբողջ թոկեն + բաղադրիչ ոճի թերթիկը
ինքնամբ-պարունակ փաթեթ է: Հատկացրեք [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) օբյեկտ լռակյացիները վերակառուցելու համար:
