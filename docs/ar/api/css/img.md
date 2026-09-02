# CSS: img

`.instui-img` — `&lt;img&gt;` مزوَّد بأنماط للعرض والقص والتأثيرات تتراكم معًا.

تتداخل التأثيرات عبر الخاصية المخصّصة المشتركة `--pantoken-img-filter`، لذا يمكن لـ `-with-grayscale` و `-with-blur` التطبيق معًا؛ تتطلّب معدّلات قص `-constrain-*` من المستهلك تحديد حجم الصندوق صراحةً.

**المصدر:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## سهولة الوصول

قدّم نصًا مفيدًا في `alt` يصف الصورة، واستخدم `alt=""` فارغًا للصور الزخرفية حتى تتجاوزها تقنيات المساعدة.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## أمثلة

```html
<img class="instui-img" alt="Gradient">
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-constrain-contain` | تخصيص المقياس ليتناسب داخل الصندوق (contain). |
| `.-constrain-cover` | تخصيص المقياس لملء الصندوق بالكامل (cover). |
| `.-display-block` | عرض كعنصر كتلي (block). |
| `.-with-blur` | تطبيق تأثير ضبابي (blur). |
| `.-with-grayscale` | تطبيق تأثير تدرّج الرمادي (grayscale). |

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--pantoken-img` | — | — | filter &lt;filter-value-list&gt; \| none — مرشح CSS المركب على الصورة؛ معدّلات التأثير تحدده، ويمكنك استبداله لمرشح مخصّص. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-img-effect-transition-duration` | `<time>` | `1s` |
| `--instui-component-img-image-blur-amount` | `<length>` | `0.25em` |
| `--pantoken-img-filter` | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none` |

