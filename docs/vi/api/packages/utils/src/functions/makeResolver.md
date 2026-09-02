[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / makeResolver

# Hàm: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a resolver that expands `var(--x)` references to concrete leaf values against `base` (plus
any `overrides`). With `mode` it collapses `light-dark()` to that branch; without, it leaves
`light-dark()` in place.

## Tham số

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

The token set to resolve references against.

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

[ResolveOptions](../interfaces/ResolveOptions.md).

## Trả về

A function that resolves a value string.

(`value`) => `string`

## Các ví dụ

**Expand a reference chain to its concrete leaf**

```ts
import { makeResolver } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
];

const resolve = makeResolver(ir);
resolve("var(--instui-brand)"); // → "#0374B5"
```

**Collapse light-dark() with a mode, or keep it without one**

```ts
import { makeResolver } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
];

makeResolver(ir)("var(--instui-bg)");                 // → "light-dark(#fff, #000)"
makeResolver(ir, { mode: "light" })("var(--instui-bg)"); // → "#fff"
makeResolver(ir, { mode: "dark" })("var(--instui-bg)");  // → "#000"
```

**Layer overrides that win on name collisions**

```ts
import { makeResolver } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
];
const overrides: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#000" },
];

makeResolver(ir, { overrides })("var(--instui-brand)"); // → "#000"
```
