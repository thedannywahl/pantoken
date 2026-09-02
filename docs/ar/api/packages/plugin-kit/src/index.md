[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-kit` — بناء وتأليف ملحقات pantoken، مع تسجيل واعٍ بالإمكانات.

[definePlugin](functions/definePlugin.md) هو المصنع الحديث: مرّر الخطاطيف التي تنفذها وسيرجع `PantokenPlugin` عاديًا مُعلّمًا بالإمكانات التي تم استنتاجها من تلك الخطاطيف. المستهلكون
(`buildTokens`, `toCss`) يشغّلون [checkPlugins](functions/checkPlugins.md) للإبلاغ — دون إحداث خطأ — عندما يتم تسجيل ملحق في موضع لا يؤثر فيه: ملحق غير مصنع (فحوصات الإمكانات غير متاحة) أو ملحق مصنع في مرحلة لا ينفذها (مثال: ملحق خاص بالرموز تم تمريره إلى `toCss`).

مراحل التحويل التي يديرها فعليًا مصفوفة `plugins:` هي `tokens`, `icons`, و`css`; `rehype`
(مُحلّل أيقونات وقت العرض) و`native` (Style Dictionary) مسجّلان كإمكانات لكنهما مستهلكان لاحقان، وليس محميين هنا.

## مثال

```ts
const brand = definePlugin({ name: "brand", tokens: (c) => [...c.tokens], css: () => ({ ... }) });
// capabilitiesOf(brand) → ["tokens", "css"]
```

## واجهات

- [ResolveOptions](interfaces/ResolveOptions.md)

## أسماء أنواع مستعارة

- [Stage](type-aliases/Stage.md)

## الدوال

- [definePlugin](functions/definePlugin.md)
- [isFactoried](functions/isFactoried.md)
- [validatePlugin](functions/validatePlugin.md)
- [capabilitiesOf](functions/capabilitiesOf.md)
- [checkPlugins](functions/checkPlugins.md)
- [extendPlugin](functions/extendPlugin.md)
- [mergePlugin](functions/mergePlugin.md)
- [makeResolver](functions/makeResolver.md)
- [resolveTokens](functions/resolveTokens.md)

## المراجع

### Mode

إعادة تصدير [Mode](../../core/src/type-aliases/Mode.md)
