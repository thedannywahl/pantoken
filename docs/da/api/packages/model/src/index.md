[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/model` — nul-afhængighed-typekontrakter for pantoken-token IR.

Et [Token](interfaces/Token.md) er tilpasset CSS `@property` skemaet (`name`/`syntax`/`inherits`/
initial-`value`) og udvidet til en supersæt, som også indeholder tematiserede og referenceværdier,
plus ikke-værdi [TokenMeta](interfaces/TokenMeta.md) (ikoner, oprindelse). Ikoner indarbejdes som `&lt;image&gt;` tokens.
Hver pantoken-pakke afhænger af denne pakke for typen, så ingen forbrugere behøver den (kun GitHub) upstream-tokenpakke bare for at typisere IR.

## Interfaces

- [TokenModify](interfaces/TokenModify.md)
- [TokenMeta](interfaces/TokenMeta.md)
- [DeprecationEntry](interfaces/DeprecationEntry.md)
- [DeprecationLedger](interfaces/DeprecationLedger.md)
- [Token](interfaces/Token.md)
- [TokenInput](interfaces/TokenInput.md)
- [IconEntry](interfaces/IconEntry.md)
- [PropertyRule](interfaces/PropertyRule.md)
- [CssContribution](interfaces/CssContribution.md)
- [TokenHookContext](interfaces/TokenHookContext.md)
- [IconHookContext](interfaces/IconHookContext.md)
- [CssHookContext](interfaces/CssHookContext.md)
- [RehypeHookContext](interfaces/RehypeHookContext.md)
- [PantokenPlugin](interfaces/PantokenPlugin.md)

## Type Aliases

- [Theme](type-aliases/Theme.md)
- [UpstreamRef](type-aliases/UpstreamRef.md)
- [IconResolver](type-aliases/IconResolver.md)

## Functions

- [defineToken](functions/defineToken.md)
