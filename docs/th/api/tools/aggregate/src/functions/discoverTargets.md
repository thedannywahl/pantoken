[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# ฟังก์ชัน: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Read the `pantoken` targets from the meta package's dependencies.

## พารามิเตอร์

### metaDir

`string`

## คืนค่า

[`Target`](../interfaces/Target.md)[]

## ตัวอย่าง

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
