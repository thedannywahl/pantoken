# L'interfaccia a riga di comando di pantoken

`@pantoken/cli` fornisce `pantoken generate <target>`, che scrive la sorgente dei token in un repository di destinazione.
Usalo quando una piattaforma richiede codice generato anziché una dipendenza a runtime — app native,
temi CMS e generatori di siti statici.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Destinazioni

| Destinazione | Uscita                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- |
| `swift`      | Sorgente Swift sotto `Sources/<name>` più uno stub di manifest SwiftPM `Package.swift`. |
| `android`    | File di risorse Android XML.                                                            |
| `compose`    | Un file Kotlin per Jetpack Compose.                                                     |
| `flutter`    | Un file Dart per Flutter.                                                               |
| `rust`       | Un `tokens.rs` per egui (predefinito) o iced (`--format iced`).                         |
| `wordpress`  | Un `theme.json` per block-theme.                                                        |
| `vanilla`    | Un `variables.json` per Vanilla Forums.                                                 |
| `drupal`     | Asset per temi Drupal.                                                                  |
| `jekyll`     | Dati per siti Jekyll.                                                                   |
| `hugo`       | Dati per siti Hugo.                                                                     |
| `swatches`   | Tavolozze colore — `ase` (predefinito), `gpl`, `sketch` o `svg` tramite `--format`.     |
| `icon-font`  | Un font web di icone (TTF, WOFF2), il suo CSS e una mappa dei codepoint.                |
| `pendo`      | L'`global.css` in stile Instructure per le guide Pendo.                                 |

## Opzioni comuni

- `--out <dir>` — dove scrivere (predefinito `./pantoken-out`).
- `--theme <name>` — `rebrand` (predefinito), `canvas` o `canvasHighContrast`.
- `--icons a,b,c` — nomi delle icone da emettere come asset nativi, per le destinazioni che le supportano.
- `--class <Name>` — il tipo o nome del package generato, per le destinazioni che ne hanno bisogno.
- `--format <fmt>` — il formato di uscita, per `swatches` e `rust`.

## Esempi

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Diverse destinazioni espongono anche una funzione semplice, così puoi chiamarle dal tuo build anziché
usare la CLI. Vedi la [riferimento API](/api/) per ogni package di piattaforma.
