# CSS: testimonial

`div[class~="instui-testimonial"]` — عرض اقتباس أو شهادة مع الإسناد وصور اختيارية.

✅ استخدم Testimonial عندما:

- عرض شهادات واقتباسات العملاء أو المستخدمين
- تريد إبراز عبارة بتأكيد بصري
- الإسناد والسياق (الاسم، المسمى، الصورة) مهمان
🚫 لا تستخدم Testimonial عندما:

- عرض اقتباسات مضمنة داخل نص الفقرة — استخدم عنصر الاقتباس (blockquote) بدلًا من ذلك
- العبارة هي محور التركيز — استخدم Hero أو Card بدلًا من ذلك

## سهولة الوصول

- استخدم `&lt;blockquote&gt;` دلاليًا للاقتباس
- تأكد أن الإسناد واضح ومرتبط بالاقتباس
- إذا كنت تستخدم صورًا، قدّم نصًا بديلاً

## الاستخدام

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.instui-author` | اسم مؤلف الإسناد. |
| `.instui-avatar` | صورة ملف تعريف المؤلف (اختياري). |
| `.instui-content` | حاوية للاقتباس والإسناد. |
| `.instui-quote` | النص المقتبس. |
| `.instui-title` | مسمى المؤلف أو انتماؤه (اختياري). |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:optional` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background` | — | — |
| `--instui-color-primary` | — | — |
| `--instui-color-surface` | — | — |
| `--instui-color-text-primary` | — | — |
| `--instui-color-text-secondary` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-font-weight-semibold` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-space-large` | — | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## ذات صلة

- [card](/ar/api/css/card.md)

