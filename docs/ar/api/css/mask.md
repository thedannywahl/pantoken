# CSS: mask

`.instui-mask` — تراكب داخل التدفق يملأ الأصل المحدد له ويركّز محتواه — على سبيل المثال، مؤشر تحميل فوق بطاقة. بالنسبة لنافذة منبثقة، يُفضّل استخدام `&lt;dialog&gt;` الأصلي (ـ`::backdrop` هو القناع). كل مُعَدِّل من هذه المتغيرات متاح أيضاً على مستوى عالمي (بشكل عاري، أو متسلسل على أي مكوّن آخر) — انظر أداة `mask` العالمية.

**المصدر:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## أمثلة

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-blur` | طمس ما خلف القناع باستخدام backdrop-filter. |
| `.-fullscreen` | مثبت بالنسبة للنافذة (viewport)، ويغطيها عند z-index عالٍ. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

