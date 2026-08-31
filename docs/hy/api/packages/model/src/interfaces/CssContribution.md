[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# Interface: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS ներդրում, որը plugin կարող է վերադարձնել իր `css` hook-ից:

## Properties

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Raw CSS-ը արտանետվում է ստացված բազայից առաջ:

---

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Raw CSS-ը արտանետվում է ստացված բազայից հետո:

---

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Տիպավորված `@property` գրանցումներ՝ ավելացնելու համար:

---

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Շրջանակված `--var: value` հայտարարություններ՝ ավելացնելու համար:

---

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`data-*` նշիչ արտանետված բլոկի համար, վարկածների համար:
