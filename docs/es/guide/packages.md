# El mapa de paquetes

pantoken es un monorepo de paquetes pequeños y de propósito único agrupados en buckets. Instala el que se ajuste a tu tarea, o instala el paquete unificado `pantoken` e importa desde sus subrutas (por ejemplo `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Núcleo

El modelo compartido y el transformador sobre el que se construye todo lo demás.

| Package                                                 | What it does                                                                                                                              |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Tipos TypeScript sin dependencias: la forma `Token` y el contrato del plugin.                                                             |
| [`@pantoken/core`](/api/packages/core/src/)             | Resuelve los tokens e iconos upstream en la IR canónica y renderiza CSS.                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | La IR resuelta vendorizada como JSON estático, por tema, además del origen bruto de Tokens Studio.                                        |
| [`@pantoken/utils`](/api/packages/utils/src/)           | El resolvedor de tokens, regexes de referencias, utilidades de caso y color, comprobaciones de drift, y los emisores token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Construye y compone plugins de pantoken con `definePlugin`.                                                                               |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emite código nativo y fuente para plataformas.                                                             |

## Formatos

Convierte los tokens en un formato de archivo.

| Package                                                | Output                                                                                                                                                                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS tipado con `@property` con `light-dark()` e iconos en data-URI.                                                                                                                                                                |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Variables SCSS, resueltas en un solo modo.                                                                                                                                                                                         |
| [`@pantoken/less`](/api/formats/less/src/)             | Variables Less.                                                                                                                                                                                                                    |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Variables Stylus.                                                                                                                                                                                                                  |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Un documento W3C Design Tokens (DTCG).                                                                                                                                                                                             |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | La IR como JavaScript y JSON (también listado bajo Núcleo).                                                                                                                                                                        |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Una vista ergonómica sobre los tokens de icono.                                                                                                                                                                                    |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Una fuente web de iconos (TTF, WOFF2) más su CSS.                                                                                                                                                                                  |
| [`@pantoken/components`](/api/formats/components/src/) | Una biblioteca de componentes CSS con apariencia InstUI (button, alert, table, y más) más un reset base con focus ring, estilos de prosa, utilidades transversales y las fuentes de la marca. Ver [Components](/guide/components). |

## Renderizadores

Integraciones con frameworks y herramientas.

| Package                                                                                                                                          | For                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hooks de React, `<Icon>`, y un proveedor de tokens.                  |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | El web component, conectado a cada framework.                        |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objetos de tokens compatibles con StyleSheet (sin variables CSS).    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` y primitivos estilados, agnóstico de framework.      |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Configuración de tokens para sitios Astro.                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokens de icono y paletas en Markdown.                               |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Un plugin de markdown-it para códigos de iconos y muestras de color. |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Un theme tipado para styled-components y Emotion.                    |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Un tema de Material UI.                                              |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Puentes de variables CSS para Bootstrap y shadcn/ui.                 |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Una sobreescritura de ajustes Sass y una capa CSS para Foundation.   |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Temas para Docusaurus y VitePress.                                   |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Un tema de Mintlify `docs.json` (colores + fondo).                   |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Un tema para Storybook.                                              |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global con estilo Instructure para guías de Pendo.               |

## Bundlers

Integraciones con herramientas de build.

| Package                                             | For                                                         |
| --------------------------------------------------- | ----------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Un plugin de Vite con módulos virtuales e inyección de CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` para Next.js `transpilePackages`.            |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Un plugin de webpack.                                       |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | La regla at- `@pantoken;`.                                  |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Un preset de Tailwind.                                      |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Un preset de Panda CSS.                                     |

## Plataformas

Objetivos nativos y generadores de sitios, emitidos por la CLI o por su propia API.

| Package                                                                                        | Output                                        |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Código Swift más un stub de manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Recursos XML para Android.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose en Kotlin.                    |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter en Dart.                              |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | consts Rust para egui o iced.                 |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Un `theme.json` de tema de WordPress.         |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Un `variables.json` para Vanilla Forums.      |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Assets de tema para Drupal.                   |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Datos de sitio para Hugo y Jekyll.            |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Valores amigables para email HTML inline.     |

## Diseño

Para herramientas de diseño.

| Package                                           | Output                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Una carga útil de Figma Variables.                                              |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Muestras de color (ASE, GPL, Sketch) además de una hoja de muestra SVG visible. |

## Plugins

Transformaciones opcionales que extienden la salida de tokens o CSS. Ver [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                            |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Profundidades nombradas de z-index como tokens `--instui-stacking-*`.   |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | El contorno de depuración de diseño `-with-visual-debug`.               |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Iconos de marca desde simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logos de productos Instructure como SVGs, data URIs y tokens de imagen. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Un plugin de PostCSS que elimina propiedades custom no usadas.          |

## Herramientas

Infraestructura de build, docs y demos para el propio monorepo. La mayoría es interna, pero las piezas son
autocontenidas, por eso las documentamos aquí y algunas se publican en npm por separado.

| Package                                            | What it does                                                                                                                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genera el paquete barrel unificado `pantoken` y `exports` desde sus dependencias.                                                                                                                                              |
| `@pantoken/validate-generated`                     | La puerta de drift: verifica que cada stylesheet generado se resuelva contra la IR de tokens.                                                                                                                                  |
| [`@pantoken/demo`](/api/tools/demo/src/)           | El runner de demo en vivo self-hosted: resuelve una especificación `@demo` a un iframe y renderiza HTML/CSS/JS same-origin, temático por tokens.                                                                               |
| `@cssdoc/core` (external)                          | Un extractor genérico de documentación CSS (TSDoc, para CSS): parsea doc-comments + el AST de CSS en un modelo que las docs emiten como la referencia API de CSS. Vive en su propio repo; se consume vía dependencia por link. |

`@pantoken/validate-generated` es un script que se ejecuta una vez (invocado por `pnpm run ready`), por lo que no tiene página de API; los demás sí.

## AI

Activos de configuración de IA orientados al consumidor. Estos son para proyectos que usan pantoken, no para desarrollar pantoken en sí.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) instala `AGENTS.md`, `llms.txt`, y reglas de assistant/editor (Cursor, Copilot, Windsurf, Claude Code) en un repositorio consumidor.

## Dev plugins

Plugins que autoramos para las herramientas con las que trabajamos, agrupados por host. Son autónomos y publicables.

| Package                                                                                  | Plugs into                                                                                         |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: convierte una etiqueta de bloque `@demo <provider>:<ref>` en una cerca de demo embebible. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: reconstruye paquetes del workspace upstream (y dependientes) cuando su fuente cambia.        |
