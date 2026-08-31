[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Function: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Omslut en Next.js-konfiguration, så Instructure UI-pakkerne bliver transpileret.

## Parameters

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

Den eksisterende Next-konfiguration (standard `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Returns

[`NextConfigLike`](../interfaces/NextConfigLike.md)

Den forstærkede konfiguration.

## Examples

**Omslut din next.config.mjs**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**Transpilér ekstra InstUI-pakker**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true }, { transpile: ["@instructure/ui-modal"] });
```
