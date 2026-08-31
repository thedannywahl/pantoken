[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / matchesFilters

# Function: matchesFilters()

> **matchesFilters**(`filename`, `node`): `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

يعيد `true` إذا كان اسم الملف المتغيّر يجتاز مرشحات include/ignore للعقدة.

## Parameters

### filename

`string`

### node

[`UpstreamNode`](../interfaces/UpstreamNode.md)

## Returns

`boolean`

## Example

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
