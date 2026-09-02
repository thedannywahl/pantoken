[pantoken](../../../index.md) / core

# core

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/core` — the pantoken transformer.

Resolves `@instructure/instructure-design-tokens` + `@instructure/ui-icons` into the canonical
`@property`-aligned token IR ([buildTokens](functions/buildTokens.md)), defines the uniform plugin contract
([PantokenPlugin](interfaces/PantokenPlugin.md)), and adapts the IR for the native lineage ([toStyleDictionary](functions/toStyleDictionary.md)).

## Schnittstellen

- [BuildTokensOptions](interfaces/BuildTokensOptions.md)
- [VectorDrawableOptions](interfaces/VectorDrawableOptions.md)
- [AssetFile](interfaces/AssetFile.md)
- [CollectIconsOptions](interfaces/CollectIconsOptions.md)
- [IconToken](interfaces/IconToken.md)
- [IconLayer](interfaces/IconLayer.md)
- [Leaf](interfaces/Leaf.md)
- [SdLeaf](interfaces/SdLeaf.md)
- [TokenModify](interfaces/TokenModify.md)
- [TokenMeta](interfaces/TokenMeta.md)
- [Token](interfaces/Token.md)
- [TokenInput](interfaces/TokenInput.md)
- [IconEntry](interfaces/IconEntry.md)
- [CssContribution](interfaces/CssContribution.md)
- [TokenHookContext](interfaces/TokenHookContext.md)
- [IconHookContext](interfaces/IconHookContext.md)
- [CssHookContext](interfaces/CssHookContext.md)
- [RehypeHookContext](interfaces/RehypeHookContext.md)
- [PantokenPlugin](interfaces/PantokenPlugin.md)

## Typ-Aliasse

- [Theme](type-aliases/Theme.md)
- [IconResolver](type-aliases/IconResolver.md)
- [Mode](type-aliases/Mode.md)

## Variablen

- [ICON\_COLOR\_SPECIAL\_VALUES](variables/ICON_COLOR_SPECIAL_VALUES.md)

## Funktionen

- [buildTokens](functions/buildTokens.md)
- [applyModify](functions/applyModify.md)
- [decodeIconSvg](functions/decodeIconSvg.md)
- [getIconSvgs](functions/getIconSvgs.md)
- [toVectorDrawable](functions/toVectorDrawable.md)
- [toXcodeImageset](functions/toXcodeImageset.md)
- [flutterIconManifest](functions/flutterIconManifest.md)
- [collectIcons](functions/collectIcons.md)
- [defineToken](functions/defineToken.md)
- [dedupeByName](functions/dedupeByName.md)
- [runTokenPlugins](functions/runTokenPlugins.md)
- [runIconPlugins](functions/runIconPlugins.md)
- [collectLeaves](functions/collectLeaves.md)
- [referenceToVarName](functions/referenceToVarName.md)
- [resolveValue](functions/resolveValue.md)
- [varName](functions/varName.md)
- [resolveReferences](functions/resolveReferences.md)
- [toStyleDictionary](functions/toStyleDictionary.md)
- [toKebab](functions/toKebab.md)
- [cssSyntaxForValue](functions/cssSyntaxForValue.md)
- [isContextual](functions/isContextual.md)
