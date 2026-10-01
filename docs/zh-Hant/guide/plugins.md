# 外掛程式

pantoken 外掛可以在不分支套件的情況下擴展代幣或 CSS 輸出。使用 `definePlugin` 從 `@pantoken/plugin-kit` 建立一個外掛，然後將它傳給 `buildTokens` 或 `toCss`。

## 撰寫外掛

把你實作的鉤子交給 `definePlugin`。它會回傳一個常規外掛，並以從那些鉤子推斷出的能力來標記。一個外掛可以擴展 IR（`tokens`、`icons`）、擴展 CSS 輸出（`css`），或兩者皆可。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 能力感知的註冊

`buildTokens` 和 `toCss` 會對你傳入的外掛執行 `checkPlugins`。它會發出警告 —— 不會拋出例外 —— 當外掛在其被註冊的階段沒有相對應的鉤子時，因此傳入 `toCss` 的僅代幣外掛會被以備註跳過，而不是靜默地什麼也不做。

## 組合外掛

使用 `extendPlugin` 在另一個外掛之上擴充，或使用 `mergePlugin` 將同儕外掛合併：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同階段的鉤子可以被組合：`tokens` 會先執行基底再執行追加，`css` 會合併兩者的貢獻，而 `icons` 會兩者皆執行。

## 驗證外掛的輸出

在外掛的測試中對其輸出執行來自 `@pantoken/utils` 的共用 drift 檢查，這樣拼字錯誤或被重新命名的代幣會迅速在本地失敗：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 捆綁的外掛

- `@pantoken/plugin-simple-icons` — 來自 simple-icons 的品牌圖示，註冊為 icon tokens。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 圖示，註冊為 `--instui-icon-*` 圖像代幣。
- `@pantoken/plugin-logos` — Instructure 產品標誌，以 SVG、資料 URI，以及 `--instui-logo-*` 圖像代幣提供。
- `@pantoken/plugin-prune-custom-props` — 一個 PostCSS 外掛（不是 pantoken 外掛），會從樣式表中移除未使用的自訂屬性。
- `@pantoken/plugin-custom-theme-colors` — 透過將一個屬性（`data-pantoken-color`）設定為 13 個調色板之一，或設定為 `custom` 以使用任意品牌十六進位色，來重新品牌頁面。見 [主題色彩](#theme-colors)。
- `@pantoken/plugin-custom-components` — 以代幣為後盾的自訂控制項，包括 SegmentedControl 和 SkeletonLoader。

### 分段控制（Segmented control）

在兩到五個相關視圖或篩選器間使用分段控制。每個選項都是同一命名群組中的標記化原生 radio；初始時標記一個為選中。當選項無法舒適地容納時使用分頁標籤或下拉選單；對於動作請使用按鈕群而非選擇。`-size-md` 樣式為預設，還有為更緊湊和更突出的情境提供的 `-size-sm` 和 `-size-lg`。

匯入 `@pantoken/plugin-custom-components/segmented-control.css` 以取得該控制項及其溢位按鈕。當某段需要圖示時，在段落標籤上使用 `-icon-*` 類別；該互動輔助也會將原生輸入的 `-icon-*` 類別推升到標籤的繪製器。給 fieldset 一個描述性的 `aria-label` 或一個可見的 legend。該輔助保留原生 radio 的宣告，新增鍵盤導覽，並可在每次箭頭鍵按下時選擇性地揭露一個被裁切的段落。對於兩個方向都使用邏輯的開始/結束控制與可存取的按鈕標籤：

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

匯入 `@pantoken/interactions/segmented-control.iife.js` 以在 DOM 就緒時註冊，或從 `@pantoken/interactions` 呼叫 `initSegmentedControl(fieldset, { size: "md", isOverflown: true })`，並在移除時呼叫 `cleanup()`。CSS 與原生 radio 選項在無 JS 的情況下也能運作；溢位箭頭則需要該行為。被選的項目使用語義化 drop-shadow 色彩的雙層設計陰影；它是一個明確的活動項目陰影，而不是現有的 `--instui-elevation-*` 複合效果。溢位按鈕透過 `--pantoken-segmented-overflow-shadow` 使用上游的 elevation3 元件代幣。

### 骨架載入（Skeleton loading）

`skeleton-loader.css` 子路徑為裝飾性的文字、頭像或圖像形狀提供樣式。Text 可接受 `-size-xxs` 至 `-size-xxl`；Avatar 與 Image 為中等大小。每個可選的 `.skeleton-row` 會增加一行文字而不改變大小。CSS 的閃光效果會在三次 1.5 秒的掃過後停止，且在使用者偏好減少動態效果時保持靜態。它在 JavaScript 載入之前即可生效。

僅在查詢依賴的內容將出現之處放置這些形狀，不要放在伺服器已知的導覽、篩選、標題或控制上。骨架不是進度計或操作忙碌狀態。於背景重新整理時保持現有內容可見；對於操作請使用旋轉器或按鈕忙碌狀態。

父級應用程式負責 loading、loaded、empty 與 error 的標記。每個頁面提供一個空狀態區域，並在伺服器 HTML 中提供一個獨立的空警示，兩者皆應置於忙碌內容區域之外：

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

當請求狀態改變時呼叫父級行為。它會更新 `aria-busy` 與另外兩個先前存在的公告，但不會替換內容或移動焦點：

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

如果使用按元件打包的互動集合而非直接匯入，請在 `[data-skeleton-region]` 元素上發出一個 `pantoken:skeleton-state` 事件，事件內含 `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`。對於快速請求，延遲顯示佔位符 200–500ms；該行為會獨立地延遲 loading 公告 400ms。在被動頁面載入時，保持焦點原位。只有在使用者自己觸發的動作要求時，才將焦點移到新載入的結果。狀態節點會宣告結果與空狀態；警示節點會宣告錯誤。不要在同一個元素上結合 `aria-busy`、`role="status"` 與 `role="alert"`。

Lucide Lab 的註冊表可以延遲載入，然後傳給同步的代幣鉤子：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

一些過去曾是外掛的功能現在直接包含在 `@pantoken/components` 中，因為許多元件開箱即用就需要它們：升降陰影（`--instui-elevation-*`，位於 `components.css` 中）、焦點輪廓環（位於 `base.css` — 當 pantoken 管理頁面時每個可聚焦項目都會得到它），以及 Instructure 品牌字型（Atkinson Hyperlegible Next：`base.css` 應用 `--instui-font-family-base`；選用的 `@pantoken/components/fonts.css` 會載入 `@font-face` woff2s）。

## 主題色彩

`@pantoken/plugin-custom-theme-colors` 對每個調色板輸出一個 `[data-pantoken-color="…"]` 區塊
（`navy`、`blue`、`green`、`red`、`orange`、`grey`、`plum`、`violet`、`stone`、`sky`、`honey`、`sea`、
`aurora`）。每個區塊都會將品牌原始變數（`--instui-primitive-color-navy-*` 與 `-blue-*`）指向所選的調色板。它也會重新導出上游已平坦化為字面十六進位值的品牌表面，並透過 `color-mix()` 保留其烘烤過的 alpha。語義化的狀態色、明確的藍色重點與升降陰影維持不變。可在 [swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) 試用。

```html
<html data-pantoken-color="sea"></html>
```

### 自訂品牌色

將 `data-pantoken-color="custom"` 設定為任意十六進位色以重新品牌，例如 Canvas 管理員在主題編輯器中輸入的主色。pantoken 從它推導出完整的 10–200 `--instui-primitive-color-custom-*` 等級：

1. **參考曲線。** 每個步驟的目標亮度為 13 個調色板在該步驟上的 OKLCH 亮度平均值，0 固定為白色、210 固定為黑色。因此自訂刻度的間距與預置調色板的間距相符。
2. **錨點。** 輸入會落在與其自身亮度最接近的步驟，然後對齊到該步驟的精確亮度。`#cccccc` 在 `#c9c9c9` 會變成 `custom-40`：接近輸入，但不一定完全相同。「最接近」指的是曲線上的最近步驟，而不是與現有調色板顏色的最近距離。
3. **填充。** 其他每個步驟皆保留輸入的色相。其飽和度依錨點相對的調色板平均飽和度曲線而變化，僅在某色超出 sRGB 範圍時才被降低。

僅接受 `#rgb` 與 `#rrggbb`；其他任何值都會拋出 `TypeError`，因此表單中的十六進位色不會注入 CSS。

在建構時輸出整個規則，並預先宣告推導出的原始變數：

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

若要在執行時挑選顏色而不隨套件一起發佈代幣集，請在建構時預先計算曲線與重映規則。然後在瀏覽器中使用無依賴的 `/scale` 入口，並僅設定 20 個推導出的原始變數：

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

文件網站的主題選擇器、Canvas 主題編輯器與上面的示範皆以此方式運作。

詳見每個外掛匯出的 [API 參考](/api/)。
