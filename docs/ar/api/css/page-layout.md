# CSS: page-layout

`div[class~="instui-page-layout"]` — تخطيط صفحة قياسي ذو ثلاثة أعمدة مع ترويسة، شريط جانبي، والمحتوى الرئيسي.

✅ استخدم Page-Layout عندما:

- تحتاج إلى بنية صفحة كلاسيكية تحتوي على مناطق للتنقل والمحتوى
- تحتوي الصفحة على منطقة محتوى رئيسية واضحة تحيط بها مناطق مكملة
- تريد تباعدًا ومحاذاة متسقين عبر التخطيط
🚫 لا تستخدم Page-Layout عندما:

- بناء صفحة بعمود واحد — استخدم تخطيطًا أبسط بدلًا من ذلك
- الشريط الجانبي يتنافس مع المحتوى الرئيسي على الأهمية

## سهولة الوصول

- اربط منطقة المحتوى الرئيسي بعلامة `&lt;main&gt;`
- امنح الشريط الجانبي `role="navigation"` أو `role="complementary"` حسب الاقتضاء
- تأكد من أن مناطق العلامات تمتلك aria-labels مميزة

## الاستخدام

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.instui-body` | المحتوى الرئيسي الذي يحتوي على الشريط الجانبي والمحتوى. |
| `.instui-footer` | منطقة التذييل السفلية. |
| `.instui-header` | منطقة الرأس العلوية. |
| `.instui-main` | منطقة المحتوى المركزية. |
| `.instui-sidebar` | عمود التنقل الأيسر أو العمود المساعد. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `:optional` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-color-footer-background` | — | — |
| `--instui-color-footer-text` | — | — |
| `--instui-color-header-background` | — | — |
| `--instui-color-sidebar-background` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |

## ذات صلة

- [wrapper](/ar/api/css/wrapper.md)

