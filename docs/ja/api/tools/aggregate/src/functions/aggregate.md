[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# 関数: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Generate the meta package's source barrel, subpath entries, and `exports` map.

## パラメーター

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## 戻り値

[`Target`](../interfaces/Target.md)[]

The discovered targets.

## 例

**Regenerate the meta package**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
