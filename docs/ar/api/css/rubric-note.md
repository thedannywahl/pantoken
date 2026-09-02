# CSS: rubric-note

`div[class~="instui-rubric-note"]` — ملاحظة منظمة مع فئات المقياس ومؤشرات الدرجات.

✅ استخدم Rubric-Note عندما:

- عرض مقياس التقييم أو معايير التقييم
- تحتاج إلى تنظيم المحتوى حسب الفئة مع درجات أو مؤشرات
- يجب أن يبرز التخطيط البنية والتسلسل الهرمي
🚫 لا تستخدم Rubric-Note عندما:

- عرض ملاحظات بسيطة أو تعليقات — استخدم Callout بدلاً من ذلك
- إذا كانت هناك حاجة لمنطق تقييم معقد — فكر في مكوّن مخصص

## سهولة الوصول

- استخدم دلالات الجدول إذا كنت تعرض مقياس تقييم حقيقي بصفوف وأعمدة
- تأكد أن مؤشرات الدرجات ليست معتمدة على اللون فقط
- قدّم تسميات وصفية لكل فئة

## الاستخدام

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.instui-criteria` | حاوية لصفوف معايير التقييم. |
| `.instui-description` | وصف مفصّل للمعيار. |
| `.instui-header` | رأس يحتوي على العنوان والبيانات الوصفية. |
| `.instui-name` | اسم المعيار أو الفئة. |
| `.instui-row` | صف معيار فردي. |
| `.instui-score` | مؤشر أو شارة للدرجة. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:optional` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background` | — | — |
| `--instui-color-border` | — | — |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-color-primary` | — | — |
| `--instui-color-surface` | — | — |
| `--instui-color-text-secondary` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-font-weight-semibold` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## ذات صلة

- [card](/ar/api/css/card.md)

