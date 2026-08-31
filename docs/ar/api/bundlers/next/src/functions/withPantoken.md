[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# Function: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

لف إعدادات Next.js بحيث يتم نقل حزم Instructure UI.

## Parameters

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

إعدادات Next الموجودة (الافتراضي `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Returns

[`NextConfigLike`](../interfaces/NextConfigLike.md)

الإعدادات المعززة.

## Examples

**لف ملف next.config.mjs الخاص بك**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**نقل حزم InstUI الإضافية**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true }, { transpile: ["@instructure/ui-modal"] });
```
