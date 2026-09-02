[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/utils` — delte, upstream-frie hjælpere brugt på tværs af pantoken-pakkerne: token-
reference resolver (med `light-dark()` håndtering), de to token regexer (skrevet via `arkregex`),
kebab→camel case, hex-farve-parsing, SVG-sanering, pantoken-spacing-skalaen, reference-drift
validering, og de generiske token→utility-class emittenter som både `@pantoken/components`
(semantisk tier) og `@pantoken/plugin-primitives` (raw-palette tier) bygger på. Afhænger kun af
`@pantoken/model` (typer) + `arkregex`, så enhver pakke kan bruge det uden at trække GitHub-only
upstream.

css-tree-understøttet token-syntaksvalidator bor ved det separate `@pantoken/utils/token-syntax`
indgang, ikke denne barrel — `css-tree` samler en runtime `createRequire()` JSON-indlæsning som bryder når
det trækkes ind i en browser/SSR-bundle, og denne barrel importeres af browser-orienterede pakker (f.eks.
`@pantoken/components`) for de Node-frie hjælpere ovenfor.

En ren barrel — hver implementering bor i sit eget diskret modul; tilføj nye hjælpere der og
gen-eksportér dem her, udvid ikke denne fil.

## Interfaces

- [Rgba](interfaces/Rgba.md)
- [ResolveOptions](interfaces/ResolveOptions.md)
- [SpacingStep](interfaces/SpacingStep.md)
- [UtilityOptions](interfaces/UtilityOptions.md)
- [ColorUtilityNames](interfaces/ColorUtilityNames.md)
- [TokenUtilityGroup](interfaces/TokenUtilityGroup.md)

## Typealiaser

- [Mode](type-aliases/Mode.md)
- [ColorUtilityEntry](type-aliases/ColorUtilityEntry.md)

## Variabler

- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)
- [VAR\_RE](variables/VAR_RE.md)
- [LIGHT\_DARK\_RE](variables/LIGHT_DARK_RE.md)
- [SPACING\_STEPS](variables/SPACING_STEPS.md)
- [SPACING\_AUTO\_STEP](variables/SPACING_AUTO_STEP.md)

## Funktioner

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
