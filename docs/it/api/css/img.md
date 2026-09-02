# CSS: img

`.instui-img` — A styled `&lt;img&gt;` with display, crop, and effect modifiers that stack.

Effects compose through the shared `--pantoken-img-filter` custom property, so `-with-grayscale` and `-with-blur` can apply together; the `-constrain-*` crop modifiers require the consumer to size the box explicitly.

**Source:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## Accessibilità

Provide meaningful `alt` text that describes the image, and use an empty `alt=""` for purely decorative images so assistive tech skips them.

## Uso

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## Esempi

```html
<img class="instui-img" alt="Gradient">
```

## Modificatori

| Modificatore | Descrizione |
| --- | --- |
| `.-constrain-contain` | Scale to fit within the box (contain). |
| `.-constrain-cover` | Scale to fill the box (cover). |
| `.-display-block` | Display as a block element. |
| `.-with-blur` | Apply a blur effect. |
| `.-with-grayscale` | Apply a grayscale effect. |

## Proprietà personalizzate

| Proprietà | Tipo | Predefinito | Descrizione |
| --- | --- | --- | --- |
| `--pantoken-img` | — | — | filter &lt;filter-value-list&gt; \| none — The composed CSS filter on the image; the effect modifiers set it, and you can override it for a custom filter. |

## Token consumati

| Token | Tipo | Valore |
| --- | --- | --- |
| `--instui-component-img-effect-transition-duration` | `<time>` | `1s` |
| `--instui-component-img-image-blur-amount` | `<length>` | `0.25em` |
| `--pantoken-img-filter` | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none` |

