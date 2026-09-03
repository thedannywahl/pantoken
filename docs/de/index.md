---
layout: home
hero:
  name: Pantoken
  text: InstUI, überall
  tagline: Ein aufgelöstes Token-Modell, umgeformt in Stylesheets, Framework-Bindings, nativen Code und Design-Tool-Payloads.
  actions:
    - theme: brand
      text: Erste Schritte
      link: /de/guide/getting-started
    - theme: alt
      text: Die Paketübersicht
      link: /de/guide/packages
    - theme: alt
      text: API-Referenz
      link: /de/api
    - theme: alt
      text: CSS-Referenz
      link: /de/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: Eine einzige Quelle der Wahrheit
    details: Jedes Paket liest dasselbe aufgelöste Token-IR. Ändere ein Token upstream und es fließt auf die gleiche Weise in CSS, SCSS, nativen Code und Figma.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Verwende das kleinste Paket
    details: Installiere nur @pantoken/css für ein Stylesheet, @pantoken/react für Hooks und Icons oder ein Bundler-Preset für Tailwind, Panda oder MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Für jede Plattform generieren
    details: Führe &grave;pantoken generate&grave; aus, um Swift, Kotlin, Compose, Flutter, Rust, WordPress und mehr zu erzeugen. Dieselben Tokens im Idiom jedes Ökosystems.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: Keine Upstream-Kopplung
    details: Die Tokens werden vendored als statisches JSON ausgeliefert, daher greift &grave;npm i&grave; niemals auf eine nur auf GitHub verfügbare Quelle zu. Veröffentlichbar, semver-konform, offline-freundlich.
---
