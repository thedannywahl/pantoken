# はじめに

Pantoken は [Instructure UI](https://instructure.design) のデザイントークンとアイコンを取り込み、一度解決してからその単一のモデルを多くのプラットフォーム向けに再成形します：プレーンなスタイルシート、SCSS と Less、React と Vue と Svelte、Tailwind と Panda、ネイティブの Swift と Kotlin、WordPress と Drupal、Figma など。

作業に合う最小のパッケージをインストールします。すべては統合された `pantoken` パッケージからも再エクスポートされているので、そこから始めて後で絞り込むことができます。

## スタータープロジェクトのスキャフォールド

pantoken を素早く試す最短ルート：あらかじめインストールと設定が済んだスタータープロジェクトをスキャフォールドします。

```sh
npx create-pantoken-app
```

対応プラットフォーム：`components`（プレーン HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。プログラム的な利用や `--dir <path>` については [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) を参照してください。

AI コーディングエージェントを使う場合はインストール不要 — スキルを直接指し示してください：

```prompt
create.pantoken.app/SKILL.md を取得し、それに従ってこのプロジェクトに pantoken をセットアップしてください。
```

pantoken のエージェントルールをリポジトリに恒久的に組み込みたい場合（AGENTS.md、エディタルール、このスキルのローカルコピーなど）は、代わりに `npx @pantoken/ai init` を実行してください。

## トークンモデル

トークンは `--instui-<group>-<name>` という名前の CSS カスタムプロパティです。例えば `--instui-color-background-brand` や `--instui-spacing-space-md`。3 つのテーマが同梱されています：デフォルトの `rebrand`（ライトとダークで異なる箇所は `light-dark()`）、`canvas`、および `canvasHighContrast`。アイコンは Lucide と Instructure のカスタムグリフから派生した `<image>` トークン（`--instui-icon-<name>`）です。

## Web アプリのスタイリング

スタイルシートをインストールして一度インポートしてください。すべての `--instui-*` プロパティを定義しているので、自分の CSS から直接参照できます。

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

## アイコンをどこでも使う

Web コンポーネントはどのフレームワークでも動作し、移植は不要です。

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

アイコンは CSS カスタムプロパティです（`--instui-icon-<name>`）。スタイルシートを一度読み込み、任意のアイコンを `mask-image` または `background-image` として参照してください — アイコンごとの個別インポートは不要です。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 単一アイコン vs. フルセット

`@pantoken/icons` は二つの名前付きエクスポートを公開します。フル配列を走査せずに単一アイコンを取得するには `iconsByName` を使います：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

ピッカーを作るなど全セットが必要な場合は `icons` を使います：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

両方のエクスポートはモジュール初期化時に完全な IR を読み込みます — このレベルでのアイコン単位のツリーシェイキングはありません。軽量の CSS のみで読み込む場合は、必要なアイコンだけの結合 URL を生成する [CDN ピッカー](/guide/cdn-picker) を使用してください。

## ネイティブプラットフォーム向け生成

CLI はトークンソースをターゲットリポジトリに書き出します。ランナー以外のインストールは不要です：

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

すべてのターゲットについては [the pantoken CLI](/guide/cli) を参照してください。

## VS Code の作成支援ヒント

`@pantoken/pantoken` は現在、下流プロジェクトが pantoken 固有の拡張をインストールせずに HTML/CSS でクラスとトークンの補完を得られるよう、VS Code 用の custom-data ファイルを同梱しています。

1. 統合パッケージをインストールします：

```sh
npm i @pantoken/pantoken
```

1. 消費側のワークスペースから同梱の custom-data JSON を VS Code にポイントします：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 新しいデータを適用するために VS Code をリロードします（または「Developer: Reload Window」を実行）。

これにより `instui-*` クラストークン（および `-modifier` クラストークン）と `--instui-*` カスタムプロパティの補完が有効になります。

## 次に見る場所

- [パッケージマップ](/guide/packages) — タスク別にどのパッケージを選ぶべきか。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — コンシューマリポジトリにエージェント資産とルールをインストールする。
- [アーキテクチャ](/guide/architecture) — トークンモデル、コア、出力がどのように結びつくか。
- [API リファレンス](/api/) — ソースから生成されたすべてのエクスポートシンボル。
