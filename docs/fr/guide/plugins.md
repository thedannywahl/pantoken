# Plugins

Un plugin pantoken étend la sortie de tokens ou de CSS sans forker un package. On en construit un avec
`definePlugin` depuis `@pantoken/plugin-kit`, puis on le passe à `buildTokens` ou `toCss`.

## Rédiger un plugin

Donnez à `definePlugin` les hooks que vous implémentez. Il retourne un plugin normal, marqué par les
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

## Enregistrement sensible aux capacités

`buildTokens` et `toCss` exécutent `checkPlugins` sur les plugins que vous passez. Il émet un avertissement — il ne lance jamais d'exception —
lorsqu'un plugin n'a aucun hook correspondant pour l'étape où il est enregistré, ainsi un plugin uniquement axé tokens passé
à `toCss` est ignoré avec une note plutôt que de ne rien faire silencieusement.

## Composer des plugins

S'appuyer sur un autre plugin avec `extendPlugin`, ou combiner des pairs avec `mergePlugin` :

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Les hooks du même stade se composent : `tokens` exécute d'abord la base puis l'ajout, `css` fusionne les deux
contributions, et `icons` exécute les deux.

## Valider la sortie de votre plugin

Exécutez les contrôles de dérive partagés depuis `@pantoken/utils` sur la propre sortie de votre plugin dans son test, afin qu'une
faute de frappe ou un token renommé échoue rapidement et localement :

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Les plugins inclus

- `@pantoken/plugin-simple-icons` — marque les icônes de simple-icons, enregistrées comme tokens d'icônes.
- `@pantoken/plugin-lucide-lab` — icônes Lucide Lab, enregistrées comme tokens image `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos produits Instructure en SVG, data URI, et tokens image `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (pas un plugin pantoken) qui supprime
  les custom properties inutilisées d'une feuille de style.
- `@pantoken/plugin-custom-theme-colors` — rebrand une page en définissant un attribut
  (`data-pantoken-color`) sur l'une des 13 palettes, ou sur `custom` pour n'importe quel hex de marque. Voir
  [Couleurs de thème](#theme-colors).
- `@pantoken/plugin-custom-components` — contrôles personnalisés pilotés par tokens incluant SegmentedControl
  et SkeletonLoader.

### Contrôle segmenté

Utilisez un contrôle segmenté pour deux à cinq vues ou filtres liés. Chaque option est un radio natif étiqueté dans un groupe nommé ; marquez-en un coché initialement. Utilisez des onglets ou un menu déroulant si les options ne tiennent pas confortablement, et utilisez des groupes de boutons pour des actions plutôt que pour des choix. Le style `-size-md` est le
défaut, avec `-size-sm` et `-size-lg` pour des contextes plus compacts ou plus proéminents.

Importez `@pantoken/plugin-custom-components/segmented-control.css` pour le contrôle et ses boutons d'overflow.
Utilisez une classe `-icon-*` sur un label de segment lorsque le segment nécessite un glyphe ; l'aide à l'interaction promeut aussi une classe `-icon-*` depuis son input natif vers le peintre du label.
Donnez au fieldset un `aria-label` descriptif ou une légende visible. L'aide conserve l'annonce native du radio, ajoute la navigation clavier, et révèle optionnellement un segment masqué par pression d'une flèche.
Utilisez des contrôles start/end logiques et des étiquettes de boutons accessibles dans les deux directions :

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Importez `@pantoken/interactions/segmented-control.iife.js` pour l'enregistrement quand le DOM est prêt, ou appelez
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` depuis `@pantoken/interactions`
et appelez `cleanup()` lors de sa suppression. Le CSS et les choix radio natifs fonctionnent sans JS ; les flèches d'overflow nécessitent le comportement. L'élément sélectionné utilise l'ombre à deux couches issue des couleurs sémantiques de drop-shadow ; c'est une ombre d'élément actif distincte plutôt qu'un composite existant `--instui-elevation-*`. Les boutons d'overflow utilisent les tokens de composant elevation3 en amont via `--pantoken-segmented-overflow-shadow`.

### Chargement skeleton

Le sous-chemin `skeleton-loader.css` stylise une forme décorative Text, Avatar, ou Image. Text accepte
`-size-xxs` via `-size-xxl` ; Avatar et Image sont de taille moyenne. Chaque `.skeleton-row` optionnel
ajoute une ligne de texte sans changer la taille. Le scintillement CSS s'arrête après trois balayages de 1,5 seconde et
reste statique lorsque l'utilisateur préfère une réduction des animations. Il fonctionne avant le chargement de JavaScript.

Placez les formes uniquement là où du contenu dépendant d'une requête apparaîtra, pas sur une navigation, des filtres, des titres ou des contrôles connus côté serveur. Un skeleton n'est pas une jauge de progression ni un état d'action occupée. Gardez
le contenu existant visible pendant les rafraîchissements en arrière-plan ; utilisez un spinner ou l'état busy d'un bouton pour les actions.

L'application parente gère le balisage loading, loaded, empty, et error. Fournissez une seule région d'état vide par page et une alerte vide distincte dans le HTML serveur, toutes deux **à l'extérieur** de la région de contenu occupée :

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Appelez le comportement de niveau parent lorsque l'état de la requête change. Il met à jour `aria-busy` et les deux
annonces préexistantes, mais ne remplace jamais le contenu ni ne déplace le focus :

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Si l'on utilise le bundle d'interactions par composant au lieu de l'import direct, dispatch un
événement `pantoken:skeleton-state` sur l'élément `[data-skeleton-region]` avec
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Retarder l'affichage des
placeholders de 200–500 ms pour les requêtes rapides ; le comportement retarde indépendamment l'annonce de chargement de 400 ms. Sur les chargements passifs de page, laissez le focus là où il est. Ne déplacez le focus vers un résultat nouvellement chargé que lorsque l'action de l'utilisateur l'a demandé. Le nœud de statut annonce les résultats et les états vides ; le nœud d'alerte annonce les échecs. Ne combinez pas `aria-busy`, `role="status"`, et
`role="alert"` sur un même élément.

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

Quelques éléments qui étaient autrefois des plugins sont maintenant fournis dans `@pantoken/components`, puisque tant de composants en ont besoin par défaut : ombres d'élévation (`--instui-elevation-*`, dans `components.css`), l'anneau de focus-outline
(dans `base.css` — chaque élément focalisable l'obtient quand pantoken gère la page), et les polices de marque Instructure (Atkinson Hyperlegible Next : `base.css` applique `--instui-font-family-base` ; l'opt-in
`@pantoken/components/fonts.css` charge les woff2s `@font-face`).

## Couleurs de thème {#theme-colors}

`@pantoken/plugin-custom-theme-colors` émet un bloc `[data-pantoken-color="…"]` par palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Chaque bloc pointe les primitives de marque (`--instui-primitive-color-navy-*` et `-blue-*`)
vers la palette choisie. Il re-dérive également les surfaces de marque que l'amont avait aplaties en hex littéral,
conservant leur alpha cuit via `color-mix()`. Les couleurs sémantiques d'état, les accents bleus explicites, et
les ombres d'élévation restent en place. Essayez-le dans la
[démonstration de theming basée sur swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Couleur de marque personnalisée

Définissez `data-pantoken-color="custom"` pour rebrander depuis n'importe quel hex, par exemple la couleur primaire qu'un administrateur Canvas
saisit dans l'éditeur de thème. pantoken dérive une échelle complète 10–200 `--instui-primitive-color-custom-*`
à partir de celle-ci :

1. **Courbe de référence.** La target de clarté (lightness) de chaque étape est la moyenne OKLCH de clarté des 13
   palettes à cette étape, avec 0 fixé au blanc et 210 au noir. Ainsi l'espacement de l'échelle personnalisée
   correspond à celui des palettes fournies.
2. **Ancrage.** L'entrée tombe sur l'étape dont la clarté cible est la plus proche de la sienne, puis s'aligne sur
   cette clarté exacte. `#cccccc` devient `custom-40` à `#c9c9c9` : proche de l'entrée, mais pas
   toujours identique. "Le plus proche" signifie l'étape la plus proche sur la courbe, pas la couleur existante la plus proche.
3. **Remplissage.** Chaque autre étape garde la teinte (hue) de l'entrée. Sa saturation suit la courbe de saturation moyenne des palettes par rapport à l'ancrage, et n'est réduite que lorsqu'une couleur sort de l'espace sRGB.

Seuls `#rgb` et `#rrggbb` sont acceptés ; tout autre format déclenche une `TypeError`, donc un hex provenant d'un formulaire
ne peut pas injecter du CSS.

Au moment du build, émettez la règle complète avec les primitives dérivées déjà déclarées :

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Pour choisir la couleur à l'exécution sans expédier l'ensemble des tokens, précalculez la courbe et la règle de remappage
au build. Puis utilisez l'entrée sans dépendance `/scale` dans le navigateur, et ne définissez que les 20
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

Le sélecteur de thème du site de docs, l'éditeur de thème Canvas, et la démo ci-dessus fonctionnent tous de cette façon.

Consultez la [référence API](/api/) pour les exports de chaque plugin.
