[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Ֆունկցիա: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կարդալ `pantoken` թիրախներ մետա փաթեթի կախվածություններից:

## Պարամետրեր

### metaDir

`string`

## Վերադարձվող արժեք

[`Target`](../interfaces/Target.md)[]

## Օրինակ

**Ստուգել ինչ կհավաքվի, առանց ինչ մի բան գրել**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
