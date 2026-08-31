# CSS: button

`.instui-button` — Մատչելի գործողության կառավարում՝ տոկեն պալետրից ձևավորված; լռելի առաջնային:

AI տարբերակները շերտավորում են երկու գրադիենտ — padding-box լրացում և border-box հարվածախտ — իրենց շրջանակի համար, և `-color-ai-secondary` չի կարող շարասկավ տեքստ և լրացում միասին նկարել, այնպես որ դրա կենտրոն թափուր է մեջքով մնում և լրացվում է նավելու կամ ակտիվ հետ: Ghost նավել և ակտիվ ստանում են ցածր-անթափանցելիություն, մի փոքր մութ ընկերային լվացում այլ կերպ, քան օգտագործելով հումային ֆոնային տոկեններ, որոնք կտպեն նույն-ծիածանի մեջ նույն-ծիածանի տեքստ: Բացի այդ, սահմանում է իր սեփական պատկերակ/պիտակ `gap` և հորիզոնական `padding`; շղթայեք `-gap-*`/`-p-*`/`-padding-*` միջատեղ օգտակար փոփոխիչ վերածում այն ​​կառուցված-ի արժեքներ:

**Աղբյուր:** [button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/button/button.css)

## Accessibility

Վարիր `-toggle` տարբերակի սեղմված վիճակը `aria-pressed`-ով, և նշեք կասեցված կոճակ `aria-disabled`-ով (կամ հայրենական `disabled`):

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/button.css";
```

## Demo

```demo
self:button
```

## Examples

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
```

## Modifiers

| Modifier                  | Description                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.-color-ai`              | AI գործողություն:                                                                                                                                                                          |
| `.-color-ai-secondary`    | Ավելի ցածր ընդգծում AI գործողություն:                                                                                                                                                      |
| `.-color-danger`          | Կործանարար գործողություն:                                                                                                                                                                  |
| `.-color-primary`         | (լռելի ևս) առաջնային գործողություն:                                                                                                                                                        |
| `.-color-primary-inverse` | Առաջնային գործողություն մութ ֆոնի համար:                                                                                                                                                   |
| `.-color-secondary`       | Ավելի ցածր ընդգծում երկրորդական գործողություն:                                                                                                                                             |
| `.-color-success`         | Դրական/հաստատող գործողություն:                                                                                                                                                             |
| `.-color-tertiary`        | Տեքստ-ոճ գործողություն (առանց լրացման կամ սահման մինչև նավել):                                                                                                                             |
| `.-condensed`             | Ավելի կոշկ լցակ խիտ գործիքներ շարքի համար:                                                                                                                                                 |
| `.-display-block`         | Լայն-լայն միջուկ կոճակ:                                                                                                                                                                    |
| `.-ghost`                 | Ուրվագծել (幽灵) ոճ: սահման ծիածանի幽灵 տոկեններում, առանց լրացման:                                                                                                                        |
| `.-icon-*`                | Տեղակ փունկտ պատկերասց հավաքածուից պիտակի առաջ (այդ. `-icon-arrow-right`), ներկված կոճակի տեքստ ծիածանի մեջ; զուգակցել `-shape-square`/`-shape-circle`-ի հետ միայն պատկերասց կոճակի համար: |
| `.-shape-circle`          | Կլոր պատկերասց կոճակ:                                                                                                                                                                      |
| `.-shape-square`          | Քառակուսի պատկերասց կոճակ:                                                                                                                                                                 |
| `.-size-large`            | Մեծ. Երկար-ձեւ այլանունը `-size-lg`:                                                                                                                                                       |
| `.-size-lg`               | Մեծ:                                                                                                                                                                                       |
| `.-size-md`               | (լռելի ևս) միջին չափ:                                                                                                                                                                      |
| `.-size-medium`           | (լռելի ևս) միջին չափ: `-size-md`-ի երկար ձևի անվանում:                                                                                                                                     |
| `.-size-sm`               | Փոքր:                                                                                                                                                                                      |
| `.-size-small`            | Փոքր. Երկար-ձեւ այլանունը `-size-sm`:                                                                                                                                                      |
| `.-toggle`                | Սեղմված-վիճակ պահոցել կոճակ (վարիր aria-pressed հետ):                                                                                                                                      |
| `.-without-background`    | Բացել լրացումը (幽灵):                                                                                                                                                                     |
| `.-without-border`        | Հեռացնել սահմանը:                                                                                                                                                                          |

## Pseudo-elements

| Pseudo-element | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `::after`      | AI-երկրորդական գրադիենտ սահման կոր, կոճակի շրջանակի վրա դիմակված:                     |
| `::before`     | AI պատկերասց, ավտոմատ ավելացվել AI կոճակներ և դիմակված տարբերակի սեփական ծիածանի մեջ: |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `[aria-pressed="true"]`  | —           |
| `:disabled`              | —           |
| `:state(pressed)`        | —           |

## Tokens consumed

| Token                                                                              | Type                                               | Value                                                                        |
| ---------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-border-width-md`                                                         | `<length>`                                         | `0.125rem`                                                                   |
| `--instui-border-width-sm`                                                         | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-color-background-interactive-action-ai-bottom-gradient-active`           | `<color>`                                          | `#01626E`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-base`             | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-background-interactive-action-ai-bottom-gradient-hover`            | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient` | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-active-top-gradient`    | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient`  | `<color>`                                          | `light-dark(#CFF0F6, #00424A)`                                               |
| `--instui-color-background-interactive-action-ai-secondary-hover-top-gradient`     | `<color>`                                          | `light-dark(#F3E5F7, #522965)`                                               |
| `--instui-color-background-interactive-action-ai-top-gradient-active`              | `<color>`                                          | `#793F93`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-base`                | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-background-interactive-action-ai-top-gradient-hover`               | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-background-interactive-action-destructive-active`                  | `<color>`                                          | `#AE161B`                                                                    |
| `--instui-color-background-interactive-action-destructive-base`                    | `<color>`                                          | `#CF1F24`                                                                    |
| `--instui-color-background-interactive-action-destructive-hover`                   | `<color>`                                          | `#E62429`                                                                    |
| `--instui-color-background-interactive-action-primary-active`                      | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-background-interactive-action-primary-base`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-background-interactive-action-primary-disabled`                    | `<color>`                                          | `light-dark(#DFE1E3, #334450)`                                               |
| `--instui-color-background-interactive-action-primary-hover`                       | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-background-interactive-action-secondary-active`                    | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-background-interactive-action-secondary-base`                      | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-background-interactive-action-secondary-hover`                     | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-background-interactive-action-success-base`                        | `<color>`                                          | `#037D37`                                                                    |
| `--instui-color-background-interactive-action-success-hover`                       | `<color>`                                          | `#03893D`                                                                    |
| `--instui-color-background-interactive-action-tertiary-active`                     | `<color>`                                          | `light-dark(#E2EAF7, #234465)`                                               |
| `--instui-color-background-interactive-action-tertiary-hover`                      | `<color>`                                          | `light-dark(#EEF4FD, #2E5177)`                                               |
| `--instui-color-background-muted`                                                  | `<color>`                                          | `light-dark(#F2F4F5, #273540)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-active`               | `<color>`                                          | `light-dark(#01626E, #02717E)`                                               |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-base`                 | `<color>`                                          | `#027887`                                                                    |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-hover`                | `<color>`                                          | `#00828E`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-active`                  | `<color>`                                          | `light-dark(#793F93, #8A49A7)`                                               |
| `--instui-color-stroke-interactive-action-ai-top-gradient-base`                    | `<color>`                                          | `#944FB3`                                                                    |
| `--instui-color-stroke-interactive-action-ai-top-gradient-hover`                   | `<color>`                                          | `#9E58BD`                                                                    |
| `--instui-color-stroke-interactive-action-primary-active`                          | `<color>`                                          | `light-dark(#061C30, #D5E2F6)`                                               |
| `--instui-color-stroke-interactive-action-primary-base`                            | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-color-stroke-interactive-action-primary-hover`                           | `<color>`                                          | `light-dark(#234465, #ffffff)`                                               |
| `--instui-color-stroke-interactive-action-secondary-active`                        | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-color-stroke-interactive-action-secondary-base`                          | `<color>`                                          | `light-dark(#44709F, #345B84)`                                               |
| `--instui-color-stroke-interactive-action-secondary-hover`                         | `<color>`                                          | `light-dark(#44709F, #3E6895)`                                               |
| `--instui-color-stroke-interactive-action-tertiary-base`                           | `<color>`                                          | `light-dark(#86A8D5, #7097C7)`                                               |
| `--instui-color-text-interactive-action-ai-active`                                 | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-base`                                   | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-hover`                                  | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base`         | `<color>`                                          | `light-dark(#027887, #3CC0D4)`                                               |
| `--instui-color-text-interactive-action-ai-secondary-top-gradient-base`            | `<color>`                                          | `light-dark(#944FB3, #CAA1D9)`                                               |
| `--instui-color-text-interactive-action-primary-base`                              | `<color>`                                          | `light-dark(#ffffff, #1D354F)`                                               |
| `--instui-color-text-interactive-action-primary-disabled`                          | `<color>`                                          | `light-dark(#9EA6AD, #6A7883)`                                               |
| `--instui-color-text-interactive-action-secondary-base`                            | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-color-text-interactive-action-status-base`                               | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-color-text-interactive-action-tertiary-base`                             | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-border-radius`                                     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-base-button-large-font-size`                                   | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-base-button-large-height`                                      | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-base-button-large-padding-horizontal`                          | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-base-button-medium-font-size`                                  | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-medium-height`                                     | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-base-button-medium-padding-horizontal`                         | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-base-button-primary-ghost-background`                          | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-primary-ghost-border-color`                        | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-ghost-color`                               | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-base-button-primary-inverse-active-background`                 | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-inverse-background`                        | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-border-color`                      | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-base-button-primary-inverse-color`                             | `<color>`                                          | `#213D5B`                                                                    |
| `--instui-component-base-button-primary-inverse-hover-background`                  | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-primary-on-color-active-border-color`              | `<color>`                                          | `#B6CCEA`                                                                    |
| `--instui-component-base-button-primary-on-color-hover-border-color`               | `<color>`                                          | `#D5E2F6`                                                                    |
| `--instui-component-base-button-secondary-ghost-background`                        | `<color>`                                          | `transparent`                                                                |
| `--instui-component-base-button-secondary-ghost-border-color`                      | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-secondary-ghost-color`                             | `<color>`                                          | `light-dark(#1D354F, #ffffff)`                                               |
| `--instui-component-base-button-small-font-size`                                   | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-base-button-small-height`                                      | `<length>`                                         | `2rem`                                                                       |
| `--instui-component-base-button-small-padding-horizontal`                          | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-font-family-base`                                                        | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive`                                                 | `<integer>`                                        | `500`                                                                        |
| `--instui-line-height-standalone-text-base`                                        | `<length>`                                         | `1rem`                                                                       |
| `--instui-spacing-space-xs`                                                        | `<length>`                                         | `0.25rem`                                                                    |

## Related

- [close-button](/hy/api/css/close-button.md) — Պատկերակ-միայն փակման կոճակ:
