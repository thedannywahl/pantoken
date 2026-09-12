# 開始使用

Pantoken 採用 [Instructure UI](https://instructure.design) 的設計代幣與圖示，將它們解析一次，並將該單一模型重塑為多平台的套件：純樣式表、SCSS 和 Less、React、Vue、Svelte、Tailwind 與 Panda、原生 Swift 與 Kotlin、WordPress 與 Drupal、Figma 等等。

安裝最符合你任務需求的最小套件。所有內容也都由統一的 `pantoken` 套件重新匯出，因此可以從那裡開始，之後再逐步縮小範圍。

## 快速建立啟始專案

試用 pantoken 的最快方法：搭建一個已安裝並已串接好的啟始專案。

```sh
npx create-pantoken-app
```

平台：`components`（純 HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。參見
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) 以取得 `--dir <path>` 與程式化使用說明。

使用 AI 程式碼代理？不需安裝 —— 直接將其指向該技能即可：

```prompt
擷取 create.pantoken.app/SKILL.md 並依照其中說明在此專案設定 pantoken。
```

如果希望將 pantoken 的代理規則永久整合到倉庫（AGENTS.md、編輯器規則、本技能的本地副本），請改為執行 `npx @pantoken/ai init`。

## 代幣模型

代幣是名為 `--instui-<group>-<name>` 的 CSS 自訂屬性，例如
`--instui-color-background-brand` 或 `--instui-spacing-space-md`。內含三個主題：`rebrand`
（預設，光/暗模擬不同處以 `light-dark()` 表示）、`canvas`，以及 `canvasHighContrast`。
圖示為從 Lucide 加上 Instructure 自訂字形派生的 `<image>` 代幣（`--instui-icon-<name>`）。

## 為網頁應用套用樣式

安裝樣式表並匯入一次。它會定義每個 `--instui-*` 屬性，因此可直接在自己的 CSS 中引用。

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

該 Web 元件可在任何框架中運作，無需移植。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS 代幣

圖示為 CSS 自訂屬性（`--instui-icon-<name>`）。載入樣式表一次，並將任何圖示引用為 `mask-image` 或 `background-image` — 無需逐圖示匯入。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 單一圖示 vs 全套

`@pantoken/icons` 提供兩個具名匯出。使用 `iconsByName` 以載入單一圖示，而不需遍歷完整陣列：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

當需要整套（例如建立選取器）時，使用 `icons`：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

兩個匯出在模組初始化時都會載入完整 IR — 這個層級沒有針對單一圖示的 tree-shaking。若要精簡的僅 CSS 載入，請使用 [CDN picker](/guide/cdn-picker) 以為所需圖示產生合併 URL。

## 為原生平台產生

CLI 會將代幣原始檔寫入目標倉庫。執行器之外不需安裝其他東西：

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

更多目標請參閱 [pantoken CLI](/guide/cli)。

## VS Code 撰寫提示

`@pantoken/pantoken` 現在隨套件提供 VS Code 的 custom-data 檔案，讓下游專案在 HTML/CSS 中可以取得類別與代幣自動完成建議，而無需安裝 pantoken 專屬擴充。

1. 安裝統一套件：

```sh
npm i @pantoken/pantoken
```

1. 在消費者工作區中指向所附帶的 custom-data JSON：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 重新載入 VS Code（或執行「Developer: Reload Window」）以套用新資料。

這會啟用對 `instui-*` 類別代幣（以及 `-modifier` 類別代幣）以及 `--instui-*` 自訂屬性的建議。

## 下一步去哪裡

- [套件地圖](/api/) — 按任務選擇要使用的套件。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 在消費者倉庫中安裝代理資產與規則。
- [架構](/guide/architecture) — 代幣模型、核心與輸出如何協同。
- [API 參考](/api/) — 每個匯出符號，從原始碼生成。
