[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-mangle-custom-props` — إعادة تسمية أسماء الخصائص المخصصة الطويلة إلى معرّفات متسلسلة الحد الأدنى.

أسماء الرموز مثل `--instui-component-alert-border-top-style` يمكن قراءتها من قبل الإنسان ولكنها مكلفة في الحزم المصغرة: الاسم نفسه هو 40+ بايت، مكرر في التعريف، كل استدعاء `var()`، وكل تسجيل `@property`. يستبدل هذا المكون الإضافي كل اسم مطابق — عبر التعريفات، مراجع `var()`، ومعاملات `@property` — بمعرّف الحد الأدنى (`--a`، `--b`، …، `--aa`، …)، مما يقلل عبء الاسم بنسبة ~90%.

يتم جمع الأسماء من ورقة الأنماط الكاملة، وفرزها بترتيب أبجدي للحصول على تعيين حتمي،
ثم يتم تعيينها بالتسلسل. يسمح خيار [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) بمراحل PostCSS منفصلة متعددة
بمشاركة تعيين واحد متسق، بحيث يمكن معالجة ملفات CSS المعالجة بشكل منفصل والتي سيتم
تحميلها معاً بأمان باستخدام نفس الأسماء.

## Example

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## Interfaces

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## Type Aliases

- [MangleMethod](type-aliases/MangleMethod.md)

## Variables

- [mangleCustomProps](variables/mangleCustomProps.md)
