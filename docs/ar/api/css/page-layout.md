# CSS: page-layout

`div[class~="instui-page-layout"]` — تخطيط صفحة بثلاثة أعمدة قياسي مع رأس وشريط جانبي ومحتوى رئيسي.

✅ استخدم Page-Layout عندما:

- تحتاج إلى بنية صفحة كلاسيكية مع مناطق التنقل والمحتوى
- تحتوي الصفحة على منطقة محتوى رئيسية واضحة يحيط بها مناطق تكميلية
- تريد تباعداً واتساقاً ثابتاً في التخطيط
  🚫 لا تستخدم Page-Layout عندما:

- بناء صفحة عمود واحد — استخدم تخطيطاً أبسط بدلاً من ذلك
- يتنافس الشريط الجانبي مع المحتوى الرئيسي على الأهمية

## Accessibility

- اربط منطقة المحتوى الرئيسي بـ `&lt;main&gt;` landmark
- أعط الشريط الجانبي `role="navigation"` أو `role="complementary"` حسب الحاجة
- تأكد من أن مناطق landmark لديها aria-labels مميزة

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                      |
| ----------------- | ------------------------------------------------ |
| `.instui-body`    | الجسم الرئيسي يحتوي على الشريط الجانبي والمحتوى. |
| `.instui-footer`  | منطقة التذييل السفلية.                           |
| `.instui-header`  | منطقة الرأس العلوية.                             |
| `.instui-main`    | منطقة المحتوى المركزية.                          |
| `.instui-sidebar` | العمود الأيسر للتنقل أو المساعد.                 |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-border`             | —          | —     |
| `--instui-color-footer-background`  | —          | —     |
| `--instui-color-footer-text`        | —          | —     |
| `--instui-color-header-background`  | —          | —     |
| `--instui-color-sidebar-background` | —          | —     |
| `--instui-font-size-small`          | `<length>` | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [wrapper](/ar/api/css/wrapper.md)
