[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Function: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Wrap a Next.js config so the Instructure UI packages are transpiled.

## Parameters

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

The existing Next config (default `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Returns

[`NextConfigLike`](../interfaces/NextConfigLike.md)

The augmented config.

## Examples

**Wrap your next.config.mjs**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**Transpile extra InstUI packages**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken(
  { reactStrictMode: true },
  { transpile: ["@instructure/ui-modal"] },
);
```
