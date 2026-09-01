# Y CLI pantoken

`@pantoken/cli` yn darparu `pantoken generate <target>`, sy'n ysgrifennu ffynhonnell token i repo targed.
Defnyddiwch ef pan fo angen cod wedi'i gynhyrchu ar gyfer llwyfan yn hytrach na dibyniaeth amser-rhediad — apiau native,
themâu CMS, a genhedlwyr safle-statig.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Targedau

| Targed      | Allbwn                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `swift`     | Cod ffynhonnell Swift o dan `Sources/<name>` yn ogystal â stib manifesto SwiftPM `Package.swift`. |
| `android`   | Ffeiliau adnoddau XML Android.                                                                    |
| `compose`   | Ffeil Kotlin Jetpack Compose.                                                                     |
| `flutter`   | Ffeil Dart Flutter.                                                                               |
| `rust`      | `tokens.rs` ar gyfer egui (diofyn) neu iced (`--format iced`).                                    |
| `wordpress` | `theme.json` ar gyfer block-theme.                                                                |
| `vanilla`   | `variables.json` ar gyfer Vanilla Forums.                                                         |
| `drupal`    | Asedau themâu Drupal.                                                                             |
| `jekyll`    | Data safle Jekyll.                                                                                |
| `hugo`      | Data safle Hugo.                                                                                  |
| `swatches`  | Swatches lliw — `ase` (diofyn), `gpl`, `sketch`, neu `svg` trwy `--format`.                       |
| `icon-font` | Ffont eicon gwe (TTF, WOFF2), ei CSS, a map o godponitau.                                         |
| `pendo`     | `global.css` wedi'i steilio gan Instructure ar gyfer canllawiau Pendo.                            |

## Baneri cyffredin

- `--out <dir>` — ble i ysgrifennu (diofyn `./pantoken-out`).
- `--theme <name>` — `rebrand` (diofyn), `canvas`, neu `canvasHighContrast`.
- `--icons a,b,c` — enwau eiconau i'w hail-allbwn fel asedau native, ar gyfer targedau sy'n eu cefnogi.
- `--class <Name>` — y math neu enw pecyn a gynhyrchir, ar gyfer targedau sy'n ei angen.
- `--format <fmt>` — y fformat allbwn, ar gyfer `swatches` a `rust`.

## Enghreifftiau

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Mae sawl targed hefyd yn datgelu swyddogaeth syml, felly gellir eu galw o'ch proses adeiladu eich hun yn hytrach na defnyddio'r CLI. Gweler y Cyfeiriad API (/api/) ar gyfer pob pecyn llwyfan.
