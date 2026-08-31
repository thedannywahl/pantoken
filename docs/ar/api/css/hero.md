# CSS: hero

`div[class~="instui-hero"]` — قسم رأس بعرض كامل مع عنوان وعنوان فرعي وصورة خلفية اختيارية.

✅ استخدم Hero عند:

- تحتاج إلى رأس صفحة بارز مع تسلسل هرمي بصري
- تستفيد الصفحة من قسم افتتاح كبير وجذاب
- تريد تضمين صور الخلفية أو لمسات التدرج

- بناء رأس صفحة بسيط — استخدم Page-Layout بدلاً من ذلك
- يتنافس البطل مع المحتوى الحرج — أولويات القراءة

## Accessibility

- تأكد من أن العنوان موجود في علامة `&lt;h1&gt;` للبنية الدلالية
- إذا كنت تستخدم صور الخلفية، فوفر تباين لون كافٍ للنص
- تجنب التشغيل التلقائي للفيديو أو الرسوم المتحركة التي قد تلهي عن المحتوى

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot       | Description                |
| ---------- | -------------------------- |
| `subtitle` | محتوى العنوان الفرعي للبطل |
| `title`    | محتوى عنوان البطل          |

## Parts

| Part                 | Description                              |
| -------------------- | ---------------------------------------- |
| `.instui-actions`    | أزرار أو روابط إجراء اختيارية.           |
| `.instui-background` | طبقة خلفية اختيارية (صورة أو تدرج).      |
| `.instui-content`    | حاوية لنص وإجراءات البطل.                |
| `.instui-overlay`    | طبقة شفافة نصفية اختيارية لتباين النص.   |
| `.instui-subtitle`   | نص داعم أو وصف اختياري.                  |
| `.instui-title`      | عنوان البطل الرئيسي (عادة `&lt;h1&gt;`). |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-primary-background` | —          | —     |
| `--instui-font-size-hero`           | `<length>` | —     |
| `--instui-font-size-large`          | `<length>` | —     |
| `--instui-font-weight-bold`         | —          | —     |
| `--instui-space-large`              | —          | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [card](/ar/api/css/card.md)
