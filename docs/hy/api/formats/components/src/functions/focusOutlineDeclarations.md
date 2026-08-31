[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# Function: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Այն `--instui-focus-outline-*` անուն/արժեք զույգերը, որ ring կանոնները կարդում են։ Գույն/լայնություն/տեղաշարժ հղում են թեմատիկ ընդհանուր focus տոկենների; անցումային, գծի ոճ և մուծը հաստատուն են։

## Returns

\[`string`, `string`\][]

Մեկ `[customProperty, value]` զույգ յուրաքանչյուր focus-ring փոփոխականի համար։

## Example

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```
