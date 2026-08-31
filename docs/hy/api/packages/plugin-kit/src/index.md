[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-kit` — կառուցել և կազմել pantoken վարիչներ՝ ունակությունից տեղեկացված գրանցմամբ:

[definePlugin](functions/definePlugin.md)-ը ժամանակակից գործարանն է. մեկնարկել ձեր իրականացրած կեռերը և այն վերադարձնում է նորմալ `PantokenPlugin`՝ այդ կեռերից եզրակացված ունակություններով նշված: Սպառողները (`buildTokens`, `toCss`) գործարկում են [checkPlugins](functions/checkPlugins.md) նախազգուշացման համար — երբեք սխալ չեն — երբ վարիչն գրանցվում է, որտեղ դա ոչ մի ազդեցություն չունի. ոչ-գործարանային վարիչ (ունակության ստուգումներ հասանելի չեն) կամ գործարանային վարիչ փուլում, որը այն չի իրականացնում (օր. միայն նիշերի վարիչ անցել `toCss` համար):

Վերաբերմունքի փուլերը, որոնք `plugins:` բազմալից իրականում վարում է, են `tokens`, `icons` և `css`; `rehype` (վեր-ժամանակային պատկերի լուծիչ) և `native` (Style Dictionary) գրանցված են ունակություններ, բայց դրանք վար հոսքի սպառողներ են, ոչ պահպանված այստեղ:

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

Վերաարտահանել [Mode](../../core/src/type-aliases/Mode.md)
