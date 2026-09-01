# pantoken CLI

`@pantoken/cli` 提供了 `pantoken generate <target>`，可将令牌源写入目标仓库。
当平台需要生成的代码而不是运行时依赖时使用它 —— 原生应用、
CMS 主题和静态站点生成器。

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## 目标

| Target      | Output                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | 在 `Sources/<name>` 下的 Swift 源代码，以及一个 `Package.swift` SwiftPM 清单存根。 |
| `android`   | Android XML 资源文件。                                                             |
| `compose`   | 一个 Jetpack Compose Kotlin 文件。                                                 |
| `flutter`   | 一个 Flutter Dart 文件。                                                           |
| `rust`      | 一个用于 egui（默认）的 `tokens.rs` 或用于 iced 的 `--format iced`。               |
| `wordpress` | 一个区块主题的 `theme.json`。                                                      |
| `vanilla`   | 一个 Vanilla Forums 的 `variables.json`。                                          |
| `drupal`    | Drupal 主题资源。                                                                  |
| `jekyll`    | Jekyll 站点数据。                                                                  |
| `hugo`      | Hugo 站点数据。                                                                    |
| `swatches`  | 色板 — 通过 `--format` 输出 `ase`（默认）、`gpl`、`sketch` 或 `svg`。              |
| `icon-font` | 一个图标网页字体（TTF、WOFF2）、其 CSS 以及代码点映射。                            |
| `pendo`     | 用于 Pendo 指南的 Instructure 风格的 `global.css`。                                |

## 常用标志

- `--out <dir>` — 写入位置（默认 `./pantoken-out`）。
- `--theme <name>` — `rebrand`（默认）、`canvas` 或 `canvasHighContrast`。
- `--icons a,b,c` — 要作为原生资产输出的图标名称（适用的目标）。
- `--class <Name>` — 生成的类型或包名称（需要时使用）。
- `--format <fmt>` — 输出格式，用于 `swatches` 和 `rust`。

## 示例

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

若干目标也导出一个普通函数，因此可以在自己的构建流程中调用它们，而不是使用 CLI。有关每个平台包的详细信息，请参阅 [API 参考](/api/)。
