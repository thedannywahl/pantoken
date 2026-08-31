[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / makeResolver

# Function: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

قم ببناء محلل يوسع مراجع `var(--x)` إلى قيم ورقية ملموسة مقابل `base` (بالإضافة إلى
أي `overrides`). باستخدام `mode` يطويها `light-dark()` إلى هذا الفرع؛ بدونها، يترك
`light-dark()` في المكان.

## Parameters

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

مجموعة الرموز المراد حل المراجع ضدها.

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

[ResolveOptions](../interfaces/ResolveOptions.md).

## Returns

دالة تحل سلسلة قيمة.

(`value`) => `string`

## Examples

**وسع سلسلة المراجع إلى ورقتها الملموسة**

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

**اطو light-dark() بوضع، أو احفظه بدون أحد**

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

**طبقات الإلغاءات التي تفوز على تضارب الأسماء**

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
