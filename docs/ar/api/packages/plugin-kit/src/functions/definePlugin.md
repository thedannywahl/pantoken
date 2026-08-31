[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Function: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء مكون إضافي pantoken من hooks الخاصة به. النتيجة هي `PantokenPlugin` عادي مميز بـ
القدرات المستدلة من hooks التي قدمتها.

## Parameters

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

المكون الإضافي `name` بالإضافة إلى أي من hooks `tokens`/`icons`/`css`/`rehype`/`native`.

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

[PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md) مميز.

## Example

**مكون إضافي موحد للرموز + CSS**

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
