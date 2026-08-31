# CSS: modal

`.instui-modal` — Երկխոսության մակերես (աշխատում է բնական &lt;dialog&gt;); վերնագիր/մարմին/ստորոտ մասեր:

Տես `modal.header`, `modal.body` և `modal.footer` անդամներ առանձին մասերի համար:

**Աղբյուր:** [body.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/modal/members/body/body.css)

<!-- js-requirement -->

> [!TIP]
> **JS Enhancement** — Այս բաղադրիչի CSS-ը ցուցադրվում և աշխատում է ինքնուրույն՝ միացրեք այն `@pantoken/interactions`-ի հետ՝ ինտերակտիվ վարքածություն ավելացնելու համար: Տես [մոդիֆիկատորի աղյուսակը ստորեւ](#modifiers):

## Accessibility

Բացեք բնական `&lt;dialog&gt;` հետ `showModal()` մոդալ իմաստաբանության և Esc-փակելու համար, և անվանեք այն `aria-labelledby` ցույց տալով `.header`:

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.css";
```

## Demo

```demo
self:modal
```

## Examples

```html
<dialog class="instui-modal -size-sm" id="modal-sm">
  <div class="header"><strong>Small</strong></div>
  <div class="body"><code>-size-sm</code> — a narrow modal.</div>
  <div class="footer">
    <button class="instui-button">Close</button>
  </div>
</dialog>
```

## Structure

```text
.instui-modal
  modal.header (component)
  modal.body (component)
  modal.footer (component)
```

```mermaid
flowchart TD
  n0[".instui-modal"]:::cssdoc-root
  n1(["modal.header"]):::cssdoc-component
  n2(["modal.body"]):::cssdoc-component
  n3(["modal.footer"]):::cssdoc-component
  n0 --> n1
  n0 --> n2
  n0 --> n3
  click n1 "/api/css/modal.header.md"
  click n2 "/api/css/modal.body.md"
  click n3 "/api/css/modal.footer.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier            | Description                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-blur`            | Մխրճել ֆոնը մոդալի հետևում:                                                                                                                                   |
| `.-color-inverse`   | Մութ քրոմ (զույգ մեդիա մարմնի հետ): @affects modal.header @affects modal.body @affects modal.footer — Վերաներկայացնում է յուրաքանչյուր մասը մութ տեսքի համար: |
| `.-density-compact` | Ավելի խիտ մասի պաշտպանություն: @affects modal.header @affects modal.body @affects modal.footer — Խստացնում է յուրաքանչյուր մասի պաշտպանությունը:              |
| `.-overflow-fit`    | Սահմանափակել հայացքի պատուհանին և մեջբերել մարմինը: @affects modal.body — Մեջբերում է մարմինը երբ մոդալը վերևում է հայացքի պատուհանին:                        |
| `.-size-auto`       | Չափսված բովանդակությանը:                                                                                                                                      |
| `.-size-fullscreen` | Եզրից եզր:                                                                                                                                                    |
| `.-size-large`      | Լայն մոդալ: Երկար ձևի `-size-lg`-ի տարբերակ:                                                                                                                  |
| `.-size-lg`         | Լայն մոդալ:                                                                                                                                                   |
| `.-size-sm`         | Նեղ մոդալ:                                                                                                                                                    |
| `.-size-small`      | Նեղ մոդալ: Երկար ձևի `-size-sm`-ի տարբերակ:                                                                                                                   |

## Pseudo-elements

| Pseudo-element | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `::backdrop`   | Մուգ անել էջը երկխոսության հետևում որպես դրա դիմակ, և սառեցնել այն `-blur`-ի տակ: |

## Tokens consumed

| Token                                               | Type                                               | Value                                                                        |
| --------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-mask-background-color`          | `<color>`                                          | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))`                    |
| `--instui-component-modal-auto-min-width`           | `<length>`                                         | `16em`                                                                       |
| `--instui-component-modal-background-color`         | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-modal-border-color`             | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-modal-border-radius`            | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-modal-border-width`             | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-modal-font-family`              | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-modal-inverse-background-color` | `<color>`                                          | `light-dark(#273540, #1C222B)`                                               |
| `--instui-component-modal-inverse-border-color`     | `<color>`                                          | `#334450`                                                                    |
| `--instui-component-modal-inverse-text-color`       | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-modal-large-max-width`          | `<length>`                                         | `62em`                                                                       |
| `--instui-component-modal-medium-max-width`         | `<length>`                                         | `48em`                                                                       |
| `--instui-component-modal-small-max-width`          | `<length>`                                         | `30em`                                                                       |
| `--instui-component-modal-text-color`               | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-elevation-topmost`                        | `none \| <shadow>#`                                | —                                                                            |
| `--instui-spacing-space-xl`                         | `<length>`                                         | `1.5rem`                                                                     |

## Browser support

- Ստեղծել բնական &lt;dialog&gt; և դրա `::backdrop`; վերին շերտի արտապատկերում և ֆոնի ստեղծում պահանջում են բրաուզեր, որը աջակցում է երկխոսության տարրին:

## Subcomponents

- [modal.body](/hy/api/css/modal.body.md)
- [modal.footer](/hy/api/css/modal.footer.md)
- [modal.header](/hy/api/css/modal.header.md)

## Related

- [tray](/hy/api/css/tray.md) — Դրա նույն հեռացվող վերածածկ օրինաչափ, ամրացված էկրանի եզրին:
