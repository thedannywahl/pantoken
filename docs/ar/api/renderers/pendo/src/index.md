[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — ورقة أنماط عامة بتنسيق Instructure لأدلة Pendo.

يحقن Pendo HTML الدليل في صفحة مضيفة؛ هذا يعرض DOM الدليل (`._pendo-*`) ليطابق
واجهة Instructure، باستخدام طبقة الرمزات `--instui-*` الخاصة بـ pantoken للمحاذاة. تم نقل CSS المكون من
`@instructure/pendo-global-css`؛ توفر pantoken الرمزات والتجميع.

[buildPendoCss](functions/buildPendoCss.md) ينشئ ورقة الأنماط؛ [pendoCss](variables/pendoCss.md) هو البناء `rebrand` الجاهز
(نطاق، `!important`). يتم نشر ملف ثابت في `@pantoken/pendo/global.css`.

## Example

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## Interfaces

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## Variables

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## Functions

- [buildPendoCss](functions/buildPendoCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [pendoCss](variables/pendoCss.md)
