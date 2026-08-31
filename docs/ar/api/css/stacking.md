# CSS: stacking

`.--stack-topmost` — أدوات عمق z-index — `.--stack-&lt;level&gt;` (`deepest`، `below`، `above`، `topmost`) — قابل للاستخدام عارياً أو مسلسلاً على أي مكون، بحيث يتم تكديس الطبقات بشكل متوقع بدلاً من الأرقام المضبوطة يدويًا.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--stack-topmost">Always on top.</div>
```

## Modifiers

| Modifier           | Description                            |
| ------------------ | -------------------------------------- |
| `.--stack-above`   | فوق التدفق الافتراضي.                  |
| `.--stack-below`   | أسفل التدفق الافتراضي.                 |
| `.--stack-deepest` | أقل عمق التكديس.                       |
| `.--stack-topmost` | أعلى عمق التكديس (التراكبات والقوائم). |

## Tokens consumed

| Token                                      | Type        | Value   |
| ------------------------------------------ | ----------- | ------- |
| `--instui-component-view-stacking-above`   | `<integer>` | `1`     |
| `--instui-component-view-stacking-below`   | `<integer>` | `-1`    |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999`  |
