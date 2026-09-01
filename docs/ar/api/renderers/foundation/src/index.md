[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/foundation` — السمة Foundation for Sites باستخدام توكنات Instructure.

Foundation يعتمد أولاً على Sass، لذا ترسل هذه الحزمة طبقتين. [toFoundationSettings](functions/toFoundationSettings.md) يولد جزء Sass على نمط `_settings` يشير بمتغيرات إعدادات Foundation إلى `var(--instui-*)`، بحيث يقوم بناء Sass بترجمة مظهر Instructure مع الحفاظ على التخصيص في وقت التشغيل عبر نفس الخصائص المخصصة. [toFoundationCss](functions/toFoundationCss.md) ينتج طبقة CSS رقيقة تقوم بتطبيق سمة الألوان على الفئات المجمعة الشائعة (`.button`, `.callout`, links) بنفس الطريقة — مفيد عندما تستهلك CSS الافتراضية لـ Foundation وتريد فقط تراكب ألوان Instructure فوقها دون إعادة الترجمة.

## مثال

```ts
import { foundationSettings, foundationCss } from "@pantoken/foundation";
// foundationSettings → a Sass partial; foundationCss → a runtime overlay.
```

## واجهات

- [ToFoundationSettingsOptions](interfaces/ToFoundationSettingsOptions.md)
- [ToFoundationCssOptions](interfaces/ToFoundationCssOptions.md)

## المتغيرات

- [FOUNDATION\_TO\_INSTUI](variables/FOUNDATION_TO_INSTUI.md)
- [foundationSettings](variables/foundationSettings.md)
- [foundationCss](variables/foundationCss.md)

## الدوال

- [toFoundationSettings](functions/toFoundationSettings.md)
- [toFoundationCss](functions/toFoundationCss.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [foundationCss](variables/foundationCss.md)
