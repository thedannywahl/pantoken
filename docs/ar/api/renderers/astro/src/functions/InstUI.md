[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# دالة: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

إنشاء ملحق pantoken Starlight.

## المعلمات

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## القيم المرجعة

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

ملحق Starlight يقوم بحقن ورقة أنماط pantoken في رأس الصفحة.

## مثال

**astro.config.mjs**

```ts
import starlight from "@astrojs/starlight";
import { InstUI } from "@pantoken/astro";
import { transition } from "@pantoken/plugin-transition";

export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      plugins: [InstUI({ theme: "rebrand", plugins: [transition()] })],
    }),
  ],
});
```
