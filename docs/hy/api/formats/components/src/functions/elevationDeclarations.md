[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# Function: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Այն `--instui-elevation-*` անուն/արժեք զույգերը (յուրաքանչյուր բազմաշերտ `box-shadow`)։ Արժեքները հղում են թեմատիկ drop-shadow գույնի տոկենների, ուստի նրանք հարմարվում են թեմայի համաձայն, ուստի տոկեն թերթ բեռնված։

## Returns

\[`string`, `string`\][]

Մեկ `[customProperty, value]` զույգ յուրաքանչյուր մակարդակի և կեղծանունի համար։

## Example

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
