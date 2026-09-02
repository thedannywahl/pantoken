[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# دالة: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تطبيق تحويلات تقليص الخصائص المخصصة على سلسلة ملف الأنماط.

يبني مصفوفة إضافات PostCSS من `options` ويشغّلها بشكل متزامن. ترتيب الإضافات:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. يُعيد المدخل دون تغيير عندما
لا تُضبط أي خيارات.

## المعلمات

### css

`string`

سلسلة ملف الأنماط المراد تحويلها.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## القيم المرجعة

`string`

سلسلة CSS المحوّلة.

## مثال

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
