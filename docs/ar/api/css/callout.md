# CSS: callout

`div[class~="instui-callout"]` — تنبيه معلومات مضمن لتذكير قصير أو ملاحظة.

✅ استخدم Callout عندما:

- تحتاج إلى تسليط الضوء على معلومات مهمة أو تذكيرات مضمنة
- الرسالة قصيرة نسبيًا (جملة إلى فقرة قصيرة)
- يجب أن ينجذب التنبيه الانتباه دون مقاطعة التدفق الرئيسي
  🚫 لا تستخدم Callout عندما:

- الرسالة تتطلب تفاعل أو إجراءات متعددة — استخدم Modal أو Alert Dialog
- المحتوى هو التركيز الرئيسي للصفحة — استخدم تخطيط Card أو Hero بدلاً من ذلك

## Accessibility

- تأكد من تطبيق دور التنبيه بشكل صحيح (role="alert" أو role="status")
- استخدم تباين ألوان دلالي يلبي معايير WCAG AA
- لا تعتمد على اللون وحده لنقل المعنى

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot      | Description         |
| --------- | ------------------- |
| `message` | محتوى رسالة التنبيه |

## Parts

| Part              | Description                   |
| ----------------- | ----------------------------- |
| `.instui-content` | حاوية محتوى النص.             |
| `.instui-icon`    | رمز اختياري على يسار المحتوى. |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-border`     | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-size-small`            | `<length>` | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [alert](/ar/api/css/alert.md)
