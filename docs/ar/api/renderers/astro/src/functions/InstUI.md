[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# Function: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

إنشاء مكون Starlight pantoken.

## Parameters

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returns

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

مكون Starlight يحقن ورقة أنماط pantoken في رأس الصفحة.

## Example

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
