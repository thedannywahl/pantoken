# Die Paketkarte

pantoken ist ein Monorepo aus kleinen, zweckgebundenen Paketen, die in Buckets gruppiert sind. Installiere dasjenige, das zu deiner Aufgabe passt, oder installiere das vereinheitlichte `pantoken`-Paket und importiere aus seinen Subpfaden (zum Beispiel `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kern

Das gemeinsame Modell und der Transformer, auf dem alles andere aufbaut.

| Package                                                 | Was es tut                                                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Abhängigkeitsfreie TypeScript-Typen: die `Token`-Form und der Plugin-Vertrag.                                 |
| [`@pantoken/core`](/api/packages/core/src/)             | Löst die Upstream-Tokens und Icons in die kanonische IR auf und rendert CSS.                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Die aufgelöste IR als eingebettetes statisches JSON, pro Theme, plus die rohe Tokens Studio-Quelle.           |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Der Token-Resolver, Referenz-Regexes, Case- und Farbhelfer, Drift-Checks und die Token→Utility-Class-Emitter. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Pantoken-Plugins bauen und zusammensetzen mit `definePlugin`.                                                 |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — native und plattformspezifische Quellen ausgeben.                              |

## Formate

Wandelt die Tokens in ein Dateiformat um.

| Package                                                | Ausgabe                                                                                                                                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typisierte CSS mit `light-dark()` und data-URI-Icons.                                                                                                                                                 |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-Variablen, auf einen einzigen Modus aufgelöst.                                                                                                                                                               |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-Variablen.                                                                                                                                                                                                   |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-Variablen.                                                                                                                                                                                                 |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Ein W3C Design Tokens (DTCG) Dokument.                                                                                                                                                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Die IR als JavaScript und JSON (auch unter Kern gelistet).                                                                                                                                                        |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Eine ergonomische Sicht auf die Icon-Tokens.                                                                                                                                                                      |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Eine Icon-Webschrift (TTF, WOFF2) plus ihr CSS.                                                                                                                                                                   |
| [`@pantoken/components`](/api/formats/components/src/) | Eine InstUI-ähnliche CSS-Komponentenbibliothek (Button, Alert, Table und mehr) plus ein Basis-Reset mit Focus-Ring, Prose-Styling, Querschnitts-Utilities und Markenfonts. Siehe [Components](/guide/components). |

## Renderer

Framework- und Tool-Integrationen.

| Package                                                                                                                                          | Für                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-Hooks, `<Icon>` und einen Token-Provider.                |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Das Web-Component, in jedes Framework eingebunden.             |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-freundliche Token-Objekte (keine CSS-Variablen).    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` und gestylte Primitives, framework-agnostisch. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-Setup für Astro-Seiten.                                  |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon-Tokens und Swatches in Markdown.                          |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Ein markdown-it-Plugin für Icon-Codes und Farb-Swatches.       |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Ein typ-sicheres Theme für styled-components und Emotion.      |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Ein Material-UI-Theme.                                         |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-Variable-Brücken für Bootstrap und shadcn/ui.              |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Eine Sass-Settings-Override und CSS-Overlay für Foundation.    |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Themes für Docusaurus und VitePress.                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Ein Mintlify-`docs.json`-Theme (Farben + Hintergrund).         |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Ein Storybook-Theme.                                           |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stilisiertes globales CSS für Pendo-Guides.        |

## Bundler

Build-Tool-Integrationen.

| Package                                             | Für                                                       |
| --------------------------------------------------- | --------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Ein Vite-Plugin mit virtuellen Modulen und CSS-Injektion. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` für Next.js `transpilePackages`.           |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Ein Webpack-Plugin.                                       |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Die `@pantoken;` At-Rule.                                 |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Ein Tailwind-Preset.                                      |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Ein Panda-CSS-Preset.                                     |

## Plattformen

Native und Site-Generator-Ziele, ausgegeben vom CLI oder ihrer eigenen API.

| Package                                                                                        | Ausgabe                                          |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-Quellcode plus ein SwiftPM-Manifest-Stubs. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-Ressourcen.                          |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                          |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                    |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-Konstanten für z. B. egui oder iced.        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Ein WordPress-Block-Theme `theme.json`.          |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Ein Vanilla Forums `variables.json`.             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal-Theme-Assets.                             |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo- und Jekyll-Site-Daten.                     |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-freundliche Werte für HTML-E-Mails.       |

## Design

Für Design-Tools.

| Package                                           | Ausgabe                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Eine Figma Variables-Nutzlast.                                       |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Farbswatches (ASE, GPL, Sketch) plus ein darstellbares SVG-Specimen. |

## Plugins

Optionale Transformationen, die den Token- oder CSS-Output erweitern. Siehe [Plugins](/guide/plugins).

| Package                                                                               | Was es hinzufügt                                               |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Benannte z-index-Tiefen als `--instui-stacking-*`-Tokens.      |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Die `-with-visual-debug` Layout-Debugging-Umrandung.           |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Marken-Icons aus simple-icons.                                 |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure-Produktlogos als SVGs, Data-URIs und Image-Tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Ein PostCSS-Plugin, das unbenutzte Custom Properties entfernt. |

## Tools

Build-, Dokumentations- und Demo-Infrastruktur für das Monorepo selbst. Das meiste ist intern, aber die Teile sind eigenständig, daher dokumentieren wir sie hier und einige werden eigenständig zu npm veröffentlicht.

| Package                                            | Was es tut                                                                                                                                                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generiert das vereinheitlichte `pantoken` Package-Barrier und `exports` aus seinen Abhängigkeiten.                                                                                                                    |
| `@pantoken/validate-generated`                     | Das Drift-Gate: prüft, dass jedes generierte Stylesheet gegen die Token-IR aufgelöst wird.                                                                                                                            |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Der selbstgehostete Live-Demo-Runner: löst eine `@demo`-Spezifikation zu einem iframe auf und rendert plain HTML/CSS/JS same-origin, token-gethemed.                                                                  |
| `@cssdoc/core` (extern)                            | Ein generischer CSS-Dokumentationsextraktor (TSDoc für CSS): parst Doc-Kommentare + die CSS-AST in ein Modell, das die Docs als CSS-API-Referenz emitten. Lebt in einem eigenen Repo; als Link-Dependency konsumiert. |

`@pantoken/validate-generated` ist ein Einmal-Skript (aufgerufen von `pnpm run ready`), daher hat es keine API-Seite; die anderen schon.

## KI

Konsumentenorientierte KI-Setup-Assets. Diese sind für Projekte, die pantoken verwenden, nicht für die Entwicklung von pantoken selbst.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installiert `AGENTS.md`, `llms.txt` und Assistant/Editor-Regeln (Cursor, Copilot, Windsurf, Claude Code) in ein Verbraucher-Repository.

## Dev-Plugins

Plugins, die für die Tools entwickelt wurden, mit denen gearbeitet wird, gruppiert nach Host. Sie sind eigenständig und veröffentlichbar.

| Package                                                                                  | Pluggt in                                                                                    |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: verwandelt ein `@demo <provider>:<ref>` Block-Tag in einen einbettbaren Demo-Fence. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: baut Upstream-Workspace-Pakete (und Abhängige) neu, wenn deren Quellcode sich ändert.  |
