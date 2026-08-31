# CSS: text-input

`.instui-text-input` — Ոճավորված բնական `&lt;input&gt;` — ներառյալ `date`, `time`, և `datetime-local`, որտեղ դիտարկիչը ապահովում է ընտրիչ — վավերացման վիճակներ և չափսեր։

Կիսվում է իր սահմանը, ֆոնը և վիճակի մետաղական մասը `text-area`, `simple-select`, `number-input`, և `input-group`-ի հետ; `date`/`time`/`datetime-local` տեսակների համար դիտարկիչը ապահովում է իր սեփական ընտրիչ ինտերֆեյս, որը այս ոճերի թերթը չի ոճավորում։

**Աղբյուր.** [text-input.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-input/text-input.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-input.css";
```

## Examples

```html
<input class="instui-text-input" placeholder="Default" />
```

## Modifiers

| Modifier        | Description                                          |
| --------------- | ---------------------------------------------------- |
| `.-disabled`    | Անջատված վիճակ:                                      |
| `.-invalid`     | Անվավեր (սխալ) վիճակ:                                |
| `.-readonly`    | Միայն կարդալու համար վիճակ:                          |
| `.-size-large`  | Մեծ. Երկար-ձեւ այլանունը `-size-lg`:                 |
| `.-size-lg`     | Մեծ:                                                 |
| `.-size-md`     | (կանխադրված) Միջին:                                  |
| `.-size-medium` | (կանխադրված) Միջին: Երկար ձևի `-size-md`-ի տարբերակ: |
| `.-size-sm`     | Փոքր:                                                |
| `.-size-small`  | Փոքր. Երկար-ձեւ այլանունը `-size-sm`:                |
| `.-success`     | Հաջողության (վավեր) վիճակ:                           |

## Pseudo-elements

| Pseudo-element  | Description                                            |
| --------------- | ------------------------------------------------------ |
| `::placeholder` | Տեղապահ տեքստ, մեղմ գույնով որ փոխվում է անցումից վրա: |

## States

| State       | Description |
| ----------- | ----------- |
| `:disabled` | —           |

## Tokens consumed

| Token                                                     | Type                                               | Value                                                                        |
| --------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-text-input-background-color`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-input-background-disabled-color` | `<color>`                                          | `light-dark(#E8EAEC, #334450)`                                               |
| `--instui-component-text-input-background-hover-color`    | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                               |
| `--instui-component-text-input-background-readonly-color` | `<color>`                                          | `light-dark(#C7CACD, #6A7883)`                                               |
| `--instui-component-text-input-border-color`              | `<color>`                                          | `light-dark(#7E8792, #5F6E7A)`                                               |
| `--instui-component-text-input-border-disabled-color`     | `<color>`                                          | `light-dark(#C7CACD, #4A5B68)`                                               |
| `--instui-component-text-input-border-hover-color`        | `<color>`                                          | `light-dark(#334450, #7E8792)`                                               |
| `--instui-component-text-input-border-radius`             | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-border-readonly-color`     | `<color>`                                          | `#8D959F`                                                                    |
| `--instui-component-text-input-border-width`              | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-text-input-error-border-color`        | `<color>`                                          | `light-dark(#CF1F24, #F56050)`                                               |
| `--instui-component-text-input-font-family`               | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-input-font-size-lg`              | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-text-input-font-size-md`              | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-input-font-size-sm`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-text-input-font-weight`               | `<integer>`                                        | `500`                                                                        |
| `--instui-component-text-input-height-lg`                 | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-text-input-height-md`                 | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-text-input-height-sm`                 | `<length>`                                         | `2rem`                                                                       |
| `--instui-component-text-input-padding-horizontal-lg`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-padding-horizontal-md`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-input-padding-horizontal-sm`     | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-text-input-placeholder-color`         | `<color>`                                          | `light-dark(#5F6E7A, #7E8792)`                                               |
| `--instui-component-text-input-placeholder-hover-color`   | `<color>`                                          | `light-dark(#334450, #9EA6AD)`                                               |
| `--instui-component-text-input-success-border-color`      | `<color>`                                          | `light-dark(#037D37, #3EA75B)`                                               |
| `--instui-component-text-input-text-color`                | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-text-input-text-disabled-color`       | `<color>`                                          | `light-dark(#8D959F, #9EA6AD)`                                               |
| `--instui-component-text-input-text-readonly-color`       | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-focus-outline-color-danger`                     | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-color-success`                    | `auto \| <color>`                                  | —                                                                            |

## Related

- [text-area](/hy/api/css/text-area.md) — Բազմատողային հատիկ նույն վիճակներով և չափերով։
- [number-input](/hy/api/css/number-input.md) — Թվային մուտքի ներածում, որը կիսում է այս մետաղական մասը։
- [simple-select](/hy/api/css/simple-select.md) — Բնական ընտրություն, որը կիսում է այս դաշտի մետաղական մասը։
- [input-group](/hy/api/css/input-group.md) — Ամբ պահում է այս մուտքը առաջատար և հետևային բնիկներով։
