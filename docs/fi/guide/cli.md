# Pantokenin CLI

`@pantoken/cli` tarjoaa `pantoken generate <target>`, joka kirjoittaa token-lähteen kohderepoon. Ota se käyttöön, kun alusta tarvitsee generoituja kooditiedostoja ajonaikaisen riippuvuuden sijaan — natiivi‑sovellukset, CMS‑teemat ja staattisten sivustojen generaattorit.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Kohteet

| Kohde       | Tuotos                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------- |
| `swift`     | Swift‑lähdekoodi hakemistoon `Sources/<name>` sekä `Package.swift` SwiftPM‑manifestin stub. |
| `android`   | Androidin XML‑resurssitiedostot.                                                            |
| `compose`   | Jetpack Compose ‑Kotlin‑tiedosto.                                                           |
| `flutter`   | Flutter‑Dart‑tiedosto.                                                                      |
| `rust`      | `tokens.rs` egui:lle (oletus) tai iced (`--format iced`).                                   |
| `wordpress` | Lohko‑teema `theme.json`.                                                                   |
| `vanilla`   | Vanilla Forums ‑`variables.json`.                                                           |
| `drupal`    | Drupal‑teeman resurssit.                                                                    |
| `jekyll`    | Jekyll‑sivuston data.                                                                       |
| `hugo`      | Hugo‑sivuston data.                                                                         |
| `swatches`  | Värinäytteet — `ase` (oletus), `gpl`, `sketch` tai `svg` käyttäen `--format`.               |
| `icon-font` | Kuvake‑webfontti (TTF, WOFF2), sen CSS ja codepoints‑kartta.                                |
| `pendo`     | Instructure‑tyylinen `global.css` Pendo‑oppaisiin.                                          |

## Yleiset liput

- `--out <dir>` — minne kirjoitetaan (oletus `./pantoken-out`).
- `--theme <name>` — `rebrand` (oletus), `canvas` tai `canvasHighContrast`.
- `--icons a,b,c` — kuvake‑nimet, jotka lähetetään natiiviresursseina, kohteille jotka tukevat niitä.
- `--class <Name>` — generoitu tyyppi- tai paketinnimi kohteille, jotka tarvitsevat sellaisen.
- `--format <fmt>` — lähtöformaatti, `swatches`:lle ja `rust`:lle.

## Esimerkit

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Useat kohteet tarjoavat myös tavallisen funktion, joten voit kutsua niitä omasta build‑prosessistasi CLI:n sijaan. Katso kunkin alustan paketin [API‑viite](/api/).
