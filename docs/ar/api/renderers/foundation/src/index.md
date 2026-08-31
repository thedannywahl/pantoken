[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/foundation` — موضوع Foundation for Sites برموز Instructure.

Foundation يعتمد على Sass أولاً، لذا تشحن هذه الحزمة طبقتين. [toFoundationSettings](functions/toFoundationSettings.md) ينبعث `_settings`-style Sass partial يوجه متغيرات إعدادات Foundation إلى `var(--instui-*)`، لذا يجمع بناء Sass مظهر Instructure مع الحفاظ على المواضيع في وقت التشغيل من خلال نفس الخصائص المخصصة. [toFoundationCss](functions/toFoundationCss.md) ينبعث طبقة CSS رقيقة تضع مظهر الفئات المترجمة الشائعة (`.button`, `.callout`، links) بنفس الطريقة — مفيد عندما تستهلك CSS Foundation القياسي وتريد فقط تطبيق ألوان Instructure على الأعلى بدون إعادة ترجمة.

## Example

```ts
import { foundationSettings, foundationCss } from "@pantoken/foundation";
// foundationSettings → a Sass partial; foundationCss → a runtime overlay.
```

## Interfaces

- [ToFoundationSettingsOptions](interfaces/ToFoundationSettingsOptions.md)
- [ToFoundationCssOptions](interfaces/ToFoundationCssOptions.md)

## Variables

- [FOUNDATION\_TO\_INSTUI](variables/FOUNDATION_TO_INSTUI.md)
- [foundationSettings](variables/foundationSettings.md)
- [foundationCss](variables/foundationCss.md)

## Functions

- [toFoundationSettings](functions/toFoundationSettings.md)
- [toFoundationCss](functions/toFoundationCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [foundationCss](variables/foundationCss.md)
