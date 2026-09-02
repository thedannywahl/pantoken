[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# Ֆունկցիա: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Բաց դարձրեք `percent` HSL-լույսի կետերով — ui-color-utils `lighten`-ի միայն CSS համարժեքը (tinycolor-ը բարձրացնում է HSL լույսը): Օգտագործում է հարաբերական գույնի շարահյուսություն, որպեսզի պահպանվեն ճառնագույն և հագեցվածություն:

## Պարամետրեր

### color

`string`

Հիմքային գույն:

### percent?

`number` = `10`

Ավելացնելու լույսի կետեր (լռելյայն `10`, համընկնում tinycolor-ի լռելյայն):

## Վերադարձվող արժեք

`string`

Մի `hsl(from …)` հարաբերական-գույն արտահայտություն:

## Օրինակ

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
