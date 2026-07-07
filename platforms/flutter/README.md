# @pantoken/flutter

Emit Instructure design tokens as a Flutter (Dart) class, via Style Dictionary. It flattens the
token IR to concrete, single-mode values and keeps the natively-typed tokens (colours, dimensions,
numbers).

## Install

```sh
npm i @pantoken/flutter
```

## Usage

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({
  outDir: "./lib/tokens",
  theme: "rebrand",
  className: "PanTokens", // the generated Dart class name (default)
  icons: ["add", "check"], // optional: also copy SVG assets + a PanTokensIcons manifest
});
```

Or via the CLI:

```sh
pantoken generate flutter --out ./lib/tokens
pantoken generate flutter --out ./lib/tokens --theme canvas --icons add,check
```

## Output

- A single Dart file (named after `className`, lower-cased) declaring a class of `Color`, `double`,
  and numeric constants.
- With `icons` set: the requested glyphs copied to `assets/pantoken/icons/*.svg` plus a
  `pantoken_icons.dart` manifest (a `PanTokensIcons` class) for use with `flutter_svg`. Register the
  asset directory in your `pubspec.yaml`.

## API

- **`generateFlutter(options): Promise<string>`** — emit Dart for a named theme (from the vendored
  `@pantoken/tokens` IR). Returns the written file path.
- **`toFlutter(tokens, options): Promise<string>`** — same, but for an explicit token IR. Returns
  the written file path.
- **`GenerateFlutterOptions`** — the `outDir`, `theme`, `mode`, `className`, and `icons` options
  both take.

## Related

- Uses `@pantoken/tokens` for the vendored token IR and `@pantoken/sd-config` for the Style
  Dictionary platforms.

## License

MIT
