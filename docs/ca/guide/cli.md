# La CLI de pantoken

`@pantoken/cli` proporciona `pantoken generate <target>`, que escriu la font dels tokens dins d'un repositori destí.
Utilitzeu-lo quan una plataforma necessiti codi generat en lloc d'una dependència en temps d'execució — aplicacions natives,
temes de CMS i generadors de llocs estàtics.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Destinacions

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

## Indicadors comuns

- `--out <dir>` — on escriure (per defecte `./pantoken-out`).
- `--theme <name>` — `rebrand` (per defecte), `canvas`, o `canvasHighContrast`.
- `--icons a,b,c` — noms d'icones per emetre com a recursos natius, per a destinacions que ho admetin.
- `--class <Name>` — el tipus generat o nom del paquet, per a destinacions que en necessitin un.
- `--format <fmt>` — el format de sortida, per a `swatches` i `rust`.

## Exemples

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Diverses destinacions també exposen una funció plana, així que les podeu cridar des del vostre propi procés de compilació en lloc de
la CLI. Vegeu la [referència de l'API](/api/) per a cada paquet de plataforma.
