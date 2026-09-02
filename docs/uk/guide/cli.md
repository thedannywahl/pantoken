# Інструмент командного рядка pantoken

`@pantoken/cli` надає `pantoken generate <target>`, який записує джерело токенів у цільовий репозиторій.
Використовується, коли платформі потрібен згенерований код замість рантайм-залежності — нативні додатки,
теми для CMS та генератори статичних сайтів.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Цілі

| Target      | Output                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------- |
| `swift`     | Swift-код у `Sources/<name>` плюс заглушка манифесту SwiftPM `Package.swift`.            |
| `android`   | Android XML-файли ресурсів.                                                              |
| `compose`   | Файл Kotlin для Jetpack Compose.                                                         |
| `flutter`   | Файл Dart для Flutter.                                                                   |
| `rust`      | `tokens.rs` для egui (за замовчуванням) або iced (`--format iced`).                      |
| `wordpress` | Блок-тема `theme.json`.                                                                  |
| `vanilla`   | Vanilla Forums `variables.json`.                                                         |
| `drupal`    | Активи теми Drupal.                                                                      |
| `jekyll`    | Дані сайту Jekyll.                                                                       |
| `hugo`      | Дані сайту Hugo.                                                                         |
| `swatches`  | Кольорові зразки — `ase` (за замовчуванням), `gpl`, `sketch` або `svg` через `--format`. |
| `icon-font` | Веб-шрифт для іконок (TTF, WOFF2), його CSS та мапа кодпоінтів.                          |
| `pendo`     | Стилізований під Instructure `global.css` для посібників Pendo.                          |

## Загальні прапорці

- `--out <dir>` — куди записувати (за замовчуванням `./pantoken-out`).
- `--theme <name>` — `rebrand` (за замовчуванням), `canvas` або `canvasHighContrast`.
- `--icons a,b,c` — імена іконок для виводу як нативні активи, для цілей, що їх підтримують.
- `--class <Name>` — згенерований тип або ім'я пакета, для цілей, яким це потрібно.
- `--format <fmt>` — формат виводу, для `swatches` та `rust`.

## Приклади

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Декілька цілей також експонують просту функцію, тож їх можна викликати з власного процесу збірки замість
CLI. Див. [посилання на API](/api/) для кожного пакета платформи.
