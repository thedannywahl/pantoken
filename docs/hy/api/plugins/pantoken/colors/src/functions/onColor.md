[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# Ֆունկցիա: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ընթերցանելի ճակատային գույն — սև կամ սպիտակ — `surface`-ի վրա դրված բովանդակության համար: Սա InstUI-ի կրկնվող `*-on-color` տարբերակների միայն CSS ձևն է (ֆոկուսային օղակ բրենդային կոճակի վրա, առաջնային-հակադարձ կոճակի տեքստ, պատկերակ գունավոր մակերեսի վրա): հաստատուն հակադարձ տոկենի փոխարեն, այն ընտրում է հակադրությունը բուն մակերեսից, այնպես որ այն մնում է ճիշտ, երբ մակերեսը փոխվում է:

Այն կարդում է մակերեսի OKLCH լույսը հարաբերական գույնի շարահյուսության միջոցով և կցում է այն `0`-ին (սև) կամ `1`-ին (սպիտակ) `threshold`-ում՝ օգտագործելով `calc(… * infinity)` clamp trick — ոչ JS, ոչ հաստատուն hex:

## Պարամետրեր

### surface

`string`

Ֆոնային գույն, որի վրա բովանդակությունը նստած է (բառացիկ, `var(--token)`, կամ ներդրված օգնական):

### threshold?

`number` = `0.62`

OKLCH լույս (0–1), որից վեր մակերեսը համարվում է "բաց" (լռելյայն `0.62`):

## Վերադարձվող արժեք

`string`

Մի `oklch(from …)` արտահայտություն, որը լուծում է սև կամ սպիտակի:

## Օրինակ

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```
