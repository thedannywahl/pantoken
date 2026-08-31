[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Interface: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

[buildTokens](../functions/buildTokens.md)-ի համար ընտրանքներ:

## Properties

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Լուծման թեման (լռելյայն` `"rebrand"`):

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins, որոնց `tokens` hooks-ները գործում են IR-ի վրա (լռելյայն` ոչ մեկ):

---

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ներառել պատկերակի շերտը (լռելյայն` true):

---

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ներառել Instructure-ի կողմից շարադրված (Custom) գլիֆներ (լռելյայն` true):

---

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ներառել Lucide գլիֆներ (լռելյայն` true):
