[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# Funció: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El connector de Vite de pantoken.

## Paràmetres

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## Retorna

[`Plugin`](https://vite.dev/guide/api-plugin)

Un [connector](https://vite.dev/guide/api-plugin) de Vite.

## Exemples

**Registreu el connector a vite.config.ts**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**Auto-injecteu la full d'estils a l'HTML \<head\>**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**Consumiu els mòduls virtuals en el codi de l'aplicació**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
