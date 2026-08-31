# CSS: rubric-note

`div[class~="instui-rubric-note"]` — ملاحظة منظمة مع فئات المعايير ومؤشرات الدرجات.

✅ استخدم Rubric-Note عندما:

- عرض معايير التقييم أو معايير التقييم
- تحتاج إلى هيكلة المحتوى حسب الفئة مع الدرجات أو المؤشرات
- يجب أن يؤكد التخطيط على الهيكل والتسلسل الهرمي
  🚫 لا تستخدم Rubric-Note عندما:

- عرض ملاحظات أو تعليقات بسيطة — استخدم Callout بدلاً من ذلك
- منطق التقييم المعقد مطلوب — فكر في مكون مخصص

## Accessibility

- استخدم دلالات الجدول إذا كنت تعرض معايير حقيقية بصفوف وأعمدة
- تأكد من أن مؤشرات الدرجات ليست بالألوان فقط
- قدم تسميات وصفية لكل فئة

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part                  | Description                       |
| --------------------- | --------------------------------- |
| `.instui-criteria`    | حاوية لصفوف معايير المعايير.      |
| `.instui-description` | وصف مفصل للمعيار.                 |
| `.instui-header`      | رأس مع العنوان والبيانات الوصفية. |
| `.instui-name`        | اسم المعيار أو الفئة.             |
| `.instui-row`         | صف معيار فردي.                    |
| `.instui-score`       | مؤشر النقاط أو الشارة.            |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-background`      | —          | —     |
| `--instui-color-border`          | —          | —     |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-color-primary`         | —          | —     |
| `--instui-color-surface`         | —          | —     |
| `--instui-color-text-secondary`  | —          | —     |
| `--instui-font-size-small`       | `<length>` | —     |
| `--instui-font-weight-semibold`  | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [card](/ar/api/css/card.md)
