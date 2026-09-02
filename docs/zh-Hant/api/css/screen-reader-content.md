# CSS: screen-reader-content

`.instui-screen-reader-content` — Visually hides content while keeping it available to assistive tech (the standard clip pattern).

**Source:** [screen-reader-content.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/screen-reader-content/screen-reader-content.css)

## 無障礙

Keeps text in the accessibility tree for screen readers while removing it from the visual layout.

## 使用方法

```css
@import "@pantoken/components/components.css";
```

## 範例

```html
<a class="instui-link" href="#examples" target="_blank">example</a>
<span class="instui-screen-reader-content">Opens in a new window</span>
```

