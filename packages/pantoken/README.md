# pantoken

The unified pantoken package. It auto-aggregates every `@pantoken/*` target — tokens, icons, and
platform integrations — into one import surface, generated at build time by `@pantoken/aggregate`.
Each target is also installable on its own (`npm i @pantoken/astro`).

## Install

```sh
npm i pantoken
```

## Usage

```ts
import { astro } from "pantoken";
const { InstUI } = astro; // the full Astro/Starlight plugin

import { tokens } from "pantoken"; // the resolved IR (namespace)
import { icons } from "pantoken"; // the icon set

import "pantoken/css"; // side-effect: inject the stylesheet
```

`pantoken/astro` resolves to the same code as `@pantoken/astro`, and so on for every target.

## API

- **Named namespace exports** — each aggregated target is a namespace on the root import, e.g.
  `astro`, `bootstrap`, `css`, `tokens`, `icons`, `scss`, and the rest.
- **Subpath exports** — the same targets are reachable as subpaths for direct or side-effect
  imports (`pantoken/tokens`, `pantoken/icons`, `pantoken/css`, and so on). The `package.json`
  `exports` map lists 40-plus subpaths, one per target, each resolving to its standalone
  `@pantoken/*` package. See that map for the full, current set.

## How aggregation works

Each target package declares a `pantoken` field in its `package.json`:

```json
"pantoken": { "key": "astro", "kind": "namespace" }
```

`@pantoken/aggregate` scans the meta package's dependencies for that field and generates the
barrel, one subpath entry per target, and the `exports` map. Add a new target package with a
`pantoken` field and it registers automatically — no manual edits here. The files under `src/` are
generated and carry a "do not edit by hand" banner.

## Related

- `@pantoken/aggregate` generates this package's barrel and exports map.
- `@pantoken/core` builds the token IR the aggregated targets emit.

## License

MIT
