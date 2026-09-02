[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# फंक्शन: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Wrap a Next.js config so the Instructure UI packages are transpiled.

## पैरामीटर

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

The existing Next config (default `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## वापसी

[`NextConfigLike`](../interfaces/NextConfigLike.md)

The augmented config.

## उदाहरण

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
