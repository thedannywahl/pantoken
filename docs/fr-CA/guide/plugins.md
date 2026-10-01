# Plugins

Un plugin pantoken étend la sortie de tokens ou de CSS sans forker un paquet. On en construit un avec
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
lorsqu'un plugin n'a pas de hook correspondant à l'étape où il est enregistré, donc un plugin qui ne fait que des tokens passé
à `toCss` est ignoré avec une note plutôt que de ne rien faire en silence.

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

Exécutez les vérifications de dérive partagées depuis `@pantoken/utils` sur la sortie de votre plugin dans son test, ainsi une
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

- `@pantoken/plugin-simple-icons` — icônes de marque depuis simple-icons, enregistrées comme tokens d'icônes.
- `@pantoken/plugin-lucide-lab` — icônes Lucide Lab, enregistrées comme tokens image `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos produit Instructure en SVG, data URIs, et tokens image `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (pas un plugin pantoken) qui supprime
  les propriétés personnalisées inutilisées d'une feuille de style.
- `@pantoken/plugin-custom-theme-colors` — rebrand une page en définissant un attribut
  (`data-pantoken-color`) sur une des 13 palettes, ou sur `custom` pour n'importe quel hex de marque. Voir
  [Couleurs de thème](#theme-colors).
- `@pantoken/plugin-custom-components` — contrôles personnalisés basés sur des tokens incluant SegmentedControl
  et SkeletonLoader.

### Contrôle segmenté

Utiliser un contrôle segmenté pour deux à cinq vues ou filtres liés. Chaque option est un radio natif étiqueté
dans un groupe nommé ; en marquer un coché initialement. Utiliser des onglets ou un menu déroulant si les options ne tiennent pas
confortablement, et utiliser des groupes de boutons pour des actions plutôt que pour des choix. Le style `-size-md` est le
par défaut, avec `-size-sm` et `-size-lg` pour des contextes plus serrés ou plus proéminents.

Importer `@pantoken/plugin-custom-components/segmented-control.css` pour le contrôle et ses boutons d'overflow.
Utiliser une classe `-icon-*` sur l'étiquette d'un segment quand le segment a besoin d'un glyphe ; l'aide d'interaction
promeut aussi une classe `-icon-*` depuis son input natif vers le peintre d'étiquette.
Donner au fieldset un `aria-label` descriptif ou une légende visible. L'aide préserve l'annonce native
du radio, ajoute la navigation au clavier, et révèle optionnellement un segment masqué par pression de flèche.
Utiliser des contrôles de début/fin logiques et des étiquettes de bouton accessibles dans les deux directions :

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

Importer `@pantoken/interactions/segmented-control.iife.js` pour l'enregistrement quand le DOM est prêt, ou appeler
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` depuis `@pantoken/interactions`
et appeler `cleanup()` lors de sa suppression. Le CSS et les choix radio natifs fonctionnent sans JS ; les flèches d'overflow
nécessitent le comportement. L'élément sélectionné utilise l'ombre de design à deux couches issue des couleurs
sémantiques drop-shadow ; c'est une ombre d'élément-actif distincte plutôt qu'un composite
`--instui-elevation-*` existant. Les boutons d'overflow utilisent les tokens de composant elevation3 en amont
via `--pantoken-segmented-overflow-shadow`.

### Chargement skeleton

Le sous-chemin `skeleton-loader.css` stylise une forme décorative Text, Avatar, ou Image. Text accepte
`-size-xxs` via `-size-xxl` ; Avatar et Image sont de taille moyenne. Chaque `.skeleton-row`
optionnel ajoute une ligne de texte sans changer la taille. Le scintillement CSS s'arrête après trois balayages de 1.5s et
reste statique quand l'utilisateur préfère une réduction des animations. Il fonctionne avant que JavaScript ne soit chargé.

Placer les formes uniquement là où du contenu dépendant d'une requête apparaîtra, pas au-dessus d'une navigation,
filtres, titres ou contrôles connus côté serveur. Un skeleton n'est pas une jauge de progression ni un état d'occupation d'action. Garder
le contenu existant visible pendant les actualisations en arrière-plan ; utiliser un spinner ou un état "busy" sur un bouton pour les actions.

L'application parente possède le balisage loading, loaded, empty et error. Prévoir une région de statut vide
par page et une alerte vide séparée dans le HTML serveur, toutes deux **en dehors** de la région de contenu occupée :

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

Appeler le comportement de niveau parent quand l'état de la requête change. Il met à jour `aria-busy` et les deux
annonces préexistantes, mais il ne remplace jamais le contenu ni ne déplace le focus :

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

Si on utilise le bundle d'interactions par composant au lieu de l'import direct, dispatcher un
événement `pantoken:skeleton-state` sur l'élément `[data-skeleton-region]` avec
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Retarder l'affichage des
placeholders de 200–500ms pour les requêtes rapides ; le comportement retarde indépendamment l'annonce de chargement
de 400ms. Sur des chargements de page passifs, laisser le focus là où il est. Ne déplacer le focus vers un résultat nouvellement
chargé que si l'action de l'utilisateur l'a demandé. Le nœud de statut annonce les résultats et les états vides ; le nœud d'alerte annonce les échecs. Ne pas combiner `aria-busy`, `role="status"`, et
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

Quelques éléments qui étaient auparavant des plugins sont maintenant fournis dans `@pantoken/components`, vu que beaucoup de composants en ont
besoin par défaut : les ombres d'élévation (`--instui-elevation-*`, dans `components.css`), la bague focus-outline
(dans `base.css` — chaque élément focusable l'obtient quand pantoken contrôle la page), et les polices de marque Instructure
(Atkinson Hyperlegible Next : `base.css` applique `--instui-font-family-base` ; le chargement opt-in
`@pantoken/components/fonts.css` charge les woff2s `@font-face`).

## Couleurs de thème {#theme-colors}

`@pantoken/plugin-custom-theme-colors` émet un bloc `[data-pantoken-color="…"]` par palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Chaque bloc oriente les primitives de marque (`--instui-primitive-color-navy-*` et `-blue-*`)
vers la palette choisie. Il redérive aussi les surfaces de marque que l'amont avait aplaties en hex littéraux,
conservant leur alpha cuit via `color-mix()`. Les couleurs sémantiques de statut, les accents bleus explicites, et
les ombres d'élévation restent en place. Essayez-le dans la
[démonstration de theming basée sur des nuanciers](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Couleur de marque personnalisée

Définir `data-pantoken-color="custom"` pour rebrander depuis n'importe quel hex, comme la couleur primaire qu'un administrateur Canvas
saisit dans l'éditeur de thème. pantoken dérive une échelle complète 10–200 `--instui-primitive-color-custom-*`
à partir de celle-ci :

1. **Courbe de référence.** La clarté cible de chaque pas est la moyenne OKLCH de la clarté des 13
   palettes à ce pas, avec 0 fixé au blanc et 210 au noir. Ainsi l'espacement de l'échelle personnalisée
   correspond à celui des palettes fournies.
2. **Ancrage.** L'entrée se place sur le pas dont la clarté cible est la plus proche de la sienne, puis s'aligne sur
   cette clarté exacte. `#cccccc` devient `custom-40` à `#c9c9c9` : proche de l'entrée, mais pas
   toujours identique. "Le plus proche" signifie le pas le plus proche sur la courbe, pas la couleur existante la plus proche.
3. **Remplissage.** Chaque autre pas conserve la teinte de l'entrée. Sa saturation suit la courbe de saturation moyenne des palettes
   relative à l'ancre, et n'est réduite que lorsqu'une couleur sort de l'espace sRGB.

Seuls `#rgb` et `#rrggbb` sont acceptés ; tout le reste lève une `TypeError`, donc un hex issu d'un formulaire
ne peut pas injecter du CSS.

Au moment du build, émettre la règle entière avec les primitives dérivées déjà déclarées :

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Pour choisir la couleur à l'exécution sans expédier l'ensemble de tokens, pré-calculer la courbe et la règle de remappage
au moment du build. Ensuite utiliser l'entrée sans dépendance `/scale` dans le navigateur, et définir seulement les 20
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

Le sélecteur de thème du site de la doc, l'éditeur de thème Canvas, et la démo ci‑dessus fonctionnent tous ainsi.

Consulter la [référence d'API](/api/) pour les exports de chaque plugin.
