# @pantoken/plugin-simple-icons

A pantoken plugin that brings [Simple Icons](https://simpleicons.org) brand glyphs into pantoken. It
defines a `tokens` hook (emit selected brand glyphs as `<image>` tokens, so they flow to CSS and
native too) and a `rehype` hook (resolve `:brand:` codes at render), so you choose the layer.

## Install

```sh
npm i @pantoken/plugin-simple-icons simple-icons
```

Also available as `pantoken/simpleIcons`. `simple-icons` is a peer dependency (>=13).

## Usage

Emit brand glyphs as `<image>` tokens (they then flow to CSS and native too):

```ts
import { buildTokens } from "@pantoken/core";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

buildTokens({
  theme: "rebrand",
  plugins: [simpleIcons({ registry, slugs: ["github", "react"] })],
});
// adds --instui-icon-github, --instui-icon-react as <image> tokens
```

Resolve `:brand:` codes at render (rehype layer):

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```

The `tokens` hook is synchronous, so pass `registry` explicitly (it throws otherwise). The `rehype`
hook falls back to the lazily imported `simple-icons` package.

## API

- **`simpleIcons(options?): PantokenPlugin`** — create the plugin, with `tokens` and `rehype` hooks.
- **`SimpleIconsOptions`** — `slugs` (brand slugs to emit as tokens), `registry` (the icon map), and
  `prefix` (token-name prefix, default `--instui-icon-`).
- **`toExportName(slug): string`** — convert a slug (`"github-actions"`) to its Simple Icons export
  name (`"siGithubActions"`).
- **`defaultRegistry(): Promise<SimpleIconsRegistry>`** — lazily import the `simple-icons` package.
- **`SimpleIcon`, `SimpleIconsRegistry`** — the icon and registry types.
- **default export** — `simpleIcons`.

## Related

- Built with `@pantoken/plugin-kit` (`definePlugin`).

## License

MIT
