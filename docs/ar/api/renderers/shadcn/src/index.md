[pantoken](../../../index.md) / shadcn

# shadcn

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/shadcn` — ثيم shadcn/ui برموز Instructure.

[toShadcnCss](functions/toShadcnCss.md) يصدر كتلة `:root` تشير متغيرات CSS الخاصة بـ shadcn إلى `var(--instui-*)`.
ضعها إلى جانب `@pantoken/css` (الذي يحدد الخصائص المخصصة) ومكونات shadcn
تتبنى مظهر Instructure. تتوافق الرموز بحرية — يستخدم كل من shadcn و Instructure Lucide.

## Interfaces

- [ToShadcnCssOptions](interfaces/ToShadcnCssOptions.md)

## Variables

- [shadcnCss](variables/shadcnCss.md)
- [SHADCN\_TO\_INSTUI](variables/SHADCN_TO_INSTUI.md)

## Functions

- [toShadcnCss](functions/toShadcnCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [shadcnCss](variables/shadcnCss.md)
