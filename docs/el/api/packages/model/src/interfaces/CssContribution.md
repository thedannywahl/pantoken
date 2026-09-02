[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# Διεπαφή: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

A CSS contribution a plugin can return from its `css` hook.

## Ιδιότητες

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Raw CSS emitted before the generated base.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Raw CSS emitted after the generated base.

***

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Typed `@property` registrations to add.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Scoped `--var: value` declarations to add.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

A `data-*` marker for the emitted block, for debugging.
