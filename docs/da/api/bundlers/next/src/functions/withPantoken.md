[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Funktion: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Omslut en Next.js-konfiguration, så Instructure UI-pakkerne bliver transpileret.

## Parametre

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

Den eksisterende Next-konfiguration (standard `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Returnerer

[`NextConfigLike`](../interfaces/NextConfigLike.md)

Den forstærkede konfiguration.

## Eksempler

**Omslut din next.config.mjs**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**Transpilér ekstra InstUI-pakker**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken(
  { reactStrictMode: true },
  { transpile: ["@instructure/ui-modal"] },
);
```
