# pantoken CLI

`@pantoken/cli` 提供 `pantoken generate <target>`，會將 token 原始檔寫入目標倉庫。
當平台需要產生程式碼而非執行時相依（例如原生應用程式、CMS 主題與靜態網站產生器）時，請使用它。

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## 目標

| Target      | Output                                                                                 |
| ----------- | -------------------------------------------------------------------------------------- |
| `swift`     | Swift 原始碼於 `Sources/<name>` 下，並附帶一個 `Package.swift` SwiftPM manifest 範本。 |
| `android`   | Android XML 資源檔案。                                                                 |
| `compose`   | 一個 Jetpack Compose 的 Kotlin 檔案。                                                  |
| `flutter`   | 一個 Flutter 的 Dart 檔案。                                                            |
| `rust`      | 一個 `tokens.rs`（例如 egui（預設）或 iced（`--format iced`））。                      |
| `wordpress` | 一個區塊主題的 `theme.json`。                                                          |
| `vanilla`   | 一個 Vanilla Forums 的 `variables.json`。                                              |
| `drupal`    | Drupal 主題資產。                                                                      |
| `jekyll`    | Jekyll 網站資料。                                                                      |
| `hugo`      | Hugo 網站資料。                                                                        |
| `swatches`  | 色票 — `ase`（預設）、`gpl`、`sketch`，或透過 `--format` 產生 `svg`。                  |
| `icon-font` | 一個圖示網頁字型（TTF、WOFF2）、其 CSS，與字元對應表。                                 |
| `pendo`     | 用於 Pendo 指南的 Instructure 風格 `global.css`。                                      |

## 常用參數

- `--out <dir>` — 寫入位置（預設 `./pantoken-out`）。
- `--theme <name>` — `rebrand`（預設）、`canvas`，或 `canvasHighContrast`。
- `--icons a,b,c` — 要輸出的圖示名稱，供支援該功能之目標作為原生資產使用。
- `--class <Name>` — 產生的類型或套件名稱，供需要的目標使用。
- `--format <fmt>` — 輸出格式，供 `swatches` 與 `rust` 使用。

## 範例

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

若干目標亦提供一個簡單的函式，讓你可以在自己的建構流程中呼叫，而非使用 CLI。請參閱各平台套件的 [API 參考](/api/)。
