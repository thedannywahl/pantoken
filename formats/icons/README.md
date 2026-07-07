# @pantoken/icons

An ergonomic view over the pantoken IR's `<image>` tokens. It filters the canonical IR from
`@pantoken/tokens` to the icon tokens and decodes each data-URI back to inline SVG — it's not a
second source of truth.

## Install

```sh
npm i @pantoken/icons
```

Also available as `pantoken/icons`.

## Usage

```ts
import { icons, getIcon, resolve } from "@pantoken/icons";

getIcon("arrow-left"); // { name, dataUri, svg, viewBox, bidirectional, source }
icons.length; // the full set

resolve("arrow-left"); // IconResolver — for the plugin / rehype stages
```

Each icon carries `bidirectional` (RTL flipping) and `source` (`custom` or `lucide`) metadata,
plus the decoded `svg` and the original `dataUri`.

## API

- **`icons: PantokenIcon[]`** — every pantoken icon, sorted by name.
- **`iconsByName: Map<string, PantokenIcon>`** — every icon, keyed by name.
- **`getIcon(name): PantokenIcon | undefined`** — look up one icon by name.
- **`resolve: IconResolver`** — an `IconResolver` backed by the icon set, for the plugin and rehype
  stages.
- **`PantokenIcon`** — a decoded icon: `name`, `dataUri`, `svg`, `viewBox`, `bidirectional`, and
  `source`.

## Related

- Reads the IR from `@pantoken/tokens`.
- For an installable font of the same glyphs, see `@pantoken/icon-font`.

## License

MIT
