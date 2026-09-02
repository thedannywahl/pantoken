[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# Συνάρτηση: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Create the Simple Icons plugin.

## Παράμετροι

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md). Pass a `registry` to avoid the lazy import (e.g. in
  token-stage use, where hooks are synchronous).

## Επιστρέφει

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) with `tokens` and `rehype` hooks.

## Παραδείγματα

**Emit brand glyphs as \<image\> tokens**

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

**Resolve :brand: codes at render (rehype layer)**

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
