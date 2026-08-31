[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Function: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pantoken լրացուցիչ մոդուլ ստեղծել նրա կարերից: Արդյունքը սովորական `PantokenPlugin` է, որը դրանովանակ է
նրանց գործիքներով, որ եզրակացված են ձեր տրամադրած կարերից:

## Parameters

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Լրացուցիչ մոդուլ `name` պլյուս որևէ `tokens`/`icons`/`css`/`rehype`/`native` կար:

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Դրանովանակ [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md):

## Example

**Միավորված տոկեններ + css լրացուցիչ մոդուլ**

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
