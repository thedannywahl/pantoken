# CSS: icon

`.instui-icon` — The icon system: `.instui-icon` sizing plus the shared `-icon-&lt;name&gt;` painter that masks a glyph (in `currentColor`) before any element.

**Source:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## 无障碍

The glyph is decorative, so mark it `aria-hidden="true"`; give it a `role` or label only when the icon conveys meaning on its own.

## 用法

```css
@import "@pantoken/components/components.css";
```

## 示例

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## 修饰符

| 修饰符 | 描述 |
| --- | --- |
| `.-icon-*` | Set the glyph token (`--pantoken-glyph`) and render it via the shared painter (for example `-icon-search`). |

## 伪元素

| 伪元素 | 描述 |
| --- | --- |
| `::before` | The glyph itself: a 1em box masked from `--pantoken-glyph` and filled with `currentColor`. |

## 消耗代币

| 代币 | 类型 | 值 |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

