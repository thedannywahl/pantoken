[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Ֆունկցիա: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Յուրաքանչյուր `--instui-*` հատուկ-հատկության անուն, որն ի հայտ է գալիս `text`-ի ցանկացած տեղում:

## Պարամետրեր

### text

`string`

## Վերադարձվող արժեք

`Set`\<`string`\>

## Օրինակ

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
