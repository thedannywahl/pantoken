[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/utils` — ajudants compartits sense font ascendent utilitzats a tots els paquets pantoken: el resolutor de referència de token (amb maneja `light-dark()`), els dos regex de token (escrivit via `arkregex`),
kebab→camel case, parsing de color hexadecimal, sanitització SVG, l'escala d'espaiat pantoken, validació de desviació de referència, i els emissors genèrics de token→classe d'utilitat en els quals ambdós `@pantoken/components`
(capa semàntica) i `@pantoken/plugin-primitives` (capa de paleta bruta) es construeixen. Depèn només de
`@pantoken/model` (tipus) + `arkregex`, així que qualsevol paquet pot utilitzar-lo sense treure la font ascendent només de GitHub.

El validador de sintaxi de token recolzat per css-tree viu a l'entrada separada `@pantoken/utils/token-syntax`
no aquest barril — `css-tree` agrupa una càrrega de `createRequire()` JSON en temps d'execució que es trenca quan
es tira a un paquet browser/SSR, i aquest barril s'importa per paquets que miren cap al navegador (p. ex.
`@pantoken/components`) per als ajudants sense Node anterior.

Un barril pur — cada implementació viu en el seu propi mòdul discret; afegeix nous ajudants allà i
re-exporta'ls aquí, no facis créixer aquest fitxer.

## Interfaces

- [Rgba](interfaces/Rgba.md)
- [ResolveOptions](interfaces/ResolveOptions.md)
- [SpacingStep](interfaces/SpacingStep.md)
- [UtilityOptions](interfaces/UtilityOptions.md)
- [ColorUtilityNames](interfaces/ColorUtilityNames.md)
- [TokenUtilityGroup](interfaces/TokenUtilityGroup.md)

## Type Aliases

- [Mode](type-aliases/Mode.md)
- [ColorUtilityEntry](type-aliases/ColorUtilityEntry.md)

## Variables

- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)
- [VAR\_RE](variables/VAR_RE.md)
- [LIGHT\_DARK\_RE](variables/LIGHT_DARK_RE.md)
- [SPACING\_STEPS](variables/SPACING_STEPS.md)
- [SPACING\_AUTO\_STEP](variables/SPACING_AUTO_STEP.md)

## Functions

- [camelCase](functions/camelCase.md)
- [parseHexColor](functions/parseHexColor.md)
- [elevationDeclarations](functions/elevationDeclarations.md)
- [focusOutlineDeclarations](functions/focusOutlineDeclarations.md)
- [focusOutlineRules](functions/focusOutlineRules.md)
- [extractInstuiRefs](functions/extractInstuiRefs.md)
- [tokenNames](functions/tokenNames.md)
- [unknownReferences](functions/unknownReferences.md)
- [danglingReferences](functions/danglingReferences.md)
- [makeResolver](functions/makeResolver.md)
- [resolveTokens](functions/resolveTokens.md)
- [sanitizeSvg](functions/sanitizeSvg.md)
- [globalModifierSelector](functions/globalModifierSelector.md)
- [colorUtilitiesCss](functions/colorUtilitiesCss.md)
- [tokenUtilitiesCss](functions/tokenUtilitiesCss.md)
