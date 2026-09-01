# 元件

`@pantoken/components` 提供以 Instructure 代幣建構的類別式元件樣式。匯入樣式表並標記你的標記 — 無需框架。

```ts
import "@pantoken/components/components.css";
```

> [!注意]
> 偏好自訂元素？`@pantoken/web-components` 以 `<instui-button>`、`<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` 等包裝相同樣式 — 詳見 [套件映射](/guide/packages)。

## 慣例

本套件的 CSS 慣例基於經過修改的 [RSCSS](https://ricostacruz.com/rscss/index.html) 版本。

修飾子為 **鍵-值** 型式 — `-<prop>-<val>`，對齊 InstUI 的屬性名稱 — 因此自說自話：`-color-secondary`、`-size-sm`、`-shape-circle`、`-icon-plus`。布林屬性僅為屬性名稱，出現即表示 `true`（`-has-shadow`、`-clickable`）；預設為開啟的布林屬性被關閉則取反（`-without-background`、`-without-border`）。尺寸接受短寫與長寫兩種拼法（`-size-sm` = `-size-small`）。若名稱偏離 InstUI，InstUI 語義的 class 仍然可用但已被棄用（例如 `-variant-info` → 改用 `-color-info`）。

### 範例

Instructure UI React 元件：

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken 元件：

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

對於 InstUI 的 `timeout` 屬性，將無單位的 `--timeout` 自訂屬性設為毫秒並載入 Alert interaction。正值會排程關閉；`0`（預設）會保留 alert 不移除。為 InstUI 的淡出效果加入 `transition` 實用工具的 `instui-transition -fade-entered` 類；如需立即移除則省略它們。互動會驅動 `-fade-exiting` 狀態並在移除前觸發可取消、冒泡的 `dismiss` 事件，應用程式可呼叫 `preventDefault()` 以保留 alert 的掛載。

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

進度條接受透過 `--min`（預設 `0`）、`--value`、以及 `--max`（預設 `100`）的任意刻度，並保有已棄用的別名 `--value-now` 與 `--value-max`。加入 `-should-animate` 可在數值變更時套用 InstUI 的半秒過渡。`.value` 與 `.bar` 並列作為 root 的子項；加入 `-render-value-inside` 可改為將其渲染於軌道上方並置於起始對齊（請為其相對計量色彩調整可讀性）。使用原生 `<progress>` 來表示以零為基準的範圍，當最小值非零時使用 `<meter>`；網頁元件會根據其 `min` 屬性自動在兩者間選擇。InstUI 沒有不定（indeterminate）狀態，因此缺少 `value` 屬性的 `<progress>` 為 pantoken 的最佳猜測：`progress-bar` 將 `.bar` 動畫化為滑動區段，而 `progress-circle` 以固定弧度旋轉其環形，兩者皆隱藏 `.value`。

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

進度圓接受相同的任意刻度，透過 `--min`、`--value`、以及 `--max`。`--value-now` 與 `--value-max` 作為已棄用的功能性別名保留。加入 `-should-animate` 並載入 focus 互動套件以重現 InstUI 的掛載動畫；`--animation-delay` 為無單位的毫秒延遲。已棄用的拼法 `-should-animate-on-mount` 與 `-shold-animate-on-mount` 仍作為功能別名。

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

## 類名前綴

每個 class 預設以 `instui-` 命名空間。可透過將 `prefix` 傳給任一建構器來建立使用自訂前綴（或無前綴）的樣式表。任何 falsy 值（`null`、`undefined`、`""`，或省略）會完全移除前綴，因此可以撰寫 `class="heading -level-h1"` 而非 `class="instui-heading -level-h1"`：

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

以破折號開頭的修飾子（`.-color-secondary`、`.-level-h1`）在任何情況下都不會改變。套件隨附的樣式表保留 `instui` 前綴。

## 基礎

`base.css` 是一個選用的重置（reset），會從代幣設定全域文件預設：`box-sizing`、一個 `body` 重置、頁面表面、基本文字色與字型、`color-scheme`（因此 `light-dark()` 代幣與原生控制會追蹤主題），以及基礎連結。當 pantoken 掌控整頁時，載入它一次，置於元件與文章樣式表之前。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

當將元件嵌入已由宿主提供主題的環境（其已有自己的 `html` 與 `body`）時可略過它 — 該重置會塗繪頁面表面，可能與宿主衝突。它設定的規則使用低特異性的 `:where()` 選擇器，因此你的規則總是會覆蓋。

`base.css` 用於套用品牌字型（`font-family: var(--instui-font-family-base)`，含系統回退）；要 _載入_ 字型，匯入選用的 `fonts.css` — `@font-face` 規則為 Atkinson Hyperlegible Next 指定字形，指向套件內所附的 woff2 檔案。它是獨立的，因為字體約為 ~350 kB，自行託管字體是一個刻意的選擇。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## 螢幕朗讀器內容

<p>這句話後面有一則隱藏訊息。<span class="instui-screen-reader-content">僅供螢幕朗讀器宣讀。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` 在視覺上隱藏元素但保留於可及性樹中 — 用於應由輔助技術讀取但設計上不應顯示的標籤與狀態文字。

## 實用工具

`utilities.css` 是一層選用的跨領域類別：一個 `View` 原語、代幣刻度的間距，以及語義色彩覆寫。與元件的 `-modifier` 類不同，這些使用 **雙破折號**（`--mod`），因此永不與元件自身的單破折號修飾子名稱衝突，且可套用於任意元素 — 純元素或組合於元件上。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue surface with on-color text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centered with mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` 是 InstUI 的 `View`。它是用來堆疊間距與色彩的基底，並帶有自己的鍵值修飾子以避免你去使用工具類別：
`-background-*`（其表面）、`-border-radius-{small,medium,large,circle,pill}`、`-border-width-{small,medium,large}` + `-border-color-*`、`-shadow-{resting,above,topmost}`、`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*`，以及 `-cursor-*` — 這些是 `view` 自身的單破折號修飾子，與下方的雙破折號實用工具無關。自由值屬性（寬/高/內縮）建議用內聯樣式；`margin`/`padding` 使用間距實用工具。

**間距** — 在間距刻度上的每側類別。可讀作 `{m|p}{side}-{step}`：`m` 表示外距（margin）或 `p` 表示內距（padding）（或完整詞 `margin`/`padding`），接著是可選的邏輯側面，再來是階級(step)。因此 `.--m-lg` 與 `.--margin-lg` 相同，`.--pt-md` 與 `.--paddingt-md` 亦然。

- 側面：none（全部）、`t`/`b`（區塊 開始/結束）、`s`/`e`（行內 開始/結束）、`x`/`y`（行/區塊軸）。邏輯側面在 RTL（從右到左）佈局中仍然正確。
- 階級：`0`、`2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`，以及僅限 margin 的 `auto`。

可為 InstUI 的 `margin="small auto large"` 簡寫組合它們：
`class="--mt-sm --mx-auto --mb-lg"`。

**色彩** — 維持在調色板上的語義覆寫：`.--bg-<name>`（背景）、`.--text-<name>`（文字色）、與 `.--border-<name>`（邊框色）。每個 `<name>` 都是一個語義色彩代幣 — 意圖（`base`、`brand`、`muted`、`success`、`warning`、`error`、`info`、`inverse`、`on-color`、`strong`、…）加上 `accent-*` 調色板（`accent-blue`、`accent-green`，依此類推）。名稱僅在該族別存在該代幣時才會出現，所以 `text-brand` 並不是一個類別 — 文字沒有品牌代幣。無法直接存取原始值或任意十六進位色，每個覆寫皆遵循主題。

**代幣族** — 每個「一個代幣，一個屬性」的族別會為每個代幣提供一個類別，名稱即為代幣。隨意組合：

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（與 `-depth1`…`-card`）→ `box-shadow`

每個類別僅設定其單一屬性，因此 `border-width`/`border-radius` 需要一個 `border-*` 色彩與邊框樣式才能實際呈現邊框。這些使用完整的代幣名稱（`.--border-radius-md`），而上述色彩與間距輔助則使用短別名（`.--bg-brand`、`.--mt-lg`）— 別名為更好用的捷徑；代幣類別則是字面且完整的。

**版面配置** — `.--display-<value>`（`block`、`inline-block`、`inline`、`flex`、`inline-flex`、`none`）與 `.--text-align-<value>`（`start`、`center`、`end`、`justify`）涵蓋 InstUI 跨領域的 `display` 與 `textAlign` 屬性（如 View、Button、Metric、Tabs…）作為可組合的類別 — 因此那些不是元件的逐個修飾子。

每個雙破折號類別在層疊中會確定勝過同名的單破折號元件修飾子，不論樣式表的匯入順序為何 — 機制見 [Authoring conventions](/conventions/authoring)。

此處一切皆為由 `--instui-*` 代幣驅動的純 CSS，因此會透過代幣層追蹤 InstUI。關於 `componentsCss` 與每個元件建構器的 API，請參見 [API 參考](/api/)。

## 覆蓋層：對話框與彈出視圖

覆蓋元件以原生平台原語為基礎，因此在幾乎不需或少量 JavaScript 的情況下即具可及性行為。

**Modal（模態）** — 在原生 `<dialog>` 上加上 `.instui-modal`。它會獲得焦點圈定、`Esc`-關閉，以及 `::backdrop`；背景使用與 `.instui-mask` 相同的 `--instui-component-mask-background-color` 代幣（加入 `-blur` 可使其有霜化效果）。用 invoker 命令開啟與關閉 — 無需腳本：

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

**Context view / popover（內容視圖 / 彈出）** — 在 `[popover]` 元素上加上 `.instui-context-view` 並以 `popovertarget` 切換。它置於最上層，並支援點外關閉或 `Esc`，同樣無需腳本：

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout（抽屜佈局）** — 在帶有 `.tray` 與 `.content` 子項的佈局根元素上加上 `.instui-drawer-layout`。加入 `open` 屬性（或 `-open`）以顯示托盤，並使用 `placement="end"`（或 `-placement-end`）將其停靠在行內結尾側 — 位置透過邏輯的 `inset-inline-*`/`flex-direction` 屬性解析，因此在 `dir="rtl"` 下會自動翻轉，無需額外規則。focused interaction 套件加入 Invoker 命令路由，並在寬度跨越 `--drawer-layout-min-width`（預設 `--instui-breakpoints-sm`，然後 `30rem`）時切換覆蓋模式（`should-overlay-tray`）：

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask（遮罩）** — `.instui-mask` 用於內流覆蓋（例如卡片上的 spinner）；模態的 `::backdrop` 用於模態情況。

兩種模式亦以行為性自訂元素封裝於 `@pantoken/web-components`：`<instui-modal open>`（由其 `open` 屬性驅動的 `<dialog>`）與 `<instui-context-view>`（原生彈出）。

瀏覽器支援：popover API 與 `popovertarget` 屬於 Baseline 2024；invoker 命令（`command`/`commandfor`）為 Baseline 2025，因此在舊版瀏覽器請以一行回退將按鈕連到 `dialog.showModal()`。在支援的情況下，將 popover 放在觸發器旁會使用 CSS 錨點定位（Chromium）；在其他實作中則會在最上層置中。

## 表單

**FormField（表單欄位）** — `.instui-form-field` 是一個 CSS Grid 包裝器，用於排列標籤、控制項與任何訊息。將它放在 `<label>` 上以便標籤原生關聯到控制項。它有三個網格區域 — `label`、`controls`、`messages`：

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked`（預設）堆疊這些區域；`-layout-inline` 則將標籤置於控制項旁邊（可用 `-label-align-{start,end}` 與 `-v-align-{top,middle,bottom}` 進行微調）。`-readonly` 會重新著色標籤。

**必填星號** 當欄位由 _任一_ `-required` 類別或欄位內的原生 `required` 控制項所要求時會出現 — 因此你也可以僅在輸入上設定 `required` 而讓標記顯示。它是裝飾性的（在標籤上的 `::after`，位於可及性樹之外）；除非表單自明，否則配合像「帶 * 的欄位為必填」的註解一起使用。

**FormFieldGroup（表單欄位群組）** — `.instui-form-field-group` 將相關欄位群組在一個 `<fieldset>` 內，並帶有 `<legend>` 描述。它純粹為版面配置（無專用代幣）：預設堆疊欄位；`-layout-columns` / `-layout-inline` 將其流入響應式欄位，並提供 `-row-spacing-*` / `-col-spacing-*` 及 `-v-align-*` 用於微調網格。

**RadioInputGroup（單選按鈕群）** — `.instui-radio-input-group` 與 `<fieldset>`/`<legend>` 的群組相同，為單選專門化。因為子項單選共享 `name`，選擇在原生層面上為單選 — 因此一組切換按鈕行為像一個控制，而非各自獨立的按鈕。`-variant-simple`（預設）排列標準單選（`-layout-columns`/`-inline` 將其流為一行）；`-variant-toggle` 則將子項 `.instui-radio.-variant-toggle` 按鈕連成單一分段控制（折疊的邊界、圓角外端）：

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

**訊息** — `.instui-form-field-messages` 是容器；每個 `.instui-form-field-message` 具有一個 `-type-*`：`-type-hint`（灰色，預設）、`-type-error`（紅色文字 + 圓形警示圖示）、`-type-success`（綠色文字 + 圓形勾選圖示），以及 `-type-screenreader-only`（視覺上裁切但仍會被宣讀）。字形以 `currentColor` 著色，因此總是與訊息色相符。`-type-new-error` 是 `-type-error` 的已棄用別名。用 `aria-describedby` 將容器與控制連接，當有錯誤時在控制上設定 `aria-invalid`。

在 FormField 中，`-type-error` 訊息會隨客戶端驗證出現：在欄位的控制項為 `:user-invalid`（原生，使用者互動後）之前保持隱藏 — 或你可對 `.instui-form-field` 使用 `-invalid` 強制顯示（伺服器端錯誤）。獨立的 `.instui-form-field-messages`（不在欄位內）則不受影響。控制項的聚焦環也會相應變化：當 `:user-invalid`/`-invalid` 時為危險（danger），當 `-success` 時為成功（success）。

**文字控制項** — `.instui-text-input`（原生 `<input>`）、`.instui-text-area`（原生 `<textarea>`，可調整大小）、以及 `.instui-simple-select`（原生 `<select>`，含游標）共享相同外觀與狀態：`-invalid`（錯誤邊框）、`-success`（成功邊框）、`-readonly`、原生 `:disabled`，與 `-size-{sm,md,lg}`。若需前置/後置圖示（InstUI 的 `renderBeforeInput`/`renderAfterInput`），將輸入包在 `.instui-input-group` 中並加入 `.before`/`.after` 插槽（一個 `-icon-*` 字形）；`-should-not-wrap` 可使其維持單行。`.instui-number-input` 為該外觀加上 `.arrows` 的 +/- spinner 欄（原生 `type="number"`；將按鈕連到 `stepUp()`/`stepDown()`）。`.instui-range-input` 是一個樣式化的 `input[type="range"]`，其值在反色的 `.instui-range-input-value` 泡泡中呈現。若需帶 listbox popover 的富型 combobox，請使用 `@instructure/ui` — 此函式庫涵蓋原生控制。

**樣式化的選擇下拉（實驗性）** — 一個選用的 `select.css` 可升級相同的 `.instui-simple-select` 元素：它會樣式化開啟的下拉（面板與各選項，含懸停與選取狀態），使用 CSS Customizable Select 模型。

> [!警告]
> `select.css` 依賴於 `appearance: base-select` / `::picker(select)`，這是 **實驗性** 的（Chrome 135+，尚未成為 Baseline）。它以獨立的選用樣式表發送，且每條規則都受 `@supports (appearance: base-select)` 條件保護，因此在不支援的瀏覽器中不會有任何作用 — `.instui-simple-select` 控制會維持為原生的純粹 select。僅在你願意接受有限支援並需要增強下拉功能時載入它。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
