[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Ֆունկցիա: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Փաթեթել Next.js config-ը, որպեսզի Instructure UI փաթեթներ կոդավազգային թարգմանված:

## Պարամետրեր

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

Գոյություն ունեցող Next config (լռելյայն `{}`):

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Վերադարձվող արժեք

[`NextConfigLike`](../interfaces/NextConfigLike.md)

Ընդլայնված config:

## Օրինակներ

**Փաթեթել ձեր next.config.mjs:**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**Կոդավազգային թարգմանել լրացուցիչ InstUI փաթեթներ:**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken(
  { reactStrictMode: true },
  { transpile: ["@instructure/ui-modal"] },
);
```
