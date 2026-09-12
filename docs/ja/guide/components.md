# コンポーネント

`@pantoken/components` は Instructure のトークンから構築されたクラスベースのコンポーネントスタイルを提供します。スタイルシートをインポートしてマークアップにタグを付けてください — フレームワークは不要です。

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> カスタム要素を好みますか？ `@pantoken/web-components` は同じスタイルを `<instui-button>`、`<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` などとしてラップしています — [package map](/api/) を参照してください。

## 慣習

このパッケージの CSS 慣習は、修正バージョンの [RSCSS](https://ricostacruz.com/rscss/index.html) に基づいています。

モディファイアは **キーと値** の形式です — `-<prop>-<val>`、InstUI のプロップ名に整合しているので、そのまま読めます: `-color-secondary`、`-size-sm`、`-shape-circle`、`-icon-plus`。ブールプロップはプロップ名だけで表現し、存在することが `true` を意味します（`-has-shadow`、`-clickable`）；デフォルトで有効なブールをオフにすると反転します（`-without-background`、`-without-border`）。サイズは短縮形と長文の両方を受け入れます（`-size-sm` = `-size-small`）。名前が InstUI と異なる場合でも InstUI 意味のクラスは動作しますが非推奨です（例: `-variant-info` → `-color-info` を使用）。

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

InstUI の `timeout` プロップについては、単位なしの `--timeout` カスタムプロパティをミリ秒で設定し、Alert インタラクションを読み込んでください。正の値は自動閉鎖をスケジュールします；`0`（デフォルト）はアラートをそのまま残します。InstUI のフェードには `transition` ユーティリティの `instui-transition -fade-entered` クラスを追加してください；即時削除が必要ならこれらを省略します。インタラクションは `-fade-exiting` 状態を制御し、削除前に取り消し可能でバブリングする `dismiss` イベントを発火するため、アプリケーションは `preventDefault()` を呼んでアラートのマウントを維持できます。

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

プログレスバーは、デフォルト `0` の代わりに `--min` を使った任意のスケール、`--value`、およびデフォルト `100` の `--max` を受け入れます。非推奨の別名 `--value-now` と `--value-max` もあります。値が変化したときに InstUI の 0.5 秒トランジションを適用するには `-should-animate` を追加します。`.value` はルートの子要素として `.bar` と並んで配置されます；代わりにトラック上に重ねて開始位置に揃えて表示するには `-render-value-inside` を追加してください（メーターの色に対して判読性を確保するスタイルを適用してください）。ゼロベースのレンジにはネイティブの `<progress>` を、最小値がゼロでない場合は `<meter>` を使用します；ウェブコンポーネントは `min` 属性から自動選択します。InstUI は不定（indeterminate）状態を持たないため、`<progress>` が `value` 属性を欠く場合は pantoken 側のベストギューズになります：`progress-bar` はスライディングセグメントとして `.bar` をアニメートし、`progress-circle` は固定弧でリングを回転させ、どちらも `.value` を隠します。

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

プログレスサークルは、同じく `--min`、`--value`、および `--max` を通じて任意のスケールを受け入れます。`--value-now` と `--value-max` は非推奨の機能別名として残っています。InstUI のマウントアニメーションを再現するには `-should-animate` を追加し、フォーカスされたインタラクションバンドルを読み込んでください；`--animation-delay` は単位なしのミリ秒遅延です。非推奨の `-should-animate-on-mount` と `-shold-animate-on-mount` の綴りも機能的別名として残っています。

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

すべてのクラスはデフォルトで `instui-` に名前空間化されています。任意のプレフィックス（または無し）でスタイルシートを構築するには、任意のビルダーに `prefix` を渡してください。偽値（`null`、`undefined`、`""`、または省略）を渡すとプレフィックスが完全に削除されるので、`class="heading -level-h1"` の代わりに `class="instui-heading -level-h1"` を著述できます：

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

ダッシュ接頭辞のモディファイア（`.-color-secondary`、`.-level-h1`）はどちらの場合でも変更されません。パッケージが配布するスタイルシートは `instui` プレフィックスを維持します。

## ベース

`base.css` はオプトインのリセットで、トークンからドキュメントのグローバルデフォルトを設定します：`box-sizing`、`body` のリセット、ページサーフェス、基本テキストカラーとフォント、`color-scheme`（これにより `light-dark()` トークンとネイティブコントロールがテーマを追従します）、およびベースリンクを設定します。pantoken がページを所有している場合は、コンポーネントとプローズのシートより前に一度だけ読み込んでください。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

ホストが既に独自の `html` と `body` をテーマしている埋め込み環境では、これをスキップしてください — リセットはページサーフェスを描画するため、ホストと競合させたくありません。設定するすべては低特異性の `:where()` セレクターを使用するため、独自のルールが常に優先されます。

`base.css` はブランドフォント（`font-family: var(--instui-font-family-base)`、システムフォールバック付き）を適用します；フォントを読み込むにはオプトインの `fonts.css` をインポートしてください — `@font-face` は Atkinson Hyperlegible Next の規則で、パッケージに含まれる woff2 を指します。フォントは約 350 kB で自己ホスティングは意図的な選択なので分離されています。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## スクリーンリーダー向けコンテンツ

<p>この文の後に隠しメッセージがあります。<span class="instui-screen-reader-content">スクリーンリーダーだけがこれを読み上げます。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` は、要素を視覚的に隠しつつアクセシビリティツリーには残すためのものです — ラベルや支援技術が読むべきがデザイン上は表示したくないステータステキスト向けです。

## ユーティリティ

`utilities.css` はオプトインの横断的クラス群のレイヤーです：`View` プリミティブ、トークンスケール上のスペーシング、およびセマンティックな色のオーバーライドを含みます。コンポーネントの `-modifier` クラスとは異なり、これらは **ダブルダッシュ**（`--mod`）を使用するため、コンポーネントのモディファイア名と衝突せず、任意の要素（ベア、またはコンポーネントに合成して）に適用できます。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">アクセントブルーのサーフェス、オンカラーテキスト。</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto で中央寄せ。</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` は InstUI の `View` です。スペーシングと色を重ねるベースであり、自身の視覚プロップ用にキーと値のモディファイアを持つためユーティリティを使わずとも済みます：`-background-*`（そのサーフェス）、`-border-radius-{small,medium,large,circle,pill}`、`-border-width-{small,medium,large}` + `-border-color-*`、`-shadow-{resting,above,topmost}`、`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*`、および `-cursor-*` — これらは `view` 自身の単一ダッシュモディファイアで、下のダブルダッシュユーティリティとは無関係です。幅/高さ/インセットのような自由値プロップはインラインスタイルに置き、`margin`/`padding` はスペーシングユーティリティを使用します。

**スペーシング** — スペーシングスケール上の各辺ごとのクラス。`{m|p}{side}-{step}` のように読んでください: マージンなら `m`、パディングなら `p`（あるいは全単語 `margin`/`padding`）、オプションの論理的側面、そしてステップ。したがって `.--m-lg` と `.--margin-lg` は同じであり、`.--pt-md` と `.--paddingt-md` も同様です。

- サイド: none（すべて）、`t`/`b`（ブロック開始/終了）、`s`/`e`（インライン開始/終了）、`x`/`y`（インライン/ブロック軸）。論理的サイドは右から左のレイアウトでも正しく機能します。
- ステップ: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, そしてマージン専用の `auto`。

InstUI の `margin="small auto large"` ショートハンドのためにこれらを合成してください：`class="--mt-sm --mx-auto --mb-lg"`。

**カラー** — パレット内に留まるセマンティックなオーバーライド：`.--bg-<name>`（背景）、`.--text-<name>`（テキスト色）、および `.--border-<name>`（ボーダーカラー）。各 `<name>` はセマンティックカラートークンです — 意図（`base`、`brand`、`muted`、`success`、`warning`、`error`、`info`、`inverse`、`on-color`、`strong`、…）と `accent-*` パレット（`accent-blue`、`accent-green`、等）。名前はそのファミリーにトークンが存在する場合にのみ存在するので、`text-brand` はクラスではありません — テキストにブランドトークンはありません。プリミティブや任意の16進カラーに到達する方法はなく、すべてのオーバーライドはテーマに従います。

**トークンファミリー** — 「1 トークン、1 プロパティ」ファミリーごとに、トークンごとのクラスがあり、そのトークン名で命名されます。自由に合成してください：

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（および `-depth1`…`-card`）→ `box-shadow`

それぞれはその単一のプロパティのみを設定するため、`border-width`/`border-radius` には実際に境界を描くための `border-*` カラーとボーダースタイルが必要です。これらは完全なトークン名（`.--border-radius-md`）を使用しますが、上記の色とスペーシングヘルパーは短縮エイリアス（`.--bg-brand`、`.--mt-lg`）を使用します — エイリアスは操作性のためのショートカットであり、トークンクラスはリテラルで網羅的です。

**レイアウト** — `.--display-<value>`（`block`、`inline-block`、`inline`、`flex`、`inline-flex`、`none`）および `.--text-align-<value>`（`start`、`center`、`end`、`justify`）は、InstUI の横断的な `display` と `textAlign` プロップ（View、Button、Metric、Tabs、…）を構成可能なクラスとしてカバーします — これらはコンポーネントごとのモディファイアではありません。

すべてのダブルダッシュクラスは、同名のシングルダッシュコンポーネントモディファイアに対して、スタイルシートの読み込み順に関係なくカスケードで決定的に優先します — 機構については [Authoring conventions](/conventions/authoring) を参照してください。

ここにあるものはすべて `--instui-*` トークンで駆動される純粋な CSS なので、トークン層を通じて InstUI を追従します。`componentsCss` と各コンポーネントビルダーについては [API reference](/api/) を参照してください。

## オーバーレイ：ダイアログとポップオーバー

オーバーレイコンポーネントはネイティブのプラットフォームプリミティブに乗るため、ほとんどまたは全く JavaScript を使わずにアクセシブルに振る舞います。

**モーダル** — ネイティブの `<dialog>` に `.instui-modal` を付けてください。フォーカストラップ、`Esc` によるクローズ、そして `::backdrop` を無料で得られます；バックドロップは `.instui-mask` と同じ `--instui-component-mask-background-color` トークンで暗くされます（フロスト効果を加えるには `-blur` を追加）。インボーカコマンドで開閉してください — スクリプトは不要です。

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

**コンテキストビュー / ポップオーバー** — `.instui-context-view` を `[popover]` 要素に付け、`popovertarget` でトグルします。トップレイヤーに表示され、外側クリックや `Esc` でライトディスミスします。ここでもスクリプトは不要です。

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**ドロワーレイアウト** — レイアウトルートに `.instui-drawer-layout` を付け、子に `.tray` と `.content` を置きます。トレイを表示するには `open` 属性（または `-open`）を追加し、インラインエンド側にドッキングするには `placement="end"`（または `-placement-end`）を使用してください — 配置は論理的な `inset-inline-*`/`flex-direction` プロパティを通じて解決されるため、`dir="rtl"` 下で自動的に反転します。フォーカスされたインタラクションバンドルはインボーカコマンドルーティングを追加し、幅が `--drawer-layout-min-width`（デフォルト `--instui-breakpoints-sm`、次に `30rem`）を横切るとオーバーレイモード（`should-overlay-tray`）を切り替えます。

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**マスク** — `.instui-mask` はインフローのオーバーレイ（カード上のスピナー）に適します；モーダルの場合は `::backdrop` が該当します。

これらのパターンは `@pantoken/web-components` によって振る舞いを持つカスタム要素としてもラップされています：`<instui-modal open>`（`open` 属性によって駆動される `<dialog>`）と `<instui-context-view>`（ネイティブのポップオーバー）。

ブラウザサポート: popover API と `popovertarget` は Baseline 2024；インボーカコマンド（`command`/`commandfor`）は Baseline 2025 なので、古いブラウザではボタンを一行のフォールバックで `dialog.showModal()` にワイヤしてください。トリガー横にポップオーバーを配置するには、サポートされている場合 CSS アンカーポジショニングを使用します（Chromium）；他ではトップレイヤーに中央配置されます。

## フォーム

**FormField** — `.instui-form-field` はラベル、コントロール、および任意のメッセージを配置する CSS グリッドラッパーです。ネイティブにラベルをコントロールに関連付けるために `<label>` に付けてください。3 つのグリッドエリアがあります — `label`、`controls`、`messages`：

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

デフォルトの `-layout-stacked` は領域を積み重ね、`-layout-inline` はラベルをコントロールの横に配置します（`-label-align-{start,end}` と `-v-align-{top,middle,bottom}` で調整）。`-readonly` はラベルの色を変更します。

**必須アスタリスク** はフィールドが必須である場合に表示されます — それは _クラス_ `-required` またはその内部のネイティブ `required` コントロールのいずれかによります — したがって入力に `required` を設定するだけでマークが表示されます。これは装飾的です（ラベル上の `::after`、アクセシビリティツリー外）；フォームが自明でない限り「\* が付いたフィールドは必須です」のような注記を併記してください。

**FormFieldGroup** — `.instui-form-field-group` は関連フィールドを `<fieldset>` にグループ化し、`<legend>` の説明を持ちます。専用トークンはなく純粋にレイアウトです：デフォルトはフィールドを積み重ねます；`-layout-columns` / `-layout-inline` はレスポンシブなカラムに流し、`-row-spacing-*` / `-col-spacing-*` と `-v-align-*` でグリッドを調整します。

**RadioInputGroup** — `.instui-radio-input-group` は同じ `<fieldset>`/`<legend>` のグルーピングで、ラジオ用に特化しています。子のラジオが `name` を共有するため、選択はネイティブに単一選択です — そのためトグルボタンのセットはルースなボタンではなく一つのコントロールとして振る舞います。デフォルトの `-variant-simple` は標準ラジオをレイアウトします（`-layout-columns`/`-inline` はそれらを行に流します）；`-variant-toggle` は子の `.instui-radio.-variant-toggle` ボタンを単一のセグメントコントロールに接続します（境界を折り畳み、外側端を丸めます）：

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

**Messages** — `.instui-form-field-messages` がコンテナで、各 `.instui-form-field-message` は `-type-*` を取ります：`-type-hint`（グレー、デフォルト）、`-type-error`（赤テキスト + サークルアラートのグリフ）、`-type-success`（緑テキスト + サークルチェックのグリフ）、および `-type-screenreader-only`（視覚的にクリップされるが読み上げはされる）。グリフは `currentColor` で塗られるため、常にメッセージ色と一致します。`-type-new-error` は `-type-error` の非推奨エイリアスです。コンテナをコントロールに結び付けるには `aria-describedby` を使用し、エラー時にコントロールに `aria-invalid` を設定します。

FormField 内では、`-type-error` メッセージはクライアントサイドの検証に従います：コントロールが `:user-invalid`（ユーザ操作後のネイティブ）になるまで非表示のままです — またはサーバー側エラーの場合に `-invalid` を `.instui-form-field` に強制して表示できます。フィールド外の単独の `.instui-form-field-messages`（フィールド内でないもの）は影響を受けません。コントロールのフォーカスリングも同様に動作します：`:user-invalid`/`-invalid` のときは危険、`-success` のときは成功となります。

**テキストコントロール** — `.instui-text-input`（ネイティブの `<input>`）、`.instui-text-area`（ネイティブの `<textarea>`、リサイズ可）、および `.instui-simple-select`（キャレット付きのネイティブ `<select>`）は同一の外観と同じ状態を共有します：`-invalid`（エラーボーダー）、`-success`（成功ボーダー）、`-readonly`、ネイティブの `:disabled`、および `-size-{sm,md,lg}`。先頭/末尾アイコン（InstUI の `renderBeforeInput`/`renderAfterInput`）には、入力を `.instui-input-group` でラップし、`.before`/`.after` スロット（`-icon-*` グリフ）を追加してください；`-should-not-wrap` はそれを一行に保ちます。`.instui-number-input` はそのファサードにネイティブの `.arrows` +/- スピナーカラムを追加したものです（ネイティブ `type="number"`；ボタンを `stepUp()`/`stepDown()` にワイヤしてください）。`.instui-range-input` はスタイルされた `input[type="range"]` で、その値は `.instui-range-input-value` の逆バブルでレンダリングされます。リストボックスポップオーバーを持つリッチなコンボボックスには `@instructure/ui` を使用してください — このライブラリはネイティブコントロールをカバーします。

**スタイルされたセレクトドロップダウン（実験的）** — オプトインの `select.css` は _同じ_ `.instui-simple-select` 要素をアップグレードします：開いたドロップダウン（パネルと各オプション、ホバーおよび選択状態を含む）を CSS Customizable Select モデルでスタイルします。

> [!WARNING]
> `select.css` は `appearance: base-select` / `::picker(select)` に依存しており、これは **実験的**（Chrome 135+、まだ Baseline ではありません）です。これは別個のオプトインシートとして配布され、すべてのルールが `@supports (appearance: base-select)` で条件付けされているため、サポートされていないブラウザでは何もしません — `.instui-simple-select` コントロールは単にプレーンなネイティブセレクトのままです。拡張されたドロップダウンが欲しく、限定的なサポートを受け入れる場合のみ読み込んでください。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
