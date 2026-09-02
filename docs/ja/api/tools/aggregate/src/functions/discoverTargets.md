[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# 関数: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Read the `pantoken` targets from the meta package's dependencies.

## パラメーター

### metaDir

`string`

## 戻り値

[`Target`](../interfaces/Target.md)[]

## 例

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
