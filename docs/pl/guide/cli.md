# Interfejs wiersza poleceń pantoken

`@pantoken/cli` dostarcza `pantoken generate <target>`, które zapisuje źródła tokenów do docelowego repozytorium.
Używaj go, gdy platforma potrzebuje wygenerowanego kodu zamiast zależności w czasie wykonywania — aplikacje natywne,
motywy CMS i generatory stron statycznych.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Cele (Targets)

| Cel (Target) | Wyjście (Output)                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `swift`      | Kod źródłowy Swift w katalogu `Sources/<name>` oraz szablonowy manifest SwiftPM `Package.swift`. |
| `android`    | Pliki zasobów XML dla Androida.                                                                  |
| `compose`    | Plik Kotlin dla Jetpack Compose.                                                                 |
| `flutter`    | Plik Dart dla Fluttera.                                                                          |
| `rust`       | `tokens.rs` dla egui (domyślnie) lub iced (`--format iced`).                                     |
| `wordpress`  | Blokowy motyw `theme.json`.                                                                      |
| `vanilla`    | `variables.json` dla Vanilla Forums.                                                             |
| `drupal`     | Zasoby motywu Drupal.                                                                            |
| `jekyll`     | Dane strony Jekyll.                                                                              |
| `hugo`       | Dane strony Hugo.                                                                                |
| `swatches`   | Próbki kolorów — `ase` (domyślnie), `gpl`, `sketch`, lub `svg` przez `--format`.                 |
| `icon-font`  | Czcionka ikon web (TTF, WOFF2), jej CSS i mapa kodów (codepoints).                               |
| `pendo`      | Wystylizowany przez Instructure `global.css` dla przewodników Pendo.                             |

## Wspólne flagi

- `--out <dir>` — miejsce zapisu (domyślnie `./pantoken-out`).
- `--theme <name>` — `rebrand` (domyślnie), `canvas` lub `canvasHighContrast`.
- `--icons a,b,c` — nazwy ikon do wygenerowania jako zasoby natywne, dla celów które to wspierają.
- `--class <Name>` — wygenerowana nazwa typu lub pakietu, dla celów które tego wymagają.
- `--format <fmt>` — format wyjściowy, dla `swatches` i `rust`.

## Przykłady

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Kilka celów udostępnia również zwykłą funkcję, więc można je wywołać z własnego systemu budowania zamiast
używać CLI. Zobacz [API reference](/api/) dla każdego pakietu platformy.
