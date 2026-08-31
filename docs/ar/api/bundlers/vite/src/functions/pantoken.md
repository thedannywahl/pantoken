[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# Function: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مكون pantoken الإضافي Vite.

## Parameters

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## Returns

[`Plugin`](https://vite.dev/guide/api-plugin)

مكون إضافي Vite [Plugin](https://vite.dev/guide/api-plugin).

## Examples

**سجل المكون الإضافي في vite.config.ts**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**حقن ورقة النمط تلقائياً في HTML \<head\>**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**استهلك الوحدات الافتراضية في كود التطبيق**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
