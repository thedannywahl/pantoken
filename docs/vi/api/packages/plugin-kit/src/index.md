[pantoken](../../../index.md) / plugin-kit

# plugin-kit

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-kit` — build and compose pantoken plugins, with capability-aware registration.

[definePlugin](functions/definePlugin.md) is the modern factory: pass the hooks you implement and it returns a normal
`PantokenPlugin` branded with the capabilities inferred from those hooks. Consumers
(`buildTokens`, `toCss`) run [checkPlugins](functions/checkPlugins.md) to warn — never error — when a plugin is
registered where it has no effect: a non-factoried plugin (capability checks unavailable) or a
factoried plugin at a stage it doesn't implement (e.g. a token-only plugin passed to `toCss`).

The transform stages a `plugins:` array actually drives are `tokens`, `icons`, and `css`; `rehype`
(a render-time icon resolver) and `native` (Style Dictionary) are recorded as capabilities but are
downstream consumers, not guarded here.

## Ví dụ

```ts
const brand = definePlugin({ name: "brand", tokens: (c) => [...c.tokens], css: () => ({ ... }) });
// capabilitiesOf(brand) → ["tokens", "css"]
```

## Giao diện

- [ResolveOptions](interfaces/ResolveOptions.md)

## Bí danh kiểu

- [Stage](type-aliases/Stage.md)

## Hàm

- [definePlugin](functions/definePlugin.md)
- [isFactoried](functions/isFactoried.md)
- [validatePlugin](functions/validatePlugin.md)
- [capabilitiesOf](functions/capabilitiesOf.md)
- [checkPlugins](functions/checkPlugins.md)
- [extendPlugin](functions/extendPlugin.md)
- [mergePlugin](functions/mergePlugin.md)
- [makeResolver](functions/makeResolver.md)
- [resolveTokens](functions/resolveTokens.md)

## Tham chiếu

### Mode

Re-exports [Mode](../../core/src/type-aliases/Mode.md)
