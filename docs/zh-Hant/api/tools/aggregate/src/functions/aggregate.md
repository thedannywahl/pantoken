[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# 函式: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Generate the meta package's source barrel, subpath entries, and `exports` map.

## 參數

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## 回傳

[`Target`](../interfaces/Target.md)[]

The discovered targets.

## 範例

**Regenerate the meta package**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
