# CLI pantoken

`@pantoken/cli` zagotavlja `pantoken generate <target>`, ki zapiše izvorne tokene v ciljni repozitorij.
Uporabite ga, kadar platforma potrebuje generirano kodo namesto runtime odvisnosti — native aplikacije,
teme CMS ali generatorji statičnih spletnih strani.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Cilji

| Target      | Output                                                                                  |
| ----------- | --------------------------------------------------------------------------------------- |
| `swift`     | Swift izvorna koda pod `Sources/<name>` plus `Package.swift` osnutek SwiftPM manifesta. |
| `android`   | Android XML datoteke z viri.                                                            |
| `compose`   | Datoteka Kotlin za Jetpack Compose.                                                     |
| `flutter`   | Datoteka Dart za Flutter.                                                               |
| `rust`      | `tokens.rs` za egui (privzeto) ali iced (`--format iced`).                              |
| `wordpress` | Blok-tema `theme.json`.                                                                 |
| `vanilla`   | Vanilla Forums `variables.json`.                                                        |
| `drupal`    | Sredstva teme za Drupal.                                                                |
| `jekyll`    | Podatki spletnega mesta Jekyll.                                                         |
| `hugo`      | Podatki spletnega mesta Hugo.                                                           |
| `swatches`  | Barvne vzorčne palete — `ase` (privzeto), `gpl`, `sketch` ali `svg` preko `--format`.   |
| `icon-font` | Ikonska spletna pisava (TTF, WOFF2), njena CSS datoteka in mapa codepointov.            |
| `pendo`     | Instructure-stilirani `global.css` za Pendo vodnike.                                    |

## Pogoste zastavice

- `--out <dir>` — kam zapisati (privzeto `./pantoken-out`).
- `--theme <name>` — `rebrand` (privzeto), `canvas` ali `canvasHighContrast`.
- `--icons a,b,c` — imena ikon, ki se izvozijo kot native sredstva, za cilje, ki to podpirajo.
- `--class <Name>` — generirano ime tipa ali paketa, za cilje, ki ga potrebujejo.
- `--format <fmt>` — izhodni format, za `swatches` in `rust`.

## Primeri

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Več ciljev prav tako ponuja preprosto funkcijo, tako da jih lahko kličete iz lastnega gradbenega procesa namesto
CLI. Glejte [API reference](/api/) za vsak paket platforme.
