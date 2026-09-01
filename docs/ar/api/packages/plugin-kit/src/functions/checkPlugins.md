[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# دالة: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تصفية قائمة الإضافات للاحتفاظ بتلك التي تشارك في `stage`، مع تحذير بشأن الباقي.

## المعلمات

### plugins

قراءة فقط [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

الإضافات المسجلة.

### stage

[`Stage`](../type-aliases/Stage.md)

المرحلة الجاري تنفيذها.

## القيم المرجعة

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

الإضافات التي لها hook لـ `stage`.

## مثال

**احتفظ فقط بالإضافات التي تشارك في مرحلة**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
