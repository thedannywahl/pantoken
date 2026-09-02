[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# 함수: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Generate the meta package's source barrel, subpath entries, and `exports` map.

## 매개변수

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## 반환값

[`Target`](../interfaces/Target.md)[]

The discovered targets.

## 예제

**Regenerate the meta package**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
