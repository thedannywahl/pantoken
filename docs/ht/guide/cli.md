# CLI pantoken

`@pantoken/cli` bay `pantoken generate <target>`, ki ekri sous token nan yon depo sib.
Rekòmande lè yon platfòm bezwen kòd jenere olye de yon depandans nan tan-kouri — aplikasyon natif,
tèm CMS, ak jeneratè sit estatik.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Sib

| Sib         | Sòti                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| `swift`     | Sous Swift anba `Sources/<name>` plis yon ébauche manifest SwiftPM `Package.swift`.   |
| `android`   | Fichye resous XML Android.                                                            |
| `compose`   | Yon fichye Kotlin pou Jetpack Compose.                                                |
| `flutter`   | Yon fichye Dart pou Flutter.                                                          |
| `rust`      | Yon `tokens.rs` pou egui (pa default) oswa iced (`--format iced`).                    |
| `wordpress` | Yon `theme.json` block-theme.                                                         |
| `vanilla`   | Yon `variables.json` pou Vanilla Forums.                                              |
| `drupal`    | Resous tèm Drupal.                                                                    |
| `jekyll`    | Done sit Jekyll.                                                                      |
| `hugo`      | Done sit Hugo.                                                                        |
| `swatches`  | Échantiyon koulè — `ase` (pa default), `gpl`, `sketch`, oswa `svg` atravè `--format`. |
| `icon-font` | Yon font ikon web (TTF, WOFF2), CSS li, ak yon kat codepoints.                        |
| `pendo`     | `global.css` estil Instructure pou gid Pendo.                                         |

## Drapo komen

- `--out <dir>` — kote pou ekri (pa default `./pantoken-out`).
- `--theme <name>` — `rebrand` (pa default), `canvas`, oswa `canvasHighContrast`.
- `--icons a,b,c` — non ikon pou emèt kòm resous natif, pou sib ki sipòte yo.
- `--class <Name>` — non tip oswa pake jenere a, pou sib ki bezwen youn.
- `--format <fmt>` — fòma sòti a, pou `swatches` ak `rust`.

## Egzanp

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Plizyè sib tou ekspoze yon fonksyon senp, konsa ou ka rele yo soti nan pwòp pwosesis konstriksyon ou olye de
CLI a. Gade [API reference](/api/) pou chak pake platfòm.
