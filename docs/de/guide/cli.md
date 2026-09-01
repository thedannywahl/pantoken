# Die pantoken-CLI

`@pantoken/cli` stellt `pantoken generate <target>` bereit, das Token-Quelltext in ein Ziel-Repository schreibt.
Verwenden, wenn eine Plattform generierten Code anstelle einer Laufzeit-Abhängigkeit benötigt — native Apps,
CMS-Themes und statische Site-Generatoren.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Ziele

| Ziel        | Ausgabe                                                                                 |
| ----------- | --------------------------------------------------------------------------------------- |
| `swift`     | Swift-Quellcode unter `Sources/<name>` plus ein `Package.swift` SwiftPM-Manifest-Stubs. |
| `android`   | Android-XML-Ressourcendateien.                                                          |
| `compose`   | Eine Jetpack-Compose-Kotlin-Datei.                                                      |
| `flutter`   | Eine Flutter-Dart-Datei.                                                                |
| `rust`      | Ein `tokens.rs` für egui (Standard) oder iced (`--format iced`).                        |
| `wordpress` | Ein Block-Theme-`theme.json`.                                                           |
| `vanilla`   | Ein Vanilla-Forums-`variables.json`.                                                    |
| `drupal`    | Drupal-Theme-Assets.                                                                    |
| `jekyll`    | Jekyll-Site-Daten.                                                                      |
| `hugo`      | Hugo-Site-Daten.                                                                        |
| `swatches`  | Farbpaletten — `ase` (Standard), `gpl`, `sketch` oder `svg` via `--format`.             |
| `icon-font` | Eine Icon-Webfont (TTF, WOFF2), ihr CSS und eine Codepoints-Map.                        |
| `pendo`     | Das Instructure-gestylte `global.css` für Pendo-Guides.                                 |

## Gemeinsame Flags

- `--out <dir>` — wohin geschrieben wird (Standard `./pantoken-out`).
- `--theme <name>` — `rebrand` (Standard), `canvas` oder `canvasHighContrast`.
- `--icons a,b,c` — Icon-Namen, die als native Assets ausgegeben werden sollen, für Ziele, die sie unterstützen.
- `--class <Name>` — der generierte Typ- oder Paketname, für Ziele, die einen benötigen.
- `--format <fmt>` — das Ausgabeformat, für `swatches` und `rust`.

## Beispiele

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Mehrere Ziele bieten auch eine einfache Funktion an, sodass sie aus dem eigenen Build anstelle
der CLI aufgerufen werden können. Siehe die [API reference](/api/) für jedes Plattform-Paket.
