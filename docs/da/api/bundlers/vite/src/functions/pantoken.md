[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# Function: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Pantoken Vite pluginet.

## Parameters

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## Returns

[`Plugin`](https://vite.dev/guide/api-plugin)

Et Vite [Plugin](https://vite.dev/guide/api-plugin).

## Examples

**Registrer pluginet i vite.config.ts**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**Auto-injicér stylesheettet ind i HTML \<head\>**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**Konsumér de virtuelle moduler i app-koden**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
