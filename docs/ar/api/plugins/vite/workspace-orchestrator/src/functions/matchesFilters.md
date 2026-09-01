[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / matchesFilters

# دالة: matchesFilters()

> **matchesFilters**(`filename`, `node`): `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

يعيد `true` إذا كان اسم الملف المُعدَّل يمر عبر مرشحات include/ignore الخاصة بالعقدة.

## المعلمات

### filename

`string`

### node

[`UpstreamNode`](../interfaces/UpstreamNode.md)

## القيم المرجعة

`boolean`

## مثال

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
