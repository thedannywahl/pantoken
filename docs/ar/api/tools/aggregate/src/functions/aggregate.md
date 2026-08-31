[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# Function: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء برميل المصدر لحزمة meta، والإدخالات الفرعية، وخريطة `exports`.

## Parameters

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## Returns

[`Target`](../interfaces/Target.md)[]

الأهداف المكتشفة.

## Example

**إعادة إنشاء حزمة meta**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
