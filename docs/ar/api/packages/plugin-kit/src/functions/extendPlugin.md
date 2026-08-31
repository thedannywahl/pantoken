[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# Function: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء مكون إضافي فوق آخر. يتم تكوين hooks من نفس المرحلة: `tokens` يشغل `base` ثم
`overrides` (الذي يرى مخرجات base)؛ `css` يدمج كلا `CssContribution`s؛ `icons`/`native` يشغل
كلاهما؛ `rehype` chains resolvers (يتجاوز أولاً). القدرات هي الاتحاد.

## Parameters

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

المكون الإضافي للتوسيع.

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

Hooks (و`name` اختياري) متطبقة في الأعلى.

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

مكون إضافي مميز جديد.

## Example

**إضافة مساهمة CSS إضافية فوق مكون إضافي أساسي**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
