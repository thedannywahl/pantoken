---
layout: home
hero:
  name: pantoken
  text: InstUI，無所不在
  tagline: 一個解析後的代幣模型，轉換成樣式表、框架綁定、原生程式碼與設計工具的載入資料。
  actions:
    - theme: brand
      text: 開始使用
      link: /zh-Hant/guide/getting-started
    - theme: alt
      text: 套件地圖
      link: /zh-Hant/guide/packages
    - theme: alt
      text: API 參考
      link: /zh-Hant/api
    - theme: alt
      text: CSS 參考
      link: /zh-Hant/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: 單一真實來源
    details: 每個套件都讀取相同的解析後代幣中介表示（IR）。在上游變更代幣，會以相同方式流到 CSS、SCSS、原生程式碼與 Figma。
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: 使用最小的套件
    details: 只需安裝 @pantoken/css 取得樣式表、安裝 @pantoken/react 取得 hooks 與圖示，或安裝 Tailwind、Panda 或 MUI 的打包器預設。
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: 為任何平台生成
    details: 執行 &grave;pantoken generate&grave; 可輸出 Swift、Kotlin、Compose、Flutter、Rust、WordPress 等。相同的代幣，以各生態系慣用語表達。
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: 不與上游耦合
    details: 代幣以內嵌（vendored）靜態 JSON 發佈，因此 &grave;npm i&grave; 不會去取用僅在 GitHub 的來源。可發佈、使用 semver，且支援離線。
---
