[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# Interface: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et CSS-bidrag, som en plugin kan returnere fra dets `css` hook.

## Egenskaber

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rå CSS udsendt før den genererede base.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rå CSS udsendt efter den genererede base.

***

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indtastede `@property` registreringer, der skal tilføjes.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Omfangsbestemte `--var: value` erklæringer, der skal tilføjes.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En `data-*` markør for det udsendtе blok, til debugging.
