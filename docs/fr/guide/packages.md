# La carte des packages

pantoken est un monorepo de petits packages à but unique regroupés en buckets. Installez celui qui
correspond à votre tâche, ou installez le package unifié `pantoken` et importez depuis ses sous-chemins (par exemple
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Noyau

Le modèle partagé et le transformateur sur lequel tout le reste s'appuie.

| Package                                                 | Ce que ça fait                                                                                                                                      |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Types TypeScript sans dépendance : la forme `Token` et le contrat de plugin.                                                                        |
| [`@pantoken/core`](/api/packages/core/src/)             | Résout les tokens et icônes en amont vers l'IR canonique, et génère du CSS.                                                                         |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | L'IR résolu fourni comme JSON statique, par thème, plus la source brute Tokens Studio.                                                              |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Le résolveur de tokens, les regex de référence, les helpers de casse et couleur, les vérifications de dérive, et les émetteurs token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Construire et composer des plugins pantoken avec `definePlugin`.                                                                                    |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — émet les sources natives et plateformes.                                                                             |

## Formats

Transformer les tokens en un format de fichier.

| Package                                                | Sortie                                                                                                                                                                                                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS typé `@property` avec `light-dark()` et icônes en data-URI.                                                                                                                                                                                            |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Variables SCSS, résolues dans un seul mode.                                                                                                                                                                                                                |
| [`@pantoken/less`](/api/formats/less/src/)             | Variables Less.                                                                                                                                                                                                                                            |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Variables Stylus.                                                                                                                                                                                                                                          |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Un document W3C Design Tokens (DTCG).                                                                                                                                                                                                                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | L'IR en JavaScript et JSON (également listé sous Noyau).                                                                                                                                                                                                   |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Une vue ergonomique des tokens d'icône.                                                                                                                                                                                                                    |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Une police web d'icônes (TTF, WOFF2) plus son CSS.                                                                                                                                                                                                         |
| [`@pantoken/components`](/api/formats/components/src/) | Une bibliothèque de composants CSS au look InstUI (bouton, alerte, tableau, et plus) plus une réinitialisation de base avec anneau de focus, styles de prose, utilitaires transversaux, et les polices de la marque. Voir [Components](/guide/components). |

## Renders

Intégrations framework et outils.

| Package                                                                                                                                          | Pour                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hooks React, `<Icon>`, et un provider de tokens.                    |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Le web component, connecté à chaque framework.                      |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objets de tokens compatibles StyleSheet (sans variables CSS).       |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` et primitives stylées, agnostiques au framework.    |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Configuration des tokens pour sites Astro.                          |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokens d'icônes et nuanciers en Markdown.                           |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Un plugin markdown-it pour codes d'icônes et nuanciers de couleur.  |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Un thème typé pour styled-components et Emotion.                    |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Un thème Material UI.                                               |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Ponts de variables CSS pour Bootstrap et shadcn/ui.                 |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Un override des settings Sass et une surcouche CSS pour Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Thèmes pour Docusaurus et VitePress.                                |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Un thème Mintlify `docs.json` (couleurs + arrière-plan).            |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Un thème Storybook.                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global stylé Instructure pour les guides Pendo.                 |

## Bundlers

Intégrations pour outils de build.

| Package                                             | Pour                                                   |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Un plugin Vite avec modules virtuels et injection CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` pour Next.js `transpilePackages`.       |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Un plugin webpack.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | L'at-rule `@pantoken;`.                                |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Un preset Tailwind.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Un preset Panda CSS.                                   |

## Plates-formes

Cibles natives et générateurs de sites, émises par le CLI ou leur propre API.

| Package                                                                                        | Sortie                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Sources Swift plus un stub de manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Ressources XML Android.                         |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                         |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                   |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | consts Rust pour egui ou iced.                  |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Un `theme.json` thème WordPress.                |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Un `variables.json` Vanilla Forums.             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Assets de thème Drupal.                         |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Données de site Hugo et Jekyll.                 |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Valeurs compatibles inline pour email HTML.     |

## Design

Pour les outils de design.

| Package                                           | Sortie                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Un payload Figma Variables.                                                                |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Nuanciers de couleurs (ASE, GPL, Sketch) plus une feuille d'échantillons SVG visualisable. |

## Plugins

Transformations optionnelles qui étendent la sortie token ou CSS. Voir [Plugins](/guide/plugins).

| Package                                                                               | Ce que ça ajoute                                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Profondeurs z-index nommées comme tokens `--instui-stacking-*`.           |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | L'outline de débogage de layout `-with-visual-debug`.                     |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Icônes de marque depuis simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logos produits Instructure en SVG, data URIs, et tokens image.            |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Un plugin PostCSS qui supprime les propriétés personnalisées inutilisées. |

## Outils

Infrastructure de build, docs et démo pour le monorepo lui-même. La plupart sont internes, mais les pièces sont
autonomes, donc documentées ici et certaines sont publiées séparément sur npm.

| Package                                            | Ce que ça fait                                                                                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Génère le package barreau unifié `pantoken` et `exports` à partir de ses dépendances.                                                                                                                                                 |
| `@pantoken/validate-generated`                     | La porte de dérive : vérifie que chaque feuille de style générée se résout contre l'IR des tokens.                                                                                                                                    |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Le runner de demo auto-hébergé : résout une spec `@demo` dans une iframe et rend du HTML/CSS/JS natif même origine, thématisé par les tokens.                                                                                         |
| `@cssdoc/core` (externe)                           | Un extracteur générique de documentation CSS (TSDoc, pour le CSS) : analyse les commentaires TSDoc + l'AST CSS en un modèle que la doc émet comme référence API CSS. Vivre dans son propre repo ; consommé via une dépendance linkée. |

`@pantoken/validate-generated` est un script à exécution unique (invoked by `pnpm run ready`), il n'a donc pas de page API ; les autres en ont.

## IA

Assets de configuration IA orientés consommateur. Ceux-ci sont pour des projets qui utilisent pantoken, pas pour développer
pantoken lui-même.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installe `AGENTS.md`, `llms.txt`, et
  des règles assistant/éditeur (Cursor, Copilot, Windsurf, Claude Code) dans un dépôt consommateur.

## Plugins de dev

Plugins que l'on rédige pour les outils avec lesquels on travaille, groupés par hôte. Ils sont autonomes et publiables.

| Package                                                                                  | Se branche dans                                                                                       |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc : transforme une balise de bloc `@demo <provider>:<ref>` en une clôture de demo incorporable. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite : reconstruit les packages workspace en amont (et leurs dépendants) lorsque leur source change.  |
