# @pantoken/tokens

The npm-published, semver'd home for Instructure design tokens. Two things ship here:

- **The resolved IR** (default export) — the canonical `@property`-aligned token list, with icons
  rolled in, ready to consume in JS/TS.
- **The raw Tokens Studio JSON** (`@pantoken/tokens/raw`) — the source, re-published verbatim, so
  you get npm + semver access without pinning the GitHub-only upstream package.

Both are vendored as static JSON at build time, so installing this package pulls no upstream
dependency.

## Install

```sh
npm i @pantoken/tokens
```

Also available as `pantoken/tokens`.

## Usage

```ts
import { tokens, byTheme } from "@pantoken/tokens";

tokens; // rebrand theme IR: Token[]
byTheme("canvasHighContrast"); // another theme

import { raw, provenance } from "@pantoken/tokens/raw";
raw; // the Tokens Studio tree
provenance; // { upstream, upstreamVersion }
```

The themes are `rebrand` (default), `canvas`, and `canvasHighContrast`. The `rebrand` theme resolves
light and dark into `light-dark()` where they differ; `canvas` variants are single-mode.

## API

- **`tokens: Token[]`** — the `rebrand` theme IR (also the default export).
- **`rebrandTokens`, `canvasTokens`, `canvasHighContrastTokens: Token[]`** — each theme's IR.
- **`themes: Record<Theme, Token[]>`** — every theme's IR, keyed by name.
- **`byTheme(theme): Token[]`** — look up a theme's IR by name.
- **`Theme`, `Token`, `TokenMeta`, `TokenModify`** — the IR types (re-exported from `@pantoken/model`).
- **`./raw`** — the raw Tokens Studio JSON tree, plus `provenance` (the upstream package and version
  it was vendored from).

## Related

- Consumed by every format package (`@pantoken/css`, `@pantoken/scss`, `@pantoken/dtcg`, and the
  rest) as the source IR.

## License

MIT
