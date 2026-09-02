[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / matchesFilters

# Funció: matchesFilters()

> **matchesFilters**(`filename`, `node`): `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Retorna `true` si el nom de fitxer canviat passa els filtres d'inclusió/ignorada del node.

## Paràmetres

### filename

`string`

### node

[`UpstreamNode`](../interfaces/UpstreamNode.md)

## Retorna

`boolean`

## Exemple

```ts
import { matchesFilters } from "@pantoken/vite-workspace-orchestrator";

const node = {
  name: "@pantoken/components",
  dir: "/repo/formats/components",
  watchPaths: ["/repo/formats/components/src"],
  build: ["pnpm", "run", "build"] as const,
  dependents: [],
  include: ["**/*.ts"],
  ignore: ["**/*.test.ts"],
};

matchesFilters("src/index.ts", node); // true
matchesFilters("src/index.test.ts", node); // false (ignored)
```
