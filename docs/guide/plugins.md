# Plugins

A pantoken plugin extends the token or CSS output without forking a package. You build one with
`definePlugin` from `@pantoken/plugin-kit`, then pass it to `buildTokens` or `toCss`.

## Author a plugin

Give `definePlugin` the hooks you implement. It returns a normal plugin, branded with the
capabilities inferred from those hooks. A plugin can extend the IR (`tokens`, `icons`), the CSS
output (`css`), or both.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Capability-aware registration

`buildTokens` and `toCss` run `checkPlugins` over the plugins you pass. It warns — it never throws —
when a plugin has no matching hook for the stage it's registered in, so a token-only plugin passed
to `toCss` is skipped with a note rather than silently doing nothing.

## Compose plugins

Build on top of another plugin with `extendPlugin`, or combine peers with `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Same-stage hooks compose: `tokens` runs the base then the addition, `css` merges the two
contributions, and `icons` runs both.

## Validate your plugin's output

Run the shared drift checks from `@pantoken/utils` over your plugin's own output in its test, so a
typo or a renamed token fails fast and locally:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## The bundled plugins

- `@pantoken/plugin-focus-outline` — a focus-ring token set plus the rules that apply it.
- `@pantoken/plugin-simple-icons` — brand icons from simple-icons, registered as icon tokens.
- `@pantoken/plugin-logos` — Instructure product logos as SVGs, data URIs, and `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — a PostCSS plugin (not a pantoken plugin) that drops
  unused custom properties from a stylesheet.

The Instructure brand fonts (Atkinson Hyperlegible Next) ship in `@pantoken/components`, not a plugin:
`base.css` applies `--instui-font-family-base`, and the opt-in `@pantoken/components/fonts.css` loads
the `@font-face` woff2s.

See the [API reference](/api/) for each plugin's exports.
