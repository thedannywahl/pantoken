# Pantoken CLI

`@pantoken/cli` leverer `pantoken generate <target>`, som skriver token-kilden ind i et mål-repo.
Brug den, når en platform har brug for genereret kode i stedet for en runtime-afhængighed — native apps,
CMS-temaer og statiske site-generatorer.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Mål

| Target      | Output                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| `swift`     | Swift-kilde under `Sources/<name>` plus en `Package.swift` SwiftPM manifest-stub. |
| `android`   | Android XML-ressourcefiler.                                                       |
| `compose`   | En Jetpack Compose Kotlin-fil.                                                    |
| `flutter`   | En Flutter Dart-fil.                                                              |
| `rust`      | En `tokens.rs` for egui (standard) eller iced (`--format iced`).                  |
| `wordpress` | En block-theme `theme.json`.                                                      |
| `vanilla`   | En Vanilla Forums `variables.json`.                                               |
| `drupal`    | Drupal theme-assets.                                                              |
| `jekyll`    | Jekyll site-data.                                                                 |
| `hugo`      | Hugo site-data.                                                                   |
| `swatches`  | Farveprøver — `ase` (standard), `gpl`, `sketch`, eller `svg` via `--format`.      |
| `icon-font` | En ikon-webfont (TTF, WOFF2), dens CSS, og et codepoints-kort.                    |
| `pendo`     | Den Instructure-stilede `global.css` til Pendo-guides.                            |

## Almindelige flag

- `--out <dir>` — hvor der skal skrives (standard `./pantoken-out`).
- `--theme <name>` — `rebrand` (standard), `canvas`, eller `canvasHighContrast`.
- `--icons a,b,c` — ikonnavne, der skal udstedes som native assets, for mål der understøtter dem.
- `--class <Name>` — det genererede type- eller pakkenavn, for mål der har brug for det.
- `--format <fmt>` — output-formatet, for `swatches` og `rust`.

## Eksempler

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Flere mål eksponerer også en almindelig funktion, så du kan kalde dem fra din egen build i stedet for
CLI'en. Se [API reference](/api/) for hvert platform-pakke.
