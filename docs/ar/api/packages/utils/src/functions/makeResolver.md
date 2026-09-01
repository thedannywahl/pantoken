[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / makeResolver

# دالة: makeResolver()

> **makeResolver**(`base`, `options?`): (`value`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بِنِاء محلل يوسِّع مراجع `var(--x)` إلى قيم أوراق ملموسة مقابل `base` (بالإضافة إلى\nأي `overrides`). مع `mode` يطوي `light-dark()` إلى ذلك الفرع؛ وبدونه، يترك\n`light-dark()` في مكانه.

## المعلمات

### base

للقراءة فقط [`Token`](../../../core/src/interfaces/Token.md)[]

مجموعة الرموز لحل المراجع مقابلها.

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

[ResolveOptions](../interfaces/ResolveOptions.md).

## القيم المرجعة

دالة تحل سلسلة قيمة.

(`value`) => `string`

## أمثلة

**توسيع سلسلة المرجع إلى ورقتها النهائية الملموسة**

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

**طي light-dark() بوضع، أو الاحتفاظ بها بدون واحد**

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

**تراكب تجاوزات تفوز عند تضارب الأسماء**

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
