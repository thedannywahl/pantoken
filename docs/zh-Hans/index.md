---
layout: home
hero:
  name: Pantoken
  text: InstUI，无处不在
  tagline: 一个解析后的令牌模型，重塑为样式表、框架绑定、本地代码和设计工具的载荷。
  actions:
    - theme: brand
      text: 快速入门
      link: /zh-Hans/guide/getting-started
    - theme: alt
      text: 包映射
      link: /zh-Hans/guide/packages
    - theme: alt
      text: API 参考
      link: /zh-Hans/api
    - theme: alt
      text: CSS 参考
      link: /zh-Hans/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: 单一事实来源
    details: 每个包都读取相同的已解析令牌 IR。在上游更改令牌后，它会以相同方式流向 CSS、SCSS、本地代码和 Figma。
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: 使用最小化包
    details: 仅安装 @pantoken/css 获取样式表，安装 @pantoken/react 获取 hooks 和图标，或安装针对 Tailwind、Panda 或 MUI 的打包器预设。
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: 为任意平台生成
    details: 运行 &grave;pantoken generate&grave; 来生成 Swift、Kotlin、Compose、Flutter、Rust、WordPress 等。相同的令牌，以每个生态系统的习惯用法呈现。
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: 无上游耦合
    details: 这些令牌作为静态 JSON 随包发布，因此 &grave;npm i&grave; 永远不会依赖仅限 GitHub 的源。可发布、遵循语义化版本控制、离线友好。
---
