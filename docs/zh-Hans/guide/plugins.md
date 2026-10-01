# 插件

pantoken 插件在不分叉包的情况下扩展 token 或 CSS 输出。使用 `definePlugin` 从 `@pantoken/plugin-kit` 构建，然后将其传递给 `buildTokens` 或 `toCss`。

## 编写插件

向 `definePlugin` 提供你实现的钩子。它会返回一个常规插件，并根据这些钩子推断出能力并打上标记。插件可以扩展 IR（`tokens`、`icons`）、CSS 输出（`css`），或两者兼顾。

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

`buildTokens` 和 `toCss` 对传入的插件运行 `checkPlugins`。当插件在其注册的阶段没有匹配的钩子时，它会发出警告——不会抛出异常——因此将仅生成 token 的插件传给 `toCss` 时，会带注释地跳过，而不是静默无效。

## 组合插件

使用 `extendPlugin` 在另一个插件之上构建，或用 `mergePlugin` 将同级插件组合在一起：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同阶段钩子可以组合：`tokens` 先运行基础再运行追加，`css` 合并两者的贡献，`icons` 则同时运行两者。

## 验证插件的输出

在插件的测试中对其自身输出运行来自 `@pantoken/utils` 的共享漂移检查，这样拼写错误或重命名的 token 能迅速在本地失败：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 捆绑插件

- `@pantoken/plugin-simple-icons` — 将 simple-icons 的品牌图标注册为图标 token。
- `@pantoken/plugin-lucide-lab` — Lucide Lab 图标，注册为 `--instui-icon-*` 图像 token。
- `@pantoken/plugin-logos` — 将 Instructure 产品徽标作为 SVG、数据 URI 和 `--instui-logo-*` 图像 token。
- `@pantoken/plugin-prune-custom-props` — 一个 PostCSS 插件（不是 pantoken 插件），用于从样式表中删除未使用的自定义属性。
- `@pantoken/plugin-custom-theme-colors` — 通过将一个属性（`data-pantoken-color`）设置为 13 个调色板之一，或设置为 `custom` 以使用任意品牌十六进制值，来对页面进行品牌重塑。参见 [主题颜色](#theme-colors)。
- `@pantoken/plugin-custom-components` — 基于 token 的自定义控件，包括 SegmentedControl 和 SkeletonLoader。

### 分段控件

分段控件用于两个到五个相关视图或筛选器。每个选项是同一命名组中的带标签的原生单选；初始时标记其中一个为选中。如果选项无法舒适地放下，请使用选项卡或下拉菜单；对于动作而非选择，请使用按钮组。默认样式为 `-size-md`，在更紧凑或更醒目的场景下可使用 `-size-sm` 和 `-size-lg`。

导入 `@pantoken/plugin-custom-components/segmented-control.css` 以获取控件及其溢出按钮。当分段需要图形时，在分段标签上使用 `-icon-*` 类；该交互帮助器还会将其原生输入上的 `-icon-*` 类提升到标签绘制器上。为 fieldset 提供描述性的 `aria-label` 或可见的 legend。该帮助器保留原生单选的播报，添加键盘导航，并可选择在每次按箭头时揭示一个被裁剪的分段。使用逻辑的开始/结束控件并在两个方向上提供可访问的按钮标签：

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

导入 `@pantoken/interactions/segmented-control.iife.js` 以在 DOM 就绪时注册，或从 `@pantoken/interactions` 调用 `initSegmentedControl(fieldset, { size: "md", isOverflown: true })`，并在移除时调用 `cleanup()`。CSS 和原生单选选项在没有 JS 的情况下也能工作；溢出箭头需要该行为脚本。被选项使用语义阴影色的双层设计阴影；这是一个独立的活动项阴影，而不是现有的 `--instui-elevation-*` 复合。溢出按钮通过 `--pantoken-segmented-overflow-shadow` 使用上游 elevation3 组件令牌。

### 骨架加载

`skeleton-loader.css` 子路径为一个装饰性的 Text、Avatar 或 Image 形状提供样式。Text 接受通过 `-size-xxs` 到 `-size-xxl` 的配置；Avatar 和 Image 为中等大小。每个可选的 `.skeleton-row` 添加一行文本而不改变尺寸。CSS 闪光在三次 1.5 秒的扫动后停止，并在用户偏好减少动画时保持静止。它在 JavaScript 加载之前就能工作。

仅在将来会出现查询依赖内容的位置放置形状，不要覆盖服务器已知的导航、筛选、标题或控件。骨架不是进度计或操作忙碌状态。在后台刷新期间保持现有内容可见；对于操作使用旋转器或按钮忙碌状态。

父应用负责 loading、loaded、empty 和 error 的标记。每页提供一个空状态区域，并在服务器 HTML 中提供一个单独的空警告，这两者都应置于忙碌内容区域之外（**outside**）：

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

当请求状态变化时调用父级行为。它会更新 `aria-busy` 和两个预先存在的播报，但永远不会替换内容或移动焦点：

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

如果使用每组件交互包而不是直接导入，在带有 `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` 的 `[data-skeleton-region]` 元素上派发一个 `pantoken:skeleton-state` 事件。对于快速请求，将占位符的显示延迟 200–500ms；该行为会独立将加载播报延迟 400ms。在被动页面加载时，将焦点保持在原位。仅当用户的动作请求了它时，才将焦点移动到新加载的结果。状态节点播报结果和空状态；警告节点播报失败。不要在同一元素上组合 `aria-busy`、`role="status"` 和 `role="alert"`。

Lucide Lab 的注册表可以懒加载，然后传递给同步 token 钩子：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

一些以前作为插件发布的功能现在包含在 `@pantoken/components` 中，因为许多组件开箱即需：提升阴影（`--instui-elevation-*`，在 `components.css` 中）、焦点轮廓环（在 `base.css` 中——当 pantoken 管理页面时每个可聚焦元素都会获得它），以及 Instructure 品牌字体（Atkinson Hyperlegible Next：`base.css` 应用 `--instui-font-family-base`；可选的 `@pantoken/components/fonts.css` 会加载 `@font-face` woff2s）。

## 主题颜色

`@pantoken/plugin-custom-theme-colors` 为每个调色板发出一个 `[data-pantoken-color="…"]` 块（`navy`、`blue`、`green`、`red`、`orange`、`grey`、`plum`、`violet`、`stone`、`sky`、`honey`、`sea`、`aurora`）。每个块将品牌原语（`--instui-primitive-color-navy-*` 和 `-blue-*`）指向所选调色板。它还会通过 `color-mix()` 重新推导上游展平为字面十六进制的品牌表面，保留它们烘焙的 alpha。语义状态颜色、显式的蓝色强调和提升阴影保持不变。可在 [基于色板的主题演示](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) 中试用。

```html
<html data-pantoken-color="sea"></html>
```

### 自定义品牌颜色

将 `data-pantoken-color="custom"` 设置为任意十六进制值以进行品牌重塑，例如 Canvas 管理员在主题编辑器中输入的主颜色。pantoken 会从中推导出完整的 10–200 `--instui-primitive-color-custom-*` 比例：

1. **参考曲线。** 每一步的目标明度是 13 个调色板在该步骤的平均 OKLCH 明度，0 固定为白色，210 固定为黑色。因此自定义比例的间距与随附调色板的间距相匹配。
2. **锚点。** 输入落在其自身明度最近的步骤上，然后对齐到该确切明度。`#cccccc` 在 `#c9c9c9` 时变为 `custom-40`：接近输入，但不总是相同。“最近”指的是曲线上最近的步骤，而不是最接近的现有调色板颜色。
3. **填充。** 其他步骤保留输入的色相。其饱和度按照相对于锚点的调色板平均饱和度曲线变化，只有当颜色超出 sRGB 时才会降低。

仅接受 `#rgb` 和 `#rrggbb`；其他任何值都会抛出 `TypeError`，因此表单中的十六进制值无法注入 CSS。

在构建时，发出包含已声明派生原语的完整规则：

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

若要在运行时选择颜色而不随附整个 token 集，可在构建时预计算曲线和重映射规则。然后在浏览器中使用无依赖的 `/scale` 条目，仅设置 20 个派生原语：

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

文档站点的主题选择器、Canvas 主题编辑器和上面的演示都采用这种方式工作。

有关每个插件导出的详细信息，请参见 [API 参考](/api/).
