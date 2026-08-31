# CSS: testimonial

`div[class~="instui-testimonial"]` — عرض اقتباس أو شهادة مع نسب وصور اختيارية.

✅ استخدم الشهادة عندما:

- عرض شهادات العملاء والمستخدمين والاقتباسات
- تريد تسليط الضوء على بيان بتأكيد مرئي
- النسب والسياق (الاسم والعنوان والصورة) مهمة
  🚫 لا تستخدم الشهادة عندما:

- عرض الاقتباسات المدمجة في نص الجسم — استخدم عنصر blockquote بدلاً من ذلك
- البيان هو التركيز الرئيسي — استخدم Hero أو Card بدلاً من ذلك

## Accessibility

- استخدم `&lt;blockquote&gt;` بشكل دلالي للاقتباس
- تأكد من أن النسب واضح ومرتبط بالاقتباس
- إذا كنت تستخدم الصور، فقدم نص بديل

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                         |
| ----------------- | ----------------------------------- |
| `.instui-author`  | اسم مؤلف النسب.                     |
| `.instui-avatar`  | صورة ملف تعريف المؤلف الاختيارية.   |
| `.instui-content` | حاوية للاقتباس والنسب.              |
| `.instui-quote`   | النص المقتبس.                       |
| `.instui-title`   | عنوان المؤلف أو الانتماء الاختياري. |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                           | Type       | Value |
| ------------------------------- | ---------- | ----- |
| `--instui-color-background`     | —          | —     |
| `--instui-color-primary`        | —          | —     |
| `--instui-color-surface`        | —          | —     |
| `--instui-color-text-primary`   | —          | —     |
| `--instui-color-text-secondary` | —          | —     |
| `--instui-font-size-small`      | `<length>` | —     |
| `--instui-font-weight-semibold` | —          | —     |
| `--instui-radius-medium`        | —          | —     |
| `--instui-space-large`          | —          | —     |
| `--instui-space-medium`         | —          | —     |
| `--instui-space-small`          | —          | —     |

## Related

- [card](/ar/api/css/card.md)
