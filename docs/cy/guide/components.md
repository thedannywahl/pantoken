# Cydrannau

`@pantoken/components` yn cyflwyno steiliau cydrannau seiliedig ar ddosbarth a adeiladwyd o’r tocynnau Instructure. Mewnforio’r sheitlys a thagio’ch marc-up — dim ffrâm angenrheidiol.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> O’ch bod yn ffafrio elfennau arfer? `@pantoken/web-components` yn wrapio’r un steiliau fel `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, a mwy — gweler y
> [map pecyn](/guide/packages).

## Confensiynau

Mae’r confensiynau CSS yn y pecyn hwn yn seiliedig ar fersiwn addasedig o [RSCSS](https://ricostacruz.com/rscss/index.html).

Mae modiwleiddwyr yn **allwedd-gwerth** — `-<prop>-<val>`, sy’n cyd-fynd â enwau prop InstUI — felly maent yn darllen drostynt eu hunain: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Mae propiau boolean yn y prop
enw yn unig, lle mae presenoldeb yn golygu `true` (`-has-shadow`, `-clickable`); mae boolean diofyn-wrth-ddewis wedi’i oddi-wneud yn gwrthdroi (`-without-background`, `-without-border`). Mae meintiau yn derbyn sillafiadau byr a hir
(`-size-sm` = `-size-small`). Pan fo enw yn gwthio oddi wrth InstUI, mae’r dosbarth semantaidd InstUI yn dal i weithio
ond mae’n hen ffasiwn (e.e. `-variant-info` → defnyddiwch `-color-info`).

### Enghraifft

Cydran React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

cydrannau pantoken:

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

Ar gyfer prop `timeout` InstUI, gosodwch y priodwedd arfer `--timeout` heb uned mewn milisecondau a llwythwch
yr rhyngweithrediad Alert. Mae gwerth cadarnhaol yn trefnu diddymu; `0` (y diofyn) yn gadael yr rhybudd mewn
lle. Ychwanegwch ddosbarthiadau `instui-transition -fade-entered` o’r cyfleustodau `transition` ar gyfer y fade InstUI; anwybyddwch
hwy am dynnu yn syth. Mae’r rhyngweithrediad yn gyrru’r state `-fade-exiting` ac yn tanio digwyddiad dadganiadwy a
bwydo `dismiss` cyn tynnu, fel y gall cais alw `preventDefault()` i gadw’r
rhybudd wedi’i fodiwl.

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

Mae bariau cynnydd yn derbyn graddfeydd arwynebol trwy `--min` (`0` yn ddiofyn), `--value`, a `--max`
(`100` yn ddiofyn), gyda hen ffasiwn `--value-now` a `--value-max` o enwau amgen. Ychwanegwch `-should-animate`
i gymhwyso trawsnewid hanner eiliad InstUI bob tro mae gwerth yn newid. Mae `.value` yn sefyll ochr yn ochr â `.bar` fel
blentyn o’r gwraidd; ychwanegwch `-render-value-inside` i’w rendro dros y trac, wedi’i alinio i’w gychwyn,
yn lle hynny (stiliwch ef er mwyn bod yn ddarllenadwy yn erbyn lliw y metrau). Defnyddiwch `<progress>` naturiol ar gyfer
amrediad sy’n dechrau ar sero a `<meter>` pan fo’r lleiaf yn an-syfraith; mae’r cydrannau gwe yn dewis rhyngddynt
yn awtomatig o’u nodwedd `min`. Nid oes gan InstUI statws anniffinio, felly mae `<progress>`
heb ei nodwedd `value` yn dybiaeth gorau pantoken: mae `progress-bar` yn animeiddio `.bar` fel
segment llithrig a mae `progress-circle` yn troi ei gadwyn mewn arc sefydlog, gan guddio `.value`.

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

Mae cylchdroadau cynnydd yn derbyn yr un graddfeydd arwynebol trwy `--min`, `--value`, a `--max`.
Mae `--value-now` a `--value-max` yn parhau fel enwau amgen gweithredol sydd wedi’u henffasiynu. Ychwanegwch `-should-animate` a
llwythwch y bundle rhyngweithrediad ffocysu i ailadrodd animeiddiad mont InstUI; mae `--animation-delay` yn oediad heb uned mewn milisecondau. Mae’r hen ffasiwn `-should-animate-on-mount` a
`-shold-animate-on-mount` yn parhau fel enwau amgen gweithredol.

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

## Rhagenw dosbarth

Mae pob dosbarth wedi’i enbynnu gyda `instui-` fel diofyn. Adeiladwch sheitlys gyda’ch rhagenw eich hun — neu ddim rhagenw — drwy
basiu `prefix` i unrhyw adeiladwr. Bydd unrhyw werth falsy (`null`, `undefined`, `""`, neu’i hepgor) yn cwympo’r
rhagenw yn gyfan gwbl, felly gallwch awduru `class="heading -level-h1"` yn lle `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Nid yw’r modiwleiddwyr sydd â dash ymlaen (`.-color-secondary`, `.-level-h1`) yn newid o’r naill ffordd na’r llall. Mae’r
sheitlysiadau a anfonir gan y pecyn yn cadw’r rhagenw `instui`.

## Sylfaen

`base.css` yw reset opsiynol sy’n gosod diofynion dogfennol byd-eang o’r tocynnau: `box-sizing`, reset
`body`, arwyneb y dudalen, lliw testun sylfaenol a ffont, `color-scheme` (fel bod tocynnau `light-dark()` a rheolyddion naturiol yn dilyn y thema), a dolen sylfaen. Llwythwch ef unwaith, cyn y sheitlys cydrannau a
prose, pan fo pantoken yn berchen ar y dudalen.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Anwybyddwch ef pan fyddwch yn mewnosod cydrannau i gartref sy’n thema ei `html` a `body` ei hun eisoes —
mae’r reset yn peintio arwyneb y dudalen, felly does dim dymuniad i wrthi’n gystadleuol â’r cartref. Mae popeth a osodir ganddo yn defnyddio
detholwyr `:where()` â mwy o isradd — felly mae eich rheolau eich hun bob amser yn ennill.

Mae `base.css` yn _cymhwyso_’r ffont brand (`font-family: var(--instui-font-family-base)`, gyda defaid system);
i’w _llwytho_, mewnforiwch y `fonts.css` opsiynol — mae rheolau `@font-face` ar gyfer Atkinson Hyperlegible
Next, yn pwyntio at y woff2s a anfonir yn y pecyn. Mae’n wahân am fod y wynebau tua ~350 kB a
mae hunan-letya ffontiau yn ddewis bwriadol.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Cynnwys darllenwyr sgrin

<p>Mae neges gudd wedi ei rhoi ar ôl y frawddeg hon.<span class="instui-screen-reader-content">Dim ond darllenwyr sgrin sy’n hysbysu hyn.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Mae `.instui-screen-reader-content` yn cuddio elfen yn weledol tra’n ei chadw yn y goeden hygyrchedd
— ar gyfer labeli a thestun statws y dylai technoleg cynorthwyol ei ddarllen ond nad yw’r dyluniad yn ei ddangos.

## Cyfleustodau

Mae `utilities.css` yn haen opsiynol o ddosbarthiadau traws-groes: bonyn `View`, gofod ar raddfa’r tocyn,
a throsi lliw semantaidd. Yn wahanol i ddosbarthiadau cydran `-modifier`, maent yn defnyddio **ddau dash**
(`--mod`) felly byth yn gwrthdaro ag enwau modiwleiddwyr cydran un-dash, ac maent yn gymwys i unrhyw
elfen — yn syth, neu wedi’i gydoli ar gydran.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Arwyneb accent-blue gyda thestun ar-liw.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Canolog gyda mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` yw `View` InstUI. Dyma’r sylfaen y haenwch leoliad a lliw arni, ac mae’n
dwyn modiwleiddwyr allwedd-gwerth i’w propriau gweledol ei hun fel nad oes raid ichi gyrraedd am gyfleustodau:
`-background-*` (ei arwynebau), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, a `-cursor-*` — mae’r rhain yn
fodiwlau un-dash `view` ei hun, nad ydynt yn gysylltiedig â’r cyfleustodau dau-dash isod. Mae propriau gwerth-rhydd
(trwch/lled/insit) yn parhau fel arddulliau mewnlin; mae `margin`/`padding` yn defnyddio’r cyfleustodau lleoliad.

**Gofod** — dosbarthiadau y tu mewn fesul ochr ar raddfa’r gofod. Darllen nhw fel `{m|p}{side}-{step}`: `m` ar gyfer
margen neu `p` ar gyfer padio (neu’r geiriau llawn `margin`/`padding`), ochr rhesymegol ddewisol, yna cam. Felly mae `.--m-lg` a `.--margin-lg` yn yr un peth, fel y mae `.--pt-md` a `.--paddingt-md`.

- Ochrau: none (pawb), `t`/`b` (dechrau/diwedd bloc), `s`/`e` (dechrau/diwedd inline), `x`/`y` (echdoriad inline/bloc). Mae ochrau rhesymegol yn cael eu cadw’n gywir mewn cynlluniau dde-i-rif.
- Camau: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, yn ogystal ag `auto` ar gyfer margin yn unig.

Cyfangu nhw ar gyfer shorthand `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Lliw** — gorchmynion semantaidd sy’n aros ar y pallet: `.--bg-<name>` (cefndir),
`.--text-<name>` (lliw testun), a `.--border-<name>` (lliw ffin). Mae pob `<name>` yn
docyn lliw semantaidd — yr anogaethau (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) ynghyd â’r palet `accent-*` (`accent-blue`, `accent-green`, ac ati). Dim ond os yw’r docyn yn bodoli yn y teulu hwn y bydd enw arno, felly nid yw `text-brand` yn ddosbarth — nid oes gan destun
docyn brand. Nid oes ffordd i gyrraedd hen ffynhonnell neu hex arwyneb, a phob gorchymyn dilyn y thema.

**Teulu tocynnau** — mae pob teulu “un tocyn, un priodwedd” yn cael dosbarth fesul tocyn, wedi’i enwi ar ôl y
tocyn. Cyfangu nhw’n rhydd:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (a `-depth1`…`-card`) → `box-shadow`

Mae pob un yn gosod ond ei un priodwedd, felly mae angen `border-width`/`border-radius` liw a arddull ffin i dynnu ffin yn wirioneddol. Maent yn defnyddio’r enw tocyn llawn (`.--border-radius-md`), tra bod yr helpwyr lliw a gofod uchod yn defnyddio aliasau byr (`.--bg-brand`, `.--mt-lg`) — mae’r aliasau yn fyrddonol; mae dosbarthiadau tocyn yn llythrennol ac yn gynhwysfawr.

**Trefniant** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) a `.--text-align-<value>` (`start`, `center`, `end`, `justify`) yn cwmpasu
propriau `display` a `textAlign` croes-groes InstUI (View, Button, Metric, Tabs, …) fel dosbarthiadau y gellir eu cyfuno —
felly nid yw’r rheiny’n fodiwlau ar gyfer pob cydran.

Mae pob dosbarth dau-dash yn ennill y gylchdroi yn benderfynol dros fodiwl cydran un-dash o’r un enw, waeth beth fo trefn mewnforio’r sheitlys — gweler [Confensiynau Awduron](/conventions/authoring)
am y mecanwaith.

Mae popeth yma yn bur CSS a gyrrir gan docynnau `--instui-*`, felly mae’n dilyn InstUI trwy haen y tocynnau. Gweler y [cyfeirlyfr API](/api/) ar gyfer `componentsCss` a’r adeiladwyr fesul-cydran.

## Gor-lenyddion: dialog a popover

Mae’r cydrannau gor-lenydd yn defnyddio rhain enghreifftiau platfform naturiol, felly maent yn ymddwyn yn hygyrch gyda ychydig neu ddim JavaScript.

**Modal** — rhowch `.instui-modal` ar `<dialog>` naturiol. Mae’n cael trapio ffocws, `Esc`-i-gae, a
`::backdrop` am ddim; mae’r cefndir yn cael ei dynnu’n fach gyda’r un docyn `--instui-component-mask-background-color`
â `.instui-mask` (ychwanegwch `-blur` i’w rewlio). Agorwch a chau gyda gorchmynion invoker — dim sgript:

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

**Context view / popover** — rhowch `.instui-context-view` ar elfenn `[popover]` a’i thoglo gyda
`popovertarget`. Mae’n eistedd ar y haen uchaf ac yn cau ar glic y tu allan neu `Esc`, eto dim sgript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Layout drôr** — rhowch `.instui-drawer-layout` ar wraidd layout gyda phlant `.tray` a `.content`.
Ychwanegwch yr atodiad `open` (neu `-open`) i ddatgelu’r drôr, a defnyddiwch `placement="end"`
(neu `-placement-end`) i gludo ef i’r ochr diwedd mewnlin — mae lleoliad yn datrys trwy berpriodweddau rhesymegol
`inset-inline-*`/`flex-direction`, felly mae’n troi’n awtomatig o dan `dir="rtl"` heb reolau ychwanegol. Mae’r bundle rhyngweithrediad ffocysu yn ychwanegu rheoliad command Invoker ac yn toglo modd gor-lenydd
(`should-overlay-tray`) pan fo lled yn croesi `--drawer-layout-min-width` (diofyn
`--instui-breakpoints-sm`, yna `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Masg** — mae `.instui-mask` ar gyfer gor-lenyddion sy’n ffrydio (spinner dros gerdyn); mae `::backdrop` modal yn ymdrin â’r achos modal.

Mae’r ddau batrwm hefyd wedi’u lapio fel elfennau arfer ymddygiadol yn `@pantoken/web-components`:
`<instui-modal open>` (yn `<dialog>` a gyrrir gan ei nodwedd `open`) a `<instui-context-view>` (popover naturiol).

Cefnogaeth porwr: mae API popover a `popovertarget` yn Baseline 2024; mae gorchmynion invoker
(`command`/`commandfor`) yn Baseline 2025, felly ar borwyr hŷn cysylltwch y botymau i `dialog.showModal()`
fel un-lin fallback. Mae gosod popover wrth ei sbardun yn defnyddio lleoliad anchora CSS lle mae’n cael ei gefnogi (Chromium); mewn mannau eraill mae’n canoli yn y haen uchaf.

## Ffurflenni

**FormField** — mae `.instui-form-field` yn lapwr CSS-Grid sy’n gosod label, y rheolydd, a negeseuon. Rhowch ef ar `<label>` fel bod y label yn cysylltu â’i reolydd yn naturiol. Mae ganddo dri ardal grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Mae `-layout-stacked` (diofyn) yn stacio’r ardaloedd; mae `-layout-inline` yn gosod y label ochr-yn-ochr â’r rheolydd (tune gyda `-label-align-{start,end}` a `-v-align-{top,middle,bottom}`). Mae `-readonly` yn ail-liwio’r label.

Mae’r **asterisg gofynnol** yn ymddangos pan fo’r maes yn ofynnol gan _naill ai_ y dosbarth `-required` _neu_ reolydd naturiol `required` o fewn iddo — felly gallwch osod `required` ar y mewnbwn a bydd y marciau’n ymddangos. Mae’n addurniadol (yn `::after` ar y label, y tu allan i goeden hygyrchedd); pairiwch ef gyda nod fel
“mae meysydd wedi’u marcio \* yn ofynnol” oni bai bod y ffurflen yn amlwg ei hun.

**FormFieldGroup** — mae `.instui-form-field-group` yn grwpio meysydd cysylltiedig mewn `<fieldset>` gyda
disgrifiad `<legend>`. Mae’n pure layout (dim tocynnau penodol): yn ddiofyn mae’n stacio’r meysydd;
mae `-layout-columns` / `-layout-inline` yn eu llifo i golofnau ymatebol, gyda `-row-spacing-*` /
`-col-spacing-*` a `-v-align-*` i aflunio’r grid.

**RadioInputGroup** — mae `.instui-radio-input-group` yn yr un grwpio `<fieldset>`/`<legend>`,
arbenigol ar gyfer radio. Oherwydd bod y radio plant yn rhannu `name`, mae’r dewis yn un-ddewis yn naturiol —
felly mae set o fotymau toggle yn ymddwyn fel un rheolydd, nid botymau rhydd. Mae `-variant-simple` (diofyn) yn gosod
radio safonol (`-layout-columns`/`-inline` yn eu llifo i rhes); mae `-variant-toggle` yn cysylltu’r
botymau `.instui-radio.-variant-toggle` plant i un rheolydd segmentiedig (ffiniau ffin wedi’u cywasgu,
penau allanol crwn):

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

**Negeseuon** — mae `.instui-form-field-messages` yn y cynhwysydd; mae pob `.instui-form-field-message` yn cymryd
`-type-*`: `-type-hint` (llwyd, diofyn), `-type-error` (testun coch + glyph cylch-rhybudd), `-type-success`
(testun gwyrdd + glyph cylch-tic), a `-type-screenreader-only` (lle mae’n cael ei dorri’n weledol, ond yn dal i gael ei gyhoeddi). Mae’r glyphs yn paentio yn `currentColor`, felly maent bob amser yn cyfateb i liw y neges. Mae `-type-new-error` yn henffasiwn o `-type-error`. Cysylltwch y cynhwysydd â’r rheolydd gyda `aria-describedby`, a gosod
`aria-invalid` ar y rheolydd pan fo gwall.

Mewn FormField, mae negeseuon `-type-error` yn dilyn dilysu ochr-clïen: maent yn aros wedi’u cuddio tan fod rheolydd y maes yn `:user-invalid` (naturiol, ar ôl i’r defnyddiwr ryngweithio) — neu’ch gorchmynnwch ef gyda `-invalid`
ar y `.instui-form-field` (ar gyfer gwall ar y gweinydd). Mae `.instui-form-field-messages` unigol (heb fod mewn maes) heb ei effeithio. Mae cylch ffocws y rheolydd yn dilyn yr un patrwm: perygl pan fo `:user-invalid`/`-invalid`,
llwyddiant ar `-success`.

**Rheolyddion testun** — mae `.instui-text-input` (**`<input>`** naturiol), `.instui-text-area` (**`<textarea>`** naturiol,
addasadwy), a `.instui-simple-select` (**`<select>`** naturiol gyda caret) yn rhannu un golwg a’r un
statwsau: `-invalid` (ffin gwall), `-success` (ffin llwyddiant), `-readonly`, `:disabled` naturiol, a
`-size-{sm,md,lg}`. Ar gyfer eicon ar y blaen/cefndi (InstUI’s `renderBeforeInput`/`renderAfterInput`), rhowch y mewnbwn mewn `.instui-input-group` a chynnwys slot `.before`/`.after` (glyph `-icon-*`); mae `-should-not-wrap`
yn cadw’r elfen ar un llinell. Mae `.instui-number-input` yn y fasâd honno gyda cholofn spinner +/- `.arrows` (**`type="number"`** naturiol); cysylltwch y botymau at `stepUp()`/`stepDown()`). Mae `.instui-range-input` yn `input[type="range"]` wedi’i steilio sy’n rendro ei werth mewn `.instui-range-input-value` bwcl gwrthwyneb. Ar gyfer combobox cyfoethog gyda popover listbox, defnyddiwch `@instructure/ui` — mae’r llyfrgell hon yn cwmpasu’r rheolyddion naturiol.

**Dewis dropdown wedi’i steilio (arbrofol)** — mae `select.css` opsiynol yn uwchraddio’r un
elfen `.instui-simple-select`: mae’n steilio’r dropdown agored (y panel a phob dewis, gyda hover a
statws wedi’u dewis) gan ddefnyddio’r model Select Addasadwy CSS.

> [!WARNING]
> Mae `select.css` yn ddibynnol ar `appearance: base-select` / `::picker(select)`, sydd **arbrofol**
> (Chrome 135+, heb fod yn Baseline eto). Fe’i anfonir fel sheitlys opsiynol ar wahân ac mae pob rheol wedi’i raddio
> tu ôl i `@supports (appearance: base-select)`, felly ni wnaiff ddim yn borwyr nad ydynt yn eu cefnogi — mae’r
> rheolydd `.instui-simple-select` yn aros yn yr select naturiol syml. Llwythwch ef ond os ydych eisiau’r
> dropdown uwch ac yn derbyn y cefnogaeth cyfyngedig.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
