[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# Ֆունկցիա: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Ստեղծել pantoken Starlight խրտնակը:

## Պարամետրեր

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Վերադարձվող արժեք

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

Starlight խրտնակ, որն ընդամենում pantoken ոճային թերթը էջի գլխում:

## Օրինակ

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
