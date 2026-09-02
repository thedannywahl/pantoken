[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-props-minify` — تجميع محولات prune و flatten و mangle لـ
الخصائص المخصصة `--instui-*` عبر أداة مساعدة واحدة [applyMinify](functions/applyMinify.md).

كل مسار إنتاج CSS (سكريبتات التوليد، الريندررز) يستخدم `applyMinify` لسطح تصغير متسق
دون الاعتماد المباشر على PostCSS.

**Prune + mangle آمنان فقط للحُزَم المتكاملة ذاتياً** حيث تعيش كل مراجع `var(--instui-*)`
وتعريفاتها في نفس المخرج. للمستهلكين بملفات منفصلة (`@pantoken/css` +
`@pantoken/components` محمّلان بشكل مستقل)، طبّق `{ flatten: true }` فقط.

**Mangle عبر حدود الملفات:** مرّر نفس مثيل `Map` كـ
`mangle.sharedManifest` إلى كل استدعاء `applyMinify` الذي يعالج ملفات CSS المحمّلة معاً.
عالج ورقة الرموز أولاً (فهي تهيئ السجل)، ثم أوراق المكونات.

## أمثلة

**تطبيق المحولات الثلاثة كلها على حزْمَة متكاملة ذاتياً**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**Flatten فقط (آمن لمستهلكي الملفات المنفصلة)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**Mangle لملفين باستخدام نفس التعيين**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## واجهات

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## أسماء أنواع مستعارة

- [MangleMethod](type-aliases/MangleMethod.md)

## المتغيرات

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## الدوال

- [applyMinify](functions/applyMinify.md)
