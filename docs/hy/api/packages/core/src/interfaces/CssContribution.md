[pantoken](../../../../index.md) / [packages/core/src](../index.md) / CssContribution

# Ինտերֆեյս: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

CSS ներդրում, որը plugin կարող է վերադարձնել իր `css` hook-ից:

## Առանձնահատկություններ

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Raw CSS-ը արտանետվում է ստացված բազայից առաջ:

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Raw CSS-ը արտանետվում է ստացված բազայից հետո:

***

### properties?

> `optional` **properties?**: `PropertyRule`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Տիպավորված `@property` գրանցումներ՝ ավելացնելու համար:

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Շրջանակված `--var: value` հայտարարություններ՝ ավելացնելու համար:

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`data-*` նշիչ արտանետված բլոկի համար, վարկածների համար:
