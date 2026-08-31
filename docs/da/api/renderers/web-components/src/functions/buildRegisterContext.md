[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# Function: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Byg den delte [RegisterContext](../interfaces/RegisterContext.md), som et `register()`-stil kald tråder til hvert elements
`define`. Ikonoprøseren er injicerbar: `register()` sender altid den rigtige,
`@pantoken/icons`-understøttet [iconSvg](iconSvg.md) (uændret standardadfærd for hver eksisterende opkalds),
medens per-element CDN-bygget sender [noopIconSvg](noopIconSvg.md) for elementer, der aldrig kalder det —
`@pantoken/icons`/`@pantoken/tokens` er en multi-MB-afhængighed, og da Rollup ikke kan kode-splitte
`iife`/`umd` output, noget statisk tilgængeligt fra en bundt's indgang ender i hele
bundtet, uanset om det specifikke elements kodesti nogensinde kalder det. Dette modul har ingen
top-niveau bivirkninger af netop den grund — import af det (i modsætning til import af `../index.ts`, som
auto-registrerer alt ved import) når aldrig [iconSvg](iconSvg.md) medmindre opkaldende sender det ind.

## Parameters

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

Samme form som `register()`'s muligheder, minus `only`.

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

Registret, der skal defineresind i.

### resolveIconSvg

(`name`) => `string`

Resolveren tilsluttet `ctx.iconSvg` — send [iconSvg](iconSvg.md) til rigtige ikoner
eller [noopIconSvg](noopIconSvg.md) når opkaldendes elementsæt pålideligt aldrig gengiver en (se
`ICON_ELEMENTS` i `./elements-meta.ts`).

## Returns

[`RegisterContext`](../interfaces/RegisterContext.md)
