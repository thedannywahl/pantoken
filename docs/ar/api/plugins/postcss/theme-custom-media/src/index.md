[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-theme-custom-media` — أنشئ مع معرّفات مخصصة للمظهر (`@media (theme: &lt;name&gt;)`) و/أو أسماء مستعارة لـ `@media (--theme-*)`، ثم أصدر CSS محسوسًا للمظهر المستهدف المختار.

يوسّع المكون الإضافي أسماء `--theme-*` و `--breakpoint-*` المستعارة المدمجة، وينقي فروع المظهر غير المستهدفة، ويزيل بنود `theme:*` المطابقة من الاستعلامات المحفوظة، وينفض أغلفة الوسائط ذات المظهر الفقط دائمة الصحة، ويزيل إعلانات `@custom-media --theme-*`/`--breakpoint-*` من CSS المصدر.

## Interfaces

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## Type Aliases

- [Theme](type-aliases/Theme.md)

## Variables

- [themeCustomMedia](variables/themeCustomMedia.md)

## References

### default

يعيد تسمية وإعادة تصدير [themeCustomMedia](variables/themeCustomMedia.md)
