# CDN と配布

pantoken はすべてのパッケージを npm に公開しているため、ビルドやバンドラ不要で CDN からトークン、コンポーネント、Web コンポーネントを直接読み込めます。このページでは CSS 結合 URL（インタラクティブビルダー付き）と Web コンポーネントの導入方法を説明します。

## トークンの基盤

すべての pantoken コンポーネントはページ上のトークンシートから `--instui-*` カスタムプロパティを読み取ります。次の 2 種類が提供されています:

- `@pantoken/css/dist/style.lean.css` — 推奨される CDN 基盤。フルアイコンセットを除くすべてのトークンを含み、gzip で約 23 KB です。
- `@pantoken/css/dist/style.css` — 約 1,777 個のアイコングリフトークン（`--instui-icon-*`）を含むフルシート。gzip で約 140 KB。`var(--instui-icon-*)` 経由で広範にアイコンを参照する場合はこれを読み込んでください。

エレベーションスケールとフォーカスリング変数は両方のシートに含まれるため、基盤のみを読み込んでいてもシャドウやフォーカスリングは動作します。

## コンポーネントとアイコンを選ぶ

[インタラクティブ CDN ピッカー](/guide/cdn-picker) は CSS 用の jsDelivr 結合 URL と JavaScript パッケージ用のスニペットを生成します。開いて必要なものにチェックし、生成された出力をコピーしてください。

- **Components タブ** — 個別のコンポーネントスタイルシートまたは全体の `components.css` バレルを選択します。必要ならベースのリセットやスペーシング／カラーのユーティリティを追加してください。
- **JS タブ** — `@pantoken/interactions` の ESM インポートスニペットをコピーします。
- **Icons タブ** — InstUI セット（約 1,800 アイコン）や Simple Icons（約 3,300 ブランドグリフ）から個別アイコンを選べます。ピッカーはアイコン CSS ファイル用に別の結合 URL を出力するので、実際に使用するアイコンだけを読み込めます。
- **Web Components タブ** — `@pantoken/web-components` スニペット（ESM の選択的登録または従来のスクリプトブートストラップ）を生成します。

各コンポーネントファイルは小さく、ほとんどが約 2 KB です。アイコンをレンダリングするコンポーネント（`alert`, `checkbox`、および他いくつか）はグリフを必要とするため、ピッカーはリーンシートを選んだ場合に `@pantoken/components/dist/component-icons.css`（gzip で約 0.5 KB — コンポーネントセットが使う 11 アイコン）を追加します。フルシートは既にこれらを含みます。

### 読み込み順とフォント

トークン基盤を最初に読み込み、その後オプションのベースリセット、次にコンポーネントファイル、最後にユーティリティを読み込んでください — ユーティリティは上書き用なので、カスケードで後に配置されたときにのみコンポーネントのルールを実際に上書きします。上の結合 URL は既に正しい順序に並べています。フォントだけは例外です: `@pantoken/components/dist/fonts.css` は相対パスでフォントファイルを指すため、結合では書き換えられません — そのため単独の `<link>` として読み込んでください:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### 一度に全部読み込む

ピッカーで **All components** を選択するとバレルに切り替わりますし、自分でバレルを指すこともできます（gzip で約 141 KB）。トークンシートと一緒に読み込んでください:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web コンポーネント

`@pantoken/web-components` はフレームワークに依存しない `<instui-*>` カスタム要素を登録します。これらは自身の CSS をインラインしますが、ページ上のシートからトークンを読み取るため、トークン基盤も読み込んでください。

### ES モジュール（推奨）

ESM CDN はパッケージの依存関係を解決してくれます。これで全ての要素が登録されます:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

アイコンをレンダリングする要素（例: `<instui-alert>`）がグリフを解決できるように、フルトークンシート（またはリーンシートに加えて `component-icons.css`）を使用してください。

一部の要素だけを登録し、そのネストされた依存も含めたい場合は `register` をインポートし `only` を渡します:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### 従来の script タグ

モジュールを使えない場合のドロップインとして IIFE ビルドを読み込めます。これは依存をバンドルし、ロード時にすべての要素を自動登録して `PantokenWebComponents` グローバルを公開します:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

ESM 経路より大きく、`@pantoken/components` と `@pantoken/icons` をインラインするため、モジュールを使えない場合にのみ選んでください。

## バージョンの固定

上記の URL やピッカーが生成する URL は最新リリースを追跡します。プロダクションではメジャー（または厳密な）バージョンを固定してください — 例えば `@pantoken/css@0` — アップグレードで驚かされないようにします。
