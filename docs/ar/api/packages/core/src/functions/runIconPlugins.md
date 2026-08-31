[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# Function: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تشغيل خطاف `icons` لكل مكون، مما يسمح للمكونات بتسجيل رموز إضافية كـ `&lt;image&gt;` توكنات.
كل خطاف يتلقى قائمة الرموز الحالية ويعود بسجلات [IconEntry](../interfaces/IconEntry.md) جديدة للإضافة.
يتم إزالة التكرار من النتيجة حسب الاسم.

## Parameters

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## Returns

[`Token`](../interfaces/Token.md)[]

## Example

**تسجيل رمز إضافي كتوكن \<image\>**

```ts
import { runIconPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [];
const star: PantokenPlugin = {
  name: "star",
  icons: () => [{ name: "star", path: "M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" }],
};

const tokens = runIconPlugins(base, [star], "rebrand");
// → adds a --instui-icon-star token whose value is a data-URI SVG
```
