# @pantoken/plugin-custom-icons

A pantoken plugin that vendors custom icon glyphs — product/brand marks or anything else not in the
InstUI icon set — as `--instui-icon-<name>` image tokens. It reuses the same token namespace and
`.-icon-<name>` painter class as the built-in InstUI icons and Simple Icons, so a custom icon drops
into `.instui-icon -icon-<name>` exactly like a built-in one. No `custom-` prefix: on a name
collision, the built-in InstUI icon wins.

## Install

```sh
npm i @pantoken/plugin-custom-icons
```

Also available as `pantoken/customIcons`.

## Usage

Emit vendored icons as `<image>` tokens (they then flow to CSS and native too):

```ts
import { buildTokens } from "@pantoken/core";
import { customIcons } from "@pantoken/plugin-custom-icons";

buildTokens({
  theme: "rebrand",
  plugins: [customIcons({ names: ["highspot"] })],
});
// adds --instui-icon-highspot as an <image> token
```

Or load the static CSS directly from the CDN — either the full barrel or a single icon:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/plugin-custom-icons/dist/custom-icons.css"
/>
<!-- or just one icon -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/plugin-custom-icons/dist/icons/highspot.css"
/>

<span class="instui-icon -icon-highspot"></span>
```

## API

- **`customIcons(options?): PantokenPlugin`** — create the plugin, with a `tokens` hook.
- **`CustomIconsOptions`** — `names` (icon names to emit as tokens, default: every vendored icon) and
  `prefix` (token-name prefix, default `--instui-icon-`).
- **`icons: readonly CustomIcon[]`** — every vendored icon's `{ name, svg }` metadata.

## Icons

- `conveyor`
- `highspot`
- `responsive`
- `vanilla-forums`
