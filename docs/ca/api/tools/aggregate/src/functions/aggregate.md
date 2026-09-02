[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# Funció: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Genera el barril de font del paquet meta, les entrades de subcamins, i el mapa `exports`.

## Paràmetres

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## Retorna

[`Target`](../interfaces/Target.md)[]

Els objectius descoberts.

## Exemple

**Regenera el paquet meta**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
