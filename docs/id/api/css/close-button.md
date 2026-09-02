# CSS: close-button

`.instui-close-button` — A transparent icon button that draws its own × glyph, in three sizes plus an inverse variant.

Always renders as an icon-only control with no visible label, so an `aria-label` is required, not optional; compare to `button`'s `-without-background` ghost variant, which keeps a text label.

**Source:** [close-button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/close-button/close-button.css)

<!-- js-requirement -->
> [!TIP]
> **Peningkatan JS** — This component's CSS renders and works on its own; pair it with `@pantoken/interactions` to add the interactive behavior. See the [modifier table below](#modifiers).


## Aksesibilitas

Give the icon-only button an `aria-label` (e.g. "Close").

## Penggunaan

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/close-button.css";
```

## Contoh

```html
<button class="instui-close-button -size-sm" aria-label="Close"></button>
```

## Modifikator

| Modifikator | Deskripsi |
| --- | --- |
| `.-color-inverse` | For dark backgrounds. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |

## Pseudo-elemen

| Pseudo-elemen | Deskripsi |
| --- | --- |
| `::before` | The × glyph, masked in `currentColor`. |

## Token yang digunakan

| Token | Tipe | Nilai |
| --- | --- | --- |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-primary-inverse-ghost-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-icon-x` | `<image>` | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## Terkait

- [button](/id/api/css/button.md) — The general-purpose action button.

