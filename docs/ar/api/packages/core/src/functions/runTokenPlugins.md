[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runTokenPlugins

# دالة: runTokenPlugins()

> **runTokenPlugins**(`tokens`, `theme`, `plugins`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تشغيل معرّف `tokens` لكل مكوّن إضافي بالترتيب. يستقبل كل معلّق القائمة الحالية ويعيد الاستبدال الكامل؛ تُزال التكرارات من النتيجة حسب الاسم.

## المعلمات

### tokens

[`Token`](../interfaces/Token.md)[]

### theme

[`Theme`](../type-aliases/Theme.md)

### plugins

قراءة فقط [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

## القيم المرجعة

[`Token`](../interfaces/Token.md)[]

## مثال

```ts
import { runTokenPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
];
const addBrand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens }) => [
    ...tokens,
    defineToken({ name: "--instui-brand", value: "#0374B5" }),
  ],
};

runTokenPlugins(base, "rebrand", [addBrand]); // → base + the --instui-brand token
```
