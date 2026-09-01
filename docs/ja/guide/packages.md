# パッケージマップ

pantoken は小さな単一目的パッケージをバケットにまとめたモノレポです。用途に合うパッケージをインストールするか、統合された `pantoken` パッケージをインストールしてサブパスからインポートしてください（例: `pantoken/css`, `pantoken/react`, `pantoken/tailwind`）。

## コア

他のすべてが構築する共有モデルとトランスフォーマー。

| Package                                                 | 機能                                                                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | 依存ゼロの TypeScript 型: `Token` 形状とプラグイン契約。                                                            |
| [`@pantoken/core`](/api/packages/core/src/)             | 上流のトークンとアイコンを正規の IR に解決し、CSS をレンダリングします。                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | 解決済み IR をテーマごとの静的 JSON として、及び Tokens Studio の生ソースとして提供します。                         |
| [`@pantoken/utils`](/api/packages/utils/src/)           | トークンリゾルバ、参照用正規表現、ケースと色のヘルパー、ドリフトチェック、トークン→ユーティリティクラスのエミッタ。 |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | `definePlugin` を使って pantoken プラグインを構築・合成します。                                                     |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — ネイティブおよびプラットフォーム向けソースを出力します。                             |

## フォーマット

トークンをファイル形式に変換します。

| Package                                                | 出力                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property` 型付けされた CSS、`light-dark()`、およびデータURIアイコン。                                                                                                                                                            |
| [`@pantoken/scss`](/api/formats/scss/src/)             | 単一モードに解決された SCSS 変数。                                                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Less 変数。                                                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus 変数。                                                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) ドキュメント。                                                                                                                                                                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | JavaScript と JSON としての IR（コアにも記載）。                                                                                                                                                                                   |
| [`@pantoken/icons`](/api/formats/icons/src/)           | アイコントークンを扱いやすく表示するためのビュー。                                                                                                                                                                                 |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | アイコンウェブフォント（TTF、WOFF2）とその CSS。                                                                                                                                                                                   |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI 風の CSS コンポーネントライブラリ（button、alert、table 等）と、フォーカスリングを含むベースリセット、プローズスタイリング、共通ユーティリティ、ブランドフォントを含みます。詳細は [Components](/guide/components) を参照。 |

## レンダラー

フレームワークとツールの統合。

| Package                                                                                                                                          | 用途                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React フック、`<Icon>`、およびトークンプライド。                   |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | 各フレームワークに接続された Web コンポーネント。                  |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet に適したトークンオブジェクト（CSS 変数を使わない）。    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` とスタイル付きプリミティブ、フレームワーク非依存。 |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Astro サイト向けのトークンセットアップ。                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Markdown 内のアイコントークンとスウォッチ。                        |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | アイコンコードとカラースウォッチ用の markdown-it プラグイン。      |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | styled-components と Emotion 用の型安全なテーマ。                  |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI テーマ。                                               |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Bootstrap と shadcn/ui 向けの CSS 変数ブリッジ。                   |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Foundation 向けの Sass 設定オーバーライドと CSS オーバーレイ。     |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus と VitePress 用のテーマ。                               |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify 用の `docs.json` テーマ（色と背景）。                     |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook テーマ。                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Pendo ガイド向けの Instructure スタイルのグローバル CSS。          |

## バンドラー

ビルドツールとの統合。

| Package                                             | 用途                                                |
| --------------------------------------------------- | --------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | 仮想モジュールと CSS 注入を備えた Vite プラグイン。 |
| [`@pantoken/next`](/api/bundlers/next/src/)         | Next.js 用の `withPantoken` `transpilePackages`。   |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | webpack プラグイン。                                |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule。                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind プリセット。                               |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS プリセット。                              |

## プラットフォーム

CLI またはそれぞれの API によって出力されるネイティブおよびサイトジェネレータターゲット。

| Package                                                                                        | 出力                                          |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift ソースと SwiftPM マニフェストのスタブ。 |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML リソース。                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose の Kotlin。                   |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter の Dart。                             |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | egui や iced 向けの Rust 定数。               |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress ブロックテーマ `theme.json`。       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`。             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal テーマアセット。                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo と Jekyll 用のサイトデータ。             |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | HTML メール向けのインライン対応値。           |

## デザイン

デザインツール向け。

| Package                                           | 出力                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables のペイロード。                                        |
| [`@pantoken/swatches`](/api/design/swatches/src/) | カラースウォッチ（ASE、GPL、Sketch）と表示可能な SVG サンプルシート。 |

## プラグイン

トークンや CSS 出力を拡張するオプショントランスフォーム。詳細は [Plugins](/guide/plugins) を参照。

| Package                                                                               | 追加される機能                                                    |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | `--instui-stacking-*` トークンとして名付けられた z-index 深度。   |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` レイアウトデバッグ用のアウトライン。         |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | simple-icons 由来のブランドアイコン。                             |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure 製品ロゴを SVG、データURI、および画像トークンとして。 |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | 未使用のカスタムプロパティを削除する PostCSS プラグイン。         |

## ツール

モノレポ自体のビルド、ドキュメント、デモのインフラ。大部分は内部用ですが、個別に公開される部品もあるためここで説明します。

| Package                                            | 機能の説明                                                                                                                                                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | 統合された `pantoken` パッケージのバレルと、その依存から `exports` を生成します。                                                                                                                                     |
| `@pantoken/validate-generated`                     | ドリフトゲート: 生成されたすべてのスタイルシートがトークン IR に対して解決されるかをチェックします。                                                                                                                  |
| [`@pantoken/demo`](/api/tools/demo/src/)           | セルフホストのライブデモランナー: `@demo` 仕様を iframe に解決し、シンプルな HTML/CSS/JS を同一オリジンでレンダリングし、トークンテーマを適用します。                                                                 |
| `@cssdoc/core` (external)                          | 汎用の CSS ドキュメント抽出器（CSS 用の TSDoc）: ドックコメントと CSS AST を解析して、ドキュメントが CSS API リファレンスとして出力するモデルを生成します。独自のリポジトリで管理され、リンク依存として消費されます。 |

`@pantoken/validate-generated` は一度だけ実行されるスクリプト（`pnpm run ready` によって呼び出される）なので API ページはなく、その他のパッケージにはあります。

## AI

消費者向け AI セットアップ資産。これらは pantoken を利用するプロジェクト向けで、pantoken 自体の開発用ではありません。

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) は `AGENTS.md`、`llms.txt`、およびアシスタント/エディタルール（Cursor、Copilot、Windsurf、Claude Code）を消費者リポジトリにインストールします。

## 開発用プラグイン

使用するホスト別にグループ化された、我々が作成するツール用プラグイン。スタンドアロンで公開可能です。

| Package                                                                                  | 対応ホスト                                                                               |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: `@demo <provider>:<ref>` ブロックタグを埋め込み可能なデモフェンスに変換します。 |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: 上流ワークスペースパッケージ（と依存パッケージ）をソース変更時に再ビルドします。   |
