[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Interface: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

[applyMinify](../functions/applyMinify.md)-ի ընտրանքները:

## Properties

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կիրառել [pruneCustomProps](../variables/pruneCustomProps.md)-ը ծառի թրթռում անօգտակար `--instui-*` մեկնիշներ այլ փոխակերպումներից առաջ:

Ապահով միայն ինքն-կնքված փաթեթների համար, որ պարունակում են մեկնիշի սահմանումները և բաղադրիչի
կանոնները, որոնք դրանց տեղեկաբերում են: Token-միայն թերթի մաքրումը հեռացնում է ամեն ինչ:

#### Default Value

`false`

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կիրառել [flattenProperty](../variables/flattenProperty.md)-ը `@property` at-կանոններ վերածել պարզ հայտարարությունների:

`true`-ը օգտագործում է plugin-ի լռակյաց կարգավորումները (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`):
Նախկինական կարգավորումներ փոխելու համար տրամադրեք [FlattenPropertyOptions](FlattenPropertyOptions.md) օբյեկտ:

#### Default Value

`false`

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կիրառել [mangleCustomProps](../variables/mangleCustomProps.md) երկար `--instui-*` անունները կրճատ նույնականացուցիչներով փոխարինելու համար:

`true`-ը օգտագործում է plugin-ի լռակյաց կարգավորումները (`prefix: "--instui-"`, `method: "base26"`):
Նախկինական կարգավորումներ փոխելու համար տրամադրեք [MangleCustomPropsOptions](MangleCustomPropsOptions.md) օբյեկտ — ներառյալ
`sharedManifest` ֆայլերի միջև համակարգման համար:

Վավեր միայն ինքնատեղակալ փաթեթների համար: Տե՛ս մոդուլի մակարդակի փաստաթղթերը:

#### Default Value

`false`
