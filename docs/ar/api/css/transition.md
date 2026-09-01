# CSS: transition

`.instui-transition.-transition-fade-entering` — فئات حالة الرسوم المتحركة لمكوّن `Transition` — `.instui-transition` وفئات الحالة (`-transition-fade-entering`, `-transition-scale-exited`, إلخ) — قابلة للاستخدام منفردة أو مُتسلسلة على أي مكوّن.

**المصدر:** [transition.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/transition/transition.css)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="instui-transition -transition-fade-entering">Animated content</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-transition-*` | نوع الانتقال/فئة الحالة التي يقوم وقت التشغيل بتبديلها (`fade\|scale\|slide-*` + `entering\|entered\|exiting\|exited`). |
| `.-transition-fade-entered` | — |
| `.-transition-fade-entering` | — |
| `.-transition-fade-exited` | — |
| `.-transition-fade-exiting` | — |
| `.-transition-scale-entered` | — |
| `.-transition-scale-entering` | — |
| `.-transition-scale-exited` | — |
| `.-transition-scale-exiting` | — |
| `.-transition-slide-down-entered` | — |
| `.-transition-slide-down-entering` | — |
| `.-transition-slide-down-exited` | — |
| `.-transition-slide-down-exiting` | — |
| `.-transition-slide-left-entered` | — |
| `.-transition-slide-left-entering` | — |
| `.-transition-slide-left-exited` | — |
| `.-transition-slide-left-exiting` | — |
| `.-transition-slide-right-entered` | — |
| `.-transition-slide-right-entering` | — |
| `.-transition-slide-right-exited` | — |
| `.-transition-slide-right-exiting` | — |
| `.-transition-slide-up-entered` | — |
| `.-transition-slide-up-entering` | — |
| `.-transition-slide-up-exited` | — |
| `.-transition-slide-up-exiting` | — |

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--duration` | `<time>` | `300ms` | مدة الحركة (الافتراضي `300ms`); يمكنك تجاوزها لتسريع أو إبطاء كل حالة انتقال. |
| `--timing` | `*` | `ease-in-out` | دالة توقيت الحركة (الافتراضي `ease-in-out`). |

