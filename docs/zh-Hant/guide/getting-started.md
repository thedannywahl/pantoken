# 開始使用

Pantoken 將 [Instructure UI](https://instructure.design) 的設計標記與圖示解析一次，並將那個模型重塑為多平台的套件：純樣式表、SCSS 與 Less、React、Vue 與 Svelte、Tailwind 與 Panda、原生 Swift 與 Kotlin、WordPress 與 Drupal、Figma 等等。

只需安裝最符合任務需求的最小套件。所有內容也都由統一的 `pantoken` 套件重新匯出，所以可以從那裡開始，之後再逐步縮小範圍。

## 建立啟動專案

嘗試 pantoken 的最快方式：搭配已安裝並完成串接的起始專案模板來建置。

```sh
npx create-pantoken-app
```

支援平台：`components`（純 HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。參見 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) 以了解 `--dir <path>` 與程式化使用方式。

使用 AI 程式碼代理？不需安裝 — 直接指向該技能：

```prompt
取得 create.pantoken.app/SKILL.md，並依照其內容在此專案中設定 pantoken。
```

如果想永久將 pantoken 的代理規則串入倉庫（AGENTS.md、編輯器規則、此技能的本地副本），改執行 `npx @pantoken/ai init`。

## 標記模型

標記為 CSS 自訂屬性，名稱為 `--instui-<group>-<name>`，例如 `--instui-color-background-brand` 或 `--instui-spacing-space-md`。提供三個主題：`rebrand`（預設，使用 `light-dark()` 來表示明暗主題差異）、`canvas`，以及 `canvasHighContrast`。圖示是來自 Lucide 加上 Instructure 自訂字形所派生的 `<image>` 標記（`--instui-icon-<name>`）。

## 為網頁應用設計樣式

安裝樣式表並匯入一次。它定義了每個 `--instui-*` 屬性，因此可以直接在自己的 CSS 中引用它們。

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

## 在任何地方使用圖示

web 元件可在任何框架中運作，無需移植。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS 標記

圖示為 CSS 自訂屬性（`--instui-icon-<name>`）。載入樣式表一次後，可將任何圖示當作 `mask-image` 或 `background-image` 來參考 — 無需逐個圖示匯入。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 單一圖示 vs. 全套

`@pantoken/icons` 暴露兩個命名匯出。使用 `iconsByName` 來擷取單一圖示，不需遍歷整個陣列：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

當需要整套圖示（例如建立選取器）時，使用 `icons`：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

兩個匯出在模組初始化時都會載入完整的 IR — 在此層級沒有每個圖示的樹搖優化。若要精簡僅載入 CSS，可使用 [CDN picker](/guide/cdn-picker) 產生只包含所需圖示的合併 URL。

## 為原生平台生成

CLI 將標記原始檔寫入目標專案。除了執行器外無需安裝其他東西：

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

請參見 [the pantoken CLI](/guide/cli) 了解所有目標平台。

## VS Code 撰寫提示

`@pantoken/pantoken` 現在提供 VS Code 的 custom-data 檔案，讓下游專案在不安裝 pantoken 專用擴充套件的情況下，也能在 HTML/CSS 中獲得類別與標記完成建議。

1. 安裝統一套件：

```sh
npm i @pantoken/pantoken
```

1. 在消費端工作區中，將 VS Code 指向所提供的 custom-data JSON：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 重新載入 VS Code（或執行 "Developer: Reload Window"）以套用新資料。

此設定啟用對 `instui-*` 類別標記（以及 `-modifier` 類別標記）以及 `--instui-*` 自訂屬性的建議。

## 下一步去哪裡

- [套件地圖](/guide/packages) — 按任務選擇要使用的套件。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 在消費者倉庫安裝代理資產與規則。
- [架構](/guide/architecture) — 探討標記模型、核心與輸出如何協同運作。
- [API 參考](/api/) — 每個匯出的符號，從原始碼產生。
