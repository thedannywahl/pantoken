[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# دالة: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

بناء ورقة أنماط pantoken لقالب (مع CSS للمكوّن الإضافي اختيارياً). متاح للاستخدام المباشر.

## المعلمات

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.

## مثال

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
