[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / matchesFilters

# Hàm: matchesFilters()

> **matchesFilters**(`filename`, `node`): `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Returns `true` if the changed filename passes the node's include/ignore filters.

## Tham số

### filename

`string`

### node

[`UpstreamNode`](../interfaces/UpstreamNode.md)

## Trả về

`boolean`

## Ví dụ

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
