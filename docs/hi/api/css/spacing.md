# CSS: spacing

`.--p-md` — Margin and padding utilities — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` and `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` on the spacing scale (sides `t`/`b`/`s`/`e`/`x`/`y` or none, spelled short or fully long — for example `--mb-sm` and `--margin-bottom-small` are the same rule; margin also takes `auto`). Usable bare or chained onto any component (for example `class="instui-view --mb-sm"`).

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## उपयोग

```css
@import "@pantoken/components/utilities.css";
```

## डेमो

```demo
self:spacing
```

## उदाहरण

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## मॉडिफायर

| मॉडिफायर | विवरण |
| --- | --- |
| `.--p-md` | Applies medium padding on all sides. |
| `.--m*` | Margin utilities across short, legacy-long, and fully long spellings. |
| `.--p*` | Padding utilities across short, legacy-long, and fully long spellings. |

## उपयोग किये गए टोकन

| टोकन | प्रकार | मान |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

