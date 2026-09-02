[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# 함수: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Wrap a Next.js config so the Instructure UI packages are transpiled.

## 매개변수

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

The existing Next config (default `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## 반환값

[`NextConfigLike`](../interfaces/NextConfigLike.md)

The augmented config.

## 예제들

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
