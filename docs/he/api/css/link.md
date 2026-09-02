# CSS: link

`.instui-link` — A styled hyperlink with sizes, an inverse variant for dark backgrounds, and inline or unstyled forms.

Sets its own responsive `gap` between an icon and its text (`-size-sm`/`-size-lg` scale it); chaining a `-gap-*` spacing utility modifier overrides that built-in value.

**Source:** [link.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/link/link.css)

## נגישות

Mark a disabled link with `aria-disabled="true"`.

## שימוש

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/link.css";
```

## דוגמאות

```html
<a class="instui-link" href="#">A styled link</a>
```

## מחליפים

| מחליף | תיאור |
| --- | --- |
| `.-color-inverse` | For dark backgrounds. |
| `.-inline` | Inline link, underlined within flowing text. |
| `.-lg` | Large inline link (used with `-inline`). |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-sm` | Small inline link (used with `-inline`). |
| `.-unstyled` | Strip link styling: inherit colour, no underline. |

## מצבים

| מצב | תיאור |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `:state(disabled)` | — |

## אסימוני צריכה

| אסימון | סוג | ערך |
| --- | --- | --- |
| `--instui-component-link-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-font-size-lg` | `<length>` | `1.75rem` |
| `--instui-component-link-font-size-md` | `<length>` | `1rem` |
| `--instui-component-link-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-font-weight` | `<integer>` | `500` |
| `--instui-component-link-gap-lg` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-md` | `<length>` | `0.25rem` |
| `--instui-component-link-gap-sm` | `<length>` | `0.125rem` |
| `--instui-component-link-inline-link-large-font-size` | `<length>` | `1.75rem` |
| `--instui-component-link-inline-link-large-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-large-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-medium-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-inline-link-medium-font-size` | `<length>` | `1rem` |
| `--instui-component-link-inline-link-medium-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-medium-line-height` | `<length>` | `1.5rem` |
| `--instui-component-link-inline-link-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-link-inline-link-small-font-weight` | `<integer>` | `600` |
| `--instui-component-link-inline-link-small-line-height` | `<length>` | `0.875rem` |
| `--instui-component-link-line-height-lg` | `<length>` | `1.5rem` |
| `--instui-component-link-line-height-md` | `<length>` | `1rem` |
| `--instui-component-link-line-height-sm` | `<length>` | `0.875rem` |
| `--instui-component-link-on-color-text-color` | `<color>` | `#ffffff` |
| `--instui-component-link-on-color-text-disabled-color` | `<color>` | `light-dark(#C7CACD, #9EA6AD)` |
| `--instui-component-link-on-color-text-hover-color` | `<color>` | `light-dark(#DEEBFF, #ffffff)` |
| `--instui-component-link-text-color` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-component-link-text-decoration-outside-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none` |
| `--instui-component-link-text-decoration-within-text` | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `underline` |
| `--instui-component-link-text-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-link-text-hover-color` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-component-link-unstyled-text-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |

## קשור

- [breadcrumb](/he/api/css/breadcrumb.md) — A breadcrumb trail is built from links; also its small-screen fallback (pair with the `responsive` utility to swap Breadcrumb for a Link below ~768px).

