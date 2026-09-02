[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# Funció: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el connector Simple Icons.

## Paràmetres

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md). Passa un `registry` per evitar la importació tardana (p. ex., en ús de fase de token, on els ganxos són síncrons).

## Retorna

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

Un [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) amb ganxos `tokens` i `rehype`.

## Exemples

**Emet glifos de marca com a tokens \<image\>**

```ts
import { buildTokens } from "@pantoken/core";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

buildTokens({
  theme: "rebrand",
  plugins: [simpleIcons({ registry, slugs: ["github", "react"] })],
});
// adds --instui-icon-github, --instui-icon-react as <image> tokens
```

**Resol els codis :brand: en renderitzar (capa rehype)**

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
