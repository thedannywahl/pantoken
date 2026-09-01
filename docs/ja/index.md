---
layout: home
hero:
  name: pantoken
  text: あらゆる場所に、InstUIを。
  tagline: 1つの解決済みトークンモデルが、スタイルシート、フレームワークバインディング、ネイティブコード、デザインツール用ペイロードに変換されます。
  actions:
    - theme: brand
      text: はじめに
      link: /ja/guide/getting-started
    - theme: alt
      text: パッケージマップ
      link: /ja/guide/packages
    - theme: alt
      text: API リファレンス
      link: /ja/api
    - theme: alt
      text: CSS リファレンス
      link: /ja/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: 単一の信頼できる情報源
    details: すべてのパッケージは同じ解決済みトークン IR を参照します。上流でトークンを変更すると、CSS、SCSS、ネイティブコード、Figma に同じように反映されます。
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: 最小のパッケージを使う
    details: スタイルシートには @pantoken/css のみ、フックとアイコンには @pantoken/react を、Tailwind、Panda、または MUI にはバンドラ用プリセットをインストールしてください。
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: 任意のプラットフォーム向けに生成
    details: Swift、Kotlin、Compose、Flutter、Rust、WordPress などを出力するには &grave;pantoken generate&grave; を実行してください。同じトークンを各エコシステムの慣用表現で提供します。
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: 上流への結合なし
    details: トークンはベンダリングされた静的 JSON として配布されるため、&grave;npm i&grave; が GitHub 専用のソースに依存することはありません。公開可能で semver 管理され、オフラインでも利用できます。
---
