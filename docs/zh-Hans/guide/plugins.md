# 插件

pantoken 插件在不分叉包的情况下扩展令牌或 CSS 输出。使用 `definePlugin` 从 `@pantoken/plugin-kit` 构建，然后将其传递给 `buildTokens` 或 `toCss`。

## 编写插件

给 `definePlugin` 提供你实现的钩子。它会返回一个普通插件，并根据那些钩子推断的能力对其进行标记。插件可以扩展 IR（`tokens`、`icons`）、CSS 输出（`css`），或两者兼有。

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

`buildTokens` 和 `toCss` 会对你传入的插件运行 `checkPlugins`。当插件在其注册的阶段没有匹配的钩子时，它会发出警告——不会抛出异常——因此将仅含令牌的插件传给 `toCss` 时，会以注释方式跳过而不是静默无效。

## 组合插件

使用 `extendPlugin` 在另一个插件之上构建，或使用 `mergePlugin` 将同级插件合并：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同一阶段的钩子可以组合：`tokens` 先运行基础再运行追加，`css` 合并两份贡献，`icons` 则两者都运行。

## 验证插件的输出

在插件的测试中，对插件自身的输出运行来自 `@pantoken/utils` 的共享漂移检查，以便拼写错误或重命名的令牌能在本地快速失败：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 附带的插件

- `@pantoken/plugin-simple-icons` — 将 simple-icons 的图标品牌化，注册为图标令牌。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 图标，注册为 `--instui-icon-*` 图片令牌。
- `@pantoken/plugin-logos` — 将 Instructure 产品徽标作为 SVG、数据 URI 和 `--instui-logo-*` 图片令牌提供。
- `@pantoken/plugin-prune-custom-props` — 一个 PostCSS 插件（不是 pantoken 插件），用于从样式表中移除未使用的自定义属性。
- `@pantoken/plugin-custom-theme-colors` — 通过将一个属性（`data-pantoken-color`）设置为 13 个调色板之一，或设置为 `custom` 以使用任意品牌十六进制值，来对页面重新品牌。参见 [主题色](#theme-colors)。

Lucide Lab 的注册表可以延迟加载，然后传递给同步令牌钩子：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

一些以前作为插件发布的功能现在随 `@pantoken/components` 一起出货，因为许多组件需要开箱即用：高程阴影（`--instui-elevation-*`，位于 `components.css` 中）、焦点外轮廓环（位于 `base.css` 中 —— 当 pantoken 管理页面时每个可聚焦元素都会获得它）以及 Instructure 品牌字体（Atkinson Hyperlegible Next：`base.css` 应用 `--instui-font-family-base`；可选的 `@pantoken/components/fonts.css` 会加载 `@font-face` woff2s）。

## 主题色 {#theme-colors}

`@pantoken/plugin-custom-theme-colors` 为每个调色板发出一个 `[data-pantoken-color="…"]` 块（`navy`、`blue`、`green`、`red`、`orange`、`grey`、`plum`、`violet`、`stone`、`sky`、`honey`、`sea`、`aurora`）。每个块将品牌原语（`--instui-primitive-color-navy-*` 和 `-blue-*`）指向所选的调色板。它还通过 `color-mix()` 重新推导上游被扁平为字面十六进制的品牌表面，保留其烘焙的 alpha。语义状态颜色、显式的蓝色强调和高程阴影保持不变。在 [基于色板的主题演示](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) 中试用。

```html
<html data-pantoken-color="sea"></html>
```

### 自定义品牌色

将 `data-pantoken-color="custom"` 设置为要从任意十六进制值重新品牌，例如 Canvas 管理员在主题编辑器中输入的主色。pantoken 会从中派生完整的 10–200 `--instui-primitive-color-custom-*` 级别刻度：

1. **参考曲线。** 每一步的目标亮度是 13 个调色板在该步骤的平均 OKLCH 亮度，0 固定为白色，210 固定为黑色。所以自定义刻度的间距与出厂调色板的间距匹配。
2. **锚点。** 输入落在目标亮度最接近其自身的步骤上，然后调整为该确切亮度。`#cccccc` 在 `#c9c9c9` 时变为 `custom-40`：接近输入，但不总是完全相同。“最近”指的是曲线上的最近一步，而不是最接近的现有调色板颜色。
3. **填充。** 其它所有步骤保留输入的色相。其饱和度根据调色板相对于锚点的平均饱和度曲线来变化，并仅在颜色落在 sRGB 之外时被降低。

只接受 `#rgb` 和 `#rrggbb`；其它任何值都会抛出 `TypeError`，因此来自表单的十六进制值无法注入 CSS。

在构建时，发出已声明派生原语的完整规则：

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

要在运行时选择颜色而不发布令牌集，请在构建时预计算曲线和重映射规则。然后在浏览器中使用无依赖的 `/scale` 条目，仅设置 20 个派生原语：

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

文档站点的主题选择器、Canvas 主题编辑器和上面的演示都是以这种方式工作的。

有关每个插件导出的内容，请参见 [API 参考](/api/)。
