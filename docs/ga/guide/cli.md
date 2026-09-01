# An CLI pantoken

`@pantoken/cli` soláthraíonn `pantoken generate <target>`, a scríobhann foinsí token isteach i stór sprioc.
Bain úsáid as nuair is gá cód ginte don ardán seachas spleáchas rith-am — aipeanna dúchais,
téamaí CMS, agus gineadóirí suíomhanna statacha.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Spriocanna

| Sprioc      | Aschur                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | Foinsí Swift faoi `Sources/<name>` plus stob manifest SwiftPM `Package.swift`.     |
| `android`   | Comhaid acmhainne XML Android.                                                     |
| `compose`   | Comhad Kotlin Jetpack Compose.                                                     |
| `flutter`   | Comhad Dart Flutter.                                                               |
| `rust`      | `tokens.rs` do egui (réamhshocrú) nó iced (`--format iced`).                       |
| `wordpress` | `theme.json` bloc-théama.                                                          |
| `vanilla`   | `variables.json` do Vanilla Forums.                                                |
| `drupal`    | Acmhainní téama Drupal.                                                            |
| `jekyll`    | Sonraí suíomh Jekyll.                                                              |
| `hugo`      | Sonraí suíomh Hugo.                                                                |
| `swatches`  | Swatches dathanna — `ase` (réamhshocrú), `gpl`, `sketch`, nó `svg` trí `--format`. |
| `icon-font` | Cló gréasáin íocón (TTF, WOFF2), a CSS, agus léarscáil pointechóid.                |
| `pendo`     | `global.css` stíleáilte Instructure do threoracha Pendo.                           |

## Brataí coitianta

- `--out <dir>` — cá scríobhadh é (réamhshocrú `./pantoken-out`).
- `--theme <name>` — `rebrand` (réamhshocrú), `canvas`, nó `canvasHighContrast`.
- `--icons a,b,c` — ainmneacha íocón le déanamh mar acmhainní dúchais, do spriocanna a thacaíonn leo.
- `--class <Name>` — an cineál nó ainm pacáiste ginte, do spriocanna a bhfuil gá leo.
- `--format <fmt>` — an fhormáid aschuir, do `swatches` agus `rust`.

## Samplaí

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Tugann roinnt spriocanna feidhmeanna shimplí amach freisin, ionas gur féidir iad a ghlaoch ó do fhoclóir tógála féin seachas ón CLI.
Féach an [Tagairt API](/api/) do gach pacáiste ardáin.
