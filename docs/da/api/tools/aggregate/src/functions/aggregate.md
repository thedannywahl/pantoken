[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# Funktion: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Generer meta-pakkens kildebøtte, subpath-poster og `exports` kort.

## Parametre

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## Returnerer

[`Target`](../interfaces/Target.md)[]

De opdagede mål.

## Eksempel

**Regenerer meta-pakken**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
