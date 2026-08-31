[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# Function: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تصفية قائمة المكونات الإضافية إلى تلك التي تشارك في `stage`، مع تحذير من الباقي.

## Parameters

### plugins

readonly [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

المكونات الإضافية المسجلة.

### stage

[`Stage`](../type-aliases/Stage.md)

المرحلة التي يتم تشغيلها.

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

المكونات الإضافية التي تحتوي على hook لـ `stage`.

## Example

**الاحتفاظ فقط بالمكونات الإضافية التي تشارك في المرحلة**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
