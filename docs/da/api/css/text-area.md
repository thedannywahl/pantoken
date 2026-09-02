# CSS: text-area

`.instui-text-area` — Et stiliseret, størrelses-tilpasbart native `&lt;textarea&gt;` med samme tilstande og størrelser som tekstinput.

Deler sin kant, baggrund og fokustilstande med `text-input` og `simple-select`; kun `resize: vertical` og den højere minimumshøjde er unik for det.

**Kilde:** [text-area.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-area/text-area.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-area.css";
```

## Eksempler

```html
<textarea class="instui-text-area" placeholder="Write a comment…"></textarea>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-disabled` | Deaktiveret tilstand. |
| `.-invalid` | Ugyldigt (fejl) tilstand. |
| `.-readonly` | Skrivebeskyttet tilstand. |
| `.-size-large` | Stor. Langt-form alias af `-size-lg`. |
| `.-size-lg` | Stor. |
| `.-size-md` | (standard) Mellem. |
| `.-size-medium` | (standard) Mellem. Langt alias af `-size-md`. |
| `.-size-sm` | Lille. |
| `.-size-small` | Lille. Langt-form alias af `-size-sm`. |
| `.-success` | Succestilstand (gyldig). |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::placeholder` | Pladsholder-teksten i en dæmpet farve, der skifter ved hovering. |

## Tilstande

| Tilstand | Beskrivelse |
| --- | --- |
| `:disabled` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-text-area-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-area-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-text-area-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-area-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-text-area-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-area-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-text-area-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-text-area-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-area-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-text-area-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-text-area-error-border-color` | `<color>` | `#CF1F24` |
| `--instui-component-text-area-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-area-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-text-area-font-size-md` | `<length>` | `1rem` |
| `--instui-component-text-area-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-text-area-font-weight` | `<integer>` | `400` |
| `--instui-component-text-area-padding` | `<length>` | `0.75rem` |
| `--instui-component-text-area-placeholder-color` | `<color>` | `light-dark(#5F6E7A, #7E8792)` |
| `--instui-component-text-area-placeholder-hover-color` | `<color>` | `light-dark(#334450, #9EA6AD)` |
| `--instui-component-text-area-success-border-color` | `<color>` | `light-dark(#037D37, #3EA75B)` |
| `--instui-component-text-area-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-area-text-disabled-color` | `<color>` | `light-dark(#8D959F, #9EA6AD)` |
| `--instui-component-text-area-text-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |

## Relateret

- [text-input](/da/api/css/text-input.md) — Den enkeltlinje modpart med samme tilstande og størrelser.

