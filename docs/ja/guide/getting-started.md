# はじめに

pantoken は Instructure UI のデザイントークンとアイコンを取り込み、一度解決してからその単一のモデルを複数プラットフォーム向けのパッケージに変換します: プレーンなスタイルシート、SCSS と Less、React・Vue・Svelte、Tailwind と Panda、ネイティブの Swift と Kotlin、WordPress と Drupal、Figma など。

作業に必要な最小のパッケージをインストールします。すべては統一された `pantoken` パッケージから再エクスポートされているため、まずそこから始めて後で絞り込むことができます。

## スタータープロジェクトを足場構築する

pantoken を試す最速の方法は、あらかじめインストールと接続がされたスタータープロジェクトをスキャフォールドすることです。

```sh
npx create-pantoken-app react
```

対応プラットフォーム: `components` (プレーン HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `--dir <path>` やプログラム的な利用については [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) を参照してください。

AI コーディングエージェントを使う場合はインストール不要 — スキルを直接指し示してください:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Gemini CLI、Cursor CLI、OpenAI Codex CLI、GitHub Copilot CLI、Amazon Q Developer CLI に対しても同様に動作します — `claude` を `gemini`、`agent`、`codex`、`copilot -p`、または `q chat` に置き換えてください。pantoken のエージェントルールをリポジトリに恒久的に組み込みたい場合（AGENTS.md、エディタルール、このスキルのローカルコピー）、代わりに `npx @pantoken/ai init` を実行してください。

## トークンモデル

トークンは `--instui-<group>-<name>` という名前の CSS カスタムプロパティです。例えば `--instui-color-background-brand` や `--instui-spacing-space-md` のように使います。デフォルトテーマを含む 3 つのテーマが提供されます: `rebrand`（デフォルト。ライトとダークで異なる箇所は `light-dark()`）、`canvas`、および `canvasHighContrast`。アイコンは Lucide と Instructure のカスタムグリフから派生した `<image>` トークン（`--instui-icon-<name>`）です。

## Web アプリのスタイリング

スタイルシートをインストールして一度インポートします。すべての `--instui-*` プロパティを定義するため、自分の CSS から直接参照できます。

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## どこでもアイコンを使う

Web コンポーネントはフレームワークを問いません。移植作業は不要です。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS トークン

アイコンは CSS カスタムプロパティ（`--instui-icon-<name>`）です。スタイルシートを一度読み込み、任意のアイコンを `mask-image` または `background-image` として参照できます — 個別アイコンのインポートは不要です。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 単一アイコン vs 全セット

`@pantoken/icons` は 2 つの名前付きエクスポートを公開します。配列全体を反復せずに単一アイコンを取り出すには `iconsByName` を使用します:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

ピッカーを構築するなど全セットが必要な場合は `icons` を使用してください:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

両方のエクスポートはモジュール初期化時に完全な IR を読み込みます — このレベルではアイコン単位のツリーシェイキングは行われません。軽量な CSS のみの読み込みが必要な場合、[CDN ピッカー](/guide/cdn-picker) を使って必要なアイコンだけをまとめた URL を生成してください。

## ネイティブプラットフォーム用に生成する

CLI はトークンソースをターゲットリポジトリへ書き込みます。ランナー以外のインストールは不要です:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

すべてのターゲットについては [the pantoken CLI](/guide/cli) を参照してください。

## VS Code の作成支援ヒント

`@pantoken/pantoken` は現在、下流プロジェクトが HTML/CSS でクラスやトークンの補完を得られるように VS Code の custom-data ファイルを同梱しています（pantoken 固有の拡張をインストールする必要はありません）。

1. 統一パッケージをインストールします:

```sh
npm i @pantoken/pantoken
```

1. コンシューマーワークスペースから同梱の custom-data JSON を VS Code にポイントします:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. VS Code を再読み込み（または "Developer: Reload Window" を実行）して新しいデータを適用します。

これにより `instui-*` クラストークン（および `-modifier` クラストークン）と `--instui-*` カスタムプロパティの補完が有効になります。

## 次に進む場所

- [パッケージマップ](/guide/packages) — タスクごとにどのパッケージを使うべきか。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — コンシューマリポジトリにエージェントアセットとルールをインストールする。
- [アーキテクチャ](/guide/architecture) — トークンモデル、コア、出力がどのように組み合わさるか。
- [API リファレンス](/api/) — すべてのエクスポートシンボル（ソースから生成）。
