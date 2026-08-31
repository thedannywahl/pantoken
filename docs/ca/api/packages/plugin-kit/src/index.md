[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-kit` — construeix i compon plugins de pantoken, amb registre conscient de capacitats.

[definePlugin](functions/definePlugin.md) és la factoria moderna: passa els ganxos que implementes i retorna un
`PantokenPlugin` normal marcat amb les capacitats deduïdes d'aquests ganxos. Els consumidors
(`buildTokens`, `toCss`) executen [checkPlugins](functions/checkPlugins.md) per advertir — mai error — quan un plugin es
registra on no té efecte: un plugin no factoritzat (comprovacions de capacitats no disponibles) o un
plugin factoritzat en una etapa que no implementa (per exemple, un plugin només de marques passat a `toCss`).

Les etapes de transformació que una matriu `plugins:` realment impulsa són `tokens`, `icons`, i `css`; `rehype`
(un resolutor d'icones en temps de renderització) i `native` (Style Dictionary) s'enregistren com a capacitats però són
consumidors posteriors, no guardats aquí.

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

Reexporta [Mode](../../core/src/type-aliases/Mode.md)
