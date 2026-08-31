[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# Function: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تطبيق تحويلات تصغير الخصائص المخصصة على سلسلة ورقة أنماط.

ينشئ مصفوفة ملحقات PostCSS من `options` ويشغلها بشكل متزامن. ترتيب الملحق:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. يرجع الإدخال دون تغيير عند
عدم تعيين أي خيارات.

## Parameters

### css

`string`

سلسلة ورقة الأنماط المراد تحويلها.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## Returns

`string`

سلسلة CSS المحولة.

## Example

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
