# CSS: rubric-note

`div[class~="instui-rubric-note"]` — Կառուցված նշում ռուբրիկայի կատեգորիաներով և գնահատման ցուցիչներով:

✅ Օգտագործել Rubric-Note երբ.

- Գնահատման ռուբրիկա կամ գնահատման չափանիշներ ցուցադրել
- Դուք պետք է կառուցեք բովանդակությունը կատեգորիաներով՝ միավորներով կամ ցուցիչներով
- Դասավորությունը պետք է շեշտ դնի կառուցվածքի և հիերարխիայի վրա
  🚫 Մի օգտագործեք Rubric-Note երբ.

- Պարզ նշումներ կամ մեկնաբանություններ ցուցադրել — օգտագործել Callout-ը
- Բարդ գնահատման տրամաբանություն պահանջվում է — հաշվի առեք հատուկ բաղադրիչ

## Accessibility

- Օգտագործել աղյուսակի իմաստային հատկությունները, եթե ցուցադրել ճիշտ ռուբրիկա շարքերով և սյունակներով
- Վստահել, որ գնահատման ցուցիչները միայն գույն չեն
- Տրամադրել նկարագրական պիտակներ յուրաքանչյուր կատեգորիայի համար

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part                  | Description                                    |
| --------------------- | ---------------------------------------------- |
| `.instui-criteria`    | Բովանդակ ռուբրիկայի չափանիշների շարքերի համար: |
| `.instui-description` | Չափանիշի մանրամասն նկարագրություն:             |
| `.instui-header`      | Վերնագիր՝ վերնակից և մետատվյալներ:             |
| `.instui-name`        | Չափանիշի անուն կամ դասակարգում:                |
| `.instui-row`         | Առանձին չափանիշի շարք:                         |
| `.instui-score`       | Գնահատական ցուցիչ կամ նշան:                    |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-background`      | —          | —     |
| `--instui-color-border`          | —          | —     |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-color-primary`         | —          | —     |
| `--instui-color-surface`         | —          | —     |
| `--instui-color-text-secondary`  | —          | —     |
| `--instui-font-size-small`       | `<length>` | —     |
| `--instui-font-weight-semibold`  | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [card](/hy/api/css/card.md)
