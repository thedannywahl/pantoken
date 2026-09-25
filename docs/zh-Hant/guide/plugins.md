# 外掛程式

pantoken 外掛能在不分叉套件的情況下擴展代幣或 CSS 輸出。可使用 `definePlugin` 從 `@pantoken/plugin-kit` 建立，然後傳給 `buildTokens` 或 `toCss`。

## 撰寫外掛

把你實作的掛鉤給 `definePlugin`。它會回傳一個正常的外掛，並以從那些掛鉤推斷出的能力來標記。外掛可以擴展 IR（`tokens`、`icons`）、CSS 輸出（`css`）或兩者兼具。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 能力感知註冊

`buildTokens` 和 `toCss` 會對你傳入的外掛執行 `checkPlugins`。當外掛在其被註冊的階段沒有匹配的掛鉤時，它會發出警告——但不會丟出錯誤——因此一個只有代幣的外掛被傳給 `toCss` 時，會以備註跳過，而不是靜默地什麼都不做。

## 組合外掛

可用 `extendPlugin` 以另一個外掛為基礎進行擴展，或用 `mergePlugin` 將同級外掛合併：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同一階段的掛鉤會組合：`tokens` 先執行基底再執行新增者，`css` 合併兩個貢獻，且 `icons` 會同時執行兩者。

## 驗證外掛輸出

在外掛的測試中對外掛自身輸出執行來自 `@pantoken/utils` 的共用漂移檢查，這樣拼字錯誤或被重新命名的代幣會快速且在本地失敗：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 捆綁的外掛

- `@pantoken/plugin-simple-icons` — 將 simple-icons 品牌標誌標記為圖示代幣。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 圖示，註冊為 `--instui-icon-*` 圖像代幣。
- `@pantoken/plugin-logos` — 以 SVG、資料 URI 與 `--instui-logo-*` 形式提供的 Instructure 產品商標圖像代幣。
- `@pantoken/plugin-prune-custom-props` — 一個 PostCSS 外掛（不是 pantoken 外掛），會從樣式表中移除未使用的自訂屬性。
- `@pantoken/plugin-custom-theme-colors` — 透過設定一個屬性（`data-pantoken-color`）為 13 種調色盤之一，或設定為 `custom` 以使用任一品牌 hex，來重新品牌化頁面。見 [主題色彩](#theme-colors)。

Lucide Lab 的註冊表可以延遲載入，然後傳給同步的代幣掛鉤：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

有些以前是外掛的項目現在在 `@pantoken/components` 中一起發布，因為很多元件預設需要它們：高程陰影（`--instui-elevation-*`，位於 `components.css`）、焦點輪廓環（位於 `base.css` —— 當 pantoken 管理頁面時每個可聚焦元素都會得到它）以及 Instructure 品牌字型（Atkinson Hyperlegible Next：`base.css` 套用 `--instui-font-family-base`；選用的 `@pantoken/components/fonts.css` 會載入 `@font-face` woff2 檔案）。

## 主題色彩

`@pantoken/plugin-custom-theme-colors` 為每個調色盤輸出一個 `[data-pantoken-color="…"]` 區塊
（`navy`、`blue`、`green`、`red`、`orange`、`grey`、`plum`、`violet`、`stone`、`sky`、`honey`、`sea`、`aurora`）。每個區塊將品牌原始值（`--instui-primitive-color-navy-*` 與 `-blue-*`）指向所選的調色盤。它也會重新推導那些上游被平鋪為字面 hex 的品牌表面，並透過 `color-mix()` 保留其烘焙的透明度。語意狀態色、明示的藍色重點以及高程陰影仍保持不變。可在 [以色板為基礎的主題示範](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) 試用。

```html
<html data-pantoken-color="sea"></html>
```

### 自訂品牌色

將 `data-pantoken-color="custom"` 設為任意 hex 以重新品牌，例如 Canvas 管理員在主題編輯器輸入的主色。pantoken 會從該色推導出完整的 10–200 `--instui-primitive-color-custom-*` 尺度：

1. **參考曲線。** 每個步驟的目標亮度是 13 個調色盤在該步驟的平均 OKLCH 亮度，並把 0 固定為白、210 固定為黑。這樣自訂尺度的間距會與已發佈的調色盤匹配。
2. **錨點。** 輸入會放到其自身亮度最近的步驟，然後對齊到該精確亮度。`#cccccc` 在 `#c9c9c9` 會變為 `custom-40`：接近輸入，但不一定完全相同。「最近」指的是曲線上的最近步驟，而不是最接近現有調色盤顏色。
3. **填補。** 其他每個步驟都保留輸入的色相。飽和度依據相對於錨點的調色盤平均飽和度曲線而變動，且只有在顏色超出 sRGB 範圍時才會被減少。

僅接受 `#rgb` 與 `#rrggbb`；其他任何值都會拋出 `TypeError`，因此表單輸入的 hex 無法注入 CSS。

在建置時，輸出整個規則，並把已推導的原始值一起宣告：

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

若要在執行時選取顏色而不發佈完整代幣集，可在建置時預先計算曲線與重映射規則。然後在瀏覽器使用無依賴性的 `/scale` 入口，並只設置那 20 個推導出的原始值：

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

文件站的主題選擇器、Canvas 主題編輯器，以及上面提到的示範都是以此方式運作。

查看每個外掛輸出的 [API 參考](/api/)。
