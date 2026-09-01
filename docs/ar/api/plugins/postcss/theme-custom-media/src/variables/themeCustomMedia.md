[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# متغير: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء إضافة لخفض custom-media في الثيم.

يدعم التأليف باستخدام إما custom-idents الخاصة بالثيم مباشرةً في ميزات الوسائط (على سبيل المثال,
`(theme: canvas)`) أو الأسماء المستعارة المدمجة `@custom-media --theme-*`.

## Type Declaration

## المعلمات

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

إضافة PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

مؤشّر مطلوب لإضافة PostCSS.
