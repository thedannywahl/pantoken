# CSS: link

`.instui-link` — Un hipervincle estilitzat amb mides, una variant inversa per a fons foscos, i formes en línia o sense estil.

Estableix el seu propi `gap` responsiu entre una icona i el seu text (`-size-sm`/`-size-lg` l'escalonen); encadenar un modificador d'utilitat d'espaiat `-gap-*` substitueix aquest valor integrat.

**Font:** [link.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/link/link.css)

## Accessibility

Marca un enllaç desactivat amb `aria-disabled="true"`.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/link.css";
```

## Examples

```html
<a class="instui-link" href="#">A styled link</a>
```

## Modifiers

| Modifier          | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `.-color-inverse` | Per a fons foscos.                                              |
| `.-inline`        | Enllaç en línia, subratllat dins de text fluent.                |
| `.-lg`            | Enllaç gran en línia (utilitzat amb `-inline`).                 |
| `.-size-large`    | Gran. Àlias de forma llarga de `-size-lg`.                      |
| `.-size-lg`       | Gran.                                                           |
| `.-size-sm`       | Petit.                                                          |
| `.-size-small`    | Petit. Àlias de forma llarga de `-size-sm`.                     |
| `.-sm`            | Enllaç petit en línia (utilitzat amb `-inline`).                |
| `.-unstyled`      | Elimina l'estil de l'enllaç: hereta el color, sense subratllat. |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `:state(disabled)`       | —           |

## Tokens consumed

| Token                                                    | Type                                                                                                  | Value                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-link-font-family`                    | `[ <font-family-name> \| <generic-font-family> ]#`                                                    | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-font-size-lg`                   | `<length>`                                                                                            | `1.75rem`                                                                    |
| `--instui-component-link-font-size-md`                   | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-font-size-sm`                   | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-font-weight`                    | `<integer>`                                                                                           | `500`                                                                        |
| `--instui-component-link-gap-lg`                         | `<length>`                                                                                            | `0.25rem`                                                                    |
| `--instui-component-link-gap-md`                         | `<length>`                                                                                            | `0.25rem`                                                                    |
| `--instui-component-link-gap-sm`                         | `<length>`                                                                                            | `0.125rem`                                                                   |
| `--instui-component-link-inline-link-large-font-size`    | `<length>`                                                                                            | `1.75rem`                                                                    |
| `--instui-component-link-inline-link-large-font-weight`  | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-large-line-height`  | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-inline-link-medium-font-family` | `[ <font-family-name> \| <generic-font-family> ]#`                                                    | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-inline-link-medium-font-size`   | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-inline-link-medium-font-weight` | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-medium-line-height` | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-inline-link-small-font-size`    | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-inline-link-small-font-weight`  | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-small-line-height`  | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-line-height-lg`                 | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-line-height-md`                 | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-line-height-sm`                 | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-on-color-text-color`            | `<color>`                                                                                             | `#ffffff`                                                                    |
| `--instui-component-link-on-color-text-disabled-color`   | `<color>`                                                                                             | `light-dark(#C7CACD, #9EA6AD)`                                               |
| `--instui-component-link-on-color-text-hover-color`      | `<color>`                                                                                             | `light-dark(#DEEBFF, #ffffff)`                                               |
| `--instui-component-link-text-color`                     | `<color>`                                                                                             | `light-dark(#2369A4, #7FB4F1)`                                               |
| `--instui-component-link-text-decoration-outside-text`   | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none`                                                                       |
| `--instui-component-link-text-decoration-within-text`    | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `underline`                                                                  |
| `--instui-component-link-text-disabled-color`            | `<color>`                                                                                             | `light-dark(#8D959F, #576773)`                                               |
| `--instui-component-link-text-hover-color`               | `<color>`                                                                                             | `light-dark(#1A5281, #ACCDF7)`                                               |
| `--instui-component-link-unstyled-text-color`            | `<color>`                                                                                             | `light-dark(#273540, #F2F4F5)`                                               |

## Related

- [breadcrumb](/ca/api/css/breadcrumb.md) — Una pista de migradora es construeix a partir d'enllaços; també la seva alternativa de pantalla petita (parella amb l'utilitat `responsive` per canviar la Migradora per un Enllaç per sota de ~768px).
