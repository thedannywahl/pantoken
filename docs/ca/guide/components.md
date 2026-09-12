# Components

`@pantoken/components` inclou estils de components basats en classes creats a partir dels tokens d'Instructure. Importa
la fulla d'estils i etiqueta el teu markup — cap framework requerit.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Prefereixes elements personalitzats? `@pantoken/web-components` embolcalla aquests mateixos estils com `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, i més — consulta el
> [mapa del paquet](/api/).

## Convencions

Les convencions de CSS en aquest paquet es basen en una versió modificada de [RSCSS](https://ricostacruz.com/rscss/index.html).

Els modificadors són **clau-valor** — `-<prop>-<val>`, alineats amb els noms de propietat d'InstUI — així que es llegeixen per
si mateixos: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Les propietats booleanes són només el nom de la propietat,
on la presència significa `true` (`-has-shadow`, `-clickable`); una booleana amb valor per defecte activada que s'apaga
s'inverteix (`-without-background`, `-without-border`). Les mides accepten tant la forma curta com la llarga
(`-size-sm` = `-size-small`). Quan un nom divergeix d'InstUI, la classe semàntica d'InstUI encara funciona
però està obsoleta (p. ex. `-variant-info` → usa `-color-info`).

### Exemple

Component React d'Instructure UI:

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

Per a la propietat `timeout` d'InstUI, estableix la propietat personalitzada sense unitats `--timeout` en mil·lisegons i carrega
la interacció Alert. Un valor positiu programa el tancament; `0` (el per defecte) deixa l'alerta al seu lloc. Afegeix les classes `instui-transition -fade-entered` de la utilitat `transition` per a l'esvaïment d'InstUI; omet-les per a una eliminació immediata. La interacció controla l'estat `-fade-exiting` i llança un esdeveniment cancel·lable i en bombolla `dismiss` abans de la remoció, així que una aplicació pot cridar `preventDefault()` per mantenir
l'alerta muntada.

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

Les barres de progrés accepten escales arbitràries mitjançant `--min` (`0` per defecte), `--value`, i `--max`
(`100` per defecte), amb els àlies obsolets `--value-now` i `--value-max`. Afegeix `-should-animate`
per aplicar la transició d'una mitja-segona d'InstUI quan un valor canvia. `.value` conviu amb `.bar` com
fill de l'arrel; afegeix `-render-value-inside` per renderitzar-lo sobre la pista, alineat amb l'inici,
en comptes d'això (estila'l per llegibilitat contra el color del metre). Usa un `<progress>` natiu per a un
rango basat en zero i `<meter>` quan el mínim no és zero; els web components seleccionen automàticament entre ells
a partir de l'atribut `min`. InstUI no té estat indeterminat, així que un `<progress>`
sense l'atribut `value` és una aproximació específica de pantoken: `progress-bar` anima `.bar` com un
segment lliscant i `progress-circle` fa girar el seu anell a un arc fix, amagant ambdós `.value`.

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

Els cercles de progrés accepten les mateixes escales arbitràries mitjançant `--min`, `--value`, i `--max`.
`--value-now` i `--value-max` romanen com àlies funcionals obsolets. Afegeix `-should-animate` i
carrega el paquet d'interacció enfocat per reproduir l'animació de muntatge d'InstUI; `--animation-delay` és un
retard sense unitats en mil·lisegons. Les formes obsoletes `-should-animate-on-mount` i
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

## Prefix de classes

Cada classe està amb nom d'espai `instui-` per defecte. Construeix una fulla d'estils amb el teu propi prefix — o cap —
passant `prefix` a qualsevol constructor. Qualsevol valor falsy (`null`, `undefined`, `""`, o ometre-ho) elimina completament
el prefix, així que pots autor `class="heading -level-h1"` en lloc de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Els modificadors amb prefix guió (`.-color-secondary`, `.-level-h1`) no canvien en cap cas. Les
fulles d'estils enviades pel paquet mantenen el prefix `instui`.

## Base

`base.css` és un reset opt-in que estableix valors per defecte globals del document des dels tokens: `box-sizing`, un
reset `body`, la superfície de la pàgina, el color i la font de text base, `color-scheme` (així els tokens `light-dark()` i els controls natius
segueixen el tema), i un enllaç base. Carrega-ho una sola vegada, abans de les fulles de components i de prosa,
quan pantoken gestiona la pàgina.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Omet-ho quan estiguis incorporant components en un host que ja temetitza la seva pròpia `html` i `body` —
el reset pinta la superfície de la pàgina, així que no vols que lluiti amb l'host. Tot el que estableix usa
selectors de baixa especificitat `:where()`, així que les teves pròpies regles sempre guanyen.

`base.css` _aplica_ la font de marca (`font-family: var(--instui-font-family-base)`, amb alternatives de sistema);
per _carregar-la_, importa l'opt-in `fonts.css` — regles `@font-face` per a Atkinson Hyperlegible
Next, apuntant als woff2 inclosos en el paquet. És separat perquè les cares ocupen ~350 kB i
l'autoacoblament de fonts és una elecció deliberada.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contingut per a lectors de pantalla

<p>Hi ha un missatge ocult després d'aquesta frase.<span class="instui-screen-reader-content">Només els lectors de pantalla ho anuncien.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` amaga un element visualment mantenint-lo en l'arbre d'accessibilitat
— per a etiquetes i text d'estat que la tecnologia assistiva hauria de llegir però el disseny no ha de mostrar.

## Utilitats

`utilities.css` és una capa opt-in de classes transversals: un primitiu `View`, espaiat en l'escala de tokens,
i anul·lacions semàntiques de color. A diferència de les classes de components `-modifier`, aquestes fan servir un **doble
guió** (`--mod`) perquè mai col·lisionin amb els noms de modificador d'un component, i s'apliquen a qualsevol
element — sol, o compost sobre un component.

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

**View** — `.instui-view` és el `View` d'InstUI. És la base sobre la qual superposar espaiat i color, i
porta modificadors clau-valor per a les seves pròpies propietats visuals perquè no hagis de recórrer a utilitats:
`-background-*` (les seves superfícies), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, i `-cursor-*` — aquests són els modificadors
de guió simple propis de `view`, no relacionats amb les utilitats de doble guió més avall. Les propietats de valor lliure
(amplada/altura/insets) romanen com estils en línia; `margin`/`padding` utilitzen les utilitats d'espaiat.

**Espaiat** — classes per costat en l'escala d'espaiat. Llegeix-les com `{m|p}{side}-{step}`: `m` per a
margin o `p` per a padding (o les paraules completes `margin`/`padding`), un costat lògic opcional, després un
pas. Així `.--m-lg` i `.--margin-lg` són el mateix, igual que `.--pt-md` i `.--paddingt-md`.

- Costats: none (tot), `t`/`b` (inici/fi de bloc), `s`/`e` (inici/fi en línia), `x`/`y` (eix en línia/bloc).
  Els costats lògics es mantenen correctes en dissenys dret-a-esquerra.
- Pasos: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, més `auto` només per margin.

Combina-les per a la abreviatura `margin="small auto large"` d'InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — anul·lacions semàntiques que es mantenen en paleta: `.--bg-<name>` (fons),
`.--text-<name>` (color de text), i `.--border-<name>` (color de vora). Cada `<name>` és un
token de color semàntic — les intencions (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) més la paleta `accent-*` (`accent-blue`, `accent-green`, i així successivament). Un nom només existeix si el token existeix en aquella família, així que `text-brand` no és una classe — el text no té
token de marca. No hi ha manera d'arribar a un primitiu o un hex arbitrari, i cada anul·lació segueix
el tema.

**Famílies de tokens** — cada família "un token, una propietat" obté una classe per token, nomenada segons el
token. Combina-les lliurement:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (i `-depth1`…`-card`) → `box-shadow`

Cada una estableix només la seva propietat, així que `border-width`/`border-radius` necessiten un color `border-*` i un estil de vora
per a dibuixar realment una vora. Aquestes fan servir el nom complet del token (`.--border-radius-md`), mentre que les
utilitats de color i espaiat d'adalt usen àlies curts (`.--bg-brand`, `.--mt-lg`) — els àlies
són dreceres ergonòmiques; les classes de token són literals i exhaustives.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) i `.--text-align-<value>` (`start`, `center`, `end`, `justify`) cobreixen les propietats
transversals d'InstUI `display` i `textAlign` (View, Button, Metric, Tabs, …) com a classes composables —
així que aquestes no són modificadors per component.

Cada classe de doble guió guanya la cascada de manera determinant sobre un modificador de component d'un mateix nom,
independentment de l'ordre d'importació de les fulles d'estils — veu [Convencions d'autoratge](/conventions/authoring)
per al mecanisme.

Tot aquí és pur CSS impulsat pels tokens `--instui-*`, així que segueix InstUI a través de la capa de tokens. Consulta la [referència d'API](/api/) per `componentsCss` i els constructors per component.

## Superposicions: diàleg i popover

Els components d'overlay aprofiten primitives natives de la plataforma, així que es comporten de manera accessible amb poca o cap
JavaScript.

**Modal** — posa `.instui-modal` en un `<dialog>` natiu. Obtindrà atrapament de focus, tancament amb `Esc`, i un
`::backdrop` de franc; el backdrop s'enfosqueix amb el mateix token `--instui-component-mask-background-color`
que `.instui-mask` (afegeix `-blur` per escalfar-lo). Obre'l i tanca'l amb ordres invoker — sense script:

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

**Context view / popover** — posa `.instui-context-view` en un element `[popover]` i alterna'l amb
`popovertarget`. S'ubica a la capa superior i es tanqui amb clic exterior o `Esc`, de nou sense script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — posa `.instui-drawer-layout` en una arrel de layout amb fills `.tray` i `.content`.
Afegeix l'atribut `open` (o `-open`) per revelar la safata, i usa `placement="end"`
(o `-placement-end`) per acoblar-la al costat inline-end — la posició es resol a través de propietats lògiques
`inset-inline-*`/`flex-direction`, així que gira automàticament sota `dir="rtl"` sense
regles addicionals. El paquet d'interacció enfocat afegeix l'encaminament d'ordres Invoker i alterna el mode d'overlay
(`should-overlay-tray`) quan l'amplada creua `--drawer-layout-min-width` (per defecte
`--instui-breakpoints-sm`, després `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` queda per a superposicions en flux (un spinner sobre una targeta); el `::backdrop`
d'un modal cobreix el cas del modal.

Ambdós patrons també s'embolcallen com a elements personalitzats de comportament en `@pantoken/web-components`:
`<instui-modal open>` (un `<dialog>` impulsat per l'atribut `open`) i `<instui-context-view>` (un
popover natiu).

Compatibilitat del navegador: l'API de popover i `popovertarget` són Baseline 2024; les ordres invoker
(`command`/`commandfor`) són Baseline 2025, així que en navegadors més antics connecta els botons a `dialog.showModal()`
com a fallback d'una línia. Posicionar un popover al costat del seu desencadenant usa posicionament d'ancora CSS on
és compatible (Chromium); a la resta es centra a la capa superior.

## Formularis

**FormField** — `.instui-form-field` és un envoltori CSS-Grid que disposa una etiqueta, el control i qualsevol
missatge. Posa'l en un `<label>` perquè l'etiqueta s'associï nativament amb el seu control. Té tres àrees de grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (per defecte) apila les àrees; `-layout-inline` col·loca l'etiqueta al costat del control (ajusta
amb `-label-align-{start,end}` i `-v-align-{top,middle,bottom}`). `-readonly` recoloreix l'etiqueta.

L'**asterisc requerit** apareix quan el camp és requerit per _o bé_ la classe `-required` _o_ un
control natiu `required` dins d'aquest — així que pots simplement establir `required` a l'input i la marca apareix.
És decoratiu (un `::after` en l'etiqueta, fora de l'arbre d'accessibilitat); acompanya'l amb una nota com
"els camps marcats \* són requerits" llevat que el formulari sigui autoevident.

**FormFieldGroup** — `.instui-form-field-group` agrupa camps relacionats en un `<fieldset>` amb una
descripció `<legend>`. És pur layout (sense tokens dedicats): per defecte apila els camps;
`-layout-columns` / `-layout-inline` els flueixen en columnes responsives, amb `-row-spacing-*` /
`-col-spacing-*` i `-v-align-*` per ajustar la graella.

**RadioInputGroup** — `.instui-radio-input-group` és el mateix agrupament `<fieldset>`/`<legend>`,
especialitzat per a radis. Com que els radis fills comparteixen un `name`, la selecció és nativament d'una sola elecció —
així un conjunt de botons toggle es comporta com un sol control, no com botons independents. `-variant-simple` (per defecte) disposa
els radis estàndard (`-layout-columns`/`-inline` els flueixen en una fila); `-variant-toggle` connecta els
botons fills `.instui-radio.-variant-toggle` en un únic control segmentat (vores col·lapsades,
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
(verd text + un glif de cercle-check), i `-type-screenreader-only` (retallat visualment, encara anunciat).
Els glifs pinten en `currentColor`, així que sempre coincideixen amb el color del missatge. `-type-new-error` és un
àlies obsolet de `-type-error`. Enllaça el contenidor al control amb `aria-describedby`, i posa
`aria-invalid` en el control quan hi ha un error.

Dins d'un FormField, un missatge `-type-error` segueix la validació client-side: roman ocult fins que el
control del camp és `:user-invalid` (natiu, després que l'usuari interactuï) — o l'obligues amb `-invalid`
a l'`.instui-form-field` (per a un error del servidor). Un `.instui-form-field-messages` independent (no dins
d'un camp) no s'afecta. L'anell de focus del control segueix el mateix: perill quan `:user-invalid`/`-invalid`,
èxit en `-success`.

**Controls de text** — `.instui-text-input` (nadiu `<input>`), `.instui-text-area` (nadiu `<textarea>`,
redimensionable), i `.instui-simple-select` (nadiu `<select>` amb caret) comparteixen una aparença i els mateixos
estats: `-invalid` (borda d'error), `-success` (borda d'èxit), `-readonly`, nadiu `:disabled`, i
`-size-{sm,md,lg}`. Per a una icona inicial/final (les `renderBeforeInput`/`renderAfterInput` d'InstUI), embolcalla
l'input en `.instui-input-group` i afegeix una ranura `.before`/`.after` (un glif `-icon-*`); `-should-not-wrap`
ho manté en una sola línia. `.instui-number-input` és aquella façana més una columna spinner +/- `.arrows` (nadiu
`type="number"`; encamina els botons a `stepUp()`/`stepDown()`). `.instui-range-input` és un
`input[type="range"]` estilitzat el cui valor es renderitza en una bombolla inversa `.instui-range-input-value`. Per a un combobox ric
amb un popover de listbox, usa `@instructure/ui` — aquesta biblioteca cobreix els controls nadius.

**Select estilitzat (experimental)** — un opt-in `select.css` millora el _mateix_
element `.instui-simple-select`: estilitza el desplegable obert (el panell i cada opció, amb estats hover i
seleccionat) utilitzant el model CSS Customizable Select.

> [!WARNING]
> `select.css` depèn de `appearance: base-select` / `::picker(select)`, que és **experimental**
> (Chrome 135+, encara no Baseline). S'envia com una fulla opt-in separada i cada regla està lligada
> a `@supports (appearance: base-select)`, així que no fa res en navegadors no compatibles — el
> control `.instui-simple-select` simplement queda el select nadiu pla. Carrega-ho només si vols el
> desplegable millorat i acceptes el suport limitat.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
