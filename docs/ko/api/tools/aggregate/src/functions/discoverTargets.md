[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# 함수: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Read the `pantoken` targets from the meta package's dependencies.

## 매개변수

### metaDir

`string`

## 반환값

[`Target`](../interfaces/Target.md)[]

## 예제

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
