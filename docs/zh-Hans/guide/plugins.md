# 插件

pantoken 插件在不分叉包的情况下扩展令牌或 CSS 输出。使用 `definePlugin` 从 `@pantoken/plugin-kit` 构建，然后将其传递给 `buildTokens` 或 `toCss`。

## 编写插件

为 `definePlugin` 提供你实现的钩子。它会返回一个普通插件，并根据这些钩子推断的能力为其打上标记。插件可以扩展 IR（`tokens`、`icons`）、CSS 输出（`css`）或两者兼有。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 感知能力的注册

`buildTokens` 和 `toCss` 会对你传入的插件运行 `checkPlugins`。当插件在其注册的阶段没有匹配的钩子时，它会发出警告 —— 它永远不会抛出错误 —— 因此将仅令牌的插件传给 `toCss` 时，会以注释方式跳过，而不是静默无事发生。

## 组合插件

使用 `extendPlugin` 在另一个插件之上构建，或使用 `mergePlugin` 将同级插件合并：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同阶段钩子可组合：`tokens` 先运行基础再运行附加，`css` 合并两者的贡献，`icons` 则两者都运行。

## 验证你的插件输出

在插件的测试中对其输出运行来自 `@pantoken/utils` 的共享漂移检查，这样拼写错误或重命名的令牌会快速且在本地失败：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 捆绑的插件

- `@pantoken/plugin-simple-icons` — 将 simple-icons 的图标标记为 icon 令牌。
- `@pantoken/plugin-logos` — 作为 SVG、Data URI 和 `--instui-logo-*` 图像令牌提供的 Instructure 产品徽标。
- `@pantoken/plugin-prune-custom-props` — 一个 PostCSS 插件（不是 pantoken 插件），用于从样式表中移除未使用的自定义属性。

一些以前作为插件的功能现在随 `@pantoken/components` 一起发布，因为很多组件开箱就需要它们：升降阴影（`--instui-elevation-*`，位于 `components.css` 中）、焦点轮廓环（位于 `base.css` 中 —— 当 pantoken 管理页面时，每个可聚焦元素都会获得它），以及 Instructure 品牌字体（Atkinson Hyperlegible Next：`base.css` 应用 `--instui-font-family-base`；可选的 `@pantoken/components/fonts.css` 会加载 `@font-face` woff2 字体文件）。

参见每个插件导出的 [API 参考](/api/)。
