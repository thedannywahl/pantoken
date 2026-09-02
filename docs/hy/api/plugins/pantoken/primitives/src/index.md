[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ընտրովի կոմունալ դասեր անմշակ pantoken բնական պալետի համար (`--instui-primitive-*`):

Իմաստային կոմունալները `@pantoken/components`-ում նպատակով բացահայտում են միայն իմաստային տոկենները — գույնի
ամբողջականացում այնտեղ միշտ դեր է (`bg-brand`), երբեք անմշակ նմուշ: Այս փաթեթը փախուստի դուռ է.
մեկ դաս յուրաքանչյուր բնական տոկենի համար, հազվադեպ դեպքում, երբ մշակողը պետք է պալետ ուղղակիորեն: Բեռնել այն
ինքնուրույն (`@pantoken/plugin-primitives/primitives.css`), իմաստային շերտից առանձին:

## Օրինակ

**Ստեղծել բնական ոճաթերթ**

```ts
import { primitivesCss } from "@pantoken/plugin-primitives";
import { tokens } from "@pantoken/tokens";

const names = (p: string) => tokens.filter((t) => t.name.startsWith(p)).map((t) => t.name);
const css = primitivesCss({
  color: names("--instui-primitive-color-"),
  fontFamily: names("--instui-primitive-font-family-"),
  fontWeight: names("--instui-primitive-font-weight-"),
});
// .instui-bg-primitive-color-white { background: var(--instui-primitive-color-white); }
```

## Ինտերֆեյսներ

- [PrimitiveTokenNames](interfaces/PrimitiveTokenNames.md)
- [PrimitivesOptions](interfaces/PrimitivesOptions.md)

## Ֆունկցիաներ

- [primitivesCss](functions/primitivesCss.md)

## Հղումներ

### default

Վերանամ և վերաարտահանել [primitivesCss](functions/primitivesCss.md)
