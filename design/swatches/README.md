# @pantoken/swatches

Export Instructure colours as designer swatch palettes — files a designer imports directly into
their tool — plus a viewable SVG specimen sheet. These are terminal outputs, not an interchange
format: for token interchange use `@pantoken/dtcg` or `@pantoken/figma`.

| Format                                   | Tools                                                              |
| ---------------------------------------- | ------------------------------------------------------------------ |
| **ASE** (`toAse`)                        | Photoshop, Illustrator, InDesign (and Affinity, which imports ASE) |
| **`.gpl`** (`toGpl`)                     | GIMP, Inkscape, Krita, Blender, and Aseprite                       |
| **`.sketchpalette`** (`toSketchPalette`) | Sketch (Sketch Palettes plugin) and Lunacy                         |
| **`.svg`** (`toSvg`)                     | A grouped specimen sheet for a README, docs page, PR, or Figma     |

## Install

```sh
npm i @pantoken/swatches
```

Also available as `pantoken/swatches`.

## Usage

```ts
import { swatches, toAse, toGpl, toSketchPalette, toSvg } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
writeFileSync("instructure.svg", toSvg(swatches));
```

Or via the CLI:

```sh
pantoken generate swatches --format ase --out instructure.ase
pantoken generate swatches --format gpl --out instructure.gpl
pantoken generate swatches --format sketch --out instructure.sketchpalette
pantoken generate swatches --format svg --out instructure.svg
```

Swatches are colours only — a flat reduction of the token set. Build the list from any IR with
`toSwatches(tokens, mode)`.

## API

- **`swatches: Swatch[]`** — the `rebrand` colour swatches (the default palette).
- **`toSwatches(tokens, mode?): Swatch[]`** — reduce a token IR to a flat list of colour swatches:
  resolve references, pick a `mode` (`"light"` default or `"dark"`), and keep only tokens whose value
  is a hex colour. Names drop the `--instui-` prefix.
- **`toAse(swatches): Uint8Array`** — encode swatches as Adobe Swatch Exchange (ASE) bytes.
- **`toGpl(swatches, options?): string`** — encode swatches as a GIMP `.gpl` palette string.
  `options.name` sets the palette name (default `"Instructure"`).
- **`toSketchPalette(swatches): SketchPalette`** — encode swatches as a Sketch palette object
  (serialize with `JSON.stringify`).
- **`toSvg(swatches, options?): string`** — render a grouped SVG specimen sheet. Swatches are grouped
  by name minus the leaf segment; `options.title` sets the heading and `options.columns` the chips
  per row (default `6`).
- **`hexToRgb(hex): Rgb | undefined`** — parse a hex colour to 0–255 channels, or `undefined`.
- **`Swatch`, `Rgb`, `Mode`, `ToGplOptions`, `SketchPalette`, `ToSvgOptions`** — the model and option
  types.

## Related

- Pairs with `@pantoken/tokens` for the token IR to reduce.
- For token interchange (not terminal palettes), see `@pantoken/dtcg` and `@pantoken/figma`.

## License

MIT
