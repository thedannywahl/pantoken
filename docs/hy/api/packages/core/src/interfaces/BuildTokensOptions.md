[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Ինտերֆեյս: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

[buildTokens](../functions/buildTokens.md)-ի համար ընտրանքներ:

## Առանձնահատկություններ

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Լուծման թեման (լռելյայն` `"rebrand"`):

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Plugins, որոնց `tokens` hooks-ները գործում են IR-ի վրա (լռելյայն` ոչ մեկ):

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ներառել պատկերակի շերտը (լռելյայն` true):

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ներառել Instructure-ի կողմից շարադրված (Custom) գլիֆներ (լռելյայն` true):

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ներառել Lucide գլիֆներ (լռելյայն` true):
