# CSS: side-nav-bar

`.instui-side-nav-bar` — سكة تنقل عمودية لعناصر الرموز فوق التسميات، بوضع رموز فقط مصغر.

يعين `gap` الخاص به بين عناصر التنقل و `padding` الخاص به؛ ربط معدل أداة المسافة `-gap-*`/`-p-*`/`-padding-*` يعكس تلك القيم المدمجة. انظر إلى عضو `side-nav-bar.item` لإدخالات التنقل الفردية.

**المصدر:** [item.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/side-nav-bar/members/item/item.css)

## Accessibility

أضف تسمية `&lt;nav&gt;` بـ aria-label حتى يتم الإعلان عنها كنقطة تنقل مسماة.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/side-nav-bar.css";
```

## Examples

```html
<nav class="instui-side-nav-bar" aria-label="Primary">
  <a class="item -selected" href="#">
    <span class="instui-icon -icon-house"></span>
    <span class="label">Home</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-inbox"></span>
    <span class="label">Inbox</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-calendar"></span>
    <span class="label">Calendar</span>
  </a>
  <a class="item" href="#">
    <span class="instui-icon -icon-settings"></span>
    <span class="label">Settings</span>
  </a>
</nav>
```

## Structure

```text
.instui-side-nav-bar
  side-nav-bar.item (component, 1..n)
```

```mermaid
flowchart TD
  n0[".instui-side-nav-bar"]:::cssdoc-root
  n1(["side-nav-bar.item"]):::cssdoc-component
  n0 -->|1..n| n1
  click n1 "/api/css/side-nav-bar.item.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier      | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| `.-icon-*`    | عرض رمز حرفي في كل عنصر تنقل.                                                        |
| `.-minimized` | الطي إلى رموز فقط (التسميات مخفية). @affects side-nav-bar.item — إخفاء تسمية العنصر. |

## Parts

| Part     | Description              |
| -------- | ------------------------ |
| `.label` | تسمية النص لعنصر التنقل. |

## Tokens consumed

| Token                                              | Type                                               | Value                                                                        |
| -------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-side-nav-bar-background-color` | `<color>`                                          | `light-dark(#ffffff, #273540)`                                               |
| `--instui-component-side-nav-bar-content-gap`      | `<length>`                                         | `0.25rem`                                                                    |
| `--instui-component-side-nav-bar-content-margin`   | `<length>`                                         | `0.375rem`                                                                   |
| `--instui-component-side-nav-bar-font-color`       | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-side-nav-bar-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-side-nav-bar-minimized-width`  | `<length>`                                         | `3.75rem`                                                                    |

## Subcomponents

- [side-nav-bar.item](/ar/api/css/side-nav-bar.item.md)
