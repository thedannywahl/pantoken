[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Funció: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Embolcalla una configuració de Next.js perquè els paquets de la UI d'Instructure es transpilin.

## Paràmetres

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

La configuració de Next existent (per defecte `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Retorna

[`NextConfigLike`](../interfaces/NextConfigLike.md)

La configuració augmentada.

## Exemples

**Embolcalla el teu next.config.mjs**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**Transpila paquets extra d'InstUI**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken(
  { reactStrictMode: true },
  { transpile: ["@instructure/ui-modal"] },
);
```
