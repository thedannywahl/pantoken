# 组件

`@pantoken/components` 提供基于 Instructure 令牌构建的基于类的组件样式。导入样式表并标记你的标记 — 不需要框架。

```ts
import "@pantoken/components/components.css";
```

> [!注意]
> 更喜欢自定义元素？`@pantoken/web-components` 将这些相同样式封装为 `<instui-button>`、`<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` 等 — 参见 [package map](/api/)。

## 约定

本包中的 CSS 约定基于修改版的 [RSCSS](https://ricostacruz.com/rscss/index.html)。

修饰符为**键值**形式 — `-<prop>-<val>`，与 InstUI 属性名对齐 — 因此它们本身可读：`-color-secondary`、`-size-sm`、`-shape-circle`、`-icon-plus`。布尔属性仅为属性名，存在即表示 `true`（`-has-shadow`、`-clickable`）；默认启用的布尔属性被关闭时则取反（`-without-background`、`-without-border`）。尺寸接受短写和长写（`-size-sm` = `-size-small`）。当名称与 InstUI 不同步时，InstUI 语义类仍然可用但已弃用（例如 `-variant-info` → 使用 `-color-info`）。

### 示例

Instructure UI React 组件：

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken 组件：

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

对于 InstUI 的 `timeout` 属性，在毫秒单位中设置无单位的 `--timeout` 自定义属性并加载 Alert 交互。正值会安排自动关闭；`0`（默认）会使警报保留。为 InstUI 的淡出效果添加 `transition` 实用类的 `instui-transition -fade-entered`；若要立即移除则省略它们。该交互驱动 `-fade-exiting` 状态并在移除前触发可取消的冒泡式 `dismiss` 事件，因此应用可以调用 `preventDefault()` 保持警报挂载。

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

进度条通过 `--min`（默认 `0`）、`--value` 和 `--max`（默认 `100`）接受任意刻度，并提供已弃用的别名 `--value-now` 和 `--value-max`。添加 `-should-animate` 以在值更改时应用 InstUI 的半秒过渡。`.value` 与 `.bar` 并列作为根的子元素；添加 `-render-value-inside` 可改为将其渲染在轨道上方并与起点对齐（对米色配色进行可读性样式）。对于以零为起点的范围使用原生 `<progress>`，当最小值非零时使用 `<meter>`；web 组件会根据其 `min` 属性自动在两者间选择。InstUI 无不确定状态，因此缺少 `value` 属性的 `<progress>` 是 pantoken 的最佳猜测：`progress-bar` 将 `.bar` 动画为滑动段，`progress-circle` 以固定弧度旋转其环，两者都隐藏 `.value`。

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

进度圆通过 `--min`、`--value` 和 `--max` 接受相同的任意刻度。`--value-now` 和 `--value-max` 仍作为已弃用的功能别名保留。添加 `-should-animate` 并加载聚焦交互包以重现 InstUI 的挂载动画；`--animation-delay` 是以毫秒为单位的无单位延迟。已弃用的拼写 `-should-animate-on-mount` 和 `-shold-animate-on-mount` 仍作为功能别名存在。

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## 类前缀

每个类默认以 `instui-` 命名空间。通过向任一构建器传入 `prefix` 来构建带有你自己前缀 — 或无前缀 — 的样式表。任何假值（`null`、`undefined`、`""`，或省略它）都会完全去掉前缀，因此你可以编写 `class="heading -level-h1"` 而不是 `class="instui-heading -level-h1"`：

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

无论如何，带破折号前缀的修饰符（`.-color-secondary`、`.-level-h1`）都保持不变。包随附的样式表保留 `instui` 前缀。

## 基础

`base.css` 是可选的重置，使用令牌设置全局文档默认值：`box-sizing`、一个 `body` 重置、页面表面、基础文本颜色和字体、`color-scheme`（因此 `light-dark()` 令牌和原生控件会跟随主题），以及基础链接。当 pantoken 管理页面主题时，在组件和正文样式表之前只需加载一次。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

当你将组件嵌入已经由宿主主题化其 `html` 和 `body` 的环境时可跳过它 — 重置会绘制页面表面，因此不希望与宿主产生冲突。它设置的所有内容都使用低特异性 `:where()` 选择器，因此你的规则总是优先。

`base.css` _应用_ 品牌字体（`font-family: var(--instui-font-family-base)`，带系统回退）；要 _加载_ 它，请导入可选的 `fonts.css` — `@font-face` 为 Atkinson Hyperlegible Next 提供规则，指向包中提供的 woff2 文件。字体单独提供因为字形约 350 kB，自托管字体是有意的选择。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## 屏幕阅读器内容

<p>这句话后面有一条隐藏消息。<span class="instui-screen-reader-content">只有屏幕阅读器会朗读此内容。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` 在视觉上隐藏元素但保留在无障碍树中 — 用于应该被辅助技术读取但设计上不显示的标签和状态文本。

## 实用工具

`utilities.css` 是一层可选的跨切面类：一个 `View` 基元、基于令牌刻度的间距以及语义颜色覆盖。与组件的 `-modifier` 类不同，这些使用 **双破折号**（`--mod`），因此永不与组件自身的修饰符名发生冲突，并且它们适用于任何元素 — 无论是裸元素还是组合到组件上。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">带有 on-color 文本的 Accent-blue 表面。</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">使用 mx-auto 居中。</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` 是 InstUI 的 `View`。它是你叠加间距和颜色的基础，并携带自身视觉属性的键值修饰符，因此无需诉诸实用类：`-background-*`（其表面）、`-border-radius-{small,medium,large,circle,pill}`、`-border-width-{small,medium,large}` + `-border-color-*`、`-shadow-{resting,above,topmost}`、`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*` 和 `-cursor-*` — 这些是 `view` 自身的单破折号修饰符，与下面的双破折号实用类无关。自由值属性（宽度/高度/内边距）保留为内联样式；`margin`/`padding` 使用间距实用类。

**间距** — 基于间距刻度的每侧类。可读为 `{m|p}{side}-{step}`：用于外边距的 `m` 或用于内边距的 `p`（或完整单词 `margin`/`padding`），可选的逻辑侧，然后是步级。因此 `.--m-lg` 与 `.--margin-lg` 相同，且 `.--pt-md` 与 `.--paddingt-md` 相同。

- 侧：无（全部）、`t`/`b`（块起/块止）、`s`/`e`（内联起/内联止）、`x`/`y`（内联/块轴）。逻辑侧在从右到左的布局中保持正确。
- 步级：`0`、`2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`，另加仅用于外边距的 `auto`。

将它们组合成 InstUI 的 `margin="small auto large"` 速记：
`class="--mt-sm --mx-auto --mb-lg"`。

**颜色** — 始终保持在调色板内的语义覆盖：`.--bg-<name>`（背景）、`.--text-<name>`（文本颜色）和 `.--border-<name>`（边框颜色）。每个 `<name>` 都是一个语义颜色令牌 — 意图（`base`、`brand`、`muted`、`success`、`warning`、`error`、`info`、`inverse`、`on-color`、`strong`、…）加上 `accent-*` 调色板（`accent-blue`、`accent-green` 等）。只有在该系列存在该令牌时才有名称，因此 `text-brand` 并不是类 — 文本没有品牌令牌。无法访问原始属性或任意十六进制颜色，每个覆盖都遵循主题。

**令牌系列** — 每个 “一令牌、一属性” 系列为每个令牌提供一个类，按令牌命名。自由组合它们：

- `.--font-family-heading`、`.--font-family-code`、… → `font-family`
- `.--font-weight-body-strong`、`.--font-weight-interactive`、… → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`、`.--border-radius-full`、… → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`、`.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（和 `-depth1`…`-card`）→ `box-shadow`

每个类只设置其单一属性，因此 `border-width`/`border-radius` 需要一个 `border-*` 颜色和边框样式才能真正绘制边框。这些使用完整令牌名（`.--border-radius-md`），而上述颜色和间距辅助类使用短别名（`.--bg-brand`、`.--mt-lg`）— 别名是人体工程学的快捷方式；令牌类是字面且详尽的。

**布局** — `.--display-<value>`（`block`、`inline-block`、`inline`、`flex`、`inline-flex`、`none`）和 `.--text-align-<value>`（`start`、`center`、`end`、`justify`）涵盖 InstUI 的跨切面 `display` 和 `textAlign` 属性（View、Button、Metric、Tabs 等），以可组合的类呈现 — 因此这些并不是每个组件的修饰符。

每个双破折号类在级联中总是确定性地胜过同名的单破折号组件修饰符，无论样式表的导入顺序如何 — 有关机制，请参见 [Authoring conventions](/conventions/authoring)。

此处一切均为由 `--instui-*` 令牌驱动的纯 CSS，因此它通过令牌层跟随 InstUI。有关 `componentsCss` 和每个组件构建器的详细信息，请参见 [API reference](/api/)。

## 覆盖层：对话框和弹出

覆盖组件使用原生平台原语，因此在很少或无需 JavaScript 的情况下即可实现可访问的行为。

**模态** — 在原生 `<dialog>` 上放置 `.instui-modal`。它获得焦点困住、以 `Esc` 关闭以及一个 `::backdrop`；背景遮罩使用与 `.instui-mask` 相同的 `--instui-component-mask-background-color` 令牌来变暗（添加 `-blur` 可使其起霜效果）。使用调用器命令打开和关闭 — 无需脚本：

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**上下文视图 / 弹出** — 在 `[popover]` 元素上放置 `.instui-context-view` 并用 `popovertarget` 切换。它停留在顶层并在外部点击或 `Esc` 时轻触发关闭，同样无需脚本：

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**抽屉布局** — 在布局根上放置 `.instui-drawer-layout`，并包含 `.tray` 和 `.content` 子项。添加 `open` 属性（或 `-open`）以显示抽屉，并使用 `placement="end"`（或 `-placement-end`）将其停靠到内联结束侧 — 放置通过逻辑 `inset-inline-*`/`flex-direction` 属性解析，因此在 `dir="rtl"` 下会自动翻转，无需额外规则。聚焦交互包添加了调用器命令路由并在宽度跨越 `--drawer-layout-min-width`（默认 `--instui-breakpoints-sm`，然后是 `30rem`）时切换覆盖模式（`should-overlay-tray`）：

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**遮罩** — `.instui-mask` 用于内联流中的覆盖（例如卡片上的加载指示器）；模态的 `::backdrop` 则覆盖模态场景。

两种模式也封装为 `@pantoken/web-components` 中的行为性自定义元素：`<instui-modal open>`（由其 `open` 属性驱动的 `<dialog>`）和 `<instui-context-view>`（原生弹出）。

浏览器支持：popover API 和 `popovertarget` 为 Baseline 2024；调用器命令（`command`/`commandfor`）为 Baseline 2025，因此在旧浏览器上将按钮连接到 `dialog.showModal()` 作为一行回退。将弹出定位到触发器旁在支持的地方使用 CSS 锚点定位（Chromium）；在其他地方它在顶层居中。

## 表单

**FormField** — `.instui-form-field` 是一个 CSS Grid 包装器，用于布局标签、控件和任何消息。将其放在 `<label>` 上以便标签原生关联控件。它有三个网格区域 — `label`、`controls`、`messages`：

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked`（默认）将这些区域堆叠；`-layout-inline` 将标签置于控件旁边（可用 `-label-align-{start,end}` 和 `-v-align-{top,middle,bottom}` 调整）。`-readonly` 会重新着色标签。

**必填星号** 在字段被设置为必填时显示，条件为 _要么_ 存在 `-required` 类 _要么_ 字段内存在原生 `required` 控件 — 因此你可以仅在输入上设置 `required`，标记也会显示。它是装饰性的（在标签上的 `::after`，不在可访问性树中）；除非表单本身一目了然，否则配合诸如 “标有 * 的字段为必填” 之类的说明一起使用。

**FormFieldGroup** — `.instui-form-field-group` 将相关字段分组在一个 `<fieldset>` 中，并带有 `<legend>` 描述。这纯粹是布局（无专用令牌）：默认堆叠字段；`-layout-columns`/`-layout-inline` 将它们流为响应式列，可用 `-row-spacing-*`/`-col-spacing-*` 和 `-v-align-*` 调整网格。

**RadioInputGroup** — `.instui-radio-input-group` 与 `<fieldset>`/`<legend>` 分组相同，针对单选项做了专用优化。因为子单选共享 `name`，选择在原生层面上为单选 — 因此一组切换按钮表现为单一控件，而不是松散的按钮。`-variant-simple`（默认）布局标准单选（`-layout-columns`/`-inline` 将它们流为一行）；`-variant-toggle` 将子 `.instui-radio.-variant-toggle` 按钮连接成单个分段控件（折叠边框、圆角外端）：

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**消息** — `.instui-form-field-messages` 是容器；每个 `.instui-form-field-message` 拥有一个 `-type-*`：`-type-hint`（灰色，默认）、`-type-error`（红色文本 + 圆形警示图标）、`-type-success`（绿色文本 + 圆形勾选图标）和 `-type-screenreader-only`（视觉上裁剪但仍会被朗读）。图标使用 `currentColor` 着色，因此始终与消息颜色匹配。`-type-new-error` 是 `-type-error` 的已弃用别名。使用 `aria-describedby` 将容器与控件关联，并在控件出错时设置 `aria-invalid`。

在 FormField 内，`-type-error` 消息遵循客户端验证：在字段控件 `:user-invalid`（原生，在用户交互后）之前保持隐藏 — 或者你可以在 `.instui-form-field` 上使用 `-invalid` 强制显示（用于服务器端错误）。独立的 `.instui-form-field-messages`（不在字段中）不受影响。控件的焦点环也随之变化：当 `:user-invalid`/`-invalid` 时为危险状态，`-success` 时为成功状态。

**文本控件** — `.instui-text-input`（原生 `<input>`）、`.instui-text-area`（原生 `<textarea>`，可调整大小）和 `.instui-simple-select`（原生 `<select>`，带插入符）共享外观和相同状态：`-invalid`（错误边框）、`-success`（成功边框）、`-readonly`、原生 `:disabled` 和 `-size-{sm,md,lg}`。要添加前置/后置图标（InstUI 的 `renderBeforeInput`/`renderAfterInput`），将输入包在 `.instui-input-group` 中并添加 `.before`/`.after` 插槽（一个 `-icon-*` 图标）；`-should-not-wrap` 可保持单行。`.instui-number-input` 是该外观加上一个 `.arrows` +/- 微调列（原生 `type="number"`；将按钮连接到 `stepUp()`/`stepDown()`）。`.instui-range-input` 是一个样式化的 `input[type="range"]`，其值呈现在 `.instui-range-input-value` 反色气泡中。需要带列表框弹出且丰富的组合框，请使用 `@instructure/ui` — 本库覆盖这些原生控件。

**样式化下拉（实验性）** — 可选的 `select.css` 会升级相同的 `.instui-simple-select` 元素：它使用 CSS 可定制选择模型样式化打开的下拉（面板和每个选项，含悬停和选中状态）。

> [!警告]
> `select.css` 依赖于 `appearance: base-select` / `::picker(select)`，这是 **实验性的**（Chrome 135+，尚未成为 Baseline）。它作为单独的可选样式表随包提供，并且每条规则都被 `@supports (appearance: base-select)` 保护，因此在不支持的浏览器中不会生效 — `.instui-simple-select` 控件将保持原生 select 的外观。仅在你接受有限支持并想使用增强下拉时加载它。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
