[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Fušla: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Read the `pantoken` targets from the meta package's dependencies.

## Parametera

### metaDir

`string`

## Gullii / Gávdnat

[`Target`](../interfaces/Target.md)[]

## Exempel

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
