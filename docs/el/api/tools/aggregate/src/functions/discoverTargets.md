[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Συνάρτηση: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Read the `pantoken` targets from the meta package's dependencies.

## Παράμετροι

### metaDir

`string`

## Επιστρέφει

[`Target`](../interfaces/Target.md)[]

## Παράδειγμα

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
