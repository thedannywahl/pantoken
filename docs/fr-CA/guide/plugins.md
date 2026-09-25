# Plugins

Un plugin pantoken étend la sortie de tokens ou de CSS sans forker un paquet. On en crée un avec
`definePlugin` depuis `@pantoken/plugin-kit`, puis on le passe à `buildTokens` ou `toCss`.

## Créer un plugin

Donnez à `definePlugin` les hooks que vous implémentez. Il retourne un plugin normal, marqué avec les
capacités déduites de ces hooks. Un plugin peut étendre l'IR (`tokens`, `icons`), la sortie CSS
(`css`), ou les deux.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Enregistrement conscient des capacités

`buildTokens` et `toCss` exécutent `checkPlugins` sur les plugins que vous passez. Ils avertissent — ils ne lèvent jamais d'exception —
lorsqu'un plugin n'a aucun hook correspondant à l'étape où il est enregistré, donc un plugin uniquement pour tokens passé
à `toCss` est ignoré avec une note plutôt que d'être silencieusement inactif.

## Composer des plugins

S'appuyer sur un autre plugin avec `extendPlugin`, ou combiner des pairs avec `mergePlugin` :

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Les hooks de même étape se composent : `tokens` exécute d'abord la base puis l'ajout, `css` fusionne les deux
contributions, et `icons` exécute les deux.

## Valider la sortie de votre plugin

Exécutez les vérifications de drift partagées depuis `@pantoken/utils` sur la sortie de votre plugin dans son test, afin qu'une
faute de frappe ou un token renommé échoue rapidement et localement :

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Les plugins fournis

- `@pantoken/plugin-simple-icons` — marque les icônes de simple-icons, enregistrées comme tokens d'icônes.
- `@pantoken/plugin-lucide-lab` — icônes Lucide Lab, enregistrées comme tokens image `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos produits Instructure en SVG, URI de données, et tokens image `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (pas un plugin pantoken) qui retire
  les propriétés personnalisées inutilisées d'une feuille de style.
- `@pantoken/plugin-custom-theme-colors` — rebrand une page en définissant un attribut
  (`data-pantoken-color`) sur l'une des 13 palettes, ou sur `custom` pour n'importe quel hex de marque. Voir
  [Couleurs de thème](#theme-colors).

Le registre de Lucide Lab peut être chargé paresseusement, puis passé au hook de token synchrone :

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Quelques éléments qui étaient autrefois des plugins sont maintenant inclus dans `@pantoken/components`, puisque tant de composants
en ont besoin immédiatement : ombres d'élévation (`--instui-elevation-*`, dans `components.css`), l'anneau de contour de focus
(dans `base.css` — chaque élément focalisable l'obtient quand pantoken gère la page), et les polices de marque Instructure
(Atkinson Hyperlegible Next : `base.css` applique `--instui-font-family-base` ; le chargement opt-in
`@pantoken/components/fonts.css` charge les woff2 `@font-face`).

## Couleurs de thème

`@pantoken/plugin-custom-theme-colors` émet un bloc `[data-pantoken-color="…"]` par palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Chaque bloc oriente les primitives de marque (`--instui-primitive-color-navy-*` et `-blue-*`)
vers la palette choisie. Il re-dérive aussi les surfaces de marque que l'amont avait aplaties en hex littéraux,
conservant leur alpha cuit via `color-mix()`. Les couleurs d'état sémantiques, les accents bleus explicites, et
les ombres d'élévation restent inchangés. Essayez-le dans la
[démonstration de theming basée sur des nuanciers](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Couleur de marque personnalisée

Définissez `data-pantoken-color="custom"` pour rebrander depuis n'importe quel hex, comme la couleur primaire qu'un administrateur Canvas
saisit dans l'éditeur de thème. pantoken dérive une échelle complète 10–200 `--instui-primitive-color-custom-*`
à partir de celle-ci :

1. **Courbe de référence.** La luminosité cible de chaque étape est la luminosité OKLCH moyenne des 13
   palettes à cette étape, avec 0 fixé au blanc et 210 au noir. Ainsi, l'espacement de l'échelle personnalisée
   correspond à celui des palettes fournies.
2. **Ancrage.** La valeur d'entrée tombe sur l'étape dont la luminosité cible est la plus proche de la sienne, puis s'aligne sur
   cette luminosité exacte. `#cccccc` devient `custom-40` à `#c9c9c9` : proche de l'entrée, mais pas
   toujours identique. « Le plus proche » signifie l'étape la plus proche sur la courbe, pas la couleur existante la plus similaire.
3. **Remplissage.** Toutes les autres étapes conservent la teinte de l'entrée. Sa saturation suit la courbe de saturation moyenne des palettes
   relative à l'ancre, et n'est réduite que lorsqu'une couleur sort de l'espace sRGB.

Seuls `#rgb` et `#rrggbb` sont acceptés ; tout autre format lance un `TypeError`, donc un hex issu d'un formulaire
ne peut pas injecter du CSS.

Au moment de la construction, émettez toute la règle avec les primitives dérivées déjà déclarées :

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Pour choisir la couleur à l'exécution sans livrer l'ensemble des tokens, pré-calculer la courbe et la règle de remappage
à la construction. Puis utilisez l'entrée sans dépendance `/scale` dans le navigateur, et définissez seulement les 20
primitives dérivées :

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Le sélecteur de thème du site de docs, l'éditeur de thème Canvas et la démo ci‑dessus fonctionnent tous de cette façon.

Voir la [référence API](/api/) pour les exports de chaque plugin.
