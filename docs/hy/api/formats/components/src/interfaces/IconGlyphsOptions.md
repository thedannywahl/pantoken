[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# Interface: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

[iconGlyphsCss](../functions/iconGlyphsCss.md)-ի հնարավորությունները:

## Extends

- [`ComponentOptions`](ComponentOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Դասի նախածանց: Ճիշտ տող թվային լինելու դեպքում տիրապետում է յուրաքանչյուր դասը (`"instui"` → `.instui-button`); ցանկացած
ասեղ արժեք (`null`, `undefined`, `""`, կամ ընտրությունը բաց թողնելը) ամբողջությամբ հեռացնում է նախածանցը
(`.button`), այդպես որ կարող եք հեղինակել `class="heading -h1"`: Այս փաթեթի կողմից արտանետված ոճաթերթերը
կառուցված են `"instui"` հետ:

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Արտանետված CSS-ի թիրախային թեման: Լռելյալ `"rebrand"`, երբ բաց թողնվում է:

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

---

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Նաև արտանետել հնացած InstUI-prop տառապատկեր անունները (`-render-icon-&lt;name&gt;`, `-render-custom-icon-&lt;name&gt;`)
որպես `-icon-&lt;name&gt;`-ի ֆունկցիոնալ անունները: Լռելյալ անջատված — միացնելուց հետո կրկնապատկում է ոճաթերթը, հետևաբար
միացրեք այն միայն այն դեպքում, եթե պետք է վերջին `renderIcon`/`renderCustomIcon` հատկանիշի վերաբերյալ մարկապ պահել: Արտանետված `icons.css`-ը կառուցված է այս միացված վիճակով:
