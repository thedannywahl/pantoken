# 開始使用

pantoken 取得 Instructure UI 的設計代幣與圖示，解析成一個模型，然後將該模型重塑為多平台的套件：純樣式表、SCSS 與 Less、React、Vue、Svelte、Tailwind 與 Panda、原生 Swift 與 Kotlin、WordPress 與 Drupal、Figma 等等。

安裝最符合任務需求的最小套件。所有內容也會由統一的 `pantoken` 套件重新匯出，因此可以從那裡開始，之後再逐步縮小範圍。

## 快速建立起始專案

嘗試 pantoken 的最快方式：建立一個已安裝並已連接好 pantoken 的起始專案。

```sh
npx create-pantoken-app react
```

支援平台：`components`（純 HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。請參閱
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) 以取得 `--dir <path>` 與程式化使用方式。

使用 AI 程式碼代理？不需要安裝 — 直接指向該 skill 即可：

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

對於 Gemini CLI、Cursor CLI、OpenAI Codex CLI、GitHub Copilot CLI 與 Amazon Q Developer CLI 也以相同方式運作 — 將 `claude` 換成 `gemini`、`agent`、`codex`、`copilot -p` 或 `q chat`。若想永久將 pantoken 的代理規則綁進倉庫（AGENTS.md、編輯器規則、此 skill 的本地副本），請改執行 `npx @pantoken/ai init`。

## 代幣模型

代幣為 CSS 自訂屬性，命名為 `--instui-<group>-<name>`，例如
`--instui-color-background-brand` 或 `--instui-spacing-space-md`。預設隨附三個主題：`rebrand`
（預設，使用 `light-dark()` 表示淺色與深色的差異）、`canvas`，以及 `canvasHighContrast`。
圖示為 `<image>` 代幣（`--instui-icon-<name>`），來源為 Lucide 加上 Instructure 的自定義字形。

## 為 Web 應用套用樣式

安裝樣式表並匯入一次。它定義了所有 `--instui-*` 屬性，因此可以直接在自己的 CSS 中引用它們。

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

該 Web 元件可在任何框架中使用，無需移植。

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

圖示為 CSS 自訂屬性（`--instui-icon-<name>`）。載入樣式表一次，並將任何圖示參考為 `mask-image` 或 `background-image` — 無需為每個圖示單獨匯入。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 單一圖示 vs 全套

`@pantoken/icons` 暴露兩個命名匯出。使用 `iconsByName` 以在不遍歷整個陣列的情況下擷取單一圖示：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

當需要整套圖示（例如建立挑選器）時，使用 `icons`：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

兩個匯出在模組初始化時都會載入完整 IR — 在此層級沒有每個圖示的 tree-shaking。若要精簡僅載入 CSS，請使用 [CDN picker](/guide/cdn-picker) 產生只包含所需圖示的合併 URL。

## 為原生平台產生

CLI 將代幣原始檔寫入目標倉庫。執行器之外不需安裝任何東西：

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

每個目標請見 [pantoken CLI](/guide/cli)。

## VS Code 撰寫提示

`@pantoken/pantoken` 現在隨附 VS Code 的 custom-data 檔案，使下游專案在 HTML/CSS 中無需安裝 pantoken 專用擴充就能獲得 class 與 token 的補完。

1. 安裝統一套件：

```sh
npm i @pantoken/pantoken
```

1. 在消費方工作區中，指向所附的 custom-data JSON 給 VS Code：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 重新載入 VS Code（或執行 "Developer: Reload Window"）以套用新資料。

這會啟用對 `instui-*` 類別代幣（和 `-modifier` 類別代幣）以及 `--instui-*` 自訂屬性的建議。

## 下一步去哪裡

- [套件對照表](/guide/packages) — 按任務選擇要使用的套件。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 在消費者倉庫中安裝代理資產與規則。
- [架構](/guide/architecture) — 代幣模型、core 與輸出如何結合。
- [API 參考](/api/) — 每個匯出符號，從原始碼產生。
