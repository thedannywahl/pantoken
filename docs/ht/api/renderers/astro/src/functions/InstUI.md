[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# Fonksyon: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Create the pantoken Starlight plugin.

## Paramèt

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Retounen

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

A Starlight plugin that injects the pantoken stylesheet into the page head.

## Egzanp

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
