[pantoken](../../../../index.md) / [packages/core/src](../index.md) / CssContribution

# इंटरफेस: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A CSS contribution a plugin can return from its `css` hook.

## प्रॉपर्टीज

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Raw CSS emitted before the generated base.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Raw CSS emitted after the generated base.

***

### properties?

> `optional` **properties?**: `PropertyRule`[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Typed `@property` registrations to add.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Scoped `--var: value` declarations to add.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A `data-*` marker for the emitted block, for debugging.
