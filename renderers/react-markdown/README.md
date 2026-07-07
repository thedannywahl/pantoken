# @pantoken/react-markdown

Render Markdown with [Instructure UI](https://instructure.design) components and pantoken icons —
a [react-markdown](https://github.com/remarkjs/react-markdown) integration. It maps Markdown
elements onto InstUI (`Heading`, `Text`, `Link`, `List`, `Table`, `Alert`, …) and adds three
pantoken-powered inline features:

- **`:icon:` tokens** — resolved through `@pantoken/rehype` + `@pantoken/icons`, with optional
  brand icons via `@pantoken/plugin-simple-icons`.
- **Color swatches** — standalone color values (`#03893D`, `rgb(...)`) render as a swatch plus code.
- **GitHub alerts** — `> [!NOTE]` blockquotes become InstUI `Alert`s.

## Install

```sh
npm i @pantoken/react-markdown
```

`react`, `react-markdown`, `remark-gfm`, and the Instructure UI packages it maps to are peers, so
bring your own. `@mdx-js/react` is an optional peer, needed only for the `/mdx` entry.

Also available as `pantoken/react-markdown`.

## Usage

```mdx
import { InstuiMarkdown } from "@pantoken/react-markdown";

<InstuiMarkdown>
  # Title

Go :arrow-left: back. Brand is #03893D.

> [!TIP]
> Helpful.

</InstuiMarkdown>;
```

With brand icons:

```mdx
import { InstuiMarkdown } from "@pantoken/react-markdown";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

<InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
  Star us on :github:
</InstuiMarkdown>
;
```

For MDX content, wrap it with the provider from the `/mdx` entry (needs the `@mdx-js/react` peer):

```tsx
import { InstuiMdxProvider } from "@pantoken/react-markdown/mdx";
```

`renderOptions` tunes `link` (external affordance, permalinks), `code` (language hint), `icons`
(enable, color, resolvers, plugins), `color` (swatches), `alerts` (GitHub alerts), and
`tableCaption`. See `InstuiMarkdownRenderOptions`.

## API

- **`InstuiMarkdown(props)`** — the component; renders a Markdown string with InstUI mappings and
  pantoken icon and color tokens.
- **`createInstuiMarkdownComponents(options?): Components`** — build the react-markdown component
  map for a set of render options.
- **`instuiMarkdownComponents`** — the default component map (no options).
- **`buildIconResolver(options?): IconResolver`** — assemble the icon-resolver chain (plugin
  resolvers, explicit resolvers, then the built-in set).
- **`rehypeColorCodes()` / `rehypeGithubAlerts()`** — the rehype plugins that tag color values and
  GitHub-alert blockquotes.
- **`parseAlertMarker(text)`** — detect a `[!NOTE]`-style marker; **`isColorValue(value)`** — test
  whether a string is a standalone CSS color.
- **`AlertMarker`, `InstuiMarkdownProps`, `InstuiMarkdownRenderOptions`** — public types.
- **`./mdx`** — an MDX provider (`InstuiMdxProvider`) that supplies the InstUI component map to MDX
  content. Kept separate so `@mdx-js/react` stays optional.

## Related

- Built on `@pantoken/rehype` and `@pantoken/icons` for the inline `:icon:` pipeline.
- Add brand icons with `@pantoken/plugin-simple-icons`.

## License

MIT
