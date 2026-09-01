# 外掛程式

pantoken 外掛程式可在不分叉套件的情況下擴展 token 或 CSS 輸出。可以用 `definePlugin` 從 `@pantoken/plugin-kit` 建立，然後將它傳給 `buildTokens` 或 `toCss`。

## 撰寫外掛程式

給 `definePlugin` 傳入你實作的 hooks。它會回傳一個一般的外掛程式，並以從那些 hooks 推斷出的能力進行標記。外掛可以擴展 IR（`tokens`, `icons`）、CSS 輸出（`css`），或兩者兼具。

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

`buildTokens` 和 `toCss` 會對傳入的外掛執行 `checkPlugins`。當外掛在它被註冊的階段沒有對應的 hook 時，它會發出警告 — 不會擲出例外 — 因此一個僅限 token 的外掛若被傳給 `toCss`，會跳過並顯示說明，而不是靜默無事發生。

## 組合外掛程式

使用 `extendPlugin` 在另一個外掛之上擴充，或用 `mergePlugin` 將同階層外掛合併：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同階段的 hooks 可組合：`tokens` 先執行基礎再執行新增部分，`css` 合併兩個貢獻，而 `icons` 兩者都會執行。

## 驗證你的外掛輸出

在外掛的測試中對該外掛輸出執行來自 `@pantoken/utils` 的共用 drift 檢查，這樣拼字錯誤或重新命名的 token 會在本地快速失敗：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 隨附的外掛

- `@pantoken/plugin-simple-icons` — 將 simple-icons 的圖示標記為圖示 token。
- `@pantoken/plugin-logos` — 以 SVG、data URI 和 `--instui-logo-*` 影像 token 提供 Instructure 產品商標。
- `@pantoken/plugin-prune-custom-props` — 一個 PostCSS 插件（非 pantoken 外掛），會從樣式表中移除未使用的自訂屬性。

一些過去作為外掛的功能現在直接隨 `@pantoken/components` 發行，因為太多元件預設需要它們：升降陰影（`--instui-elevation-*`，在 `components.css` 中）、焦點外框環（在 `base.css` 中 — 當 pantoken 管理頁面時每個可聚焦元素都會獲得）、以及 Instructure 品牌字型（Atkinson Hyperlegible Next：`base.css` 應用 `--instui-font-family-base`；選用的 `@pantoken/components/fonts.css` 會載入 `@font-face` woff2 檔案）。

參見每個外掛的 [API 參考](/api/)。
