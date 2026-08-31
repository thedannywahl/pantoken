[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / makeResolver

# Function: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցել լուծիչ, որն ընդլայնում է `var(--x)` հղումները կոնկրետ ծերտ արժեքներին `base` դեմ (գումարած ցանկացած `overrides`): `mode` դեպքում այն փակցնում է `light-dark()` այդ ճյուղին; առանց այդ, այն թողնում է `light-dark()` տեղում:

## Parameters

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

Հղումներ լուծելու համար նախատեսված նիշերի հավաքածուն:

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

[ResolveOptions](../interfaces/ResolveOptions.md).

## Returns

Ֆունկցիա, որը լուծում է արժեքային տողը:

(`value`) => `string`

## Examples

**Ընդլայնել հղումների շղթան դրա կոնկրետ ծերտին**

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

**Փակցնել light-dark()-ը ռեժիմով, կամ պահել այն առանց ռեժիմի**

```ts
import { makeResolver } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
];

makeResolver(ir)("var(--instui-bg)"); // → "light-dark(#fff, #000)"
makeResolver(ir, { mode: "light" })("var(--instui-bg)"); // → "#fff"
makeResolver(ir, { mode: "dark" })("var(--instui-bg)"); // → "#000"
```

**Շերտային անկատարումներ, որոնք հաղթում են անունների բախումներում**

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
