[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/model` — عقود أنواع بدون تبعيات لـ pantoken token IR.

A [Token](interfaces/Token.md) محاذاة لمخطط CSS `@property` (`name`/`syntax`/`inherits`/
initial-`value`) وموسَّعة إلى مجموعة فائقة تشمل أيضاً القيم المموّهة والقيم المرجعية،
بالإضافة إلى [TokenMeta](interfaces/TokenMeta.md) غير القيمية (الأيقونات، مصدرها). تُضمَّن الأيقونات كـ `&lt;image&gt;` tokens.
كل حزمة من pantoken تعتمد على هذه الحزمة للنوع، لذا لا يحتاج أي مستهلك إلى
حزمة الرموز العلوية (المتاحة فقط على GitHub) لمجرد كتابة نوع الـ IR.

## واجهات

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

## أسماء أنواع مستعارة

- [Theme](type-aliases/Theme.md)
- [UpstreamRef](type-aliases/UpstreamRef.md)
- [IconResolver](type-aliases/IconResolver.md)

## الدوال

- [defineToken](functions/defineToken.md)
