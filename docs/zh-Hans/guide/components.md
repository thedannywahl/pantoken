# 组件

`@pantoken/components` 提供基于 Instructure 令牌构建的类式组件样式。导入样式表并在标记中添加相应类 — 无需框架。

```ts
import "@pantoken/components/components.css";
```

> [!注意]
> 偏好自定义元素？`@pantoken/web-components` 将相同样式封装为 `<instui-button>`、
> `<instui-alert>`、`<instui-badge>`、`<instui-avatar>`、`<instui-progress>` 等 — 参见
> [包映射](/guide/packages)。

## 约定

本包的 CSS 约定基于经修改的 [RSCSS](https://ricostacruz.com/rscss/index.html)。

修饰符为 **键-值** 形式 — `-<prop>-<val>`，与 InstUI 属性名对齐 — 因此自解释：`-color-secondary`、`-size-sm`、`-shape-circle`、`-icon-plus`。布尔属性仅为属性名本身，存在表示 `true`（`-has-shadow`、`-clickable`）；默认开启的布尔属性被关闭时则取反（`-without-background`、`-without-border`）。尺寸接受短写和长写两种拼写（`-size-sm` = `-size-small`）。当名称偏离 InstUI 时，InstUI 语义类仍然可用但已弃用（例如 `-variant-info` → 使用 `-color-info`）。

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

对于 InstUI 的 `timeout` 属性，在毫秒单位内设置无单位的 `--timeout` 自定义属性并加载 Alert 交互。正值会安排自动关闭；`0`（默认）则保持警示不移除。为 InstUI 的淡入淡出效果添加 `transition` 实用工具的 `instui-transition -fade-entered` 类；若希望立即移除则省略它们。交互驱动 `-fade-exiting` 状态并在移除前触发可取消、冒泡的 `dismiss` 事件，因此应用可调用 `preventDefault()` 以保持警示挂载。

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

进度条通过 `--min`（默认 `0`）、`--value` 和 `--max`（默认 `100`）接受任意比例，带有弃用的别名 `--value-now` 和 `--value-max`。添加 `-should-animate` 以在值变更时应用 InstUI 的半秒过渡。`.value` 与 `.bar` 并列作为根的子元素；添加 `-render-value-inside` 可将其渲染在轨道之上并对齐到起始位置（需为其相对于计量颜色调整可读性样式）。使用原生 `<progress>` 表示以零为基准的范围；当最小值非零时使用 `<meter>`；web 组件会根据其 `min` 属性自动在两者间选择。InstUI 无不定态（indeterminate），因此当 `<progress>` 缺少其 `value` 属性时，pantoken 会给出最佳猜测：`progress-bar` 将 `.bar` 动画化为滑动片段，`progress-circle` 以固定弧度旋转其环，两者都会隐藏 `.value`。

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

进度圆环通过 `--min`、`--value` 和 `--max` 接受相同的任意比例。`--value-now` 和 `--value-max` 保持为弃用的功能别名。添加 `-should-animate` 并加载聚焦交互包以重现 InstUI 的挂载动画；`--animation-delay` 是以毫秒为单位的无单位延迟。弃用的拼写 `-should-animate-on-mount` 和 `-shold-animate-on-mount` 仍作为功能别名可用。

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

每个类默认使用命名空间 `instui-`。可通过将 `prefix` 传给任意构建器来构建使用自定义前缀（或无前缀）的样式表。任何假值（`null`、`undefined`、`""`，或省略）将完全去掉前缀，因此可以写 `class="heading -level-h1"` 而不是 `class="instui-heading -level-h1"`：

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

破折号前缀的修饰符（`.-color-secondary`、`.-level-h1`）无论如何都保持不变。包随附的样式表保留 `instui` 前缀。

## 基础

`base.css` 是一个可选的重置表，它从令牌设置全局文档默认值：`box-sizing`、一个 `body` 重置、页面表面、基础文本颜色和字体、`color-scheme`（以便 `light-dark()` 令牌和原生控件跟随主题）以及基础链接。在 pantoken 管理页面时，在组件和段落样式表之前加载一次。

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

当将组件嵌入已由宿主自行主题化的环境中时可跳过该重置 — 重置会绘制页面表面，可能与宿主发生冲突。它所设定的一切都使用低特异性 `:where()` 选择器，因此自定义规则始终优先。

`base.css` 会 _应用_ 品牌字体（`font-family: var(--instui-font-family-base)`，带系统回退）；若要 _加载_ 字体，请导入可选的 `fonts.css` — `@font-face` 为 Atkinson Hyperlegible Next 提供规则，指向包中随附的 woff2 文件。字体单独提供因为字形约 ~350 kB，并且自托管字体是一个刻意的选择。

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## 屏幕阅读器内容

<p>此句后面有一条隐藏信息。<span class="instui-screen-reader-content">仅屏幕阅读器会朗读此内容。</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` 在视觉上隐藏元素同时将其保留在可访问性树中 — 适用于应由辅助技术读取但设计上不应显示的标签和状态文本。

## 实用工具

`utilities.css` 是一层可选的跨切面类：一个 `View` 原语、基于令牌尺度的间距和语义颜色覆盖。与组件的 `-modifier` 类不同，这些使用 **双短横**（`--mod`）以避免与组件自身的修饰符名称冲突，并且它们可应用于任何元素 — 直接使用或组合到组件上。

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue 表面，带 on-color 文本。</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">使用 mx-auto 居中。</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` 是 InstUI 的 `View`。它是附加间距和颜色的基础，并携带自身视觉属性的键值修饰符，因此无需借助工具类：
`-background-*`（其表面），`-border-radius-{small,medium,large,circle,pill}`，
`-border-width-{small,medium,large}` + `-border-color-*`，`-shadow-{resting,above,topmost}`，
`-display-*`、`-position-*`、`-overflow-x-*`/`-overflow-y-*`，以及 `-cursor-*` — 这些是 `view` 自身的单短横修饰符，与下面的双短横实用工具无关。自由值属性（宽/高/嵌入）保留为内联样式；`margin`/`padding` 使用间距实用工具。

**间距** — 基于间距尺度的单侧类。按 `{m|p}{side}-{step}` 阅读：`m` 表示外边距或 `p` 表示内边距（或完整单词 `margin`/`padding`），可选逻辑侧，然后是步进。因此 `.--m-lg` 与 `.--margin-lg` 等价，`.--pt-md` 与 `.--paddingt-md` 也等价。

- 侧向：none（全部）、`t`/`b`（块起始/结束）、`s`/`e`（内联起始/结束）、`x`/`y`（内联/块轴）。逻辑侧在从右到左布局中保持正确。
- 步进：`0`、`2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`，以及仅用于外边距的 `auto`。

将它们组合为 InstUI 的 `margin="small auto large"` 速记：
`class="--mt-sm --mx-auto --mb-lg"`。

**颜色** — 保持调色板内的语义覆盖：`.--bg-<name>`（背景）、`.--text-<name>`（文本颜色）和 `.--border-<name>`（边框颜色）。每个 `<name>` 都是一个语义颜色令牌 — 意图（`base`、`brand`、`muted`、`success`、`warning`、`error`、`info`、
`inverse`、`on-color`、`strong`、…）加上 `accent-*` 调色板（`accent-blue`、`accent-green` 等）。当某个族中不存在对应令牌时该名称就不会出现，因此 `text-brand` 并非类 — 文本没有品牌令牌。无法直接使用原始值或任意十六进制颜色，且每个覆盖都遵循主题。

**令牌族** — 每个“一个令牌，对应一个属性”的族为每个令牌提供一个类，按令牌命名。可自由组合：

- `.--font-family-heading`、`.--font-family-code`、… → `font-family`
- `.--font-weight-body-strong`、`.--font-weight-interactive`、… → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`、`.--border-radius-full`、… → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`、`.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost`（以及 `-depth1`…`-card`）→ `box-shadow`

每个类仅设置其单一属性，因此 `border-width`/`border-radius` 仍需一个 `border-*` 颜色和边框样式以实际绘制边框。这些使用完整令牌名（`.--border-radius-md`），而上面的颜色与间距辅助类使用短别名（`.--bg-brand`、`.--mt-lg`） — 别名更符合人体工程学；令牌类则是字面且详尽的。

**布局** — `.--display-<value>`（`block`、`inline-block`、`inline`、`flex`、`inline-flex`、
`none`）和 `.--text-align-<value>`（`start`、`center`、`end`、`justify`）覆盖 InstUI 的跨组件 `display` 与 `textAlign` 属性（View、Button、Metric、Tabs 等），作为可组合类 — 因此这些并非每个组件的专属修饰符。

每个双短横类在层叠中确定性地胜过同名的单短横组件修饰符，无论样式表导入顺序如何 — 机制见 [创作约定](/conventions/authoring)。

这里的一切均为由 `--instui-*` 令牌驱动的纯 CSS，因此通过令牌层跟踪 InstUI。有关 `componentsCss` 和各组件构建器的 API 参考，请参见 [API 参考](/api/)。

## 覆盖层：对话框与弹出

覆盖组件依赖原生平台原语，所以在很少或无需 JavaScript 的情况下即可表现为可访问行为。

**模态** — 在原生 `<dialog>` 上添加 `.instui-modal`。它获得焦点陷阱、`Esc` 以关闭以及一个 `::backdrop`；遮罩使用与 `.instui-mask` 相同的 `--instui-component-mask-background-color` 令牌进行变暗（添加 `-blur` 可让其呈半透明效果）。使用调度器命令打开和关闭 — 无需脚本：

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

**上下文视图 / 弹出** — 在 `[popover]` 元素上添加 `.instui-context-view` 并用 `popovertarget` 切换。它位于顶层并在外部点击或 `Esc` 时轻量消隐，同样无需脚本：

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**抽屉布局** — 在带有 `.tray` 和 `.content` 子元素的布局根上放置 `.instui-drawer-layout`。添加 `open` 属性（或 `-open`）以显示抽屉，并使用 `placement="end"`（或 `-placement-end`）将其停靠到内联结束侧 — 放置通过逻辑 `inset-inline-*`/`flex-direction` 属性解析，因此在 `dir="rtl"` 下会自动翻转，无需额外规则。聚焦交互包增加了 Invoker 命令路由并在宽度超过 `--drawer-layout-min-width`（默认 `--instui-breakpoints-sm`，然后 `30rem`）时切换覆盖模式（`should-overlay-tray`）：

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**遮罩** — `.instui-mask` 适用于流内覆盖（例如卡片上的加载器）；模态的 `::backdrop` 适用于模态情形。

这两种模式也在 `@pantoken/web-components` 中封装为行为性自定义元素：`<instui-modal open>`（由其 `open` 属性驱动的 `<dialog>`）和 `<instui-context-view>`（一个原生弹出）。

浏览器支持：popover API 与 `popovertarget` 属于 Baseline 2024；invoker 命令（`command`/`commandfor`）属于 Baseline 2025，因此在旧版浏览器上请将按钮接到 `dialog.showModal()` 作为一行回退。将弹出定位在触发器旁边时，在支持的地方使用 CSS 锚定位（Chromium）；不支持时则在顶层居中。

## 表单

**FormField** — `.instui-form-field` 是一个 CSS Grid 包装器，用于布局标签、控件及任何消息。将其放在 `<label>` 上以便标签能与控件原生关联。它有三个网格区域 — `label`、`controls`、`messages`：

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

默认的 `-layout-stacked` 将这些区域垂直堆叠；`-layout-inline` 则将标签置于控件旁（可用 `-label-align-{start,end}` 与 `-v-align-{top,middle,bottom}` 调整）。`-readonly` 用于变更标签颜色。

**必填星号** 在字段由 `-required` 类 或字段内的原生 `required` 控件所标记为必填时显示 — 因此只需在输入上设置 `required` 即可显示标记。该标记为装饰性（标签上的 `::after`，位于可访问性树之外）；除非表单足够显而易见，否则应配合注释如“带 * 的字段为必填”。

**FormFieldGroup** — `.instui-form-field-group` 在 `<fieldset>` 中将相关字段分组，并带有 `<legend>` 描述。它纯粹用于布局（无专用令牌）：默认堆叠字段；`-layout-columns` / `-layout-inline` 将字段流为响应式列，并可使用 `-row-spacing-*` / `-col-spacing-*` 与 `-v-align-*` 调整网格。

**RadioInputGroup** — `.instui-radio-input-group` 与 `<fieldset>`/`<legend>` 分组相同，专为单选按钮优化。由于子单选共享 `name`，选择在原生层面为单选 — 因此一组切换按钮行为类似单一控件，而非松散按钮。默认的 `-variant-simple` 布局为标准单选（`-layout-columns`/`-inline` 将其流为一行）；`-variant-toggle` 将子 `.instui-radio.-variant-toggle` 按钮连接成单个分段控件（折叠边框，圆角外端）：

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

**消息** — `.instui-form-field-messages` 是容器；每个 `.instui-form-field-message` 采用一种 `-type-*`：`-type-hint`（灰色，默认）、`-type-error`（红色文本 + 圆形警告图标）、`-type-success`（绿色文本 + 圆形勾选图标）和 `-type-screenreader-only`（视觉上裁剪但仍会被朗读）。图标使用 `currentColor` 上色，因此始终与消息颜色匹配。`-type-new-error` 是 `-type-error` 的弃用别名。用 `aria-describedby` 将容器与控件连接，并在存在错误时在控件上设置 `aria-invalid`。

在 FormField 内，`-type-error` 消息遵循客户端验证：在字段控件为 `:user-invalid`（原生，在用户交互后）之前保持隐藏 — 或者通过在 `.instui-form-field` 上强制设置 `-invalid` 来显示（用于服务器端错误）。独立的 `.instui-form-field-messages`（不在字段内）不受影响。控件的焦点环亦随之变化：当 `:user-invalid`/`-invalid` 时为危险态，`-success` 时为成功态。

**文本控件** — `.instui-text-input`（原生 `<input>`）、`.instui-text-area`（原生 `<textarea>`，可调整大小）和 `.instui-simple-select`（原生 `<select>`，带插入点）共享相同外观与状态：`-invalid`（错误边框）、`-success`（成功边框）、`-readonly`、原生 `:disabled`，以及 `-size-{sm,md,lg}`。若需前置/后置图标（InstUI 的 `renderBeforeInput`/`renderAfterInput`），将输入包裹在 `.instui-input-group` 中并添加 `.before`/`.after` 插槽（一个 `-icon-*` 图标）；`-should-not-wrap` 可保持单行。`.instui-number-input` 是该外观外加一个 `.arrows` 的 +/- 计数器列（原生 `type="number"`；将按钮接到 `stepUp()`/`stepDown()`）。`.instui-range-input` 是一个样式化的 `input[type="range"]`，其值在 `.instui-range-input-value` 反色气泡中呈现。若需带列表弹出的富文本组合框，请使用 `@instructure/ui` — 本库覆盖原生控件。

**样式化选择下拉（实验性）** — 一个可选的 `select.css` 可升级相同的 `.instui-simple-select` 元素：它使用 CSS 可定制选择（Customizable Select）模型为打开的下拉（面板与每个选项，带悬停与选中状态）添加样式。

> [!警告]
> `select.css` 依赖于 `appearance: base-select` / `::picker(select)`，这是 **实验性** 的
> （Chrome 135+，尚未成为 Baseline）。它作为单独的可选样式表发布，并且每条规则都受 `@supports (appearance: base-select)` 保护，因此在不支持的浏览器中不会生效 — `.instui-simple-select` 控件仍保持原生选择的外观。仅在你接受有限支持并希望增强下拉时加载它。

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
