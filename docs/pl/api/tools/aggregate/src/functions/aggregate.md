[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# Funkcja: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Generate the meta package's source barrel, subpath entries, and `exports` map.

## Parametry

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## Zwraca

[`Target`](../interfaces/Target.md)[]

The discovered targets.

## Przykład

**Regenerate the meta package**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
