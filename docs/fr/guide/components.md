# Composants

`@pantoken/components` fournit des styles de composants basés sur des classes construits à partir des tokens Instructure. Importez la feuille de style et marquez votre balisage — aucun framework requis.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Préfèrez les éléments personnalisés ? `@pantoken/web-components` encapsule ces mêmes styles en tant que `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, et plus — voir la
> [carte des paquets](/guide/packages).

## Conventions

Les conventions CSS de ce paquet sont basées sur une version modifiée de [RSCSS](https://ricostacruz.com/rscss/index.html).

Les modificateurs sont **clé-valeur** — `-<prop>-<val>`, alignés sur les noms de props InstUI — ils se lisent donc eux-mêmes : `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Les props booléennes sont le seul nom de la prop, la présence signifiant `true` (`-has-shadow`, `-clickable`) ; une booléenne activée par défaut désactivée s'inverse (`-without-background`, `-without-border`). Les tailles acceptent les formes courtes et longues (`-size-sm` = `-size-small`). Lorsqu'un nom diffère d'InstUI, la classe sémantique InstUI fonctionne toujours mais est dépréciée (p.ex. `-variant-info` → utiliser `-color-info`).

### Exemple

Composant React d'Instructure UI :

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

composants pantoken :

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

Pour la prop `timeout` d'InstUI, définissez la propriété personnalisée sans unité `--timeout` en millisecondes et chargez l'interaction Alert. Une valeur positive programme la fermeture ; `0` (la valeur par défaut) laisse l'alerte en place. Ajoutez les classes `instui-transition -fade-entered` de l'utilitaire `transition` pour le fondu d'InstUI ; omettez-les pour une suppression immédiate. L'interaction pilote l'état `-fade-exiting` et déclenche un événement annulable et en bulle `dismiss` avant la suppression, permettant à une application d'appeler `preventDefault()` pour garder l'alerte montée.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Les barres de progression acceptent des échelles arbitraires via `--min` (`0` par défaut), `--value`, et `--max`
(`100` par défaut), avec les alias dépréciés `--value-now` et `--value-max`. Ajoutez `-should-animate`
pour appliquer la transition d'une demi-seconde d'InstUI chaque fois qu'une valeur change. `.value` coexiste avec `.bar` comme
enfant de la racine ; ajoutez `-render-value-inside` pour le rendre au-dessus de la piste, aligné sur son début,
à la place (stylisez-le pour la lisibilité contre la couleur du mètre). Utilisez un `<progress>` natif pour une
plage à base zéro et `<meter>` lorsque le minimum n'est pas zéro ; les web components les choisissent automatiquement à partir de leur attribut `min`. InstUI n'a pas d'état indéterminé, donc un `<progress>`
sans son attribut `value` est une estimation propre à pantoken : `progress-bar` anime `.bar` comme un
segment coulissant et `progress-circle` fait tourner son anneau à un arc fixe, masquant tous deux `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Les cercles de progression acceptent les mêmes échelles arbitraires via `--min`, `--value`, et `--max`.
`--value-now` et `--value-max` restent des alias fonctionnels dépréciés. Ajoutez `-should-animate` et
chargez le bundle d'interaction focused pour reproduire l'animation de montage d'InstUI ; `--animation-delay` est un
délai sans unité en millisecondes. Les orthographes dépréciées `-should-animate-on-mount` et
`-shold-animate-on-mount` restent des alias fonctionnels.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Préfixe de classe

Chaque classe est préfixée par défaut par `instui-`. Construisez une feuille de style avec votre propre préfixe — ou aucun — en
passant `prefix` à n'importe quel builder. Toute valeur falsy (`null`, `undefined`, `""`, ou omission) supprime le
préfixe entièrement, vous permettant d'écrire `class="heading -level-h1"` au lieu de `class="instui-heading -level-h1"` :

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Les modificateurs préfixés par un tiret (`.-color-secondary`, `.-level-h1`) restent inchangés dans tous les cas. Les
feuilles de style fournies par le paquet conservent le préfixe `instui`.

## Base

`base.css` est une réinitialisation opt-in qui définit des valeurs par défaut globales du document à partir des tokens : `box-sizing`, une
réinitialisation `body`, la surface de la page, la couleur et la police de base du texte, `color-scheme` (afin que les tokens `light-dark()` et les contrôles natifs suivent le thème), et un lien de base. Chargez-la une fois, avant les feuilles de composants et de prose, lorsque pantoken possède la page.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Ne l'utilisez pas si vous intégrez des composants dans un hôte qui thématise déjà sa propre `html` et `body` —
la réinitialisation peint la surface de la page, donc vous ne voulez pas qu'elle entre en conflit avec l'hôte. Tout ce qu'elle définit utilise
des sélecteurs `:where()` de faible spécificité, donc vos propres règles gagnent toujours.

`base.css` _applique_ la police de la marque (`font-family: var(--instui-font-family-base)`, avec repli système) ; pour _la charger_, importez l'opt-in `fonts.css` — les règles `@font-face` pour Atkinson Hyperlegible
Next, pointant vers les woff2 fournis dans le paquet. C'est séparé parce que les fontes font ~350 kB et l'auto-hébergement des polices est un choix délibéré.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contenu pour lecteur d'écran

<p>Il y a un message caché après cette phrase.<span class="instui-screen-reader-content">Seuls les lecteurs d'écran l'annoncent.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` cache visuellement un élément tout en le gardant dans l'arborescence d'accessibilité
— pour les labels et textes d'état que la technologie d'assistance doit lire mais que le design ne doit pas afficher.

## Utilitaires

`utilities.css` est une couche opt-in de classes transversales : un primitif `View`, de l'espacement sur l'échelle de tokens, et des surcharges sémantiques de couleur. Contrairement aux classes `-modifier` des composants, celles-ci utilisent un **double tiret** (`--mod`) pour ne jamais entrer en conflit avec les noms de modificateurs d'un composant, et elles s'appliquent à n'importe quel élément — nu, ou composé sur un composant.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Surface accent-blue avec texte on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centré avec mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` est le `View` d'InstUI. C'est la base sur laquelle on superpose espacement et couleur, et elle
porte des modificateurs clé-valeur pour ses propres props visuelles afin que vous n'ayez pas à recourir aux utilitaires :
`-background-*` (ses surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, et `-cursor-*` — ce sont les modificateurs à tiret unique propres à `view`, sans lien avec les utilitaires à double tiret ci-dessous. Les props à valeur libre
(largeur/hauteur/inset) restent en styles inline ; `margin`/`padding` utilisent les utilitaires d'espacement.

**Espacement** — classes par côté sur l'échelle d'espacement. Lisez-les comme `{m|p}{side}-{step}`: `m` pour
la marge ou `p` pour le padding (ou les mots complets `margin`/`padding`), un côté logique optionnel, puis un
pas. Ainsi `.--m-lg` et `.--margin-lg` sont identiques, tout comme `.--pt-md` et `.--paddingt-md`.

- Côtés : none (tous), `t`/`b` (début/fin de bloc), `s`/`e` (début/fin inline), `x`/`y` (axe inline/block). Les côtés logiques restent corrects en disposition droite-à-gauche.
- Pas : `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` pour la marge uniquement.

Composez-les pour l'abréviation `margin="small auto large"` d'InstUI :
`class="--mt-sm --mx-auto --mb-lg"`.

**Couleur** — surcharges sémantiques qui restent sur la palette : `.--bg-<name>` (arrière-plan),
`.--text-<name>` (couleur du texte), et `.--border-<name>` (couleur de la bordure). Chaque `<name>` est un
token de couleur sémantique — les intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus la palette `accent-*` (`accent-blue`, `accent-green`, etc.). Un nom n'existe que si le token existe dans cette famille, donc `text-brand` n'est pas une classe — le texte n'a pas de token brand. Il n'y a pas de moyen d'atteindre un primitif ou un hex arbitraire, et chaque surcharge suit le thème.

**Familles de tokens** — chaque famille "un token, une propriété" obtient une classe par token, nommée d'après le token. Composez-les librement :

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (et `-depth1`…`-card`) → `box-shadow`

Chacune définit uniquement sa propriété, donc `border-width`/`border-radius` ont besoin d'une couleur `border-*` et d'un style de bordure pour réellement dessiner une bordure. Celles-ci utilisent le nom de token complet (`.--border-radius-md`), tandis que les aides couleur et espacement ci-dessus utilisent des alias courts (`.--bg-brand`, `.--mt-lg`) — les alias sont des raccourcis ergonomiques ; les classes token sont littérales et exhaustives.

**Mise en page** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) et `.--text-align-<value>` (`start`, `center`, `end`, `justify`) couvrent les props transversales `display` et `textAlign` d'InstUI (View, Button, Metric, Tabs, …) comme classes composables —
donc elles ne sont pas des modificateurs par composant.

Chaque classe à double tiret gagne la cascade de façon déterministe sur un modificateur de composant à tiret simple du même nom, indépendamment de l'ordre d'importation des feuilles de style — voir les [conventions d'auteur](/conventions/authoring) pour le mécanisme.

Tout ici est du CSS pur piloté par les tokens `--instui-*`, donc il suit InstUI via la couche de tokens. Voir la [référence API](/api/) pour `componentsCss` et les builders par composant.

## Superpositions : dialog et popover

Les composants d'overlay utilisent des primitives natives de la plateforme, ils se comportent donc de façon accessible avec peu ou pas de JavaScript.

**Modal** — appliquez `.instui-modal` sur un `<dialog>` natif. Il obtient un piégeage de focus, fermeture via `Esc`, et un `::backdrop` gratuitement ; le backdrop est assombri avec le même token `--instui-component-mask-background-color`
que `.instui-mask` (ajoutez `-blur` pour le geler). Ouvrez et fermez avec des invoker commands — sans script :

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — appliquez `.instui-context-view` sur un élément `[popover]` et basculez-le avec
`popovertarget`. Il se place au niveau supérieur et se ferme par clic extérieur ou `Esc`, encore une fois sans script :

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — appliquez `.instui-drawer-layout` sur une racine de layout avec des enfants `.tray` et `.content`.
Ajoutez l'attribut `open` (ou `-open`) pour révéler le tiroir, et utilisez `placement="end"`
(ou `-placement-end`) pour l'ancrer du côté inline-end — le placement se résout via les propriétés logiques `inset-inline-*`/`flex-direction`, donc il se retourne automatiquement sous `dir="rtl"` sans règles supplémentaires. Le bundle d'interaction focused ajoute le routage d'Invoker commands et bascule le mode overlay
(`should-overlay-tray`) lorsque la largeur dépasse `--drawer-layout-min-width` (par défaut
`--instui-breakpoints-sm`, puis `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` reste pour les overlays en flux (un spinner au-dessus d'une carte) ; le `::backdrop`
d'une modal couvre le cas modal.

Les deux motifs sont aussi enveloppés en tant qu'éléments personnalisés comportementaux dans `@pantoken/web-components` :
`<instui-modal open>` (un `<dialog>` piloté par son attribut `open`) et `<instui-context-view>` (un
popover natif).

Support navigateur : l'API popover et `popovertarget` sont Baseline 2024 ; les invoker commands
(`command`/`commandfor`) sont Baseline 2025, donc sur les anciens navigateurs reliez les boutons à `dialog.showModal()`
comme fallback d'une ligne. Positionner un popover à côté de son déclencheur utilise l'ancrage CSS là où c'est supporté (Chromium) ; ailleurs il se centre dans la couche supérieure.

## Formulaires

**FormField** — `.instui-form-field` est un wrapper CSS-Grid qui dispose un label, le contrôle, et les éventuels
messages. Appliquez-le sur un `<label>` pour que le label s'associe nativement à son contrôle. Il possède trois zones de grille — `label`, `controls`, `messages` :

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (par défaut) empile les zones ; `-layout-inline` place le label à côté du contrôle (à ajuster avec `-label-align-{start,end}` et `-v-align-{top,middle,bottom}`). `-readonly` recolore le label.

L'**astérisque requis** apparaît lorsque le champ est requis _soit_ par la classe `-required` _soit_ par un contrôle natif `required` à l'intérieur — donc vous pouvez simplement définir `required` sur l'input et la marque s'affiche. C'est décoratif (un `::after` sur le label, hors de l'arborescence d'accessibilité) ; accompagnez-le d'une note comme "les champs marqués \* sont obligatoires" sauf si le formulaire est évident.

**FormFieldGroup** — `.instui-form-field-group` regroupe des champs liés dans un `<fieldset>` avec une description `<legend>`. C'est purement de la mise en page (pas de tokens dédiés) : par défaut empile les champs ;
`-layout-columns` / `-layout-inline` les disposant en colonnes responsives, avec `-row-spacing-*` /
`-col-spacing-*` et `-v-align-*` pour ajuster la grille.

**RadioInputGroup** — `.instui-radio-input-group` est le même groupement `<fieldset>`/`<legend>`,
spécialisé pour les radios. Comme les radios enfants partagent un `name`, la sélection est nativement à choix unique —
donc un ensemble de boutons bascule se comporte comme un seul contrôle, pas des boutons isolés. `-variant-simple` (par défaut) dispose
les radios standard (`-layout-columns`/`-inline` les flux en ligne) ; `-variant-toggle` relie les
boutons `.instui-radio.-variant-toggle` enfants en un contrôle segmenté (bordures effondrées,
extrémités arrondies) :

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Messages** — `.instui-form-field-messages` est le conteneur ; chaque `.instui-form-field-message` prend un
`-type-*` : `-type-hint` (gris, par défaut), `-type-error` (texte rouge + glyphe d'alerte cercle), `-type-success`
(texte vert + glyphe de coche cercle), et `-type-screenreader-only` (clippé visuellement, annoncé quand même).
Les glyphes se colorent en `currentColor`, donc ils correspondent toujours à la couleur du message. `-type-new-error` est un
alias déprécié de `-type-error`. Reliez le conteneur au contrôle avec `aria-describedby`, et définissez
`aria-invalid` sur le contrôle en cas d'erreur.

À l'intérieur d'un FormField, un message `-type-error` suit la validation côté client : il reste caché jusqu'à ce que le
contrôle du champ soit `:user-invalid` (natif, après interaction utilisateur) — ou vous le forcez avec `-invalid`
sur le `.instui-form-field` (pour une erreur serveur). Un `.instui-form-field-messages` autonome (pas dans
un champ) n'est pas affecté. L'anneau de focus du contrôle suit : danger lorsque `:user-invalid`/`-invalid`,
succès sur `-success`.

**Contrôles de texte** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
redimensionnable), et `.instui-simple-select` (native `<select>` avec caret) partagent un même style et les mêmes
états : `-invalid` (bordure d'erreur), `-success` (bordure de succès), `-readonly`, native `:disabled`, et
`-size-{sm,md,lg}`. Pour une icône en tête/queue (les `renderBeforeInput`/`renderAfterInput` d'InstUI), encapsulez
l'input dans `.instui-input-group` et ajoutez une slot `.before`/`.after` (un glyphe `-icon-*`) ; `-should-not-wrap`
la garde sur une ligne. `.instui-number-input` est cette façade plus une colonne spinner +/- `.arrows` (native
`type="number"` ; reliez les boutons à `stepUp()`/`stepDown()`). `.instui-range-input` est un
`input[type="range"]` stylisé dont la valeur s'affiche dans une bulle inverse `.instui-range-input-value`. Pour un combobox riche avec un popover listbox, utilisez `@instructure/ui` — cette librairie couvre les contrôles natifs.

**Select stylisé (expérimental)** — un `select.css` opt-in améliore le même élément `.instui-simple-select` : il stylise le dropdown ouvert (le panneau et chaque option, avec hover et états sélectionnés) en utilisant le modèle CSS Customizable Select.

> [!WARNING]
> `select.css` repose sur `appearance: base-select` / `::picker(select)`, qui est **expérimental**
> (Chrome 135+, pas encore Baseline). Il est fourni comme feuille séparée opt-in et chaque règle est conditionnée
> par `@supports (appearance: base-select)`, donc il ne fait rien dans les navigateurs non supportés — le contrôle
> `.instui-simple-select` reste simplement le select natif. Chargez-le uniquement si vous voulez le
> dropdown amélioré et acceptez le support limité.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
