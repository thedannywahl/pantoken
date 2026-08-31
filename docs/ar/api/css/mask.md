# CSS: mask

`.instui-mask` — طبقة علوية في التدفق تملأ العنصر الأب المتموضع وتوسط محتواه — على سبيل المثال، دوّار فوق بطاقة. بالنسبة إلى مربع حوار، فضّل عنصر أصلي `&lt;dialog&gt;` (الخاص به `::backdrop` هو القناع). كل واحد من هذه المعدّلات متاح أيضًا عالميًا (عاري، أو متسلسل على أي مكون آخر) — انظر إلى أداة `mask` العالمية.

**المصدر:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## Examples

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## Modifiers

| Modifier       | Description                                      |
| -------------- | ------------------------------------------------ |
| `.-blur`       | طمّس ما يقع خلف القناع باستخدام backdrop-filter. |
| `.-fullscreen` | ثابت على الإطار المرئي، يغطيه برقم z-index عالي. |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |
