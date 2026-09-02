[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# फंक्शन: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

Build the shared [RegisterContext](../interfaces/RegisterContext.md) a `register()`-style call threads to every element's
`define`. The icon resolver is injectable: `register()` always passes the real,
`@pantoken/icons`-backed [iconSvg](iconSvg.md) (unchanged default behavior for every existing caller),
while the per-element CDN build passes [noopIconSvg](noopIconSvg.md) for elements that never call it —
`@pantoken/icons`/`@pantoken/tokens` is a multi-MB dependency, and since Rollup can't code-split
`iife`/`umd` output, anything statically reachable from a bundle's entry ends up in the whole
bundle, regardless of whether that specific element's code path ever invokes it. This module has no
top-level side effects for exactly that reason — importing it (unlike importing `../index.ts`, which
auto-registers everything on import) never reaches [iconSvg](iconSvg.md) unless the caller passes it in.

## पैरामीटर

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

Same shape as `register()`'s options, minus `only`.

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

The registry to define into.

### resolveIconSvg

(`name`) => `string`

The resolver wired into `ctx.iconSvg` — pass [iconSvg](iconSvg.md) for real icons
  or [noopIconSvg](noopIconSvg.md) when the caller's element set provably never renders one (see
  `ICON_ELEMENTS` in `./elements-meta.ts`).

## वापसी

[`RegisterContext`](../interfaces/RegisterContext.md)
