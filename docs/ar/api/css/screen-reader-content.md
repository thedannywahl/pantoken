# CSS: screen-reader-content

`.instui-screen-reader-content` — يخفي المحتوى بصريًا مع إبقائه متاحًا لتقنيات المساعدة (نمط القص القياسي).

**المصدر:** [screen-reader-content.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/screen-reader-content/screen-reader-content.css)

## سهولة الوصول

يحافظ على النص في شجرة إمكانية الوصول لقرّاء الشاشة مع إزالته من التخطيط المرئي.

## الاستخدام

```css
@import "@pantoken/components/components.css";
```

## أمثلة

```html
<a class="instui-link" href="#examples" target="_blank">example</a>
<span class="instui-screen-reader-content">Opens in a new window</span>
```

