[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-props-minify` — يؤلف تحويلات الحذف والتسطيح والتشويش لـ
`--instui-*` الخصائص المخصصة عبر أداة [applyMinify](functions/applyMinify.md) واحدة.

يستخدم كل خط أنابيب إصدار CSS (توليد البرامج النصية، المصيرون) `applyMinify` لسطح تصغير متسق
بدون الاعتماد المباشر على PostCSS.

**الحذف + التشويش آمن فقط للحزم المكتفية ذاتياً** حيث تعيش جميع مراجع `var(--instui-*)`
وتعريفاتها في نفس الناتج. بالنسبة لمستهلكي الملفات المنفصلة (`@pantoken/css` +
`@pantoken/components` محملة بشكل مستقل)، طبق `{ flatten: true }` فقط.

**تشويش عبر حدود الملف:** مرر نفس مثيل `Map` باسم
`mangle.sharedManifest` لكل استدعاء `applyMinify` يعالج ملفات CSS محملة معاً.
معالجة ورقة الرموز أولاً (تبذر البيان)، ثم ورقات المكونات.

## Examples

**تطبيق التحويلات الثلاثة جميعها على حزمة مكتفية ذاتياً**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**تسطيح فقط (آمن لمستهلكي الملفات المنفصلة)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**تشويش ملفين بنفس التعيين**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## Interfaces

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## Type Aliases

- [MangleMethod](type-aliases/MangleMethod.md)

## Variables

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## Functions

- [applyMinify](functions/applyMinify.md)
