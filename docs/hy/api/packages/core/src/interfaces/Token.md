[pantoken](../../../../index.md) / [packages/core/src](../index.md) / Token

# Ինտերֆեյս: Token

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Մեկ դիզայն token-ը կանոնական `@property`-հավասարեցված IR-ում:

## Առանձնահատկություններ

### name

> **name**: `string`

Custom-property անունը, օր. `--instui-color-background-base`:

***

### syntax

> **syntax**: `string`

`@property` `syntax` դեսկրիպտոր (`"&lt;color&gt;"`, `"&lt;length&gt;"`,
  `"&lt;image&gt;"`, …) կամ `"*"` համաձայն արժեքների համար:

***

### inherits

> **inherits**: `boolean`

`@property` `inherits` դրոշակը:

***

### value

> **value**: `string`

Կոնկրետ արժեք, `var(...)` հղում կամ `light-dark(a, b)` զույգ:

***

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

True, երբ լույսի և մութ լուծումներն տարբեր են (արժեքը `light-dark()`):

***

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Token-ը, որ սա հղում է, երբ `value` մեկ `var(...)` է:

***

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Non-value metadata:
