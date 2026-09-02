# CSS: spacing

`.--p-md` — Utilitats de marge i farciment — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` i `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` a l'escala d'espaiat (costats `t`/`b`/`s`/`e`/`x`/`y` o cap, escrit curt o completament llarg — per exemple `--mb-sm` i `--margin-bottom-small` són la mateixa regla; el marge també accepta `auto`). Usable pur o encadenat a qualsevol component (per exemple `class="instui-view --mb-sm"`).

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:spacing
```

## Exemples

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.--p-md` | Aplica farciment mitjà a tots els costats. |
| `.--m*` | Utilitats de marge entre ortografies curtes, heretades-llargues i completament llargues. |
| `.--p*` | Utilitats de farciment entre ortografies curtes, heretades-llargues i completament llargues. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

