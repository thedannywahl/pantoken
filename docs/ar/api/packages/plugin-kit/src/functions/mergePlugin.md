[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# دالة: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

دمج عدة ملحقات في واحد، طيها من اليسار إلى اليمين باستخدام [extendPlugin](extendPlugin.md).

## المعلمات

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

الملحقات المراد دمجها (مطلوب واحد على الأقل).

## القيم المرجعة

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

ملحق واحد بعلامة تجارية.

## مثال

**دمج الملحقات النظيرة في واحد**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
