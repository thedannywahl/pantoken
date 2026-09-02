# CSS: transition

`.instui-transition.-transition-fade-entering` — Animation state classes for the `Transition` component — `.instui-transition` and state classes (`-transition-fade-entering`, `-transition-scale-exited`, etc.) — usable bare or chained onto any component.

**Source:** [transition.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/transition/transition.css)

## 用法

```css
@import "@pantoken/components/utilities.css";
```

## 示例

```html
<div class="instui-transition -transition-fade-entering">Animated content</div>
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.-transition-*` | Transition type/state class toggled by runtime (`fade\|scale\|slide-*` + `entering\|entered\|exiting\|exited`). |
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

## 自定义属性

| 属性 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| `--duration` | `<time>` | `300ms` | Animation duration (default `300ms`); override to speed up or slow down every transition state. |
| `--timing` | `*` | `ease-in-out` | Animation timing function (default `ease-in-out`). |

