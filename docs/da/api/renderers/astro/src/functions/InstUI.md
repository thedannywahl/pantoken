[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# Funktion: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Opret pantoken Starlight-plugin.

## Parametre

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returnerer

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

Et Starlight-plugin, der injicerer pantoken-stilarket i sidens head.

## Eksempel

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
