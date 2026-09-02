[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / makeResolver

# Funció: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix un resolutor que expandeix les referències `var(--x)` a valors full concrets contra `base` (més
qualsevol `overrides`). Amb `mode` col·lapsa `light-dark()` a aquesta branca; sense, deixa
`light-dark()` en lloc.

## Paràmetres

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

El conjunt de marques per resoldre les referències.

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md)

[ResolveOptions](../interfaces/ResolveOptions.md).

## Retorna

Una funció que resol una cadena de valor.

(`value`) => `string`

## Exemples

**Expandeix una cadena de referència fins a la seva fulla concreta**

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

**Col·lapsa light-dark() amb un mode, o manté'l sense**

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

**Capa de substitucions que guanyen en col·lisions de noms**

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
