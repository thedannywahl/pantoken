[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# Ֆունկցիա: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կազմել մետա փաթեթի աղբյուր ցամբ, ենթա մուտքեր, և `exports` քարտ:

## Պարամետրեր

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## Վերադարձվող արժեք

[`Target`](../interfaces/Target.md)[]

Հայտնաբերված թիրախները:

## Օրինակ

**Վերակազմել մետա փաթեթը**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
