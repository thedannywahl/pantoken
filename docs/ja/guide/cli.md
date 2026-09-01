# pantoken CLI

`@pantoken/cli` はトークンソースをターゲットリポジトリに書き込む `pantoken generate <target>` を提供します。ランタイム依存よりも生成コードが必要なプラットフォーム（ネイティブアプリ、CMS テーマ、静的サイトジェネレータ）向けに使用してください。

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## ターゲット

| Target      | Output                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `swift`     | `Sources/<name>` 以下の Swift ソースと、`Package.swift` の SwiftPM マニフェストのスタブ。            |
| `android`   | Android の XML リソースファイル。                                                                    |
| `compose`   | Jetpack Compose の Kotlin ファイル。                                                                 |
| `flutter`   | Flutter の Dart ファイル。                                                                           |
| `rust`      | egui（デフォルト）または iced（`--format iced`）用の `tokens.rs`。                                   |
| `wordpress` | ブロックテーマ用の `theme.json`。                                                                    |
| `vanilla`   | Vanilla Forums の `variables.json`。                                                                 |
| `drupal`    | Drupal テーマのアセット。                                                                            |
| `jekyll`    | Jekyll サイト用データ。                                                                              |
| `hugo`      | Hugo サイト用データ。                                                                                |
| `swatches`  | カラースウォッチ — デフォルトは `ase`、その他に `gpl`、`sketch`、または `svg` を `--format` 経由で。 |
| `icon-font` | アイコンのウェブフォント（TTF、WOFF2）、その CSS、およびコードポイントマップ。                       |
| `pendo`     | Pendo ガイド用の Instructure スタイルの `global.css`。                                               |

## 共通フラグ

- `--out <dir>` — 書き込み先（デフォルト `./pantoken-out`）。
- `--theme <name>` — `rebrand`（デフォルト）、`canvas`、または `canvasHighContrast`。
- `--icons a,b,c` — 対応するターゲット向けにネイティブアセットとして出力するアイコン名。
- `--class <Name>` — 生成される型またはパッケージ名（必要なターゲット用）。
- `--format <fmt>` — `swatches` および `rust` 用の出力フォーマット。

## 例

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

いくつかのターゲットはプレーンな関数も公開しているので、CLI の代わりに自身のビルドから呼び出すことができます。各プラットフォームパッケージの [API リファレンス](/api/) を参照してください。
