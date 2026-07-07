# @pantoken/plugin-kit

Build and compose pantoken plugins, with capability-aware registration.

## Author a plugin

`definePlugin` is the factory. Give it the hooks you implement; it returns a normal `PantokenPlugin`
branded with the capabilities inferred from those hooks. A plugin can extend the IR (`tokens`,
`icons`), the CSS output (`css`), or both — unified tokens + css is the common case.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* ... */ }" }),
  });
// capabilitiesOf(brand()) → ["tokens", "css"]
```

## Capability-aware registration

`buildTokens` and `toCss` run `checkPlugins` over their `plugins:` array. It never throws — it warns:

- A **non-factoried** plugin (a hand-written object): warns that capability checks are unavailable,
  then uses it based on which hooks it has.
- A **factoried** plugin registered where it has no matching hook (e.g. a token-only plugin passed to
  `toCss`): warns that it has no effect there, and skips it.

The guarded transform stages are `tokens`, `icons`, and `css`. `rehype` (render-time icon resolver)
and `native` (Style Dictionary) are recorded as capabilities but aren't guarded — they're downstream
consumers, not IR/CSS transforms.

## Compose plugins

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) }); // build on top
const both = mergePlugin(brand(), icons()); // combine peers
```

Same-stage hooks compose: `tokens` runs base then the addition (which sees base's output); `css`
merges the two `CssContribution`s; `rehype` chains resolvers; `icons`/`native` run both.

## Helpers

`makeResolver(base, { mode?, overrides? })` (re-exported from `@pantoken/utils`) expands `var(--x)`
references to concrete leaf values — collapsing `light-dark()` with `mode`, or keeping it without —
against a base token set with optional `overrides` taking precedence. Handy for plugins that resolve
token references to concrete values for non-CSS output.

## Validate your plugin's output

You don't need per-plugin self-validation — `checkPlugins` guards registration, and the drift harness
runs on the _composed_ output, so a bad `var(--instui-…)` a plugin emits surfaces there. But the
recommended authoring practice is to run the shared drift checkers from `@pantoken/utils` over your
plugin's own output in its test, so a typo or renamed token fails fast and locally:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution (defines what it references): nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

`@pantoken/plugin-stacking` follows this — its tests assert no dangling `var()` and that resolved
values match the IR.

## Not this

PostCSS plugins that rewrite a whole stylesheet (like pendo's `add-important`/`add-scope`/
`prune-custom-props`) are a different contract — they aren't pantoken plugins and don't use this kit.

## License

MIT
