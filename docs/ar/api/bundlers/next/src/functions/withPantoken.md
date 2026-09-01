[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken

# دالة: withPantoken()

> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تغليف تكوين Next.js بحيث يتم تحويل حزم Instructure UI.

## المعلمات

### nextConfig?

[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`

التكوين الحالي لـ Next (الافتراضي `{}`).

### options?

[`WithPantokenOptions`](../interfaces/WithPantokenOptions.md) = `{}`

[WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## القيم المرجعة

[`NextConfigLike`](../interfaces/NextConfigLike.md)

التكوين المعزّز.

## أمثلة

**غلف next.config.mjs الخاص بك**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

**قم بتحويل حزم InstUI الإضافية**

```js
import { withPantoken } from "@pantoken/next";

export default withPantoken(
  { reactStrictMode: true },
  { transpile: ["@instructure/ui-modal"] },
);
```
