# @pantoken/dtcg

The Instructure design tokens as a [W3C Design Tokens (DTCG)](https://tr.designtokens.org)
document — a nested tree of `{ $value, $type }` leaves. This is the interchange format that Style
Dictionary, Figma plugins, Specify, Supernova, and other tools read.

Values are fully resolved to a single colour mode (DTCG has no `light-dark()`), and icon tokens are
excluded (DTCG describes tokens, not glyph assets). The document is vendored as static JSON at
build, so installing this package pulls no upstream dependency.

## Install

```sh
npm i @pantoken/dtcg
```

Also available as `pantoken/dtcg`.

## Usage

```ts
import { dtcg, byTheme, toDtcg } from "@pantoken/dtcg";

dtcg; // the rebrand DTCG document
byTheme("canvasHighContrast"); // another theme

// Convert your own IR (e.g. with plugins applied):
import { buildTokens } from "@pantoken/core";
toDtcg(buildTokens({ theme: "rebrand" }), "dark");
```

## API

- **`dtcg: Record<string, DtcgNode>`** — the `rebrand` theme as a DTCG document (the default export).
- **`themes: Record<Theme, DtcgNode>`** — every theme's DTCG document, keyed by theme name.
- **`byTheme(theme): Record<string, DtcgNode>`** — look up a theme's DTCG document by name.
- **`toDtcg(tokens, mode?): Record<string, DtcgNode>`** — convert a token IR into a DTCG document.
  `mode` picks the colour mode to resolve (default `"light"`).
- **`DtcgNode`** — a DTCG token leaf (`{ $value, $type? }`) or group.
- **`Mode`** — the colour mode to resolve (`"light"` or `"dark"`).

## Related

- Built from the IR published by `@pantoken/tokens`.
- For runtime `light-dark()` theming, use `@pantoken/css` instead.

## License

MIT
