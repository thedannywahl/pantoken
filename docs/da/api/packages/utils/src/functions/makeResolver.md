[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / makeResolver

# Funktion: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg en resolver, der udvider `var(--x)` referencer til konkrete bladværdier mod `base` (plus
enhver `overrides`). Med `mode` sammenfolder det `light-dark()` til den gren; uden det lader det
`light-dark()` på plads.

## Parametre

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

Det tokensæt, der skal løses referencer mod.

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

[ResolveOptions](../interfaces/ResolveOptions.md).

## Returnerer

En funktion, der løser en værdistreng.

(`value`) => `string`

## Eksempler

**Udvid en referencekæde til dets konkrete blad**

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

**Sammenfold light-dark() med en tilstand, eller behold det uden en**

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

**Lagoverrideringer, der vinder ved navnekollisioner**

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
