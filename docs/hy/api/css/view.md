# CSS: view

`.instui-view` — Տեսակետի հիմահարց՝ չեզոք տուփ՝ ստեղ-արժեք փոփոխիչներով ֆոնի, սահմանի, շառավղի, ստվերի, ցուցադրման, դիրքի, գերբեռնվածության և կուրսորի համար: Այս փոփոխիչներից յուրաքանչյուրը նույնպես հասանելի է ընդհանուր առմամբ (մերկ կամ շղթայված ցանկացած այլ բաղադրիչի վրա) — տես `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` ծրագրեր:

**Աղբյուր:** [view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/view/view.css)

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/view.css";
```

## Օրինակներ

```html
<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">
  A card-like surface.
</div>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-background-alert` | Զգուշացման մակերես ֆոն: |
| `.-background-brand` | Բրենդի մակերես ֆոն: |
| `.-background-danger` | Վտանգի մակերես ֆոն: |
| `.-background-info` | Տեղեկատվության մակերես ֆոն: |
| `.-background-primary` | Հիմնական մակերես ֆոն: |
| `.-background-primary-inverse` | Հակադարձ հիմնական մակերես ֆոն: |
| `.-background-secondary` | Երկրորդային մակերես ֆոն: |
| `.-background-success` | Հաջողության մակերես ֆոն: |
| `.-background-transparent` | Թափուսիկ ֆոն: |
| `.-background-warning` | Չեզոք մակերես ֆոն: |
| `.-border-color-brand` | Բրենդի հարվածի սահմանի գույն: |
| `.-border-color-danger` | Սխալի հարվածի սահմանի գույն: |
| `.-border-color-info` | Տեղեկատվության հարվածի սահմանի գույն: |
| `.-border-color-primary` | Հիմնական հարվածի սահմանի գույն: |
| `.-border-color-success` | Հաջողության հարվածի սահմանի գույն: |
| `.-border-color-warning` | Չեզոք հարվածի սահմանի գույն: |
| `.-border-radius-circle` | Ամբողջ շրջանային (50%) շառավղ: |
| `.-border-radius-large` | Մեծ անկյունային շառավղ: |
| `.-border-radius-medium` | Միջին անկյունային շառավղ: |
| `.-border-radius-pill` | Պղուկ (ամբողջ) շառավղ: |
| `.-border-radius-small` | Փոքր անկյունային շառավղ: |
| `.-border-width-large` | Մեծ ամուր սահմանը հիմնական հարվածի գույնում: |
| `.-border-width-medium` | Միջին ամուր սահմանը հիմնական հարվածի գույնում: |
| `.-border-width-small` | Փոքր ամուր սահմանը հիմնական հարվածի գույնում: |
| `.-cursor-auto` | cursor: auto: |
| `.-cursor-default` | cursor: default: |
| `.-cursor-grab` | cursor: grab: |
| `.-cursor-move` | cursor: move: |
| `.-cursor-not-allowed` | cursor: not-allowed: |
| `.-cursor-pointer` | cursor: pointer: |
| `.-cursor-text` | cursor: text: |
| `.-cursor-wait` | cursor: wait: |
| `.-display-block` | display: block: |
| `.-display-flex` | display: flex: |
| `.-display-inline` | display: inline: |
| `.-display-inline-block` | display: inline-block: |
| `.-display-inline-flex` | display: inline-flex: |
| `.-display-none` | display: none: |
| `.-overflow-x-auto` | overflow-x: auto: |
| `.-overflow-x-clip` | overflow-x: clip: |
| `.-overflow-x-hidden` | overflow-x: hidden: |
| `.-overflow-x-scroll` | overflow-x: scroll: |
| `.-overflow-x-visible` | overflow-x: visible: |
| `.-overflow-y-auto` | overflow-y: auto: |
| `.-overflow-y-clip` | overflow-y: clip: |
| `.-overflow-y-hidden` | overflow-y: hidden: |
| `.-overflow-y-scroll` | overflow-y: scroll: |
| `.-overflow-y-visible` | overflow-y: visible: |
| `.-position-absolute` | position: բացարձակ: |
| `.-position-fixed` | position: ֆիքսված: |
| `.-position-relative` | position: հարաբերական: |
| `.-position-static` | position: ստատիկ: |
| `.-position-sticky` | position: սոսինկ: |
| `.-shadow-above` | Վեր բարձրացման ստվեր: |
| `.-shadow-resting` | Հանգստի բարձրացման ստվեր: |
| `.-shadow-topmost` | Ամենաբարձր բարձրացման ստվեր: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-border-radius-full` | `<length>` | `999rem` |
| `--instui-border-radius-lg` | `<length>` | `0.75rem` |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-border-width-lg` | `<length>` | `0.25rem` |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-stroke-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-error` | `<color>` | `#E62429` |
| `--instui-color-stroke-info` | `<color>` | `#2B7ABC` |
| `--instui-color-stroke-success` | `<color>` | `#03893D` |
| `--instui-color-stroke-warning` | `<color>` | `#CF4A00` |
| `--instui-component-view-background-alert` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-view-background-danger` | `<color>` | `#E62429` |
| `--instui-component-view-background-info` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-primary` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-view-background-primary-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-view-background-secondary` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-component-view-background-success` | `<color>` | `#03893D` |
| `--instui-component-view-background-warning` | `<color>` | `#CF4A00` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-elevation-resting` | `none \| <shadow>#` | — |
| `--instui-elevation-topmost` | `none \| <shadow>#` | — |

