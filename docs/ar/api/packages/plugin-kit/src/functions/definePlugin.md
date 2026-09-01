[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# دالة: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء مكوّن إضافي لـ pantoken من الواجهات (hooks) الخاصة به. النتيجة هي `PantokenPlugin` عادي مُعلَّم بالقدرات المستنتجة من الواجهات التي قدَّمتها.


## المعلمات

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

الإضافة `name` بالإضافة إلى أيٍّ من الواجهات `tokens`/`icons`/`css`/`rehype`/`native`.

## القيم المرجعة

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

مكوَّن موسوم من نوع [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md).

## مثال

**مكوّن إضافي موحَّد للـ tokens و css**

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({
  name: "@acme/brand",
  tokens: (ctx) => [
    ...ctx.tokens,
    ctx.define({ name: "--instui-brand", value: "var(--instui-color-background-brand)" }),
  ],
  css: () => ({ append: ":root { color-scheme: light dark; }" }),
});

capabilitiesOf(brand); // → ["tokens", "css"]
```
