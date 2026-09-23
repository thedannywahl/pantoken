# 插件

pantoken 插件可在不分叉包的情况下扩展令牌或 CSS 输出。使用 `definePlugin` 从 `@pantoken/plugin-kit` 构建，然后将其传递给 `buildTokens` 或 `toCss`。

## 编写插件

向 `definePlugin` 提供你实现的钩子。它返回一个普通插件，并根据这些钩子推断出的能力对其进行标记。插件可以扩展 IR（`tokens`、`icons`）、CSS 输出（`css`），或两者兼有。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 能力感知的注册

`buildTokens` 和 `toCss` 会对你传入的插件运行 `checkPlugins`。当插件在其注册阶段没有匹配的钩子时，它会发出警告——不会抛出——因此传递给 `toCss` 的仅令牌插件会以注释方式被跳过，而不是静默无效。

## 组合插件

使用 `extendPlugin` 在另一个插件之上构建，或使用 `mergePlugin` 将同级插件合并：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同一阶段的钩子可以组合：`tokens` 先运行基础再运行附加，`css` 合并两个贡献，`icons` 两者均运行。

## 验证插件的输出

在插件的测试中对其输出运行来自 `@pantoken/utils` 的共享漂移检查，这样拼写错误或重命名的令牌会在本地快速失败：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 随包提供的插件

- `@pantoken/plugin-simple-icons` — 来自 simple-icons 的品牌图标，注册为图标令牌。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 图标，注册为 `--instui-icon-*` 图像令牌。
- `@pantoken/plugin-logos` — Instructure 产品徽标，作为 SVG、数据 URI 和 `--instui-logo-*` 图像令牌。
- `@pantoken/plugin-prune-custom-props` — 一个 PostCSS 插件（不是 pantoken 插件），用于从样式表中删除未使用的自定义属性。

Lucide Lab 的注册表可以延迟加载，然后传递给同步的令牌钩子：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

一些曾经作为插件的功能现在直接随 `@pantoken/components` 一起发布，因为许多组件开箱即需：提升阴影（`--instui-elevation-*`，位于 `components.css`）、焦点外环（位于 `base.css` —— 当 pantoken 管理页面时每个可聚焦元素都会获得它）以及 Instructure 品牌字体（Atkinson Hyperlegible Next：`base.css` 应用 `--instui-font-family-base`；可选择的 `@pantoken/components/fonts.css` 加载 `@font-face` woff2 文件）。

有关每个插件导出的详细信息，请参阅 [API 参考](/api/)。
