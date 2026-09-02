[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/utils` — shared, upstream-free helpers used across the pantoken packages: the token
reference resolver (with `light-dark()` handling), the two token regexes (typed via `arkregex`),
kebab→camel case, hex-colour parsing, SVG sanitization, the pantoken spacing scale, reference-drift
validation, and the generic token→utility-class emitters that both `@pantoken/components`
(semantic tier) and `@pantoken/plugin-primitives` (raw-palette tier) build on. Depends only on
`@pantoken/model` (types) + `arkregex`, so any package can use it without pulling the GitHub-only
upstream.

The css-tree-backed token syntax validator lives at the separate `@pantoken/utils/token-syntax`
entry, not this barrel — `css-tree` bundles a runtime `createRequire()` JSON load that breaks when
pulled into a browser/SSR bundle, and this barrel is imported by browser-facing packages (e.g.
`@pantoken/components`) for the Node-free helpers above.

A pure barrel — every implementation lives in its own discrete module; add new helpers there and
re-export them here, don't grow this file.

## Schnittstellen

- [Rgba](interfaces/Rgba.md)
- [ResolveOptions](interfaces/ResolveOptions.md)
- [SpacingStep](interfaces/SpacingStep.md)
- [UtilityOptions](interfaces/UtilityOptions.md)
- [ColorUtilityNames](interfaces/ColorUtilityNames.md)
- [TokenUtilityGroup](interfaces/TokenUtilityGroup.md)

## Typ-Aliasse

- [Mode](type-aliases/Mode.md)
- [ColorUtilityEntry](type-aliases/ColorUtilityEntry.md)

## Variablen

- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)
- [VAR\_RE](variables/VAR_RE.md)
- [LIGHT\_DARK\_RE](variables/LIGHT_DARK_RE.md)
- [SPACING\_STEPS](variables/SPACING_STEPS.md)
- [SPACING\_AUTO\_STEP](variables/SPACING_AUTO_STEP.md)

## Funktionen

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
