# コンポーネント

`@pantoken/components` は Instructure のトークンから構築されたクラスベースのコンポーネントスタイルを出荷します。スタイルシートをインポートしてマークアップにクラスを付与してください — フレームワークは不要です。

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> カスタム要素を好む場合は、`@pantoken/web-components` が同じスタイルを `<instui-button>`、`<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` などとしてラップしています — 詳しくは [package map](/guide/packages) を参照してください。

## 慣習

このパッケージの CSS 慣習は [RSCSS](https://ricostacruz.com/rscss/index.html) の修正版に基づいています。

モディファイアは **キーと値** です — `-<prop>-<val>`、InstUI のプロップ名に揃えられているので、それ自体で意味が明確です: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`。ブールプロップはプロップ名だけで、存在することは `true` を意味します（`-has-shadow`, `-clickable`）；デフォルトでオンのブールをオフにすると反転します（`-without-background`, `-without-border`）。サイズは短縮形と長形の両方を受け入れます（`-size-sm` = `-size-small`）。名前が InstUI と異なる場合でも、InstUI 意味のクラスは動作しますが非推奨です（例: `-variant-info` → `-color-info` を使ってください）。

### 例

Instructure UI の React コンポーネント:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken コンポーネント:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

InstUI の `timeout` プロップには、単位なしのミリ秒単位 `--timeout` カスタムプロパティを設定し、Alert インタラクションを読み込んでください。正の値は自動閉鎖をスケジュールします；`0`（デフォルト）はアラートを残します。InstUI のフェードに対しては `transition` ユーティリティの `instui-transition -fade-entered` クラスを追加し、即時削除したい場合はこれらを省いてください。インタラクションは `-fade-exiting` 状態を駆動し、削除前に取消可能なバブリングする `dismiss` イベントを発火するので、アプリケーションは `preventDefault()` を呼んでアラートのマウントを維持できます。

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

プログレスバーは任意のスケールを受け入れます：`--min`（デフォルトは `0`）、`--value`、および `--max`（デフォルトは `100`）、非推奨のエイリアス `--value-now` と `--value-max` もあります。値が変わるたびに InstUI の 0.5 秒トランジションを適用するには `-should-animate` を追加してください。`.value` はルートの子要素として `.bar` と並びます；トラックの上に描画して開始位置に揃えるには `-render-value-inside` を追加してください（メーターの色に対して可読性を確保するようスタイルを調整してください）。ゼロベースのレンジにはネイティブの `<progress>` を使用し、最小値がゼロでない場合は `<meter>` を使用してください；ウェブコンポーネントは自身の `min` 属性から自動的に選択します。InstUI には不確定（indeterminate）状態がないため、`<progress>` が `value` 属性を欠く場合は pantoken 独自のベストガスです：`progress-bar` はスライディングセグメントとして `.bar` をアニメートし、`progress-circle` は固定弧でリングを回転させ、どちらも `.value` を隠します。

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

プログレスサークルは同じ任意のスケールを `--min`, `--value`, `--max` を通じて受け入れます。`--value-now` と `--value-max` は非推奨の機能的エイリアスとして残ります。InstUI のマウントアニメーションを再現するには `-should-animate` を追加し、フォーカスインタラクションバンドルを読み込んでください；`--animation-delay` は単位なしのミリ秒遅延です。非推奨の綴り `-should-animate-on-mount` と `-shold-animate-on-mount` も機能的エイリアスとして残ります。

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## クラス接頭辞

デフォルトではすべてのクラスは `instui-` 名前空間が付きます。独自のプレフィックス（またはなし）でスタイルシートをビルドするには、任意のビルダーに `prefix` を渡してください。Falsy 値（`null`, `undefined`, `""`、または省略）を渡すと接頭辞は完全に削除されるので、`class="heading -level-h1"` の代わりに `class="instui-heading -level-h1"` を作成できます:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

ダッシュ接頭辞のモディファイア（`.-color-secondary`, `.-level-h1`）はどちらの場合も変わりません。パッケージが出荷するスタイルシートは `instui` プレフィックスを維持します。

## ベース

`base.css` はオプトインのリセットで、トークンからドキュメントのグローバルデフォルトを設定します: `box-sizing`、`body` なリセット、ページサーフェス、基本テキスト色とフォント、`color-scheme`（それによって `light-dark()` トークンとネイティブコントロールがテーマに追従します）、およびベースリンク。pantoken がページを所有する場合は、コンポーネントとプローズシートの前に一度だけ読み込んでください。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

ホストが既に自身の `html` と `body` をテーマしている場合はスキップしてください — リセットはページサーフェスを描画するのでホストと競合してほしくありません。設定されるすべては低優先度の `:where()` セレクタを使っているため、あなたのルールが常に勝ちます。

`base.css` はブランドフォントを _適用し_ ます（`font-family: var(--instui-font-family-base)`、システムフォールバック付き）；それを _読み込む_ にはオプトインの `fonts.css` をインポートしてください — `@font-face` は Atkinson Hyperlegible Next のルールで、パッケージに同梱された woff2 を指します。フォントは約 350 kB 程度で自己ホスティングの判断は意図的な選択なので、分離されています。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## スクリーンリーダー用コンテンツ

<p>この文の後に隠しメッセージがあります。<span class="instui-screen-reader-content">スクリーンリーダーだけがこれを読み上げます。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` は要素を視覚的に隠しつつアクセシビリティツリーには残します — ラベルや補助技術に読ませたいステータステキストなどに使います。

## ユーティリティ

`utilities.css` は横断的なクラス群のオプトインレイヤーです: `View` プリミティブ、トークンスケールのスペーシング、意味的なカラーオーバーライド。コンポーネントの `-modifier` クラスとは異なり、これらは **ダブルダッシュ**（`--mod`）を使うためコンポーネント自身のモディファイア名と衝突せず、どんな要素にも適用できます — 素の要素にも、コンポーネントに合成しても構いません。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">アクセントブルーのサーフェスにオンカラーのテキスト。</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto で中央配置。</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` は InstUI の `View` です。スペーシングと色を重ねるためのベースで、独自のビジュアルプロップに対するキーと値のモディファイアを持っているのでユーティリティを呼び出す必要がありません:
`-background-*`（サーフェス）、`-border-radius-{small,medium,large,circle,pill}`、`-border-width-{small,medium,large}` + `-border-color-*`、`-shadow-{resting,above,topmost}`、`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*`、および `-cursor-*` — これらは `view` の単一ダッシュモディファイアで、下記のダブルダッシュユーティリティとは無関係です。幅/高さ/インセットなどの自由値プロップはインラインスタイルのままにしてください；`margin`/`padding` はスペーシングユーティリティを使います。

**スペーシング** — スペーシングスケール上の各辺用クラス。`{m|p}{side}-{step}` のように読んでください: マージンなら `m`、パディングなら `p`（または完全な単語 `margin`/`padding`）、オプションの論理的な辺、そしてステップ番号。したがって `.--m-lg` と `.--margin-lg` は同じで、`.--pt-md` と `.--paddingt-md` も同じです。

- 辺: none（全方向）, `t`/`b`（ブロック開始/終了）, `s`/`e`（インライン開始/終了）, `x`/`y`（インライン/ブロック軸）。論理的な辺は右→左レイアウトでも正しく動作します。
- ステップ: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`、およびマージン専用の `auto`。

InstUI の `margin="small auto large"` 短縮形のためにこれらを合成してください:
`class="--mt-sm --mx-auto --mb-lg"`。

**カラー** — パレット内に留まる意味的なオーバーライド: `.--bg-<name>`（背景）、`.--text-<name>`（テキスト色）、および `.--border-<name>`（境界色）。各 `<name>` は意味的なカラートークンです — インテント（`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …）と `accent-*` パレット（`accent-blue`, `accent-green`, 等）。そのファミリーにトークンが存在する場合にのみ名前があります。したがって `text-brand` はクラスではありません — テキストにはブランドトークンがありません。プリミティブや任意の16進表記に到達する方法はなく、すべてのオーバーライドはテーマに従います。

**トークンファミリー** — 「1 トークン 1 プロパティ」ファミリーごとにトークンごとのクラスがあります。自由に組み合わせてください:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（および `-depth1`…`-card`）→ `box-shadow`

各クラスはその一つのプロパティだけを設定するので、`border-width`/`border-radius` は実際にボーダーを描くために `border-*` のカラーとボーダースタイルを必要とします。これらは完全なトークン名（`.--border-radius-md`）を使いますが、上記のカラーとスペーシングヘルパーは短いエイリアス（`.--bg-brand`, `.--mt-lg`）を使います — エイリアスは扱いやすさのためのショートカットで、トークンクラスはリテラルで網羅的です。

**レイアウト** — `.--display-<value>`（`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`）および `.--text-align-<value>`（`start`, `center`, `end`, `justify`）は、InstUI の横断的な `display` と `textAlign` プロップ（View、Button、Metric、Tabs、…）をカバーする合成可能なクラスです — したがってそれらはコンポーネント固有のモディファイアではありません。

すべてのダブルダッシュクラスは、同名のシングルダッシュコンポーネントモディファイアよりもカスケードで確定的に勝ちます（スタイルシートの読み込み順に関係なく） — メカニズムについては [Authoring conventions](/conventions/authoring) を参照してください。

ここにあるものはすべて `--instui-*` トークンにより純粋に CSS で駆動されているため、トークン層を通じて InstUI に追従します。`componentsCss` と各コンポーネントビルダーについては [API reference](/api/) を参照してください。

## オーバーレイ: ダイアログとポップオーバー

オーバーレイコンポーネントはネイティブのプラットフォームプリミティブに乗るため、少ないまたはほとんど JavaScript を必要とせずアクセシブルに動作します。

**Modal** — ネイティブの `<dialog>` に `.instui-modal` を付与してください。フォーカストラップ、`Esc` での閉鎖、そして `::backdrop` が得られます；バックドロップは `.instui-mask` と同じ `--instui-component-mask-background-color` トークンで暗くされます（フロストにするには `-blur` を追加）。Invoker コマンドで開閉できます — スクリプト不要です:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**コンテキストビュー / ポップオーバー** — `.instui-context-view` を `[popover]` 要素に付け、`popovertarget` でトグルします。最上位レイヤーに乗り、外側クリックや `Esc` でライトディスミスされます、これもスクリプト不要です:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — レイアウトルートに `.instui-drawer-layout` を付け、`.tray` と `.content` の子要素を配置します。トレイを表示するには `open` 属性（または `-open`）を追加し、インラインエンド側にドッキングするには `placement="end"`（または `-placement-end`）を使用します — 配置は論理的な `inset-inline-*`/`flex-direction` プロパティを通じて解決されるため、`dir="rtl"` 下で自動的に反転します。フォーカスインタラクションバンドルは Invoker コマンドルーティングを追加し、幅が `--drawer-layout-min-width`（デフォルト `--instui-breakpoints-sm`、その後 `30rem`）を越えるとオーバーレイモード（`should-overlay-tray`）を切り替えます。

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` はインフローのオーバーレイ（カード上のスピナー）に使います；モーダルの場合はその `::backdrop` がカバーします。

これらのパターンは `@pantoken/web-components` で行動的なカスタム要素としてもラップされています:
`<instui-modal open>`（その `open` 属性で駆動される `<dialog>`）および `<instui-context-view>`（ネイティブポップオーバー）。

ブラウザサポート: popover API と `popovertarget` は Baseline 2024、Invoker コマンド（`command`/`commandfor`）は Baseline 2025 です。古いブラウザではボタンを `dialog.showModal()` にワイヤする一行のフォールバックを使用してください。トリガーの横にポップオーバーを位置付けるには、対応する場合は CSS アンカーポジショニング（Chromium）を使用します；未対応ではトップレイヤーで中央に配置されます。

## フォーム

**FormField** — `.instui-form-field` はラベル、コントロール、及びメッセージをレイアウトする CSS グリッドラッパーです。ラベルがネイティブにコントロールと関連付くように `<label>` に付けてください。三つのグリッドエリアがあります — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked`（デフォルト）はエリアを積み重ね、`-layout-inline` はラベルをコントロールの横に置きます（`-label-align-{start,end}` と `-v-align-{top,middle,bottom}` で調整）。`-readonly` はラベルの色を変更します。

**必須アスタリスク** はフィールドが必須であるときに表示されます — これは _どちらか一方_ の `-required` クラス _または_ 内部にあるネイティブの `required` コントロールによるものです — したがって入力に `required` を設定するだけでマークが表示されます。これは装飾的です（ラベル上の `::after` で、アクセシビリティツリーからは除外されます）；フォームが自明でない限り「\* の付いた項目は必須です」のような注記と組み合わせてください。

**FormFieldGroup** — `.instui-form-field-group` は関連するフィールドを `<fieldset>` 内にグループ化し、`<legend>` の説明を持ちます。純粋にレイアウトのみ（専用トークンなし）：デフォルトはフィールドを積み重ねます；`-layout-columns` / `-layout-inline` はレスポンシブな列に流し、`-row-spacing-*` / `-col-spacing-*` と `-v-align-*` でグリッドを調整します。

**RadioInputGroup** — `.instui-radio-input-group` は同じ `<fieldset>`/`<legend>` のグルーピングで、ラジオに特化しています。子ラジオが共有の `name` を持つため選択はネイティブに単一選択です — そのためトグルボタンのセットはバラバラのボタンではなく一つのコントロールとして振る舞います。`-variant-simple`（デフォルト）は標準ラジオをレイアウトします（`-layout-columns`/`-inline` は行に流します）；`-variant-toggle` は子の `.instui-radio.-variant-toggle` ボタンを単一のセグメントコントロールに接続します（境界が折りたたまれ、外側が丸められます）:

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Messages** — `.instui-form-field-messages` がコンテナです；各 `.instui-form-field-message` は `-type-*` を取ります: `-type-hint`（グレー、デフォルト）、`-type-error`（赤いテキスト + サークルアラートのグリフ）、`-type-success`（緑のテキスト + サークルチェックのグリフ）、および `-type-screenreader-only`（視覚的にクリップされるがアナウンスされる）。グリフは `currentColor` で塗られるため常にメッセージ色と一致します。`-type-new-error` は `-type-error` の非推奨エイリアスです。コンテナとコントロールを `aria-describedby` で結びつけ、エラーのときはコントロールに `aria-invalid` を設定してください。

FormField 内では、`-type-error` メッセージはクライアント側バリデーションに従います: コントロールが `:user-invalid`（ネイティブ、ユーザーが操作した後）になるまで非表示に留まります — または `.instui-form-field` 上で `-invalid` を設定して強制表示できます（サーバーサイドのエラーの場合）。フィールド外の独立した `.instui-form-field-messages`（フィールド内でないもの）は影響を受けません。コントロールのフォーカスリングも同様に動作します: `:user-invalid`/`-invalid` のときは危険表示、`-success` のときは成功表示。

**テキストコントロール** — `.instui-text-input`（ネイティブの `<input>`）、`.instui-text-area`（ネイティブの `<textarea>`, リサイズ可能）、および `.instui-simple-select`（ネイティブの `<select>` でキャレットを持つ）は見た目と状態を共有します: `-invalid`（エラーボーダー）、`-success`（成功ボーダー）、`-readonly`、ネイティブの `:disabled`、および `-size-{sm,md,lg}`。先頭/末尾のアイコン（InstUI の `renderBeforeInput`/`renderAfterInput`）を付けるには、入力を `.instui-input-group` でラップし、`.before`/`.after` スロット（`-icon-*` グリフ）を追加してください；`-should-not-wrap` はそれを一行に保ちます。`.instui-number-input` はそのファサードに加えて `.arrows` の +/- スピナーカラムを持ちます（ネイティブの `type="number"`；ボタンを `stepUp()`/`stepDown()` にワイヤしてください）。`.instui-range-input` はスタイリングされた `input[type="range"]` で、その値は `.instui-range-input-value` の逆バブルに表示されます。リストボックスポップオーバーを持つリッチなコンボボックスには `@instructure/ui` を使用してください — このライブラリはネイティブコントロールをカバーします。

**スタイル付きセレクトドロップダウン（実験的）** — オプトインの `select.css` は同一の `.instui-simple-select` 要素をアップグレードします: 開いたドロップダウン（パネルと各オプション、ホバーおよび選択状態）を CSS Customizable Select モデルでスタイルします。

> [!WARNING]
> `select.css` は `appearance: base-select` / `::picker(select)` に依存しており、これは **実験的**（Chrome 135+、まだ Baseline ではありません）です。これは別のオプトインシートとして出荷され、すべてのルールは `@supports (appearance: base-select)` の背後でゲートされています。非対応ブラウザでは何もしないため、強化されたドロップダウンが欲しく、限定的なサポートを受け入れる場合にのみ読み込んでください。`.instui-simple-select` コントロールは通常のネイティブセレクトのままです。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
