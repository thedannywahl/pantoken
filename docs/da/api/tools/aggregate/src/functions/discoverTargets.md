[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Funktion: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Læs `pantoken` målene fra meta-pakkens afhængigheder.

## Parametre

### metaDir

`string`

## Returnerer

[`Target`](../interfaces/Target.md)[]

## Eksempel

**Inspicér hvad der ville blive aggregeret, uden at skrive noget**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
