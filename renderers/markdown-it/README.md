# @pantoken/markdown-it

A markdown-it plugin that renders `:icon:` codes as inline SVG and standalone color values as
swatches, using the pantoken icon set. It ports the `@pantoken/rehype` and `@pantoken/react-markdown`
pipelines onto markdown-it and resolves each icon code through a chain: plugin `rehype` resolvers
first, then any explicit `resolve`, then the built-in set.

## Install

```sh
npm i @pantoken/markdown-it markdown-it
```

Also available as `pantoken/markdown-it`. `markdown-it` is a peer dependency.

## Usage

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, {
  plugins: [simpleIcons({ registry })],
});

md.render("Go :arrow-left: back, star on :github:, brand is #03893D.");
```

`:arrow-left:` resolves from the built-in Instructure set; `:github:` resolves from the simple-icons
plugin. Unknown codes are left as literal text. Standalone color values (`#03893D`, `rgb(…)`,
`oklch(…)`) become swatches. Codes inside inline code or fenced blocks are never touched.

The emitted markup uses the shared class names (`pantoken-icon`, `pantoken-color-swatch`), so loading
`@pantoken/components` styles it. Wrap the output in a `.pantoken-prose` container (see `PROSE_CLASS`)
to pick up the prose layer too.

## API

- **`pantokenMarkdownIt(md, options?)`** — the plugin; use it with
  `md.use(pantokenMarkdownIt, options)`. Options: `resolve` (an explicit icon resolver tried before
  the built-in set), `plugins` (plugins whose `rehype` hooks contribute resolvers, tried first),
  `iconClassName` (default `pantoken-icon`), `swatchClassName` (default `pantoken-color-swatch`),
  `icons` (render icon codes, default `true`), and `swatches` (render color swatches, default
  `true`).
- **`MarkdownItOptions`** — the options type.
- **`PROSE_CLASS`** — the prose-scope class name (`pantoken-prose`) the markup is designed to sit
  inside.

## Related

- Resolves codes against `@pantoken/icons`; add brand icons with `@pantoken/plugin-simple-icons`.
- `@pantoken/rehype` is the unified/rehype equivalent; `@pantoken/react-markdown` is the React one.
- `@pantoken/components` supplies the `pantoken-icon`, `pantoken-color-swatch`, and prose styles.

## License

MIT
