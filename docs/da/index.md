---
layout: home
hero:
  name: pantoken
  text: InstUI, overalt
  tagline: En løst token-model, omformet til stylesheets, framework-bindings, native-kode og payloads til designværktøjer.
  actions:
    - theme: brand
      text: Kom godt i gang
      link: /da/guide/getting-started
    - theme: alt
      text: Pakkeoversigt
      link: /da/guide/packages
    - theme: alt
      text: API-reference
      link: /da/api
    - theme: alt
      text: CSS-reference
      link: /da/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: Én sandhedskilde
    details: Hver pakke læser den samme resolved token-IR. Ændr en token opstrøms, og den flyder til CSS, SCSS, native-kode og Figma på samme måde.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Brug den mindste pakke
    details: Installer kun @pantoken/css for et stylesheet, @pantoken/react for hooks og ikoner, eller et bundler-preset for Tailwind, Panda eller MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Generer til enhver platform
    details: Kør &grave;pantoken generate&grave; for at generere Swift, Kotlin, Compose, Flutter, Rust, WordPress og mere. De samme tokens, i hvert økosystems idiom.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: Ingen opstrømskobling
    details: Tokens leveres som vendored statisk JSON, så &grave;npm i pantoken&grave; aldrig henter fra en GitHub-only-kilde. Publicerbar, semver'd, offline-venlig.
---
