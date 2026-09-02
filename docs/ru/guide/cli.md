# Интерфейс командной строки pantoken

`@pantoken/cli` предоставляет `pantoken generate <target>`, который записывает исходники токенов в целевой репозиторий.
Используйте его, когда платформе нужен сгенерированный код, а не зависимость во время выполнения — нативные приложения,
темы CMS и генераторы статических сайтов.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Цели (Targets)

| Target      | Output                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| `swift`     | Исходники Swift под `Sources/<name>` плюс заглушка манифеста SwiftPM `Package.swift`. |
| `android`   | Файлы ресурсов Android в формате XML.                                                 |
| `compose`   | Kotlin-файл для Jetpack Compose.                                                      |
| `flutter`   | Dart-файл для Flutter.                                                                |
| `rust`      | `tokens.rs` для egui (по умолчанию) или iced (`--format iced`).                       |
| `wordpress` | Block-тема `theme.json`.                                                              |
| `vanilla`   | Vanilla Forums `variables.json`.                                                      |
| `drupal`    | Активы темы Drupal.                                                                   |
| `jekyll`    | Данные сайта Jekyll.                                                                  |
| `hugo`      | Данные сайта Hugo.                                                                    |
| `swatches`  | Палитры цвета — `ase` (по умолчанию), `gpl`, `sketch` или `svg` через `--format`.     |
| `icon-font` | Веб-шрифт иконок (TTF, WOFF2), его CSS и карта кодпоинтов.                            |
| `pendo`     | Стилизация Instructure для `global.css` в руководствах Pendo.                         |

## Общие флаги

- `--out <dir>` — куда записывать (по умолчанию `./pantoken-out`).
- `--theme <name>` — `rebrand` (по умолчанию), `canvas` или `canvasHighContrast`.
- `--icons a,b,c` — имена иконок для генерации как нативных ресурсов, для поддерживаемых целей.
- `--class <Name>` — сгенерированное имя типа или пакета, для целей, которым оно требуется.
- `--format <fmt>` — формат вывода, для `swatches` и `rust`.

## Примеры

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Несколько целей также предоставляют простую функцию, чтобы вы могли вызывать их из собственной сборки вместо
CLI. Смотрите [API reference](/api/) для каждого пакетa платформы.
