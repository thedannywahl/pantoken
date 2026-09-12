# はじめに

Pantokenは[Instructure UI](https://instructure.design)のデザイントークンとアイコンを一度解決し、その単一モデルを多数のプラットフォーム向けのパッケージに整形します：プレーンなスタイルシート、SCSSやLess、ReactやVueやSvelte、TailwindやPanda、ネイティブのSwiftやKotlin、WordPressやDrupal、Figmaなど。

用途に合う最小のパッケージをインストールします。すべては統一された`pantoken`パッケージでも再エクスポートされているので、まずそこから始めて後で絞り込むことができます。

## スタータープロジェクトをスキャフォールドする

pantokenを試す最速の方法：あらかじめインストールされ接続されたスタータープロジェクトをスキャフォールドすることです。

```sh
npx create-pantoken-app
```

対応プラットフォーム：`components`（プレーンHTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。`--dir <path>`やプログラムからの利用については[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)を参照してください。

AIコーディングエージェントを使用していますか？インストール不要 — スキルを直接指示してください：

```prompt
create.pantoken.app/SKILL.md を取得し、それに従ってこのプロジェクトに pantoken をセットアップしてください。
```

pantokenのエージェントルールをリポジトリに恒久的に組み込みたい場合（AGENTS.md、エディタルール、このスキルのローカルコピー）、代わりに`npx @pantoken/ai init`を実行してください。

## トークンモデル

トークンは`--instui-<group>-<name>`という名前のCSSカスタムプロパティで、例えば`--instui-color-background-brand`や`--instui-spacing-space-md`のようなものです。3つのテーマが同梱されています：デフォルトの`rebrand`（ライトとダークが異なる箇所は`light-dark()`）、`canvas`、および`canvasHighContrast`。アイコンはLucideにInstructureのカスタムグリフを加えた派生の`<image>`トークン（`--instui-icon-<name>`）です。

## ウェブアプリのスタイル適用

スタイルシートをインストールして一度インポートします。すべての`--instui-*`プロパティを定義しているので、自分のCSSから直接参照できます。

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

このWebコンポーネントはフレームワークを問わず動作し、移植作業は不要です。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSSトークン

アイコンはCSSカスタムプロパティ（`--instui-icon-<name>`）です。スタイルシートを一度読み込み、任意のアイコンを`mask-image`または`background-image`として参照できます — アイコンごとの個別インポートは不要です。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 単一アイコン vs 全セット

`@pantoken/icons`は2つの名前付きエクスポートを公開します。配列全体を反復せずに1つのアイコンを取り出すには`iconsByName`を使用してください：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

ピッカーを作るなど全セットが必要な場合は`icons`を使用します：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

どちらのエクスポートもモジュール初期化時に完全なIRを読み込みます — このレベルではアイコン個別のツリーシェイキングはありません。CSSのみで軽量に読み込みたい場合は、必要なアイコンだけを組み合わせたURLを生成する[CDNピッカー](/guide/cdn-picker)を使用してください。

## ネイティブプラットフォーム向けの生成

CLIはターゲットリポジトリにトークンソースを書き込みます。ランナー以外のインストールは不要です：

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

すべてのターゲットについては[the pantoken CLI](/guide/cli)を参照してください。

## VS Codeのオーサリングヒント

`@pantoken/pantoken`はVS Codeのカスタムデータファイルを同梱しており、ダウンストリームプロジェクトはpantoken専用拡張をインストールせずにHTML/CSSでクラスやトークンの補完を得られます。

1. 統一パッケージをインストールします：

```sh
npm i @pantoken/pantoken
```

1. コンシューマのワークスペースから同梱のcustom-data JSONをVS Codeに向けます：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. VS Codeをリロードする（または「Developer: Reload Window」を実行）して新しいデータを適用します。

これにより`instui-*`クラストークン（および`-modifier`クラストークン）や`--instui-*`カスタムプロパティの補完が有効になります。

## 次はどこへ

- [パッケージマップ](/api/) — タスク別にどのパッケージを使うべきか。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — コンシューマリポジトリにエージェント資産とルールをインストールする。
- [アーキテクチャ](/guide/architecture) — トークンモデル、コア、出力がどのように結合するか。
- [APIリファレンス](/api/) — ソースから生成されたすべてのエクスポートシンボル。
