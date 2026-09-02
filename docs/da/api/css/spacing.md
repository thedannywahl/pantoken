# CSS: spacing

`.--p-md` — Margin- og padding-hjælpeprogrammer — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` og `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` på afstandsskalaen (sider `t`/`b`/`s`/`e`/`x`/`y` eller ingen, stavet kort eller fuldt langt — for eksempel `--mb-sm` og `--margin-bottom-small` er den samme regel; margin accepterer også `auto`). Kan bruges bare eller kædet på enhver komponent (for eksempel `class="instui-view --mb-sm"`).

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## Brug

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:spacing
```

## Eksempler

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.--p-md` | Anvender medium padding på alle sider. |
| `.--m*` | Margin-hjælpeprogrammer på tværs af korte, legacy-lange og fuldt lange stavemåder. |
| `.--p*` | Padding-hjælpeprogrammer på tværs af korte, legacy-lange og fuldt lange stavemåder. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

