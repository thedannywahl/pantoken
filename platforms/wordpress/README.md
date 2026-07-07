# @pantoken/wordpress

Emit Instructure design tokens as a WordPress block-theme `theme.json` — color palette, spacing
sizes, and font families. Values are resolved to concrete, single-mode values (theme.json has no
light/dark expression); icons are excluded.

## Install

```sh
npm i @pantoken/wordpress
```

Also available as `pantoken/wordpress`.

## Usage

```ts
import { themeJson, toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

themeJson; // ready-made rebrand theme.json
toThemeJson(byTheme("canvas"), { mode: "dark" }); // any IR, any mode
```

Or via the CLI, straight into a theme directory:

```sh
pantoken generate wordpress --out ./wp-content/themes/instructure
```

## Output

A `theme.json` document (`version: 3`) whose `settings` carry the token-derived `color.palette`,
`spacing.spacingSizes`, and `typography.fontFamilies`. WordPress reads it at the theme root and
exposes the values in the block editor and the front end. The CLI writes `theme.json` into the
`--out` directory.

## API

- **`toThemeJson(tokens, options?): ThemeJson`** — convert an IR to a `theme.json` document.
  `options` takes `mode` (default `"light"`).
- **`themeJson`** — the ready-made `rebrand` `theme.json`.
- **`ThemeJson`**, **`Mode`**, **`ToThemeJsonOptions`** — the document type, mode type, and
  `toThemeJson` option type.

## Related

- Built on `@pantoken/tokens` (the vendored IR) and `@pantoken/utils` (`resolveTokens`).

## License

MIT
