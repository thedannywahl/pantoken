[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# تابع: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Generate the meta package's source barrel, subpath entries, and `exports` map.

## پارامترها

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## مقدار بازگشتی

[`Target`](../interfaces/Target.md)[]

The discovered targets.

## نمونه

**Regenerate the meta package**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
