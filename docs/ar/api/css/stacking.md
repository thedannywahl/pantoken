# CSS: stacking

`.--stack-topmost` — أدوات عمق z-index — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — قابلة للاستخدام بمفردها أو متسلسلة على أي مكوّن، بحيث تتراكم الطبقات بشكل متوقع بدلاً من أرقام مضبوطة يدويًا.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="--stack-topmost">Always on top.</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--stack-above` | فوق التدفق الافتراضي. |
| `.--stack-below` | أسفل التدفق الافتراضي. |
| `.--stack-deepest` | أدنى عمق تراكب. |
| `.--stack-topmost` | أعلى عمق تراكب (التراكبات، القوائم). |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-view-stacking-above` | `<integer>` | `1` |
| `--instui-component-view-stacking-below` | `<integer>` | `-1` |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999` |

