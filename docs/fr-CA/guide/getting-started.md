# Démarrage

pantoken prend les design tokens et icônes d’Instructure UI, les résout une fois, et transforme ce modèle unique en packages pour de nombreuses plateformes : feuilles de style simples, SCSS et Less, React, Vue et Svelte, Tailwind et Panda, natif Swift et Kotlin, WordPress et Drupal, Figma, et plus encore.

Installez le plus petit package adapté à votre tâche. Tout est aussi ré-exporté par le package unifié `pantoken`, donc vous pouvez commencer là et préciser plus tard.

## Échafauder un projet de démarrage

La façon la plus rapide d’essayer pantoken : échafauder un projet de démarrage avec pantoken déjà installé et connecté.

```sh
npx create-pantoken-app react
```

Plateformes : `components` (HTML/CSS pur), `react`, `vue`, `svelte`, `web-components`, `angular`. Voir
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) pour `--dir <path>` et
l’utilisation programmatique.

Utiliser un agent de codage IA ? Aucune installation requise — pointez-le directement vers la compétence :

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Fonctionne de la même manière pour Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI et Amazon Q Developer CLI — remplacez `claude` par `gemini`, `agent`, `codex`, `copilot -p` ou `q chat`. Si vous préférez intégrer en permanence les règles d’agent de pantoken au dépôt (AGENTS.md, règles d’éditeur, copie locale de cette compétence), exécutez plutôt `npx @pantoken/ai init`.

## Le modèle de tokens

Les tokens sont des variables CSS personnalisées nommées `--instui-<group>-<name>`, par exemple
`--instui-color-background-brand` ou `--instui-spacing-space-md`. Trois thèmes sont fournis : `rebrand`
(le défaut, avec `light-dark()` lorsque le clair et le sombre diffèrent), `canvas`, et `canvasHighContrast`.
Les icônes sont des tokens `<image>` (`--instui-icon-<name>`) dérivés de Lucide plus les glyphes personnalisés d’Instructure.

## Styliser une application web

Installez la feuille de style et importez-la une seule fois. Elle définit chaque propriété `--instui-*`, vous pouvez donc les référencer directement depuis votre propre CSS.

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

## Utiliser les icônes partout

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

Les icônes sont des propriétés CSS personnalisées (`--instui-icon-<name>`). Chargez la feuille de style une fois et référencez n’importe quelle icône comme `mask-image` ou `background-image` — pas besoin d’import par icône.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icône unique vs. ensemble complet

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

Les deux exports chargent l’IR complet à l’initialisation du module — il n’y a pas d’arbre-shaking par icône à ce niveau. Pour un chargement léger en CSS uniquement, utilisez le [sélecteur CDN](/guide/cdn-picker) pour générer une URL combinée ne contenant que les icônes nécessaires.

## Générer pour une plateforme native

Le CLI écrit la source des tokens dans un dépôt cible. Aucune installation au-delà du runner :

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Voir [le CLI pantoken](/guide/cli) pour chaque cible.

## Astuces d’édition VS Code

`@pantoken/pantoken` fournit maintenant des fichiers custom-data pour VS Code afin que les projets consommateurs obtiennent la complétion de classes et de tokens en HTML/CSS sans installer une extension spécifique à pantoken.

1. Installer le package unifié :

```sh
npm i @pantoken/pantoken
```

1. Pointer VS Code vers le JSON custom-data fourni depuis votre espace de travail consommateur :

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Recharger VS Code (ou exécuter « Developer: Reload Window ») pour appliquer les nouvelles données.

Cela active les suggestions pour les tokens de classe `instui-*` (et les tokens de classe `-modifier`) ainsi que pour les propriétés personnalisées `--instui-*`.

## Où aller ensuite

- [La carte des packages](/guide/packages) — quel package atteindre pour quelle tâche.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer les assets et règles d’agent dans un dépôt consommateur.
- [Architecture](/guide/architecture) — comment le modèle de tokens, le core et les sorties s’imbriquent.
- [Référence API](/api/) — chaque symbole exporté, généré depuis la source.
