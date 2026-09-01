# De pantoken CLI

`@pantoken/cli` biedt `pantoken generate <target>`, die tokensource in een doelrepo schrijft.
Gebruik het wanneer een platform gegenereerde code nodig heeft in plaats van een runtime-afhankelijkheid — native apps,
CMS-thema's en statische-sitegeneratoren.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Doelen

| Target      | Output                                                                           |
| ----------- | -------------------------------------------------------------------------------- |
| `swift`     | Swift-bron onder `Sources/<name>` plus een `Package.swift` SwiftPM-manifeststub. |
| `android`   | Android XML-resourcebestanden.                                                   |
| `compose`   | Een Jetpack Compose Kotlin-bestand.                                              |
| `flutter`   | Een Flutter Dart-bestand.                                                        |
| `rust`      | Een `tokens.rs` voor egui (standaard) of iced (`--format iced`).                 |
| `wordpress` | Een block-theme `theme.json`.                                                    |
| `vanilla`   | Een Vanilla Forums `variables.json`.                                             |
| `drupal`    | Drupal thema-assets.                                                             |
| `jekyll`    | Jekyll sitegegevens.                                                             |
| `hugo`      | Hugo sitegegevens.                                                               |
| `swatches`  | Kleurenstalen — `ase` (standaard), `gpl`, `sketch`, of `svg` via `--format`.     |
| `icon-font` | Een icon-webfont (TTF, WOFF2), de bijbehorende CSS en een codepoints-kaart.      |
| `pendo`     | De Instructure-gestileerde `global.css` voor Pendo-gidsen.                       |

## Algemene flags

- `--out <dir>` — waar naartoe schrijven (standaard `./pantoken-out`).
- `--theme <name>` — `rebrand` (standaard), `canvas`, of `canvasHighContrast`.
- `--icons a,b,c` — icon-namen om als native assets uit te geven, voor doelen die dit ondersteunen.
- `--class <Name>` — de gegenereerde type- of pakketnaam, voor doelen die er één nodig hebben.
- `--format <fmt>` — het uitvoerformaat, voor `swatches` en `rust`.

## Voorbeelden

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Verschillende targets bieden ook een gewone functie, zodat je ze vanuit je eigen build kunt aanroepen in plaats van
de CLI. Zie de [API reference](/api/) voor elk platformpakket.
