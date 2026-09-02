[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-mangle-custom-props` — إعادة تسمية أسماء الخصائص المخصصة الطويلة إلى معرفات متتالية ومختصرة
للتقليل.

أسماء الرموز مثل `--instui-component-alert-border-top-style` قابلة للقراءة من قبل البشر لكنها مكلفة في
الحزم المصغرة: الاسم نفسه يزيد عن 40 بايت، ويتكرر في التعريف، وكل استدعاء `var()`،
وكل تسجيل `@property`. هذا المكوّن الإضافي يستبدل كل اسم مطابق — عبر التعريفات،
مراجع `var()`، وبارامترات `@property` — بمعرف مختصر (`--a`, `--b`, …, `--aa`,
…)، مما يقلل من حمولة الأسماء بحوالي ~90%.

تُجمع الأسماء من ورقة الأنماط الكاملة، وتُرتب أبجدياً للحصول على مطابقة حتمية،
ثم تُعيَّن بشكل متسلسل. خيار [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) يسمح لعمليات PostCSS منفصلة
بمشاركة مطابقة موحدة واحدة، بحيث يمكن لملفات CSS المعالجة بشكل منفصل والتي ستُحمّل معاً
أن تُشوَّه بأمان باستخدام نفس الأسماء.

## مثال

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## واجهات

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## أسماء أنواع مستعارة

- [MangleMethod](type-aliases/MangleMethod.md)

## المتغيرات

- [mangleCustomProps](variables/mangleCustomProps.md)
