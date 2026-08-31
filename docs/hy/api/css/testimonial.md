# CSS: testimonial

`div[class~="instui-testimonial"]` — Մեջբերման կամ վկայական ցուցադրում հեղինակավորման և ընտրական պատկերազարդման հետ։

✅ Օգտագործեք Testimonial հետևյալ դեպքերում.

- Գրասպառ կամ օգտատերի վկայականներ և մեջբերումներ ցուցադրել
- Դուք ցանկանում եք հայտարարություն առանձնացնել տեսողական շեղադրումով
- Հեղինակավորումը և համատեքստը (անուն, վերնագիր, պատկեր) կարևոր են
  🚫 Մի օգտագործեք Testimonial հետևյալ դեպքերում.

- Ընդամենտեքստում ընդամենամեջբերումներ ցուցադրել — փոխարենը blockquote տարրի օգտագործել
- Հայտարարությունը հիմնական ուշադրության կենտրոն է — փոխարենը Hero կամ Card օգտագործել

## Accessibility

- Օգտագործել `&lt;blockquote&gt;` իմաստային լեզվով մեջբերման համար
- Ապահովել, որ հեղինակավորումը պարզ է և կապված մեջբերման հետ
- Եթե պատկերներ օգտագործեք, տրամադրեք այլ տեքստ

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                |
| ----------------- | ------------------------------------------ |
| `.instui-author`  | Հեղինակի անունը։                           |
| `.instui-avatar`  | Ընտրական հեղինակի պրոֆիլային պատկեր։       |
| `.instui-content` | Մեջբերման և հեղինակավորման կոնտեյներ։      |
| `.instui-quote`   | Մեջբերված տեքստ։                           |
| `.instui-title`   | Ընտրական հեղինակի վերնագիր կամ պատկանելիք։ |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                           | Type       | Value |
| ------------------------------- | ---------- | ----- |
| `--instui-color-background`     | —          | —     |
| `--instui-color-primary`        | —          | —     |
| `--instui-color-surface`        | —          | —     |
| `--instui-color-text-primary`   | —          | —     |
| `--instui-color-text-secondary` | —          | —     |
| `--instui-font-size-small`      | `<length>` | —     |
| `--instui-font-weight-semibold` | —          | —     |
| `--instui-radius-medium`        | —          | —     |
| `--instui-space-large`          | —          | —     |
| `--instui-space-medium`         | —          | —     |
| `--instui-space-small`          | —          | —     |

## Related

- [card](/hy/api/css/card.md)
