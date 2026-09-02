[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / matchesFilters

# Ֆունկցիա: matchesFilters()

> **matchesFilters**(`filename`, `node`): `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Վերադարձնում է `true`-ը, եթե փոփոխված ֆայլի անունը անցնում է հանգույցի include/ignore ֆիլտրերի միջով:

## Պարամետրեր

### filename

`string`

### node

[`UpstreamNode`](../interfaces/UpstreamNode.md)

## Վերադարձվող արժեք

`boolean`

## Օրինակ

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
