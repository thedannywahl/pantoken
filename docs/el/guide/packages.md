# Ο χάρτης πακέτων

pantoken είναι ένα monorepo από μικρά, μεμονωμένου σκοπού πακέτα ομαδοποιημένα σε κάδους. Εγκαταστήστε αυτό που ταιριάζει στο έργο σας, ή εγκαταστήστε το ενοποιημένο `pantoken` πακέτο και εισάγετε από τις υποδιαδρομές του (για παράδειγμα `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Πυρήνας

Το κοινό μοντέλο και ο μετασχηματιστής πάνω στον οποίο χτίζει τα υπόλοιπα.

| Package                                                 | Τι κάνει                                                                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Τύποι TypeScript χωρίς εξαρτήσεις: το σχήμα `Token` και το συμβόλαιο plugin.                                         |
| [`@pantoken/core`](/api/packages/core/src/)             | Επιλύει τα upstream tokens και τα icons στην κανονική IR, και αποδίδει CSS.                                          |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Η επιλυμένη IR προσφερόμενη ως στατικό JSON, ανά θέμα, συν την ακατέργαστη πηγή Tokens Studio.                       |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Ο επιλύτης token, regex αναφορών, βοηθήματα για case και χρώμα, έλεγχοι drift, και οι εκπέμπτες token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Δημιουργία και σύνθεση pantoken plugins με `definePlugin`.                                                           |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — εκπέμπει εγγενές και πλατφορμικό πηγαίο κώδικα.                                       |

## Μορφές

Μετατρέπουν τα tokens σε μορφή αρχείου.

| Package                                                | Έξοδος                                                                                                                                                                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-τυποποιημένο CSS με `light-dark()` και icons ως data-URI.                                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Μεταβλητές SCSS, επιλυμένες σε έναν ενιαίο τρόπο.                                                                                                                                                                                       |
| [`@pantoken/less`](/api/formats/less/src/)             | Μεταβλητές Less.                                                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Μεταβλητές Stylus.                                                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Ένα έγγραφο W3C Design Tokens (DTCG).                                                                                                                                                                                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Η IR ως JavaScript και JSON (επίσης αναφέρεται στον Πυρήνα).                                                                                                                                                                            |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Μια εργονομική προβολή πάνω στα icon tokens.                                                                                                                                                                                            |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ένα icon web font (TTF, WOFF2) μαζί με το CSS του.                                                                                                                                                                                      |
| [`@pantoken/components`](/api/formats/components/src/) | Βιβλιοθήκη CSS components με εμφάνιση InstUI (button, alert, table, και άλλα) συν ένα βασικό reset με focus ring, στυλιζάρισμα prose, cross-cutting utilities, και τις γραμματοσειρές του brand. Δείτε [Components](/guide/components). |

## Renderers

Ενσωματώσεις framework και εργαλείων.

| Package                                                                                                                                          | Για                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, και ένας token provider.                  |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Το web component, συνδεδεμένο με κάθε framework.                 |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Αντικείμενα token φιλικά προς StyleSheet (χωρίς CSS μεταβλητές). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` και styled primitives, ανεξάρτητα από framework. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Ρύθμιση token για ιστότοπους Astro.                              |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon tokens και swatches σε Markdown.                            |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Ένα plugin για markdown-it για icon codes και color swatches.    |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Ένα type-safe theme για styled-components και Emotion.           |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Ένα θέμα Material UI.                                            |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Γέφυρες CSS-μεταβλητών για Bootstrap και shadcn/ui.              |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Μια υπερκάλυψη ρυθμίσεων Sass και CSS για Foundation.            |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Θέματα για Docusaurus και VitePress.                             |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Ένα Mintlify `docs.json` θέμα (χρώματα + φόντο).                 |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Ένα θέμα Storybook.                                              |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-styled global CSS για οδηγούς Pendo.                 |

## Bundlers

Ενσωματώσεις εργαλείων κατασκευής.

| Package                                             | Για                                                 |
| --------------------------------------------------- | --------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Ένα plugin Vite με virtual modules και ενέσιμη CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` για Next.js `transpilePackages`.     |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Ένα plugin webpack.                                 |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Το `@pantoken;` at-rule.                            |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Ένα Tailwind preset.                                |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Ένα Panda CSS preset.                               |

## Πλατφόρμες

Στόχοι native και γεννήτριες site, εκδομένες από το CLI ή το δικό τους API.

| Package                                                                                        | Έξοδος                                           |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Πηγαίος κώδικας Swift συν stub manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Πόροι Android XML.                               |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                          |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                    |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts για egui ή iced.                     |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Ένα WordPress block-theme `theme.json`.          |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Μια Vanilla Forums `variables.json`.             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Περιουσιακά στοιχεία θέματος Drupal.             |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Δεδομένα ιστότοπου για Hugo και Jekyll.          |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Τιμές φιλικές για ενσωμάτωση σε HTML email.      |

## Σχεδιασμός

Για εργαλεία σχεδίασης.

| Package                                           | Έξοδος                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Ένα payload Figma Variables.                                             |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Χρωματικές παλέτες (ASE, GPL, Sketch) συν ένα οπτικό φύλλο specimen SVG. |

## Plugins

Προαιρετικοί μετασχηματισμοί που επεκτείνουν το token ή το CSS output. Δείτε [Plugins](/guide/plugins).

| Package                                                                               | Τι προσθέτει                                                             |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Ονομασμένοι βάθοι z-index ως `--instui-stacking-*` tokens.               |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Το `-with-visual-debug` outline για debugging layout.                    |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Εικονίδια εμπορικών σημάτων από simple-icons.                            |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Λογότυπα προϊόντων Instructure ως SVGs, data URIs, και image tokens.     |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Ένα PostCSS plugin που απορρίπτει μη χρησιμοποιημένες custom properties. |

## Εργαλεία

Υποδομή build, docs, και demo για το ίδιο το monorepo. Τα περισσότερα είναι εσωτερικά, αλλά τα κομμάτια είναι αυτόνομα, οπότε τα τεκμηριώνουμε εδώ και κάποια εκδίδονται στο npm μόνα τους.

| Package                                            | Τι κάνει                                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Γεννά το ενοποιημένο `pantoken` πακέτο barrel και `exports` από τις εξαρτήσεις του.                                                                                                                          |
| `@pantoken/validate-generated`                     | Η πύλη drift: ελέγχει ότι κάθε παραγόμενη stylesheet επιλύεται έναντι της IR των tokens.                                                                                                                     |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Ο self-hosted live-demo runner: επιλύει ένα `@demo` spec σε iframe και αποδίδει απλό HTML/CSS/JS same-origin, token-themed.                                                                                  |
| `@cssdoc/core` (external)                          | Ένας γενικός εξαγωγέας τεκμηρίωσης CSS (TSDoc, για CSS): αναλύει doc-comments + το CSS AST σε ένα μοντέλο που τα docs εκπέμπουν ως αναφορά CSS API. Ζει σε ξεχωριστό repo; καταναλώνεται ως link dependency. |

`@pantoken/validate-generated` είναι ένα script μιας φοράς (κλήθηκε από `pnpm run ready`), οπότε δεν έχει σελίδα API; οι άλλοι έχουν.

## AI

Περιουσιακά στοιχεία ρυθμίσεων AI για καταναλωτές. Αυτά προορίζονται για έργα που χρησιμοποιούν pantoken, όχι για την ανάπτυξη του pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) εγκαθιστά `AGENTS.md`, `llms.txt`, και κανόνες βοηθού/επεξεργαστή (Cursor, Copilot, Windsurf, Claude Code) σε ένα αποθετήριο καταναλωτή.

## Dev plugins

Plugins που δημιουργούνται για τα εργαλεία με τα οποία δουλεύουμε, ομαδοποιημένα κατά host. Είναι αυτόνομα και εκδοτά.

| Package                                                                                  | Συνδέεται με                                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: μετατρέπει ένα `@demo <provider>:<ref>` block tag σε ενσωματώσιμη demo fence.                   |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: επαναχτίζει upstream workspace πακέτα (και τους εξαρτώμενους) όταν αλλάζει ο πηγαίος τους κώδικας. |
