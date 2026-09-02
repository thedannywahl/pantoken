[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# رابط: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A CSS contribution a plugin can return from its `css` hook.

## خصوصیات

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Raw CSS emitted before the generated base.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Raw CSS emitted after the generated base.

***

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Typed `@property` registrations to add.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Scoped `--var: value` declarations to add.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A `data-*` marker for the emitted block, for debugging.
