[pantoken](../../../../index.md) / [bundlers/vite/src](../index.md) / pantoken

# Ֆունկցիա: pantoken()

> **pantoken**(`options?`): [`Plugin`](https://vite.dev/guide/api-plugin)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Pantoken Vite plugin-ը:

## Պարամետրեր

### options?

[`PantokenViteOptions`](../interfaces/PantokenViteOptions.md) = `{}`

[PantokenViteOptions](../interfaces/PantokenViteOptions.md).

## Վերադարձվող արժեք

[`Plugin`](https://vite.dev/guide/api-plugin)

Vite [Plugin](https://vite.dev/guide/api-plugin):

## Օրինակներ

**Գրանցեք plugin-ը vite.config.ts-ում**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken()],
});
```

**Ավտոմատ ներգրավել stylesheet-ը HTML \<head\>-ի մեջ**

```ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  // No need to import `virtual:pantoken/css` yourself — it's injected.
  plugins: [pantoken({ injectCss: true })],
});
```

**Կօգտագործել վիրտուալ մոդուլները app code-ում**

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```
