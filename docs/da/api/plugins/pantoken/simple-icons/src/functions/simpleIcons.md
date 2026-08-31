[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# Function: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret Simple Icons pluginen.

## Parameters

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md). Pass en `registry` for at undgå doven indlæsning (f.eks. i
token-stage brug, hvor hooks er synkron).

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

Et [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) med `tokens` og `rehype` hooks.

## Examples

**Udsted brand glyphs som \<image\> tokens**

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

**Løs :brand: koder ved rendering (rehype lag)**

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
