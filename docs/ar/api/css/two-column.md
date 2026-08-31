# CSS: two-column

`div[class~="instui-two-column"]` — تخطيط ثنائي الأعمدة مع مناطق محتوى يسار ويمين.

✅ استخدم Two-Column عندما:

- لديك منطقتا محتوى بأهمية متساوية تقريبًا
- مقارنة أو مقابلة مجموعتي محتوى جنبًا إلى جنب
- بناء تخطيط متجاوب يتكدس على الهاتف المحمول
  🚫 لا تستخدم Two-Column عندما:

- عمود واحد يهيمن على الصفحة — استخدم تخطيطًا غير متماثل بدلاً من ذلك
- المحتوى لا يستفيد من العرض جنبًا إلى جنب

## Accessibility

- تأكد من أن كلا العمودين قابل للإدراك والاستخدام على الأجهزة الضيقة
- استخدم علامات دلالية (على سبيل المثال، `&lt;section&gt;`) لتغليف محتوى العمود
- حافظ على مساحة وتباين كافيين بين الأعمدة

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                    |
| ----------------- | ------------------------------ |
| `.instui-divider` | فاصل بصري اختياري بين الأعمدة. |
| `.instui-left`    | منطقة محتوى العمود الأيسر.     |
| `.instui-right`   | منطقة محتوى العمود الأيمن.     |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Conditions

| Type  | Query                | Description |
| ----- | -------------------- | ----------- |
| media | `(max-width: 768px)` | —           |

## Tokens consumed

| Token                   | Type | Value |
| ----------------------- | ---- | ----- |
| `--instui-color-border` | —    | —     |
| `--instui-space-large`  | —    | —     |
| `--instui-space-medium` | —    | —     |

## Related

- [page-layout](/ar/api/css/page-layout.md)
