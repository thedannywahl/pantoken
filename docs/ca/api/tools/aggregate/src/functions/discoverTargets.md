[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Funció: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Llegeix els objectius `pantoken` de les dependències del paquet meta.

## Paràmetres

### metaDir

`string`

## Retorna

[`Target`](../interfaces/Target.md)[]

## Exemple

**Inspeccioneu què s'agregaria, sense escriure res**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
