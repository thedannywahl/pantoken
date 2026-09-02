# Components

`@pantoken/components` distribueix estils de components basats en classes construïts a partir dels tokens d’Instructure. Importa la fulla d’estils i etiqueta el teu markup — no cal cap framework.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Preferiu elements personalitzats? `@pantoken/web-components` embolica aquests mateixos estils com `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` i més — vegeu el
> [mapa del paquet](/guide/packages).

## Convencions

Les convencions de CSS en aquest paquet es basen en una versió modificada de [RSCSS](https://ricostacruz.com/rscss/index.html).

Els modificadors són **clau-valor** — `-<prop>-<val>`, alineats amb els noms de propietats d’InstUI — així que es llegeixen per si mateixos: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Les propietats booleans són només el nom de la propietat, on la presència significa `true` (`-has-shadow`, `-clickable`); un boolean per defecte activat que s’apaga inverteix (`-without-background`, `-without-border`). Les mides accepten tant la forma curta com la llarga (`-size-sm` = `-size-small`). Quan un nom s’allunya d’InstUI, la classe semàntica d’InstUI encara funciona però està obsoleta (p. ex. `-variant-info` → utilitza `-color-info`).

### Exemple

Component React d’Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

components de pantoken:

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

Per la propietat `timeout` d’InstUI, estableix la propietat personalitzada sense unitats `--timeout` en mil·lisegons i carrega la interacció Alert. Un valor positiu programa el tancament; `0` (per defecte) deixa l’alerta al seu lloc. Afegeix les classes `instui-transition -fade-entered` de la utilitat `transition` per a la difuminació d’InstUI; ometeu-les per a una eliminació immediata. La interacció controla l’estat `-fade-exiting` i dispara un esdeveniment cancel·lable i en bombolla `dismiss` abans de l’eliminació, així que una aplicació pot cridar `preventDefault()` per mantenir l’alerta muntada.

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

Les barres de progrés accepten escales arbitràries a través de `--min` (`0` per defecte), `--value` i `--max`
(`100` per defecte), amb els àlies obsolets `--value-now` i `--value-max`. Afegeix `-should-animate`
per aplicar la transició de mig segon d’InstUI quan un valor canvia. `.value` s’ubica al costat de `.bar` com
fill de l’arrel; afegeix `-render-value-inside` per renderitzar-lo sobre la pista, alineat amb el seu inici,
en lloc d’això (estileu-lo per llegibilitat contra el color del metre). Utilitza un `<progress>` natiu per a
un rang basat en zero i `<meter>` quan el mínim no és zero; els web components seleccionen entre ells
automàticament des de l’atribut `min`. InstUI no té estat indeterminat, així que un `<progress>`
que no té l’atribut `value` és una millor estimació només de pantoken: `progress-bar` anima `.bar` com un
segment lliscant i `progress-circle` fa girar el seu anell a un arc fix, ambinant ambdues `.value`.

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

Els cercles de progrés accepten les mateixes escales arbitràries a través de `--min`, `--value` i `--max`.
`--value-now` i `--value-max` romanen com àlies funcionals obsolets. Afegeix `-should-animate` i
carrega el paquet d’interacció de focus per reproduir l’animació de muntatge d’InstUI; `--animation-delay` és un
retard sense unitats en mil·lisegons. Les ortografies obsoletes `-should-animate-on-mount` i
`-shold-animate-on-mount` romanen àlies funcionals.

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

## Prefix de classe

Cada classe està namespaced `instui-` per defecte. Construïu una fulla d’estils amb el vostre propi prefix — o cap — passant `prefix` a qualsevol constructor. Qualsevol valor falsy (`null`, `undefined`, `""` o ometre’l) elimina
completament el prefix, així que podeu autoritzar `class="heading -level-h1"` en lloc de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Els modificadors prefixats amb guió (`.-color-secondary`, `.-level-h1`) es mantenen igual de qualsevol manera. Les
fulles d’estils que envia el paquet conserven el prefix `instui`.

## Base

`base.css` és un reset opt-in que estableix valors per defecte globals del document a partir dels tokens: `box-sizing`, un
reset `body`, la superfície de la pàgina, el color i la font de text base, `color-scheme` (així que els tokens `light-dark()` i els controls nadius rastregen el tema), i un enllaç base. Carregueu-lo una vegada, abans dels fulls de components i de prosa, quan pantoken posseeix la pàgina.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

No el carregueu quan incrusteu components en un host que ja temàtiza els seus propis `html` i `body` —
el reset pinta la superfície de la pàgina, així que no voleu que faci conflicte amb el host. Tot el que estableix usa
selectors `:where()` de baixa especificitat, així que les vostres pròpies regles sempre guanyen.

`base.css` _aplica_ la font de marca (`font-family: var(--instui-font-family-base)`, amb alternatives del sistema);
per _carregar-la_, importa l’opcional `fonts.css` — regles `@font-face` per Atkinson Hyperlegible
Next, apuntant als woff2 empaquetats amb el paquet. És separat perquè les cares ocupen ~350 kB i
l’autoallotjament de fonts és una decisió deliberada.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contingut per a lectors de pantalla

<p>Hi ha un missatge ocult després d’aquesta frase.<span class="instui-screen-reader-content">Només els lectors de pantalla ho anuncien.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` amaga un element visualment mantenint-lo al mateix temps en l’arbre d’accessibilitat
— per a etiquetes i text d’estat que la tecnologia assistiva hauria de llegir però el disseny no hauria de mostrar.

## Utilitats

`utilities.css` és una capa opt-in de classes transversals: un primitiu `View`, espaiat a l’escala de tokens,
i sobreescriptures de color semàntiques. A diferència de les classes `-modifier` de components, aquestes
usen un **guió doble** (`--mod`) perquè mai no xoquin amb els noms de modificadors d’un component, i s’apliquen a qualsevol
element — sol, o composat sobre un component.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Superfície accent-blue amb text on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centrada amb mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` és l’`View` d’InstUI. És la base sobre la qual afegiu espaiat i color, i
porta modificadors clau-valor per a les seves pròpies propietats visuals perquè no hàgiu d’arribar a les utilitats:
`-background-*` (les seves superfícies), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, i `-cursor-*` — aquests són modificadors
de guió simple de `view` propi, no relacionats amb les utilitats de guió doble més avall. Les propietats de valor lliure
(amplada/altura/inset) es mantenen com estils en línia; `margin`/`padding` usen les utilitats d’espaiat.

**Espaiat** — classes per costat a l’escala d’espaiat. Llegeix-les com `{m|p}{side}-{step}`: `m` per
marge o `p` per padding (o les paraules completes `margin`/`padding`), una cara lògica opcional, i després un
pas. Així `.--m-lg` i `.--margin-lg` són el mateix, com ho són `.--pt-md` i `.--paddingt-md`.

- Costats: none (tots), `t`/`b` (inici/fi de bloc), `s`/`e` (inici/fi d’en línia), `x`/`y` (eix inline/block). Les cares lògiques es mantenen correctes en layouts dreta-a-esquerra.
- Passos: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, més `auto` només per marge.

Composeu-les per a la forma abreujada `margin="small auto large"` d’InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — sobreescriptures semàntiques que es mantenen a la paleta: `.--bg-<name>` (fons),
`.--text-<name>` (color de text), i `.--border-<name>` (color de border). Cada `<name>` és un
token de color semàntic — les intencions (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) més la paleta `accent-*` (`accent-blue`, `accent-green`, i així successivament). Un nom només existeix si el token existeix en aquella família, així que `text-brand` no és una classe — el text no té token de marca. No hi ha manera d’arribar a un primitiu o a un hex arbitrari, i cada sobreescriptura segueix el tema.

**Famílies de tokens** — cada família "un token, una propietat" té una classe per token, anomenada segons el
token. Composeu-les lliurement:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (i `-depth1`…`-card`) → `box-shadow`

Cada una estableix només la seva propietat, així que `border-width`/`border-radius` necessiten un color `border-*` i un estil de border
perquè realment es dibuixi un border. Aquestes usen el nom complet del token (`.--border-radius-md`), mentre que els
helpers de color i espaiat de dalt fan servir àlies curts (`.--bg-brand`, `.--mt-lg`) — els àlies
són drecers ergonòmics; les classes de token són literals i exhaustives.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) i `.--text-align-<value>` (`start`, `center`, `end`, `justify`) cobreixen les
propietats transversals `display` i `textAlign` d’InstUI (View, Button, Metric, Tabs, …) com classes composables —
per tant, aquestes no són modificadors per-component.

Cada classe de guió doble guanya la cascada de manera determinista sobre un modificador de component de mateix nom, independentment de l’ordre d’importació de fulles d’estils — vegeu [Convencions d’autorització](/conventions/authoring)
per al mecanisme.

Tot aquí és pur CSS impulsat pels tokens `--instui-*`, així que segueix InstUI a través de la capa de tokens. Vegeu la [referència d’API](/api/) per `componentsCss` i els constructors per component.

## Superposicions: diàleg i popover

Els components d’overlay utilitzen primitives natives de la plataforma, així que es comporten de manera accessible amb poc o cap
JavaScript.

**Modal** — poseu `.instui-modal` en un `<dialog>` natiu. Obté atrapament de focus, tancar amb `Esc` i un
`::backdrop` de franc; l’esquena s’ennuvola amb el mateix token `--instui-component-mask-background-color`
que `.instui-mask` (afegeix `-blur` per escatar-lo). Obriu-lo i tanqueu-lo amb comandos invoker — sense script:

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

**Context view / popover** — poseu `.instui-context-view` en un element `[popover]` i alterneu-lo amb
`popovertarget`. S’eleva a la capa superior i es tanca amb clic fora o amb `Esc`, de nou sense script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — poseu `.instui-drawer-layout` en una arrel de layout amb fills `.tray` i `.content`.
Afegeix l’atribut `open` (o `-open`) per revelar la safata, i utilitza `placement="end"`
(o `-placement-end`) per encaixonar-la al costat final en línia — la col·locació es resol a través de propietats lògiques
`inset-inline-*`/`flex-direction`, així que gira automàticament sota `dir="rtl"` sense regles addicionals. El paquet d’interacció de focus afegeix l’enrutament de comandos Invoker i alterna el mode d’overlay
(`should-overlay-tray`) quan l’amplada creua `--drawer-layout-min-width` (per defecte
`--instui-breakpoints-sm`, després `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` s’utilitza per a overlays en flux (un spinner sobre una targeta); un `::backdrop`
d’un modal cobreix el cas del modal.

Ambdós patrons també estan embolicats com a elements personalitzats amb comportament en `@pantoken/web-components`:
`<instui-modal open>` (un `<dialog>` conduït per l’atribut `open`) i `<instui-context-view>` (un
popover nat).

Suport del navegador: l’API de popover i `popovertarget` són Baseline 2024; els comandos invoker
(`command`/`commandfor`) són Baseline 2025, així que en navegadors més antics enllaça els botons a `dialog.showModal()`
com a solució alternativa d’una línia. Col·locar un popover al costat del seu disparador utilitza posicionament d’ancora CSS on
és compatible (Chromium); en altres llocs es centra a la capa superior.

## Formularis

**FormField** — `.instui-form-field` és un envoltant CSS-Grid que disposa una etiqueta, el control i qualsevol
missatge. Poseu-lo en un `<label>` perquè l’etiqueta s’associï amb el seu control de manera nativa. Té tres àrees de quadrícula — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (per defecte) apila les àrees; `-layout-inline` posa l’etiqueta al costat del control (ajusteu
amb `-label-align-{start,end}` i `-v-align-{top,middle,bottom}`). `-readonly` recolora l’etiqueta.

L’**asterisc obligatori** apareix quan el camp és obligatori per _o bé_ la classe `-required` _o bé_ un
control natiu `required` dins seu — així que només podeu establir `required` a l’entrada i la marca apareix.
És decoratiu (un `::after` a l’etiqueta, fora de l’arbre d’accessibilitat); combineu-lo amb una nota com
"els camps marcats \* són obligatoris" llevat que el formulari sigui auto-evident.

**FormFieldGroup** — `.instui-form-field-group` agrupa camps relacionats en un `<fieldset>` amb una
descripció `<legend>`. És només layout (sense tokens dedicats): per defecte apila els camps;
`-layout-columns` / `-layout-inline` els flueixen en columnes responsives, amb `-row-spacing-*` /
`-col-spacing-*` i `-v-align-*` per ajustar la quadrícula.

**RadioInputGroup** — `.instui-radio-input-group` és el mateix agrupament `<fieldset>`/`<legend>`,
especialitzat per ràdios. Com que els ràdios fills comparteixen un `name`, la selecció és nativament d’una sola elecció —
així que un conjunt de botons toggle es comporta com un sol control, no com botons solts. `-variant-simple` (per defecte) disposa
els ràdios estàndard (`-layout-columns`/`-inline` els flueixen en una fila); `-variant-toggle` connecta els
botons `.instui-radio.-variant-toggle` fills en un únic control segmentat (borders col·lapsats,
extrems arrodonits):

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

**Missatges** — `.instui-form-field-messages` és el contenidor; cada `.instui-form-field-message` pren un
`-type-*`: `-type-hint` (gris, per defecte), `-type-error` (text vermell + un glif de cercle-alerta), `-type-success`
(text verd + un glif de cercle-check), i `-type-screenreader-only` (retallat visualment, encara anunciat).
Els glifs pinten en `currentColor`, així que sempre coincideixen amb el color del missatge. `-type-new-error` és un
àlies obsolet de `-type-error`. Enllaça el contenidor amb el control mitjançant `aria-describedby`, i estableix
`aria-invalid` al control quan hi ha un error.

Dins d’un FormField, un missatge `-type-error` segueix la validació del client: roman amagat fins que el
control del camp és `:user-invalid` (natiu, després que l’usuari interaccioni) — o el forces amb `-invalid`
a l’`.instui-form-field` (per a un error del servidor). Un `.instui-form-field-messages` independent (no dins d’un
camp) no es veu afectat. L’anell de focus del control segueix el mateix: perill quan `:user-invalid`/`-invalid`,
èxit en `-success`.

**Controls de text** — `.instui-text-input` (natiu `<input>`), `.instui-text-area` (natiu `<textarea>`,
redimensionable), i `.instui-simple-select` (natiu `<select>` amb caret) comparteixen una aparença i els mateixos
estats: `-invalid` (border d’error), `-success` (border d’èxit), `-readonly`, natiu `:disabled`, i
`-size-{sm,md,lg}`. Per a una icona inicial/final (les `renderBeforeInput`/`renderAfterInput` d’InstUI), envolteu
l’input en `.instui-input-group` i afegiu una ranura `.before`/`.after` (un glif `-icon-*`); `-should-not-wrap`
manté tot en una sola línia. `.instui-number-input` és aquella façana més una columna de spinner +/- `.arrows` (natiu
`type="number"`; enllaça els botons a `stepUp()`/`stepDown()`). `.instui-range-input` és un
`input[type="range"]` estilitzat el valor del qual es mostra en una bombolla inversa `.instui-range-input-value`. Per a un combobox ric
amb un listbox popover, escolleix `@instructure/ui` — aquesta biblioteca cobreix els controls nadius.

**Select estilitzat (experimental)** — un `select.css` opt-in millora el mateix
element `.instui-simple-select`: estilitza el desplegable obert (el panell i cada opció, amb hover i
estats seleccionats) utilitzant el model CSS Customizable Select.

> [!WARNING]
> `select.css` depèn de `appearance: base-select` / `::picker(select)`, que és **experimental**
> (Chrome 135+, encara no Baseline). S’envia com una fulla opt-in separada i cada regla està condicionada
> amb `@supports (appearance: base-select)`, així que no fa res en navegadors no compatibles — el
> control `.instui-simple-select` simplement roman el select natiu i senzill. Carregueu-lo només si voleu el
> desplegable millorat i accepteu el suport limitat.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
