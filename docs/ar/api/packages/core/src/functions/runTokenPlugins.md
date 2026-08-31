[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runTokenPlugins

# Function: runTokenPlugins()

> **runTokenPlugins**(`tokens`, `theme`, `plugins`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تشغيل خطاف `tokens` لكل مكون بالترتيب. كل خطاف يتلقى القائمة الحالية ويعود بالاستبدال الكامل؛ يتم إزالة التكرار من النتيجة حسب الاسم.

## Parameters

### tokens

[`Token`](../interfaces/Token.md)[]

### theme

[`Theme`](../type-aliases/Theme.md)

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

## Returns

[`Token`](../interfaces/Token.md)[]

## Example

```ts
import { runTokenPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [{ name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" }];
const addBrand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens }) => [...tokens, defineToken({ name: "--instui-brand", value: "#0374B5" })],
};

runTokenPlugins(base, "rebrand", [addBrand]); // → base + the --instui-brand token
```
