[pantoken](../../../../../index.md) / [plugins/postcss/theme-custom-media/src](../index.md) / themeCustomMedia

# Variable: themeCustomMedia

> `const` **themeCustomMedia**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أنشئ مكون إضافي خفض الوسائط المخصصة للمظهر.

يدعم الإنشاء باستخدام معرّفات مخصصة مباشرة للمظهر في ميزات الوسائط (على سبيل المثال، `(theme: canvas)`) أو أسماء `@custom-media --theme-*` المستعارة المدمجة.

## Type Declaration

## Parameters

### options?

[`ThemeCustomMediaOptions`](../interfaces/ThemeCustomMediaOptions.md)

[ThemeCustomMediaOptions](../interfaces/ThemeCustomMediaOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

مكون إضافي PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكون الإضافي PostCSS المطلوبة.
