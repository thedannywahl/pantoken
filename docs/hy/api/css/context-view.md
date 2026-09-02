# CSS: context-view

`.instui-context-view` — Բարձրացված հրահանգ կազմիչ հետ, ցանկացած կողմից տեղադրել; գործում է որպես ծանուցիչ `[popover]`:

Կազմիչն երկու շարակցված `::before`/`::after` եռանկյունիներ է (եզր ապա լրացում), ուստի այն ճիշտ կարդացվում է համապատասխան մակերեսի դեմ; որպես `[popover]` այն պետք է ունենա նույն բաց/`popovertarget` կաբելներ `popover`-ի պես, բայց ի տարբերություն `tooltip`-ի, այն վերացվում է արտաքին կտտոցի կամ Escape-ի վրա:

**Աղբյուր:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## Օրինակներ

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-color-inverse` | Մութ (հակադարձ) գույնի սխեմա: |
| `.-placement-bottom` | Նստեք խարիսխից ներքեւ: |
| `.-placement-end` | Նստեք խարիսխից վերջում (inline-end): |
| `.-placement-start` | Նստեք խարիսխից սկզբում (inline-start): |
| `.-placement-top` | Նստեք խարիսխից վերեւ: |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::after` | Պատկերել կազմիչի ներքին լրացման եռանկյունին: |
| `::before` | Պատկերել կազմիչի արտաքին եզրի եռանկյունին: |

## Փոփոխական վիճակներ

| Վիճակ | Նկարագիր |
| --- | --- |
| `:state(open)` | — |

## Պայմաններ

| Տիպ | Հարցում | Նկարագիր |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-background-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-inverse` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-context-view-arrow-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-context-view-arrow-background-color-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-context-view-arrow-border-color` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-context-view-arrow-border-color-inverse` | `<color>` | `#00000000` |
| `--instui-component-context-view-arrow-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-context-view-arrow-size` | `<length>` | `0.5rem` |
| `--instui-component-context-view-border-radius` | `<length>` | `0.75rem` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |

## Բրաուզերի աջակցություն

- Օգտագործում է CSS խարիսխ տեղակայման (`position-anchor`, `position-area`, `position-try-fallbacks`) և ծանուցիչ `[popover]` API-ն `@supports` պահպան հետեւից; կարիք ունի վերջին Chromium կամ Safari, և հետընթացը UA-կենտրոն popover այլուր:

## Ավելին կապված

- [popover](/hy/api/css/popover.md) — Ընդհանուր վերին-շերտի popover:
- [tooltip](/hy/api/css/tooltip.md) — Ավելի փոքր բաղկացում կամ հարթել հրահանգ:

