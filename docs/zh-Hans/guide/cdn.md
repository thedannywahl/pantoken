# CDN 与分发

pantoken 将每个包发布到 npm，因此可以直接从 CDN 获取令牌、组件和 Web 组件——无需构建步骤，也无需打包器。本页涵盖 CSS 合并 URL（带交互式构建器）以及 Web 组件的即插即用说明。

## 令牌基础

每个 pantoken 组件都会从页面上的令牌表读取 `--instui-*` 自定义属性。提供两种变体：

- `@pantoken/css/dist/style.lean.css` — 推荐的 CDN 基础。它包含除完整图标集以外的所有令牌，压缩后大约 23 KB。
- `@pantoken/css/dist/style.css` — 完整表，包含所有约 1,777 个图标字形令牌（`--instui-icon-*`）。压缩后约 140 KB。如果通过 `var(--instui-icon-*)` 广泛引用图标，请加载此表。

高程刻度（elevation scale）和焦点环（focus-ring）变量在两个表中都有，所以只加载基础表即可使阴影和焦点环正常工作。

## 选择组件与图标

[交互式 CDN 选择器](/guide/cdn-picker) 为 CSS 构建 jsDelivr 合并 URL 并生成 JavaScript 包片段。打开它，勾选所需项，然后复制生成的输出。

- **Components 选项卡** — 选择单个组件样式表或整个 `components.css` 档案。若需要，可添加基础重置或间距/颜色工具类。
- **JS 选项卡** — 复制用于 `@pantoken/interactions` 的 ESM 导入片段。
- **Icons 选项卡** — 从 InstUI 集（约 1,800 个图标）或 Simple Icons（约 3,300 个品牌字形）中选择单个图标。选择器会为图标 CSS 文件输出单独的合并 URL，以便仅加载实际使用的图标。
- **Web Components 选项卡** — 构建 `@pantoken/web-components` 片段（ESM 选择性注册或经典脚本引导）。

每个组件文件都很小——大多数约 2 KB。渲染图标的组件（`alert`、`checkbox` 以及其他几个）需要这些字形，因此当选择精简表时，构建器会添加 `@pantoken/components/dist/component-icons.css`（压缩后约 0.5 KB——该组件集使用的 11 个图标），完整表则已包含它们。

### 加载顺序与字体

先加载令牌基础，然后是可选的基础重置，再加载组件文件，最后加载工具类——它们是覆盖性工具，只有在层叠中位于组件规则之后时才会实际覆盖组件自身的规则。上面的合并 URL 已为你按顺序排列。字体是唯一的例外：`@pantoken/components/dist/fonts.css` 通过相对路径指向字体文件，因此合并无法重写它们——将其作为单独的 `<link>` 加载：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### 一次性全部加载

在选择器中勾选 **All components** 可将其切换为档案，或直接指向该档案（压缩后约 141 KB），与令牌表一起使用：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web 组件

`@pantoken/web-components` 注册与框架无关的 `<instui-*>` 自定义元素。它们内联自己的 CSS，但仍从页面上的表读取令牌，因此也要加载一个令牌基础表。

### ES 模块（推荐）

ESM CDN 会为你解析包的依赖关系。下面的示例会注册所有元素：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

使用完整令牌表（或精简表加上 `component-icons.css`），这样像 `<instui-alert>` 之类的图标渲染元素才能解析它们的字形。

若只注册部分元素及其嵌套依赖，导入 `register` 并传入 `only`：

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### 经典 script 标签

对于无需模块的即插即用，加载 IIFE 构建。它捆绑其依赖并在加载时自动注册所有元素，暴露一个 `PantokenWebComponents` 全局变量：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

它比 ESM 路径大一些——内联了 `@pantoken/components` 和 `@pantoken/icons` ——因此仅在无法使用模块时使用。

## 固定版本

上面的 URL（以及选择器写出的那些）跟踪最新发布版本。生产环境中请为主要版本（或精确版本）加固版本号——例如 `@pantoken/css@0` ——以免升级带来意外变更。
