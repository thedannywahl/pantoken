# 入门

pantoken 获取 Instructure UI 的设计代币和图标，解析一次该模型，并将该单一模型重新塑造成多个平台的包：纯样式表、SCSS 和 Less、React、Vue 与 Svelte、Tailwind 与 Panda、原生 Swift 与 Kotlin、WordPress 与 Drupal、Figma 等等。

安装一个最小的、适合当前任务的包。所有内容也都由统一的 `pantoken` 包重新导出，所以可以从那里开始，之后再逐步收窄选择。

## 搭建入门项目脚手架

尝试 pantoken 的最快方法：搭建一个已安装并已连接好的入门项目脚手架。

```sh
npx create-pantoken-app react
```

平台：`components`（纯 HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。有关 `--dir <path>` 与编程使用，请参见 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)。

使用 AI 编码代理？无需安装——直接指向该 skill：

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

对于 Gemini CLI、Cursor CLI、OpenAI Codex CLI、GitHub Copilot CLI 和 Amazon Q Developer CLI 的用法相同 —— 将 `claude` 替换为 `gemini`、`agent`、`codex`、`copilot -p` 或 `q chat`。如果希望将 pantoken 的代理规则永久接入仓库（AGENTS.md、编辑器规则、本地副本的该 skill），请改用 `npx @pantoken/ai init`。

## 代币模型

代币是命名为 `--instui-<group>-<name>` 的 CSS 自定义属性，例如 `--instui-color-background-brand` 或 `--instui-spacing-space-md`。提供三种主题：`rebrand`（默认，使用 `light-dark()` 来表示浅色与深色的差异）、`canvas` 和 `canvasHighContrast`。图标是 `<image>` 代币（`--instui-icon-<name>`），由 Lucide 加上 Instructure 的自定义字形派生而来。

## 为 web 应用设置样式

安装样式表并只需导入一次。它定义了每一个 `--instui-*` 属性，因此可以直接在自己的 CSS 中引用它们。

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## 在任意位置使用图标

该 web 组件在任何框架中均可工作，无需移植。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS 代币

图标为 CSS 自定义属性（`--instui-icon-<name>`）。加载样式表一次，并将任意图标作为 `mask-image` 或 `background-image` 引用——无需为每个图标单独导入。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 单个图标与全部图标集

`@pantoken/icons` 导出两个命名导出。使用 `iconsByName` 在不遍历整个数组的情况下提取单个图标：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

当需要整个图标集（例如构建选择器）时使用 ```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
``` 的 `icons`：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

这两个导出都会在模块初始化时加载完整的 IR——在此层面没有按图标的树摇优化。对于精简的仅 CSS 加载，使用 [CDN picker](/guide/cdn-picker) 为所需图标生成合并 URL。

## 为原生平台生成

CLI 会将代币源写入目标仓库。运行器之外无需其他安装：

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

有关所有目标，请参见 [the pantoken CLI](/guide/cli)。

## VS Code 编写提示

`@pantoken/pantoken` 现在随包提供 VS Code 的 custom-data 文件，这样下游项目无需安装 pantoken 专用扩展即可在 HTML/CSS 中获得类和代币补全。

1. 安装统一包：

```sh
npm i @pantoken/pantoken
```

1. 在使用者工作区中将 VS Code 指向随包提供的 custom-data JSON：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 重新加载 VS Code（或运行 “Developer: Reload Window”）以应用新数据。

这将启用对 `instui-*` 类代币（和 `-modifier` 类代币）以及 `--instui-*` 自定义属性的建议。

## 接下来去哪儿

- [包映射](/guide/packages) — 按任务选择要使用的包。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 在消费仓库中安装代理资产和规则。
- [架构](/guide/architecture) — 代币模型、核心与输出如何协作。
- [API 参考](/api/) — 每个导出符号，均由源码生成。
