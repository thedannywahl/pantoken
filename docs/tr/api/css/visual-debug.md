# CSS: visual-debug

`.-with-visual-debug` — A layout-debugging outline: compound `.-with-visual-debug` onto any element to outline the box and its immediate children, so a layout's structure is visible at a glance.

**Group:** Plugins · **Source:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

## Kullanım

```css
@import "@pantoken/plugin-visual-debug/visual-debug.css";
```

## Örnekler

```html
<div class="instui-view -with-visual-debug">
  <span>Outlined child.</span>
</div>
```

## Özel özellikler

| Özellik | Tür | Varsayılan | Açıklama |
| --- | --- | --- | --- |
| `--pantoken-visual-debug-color` | — | — | The outline colour (default a bright magenta); retint it to change every debug outline. |

## Tüketilen tokenler

| Token | Tür | Değer |
| --- | --- | --- |
| `--instui-logo-canvas-horizontal-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-icon-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-icon-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-icon-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-icon-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-stacked-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-stacked-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-stacked-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-canvas-stacked-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-icon-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-icon-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-icon-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-igniteai-icon-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-horizontal-full-color-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-full-color-bg` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-single-dot-reversed-bg` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-full-color-bg` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-instructure-icon-three-dot-reversed-bg` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-horizontal-light` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-icon-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-icon-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-icon-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-learnplatform-icon-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-horizontal-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-icon-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-icon-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-icon-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-icon-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-stacked-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-stacked-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-stacked-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-mastery-stacked-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-horizontal-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-horizontal-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-horizontal-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-horizontal-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-icon-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-icon-current-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-icon-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-icon-reversed` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-stacked-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-stacked-dark` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-stacked-full-color` | `<url>` | `url("data:image/svg+xml` |
| `--instui-logo-parchment-stacked-reversed` | `<url>` | `url("data:image/svg+xml` |

