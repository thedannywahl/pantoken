# CSS: icon

`.instui-icon` — The icon system: `.instui-icon` sizing plus the shared `-icon-<name>` painter that masks a glyph (in `currentColor`) before any element.

**Source:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibility

The glyph is decorative, so mark it `aria-hidden="true"`; give it a `role` or label only when the icon conveys meaning on its own.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifiers

| Modifier   | Description                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| `.-icon-*` | Set the glyph token (`--pantoken-glyph`) and render it via the shared painter (for example `-icon-search`). |

## Pseudo-elements

| Pseudo-element | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| `::before`     | The glyph itself: a 1em box masked from `--pantoken-glyph` and filled with `currentColor`. |

## Tokens consumed

| Token              | Type    | Value |
| ------------------ | ------- | ----- |
| `--pantoken-glyph` | `<url>` | —     |
