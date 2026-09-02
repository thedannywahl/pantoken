[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# دالة: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

ملحق pantoken الخاص بـ Vite.

## المعلمات

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## القيم المرجعة

[`Plugin`](https://vite.dev/guide/api-plugin)

مُلحق Vite [Plugin](https://vite.dev/guide/api-plugin).

## أمثلة

**سجّل الملحق في vite.config.ts**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**حقن ورقة الأنماط تلقائيًا في HTML \<head\>**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**استخدم الوحدات الافتراضية في كود التطبيق**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
