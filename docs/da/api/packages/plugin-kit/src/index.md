[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-kit` — byg og komponér pantoken-plugins med kapacitetsbevidst registrering.

[definePlugin](functions/definePlugin.md) er den moderne fabrik: send de hooks, du implementerer, og det returnerer en normal
`PantokenPlugin` mærket med de kapaciteter, der udledes fra disse hooks. Forbrugere
(`buildTokens`, `toCss`) kører [checkPlugins](functions/checkPlugins.md) for at advare — aldrig fejl — når et plugin er
registreret, hvor det ikke har nogen effekt: et ikke-fabrikeret plugin (kapacitetskontroller utilgængelige) eller et
fabrikeret plugin på et trin, det ikke implementerer (f.eks. et token-kun plugin sendt til `toCss`).

De transformtrin, et `plugins:` array faktisk driver, er `tokens`, `icons` og `css`; `rehype`
(en render-time ikonløser) og `native` (Style Dictionary) registreres som kapaciteter, men er
downstreamforbrugere, ikke beskyttet her.

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

Genoverfører [Mode](../../core/src/type-aliases/Mode.md)
