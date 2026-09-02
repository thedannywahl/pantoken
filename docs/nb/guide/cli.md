# Pantoken CLI

`@pantoken/cli` tilbyr `pantoken generate <target>`, som skriver token-kilde til et mål-repo.
Bruk den når en plattform trenger generert kode i stedet for en runtime-avhengighet — native apper,
CMS-temaer og statiske sidegeneratorer.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Mål

| Target      | Output                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| `swift`     | Swift-kilde under `Sources/<name>` pluss en `Package.swift` SwiftPM-manifeststub. |
| `android`   | Android XML-ressursfiler.                                                         |
| `compose`   | En Jetpack Compose Kotlin-fil.                                                    |
| `flutter`   | En Flutter Dart-fil.                                                              |
| `rust`      | En `tokens.rs` for egui (standard) eller iced (`--format iced`).                  |
| `wordpress` | En block-theme `theme.json`.                                                      |
| `vanilla`   | En Vanilla Forums `variables.json`.                                               |
| `drupal`    | Drupal-temaressurser.                                                             |
| `jekyll`    | Jekyll-nettstedsdata.                                                             |
| `hugo`      | Hugo-nettstedsdata.                                                               |
| `swatches`  | Fargeprøver — `ase` (standard), `gpl`, `sketch`, eller `svg` via `--format`.      |
| `icon-font` | En ikon webfont (TTF, WOFF2), dens CSS, og et codepoints-kart.                    |
| `pendo`     | Den Instructure-stiliserte `global.css` for Pendo-guides.                         |

## Vanlige flagg

- `--out <dir>` — hvor det skal skrives (standard `./pantoken-out`).
- `--theme <name>` — `rebrand` (standard), `canvas`, eller `canvasHighContrast`.
- `--icons a,b,c` — ikonnavn som skal genereres som native ressurser, for mål som støtter dem.
- `--class <Name>` — det genererte typenavnet eller pakkenavnet, for mål som trenger det.
- `--format <fmt>` — utdataformatet, for `swatches` og `rust`.

## Eksempler

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Flere mål eksponerer også en enkel funksjon, slik at du kan kalle dem fra din egen build i stedet for
CLI-en. Se [API-referansen](/api/) for hver plattformpakke.
