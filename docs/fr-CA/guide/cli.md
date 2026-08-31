# The pantoken CLI

`@pantoken/cli` provides `pantoken generate <target>`, which writes token source into a target repo.
Reach for it when a platform needs generated code rather than a runtime dependency — native apps,
CMS themes, and static-site generators.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Targets

| Target      | Output                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| `swift`     | Swift source under `Sources/<name>` plus a `Package.swift` SwiftPM manifest stub. |
| `android`   | Android XML resource files.                                                       |
| `compose`   | A Jetpack Compose Kotlin file.                                                    |
| `flutter`   | A Flutter Dart file.                                                              |
| `rust`      | A `tokens.rs` for egui (default) or iced (`--format iced`).                       |
| `wordpress` | A block-theme `theme.json`.                                                       |
| `vanilla`   | A Vanilla Forums `variables.json`.                                                |
| `drupal`    | Drupal theme assets.                                                              |
| `jekyll`    | Jekyll site data.                                                                 |
| `hugo`      | Hugo site data.                                                                   |
| `swatches`  | Color swatches — `ase` (default), `gpl`, `sketch`, or `svg` via `--format`.       |
| `icon-font` | An icon web font (TTF, WOFF2), its CSS, and a codepoints map.                     |
| `pendo`     | The Instructure-styled `global.css` for Pendo guides.                             |

## Common flags

- `--out <dir>` — where to write (default `./pantoken-out`).
- `--theme <name>` — `rebrand` (default), `canvas`, or `canvasHighContrast`.
- `--icons a,b,c` — icon names to emit as native assets, for targets that support them.
- `--class <Name>` — the generated type or package name, for targets that need one.
- `--format <fmt>` — the output format, for `swatches` and `rust`.

## Examples

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Several targets also expose a plain function, so you can call them from your own build instead of
the CLI. See the [API reference](/api/) for each platform package.
