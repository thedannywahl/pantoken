[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# Ֆունկցիա: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կառուցել ընդհանուր [RegisterContext](../interfaces/RegisterContext.md) մի `register()`-ոճ կոչ տող բոլոր տարրերի
`define`-ի մեջ: Պատկերակի լուծողը ներարկվածի՝ `register()` միշտ փոխանցում է իրական,
`@pantoken/icons`-ի հիման վրա [iconSvg](iconSvg.md) (անփոփոխ լռակյա վարքը բոլոր գոյություն ունեցող կոչողների համար),
մինչ մեկ տարրից CDN կառուցումը փոխանցում է [noopIconSvg](noopIconSvg.md) այն տարրերի համար, որոնք այն երբեք չեն կոչում —
`@pantoken/icons`/`@pantoken/tokens` բազմամեգաբայտային կախվածություն է, և քանի որ Rollup չի կարող կոդ-բաժանել
`iife`/`umd` ելք, ցանկացած ստատիկ հասանելի կապ փաթեթի մուտքից հայտնվում է ամբողջ
փաթեթում, անկախ նրանից, թե այդ կոնկրետ տարրի կոդի ուղին երբեք կոչում է այն: Այս մոդուլը չունի
վերին մակարդակի կողմնակի էֆեկտներ այդ ճիշտ պատճառով — այն ներմուծելը (ի տարբերություն `../index.ts` ներմուծելու,
որը ինքնաբերանորեն գրանցում է ամեն ինչ ներմուծման ժամանակ) երբեք չի հասնում [iconSvg](iconSvg.md)-ի, եթե կոչողը այն փոխանցում չի:

## Պարամետրեր

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

Նույն ձևը, ինչ `register()`-ի ընտրանքները, մինուս `only`:

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

Գրանցամատյանը, որի մեջ սահմանել:

### resolveIconSvg

(`name`) => `string`

Լուծողը, որը մալուխվածված է `ctx.iconSvg`-ի մեջ — փոխանցել [iconSvg](iconSvg.md) իրական պատկերակների համար
  կամ [noopIconSvg](noopIconSvg.md) այն դեպքում, երբ կոչողի տարրերի հավաքածուն ապացույցներով երբեք մեկը շարադրում չի (տե՛ս
  `ICON_ELEMENTS`-ը `./elements-meta.ts`-ի մեջ):

## Վերադարձվող արժեք

[`RegisterContext`](../interfaces/RegisterContext.md)
