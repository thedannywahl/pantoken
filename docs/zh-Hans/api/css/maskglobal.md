# CSS: maskglobal

`.--mask-overlay` — A global, dual copy of the `mask` component's overlay modifiers — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — usable bare or chained onto any component, without wrapping in a `.instui-mask` element.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## 用法

```css
@import "@pantoken/components/utilities.css";
```

## 示例

```html
<button class="instui-button --mask-overlay">…</button>
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.--mask-blur` | Blur what's behind the mask with a backdrop-filter. |
| `.--mask-fullscreen` | Fixed to the viewport, covering it at a high z-index. |
| `.--mask-overlay` | The full mask overlay (position, centring, background). |

## 消耗代币

| 代币 | 类型 | 值 |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

