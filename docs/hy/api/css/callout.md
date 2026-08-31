# CSS: callout

`div[class~="instui-callout"]` — Ներքևում տեղեկատվական ահազանգ կարճ հիշեցման կամ նշումի համար:

✅ Օգտագործել Callout երբ.

- Ձեզ անհրաժեշտ կարևորել կարևոր տեղեկատվություն կամ հիշեցումներ ներքևում
- Հաղորդագրությունն համեմատաբար կարճ է (մեկ նախադասություն կամ կարճ պարբերություն)
- Ահազանգը պետք է ուշադրություն հրավիրի՝ առանց հիմնական հոսքը խաթարելու
  🚫 Մի օգտագործեք Callout երբ.

- Հաղորդագրությունը պահանջում է փոխազդեցություն կամ բազմաթիվ գործողություններ — օգտագործեք Modal կամ Alert Dialog
- Բովանդակությունը էջի հիմնական ֆոկուսն է — փոխարենը օգտագործեք Card կամ Hero layout

## Accessibility

- Համոզվեք, որ ահազանգի դերը ճիշտ կերպով կիրառվել է (role="alert" կամ role="status")
- Օգտագործեք թվային գործունեություն, որը համապատասխանում է WCAG AA ստանդարտներին
- Մի հենվեք միայն գույնի վրա՝ նշանակություն փոխանցելու համար

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot      | Description                              |
| --------- | ---------------------------------------- |
| `message` | Ահազանգի հաղորդագրության բովանդակություն |

## Parts

| Part              | Description                                  |
| ----------------- | -------------------------------------------- |
| `.instui-content` | Տեքստային բովանդակության հարթակ:             |
| `.instui-icon`    | Ընտրովի պատկերակ բովանդակության ձախ կողմում: |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type       | Value |
| -------------------------------- | ---------- | ----- |
| `--instui-color-info-background` | —          | —     |
| `--instui-color-info-border`     | —          | —     |
| `--instui-color-info-text`       | —          | —     |
| `--instui-radius-medium`         | —          | —     |
| `--instui-size-small`            | `<length>` | —     |
| `--instui-space-medium`          | —          | —     |
| `--instui-space-small`           | —          | —     |

## Related

- [alert](/hy/api/css/alert.md)
