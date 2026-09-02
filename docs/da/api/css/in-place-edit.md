# CSS: in-place-edit

`.instui-in-place-edit` — En [contenteditable], der læses som tekst, indtil den fokuseres, og derefter viser inputkrom.

Inputkromet vises kun, når det fokuseres; `-readonly` undertrykker både hover- og fokus-affordances, så elementet altid læses som almindelig inline-tekst.

**Kilde:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->
> [!TIP]
> **JS-forbedring** — Denne components CSS gengives og fungerer på sin egen; parrer den med `@pantoken/interactions` for at tilføje den interaktive opførsel. Se [modifikator-tabel nedenfor](#modifiers).


## Tilgængelighed

Giv det redigerbare element `role="textbox"` og et tilgængeligt navn (`aria-label`).

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## Demo

```demo
self:in-place-edit
```

## Eksempler

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-readonly` | Vist inline, men ikke redigerbar (ingen hover/fokus-indikation). |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-offset` | `<length>` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

## Relateret

- [text-input](/da/api/css/text-input.md) — Ved fokus viser det samme input-ramme som en tekstinput.

