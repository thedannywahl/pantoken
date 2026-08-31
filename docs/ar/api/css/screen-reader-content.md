# CSS: screen-reader-content

`.instui-screen-reader-content` — إخفاء المحتوى بصريًا مع الحفاظ على توفره للتقنيات المساعدة (نمط القص القياسي).

**المصدر:** [screen-reader-content.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/screen-reader-content/screen-reader-content.css)

## Accessibility

يحافظ على النص في شجرة إمكانية الوصول لقارئات الشاشة مع إزالته من التخطيط البصري.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<a class="instui-link" href="#examples" target="_blank">example</a>
<span class="instui-screen-reader-content">Opens in a new window</span>
```
