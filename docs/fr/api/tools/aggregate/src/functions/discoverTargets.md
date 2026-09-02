[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Fonction: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Read the `pantoken` targets from the meta package's dependencies.

## Paramètres

### metaDir

`string`

## Renvoie

[`Target`](../interfaces/Target.md)[]

## Exemple

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
