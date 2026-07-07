# @pantoken/vanilla

Emit Instructure design tokens as a Vanilla Forums Foundation theme `variables.json`. Vanilla's
Foundation is its own theme engine (not the [get.foundation](https://get.foundation) CSS framework):
a theme is configured by a nested JSON variables object. This package maps Instructure tokens onto
the documented Foundation variable paths, resolving them to concrete colours.

## Install

```sh
npm i @pantoken/vanilla
```

Also available as `pantoken/vanilla`.

## Usage

```ts
import { variables, toVanillaVariables } from "@pantoken/vanilla";
import { byTheme } from "@pantoken/tokens";

variables; // ready-made rebrand variables object
toVanillaVariables(byTheme("canvas"), { mode: "dark" }); // any IR, any mode
```

Or via the CLI, then push the file to a theme:

```sh
pantoken generate vanilla --out ./theme
```

```sh
curl -X PUT "https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d @theme/variables.json
```

## Output

A `variables.json` object — a nested map of Foundation variable paths
(`global.mainColors.primary`, `global.body.backgroundColor`, `titleBar.colors.*`,
`button.primary.colors.*`, and more) to concrete colour values. Serve it at the theme's
`/themes/{themeID}/assets/variables.json` asset. Vanilla compiles the theme server-side, so only the
paths listed in `VANILLA_TO_INSTUI` are populated — extend it to widen coverage.

## API

- **`toVanillaVariables(tokens, options?): Record<string, unknown>`** — convert an IR to the nested
  variables object. `options` takes `mode` (default `"light"`).
- **`variables`** — the ready-made `rebrand` variables object.
- **`VANILLA_TO_INSTUI`** — the frozen map of Foundation variable path → Instructure token name.
- **`Mode`**, **`ToVanillaOptions`** — the mode type and `toVanillaVariables` option type.

## Related

- Built on `@pantoken/tokens` (the vendored IR) and `@pantoken/utils` (`resolveTokens`).

## License

MIT
