# 外掛程式

pantoken 外掛程式可以在不派生套件的情況下擴展 token 或 CSS 輸出。使用 `definePlugin` 從 `@pantoken/plugin-kit` 建立，然後將它傳遞給 `buildTokens` 或 `toCss`。

## 撰寫外掛程式

將您實作的 hooks 提供給 `definePlugin`。它會回傳一個正常的外掛，並以從那些 hooks 推斷出的能力標記。外掛可以擴展 IR（`tokens`、`icons`）、CSS 輸出（`css`），或兩者皆有。

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

`buildTokens` 和 `toCss` 會針對您傳入的外掛執行 `checkPlugins`。當外掛在其註冊階段沒有相符的 hook 時，它會發出警告 — 不會丟出錯誤 — 因此傳遞給 `toCss` 的僅 token 外掛會被略過並帶有提示，而不會默默無聞地沒做事。

## 組合外掛程式

使用 `extendPlugin` 在另一個外掛之上構建，或用 `mergePlugin` 將同儕合併：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

相同階段的 hooks 可組合：`tokens` 會先執行 base 再執行 addition，`css` 會合併兩個貢獻，而 `icons` 會同時執行兩者。

## 驗證外掛的輸出

在外掛的測試中，對外掛自身的輸出執行來自 `@pantoken/utils` 的共享 drift 檢查，這樣拼字錯誤或被重新命名的 token 會快速且在本地失敗：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 捆綁的外掛

- `@pantoken/plugin-simple-icons` — 將 simple-icons 的圖示標記為品牌圖示，註冊為 icon tokens。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 圖示，註冊為 `--instui-icon-*` 圖像 token。
- `@pantoken/plugin-logos` — Instructure 的產品標誌，提供為 SVG、資料 URI，以及 `--instui-logo-*` 圖像 token。
- `@pantoken/plugin-prune-custom-props` — 一個 PostCSS 外掛（非 pantoken 外掛），會從樣式表中移除未使用的自訂屬性。

Lucide Lab 的註冊表可以延遲載入，然後傳給同步的 token hook：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

一些曾經作為外掛的功能現在直接隨 `@pantoken/components` 發行，因為許多元件預設就需要它們：抬升陰影（`--instui-elevation-*`，位於 `components.css`）、焦點外框環（位於 `base.css` — 當 pantoken 掌管頁面時每個可聚焦元素都會得到它）、以及 Instructure 品牌字型（Atkinson Hyperlegible Next：`base.css` 套用 `--instui-font-family-base`；選用的 `@pantoken/components/fonts.css` 載入 `@font-face` woff2s）。

參閱每個外掛輸出的 [API 參考](/api/)。
