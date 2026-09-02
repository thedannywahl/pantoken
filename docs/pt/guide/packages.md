# O mapa de pacotes

pantoken é um monorepo de pacotes pequenos e com propósito único agrupados em buckets. Instale o que
se encaixa na sua tarefa, ou instale o pacote unificado `pantoken` e importe de seus subpaths (por exemplo
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Núcleo

O modelo compartilhado e o transformador sobre o qual todo o resto é construído.

| Package                                                 | O que faz                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Tipos TypeScript sem dependências: a forma `Token` e o contrato de plugin.                                                            |
| [`@pantoken/core`](/api/packages/core/src/)             | Resolve os tokens e ícones upstream para a IR canônica e renderiza CSS.                                                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A IR resolvida embutida como JSON estático, por tema, mais a fonte bruta do Tokens Studio.                                            |
| [`@pantoken/utils`](/api/packages/utils/src/)           | O resolvedor de tokens, regexes de referência, helpers de case e cor, verificações de drift e os emissores token→classe-de-utilidade. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Construir e compor plugins pantoken com `definePlugin`.                                                                               |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emite código nativo e fonte por plataforma.                                                            |

## Formatos

Transforma os tokens em um formato de arquivo.

| Package                                                | Saída                                                                                                                                                                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS tipado por `@property` com `light-dark()` e ícones em data-URI.                                                                                                                                                                      |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Variáveis SCSS, resolvidas para um único modo.                                                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Variáveis Less.                                                                                                                                                                                                                          |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Variáveis Stylus.                                                                                                                                                                                                                        |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Um documento W3C Design Tokens (DTCG).                                                                                                                                                                                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | A IR como JavaScript e JSON (também listada em Núcleo).                                                                                                                                                                                  |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Uma visão ergonômica sobre os tokens de ícone.                                                                                                                                                                                           |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Uma fonte de ícones web (TTF, WOFF2) mais seu CSS.                                                                                                                                                                                       |
| [`@pantoken/components`](/api/formats/components/src/) | Uma biblioteca CSS de componentes com aparência InstUI (botão, alerta, tabela e mais) além de um reset base com anel de foco, estilização de prose, utilitários transversais e as fontes da marca. Veja [Components](/guide/components). |

## Renderers

Integrações com frameworks e ferramentas.

| Package                                                                                                                                          | Para                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hooks React, `<Icon>` e um provedor de tokens.                            |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | O web component, conectado a cada framework.                              |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objetos de token amigáveis ao StyleSheet (sem variáveis CSS).             |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` e primitivos estilizados, agnóstico a frameworks.         |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Configuração de tokens para sites Astro.                                  |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokens de ícone e paletas em Markdown.                                    |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Um plugin markdown-it para códigos de ícones e amostras de cores.         |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Um tema tipado para styled-components e Emotion.                          |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Um tema para Material UI.                                                 |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Pontes de variáveis CSS para Bootstrap e shadcn/ui.                       |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Uma sobreposição de CSS e override de configurações Sass para Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Temas para Docusaurus e VitePress.                                        |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Um tema Mintlify `docs.json` (cores + background).                        |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Um tema para Storybook.                                                   |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global com estilo Instructure para guias Pendo.                       |

## Bundlers

Integrações com ferramentas de build.

| Package                                             | Para                                                  |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Um plugin Vite com módulos virtuais e injeção de CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` para Next.js `transpilePackages`.      |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Um plugin webpack.                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A at-rule `@pantoken;`.                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Um preset Tailwind.                                   |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Um preset Panda CSS.                                  |

## Plataformas

Alvos nativos e geradores de site, emitidos pelo CLI ou por suas próprias APIs.

| Package                                                                                        | Saída                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Código Swift mais um stub de manifesto SwiftPM.   |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Recursos XML para Android.                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                           |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                     |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Consts Rust para egui ou iced.                    |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Um `theme.json` de tema WordPress.                |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Um `variables.json` do Vanilla Forums.            |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Assets de tema Drupal.                            |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Dados de site para Hugo e Jekyll.                 |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Valores amigáveis para uso inline em e-mail HTML. |

## Design

Para ferramentas de design.

| Package                                           | Saída                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Um payload de Figma Variables.                                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Paletas de cores (ASE, GPL, Sketch) além de uma folha de espécime SVG visualizável. |

## Plugins

Transformações opcionais que estendem o token ou a saída CSS. Veja [Plugins](/guide/plugins).

| Package                                                                               | O que adiciona                                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Profundidades z-index nomeadas como tokens `--instui-stacking-*`.      |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | O contorno de depuração de layout `-with-visual-debug`.                |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ícones de marca do simple-icons.                                       |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logos de produtos Instructure como SVGs, data URIs e tokens de imagem. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Um plugin PostCSS que remove propriedades customizadas não utilizadas. |

## Ferramentas

Infraestrutura de build, docs e demo para o próprio monorepo. A maior parte é interna, mas as peças são
auto-contidas, então documentamos aqui e algumas são publicadas no npm separadamente.

| Package                                            | O que faz                                                                                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Gera o pacote unificado `pantoken` barrel e `exports` a partir de suas dependências.                                                                                                                                            |
| `@pantoken/validate-generated`                     | O gate de drift: verifica se cada stylesheet gerada resolve contra a IR de tokens.                                                                                                                                              |
| [`@pantoken/demo`](/api/tools/demo/src/)           | O runner de live-demo self-hosted: resolve uma spec `@demo` para um iframe e renderiza HTML/CSS/JS bare same-origin, temado por tokens.                                                                                         |
| `@cssdoc/core` (external)                          | Um extrator genérico de documentação CSS (TSDoc, para CSS): analisa comentários TSDoc + AST de CSS em um modelo que a docs emite como referência da API CSS. Vive em um repositório próprio; consumido via dependência linkada. |

`@pantoken/validate-generated` é um script executado uma vez (invocado por `pnpm run ready`), então não tem página de API;
as demais têm.

## AI

Ativos de configuração de IA voltados ao consumidor. Estes são para projetos que usam pantoken, não para desenvolver
o próprio pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) instala `AGENTS.md`, `llms.txt` e
  regras de assistente/editor (Cursor, Copilot, Windsurf, Claude Code) em um repositório consumidor.

## Dev plugins

Plugins que autoramos para as ferramentas com as quais trabalhamos, agrupados por host. São independentes e publicáveis.

| Package                                                                                  | Plug-in em                                                                                    |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: transforma uma tag de bloco `@demo <provider>:<ref>` em uma cerca de demo embutível. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: reconstrói pacotes upstream do workspace (e dependentes) quando suas fontes mudam.      |
