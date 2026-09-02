# CDN et distribution

pantoken publie chaque paquet sur npm, donc vous pouvez récupérer des tokens, des composants et des web components directement
depuis un CDN — pas d'étape de build, pas de bundler. Cette page couvre l'URL combinée CSS (avec un générateur interactif),
ainsi que les drop-ins de web components.

## La base de tokens

Chaque composant pantoken lit les propriétés personnalisées `--instui-*` depuis une feuille de tokens sur la page. Deux
variantes sont fournies :

- `@pantoken/css/dist/style.lean.css` — la fondation CDN recommandée. Elle contient tous les tokens sauf
  l'ensemble complet d'icônes, donc elle pèse environ 23 KB gzippés.
- `@pantoken/css/dist/style.css` — la feuille complète, incluant les ~1 777 glyphes d'icônes
  (`--instui-icon-*`). Environ 140 KB gzippés. Chargez celle-ci si vous référencez des icônes largement via
  `var(--instui-icon-*)`.

L'échelle d'élévation et les variables de focus-ring se trouvent dans les deux feuilles, donc les ombres et l'anneau de focus fonctionnent avec
seulement la fondation chargée.

## Choisissez vos composants et icônes

Le [sélecteur CDN interactif](/guide/cdn-picker) génère des URLs combinées jsDelivr pour le CSS et des extraits pour les paquets JavaScript. Ouvrez-le, cochez ce dont vous avez besoin, et copiez la sortie générée.

- **Onglet Components** — choisissez des feuilles de style de composants individuelles ou tout le baril `components.css`. Ajoutez la réinitialisation de base ou les utilitaires d'espacement/couleur si nécessaire.
- **Onglet JS** — copiez un extrait d'import ESM pour `@pantoken/interactions`.
- **Onglet Icons** — choisissez des icônes individuelles de l'ensemble InstUI (~1 800 icônes) ou de Simple Icons (~3 300 glyphes de marques). Le sélecteur produit une URL combinée séparée pour les fichiers CSS d'icônes afin que vous puissiez charger seulement les icônes que vous utilisez réellement.
- **Onglet Web Components** — générez des extraits `@pantoken/web-components` (enregistrement sélectif ESM ou bootstrap script classique).

Chaque fichier de composant est petit — la plupart sont autour de 2 KB. Un composant qui rend des icônes (`alert`, `checkbox`,
et quelques autres) a besoin de ces glyphes, donc le générateur ajoute `@pantoken/components/dist/component-icons.css` (environ
0,5 KB gzippés — les 11 icônes utilisées par l'ensemble de composants) quand vous choisissez la feuille allégée. La feuille complète
les contient déjà.

### Ordre de chargement et polices

Chargez d'abord la fondation de tokens, puis la réinitialisation de base optionnelle, ensuite les fichiers de composants, et enfin les utilitaires — ce sont des utilitaires d'override, donc ils n'écrasent réellement la règle d'un composant que s'ils sont chargés
après celui-ci dans la cascade. L'URL combinée ci-dessus les ordonne déjà pour vous. Les polices sont la seule exception :
`@pantoken/components/dist/fonts.css` pointe vers des fichiers de polices par chemin relatif, donc la combinaison ne peut pas les réécrire — chargez-la comme son propre `<link>` :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tout en même temps

Cochez **All components** dans le sélecteur pour le basculer sur le baril, ou pointez-y vous-même (environ 141 KB
gzippés) en parallèle de la feuille de tokens :

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` enregistre des éléments personnalisés `<instui-*>` agnostiques au framework. Ils incluent leur
propre CSS inline, mais lisent toujours les tokens depuis une feuille sur la page, donc chargez aussi une fondation de tokens.

### Modules ES (recommandé)

Un CDN ESM résout les dépendances du paquet pour vous. Ceci enregistre tous les éléments :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Utilisez la feuille de tokens complète (ou la feuille allégée plus `component-icons.css`) de sorte que les éléments rendant des icônes comme
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

Pour un drop-in sans modules, chargez le build IIFE. Il regroupe ses dépendances et enregistre automatiquement chaque
élément au chargement, exposant une globale `PantokenWebComponents` :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Elle est plus grosse que la voie ESM — elle intègre `@pantoken/components` et `@pantoken/icons` — donc préférez-la
seulement lorsque vous ne pouvez pas utiliser les modules.

## Verrouiller les versions

Les URLs ci-dessus — et celles écrites par le sélecteur — suivent la dernière release. Épinglez une version majeure (ou exacte)
pour la production — par exemple `@pantoken/css@0` — afin qu'une mise à jour ne vous surprenne jamais.
