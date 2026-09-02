---
layout: home
hero:
  name: pantoken
  text: InstUI — повсюду
  tagline: Одна унифицированная модель токенов, преобразованная в таблицы стилей, привязки фреймворков, нативный код и данные для инструментов дизайна.
  actions:
    - theme: brand
      text: Начало работы
      link: /ru/guide/getting-started
    - theme: alt
      text: Карта пакетов
      link: /ru/guide/packages
    - theme: alt
      text: Справочник API
      link: /ru/api
    - theme: alt
      text: Справочник CSS
      link: /ru/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: Единый источник правды
    details: Каждый пакет использует одну и ту же разрешённую IR токенов. Измените токен в источнике — он одинаково попадёт в CSS, SCSS, нативный код и Figma.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Используйте минимальный пакет
    details: Установите только @pantoken/css для таблицы стилей, @pantoken/react для хуков и иконок или пресет бандлера для Tailwind, Panda или MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Генерировать для любой платформы
    details: Запустите &grave;pantoken generate&grave;, чтобы сгенерировать Swift, Kotlin, Compose, Flutter, Rust, WordPress и другие. Те же токены, в идиоме каждой экосистемы.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: Нет зависимости от upstream
    details: Токены поставляются как vendored статические JSON, поэтому &grave;npm i&grave; никогда не обращается к GitHub-only источнику. Готовы к публикации, с семантическим версионированием и дружелюбны к оффлайн‑использованию.
---
