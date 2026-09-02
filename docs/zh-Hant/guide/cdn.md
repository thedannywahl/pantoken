# CDN 與 發行

pantoken 將每個套件發佈到 npm，因此你可以直接從 CDN 取得 tokens、components 和 web components — 無需建置步驟或打包工具。本頁說明 CSS combine URL（含互動式產生器）以及 web-component 的即插即用方式。

## 代幣基礎

每個 pantoken 組件都從頁面上的 token 表讀取 `--instui-*` 自訂屬性。有兩種變體發佈：

- `@pantoken/css/dist/style.lean.css` — 推薦的 CDN 基礎。它包含除了完整圖示集以外的所有 token，壓縮後約 23 KB。
- `@pantoken/css/dist/style.css` — 完整表單，包含約 ~1,777 個圖示字形 token（`--instui-icon-*`）。壓縮後約 140 KB。若你廣泛透過 `var(--instui-icon-*)` 參照圖示，請載入此版本。

陰影等級與 focus-ring 變數同時存在於兩個表中，因此只載入基礎表就能讓陰影與 focus ring 正常運作。

## 選擇你的元件與圖示

[互動式 CDN 選擇器](/guide/cdn-picker) 會為 CSS 建立 jsDelivr combine URL，並產生 JavaScript 套件片段。打開它、勾選所需項目，然後複製產生的輸出。

- **Components 分頁** — 選擇單一組件樣式表或整個 `components.css` barrel。如有需要，另加上 base reset 或 spacing/color utilities。
- **JS 分頁** — 複製 `@pantoken/interactions` 的 ESM import 片段。
- **Icons 分頁** — 從 InstUI 集合（約 ~1,800 個圖示）或 Simple Icons（約 ~3,300 個品牌字形）選擇個別圖示。選擇器會為圖示 CSS 檔輸出單獨的 combine URL，讓你只載入實際使用的圖示。
- **Web Components 分頁** — 建立 `@pantoken/web-components` 片段（ESM 選擇性註冊或經典 script 啟動）。

每個組件檔案都很小 — 大多約 2 KB。會渲染圖示的組件（`alert`、`checkbox` 以及其他幾個）需要那些字形，因此當你選擇精簡表時，產生器會額外加入 `@pantoken/components/dist/component-icons.css`（壓縮後約 0.5 KB — 該組件集使用的 11 個圖示）。完整表已包含它們。

### 載入順序與字型

先載入 token 基礎，再載入可選的 base reset，接著是組件檔案，最後載入 utilities — 它們是覆寫工具，只有在級聯中位於組件規則之後時才會真正覆寫。上面的 combine URL 已為你排好順序。字型是唯一例外：`@pantoken/components/dist/fonts.css` 以相對路徑指向字型檔，因此 combine 無法重寫它們 — 請將它作為獨立的 `<link>` 載入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### 一次載入全部

在選擇器中勾選 **All components** 可以切換為 barrel，或自行直接指向它（壓縮後約 141 KB），與 token 表一起載入：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` 註冊與框架無關的 `<instui-*>` 自訂元素。它們會內嵌自己的 CSS，但仍從頁面上的表讀取 tokens，因此也要載入 token 基礎。

### ES 模組（推薦）

ESM CDN 會替你解析套件的相依性。這會註冊所有元素：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

使用完整 token 表（或精簡表加上 `component-icons.css`），以便像 `<instui-alert>` 這類會渲染圖示的元素能解析到它們的字形。

若只想註冊部分元素（以及其巢狀相依），匯入 `register` 並傳入 `only`：

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### 經典 script 標籤

若要無模組的即插即用方式，載入 IIFE build。它會打包相依性並在載入時自動註冊所有元素，暴露一個 `PantokenWebComponents` 全域變數：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

它比 ESM 路徑大一些 — 內嵌了 `@pantoken/components` 與 `@pantoken/icons` — 因此只有在無法使用模組時才考慮使用。

## 鎖定版本

上面那些 URL（以及選擇器產生的 URL）會追蹤最新發行。為生產環境鎖定一個 major（或明確）版本，例如 `@pantoken/css@0`，以免升級時產生意外。
