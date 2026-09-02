[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# دالة: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تشغيل خطاف `icons` لكل مكون إضافي، مما يسمح للمكونات الإضافية بتسجيل غليفات إضافية كرموز `&lt;image&gt;`.
يتلقى كل خطاف قائمة الأيقونات الحالية ويُرجع سجلات [IconEntry](../interfaces/IconEntry.md) جديدة لإضافتها.
يتم إلغاء التكرار في النتيجة بناءً على الاسم.

## المعلمات

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

قراءة فقط [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## القيم المرجعة

[`Token`](../interfaces/Token.md)[]

## مثال

**تسجيل غليف إضافي كرمز \<image\>**

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
