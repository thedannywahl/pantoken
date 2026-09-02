[pantoken](../../../../index.md) / [packages/core/src](../index.md) / CssContribution

# 인터페이스: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A CSS contribution a plugin can return from its `css` hook.

## 속성

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Raw CSS emitted before the generated base.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Raw CSS emitted after the generated base.

***

### properties?

> `optional` **properties?**: `PropertyRule`[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Typed `@property` registrations to add.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Scoped `--var: value` declarations to add.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A `data-*` marker for the emitted block, for debugging.
