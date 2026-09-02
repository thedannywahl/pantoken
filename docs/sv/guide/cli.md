# Pantoken CLI

`@pantoken/cli` tillhandahåller `pantoken generate <target>`, som skriver token-källa till ett målrepo.
Använd den när en plattform behöver genererad kod istället för ett runtimeberoende — native-appar,
CMS-teman och statiska site-generatorer.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Mål

| Mål         | Utdata                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | Swift-källkod under `Sources/<name>` plus en `Package.swift` SwiftPM-manifeststub. |
| `android`   | Android XML-resursfiler.                                                           |
| `compose`   | En Jetpack Compose Kotlin-fil.                                                     |
| `flutter`   | En Flutter Dart-fil.                                                               |
| `rust`      | En `tokens.rs` för egui (standard) eller iced (`--format iced`).                   |
| `wordpress` | Ett block-tema `theme.json`.                                                       |
| `vanilla`   | En Vanilla Forums `variables.json`.                                                |
| `drupal`    | Drupal-temaresurser.                                                               |
| `jekyll`    | Jekyll-site-data.                                                                  |
| `hugo`      | Hugo-site-data.                                                                    |
| `swatches`  | Färgprover — `ase` (standard), `gpl`, `sketch`, eller `svg` via `--format`.        |
| `icon-font` | Ett ikon-webbfont (TTF, WOFF2), dess CSS och en codepoints-karta.                  |
| `pendo`     | Den Instructure-stylade `global.css` för Pendo-guider.                             |

## Vanliga flaggor

- `--out <dir>` — var att skriva (standard `./pantoken-out`).
- `--theme <name>` — `rebrand` (standard), `canvas`, eller `canvasHighContrast`.
- `--icons a,b,c` — ikon-namn att generera som native-resurser, för mål som stödjer dem.
- `--class <Name>` — det genererade typen eller paketnamnet, för mål som behöver det.
- `--format <fmt>` — utdataformatet, för `swatches` och `rust`.

## Exempel

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Flera mål exponerar också en vanlig funktion, så du kan anropa dem från din egen build istället för
CLI:n. Se [API reference](/api/) för varje plattforms-paket.
