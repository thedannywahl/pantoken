[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# Interface: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ընտրանքներ ընդհանուր յուրաքանչյուր կառուցողի համար:

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Դասի նախածանց: Ճիշտ տող թվային լինելու դեպքում տիրապետում է յուրաքանչյուր դասը (`"instui"` → `.instui-button`); ցանկացած
ասեղ արժեք (`null`, `undefined`, `""`, կամ ընտրությունը բաց թողնելը) ամբողջությամբ հեռացնում է նախածանցը
(`.button`), այդպես որ կարող եք հեղինակել `class="heading -h1"`: Այս փաթեթի կողմից արտանետված ոճաթերթերը
կառուցված են `"instui"` հետ:

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Արտանետված CSS-ի թիրախային թեման: Լռելյալ `"rebrand"`, երբ բաց թողնվում է:
