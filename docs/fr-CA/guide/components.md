# Composants

`@pantoken/components` fournit des styles de composants basés sur des classes construits à partir des tokens Instructure. Importez
la feuille de style et marquez votre balisage — aucun framework requis.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Préfèrez les éléments personnalisés ? `@pantoken/web-components` encapsule ces mêmes styles en tant que `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, et plus — voir la
> [carte des paquets](/guide/packages).

## Conventions

Les conventions CSS de ce paquet sont basées sur une version modifiée de [RSCSS](https://ricostacruz.com/rscss/index.html).

Les modificateurs sont des **paires clé-valeur** — `-<prop>-<val>`, alignés sur les noms de props InstUI — ils se lisent donc
seuls : `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Les props booléennes sont le nom
de la prop seul, la présence signifiant `true` (`-has-shadow`, `-clickable`) ; une booléenne activée par défaut
qui est désactivée s'inverse (`-without-background`, `-without-border`). Les tailles acceptent les orthographes courtes et longues
(`-size-sm` = `-size-small`). Lorsqu'un nom diverge d'InstUI, la classe sémantique InstUI fonctionne toujours
mais est dépréciée (par ex. `-variant-info` → utiliser `-color-info`).

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

Pour la prop `timeout` d'InstUI, définissez la variable personnalisée `--timeout` sans unité en millisecondes et chargez
l'interaction Alert. Une valeur positive programme la fermeture ; `0` (la valeur par défaut) laisse l'alerte en
place. Ajoutez les classes `instui-transition -fade-entered` de l'utilitaire `transition` pour le fondu d'InstUI ; omettez-les pour une suppression immédiate. L'interaction pilote l'état `-fade-exiting` et déclenche un événement annulable et en propagation `dismiss` avant la suppression, afin qu'une application puisse appeler `preventDefault()` pour garder
l'alerte montée.

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
pour appliquer la transition d'une demi-seconde d'InstUI chaque fois qu'une valeur change. `.value` coexiste avec `.bar` en
tant qu'enfant de la racine ; ajoutez `-render-value-inside` pour le rendre au-dessus de la piste, aligné sur son début,
à la place (stylez-le pour la lisibilité sur la couleur du mètre). Utilisez un `<progress>` natif pour une
plage à base zéro et `<meter>` quand le minimum est non nul ; les web components choisissent automatiquement entre eux
d'après leur attribut `min`. InstUI n'a pas d'état indéterminé, donc un `<progress>`
sans son attribut `value` est une estimation propre à pantoken : `progress-bar` anime `.bar` comme un
segment glissant et `progress-circle` fait tourner son anneau à un arc fixe, les deux cachant `.value`.

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

Les cercles de progression acceptent les mêmes échelles arbitraires via `--min`, `--value` et `--max`.
`--value-now` et `--value-max` restent des alias fonctionnels dépréciés. Ajoutez `-should-animate` et
chargez le bundle d'interaction de focus pour reproduire l'animation de montage d'InstUI ; `--animation-delay` est un
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

Chaque classe est préfixée par défaut par `instui-`. Générez une feuille de style avec votre propre préfixe — ou aucun — en
passant `prefix` à n'importe quel constructeur. Toute valeur falsy (`null`, `undefined`, `""`, ou omission) supprime le
préfixe entièrement, vous permettant d'écrire `class="heading -level-h1"` au lieu de `class="instui-heading -level-h1"` :

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Les modificateurs préfixés d'un tiret (`.-color-secondary`, `.-level-h1`) restent inchangés dans les deux cas. Les
feuilles de style fournies par le paquet conservent le préfixe `instui`.

## Base

`base.css` est une réinitialisation optionnelle qui définit les valeurs par défaut du document à partir des tokens : `box-sizing`, une
réinitialisation `body`, la surface de la page, la couleur et la police de base du texte, `color-scheme` (pour que les tokens
`light-dark()` et les contrôles natifs suivent le thème), et un style de lien de base. Chargez-la une fois, avant les feuilles de composants et de prose,
lorsque pantoken contrôle la page.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Ne la chargez pas lorsque vous intégrez des composants dans un hôte qui applique déjà son propre thème `html` et `body` —
la réinitialisation peint la surface de la page, vous ne voulez pas qu'elle entre en conflit avec l'hôte. Tout ce qu'elle définit utilise
des sélecteurs `:where()` à faible spécificité, donc vos propres règles priment toujours.

`base.css` _applique_ la police de la marque (`font-family: var(--instui-font-family-base)`, avec des fallbacks système) ; pour _la charger_, importez l'optionnelle `fonts.css` — `@font-face` règles pour Atkinson Hyperlegible
Next, pointant vers les woff2 fournis dans le paquet. C'est séparé parce que les fontes font ~350 kB et
l'hébergement des fontes est un choix délibéré.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contenu pour lecteur d'écran

<p>Il y a un message caché après cette phrase.<span class="instui-screen-reader-content">Seuls les lecteurs d'écran annoncent ceci.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` cache visuellement un élément tout en le gardant dans l'arbre d'accessibilité
— pour les étiquettes et le texte d'état que la technologie d'assistance doit lire mais que le design ne doit pas afficher.

## Utilitaires

`utilities.css` est une couche optionnelle de classes transversales : un primitif `View`, des espacements sur l'échelle de tokens,
et des substituts de couleurs sémantiques. Contrairement aux classes `-modifier` des composants, celles-ci utilisent un **double
tiret** (`--mod`) afin de ne jamais entrer en conflit avec les noms de modificateurs d'un composant, et elles s'appliquent à n'importe
quel élément — seul, ou composé sur un composant.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Surface accent-blue avec texte sur-couleur.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centré avec mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` est le `View` d'InstUI. C'est la base sur laquelle on superpose espacements et couleurs, et elle
porte des modificateurs clé-valeur pour ses propres propriétés visuelles afin que vous n'ayez pas à recourir aux utilitaires :
`-background-*` (ses surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, et `-cursor-*` — ce sont les modificateurs
à un tiret propres à `view`, indépendants des utilitaires à double tiret ci-dessous. Les props à valeur libre
(largeur/hauteur/inset) restent des styles inline ; `margin`/`padding` utilisent les utilitaires d'espacement.

**Espacement** — classes par côté sur l'échelle d'espacement. Lisez-les comme `{m|p}{side}-{step}` : `m` pour
la marge ou `p` pour le padding (ou les mots complets `margin`/`padding`), un côté logique optionnel, puis un
pas. Ainsi `.--m-lg` et `.--margin-lg` sont identiques, tout comme `.--pt-md` et `.--paddingt-md`.

- Côtés : none (tous), `t`/`b` (début/fin de bloc), `s`/`e` (début/fin en ligne), `x`/`y` (axe inline/block). Les côtés logiques restent corrects en dispositions droite-à-gauche.
- Pas : `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` uniquement pour la marge.

Composez-les pour le raccourci `margin="small auto large"` d'InstUI :
`class="--mt-sm --mx-auto --mb-lg"`.

**Couleur** — substitutions sémantiques qui restent sur la palette : `.--bg-<name>` (arrière-plan),
`.--text-<name>` (couleur du texte), et `.--border-<name>` (couleur de bordure). Chaque `<name>` est un
token de couleur sémantique — les intentions (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus la palette `accent-*` (`accent-blue`, `accent-green`, et ainsi de suite). Un nom n'existe que si le token est présent dans cette famille, donc `text-brand` n'est pas une classe — le texte n'a
pas de token de marque. Il n'est pas possible d'atteindre un primitif ou un hex arbitraire, et chaque substitution suit
le thème.

**Familles de tokens** — chaque famille "un token, une propriété" obtient une classe par token, nommée d'après le
token. Composez-les librement :

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (et `-depth1`…`-card`) → `box-shadow`

Chacune définit uniquement sa propriété, donc `border-width`/`border-radius` ont besoin d'une couleur `border-*` et d'un style de bordure
pour réellement dessiner une bordure. Celles-ci utilisent le nom de token complet (`.--border-radius-md`), tandis que
les aides couleur et espacement ci-dessus utilisent des alias courts (`.--bg-brand`, `.--mt-lg`) — les alias
sont des raccourcis ergonomiques ; les classes token sont littérales et exhaustives.

**Mise en page** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) et `.--text-align-<value>` (`start`, `center`, `end`, `justify`) couvrent les
propriétés transversales `display` et `textAlign` d'InstUI (View, Button, Metric, Tabs, …) en tant que classes composables —
donc ce ne sont pas des modificateurs par composant.

Chaque classe à double tiret gagne la cascade de manière déterministe sur un modificateur de composant
à un seul tiret de même nom, indépendamment de l'ordre d'importation des feuilles de style — voir les [conventions d'auteur](/conventions/authoring)
pour le mécanisme.

Tout ici est du CSS pur piloté par les tokens `--instui-*`, donc il suit InstUI via la couche de tokens. Voir la [référence API](/api/) pour `componentsCss` et les constructeurs par composant.

## Superpositions : dialog et popover

Les composants d'overlay utilisent des primitives natives de la plateforme, donc ils se comportent de façon accessible avec peu ou pas
de JavaScript.

**Modal** — appliquez `.instui-modal` à un `<dialog>` natif. Il obtient le piégeage du focus, la fermeture par `Esc` et un
`::backdrop` gratuitement ; l'arrière-plan est assombri avec le même token `--instui-component-mask-background-color`
que `.instui-mask` (ajoutez `-blur` pour le givrer). Ouvrez et fermez avec des invoker commands — aucun script :

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

**Context view / popover** — appliquez `.instui-context-view` à un élément `[popover]` et basculez-le avec
`popovertarget`. Il monte sur la couche supérieure et se ferme au clic externe ou par `Esc`, encore une fois sans script :

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — appliquez `.instui-drawer-layout` à une racine de layout avec des enfants `.tray` et `.content`.
Ajoutez l'attribut `open` (ou `-open`) pour révéler le tiroir, et utilisez `placement="end"`
(ou `-placement-end`) pour l'ancrer côté inline-end — le placement se résout via les propriétés logiques
`inset-inline-*`/`flex-direction`, donc il se retourne automatiquement sous `dir="rtl"` sans
règles supplémentaires. Le bundle d'interaction de focus ajoute le routage des Invoker commands et bascule le mode overlay
(`should-overlay-tray`) quand la largeur franchit `--drawer-layout-min-width` (par défaut
`--instui-breakpoints-sm`, puis `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` reste pour les overlays en flux (un spinner sur une carte) ; le `::backdrop`
d'une modal couvre le cas modal.

Les deux motifs sont aussi enveloppés en tant qu'éléments comportementaux personnalisés dans `@pantoken/web-components` :
`<instui-modal open>` (un `<dialog>` piloté par son attribut `open`) et `<instui-context-view>` (un
popover natif).

Compatibilité navigateurs : l'API popover et `popovertarget` sont Baseline 2024 ; les invoker commands
(`command`/`commandfor`) sont Baseline 2025, donc sur les navigateurs plus anciens reliez les boutons à `dialog.showModal()`
comme fallback en une ligne. Positionner un popover à côté de son déclencheur utilise le positionnement d'ancre CSS quand
pris en charge (Chromium) ; ailleurs il se centre dans la couche supérieure.

## Formulaires

**FormField** — `.instui-form-field` est un wrapper CSS-Grid disposant une étiquette, le contrôle, et tous
les messages. Appliquez-le sur un `<label>` pour que l'étiquette s'associe nativement à son contrôle. Il a trois zones de grille — `label`, `controls`, `messages` :

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (par défaut) empile les zones ; `-layout-inline` place l'étiquette à côté du contrôle (ajustez
avec `-label-align-{start,end}` et `-v-align-{top,middle,bottom}`). `-readonly` recolore l'étiquette.

L'**astérisque requis** apparaît lorsque le champ est requis par _soit_ la classe `-required` _ou_ un
contrôle natif `required` à l'intérieur — vous pouvez donc simplement définir `required` sur l'input et la marque s'affiche.
C'est décoratif (un `::after` sur l'étiquette, hors de l'arbre d'accessibilité) ; associez-le à une note du type
« les champs marqués \* sont requis » sauf si le formulaire est évident.

**FormFieldGroup** — `.instui-form-field-group` groupe des champs reliés dans un `<fieldset>` avec une
description `<legend>`. C'est purement de la mise en page (pas de tokens dédiés) : par défaut empile les champs ;
`-layout-columns` / `-layout-inline` les dispossent en colonnes responsives, avec `-row-spacing-*` /
`-col-spacing-*` et `-v-align-*` pour ajuster la grille.

**RadioInputGroup** — `.instui-radio-input-group` est le même groupement `<fieldset>`/`<legend>`,
spécialisé pour les radios. Comme les radios enfants partagent un `name`, la sélection est nativement à choix unique —
une série de boutons bascule se comporte donc comme un seul contrôle, pas comme des boutons indépendants. `-variant-simple` (par défaut) dispose
les radios standard (`-layout-columns`/`-inline` les mettent en ligne) ; `-variant-toggle` relie les
boutons enfants `.instui-radio.-variant-toggle` en un contrôle segmenté unique (bords effondrés,
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

**Messages** — `.instui-form-field-messages` est le conteneur ; chaque `.instui-form-field-message` a un
`-type-*` : `-type-hint` (gris, par défaut), `-type-error` (texte rouge + glyphe circle-alert), `-type-success`
(texte vert + glyphe circle-check), et `-type-screenreader-only` (visuellement masqué, annoncé quand même).
Les glyphes se peignent en `currentColor`, donc ils correspondent toujours à la couleur du message. `-type-new-error` est un
alias déprécié de `-type-error`. Reliez le conteneur au contrôle avec `aria-describedby`, et définissez
`aria-invalid` sur le contrôle en cas d'erreur.

Dans un FormField, un message `-type-error` suit la validation côté client : il reste caché jusqu'à ce que le
contrôle du champ soit `:user-invalid` (natif, après interaction de l'utilisateur) — ou vous pouvez le forcer avec `-invalid`
sur le `.instui-form-field` (pour une erreur côté serveur). Un `.instui-form-field-messages` autonome (pas dans
un champ) n'est pas affecté. L'anneau de focus du contrôle suit : danger quand `:user-invalid`/`-invalid`,
succès sur `-success`.

**Contrôles de texte** — `.instui-text-input` (natifs `<input>`), `.instui-text-area` (natifs `<textarea>`,
redimensionnables), et `.instui-simple-select` (natifs `<select>` avec un caret) partagent un même aspect et les mêmes
états : `-invalid` (bord d'erreur), `-success` (bord de succès), `-readonly`, natif `:disabled`, et
`-size-{sm,md,lg}`. Pour une icône en début/fin (les `renderBeforeInput`/`renderAfterInput` d'InstUI), enveloppez
l'input dans `.instui-input-group` et ajoutez un slot `.before`/`.after` (un glyphe `-icon-*`) ; `-should-not-wrap`
le maintient sur une seule ligne. `.instui-number-input` est cette façade plus une colonne spinner +/- `.arrows` (natifs
`type="number"` ; reliez les boutons à `stepUp()`/`stepDown()`). `.instui-range-input` est un
`input[type="range"]` stylisé dont la valeur s'affiche dans une bulle inverse `.instui-range-input-value`. Pour un combobox riche
avec une listbox popover, utilisez `@instructure/ui` — cette bibliothèque couvre les contrôles natifs.

**Select stylisé (expérimental)** — une option `select.css` améliore le _même_
élément `.instui-simple-select` : il stylise le dropdown ouvert (le panneau et chaque option, avec états hover et sélection) en utilisant le modèle CSS Customizable Select.

> [!WARNING]
> `select.css` dépend de `appearance: base-select` / `::picker(select)`, ce qui est **expérimental**
> (Chrome 135+, pas encore Baseline). Il est fourni comme feuille optionnelle séparée et chaque règle est conditionnée
> par `@supports (appearance: base-select)`, donc il ne fait rien dans les navigateurs non pris en charge — le
> contrôle `.instui-simple-select` reste simplement le select natif. Chargez-le seulement si vous voulez le
> dropdown amélioré et acceptez le support limité.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
