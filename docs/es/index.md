---
layout: home
hero:
  name: pantoken
  text: InstUI, en todas partes
  tagline: Un único modelo de tokens resuelto, transformado en hojas de estilo, enlaces para frameworks, código nativo y payloads para herramientas de diseño.
  actions:
    - theme: brand
      text: Primeros pasos
      link: /es/guide/getting-started
    - theme: alt
      text: El mapa de paquetes
      link: /es/guide/packages
    - theme: alt
      text: Referencia de la API
      link: /es/api
    - theme: alt
      text: Referencia de CSS
      link: /es/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: Una única fuente de verdad
    details: Cada paquete lee el mismo IR de tokens resuelto. Cambia un token en upstream y se propagará a CSS, SCSS, código nativo y Figma de la misma forma.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Usa el paquete más pequeño
    details: Instala solo @pantoken/css para una hoja de estilo, @pantoken/react para hooks e íconos, o un preset de bundler para Tailwind, Panda o MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Genera para cualquier plataforma
    details: Ejecuta &grave;pantoken generate&grave; para generar Swift, Kotlin, Compose, Flutter, Rust, WordPress y más. Los mismos tokens, en el idioma de cada ecosistema.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: Sin acoplamiento upstream
    details: Los tokens se distribuyen como JSON estático incluido, así que &grave;npm i pantoken&grave; nunca depende de una fuente exclusiva de GitHub. Publicable, versionado semánticamente y apto para uso sin conexión.
---
