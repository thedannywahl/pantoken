# L'outil en ligne de commande pantoken

`@pantoken/cli` fournit `pantoken generate <target>`, qui écrit la source des tokens dans un dépôt cible.
Utilisez-le lorsqu'une plateforme a besoin de code généré plutôt que d'une dépendance d'exécution — applications natives,
thèmes CMS et générateurs de sites statiques.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Cibles

| Cible       | Sortie                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------ |
| `swift`     | Code source Swift sous `Sources/<name>` plus un stub de manifeste SwiftPM `Package.swift`. |
| `android`   | Fichiers de ressources XML Android.                                                        |
| `compose`   | Un fichier Kotlin Jetpack Compose.                                                         |
| `flutter`   | Un fichier Dart pour Flutter.                                                              |
| `rust`      | Un `tokens.rs` pour egui (par défaut) ou iced (`--format iced`).                           |
| `wordpress` | Un `theme.json` de type block-theme.                                                       |
| `vanilla`   | Un `variables.json` pour Vanilla Forums.                                                   |
| `drupal`    | Actifs de thème Drupal.                                                                    |
| `jekyll`    | Données de site Jekyll.                                                                    |
| `hugo`      | Données de site Hugo.                                                                      |
| `swatches`  | Nuanciers de couleurs — `ase` (par défaut), `gpl`, `sketch` ou `svg` via `--format`.       |
| `icon-font` | Une police d'icônes web (TTF, WOFF2), son CSS, et une carte des codepoints.                |
| `pendo`     | Le `global.css` au style Instructure pour les guides Pendo.                                |

## Options courantes

- `--out <dir>` — où écrire (par défaut `./pantoken-out`).
- `--theme <name>` — `rebrand` (par défaut), `canvas` ou `canvasHighContrast`.
- `--icons a,b,c` — noms d'icônes à émettre comme ressources natives, pour les cibles qui les supportent.
- `--class <Name>` — le type ou nom de package généré, pour les cibles qui en ont besoin.
- `--format <fmt>` — le format de sortie, pour `swatches` et `rust`.

## Exemples

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Plusieurs cibles exposent également une fonction simple, afin que vous puissiez les appeler depuis votre propre build plutôt que
depuis la CLI. Voir la [référence de l'API](/api/) pour chaque package de plateforme.
