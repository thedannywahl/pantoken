[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# Funció: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Construeix el [RegisterContext](../interfaces/RegisterContext.md) compartit que una crida d'estil `register()` enfia a cada element
`define`. El resolutor d'icones és injectible: `register()` sempre passa la [iconSvg](iconSvg.md) real i respaldada per `@pantoken/icons` (comportament per defecte incanviat per a cada trucant existent),
mentres que la compilació de CDN per element passa [noopIconSvg](noopIconSvg.md) per a elements que mai no la truquen —
`@pantoken/icons`/`@pantoken/tokens` és una dependència de múltiples MB, i com que Rollup no pot dividir el codi
de la sortida `iife`/`umd`, qualsevol cosa estàticament accessible des de l'entrada d'un paquet acaba en el
paquet complet, independentment de si la ruta del codi d'aquest element específic mai no l'invoca. Aquest mòdul no té
efectes secundaris de nivell superior exactament per aquesta raó — importar-lo (a diferència d'importar `../index.ts`, que
auto-registra tot a la importació) mai no arriba a [iconSvg](iconSvg.md) tret que el trucant la passi.

## Paràmetres

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

Mateixa forma que les opcions de `register()`, menys `only`.

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

El registre en el qual definir.

### resolveIconSvg

(`name`) => `string`

El resolutor connectat a `ctx.iconSvg` — passa [iconSvg](iconSvg.md) per a icones reals
  o [noopIconSvg](noopIconSvg.md) quan el conjunt d'elements del trucant demostrablament mai no en renderitza una (veure
  `ICON_ELEMENTS` en `./elements-meta.ts`).

## Retorna

[`RegisterContext`](../interfaces/RegisterContext.md)
