[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# Funció: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Crea el plugin Starlight de pantoken.

## Paràmetres

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Retorna

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

Un plugin Starlight que injecta l'full d'estils de pantoken a la capçalera de la pàgina.

## Exemple

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
