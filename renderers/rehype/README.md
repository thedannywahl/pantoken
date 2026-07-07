# @pantoken/rehype

A rehype plugin that renders `:icon:` codes as inline SVG using the pantoken icon set. It ports
`rehype-instui-markdown` onto the shared `@pantoken/icons` manifest and resolves each code through a
chain: plugin `rehype` resolvers first, then any explicit `resolve`, then the built-in set.

## Install

```sh
npm i @pantoken/rehype
```

Also available as `pantoken/rehype`.

## Usage

```ts
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import { rehypePantokenIcons } from "@pantoken/rehype";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const html = await unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypePantokenIcons, { plugins: [simpleIcons({ registry })] })
  .use(rehypeRaw) // required: the icon body is emitted as a raw SVG node
  .use(rehypeStringify)
  .process("go :arrow-left: back, star on :github:");
```

`:arrow-left:` resolves from the built-in Instructure set; `:github:` resolves from the simple-icons
plugin. Unknown codes are left as literal text. Include `rehype-raw` so the inline SVG is serialized.

## API

- **`rehypePantokenIcons(options?)`** — the plugin factory; returns a unified/rehype transformer that
  rewrites `:code:` tokens to inline SVG. Options: `resolve` (an explicit resolver tried before the
  built-in set), `plugins` (plugins whose `rehype` hooks contribute resolvers, tried first), and
  `className` (the wrapper class, default `pantoken-icon`).
- **`RehypeOptions`** — the options type.

## Related

- Resolves codes against `@pantoken/icons`; add brand icons with `@pantoken/plugin-simple-icons`.
- `@pantoken/react-markdown` wires this plugin into a full Markdown renderer.

## License

MIT
