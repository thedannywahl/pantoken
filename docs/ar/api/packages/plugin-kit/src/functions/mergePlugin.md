[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Function: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

دمج عدة مكونات إضافية في واحدة، بطيها من اليسار إلى اليمين باستخدام [extendPlugin](extendPlugin.md).

## Parameters

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

المكونات الإضافية المراد دمجها (واحد على الأقل).

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

مكون إضافي واحد موسوم.

## Example

**دمج المكونات الإضافية النظيرة في واحدة**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
