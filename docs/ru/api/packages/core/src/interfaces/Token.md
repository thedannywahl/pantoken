[pantoken](../../../../index.md) / [packages/core/src](../index.md) / Token

# Интерфейс: Token

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A single design token in the canonical `@property`-aligned IR.

## Свойства

### name

> **name**: `string`

The custom-property name, e.g. `--instui-color-background-base`.

***

### syntax

> **syntax**: `string`

The `@property` `syntax` descriptor (`"&lt;color&gt;"`, `"&lt;length&gt;"`,
  `"&lt;image&gt;"`, …) or `"*"` for contextual values.

***

### inherits

> **inherits**: `boolean`

The `@property` `inherits` flag.

***

### value

> **value**: `string`

A concrete value, a `var(...)` reference, or a `light-dark(a, b)` pair.

***

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

True when the light and dark resolutions differ (value is a `light-dark()`).

***

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The token this one references, when `value` is a single `var(...)`.

***

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Non-value metadata.
