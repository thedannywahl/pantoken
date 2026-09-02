[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# تابع: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Create the pantoken Starlight plugin.

## پارامترها

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## مقدار بازگشتی

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

A Starlight plugin that injects the pantoken stylesheet into the page head.

## نمونه

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
