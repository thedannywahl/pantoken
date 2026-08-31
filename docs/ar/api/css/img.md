# CSS: img

`.instui-img` — `&lt;img&gt;` مصمم مع معدلات العرض والقص والتأثير التي يتم تكديسها.

تتكون التأثيرات من خلال خاصية `--pantoken-img-filter` المخصصة المشتركة، لذا يمكن تطبيق `-with-grayscale` و `-with-blur` معاً؛ معدلات القص `-constrain-*` تتطلب من المستهلك تحجيم الصندوق بشكل صريح.

**المصدر:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## Accessibility

وفر نصاً ذا مغزى `alt` يصف الصورة، واستخدم `alt=""` فارغاً للصور الزخرفية البحتة بحيث تتخطاها التقنية المساعدة.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## Examples

```html
<img class="instui-img" alt="Gradient" />
```

## Modifiers

| Modifier              | Description                   |
| --------------------- | ----------------------------- |
| `.-constrain-contain` | مقياس يناسب الصندوق (احتواء). |
| `.-constrain-cover`   | مقياس لملء الصندوق (غطاء).    |
| `.-display-block`     | عرض كعنصر كتلة.               |
| `.-with-blur`         | تطبيق تأثير ضبابي.            |
| `.-with-grayscale`    | تطبيق تأثير الرمادي.          |

## Custom properties

| Property         | Type | Default | Description                                                                                                              |
| ---------------- | ---- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `--pantoken-img` | —    | —       | filter &lt;filter-value-list&gt; \| none — مرشح CSS المكون على الصورة؛ تعيين معدلات التأثير، ويمكنك استبداله بمرشح مخصص. |

## Tokens consumed

| Token                                               | Type                                                        | Value    |
| --------------------------------------------------- | ----------------------------------------------------------- | -------- |
| `--instui-component-img-effect-transition-duration` | `<time>`                                                    | `1s`     |
| `--instui-component-img-image-blur-amount`          | `<length>`                                                  | `0.25em` |
| `--pantoken-img-filter`                             | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none`   |
