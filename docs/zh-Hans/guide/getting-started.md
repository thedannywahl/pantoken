# 入门

Pantoken 获取 [Instructure UI](https://instructure.design) 的设计令牌和图标，解析一次该模型，并将该单一模型重塑为适用于多种平台的包：纯样式表、SCSS 与 Less、React、Vue 与 Svelte、Tailwind 与 Panda、原生 Swift 与 Kotlin、WordPress 与 Drupal、Figma 等等。

安装最适合任务的最小包。所有内容也由统一的 `pantoken` 包重新导出，因此可以从那里开始，后续再逐步缩小范围。

## 搭建入门项目

尝试 pantoken 的最快方式：搭建一个已安装并已接入 pantoken 的入门项目脚手架。

```sh
npx create-pantoken-app
```

平台：`components`（纯 HTML/CSS）、`react`、`vue`、`svelte`、`web-components`、`angular`。有关 `--dir <path>` 和编程式使用，请参阅 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)。

使用 AI 代码代理？无需安装——直接将其指向该 skill：

```prompt
获取 create.pantoken.app/SKILL.md 并按照其中说明在此项目中设置 pantoken。
```

如果想将 pantoken 的代理规则永久接入仓库（AGENTS.md、编辑器规则、本地副本的该 skill），改为运行 `npx @pantoken/ai init`。

## 令牌模型

令牌是名为 `--instui-<group>-<name>` 的 CSS 自定义属性，例如 `--instui-color-background-brand` 或 `--instui-spacing-space-md`。内置三套主题：`rebrand`（默认，使用 `light-dark()` 在浅色与深色间区分）、`canvas` 和 `canvasHighContrast`。图标是来自 Lucide 加上 Instructure 自定义字形派生的 `<image>` 令牌（`--instui-icon-<name>`）。

## 为 Web 应用设样式

安装样式表并仅导入一次。它定义了每个 `--instui-*` 属性，因此可以直接在自己的 CSS 中引用它们。

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

Web 组件可在任何框架中使用，无需移植。

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS 令牌

图标是 CSS 自定义属性（`--instui-icon-<name>`）。加载样式表一次，并将任何图标作为 `mask-image` 或 `background-image` 引用——无需逐图标导入。

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 单个图标 vs 整套图标

`@pantoken/icons` 导出两个具名导出。使用 `iconsByName` 来获取单个图标，而无需遍历完整数组：

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

当需要整套图标时（例如构建选择器），使用 `icons`：

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

这两个导出在模块初始化时都会加载完整的 IR——在此层级没有按图标的 tree-shaking。对于精简的仅 CSS 加载，请使用 [CDN picker](/guide/cdn-picker) 生成仅包含所需图标的合并 URL。

## 为原生平台生成

CLI 会将令牌源写入目标仓库。运行器以外无需安装：

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

有关所有目标，请参见 [pantoken CLI](/guide/cli)。

## VS Code 编辑提示

`@pantoken/pantoken` 现在随附 VS Code 自定义数据文件，下游项目可在不安装 pantoken 专用扩展的情况下在 HTML/CSS 中获得类与令牌补全。

1. 安装统一包：

```sh
npm i @pantoken/pantoken
```

1. 在你的消费端工作区中将 VS Code 指向随包提供的 custom-data JSON：

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 重新加载 VS Code（或运行 “Developer: Reload Window”）以应用新数据。

这将启用对 `instui-*` 类令牌（以及 `-modifier` 类令牌）以及 `--instui-*` 自定义属性的建议。

## 下一步去向

- [包映射](/guide/packages) — 按任务查找应使用的包。
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 在消费仓库中安装代理资产和规则。
- [架构](/guide/architecture) — 令牌模型、核心与输出如何协作。
- [API 参考](/api/) — 每个导出符号，均由源代码生成。
