[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineDeclarations

# Ֆունկցիա: focusOutlineDeclarations()

> **focusOutlineDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Այն `--instui-focus-outline-*` անուն/արժեք զույգերը, որ ring կանոնները կարդում են։ Գույն/լայնություն/տեղաշարժ հղում են թեմատիկ ընդհանուր focus տոկենների; անցումային, գծի ոճ և մուծը հաստատուն են։

## Վերադարձվող արժեք

\[`string`, `string`\][]

Մեկ `[customProperty, value]` զույգ յուրաքանչյուր focus-ring փոփոխականի համար։

## Օրինակ

```ts
import { focusOutlineDeclarations } from "@pantoken/utils";

focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
```
