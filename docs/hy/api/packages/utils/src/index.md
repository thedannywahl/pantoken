[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/utils` — համաձայն, վերևից ազատ օգնականներ, որոնք օգտագործվում են pantoken փաթեթներում` թոքենային հղման լուծիչ (`light-dark()`մշակումով), երկու թոքենային regex (մուտքագրված`arkregex`-ի միջոցով), kebab→camel դեպք, hex-գույն վերլուծում, SVG մաքրում, pantoken հեռավորության սանդղակ, հղման-հեռավոր վավերացում, և ընդհանուր թոքեն→կիրառական-դաս արտանետիչներ, որոնց վրա տեղակ են `@pantoken/components`(իմաստային շերտ) և`@pantoken/plugin-primitives`(հում-պալիտրա շերտ): Կախված է միայն`@pantoken/model`(տեսակներ) +`arkregex`-ից, ուստի ցանկացած փաթեթ կարող է օգտագործել այն՝ առանց GitHub-միայն վերևից քաղել:

css-tree-կրտականված թոքենային շարահյուսության վավերացուցիչը գտնվում է առանձին `@pantoken/utils/token-syntax` մուտքի մեջ, ոչ թե այս տակառ — `css-tree` փաթեթ է պարունակում միջավայր `createRequire()` JSON բեռ, որը կոտրվում է, երբ մեջ քաղվում է դիտարկիչ/SSR փաթեթ, և այս տակառն ներմուծվում է դիտարկիչ-կողմնորոշ փաթեթներով (օր. `@pantoken/components`) վերևում Node-ազատ օգնականների համար:

Մաքուր տակառ — յուրաքանչյուր իրականացում ապրում է իր սեփական տարբերակված մոդուլում` ավելացրեք նոր օգնականներ այնտեղ և վերաարտահանեք այստեղ, մի մեծացրեք այս ֆայլը:

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
