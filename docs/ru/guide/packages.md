# Карта пакетов

pantoken — это монорепозиторий небольших, одноцельных пакетов, сгруппированных по корзинам. Установите тот, который
подходит для вашей задачи, или установите единый пакет `pantoken` и импортируйте из его подпутей (например
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Ядро

Общая модель и трансформер, на котором строится всё остальное.

| Пакет                                                   | Что делает                                                                                                            |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Типы TypeScript без зависимостей: форма `Token` и контракт плагина.                                                   |
| [`@pantoken/core`](/api/packages/core/src/)             | Разрешает upstream токены и иконки в канонический IR и рендерит CSS.                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Разрешённый IR, поставляемый как статический JSON по теме, плюс исходник Tokens Studio.                               |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Разрешатель токенов, regex-ы ссылок, помощники для регистра и цветов, проверки дрейфа и эмиттеры token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Сборка и компоновка плагинов pantoken с `definePlugin`.                                                               |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — эмитирует нативные и платформенные исходники.                                          |

## Форматы

Преобразуют токены в файл формата.

| Пакет                                                  | Выход                                                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS, типизированный под `@property` с `light-dark()` и иконками в data-URI.                                                                                                                            |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-переменные, разрешённые в одном режиме.                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-переменные.                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-переменные.                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Документ W3C Design Tokens (DTCG).                                                                                                                                                                     |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR как JavaScript и JSON (также упомянут в разделе Ядро).                                                                                                                                              |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Эргономичный обзор токенов иконок.                                                                                                                                                                     |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Веб-шрифт иконок (TTF, WOFF2) плюс его CSS.                                                                                                                                                            |
| [`@pantoken/components`](/api/formats/components/src/) | Библиотека CSS-компонентов в стиле InstUI (button, alert, table и др.) плюс базовый reset с focus ring, стилизацией prose, кросс-утилитами и фирменными шрифтами. См. [Components](/guide/components). |

## Рендереры

Интеграции с фреймворками и инструментами.

| Пакет                                                                                                                                            | Для                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-хуки, `<Icon>` и провайдер токенов.                             |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Веб-компонент, подключённый к каждому фреймворку.                     |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-совместимые объекты токенов (без CSS-переменных).          |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` и стилизованные примитивы, независимые от фреймворка. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Настройка токенов для сайтов на Astro.                                |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Иконки и образцы цветов в Markdown.                                   |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Плагин для markdown-it для кодов и цветовых образцов.                 |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Типобезопасная тема для styled-components и Emotion.                  |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Тема для Material UI.                                                 |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Мосты на основе CSS-переменных для Bootstrap и shadcn/ui.             |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Переопределение настроек Sass и CSS-оверлей для Foundation.           |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Темы для Docusaurus и VitePress.                                      |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Тема Mintlify `docs.json` (цвета + фон).                              |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Тема для Storybook.                                                   |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Глобальный CSS в стиле Instructure для Pendo-гайдов.                  |

## Бандлеры

Интеграции с инструментами сборки.

| Пакет                                               | Для                                                      |
| --------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Плагин для Vite с виртуальными модулями и инъекцией CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` для Next.js `transpilePackages`.          |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Плагин для webpack.                                      |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Ат-правило `@pantoken;`.                                 |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Пресет для Tailwind.                                     |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Пресет для Panda CSS.                                    |

## Платформы

Нативные цели и генераторы сайтов, эмитируемые CLI или их собственным API.

| Пакет                                                                                          | Выход                                          |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-исходники плюс заготовка SwiftPM.        |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Ресурсы Android XML.                           |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose на Kotlin.                     |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter на Dart.                               |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-константы для egui или iced.              |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Тема блоков WordPress `theme.json`.            |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Данные для Vanilla Forums `variables.json`.    |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Ассеты темы Drupal.                            |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Данные сайтов для Hugo и Jekyll.               |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Значения, пригодные для inline в HTML-письмах. |

## Дизайн

Для инструментов дизайна.

| Пакет                                             | Выход                                                           |
| ------------------------------------------------- | --------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Пейлоад Figma Variables.                                        |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Цветовые образцы (ASE, GPL, Sketch) плюс обозримый SVG-образец. |

## Плагины

Опциональные преобразования, расширяющие вывод токенов или CSS. См. [Plugins](/guide/plugins).

| Пакет                                                                                 | Что добавляет                                                        |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Именованные глубины z-index как токены `--instui-stacking-*`.        |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Отладочную обводку макета `-with-visual-debug`.                      |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Брендовые иконки из simple-icons.                                    |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Логотипы продуктов Instructure в виде SVG, data URI и image-токенов. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS-плагин, удаляющий неиспользуемые custom properties.          |

## Инструменты

Инфраструктура сборки, доков и демо для самого монорепозитория. Большая часть внутреняя, но части автономны и описаны здесь; некоторые публикуются в npm отдельно.

| Пакет                                              | Что делает                                                                                                                                                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Генерирует единый баррель пакета `pantoken` и `exports` из его зависимостей.                                                                                                                                     |
| `@pantoken/validate-generated`                     | Ворота дрейфа: проверяет, что каждая сгенерированная таблица стилей разрешается относительно IR токенов.                                                                                                         |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Самохостящийся раннер демо: разрешает спецификацию `@demo` в iframe и рендерит голый HTML/CSS/JS same-origin, тематизированный токенами.                                                                         |
| `@cssdoc/core` (внешний)                           | Общий извлекатель документации CSS (TSDoc, для CSS): парсит doc-комментарии + AST CSS в модель, которую доки эмитируют как справочник CSS API. Живёт в отдельном репозитории; потребляется как link-зависимость. |

`@pantoken/validate-generated` — это скрипт однократного запуска (вызывается `pnpm run ready`), поэтому у него нет страницы API;
у остальных страницы есть.

## AI

Пользовательские AI-ассеты. Предназначены для проектов, использующих pantoken, а не для разработки pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) устанавливает `AGENTS.md`, `llms.txt` и правила ассистента/редактора (Cursor, Copilot, Windsurf, Claude Code) в репозитории потребителя.

## Dev-плагины

Плагины, которые пишутся для инструментов, с которыми мы работаем, сгруппированные по хосту. Они автономны и публикуемы.

| Пакет                                                                                    | Встраивается в                                                                           |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: превращает блок-тег `@demo <provider>:<ref>` в встраиваемый демо-fence.         |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: перестраивает upstream workspace пакеты (и зависимые) при изменении их исходников. |
