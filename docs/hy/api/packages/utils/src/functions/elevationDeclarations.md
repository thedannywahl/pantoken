[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / elevationDeclarations

# Ֆունկցիա: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Այն `--instui-elevation-*` անուն/արժեք զույգերը (յուրաքանչյուր բազմաշերտ `box-shadow`)։ Արժեքները հղում են թեմատիկ drop-shadow գույնի տոկենների, ուստի նրանք հարմարվում են թեմայի համաձայն, ուստի տոկեն թերթ բեռնված։

## Վերադարձվող արժեք

\[`string`, `string`\][]

Մեկ `[customProperty, value]` զույգ յուրաքանչյուր մակարդակի և կեղծանունի համար։

## Օրինակ

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
