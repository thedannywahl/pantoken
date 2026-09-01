[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/pendo` — ورقة أنماط عالمية بنمط Instructure لأدلة Pendo.

يقوم Pendo بحقن HTML الخاص بالدليل داخل صفحة المستضيف؛ هذا يقوم بعرض DOM الخاص بالدليل (`._pendo-*`) ليتطابق مع
Instructure UI، باستخدام طبقة الرموز `--instui-*` من pantoken للمحاذاة. تم
نقل CSS الخاص بالمكون من `@instructure/pendo-global-css`; يوفر pantoken الرموز والتجميع.

[buildPendoCss](functions/buildPendoCss.md) يؤلف ورقة الأنماط؛ [pendoCss](variables/pendoCss.md) هو بناء `rebrand` الجاهز
(مقيد، `!important`). يتم نشر ملف ثابت في `@pantoken/pendo/global.css`.

## مثال

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## واجهات

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## المتغيرات

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## الدوال

- [buildPendoCss](functions/buildPendoCss.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [pendoCss](variables/pendoCss.md)
