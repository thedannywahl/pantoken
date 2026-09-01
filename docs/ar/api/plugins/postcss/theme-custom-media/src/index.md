[pantoken](../../../../index.md) / theme-custom-media

# theme-custom-media

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-theme-custom-media` — المؤلف مع theme custom-idents
(`@media (theme: &lt;name&gt;)`) و/أو `@media (--theme-*)` أسماء مستعارة، ثم يصدر CSS ملموسًا لثيم الهدف المختار.

يقوم البرنامج المساعد بتوسيع الأسماء المستعارة المدمجة `--theme-*` و`--breakpoint-*`، ويقلم فروع الثيم غير المستهدفة، ويزيل عبارات `theme:*` المطابقة من الاستعلامات المحفوظة، ويفك تغليف أغلفة الوسائط الخاصة بالثيم التي تكون دائمًا صحيحة، ويزيل التصريحات `@custom-media --theme-*`/`--breakpoint-*` من CSS المُصدَر.

## واجهات

- [ThemeCustomMediaOptions](interfaces/ThemeCustomMediaOptions.md)

## أسماء أنواع مستعارة

- [Theme](type-aliases/Theme.md)

## المتغيرات

- [themeCustomMedia](variables/themeCustomMedia.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [themeCustomMedia](variables/themeCustomMedia.md)
