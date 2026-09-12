# 元件

`@pantoken/components` 提供由 Instructure 代碼設計代幣建構的類別式元件樣式。引入樣式表並標記你的標記 — 不需要任何框架。

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> 偏好自訂元素？`@pantoken/web-components` 將相同樣式包裝為 `<instui-button>`、`<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` 等 — 請參閱 [套件對照表](/api/)。

## 約定

此套件的 CSS 約定基於修改過的 [RSCSS](https://ricostacruz.com/rscss/index.html)。

修飾符採用 **鍵-值** 形式 — `-<prop>-<val>`，與 InstUI 屬性名稱對齊 — 因此它們自說自話：`-color-secondary`、`-size-sm`、`-shape-circle`、`-icon-plus`。布林屬性只使用屬性名稱，存在即代表 `true`（`-has-shadow`、`-clickable`）；預設為開啟的布林屬性如果被關閉則為反向（`-without-background`、`-without-border`）。尺寸接受短寫與長寫兩種拼法（`-size-sm` = `-size-small`）。當名稱與 InstUI 不同時，InstUI 語義類別仍可使用但已過時（例如 `-variant-info` → 使用 `-color-info`）。

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

對於 InstUI 的 `timeout` 屬性，請以毫秒為單位設定無單位的 `--timeout` 自訂屬性並載入 Alert 互動。正值會排程自動關閉；`0`（預設）則保留 alert。為 InstUI 的淡出效果加入 `transition` 實用工具的 `instui-transition -fade-entered` 類；若要立即移除則省略它們。互動會驅動 `-fade-exiting` 狀態並在移除前觸發可取消、冒泡的 `dismiss` 事件，因此應用程式可以呼叫 `preventDefault()` 以保持 alert 已掛載。

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

進度列接受任意比例刻度，透過 `--min`（預設為 `0`）、`--value` 與 `--max`（預設為 `100`），並有已過時的別名 `--value-now` 與 `--value-max`。加入 `-should-animate` 可在值改變時套用 InstUI 的半秒過渡。`.value` 與 `.bar` 同層作為根元素的子項；加入 `-render-value-inside` 可改為將其渲染於軌道之上並靠起點對齊（需為量尺顏色設計對比樣式）。使用原生的 `<progress>` 表示從零開始的範圍，當最小值非零時使用 `<meter>`；網頁元件會根據其 `min` 屬性自動在兩者間選擇。InstUI 無不確定（indeterminate）狀態，因此缺少 `value` 屬性的 `<progress>` 是 pantoken 的最佳猜測：`progress-bar` 將 `.bar` 動畫化為滑動區段，`progress-circle` 則讓其圓環以固定弧度旋轉，兩者都會隱藏 `.value`。

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

進度圓採用相同任意刻度：`--min`、`--value` 與 `--max`。`--value-now` 與 `--value-max` 保留為已過時的功能別名。加入 `-should-animate` 並載入 focus 互動套件即可重現 InstUI 的掛載動畫；`--animation-delay` 是以毫秒為單位的無單位延遲。已過時的 `-should-animate-on-mount` 與 `-shold-animate-on-mount` 拼寫仍作為功能別名存在。

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

## 類別前綴

預設每個類別都以 `instui-` 命名空間。可透過將 `prefix` 傳給任一建構器來建立具有自訂前綴（或無前綴）的樣式表。任何 falsy 值（`null`、`undefined`、`""`，或省略）會完全移除前綴，因此你可以編寫 `class="heading -level-h1"` 取代 `class="instui-heading -level-h1"`：

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

以破折號開頭的修飾符（`.-color-secondary`、`.-level-h1`）無論如何都不會改變。套件內建的樣式表保留了 `instui` 前綴。

## 基礎

`base.css` 是一個選用的重置，它從代幣設定全域文件預設：`box-sizing`、一個 `body` 重置、頁面表面、基礎文字顏色與字型、`color-scheme`（因此 `light-dark()` 代幣與原生控制項會跟隨主題），以及基礎連結。當 pantoken 擁有該頁面時，請在元件與段落樣式表之前載入一次。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

當你將元件嵌入已由宿主主題化其 `html` 與 `body` 的宿主時，請跳過它 — 因為重置會繪製頁面表面，你不希望它與宿主互相衝突。重置所設置的一切使用低特異性的 `:where()` 選擇器，因此你的規則始終會勝出。

`base.css` _套用_ 品牌字型（`font-family: var(--instui-font-family-base)`，搭配系統備援）；要 _載入_ 字型，請引入選用的 `fonts.css` — `@font-face` 規則為 Atkinson Hyperlegible Next 指定，指向套件內隨附的 woff2 檔。字型檔約為 ~350 kB，並且自託管字型是明確的選擇，故將其分離。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## 螢幕閱讀器內容

<p>在這句之後有一個隱藏訊息。<span class="instui-screen-reader-content">只有螢幕閱讀器會宣布這段內容。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` 在視覺上隱藏一個元素但保留其於可及性樹中 — 適用於應由輔助技術讀取但設計上不顯示的標籤與狀態文字。

## 實用工具

`utilities.css` 是一層選用的跨領域類別：一個 `View` 原始類型、代幣刻度的間距，以及語義色彩覆寫。與元件的 `-modifier` 類不同，這些使用 **雙破折號**（`--mod`），因此永不與元件自身的修飾符名稱衝突，且可套用於任何元素 — 純元素或合成於元件上。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">帶有 on-color 文字的 accent-blue 表面。</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">使用 mx-auto 置中。</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` 是 InstUI 的 `View`。它是可在其上疊加間距與色彩的基礎，並帶有鍵-值修飾符以控制其視覺屬性，讓你不必動用實用工具：`-background-*`（其表面）、`-border-radius-{small,medium,large,circle,pill}`、`-border-width-{small,medium,large}` + `-border-color-*`、`-shadow-{resting,above,topmost}`、`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*`、以及 `-cursor-*` — 這些是 `view` 的單破折號修飾符，與下面的雙破折號實用工具無關。自由值屬性（寬/高/插入）仍保留為行內樣式；`margin`/`padding` 使用間距實用工具。

**間距** — 基於側向的間距刻度類別。可按 `{m|p}{side}-{step}` 讀取：對於外距使用 `m`，對於內距使用 `p`（或完整單字 `margin`/`padding`），接著是可選邏輯側位，然後是步階。因此 `.--m-lg` 與 `.--margin-lg` 相同，亦如 `.--pt-md` 與 `.--paddingt-md`。

- 側位：無（全部）、`t`/`b`（區塊起/止）、`s`/`e`（行內起/止）、`x`/`y`（行內/區塊軸）。邏輯側位在左右書寫方向切換時保持正確。
- 步階：`0`、`2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`，以及僅限外距的 `auto`。

可組合以使用 InstUI 的 `margin="small auto large"` 簡寫：`class="--mt-sm --mx-auto --mb-lg"`。

**色彩** — 保持在調色盤內的語義覆寫：`.--bg-<name>`（背景）、`.--text-<name>`（文字色）、以及 `.--border-<name>`（邊框色）。每個 `<name>` 都是語義色彩代幣 — 意圖有 `base`、`brand`、`muted`、`success`、`warning`、`error`、`info`、`inverse`、`on-color`、`strong`、…，加上 `accent-*` 調色盤（`accent-blue`、`accent-green`，等等）。只有當該族別存在該代幣時才會有名稱，因此 `text-brand` 並非一個類別 — 文字沒有品牌代幣。無法直接存取原語或任意十六進位色碼，且每個覆寫都遵循主題。

**代幣族** — 每個「一代幣、一屬性」的族別會為每個代幣提供一個類別，名稱即代幣名，可自由組合：

- `.--font-family-heading`、`.--font-family-code`、… → `font-family`
- `.--font-weight-body-strong`、`.--font-weight-interactive`、… → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`、`.--border-radius-full`、… → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`、`.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（以及 `-depth1`…`-card`）→ `box-shadow`

每個類別僅設置其單一屬性，因此 `border-width`/`border-radius` 需要一個 `border-*` 顏色與邊框樣式才能真正繪製邊框。這些使用完整代幣名稱（`.--border-radius-md`），而上述的顏色與間距輔助使用短別名（`.--bg-brand`、`.--mt-lg`）— 別名是方便用的捷徑；代幣類別則是逐字且完整的。

**版面** — `.--display-<value>`（`block`、`inline-block`、`inline`、`flex`、`inline-flex`、`none`）與 `.--text-align-<value>`（`start`、`center`、`end`、`justify`）涵蓋 InstUI 的跨領域 `display` 與 `textAlign` 屬性（View、Button、Metric、Tabs、…）作為可組合的類別 — 因此它們並非每個元件的修飾符。

每個雙破折號類別對同名的單破折號元件修飾符，在層疊上具有決定性勝出（cascade），無論樣式表的引入順序為何 — 有關機制請見 [Authoring conventions](/conventions/authoring)。

此處所有內容皆為由 `--instui-*` 代幣驅動的純 CSS，因此會透過代幣層跟隨 InstUI。關於 `componentsCss` 與每個元件建構器的資訊，請參閱 [API 參考](/api/)。

## 覆疊：對話框與彈出視圖

覆疊元件採用原生平台基元，因此在極少或不使用 JavaScript 的情況下也能有可及性的表現。

**模態（Modal）** — 在原生 `<dialog>` 上放置 `.instui-modal`。它會獲得焦點陷阱、以 `Esc` 關閉的行為，以及一個 `::backdrop`；背景遮罩使用與 `.instui-mask` 相同的 `--instui-component-mask-background-color` 代幣（加入 `-blur` 可使其霜化）。使用 invoker 指令開啟與關閉 — 無需腳本：

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

**上下文視圖 / popover** — 在 `[popover]` 元素上放置 `.instui-context-view` 並以 `popovertarget` 切換。它位於頂層並在點擊外部或 `Esc` 時輕鬆關閉，同樣無需腳本：

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**抽屜佈局（Drawer layout）** — 在具有 `.tray` 與 `.content` 子項的佈局根上放置 `.instui-drawer-layout`。加入 `open` 屬性（或 `-open`）來顯示托盤，並使用 `placement="end"`（或 `-placement-end`）將其停靠於 inline-end 側 — 位置透過邏輯的 `inset-inline-*`/`flex-direction` 屬性解析，因此在 `dir="rtl"` 下會自動翻轉，無需額外規則。focused 互動套件加入 Invoker 指令路由並在寬度跨越 `--drawer-layout-min-width`（預設 `--instui-breakpoints-sm`，然後 `30rem`）時切換覆疊模式（`should-overlay-tray`）：

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**遮罩（Mask）** — `.instui-mask` 適用於內流覆疊（例如卡片上的 spinner）；模態的 `::backdrop` 則覆蓋模態情境。

這兩種模式也作為行為性自訂元素包裝於 `@pantoken/web-components`：`<instui-modal open>`（由其 `open` 屬性驅動的 `<dialog>`）與 `<instui-context-view>`（原生 popover）。

瀏覽器支援：popover API 與 `popovertarget` 屬於 Baseline 2024；invoker 指令（`command`/`commandfor`）屬於 Baseline 2025，因此在舊版瀏覽器上請把按鈕以一行回退給 `dialog.showModal()`。在支援的情況下，使用 CSS 錨點定位（Chromium）將 popover 定位於觸發器旁；在其他環境則將其置中於頂層。

## 表單

**FormField** — `.instui-form-field` 是一個 CSS-Grid 包裝器，用於布局標籤、控制項與任意訊息。將其置於 `<label>` 上以讓標籤與控制項原生關聯。它有三個格區 — `label`、`controls`、`messages`：

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked`（預設）將區域堆疊；`-layout-inline` 則將標籤置於控制項旁（可透過 `-label-align-{start,end}` 與 `-v-align-{top,middle,bottom}` 調整）。`-readonly` 會重新著色標籤。

**必填星號** 會在欄位因 _任一_ `-required` 類 _或_ 欄位內的原生 `required` 控制項要求時出現 — 因此你可以只在輸入上設定 `required`，標記就會顯示。它是裝飾性的（位於標籤上的 `::after`，不在可及性樹中）；請搭配「標註 * 為必填欄位」之類的說明，除非表單本身已一目了然。

**FormFieldGroup** — `.instui-form-field-group` 將相關欄位群組於 `<fieldset>` 中，並帶有 `<legend>` 描述。它只是版面（無專用代幣）：預設將欄位堆疊；`-layout-columns` / `-layout-inline` 將它們流成回應式欄列，並以 `-row-spacing-*` / `-col-spacing-*` 以及 `-v-align-*` 調整格線。

**RadioInputGroup** — `.instui-radio-input-group` 與 `<fieldset>`/`<legend>` 群組相同，專為單選按鈕設計。由於子單選按鈕共享 `name`，選擇為原生單選—因此一組切換按鈕會作為單一控制而非分散按鈕。`-variant-simple`（預設）排列標準單選（`-layout-columns`/`-inline` 將它們流為一列）；`-variant-toggle` 則把子項的 `.instui-radio.-variant-toggle` 按鈕連接成單一分段控制（邊框合併、圓角外端）：

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

**訊息（Messages）** — `.instui-form-field-messages` 為容器；每個 `.instui-form-field-message` 採用一個 `-type-*`：`-type-hint`（灰色，預設）、`-type-error`（紅色文字＋圓形警示圖示）、`-type-success`（綠色文字＋圓形核取圖示）、以及 `-type-screenreader-only`（視覺上裁切但仍會被宣布）。圖示以 `currentColor` 著色，因此永遠符合訊息顏色。`-type-new-error` 是 `-type-error` 的已過時別名。使用 `aria-describedby` 將容器連接到控制項，並在發生錯誤時於控制項上設定 `aria-invalid`。

在 FormField 內，`-type-error` 訊息會跟隨用戶端驗證：在欄位的控制項為 `:user-invalid`（原生、使用者互動後）之前保持隱藏 — 或者你可在 `.instui-form-field` 上以 `-invalid` 強制顯示（用於伺服器錯誤）。一個獨立的 `.instui-form-field-messages`（非欄位內）則不受影響。控制項的焦點環同理：在 `:user-invalid`/`-invalid` 時為危險（danger），在 `-success` 時為成功（success）。

**文字控制項** — `.instui-text-input`（原生 `<input>`）、`.instui-text-area`（原生 `<textarea>`，可調整大小）與 `.instui-simple-select`（原生 `<select>`，具有輸入游標）共享相同外觀與狀態：`-invalid`（錯誤邊框）、`-success`（成功邊框）、`-readonly`、原生 `:disabled` 與 `-size-{sm,md,lg}`。若需前置/後置圖示（InstUI 的 `renderBeforeInput`/`renderAfterInput`），請將輸入包在 `.instui-input-group` 中，並加入 `.before`/`.after` 插槽（一個 `-icon-*` 圖示）；`-should-not-wrap` 可保持單行。`.instui-number-input` 是該門面加上一個 `.arrows` 的 +/- 旋鈕欄（原生 `type="number"`；將按鈕連到 `stepUp()`/`stepDown()`）。`.instui-range-input` 是樣式化的 `input[type="range"]`，其值會在 `.instui-range-input-value` 反向氣泡中呈現。若需帶有 listbox popover 的富型 combobox，請使用 `@instructure/ui` — 本庫涵蓋原生控制。

**樣式化下拉選單（實驗性）** — 選用的 `select.css` 可升級相同的 `.instui-simple-select` 元素：它使用 CSS 可自訂選取（Customizable Select）模式來樣式化開啟的下拉面板及每個選項（含 hover 與已選狀態）。

> [!WARNING]
> `select.css` 依賴於 `appearance: base-select` / `::picker(select)`，這是 **實驗性** 的（Chrome 135+，尚未成為 Baseline）。它以獨立選用樣式表發佈，且每條規則都以 `@supports (appearance: base-select)` 為門檻，因此在不支援的瀏覽器上不會有任何作用 — `.instui-simple-select` 控制項只會保持原生的樣式。僅在你接受有限支援並想要增強下拉時載入。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
