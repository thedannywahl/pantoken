[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# تابع: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Read the `pantoken` targets from the meta package's dependencies.

## پارامترها

### metaDir

`string`

## مقدار بازگشتی

[`Target`](../interfaces/Target.md)[]

## نمونه

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
