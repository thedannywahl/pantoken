# CSS: maskglobal

`.--mask-overlay` — نسخة مزدوجة وعالمية من معدِّلات تراكب مكوّن `mask` — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — قابلة للاستخدام مباشرة أو متسلسلة على أي مكوّن، دون التغليف داخل عنصر `.instui-mask`.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<button class="instui-button --mask-overlay">…</button>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--mask-blur` | طمس ما خلف القناع باستخدام backdrop-filter. |
| `.--mask-fullscreen` | مثبت بالنسبة للنافذة (viewport)، ويغطيها عند z-index عالٍ. |
| `.--mask-overlay` | تراكب القناع الكامل (الموضع، التوسيط، الخلفية). |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

