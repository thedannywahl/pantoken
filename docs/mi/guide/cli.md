# Te CLI pantoken

`@pantoken/cli` e whakarato ana i `pantoken generate <target>`, e tuhi ana i te puna token ki roto i tētahi repo wāhi. Tukua kia whakamahia i ngā wā e hiahiatia ana he waehere i hangaia mō tētahi papa, kaua hei whakawhirinaki ki te wa-tūnga — taupānga taketake,
ngā kaupapa CMS, me ngā pūhanga pae mārō.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Ngā Whāinga

| Whāinga     | Putanga                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------- |
| `swift`     | Puna Swift i raro i `Sources/<name>` me tētahi tūtohu manifest SwiftPM `Package.swift`.      |
| `android`   | Ngā kōnae rauemi XML mō Android.                                                             |
| `compose`   | He kōnae Kotlin mō Jetpack Compose.                                                          |
| `flutter`   | He kōnae Dart mō Flutter.                                                                    |
| `rust`      | He `tokens.rs` mō egui (taunoa) ranei iced (`--format iced`).                                |
| `wordpress` | He `theme.json` mō te block-theme.                                                           |
| `vanilla`   | He `variables.json` mō Vanilla Forums.                                                       |
| `drupal`    | Ngā rawa kaupapa Drupal.                                                                     |
| `jekyll`    | Raraunga pae Jekyll.                                                                         |
| `hugo`      | Raraunga pae Hugo.                                                                           |
| `swatches`  | Ngā rārangi tae — `ase` (taunoa), `gpl`, `sketch`, ranei `svg` mā te whakamahi i `--format`. |
| `icon-font` | He pūranga pūoro tukutuku tohu (TTF, WOFF2), tana CSS, me tētahi mapi tohu waehere.          |
| `pendo`     | Te `global.css` āhua Instructure mō ngā aratohu Pendo.                                       |

## Ngā Kōwhiringa noa

- `--out <dir>` — kei hea te tuhi (taunoa `./pantoken-out`).
- `--theme <name>` — `rebrand` (taunoa), `canvas`, ranei `canvasHighContrast`.
- `--icons a,b,c` — ngā ingoa tohu hei whakaputa hei rawa taketake, mō ngā whāinga e tautoko ana i aua mea.
- `--class <Name>` — te momo i hangaia, te ingoa mō te mōkihi rānei, mō ngā whāinga e hiahiatia ana.
- `--format <fmt>` — te hōputu putanga, mō `swatches` me `rust`.

## Tauira

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

E tukuna ana e ētahi whāinga he tātai mahi mārama hoki, kia taea ai te kãcall i a rātou mai tōu ake hanga i te tūnga o te CLI. Tirohia te [API reference](/api/) mō ia mōkihi papa.
