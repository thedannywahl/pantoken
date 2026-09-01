# CDN et distribution

pantoken publie chaque package sur npm, donc vous pouvez récupérer des tokens, des composants et des web components directement
depuis un CDN — pas d'étape de build, pas de bundler. Cette page couvre l'URL combinée CSS (avec un générateur interactif),
ainsi que les modules d'insertion pour web components.

## La fondation des tokens

Chaque composant pantoken lit les propriétés personnalisées `--instui-*` depuis une feuille de tokens sur la page. Deux
variants sont fournis :

- `@pantoken/css/dist/style.lean.css` — la fondation CDN recommandée. Elle contient tous les tokens sauf l'ensemble complet d'icônes, donc elle pèse environ 23 KB gzip.
- `@pantoken/css/dist/style.css` — la feuille complète, incluant les ~1 777 glyphes d'icônes
  (`--instui-icon-*`). Environ 140 KB gzippés. Chargez celle-ci si vous référez largement des icônes via
  `var(--instui-icon-*)`.

L'échelle d'élévation et les variables de focus-ring sont présentes dans les deux feuilles, donc les ombres et l'anneau de focus fonctionnent avec
seulement la fondation chargée.

## Choisissez vos composants et icônes

Le [sélecteur CDN interactif](/guide/cdn-picker) génère des URLs combinées jsDelivr pour le CSS et des extraits pour les packages JavaScript. Ouvrez-le, cochez ce dont vous avez besoin, et copiez la sortie générée.

- **Onglet Components** — choisissez des feuilles de style de composants individuelles ou tout le barrel `components.css`. Ajoutez le reset de base ou les utilitaires d'espacement/couleur si nécessaire.
- **Onglet JS** — copiez un extrait d'import ESM pour `@pantoken/interactions`.
- **Onglet Icons** — choisissez des icônes individuelles depuis l'ensemble InstUI (~1 800 icônes) ou depuis Simple Icons (~3 300 glyphes de marque). Le sélecteur produit une URL combinée séparée pour les fichiers CSS d'icônes afin que vous puissiez charger uniquement les icônes que vous utilisez réellement.
- **Onglet Web Components** — générez des extraits `@pantoken/web-components` (enregistrement sélectif ESM ou bootstrap script classique).

Chaque fichier de composant est petit — la plupart font autour de 2 KB. Un composant qui rend des icônes (`alert`, `checkbox`,
et quelques autres) a besoin de ces glyphes, donc le générateur ajoute `@pantoken/components/dist/component-icons.css` (environ
0,5 KB gzippé — les 11 icônes utilisées par l'ensemble de composants) chaque fois que vous choisissez la feuille légère. La feuille complète
les contient déjà.

### Ordre de chargement et polices

Chargez d'abord la fondation de tokens, puis le reset de base optionnel, ensuite les fichiers de composants, et enfin les utilitaires — ce sont des utilitaires d'override, ils n'écrasent réellement la règle d'un composant que lorsqu'ils arrivent
après celle-ci dans la cascade. L'URL combinée ci-dessus les ordonne déjà pour vous. Les polices sont la seule exception :
`@pantoken/components/dist/fonts.css` pointe vers des fichiers de polices par chemin relatif, donc la combinaison ne peut pas
les réécrire — chargez-le comme son propre `<link>` :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tout en une fois

Cochez **All components** dans le sélecteur pour le basculer sur le barrel, ou pointez directement dessus (environ 141 KB
gzippés) en parallèle de la feuille de tokens :

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` enregistre des éléments personnalisés `<instui-*>` indépendants du framework. Ils intègrent leur
propre CSS, mais lisent toujours les tokens depuis une feuille sur la page, donc chargez aussi une fondation de tokens.

### Modules ES (recommandé)

Un CDN ESM résout les dépendances du package pour vous. Ceci enregistre chaque élément :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Utilisez la feuille de tokens complète (ou la feuille légère plus `component-icons.css`) afin que les éléments rendant des icônes comme
`<instui-alert>` résolvent leurs glyphes.

Pour n'enregistrer que certains éléments — et leurs dépendances imbriquées — importez `register` et passez `only` :

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Une balise script classique

Pour une insertion sans modules, chargez la build IIFE. Elle regroupe ses dépendances et enregistre automatiquement chaque
élément au chargement, exposant une globale `PantokenWebComponents` :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Elle est plus volumineuse que la voie ESM — elle intègre `@pantoken/components` et `@pantoken/icons` — donc utilisez-la
seulement lorsque vous ne pouvez pas utiliser les modules.

## Verrouiller les versions

Les URLs ci-dessus — et celles écrites par le sélecteur — suivent la dernière release. Épinglez une version majeure (ou exacte)
pour la production — par exemple `@pantoken/css@0` — afin qu'une mise à jour ne vous surprenne jamais.
