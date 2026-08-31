# CSS: context-view

`.instui-context-view` — Una legenda elevada amb una punta, posicionable a qualsevol costat; funciona com a `[popover]` natiu.

La punta són dos triangles `::before`/`::after` apilats (límit després de farciment) perquè es llegeixi correctament contra una superfície compatible; com a `[popover]` necessita la mateixa connexió oberta/`popovertarget` que `popover`, però a diferència de `tooltip`, es descarta al clic extern o Escape.

**Font:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## Examples

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">
  A context view frames a callout with a caret. As a popover it rides the top layer and closes when
  you click away or press Esc.
</div>
```

## Modifiers

| Modifier             | Description                                |
| -------------------- | ------------------------------------------ |
| `.-color-inverse`    | Esquema de color fosc (invers).            |
| `.-placement-bottom` | Seure per sota de l'ancla.                 |
| `.-placement-end`    | Seure al final (inline-end) de l'ancla.    |
| `.-placement-start`  | Seure a l'inici (inline-start) de l'ancla. |
| `.-placement-top`    | Seure per sobre de l'ancla.                |

## Pseudo-elements

| Pseudo-element | Description                                               |
| -------------- | --------------------------------------------------------- |
| `::after`      | Renderitza el triangle de farciment interior de la punta. |
| `::before`     | Renderitza el triangle de límit exterior de la punta.     |

## States

| State          | Description |
| -------------- | ----------- |
| `:state(open)` | —           |

## Conditions

| Type     | Query                        | Description |
| -------- | ---------------------------- | ----------- |
| supports | `(position-area: block-end)` | —           |

## Tokens consumed

| Token                                                            | Type                | Value                          |
| ---------------------------------------------------------------- | ------------------- | ------------------------------ |
| `--instui-color-background-elevated-surface-base`                | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-color-background-inverse`                              | `<color>`           | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-base`                                       | `<color>`           | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-inverse`                                    | `<color>`           | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-context-view-arrow-background-color`         | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-component-context-view-arrow-background-color-inverse` | `<color>`           | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-context-view-arrow-border-color`             | `<color>`           | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-context-view-arrow-border-color-inverse`     | `<color>`           | `#00000000`                    |
| `--instui-component-context-view-arrow-border-width`             | `<length>`          | `0.0625rem`                    |
| `--instui-component-context-view-arrow-size`                     | `<length>`          | `0.5rem`                       |
| `--instui-component-context-view-border-radius`                  | `<length>`          | `0.75rem`                      |
| `--instui-elevation-above`                                       | `none \| <shadow>#` | —                              |
| `--instui-spacing-space-lg`                                      | `<length>`          | `1rem`                         |
| `--instui-spacing-space-md`                                      | `<length>`          | `0.75rem`                      |

## Browser support

- Utilitza el posicionament de l'ancla CSS (`position-anchor`, `position-area`, `position-try-fallbacks`) i la API `[popover]` nativa darrere d'una protecció `@supports`; necessita un Chromium o Safari recent, i torna a una finestra emergent centrada en UA en altres casos.

## Related

- [popover](/ca/api/css/popover.md) — La finestra emergent genèrica de capa superior.
- [tooltip](/ca/api/css/tooltip.md) — Una legenda més petita que apareix al mantenir o en enfocament.
