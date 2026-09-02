# Pantoken CLI

`@pantoken/cli` tilbyr `pantoken generate <target>`, som skriv token-kjelde inn i eit måldrepo.
Bruk det når ei plattform treng generert kode i staden for ei køyretidsavhengigheit — native appar,
CMS-tema og statiske sidegeneratorar.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Mål

| Target      | Output                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `swift`     | Swift-kjelde under `Sources/<name>` pluss ein `Package.swift` SwiftPM-manifeststub. |
| `android`   | Android XML-ressursfiler.                                                           |
| `compose`   | Ein Jetpack Compose Kotlin-fil.                                                     |
| `flutter`   | Ein Flutter Dart-fil.                                                               |
| `rust`      | Ein `tokens.rs` for egui (standard) eller iced (`--format iced`).                   |
| `wordpress` | Ein block-theme `theme.json`.                                                       |
| `vanilla`   | Ein Vanilla Forums `variables.json`.                                                |
| `drupal`    | Drupal-temaressursar.                                                               |
| `jekyll`    | Jekyll-nettstedsdata.                                                               |
| `hugo`      | Hugo-nettstedsdata.                                                                 |
| `swatches`  | Fargeprøvar — `ase` (standard), `gpl`, `sketch`, eller `svg` via `--format`.        |
| `icon-font` | Ein ikon-webfont (TTF, WOFF2), CSS-en hennar, og eit codepoints-kart.               |
| `pendo`     | Den Instructure-styla `global.css` for Pendo-guidar.                                |

## Vanlege flagg

- `--out <dir>` — kvar det skal skrivast (standard `./pantoken-out`).
- `--theme <name>` — `rebrand` (standard), `canvas`, eller `canvasHighContrast`.
- `--icons a,b,c` — ikonnamn som skal emitterast som native ressursar, for mål som støttar det.
- `--class <Name>` — den genererte typen eller pakkenamnet, for mål som treng det.
- `--format <fmt>` — utdataformatet, for `swatches` og `rust`.

## Døme

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Fleire mål eksponerar òg ei rein funksjon, slik at du kan kalle dei frå eiga byggjeprosess i staden for
CLI-en. Sjå [API-referansen](/api/) for kvart plattformpakke.
