[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-kit` — بناء وتكوين مكونات pantoken الإضافية، مع تسجيل التوعية بالقدرات.

[definePlugin](functions/definePlugin.md) هو المصنع الحديث: مرر الخطافات التي تطبقها وسيرجع طبيعي
`PantokenPlugin` موسوم بالقدرات المستنتجة من تلك الخطافات. المستهلكون
(`buildTokens`, `toCss`) تشغيل [checkPlugins](functions/checkPlugins.md) للتحذير — لا خطأ أبداً — عند تسجيل مكون إضافي
حيث ليس له تأثير: مكون إضافي غير مصنع (فحوصات القدرات غير متاحة) أو
مكون إضافي مصنوع في مرحلة لا ينفذها (على سبيل المثال، مكون إضافي يحتوي على رموز فقط تم تمريره إلى `toCss`).

مراحل التحويل التي يقودها مصفوفة `plugins:` بالفعل هي `tokens`، `icons`، و `css`؛ `rehype`
(محلل رمز وقت التصيير) و `native` (قاموس النمط) يتم تسجيلها كقدرات ولكنها
مستهلكون في اتجاه المصب، غير محمية هنا.

## Example

```ts
const brand = definePlugin({ name: "brand", tokens: (c) => [...c.tokens], css: () => ({ ... }) });
// capabilitiesOf(brand) → ["tokens", "css"]
```

## Interfaces

- [ResolveOptions](interfaces/ResolveOptions.md)

## Type Aliases

- [Stage](type-aliases/Stage.md)

## Functions

- [definePlugin](functions/definePlugin.md)
- [isFactoried](functions/isFactoried.md)
- [validatePlugin](functions/validatePlugin.md)
- [capabilitiesOf](functions/capabilitiesOf.md)
- [checkPlugins](functions/checkPlugins.md)
- [extendPlugin](functions/extendPlugin.md)
- [mergePlugin](functions/mergePlugin.md)
- [makeResolver](functions/makeResolver.md)
- [resolveTokens](functions/resolveTokens.md)

## References

### Mode

إعادة تصدير [Mode](../../core/src/type-aliases/Mode.md)
