[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# Ֆունկցիա: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Մուգ դարձրեք `percent` HSL-լույսի կետերով — ui-color-utils `darken`-ի միայն CSS համարժեքը (tinycolor-ը նվազեցնում է HSL լույսը): Օգտագործում է հարաբերական գույնի շարահյուսություն, որպեսզի պահպանվեն ճառնագույն և հագեցվածություն:

Հարաբերական `hsl()`-ում `l` ալիքը լուծում է `&lt;number&gt;`-ի 0–100 սանդղակին — նույն սանդղակը, որը tinycolor-ի `amount`-ը օգտագործում է — այնպես որ կետերը հանվում են ուղղակիորեն (ոչ `%`):

## Պարամետրեր

### color

`string`

Հիմքային գույն:

### percent?

`number` = `10`

Հանելու լույսի կետեր (լռելյայն `10`, համընկնում tinycolor-ի լռելյայն):

## Վերադարձվող արժեք

`string`

Մի `hsl(from …)` հարաբերական-գույն արտահայտություն:

## Օրինակ

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
