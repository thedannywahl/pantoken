[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Fall: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Read the `pantoken` targets from the meta package's dependencies.

## Færibreytur

### metaDir

`string`

## Skilar

[`Target`](../interfaces/Target.md)[]

## Dæmi

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
