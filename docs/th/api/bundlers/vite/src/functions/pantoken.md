[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# ฟังก์ชัน: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

The pantoken Vite plugin.

## พารามิเตอร์

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## คืนค่า

[`Plugin`](https://vite.dev/guide/api-plugin)

A Vite [Plugin](https://vite.dev/guide/api-plugin).

## ตัวอย่าง

**Register the plugin in vite.config.ts**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**Auto-inject the stylesheet into the HTML \<head\>**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**Consume the virtual modules in app code**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
