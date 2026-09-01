[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / resolveTokens

# دالة: resolveTokens()

> **resolveTokens**(`base`, `options?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل قيمة كل توكن مقابل المجموعة (انظر [makeResolver](makeResolver.md))، مفهرسة حسب الاسم.

## المعلمات

### base

للقراءة فقط [`Token`](../../../core/src/interfaces/Token.md)[]

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md)

## القيم المرجعة

`Map`\<`string`, `string`\>

## مثال

**حل تمثيل IR كامل إلى خريطة اسم → قيمة**

```ts
import { resolveTokens } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
];

const byName = resolveTokens(ir, { mode: "dark" });
byName.get("--instui-brand"); // → "#0374B5"
byName.get("--instui-bg");    // → "#000"
```
