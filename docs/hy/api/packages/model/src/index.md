[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/model` — pantoken տոկենի IR-ի համար զրո-կախվածության տիպի պայմանագրեր:

[Token](interfaces/Token.md)-ը հավասարեցված է CSS `@property` սխեմային (`name`/`syntax`/`inherits`/
initial-`value`) եւ ընդլայնված վերածվել գերհավաքի, որը նաև բերում է թեմատիկ եւ հղման արժեքներ,
պլյուս ոչ-արժեք [TokenMeta](interfaces/TokenMeta.md) (պատկերակներ, ծագում): Պատկերակները ներառվում են որպես `&lt;image&gt;` տոկեններ:
Համակարգչային pantoken փաղ կախվում է այս փաղից տիպի համար, այնպես որ ոչ մի սպառողի պետք չէ
(միայն GitHub) վերինհոսքի տոկենի փաղ միայն IR-ի տիպի համար:

## Ինտերֆեյսներ

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

## Տիպային հոմանիշներ

- [Theme](type-aliases/Theme.md)
- [UpstreamRef](type-aliases/UpstreamRef.md)
- [IconResolver](type-aliases/IconResolver.md)

## Ֆունկցիաներ

- [defineToken](functions/defineToken.md)
