[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

`@pantoken/model` — the zero-dependency type contracts for the pantoken token IR.

A [Token](interfaces/Token.md) is aligned to the CSS `@property` schema (`name`/`syntax`/`inherits`/
initial-`value`) and extended into a superset that also carries themed and reference values,
plus non-value [TokenMeta](interfaces/TokenMeta.md) (icons, provenance). Icons are rolled in as `&lt;image&gt;` tokens.
Every pantoken package depends on this package for the type, so no consumer needs the
(GitHub-only) upstream token package just to type the IR.

## 介面

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

## 型別別名

- [Theme](type-aliases/Theme.md)
- [UpstreamRef](type-aliases/UpstreamRef.md)
- [IconResolver](type-aliases/IconResolver.md)

## 函式

- [defineToken](functions/defineToken.md)
