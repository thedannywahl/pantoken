[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/model` — عقود النوع الخالية من الاعتمادية لـ pantoken token IR.

[Token](interfaces/Token.md) متوافق مع مخطط CSS `@property` (`name`/`syntax`/`inherits`/
initial-`value`) وممتد إلى مجموعة فائقة تحمل أيضًا قيمًا ذات مظهر وقيمًا مرجعية،
بالإضافة إلى [TokenMeta](interfaces/TokenMeta.md) غير القيمة (الرموز، المصدر). يتم دمج الرموز باسم رموز `&lt;image&gt;`.
تعتمد كل حزمة pantoken على هذه الحزمة للنوع، لذا لا يحتاج أي مستهلك إلى
حزمة الرمز الأصلية (GitHub فقط) فقط لكتابة IR.

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
