# Bien commencer

Pantoken prend les tokens de design et les icônes d’[Instructure UI](https://instructure.design), les résout une fois, puis transforme ce modèle unique
en paquets pour de nombreuses plateformes : feuilles de style simples, SCSS et Less, React et Vue et Svelte,
Tailwind et Panda, natif Swift et Kotlin, WordPress et Drupal, Figma, et plus encore.

Installez le plus petit paquet adapté à votre tâche. Tout est également ré-exporté par le paquet unifié
`pantoken`, donc vous pouvez commencer par là et vous restreindre ensuite.

## Créer un projet de départ

La façon la plus rapide d’essayer pantoken : générer un projet de départ avec pantoken déjà installé et connecté.

```sh
npx create-pantoken-app
```

Plateformes : `components` (HTML/CSS pur), `react`, `vue`, `svelte`, `web-components`, `angular`. Voir
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) pour `--dir <path>` et
l’utilisation programmatique.

Utilisez-vous un agent de codage IA ? Aucune installation nécessaire — pointez-le directement sur la skill :

```prompt
Téléchargez create.pantoken.app/SKILL.md et suivez ses instructions pour configurer pantoken dans ce projet.
```

Si vous préférez intégrer de façon permanente les règles d’agent de pantoken dans le dépôt (AGENTS.md, règles d’éditeur, une copie locale de cette skill), exécutez plutôt `npx @pantoken/ai init`.

## Le modèle de tokens

Les tokens sont des propriétés personnalisées CSS nommées `--instui-<group>-<name>`, par exemple
`--instui-color-background-brand` ou `--instui-spacing-space-md`. Trois thèmes sont fournis : `rebrand`
(par défaut, avec `light-dark()` là où clair et sombre diffèrent), `canvas`, et `canvasHighContrast`.
Les icônes sont des tokens `<image>` (`--instui-icon-<name>`) dérivés de Lucide plus les glyphes personnalisés d’Instructure.

## Styliser une application web

Installez la feuille de style et importez-la une fois. Elle définit chaque propriété `--instui-*`, donc vous pouvez
les référencer directement depuis votre propre CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Utiliser les icônes n’importe où

Le composant web fonctionne dans n’importe quel framework, sans portage.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Les icônes sont des propriétés personnalisées CSS (`--instui-icon-<name>`). Chargez la feuille de style une fois et référez n’importe quelle
icône comme un `mask-image` ou un `background-image` — aucun import par icône nécessaire.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icône unique vs ensemble complet

`@pantoken/icons` expose deux exports nommés. Utilisez `iconsByName` pour extraire une icône sans itérer
sur le tableau complet :

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Utilisez `icons` lorsque vous avez besoin de l’ensemble complet (p. ex. pour construire un sélecteur) :

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Les deux exports chargent l’IR complet à l’initialisation du module — il n’y a pas d’optimisation d’arbre par icône à ce
niveau. Pour un chargement optimisé en CSS seulement, utilisez le [sélecteur CDN](/guide/cdn-picker) pour générer une URL combinée
contenant uniquement les icônes dont vous avez besoin.

## Générer pour une plateforme native

Le CLI écrit la source des tokens dans un dépôt cible. Aucune installation au-delà du runner :

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Voir [le CLI pantoken](/guide/cli) pour chaque cible.

## Indications pour l’édition dans VS Code

`@pantoken/pantoken` fournit désormais des fichiers custom-data pour VS Code afin que les projets consommateurs puissent obtenir la complétion des classes et des tokens en HTML/CSS sans installer une extension spécifique à pantoken.

1. Installez le paquet unifié :

```sh
npm i @pantoken/pantoken
```

1. Pointez VS Code vers le JSON custom-data fourni depuis votre espace de travail consommateur :

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Rechargez VS Code (ou exécutez « Developer: Reload Window ») pour appliquer les nouvelles données.

Cela active des suggestions pour les tokens de classes `instui-*` (et les tokens de classes `-modifier`) ainsi que
les propriétés personnalisées `--instui-*`.

## Où aller ensuite

- [La carte des paquets](/guide/packages) — quel paquet atteindre selon la tâche.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer les assets et règles d’agent dans un dépôt consommateur.
- [Architecture](/guide/architecture) — comment le modèle de tokens, le core et les sorties s’articulent.
- [Référence API](/api/) — chaque symbole exporté, généré depuis la source.
