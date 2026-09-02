[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# 函式: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Read the `pantoken` targets from the meta package's dependencies.

## 參數

### metaDir

`string`

## 回傳

[`Target`](../interfaces/Target.md)[]

## 範例

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
