# Cydrannau

`@pantoken/components` yn cludo steiliau cydrannau seiliedig ar ddosbarth wedi’u hadeiladu o’r tokenau Instructure. Mewngludwch y sheitlis a tagiwch eich marciad — dim fframwaith angenrheidiol.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> O blithwch elfennau custom? Mae `@pantoken/web-components` yn amgáu’r un steiliau fel `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, a mwy — gweler y
> [map pecyn](/api/).

## Confensiynau

Mae’r confensiynau CSS yn y pecyn hwn yn seiliedig ar fersiwn addasu o [RSCSS](https://ricostacruz.com/rscss/index.html).

Mae modiwleiddwyr yn **allweddol-werth** — `-<prop>-<val>`, yn gyfwerth â enwau prop InstUI — felly maent yn darllen eu hunain: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Mae propiau boolean yn yr enw prop yn unig, lle mae presenoldeb yn golygu `true` (`-has-shadow`, `-clickable`); mae boolean sydd â gwerth diofyn ymlaen ac wedi’i analluogi yn gwrthdroi (`-without-background`, `-without-border`). Mae meintiau yn derbyn naill ai ffurf fyr neu hir
(`-size-sm` = `-size-small`). Lle mae enw yn mynd yn groes i InstUI, mae’r dosbarth semantig InstUI yn dal i weithio
ond mae’n hynaws (e.e. `-variant-info` → defnyddiwch `-color-info`).

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

Ar gyfer prop `timeout` InstUI, gosodwch y eiddo custom heb uned `--timeout` mewn milisecundau a llwythwch
’r rhyngweithio Alert. Mae gwerth cadarnhaol yn rhaglennu diddymu; `0` (y diofyn) yn gadael yr rhybudd yn
ei le. Ychwanegwch ddosbarthiadau `instui-transition -fade-entered` o’r cyfleustodyn `transition` ar gyfer diddymiad ysgafn InstUI; peidiwch â’u cynnwys
os ydych am gael gwared ar unwaith. Mae’r rhyngweithio yn gyrru’r statws `-fade-exiting` ac yn tanio digwyddiad
gallus-ganslo, yn chwifio `dismiss` cyn tynnu, fel y gall cais alw `preventDefault()` i gadw’r
rhagddiemyn wedi’i ffitio.

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

Mae bariau cynnydd yn derbyn raddfaau aribïtrïol trwy `--min` (`0` yn ddiofyn), `--value`, a `--max`
(`100` yn ddiofyn), gyda hen-enwau `--value-now` a `--value-max` wedi’u diddymu. Ychwanegwch `-should-animate`
i gymhwyso trawsnewid hanner-eiliad InstUI pan fo gwerth yn newid. Mae `.value` yn sefyll ochr yn ochr â `.bar` fel
blentyn i’r gwraidd; ychwanegwch `-render-value-inside` i’w rendro dros y trac, wedi’i alinio i’w dechrau,
yn lle hynny (stiliwch ef i fod yn ddarllenadwy yn erbyn lliw y metrau). Defnyddiwch `<progress>` naturiol ar gyfer
amrediad sy’n seiliedig ar sero a `<meter>` pan fo’r lleiaf ddim yn sero; mae’r cydrannau tudalen yn dewis rhyngddynt
yn awtomatig o’u nodwedd `min`. Nid oes statws anbeniedig gan InstUI, felly mae `<progress>`
sydd heb ei nodwedd `value` yn dybiaeth orau pantoken: mae `progress-bar` yn animeiddio `.bar` fel
segment symudol a `progress-circle` yn troi ei ring mewn arc sefydlog, gan guddio `.value`.

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

Mae cylchoedd cynnydd yn derbyn yr un raddfaau aribïtrïol trwy `--min`, `--value`, a `--max`.
Mae `--value-now` a `--value-max` yn parhau fel hen-enwau swyddogaethol. Ychwanegwch `-should-animate` a
llwythwch y buntl rhyngweithio ganolbwynt er mwyn atgynhyrchu animeiddiad gosod InstUI; mae `--animation-delay` yn oediad heb uned mewn milisecundau. Mae’r hen-enwau `-should-animate-on-mount` a
`-shold-animate-on-mount` yn parhau fel hen-enwau swyddogaethol.

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

## Cyffyrddiad dosbarth

Mae pob dosbarth yn enw maes `instui-` yn ddiofyn. Adeiladwch sheitlis gyda’ch rhagddull chi — neu dim — trwy
basio `prefix` i unrhyw adeiladwr. Mae unrhyw werth gwag (`null`, `undefined`, `""`, neu osgoi) yn gollwng y
blaendid yn gyfan gwbl, felly gallwch awdurdodi `class="heading -level-h1"` yn lle `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Mae’r modiwleiddwyr sydd â dash rhagosodedig (`.-color-secondary`, `.-level-h1`) heb eu newid beth bynnag. Mae’r
sheitliseis a anfonir gan y pecyn yn cadw’r blaenadrodd `instui`.

## Sylfaen

Mae `base.css` yn adferiad dewisol sy’n gosod diofynion dogfen byd-eang o’r tokenau: `box-sizing`, adferiad
`body`, arwyneb y dudalen, lliw testun sylfaenol a ffont, `color-scheme` (fel bod tokenau `light-dark()` a rheolyddion cwbledig yn dilyn y thema), a dolen sylfaen. Llwythwch hi unwaith, cyn y sheitlis cydran a’r sheitlis cynnwys,
pan fo pantoken yn berchen ar y dudalen.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Peidiwch â’i lwytho pan fyddwch yn mewnosod cydrannau i gartref sydd eisoes yn thema ei `html` a `body` — mae’r adferiad yn paentio arwyneb y dudalen, felly nid ydych am iddo wrthdaro â’r cartref. Mae popeth y mae’n ei osod yn defnyddio
dewiswyr `:where()` o is-benadwyedd isel, felly mae’ch rheolau eich hun bob amser yn ennill.

Mae `base.css` yn _aplygu_ y ffont brand (`font-family: var(--instui-font-family-base)`, gyda dilynwyr system); i _lwytho_ ef, mewnforiwch y `fonts.css` dewisol — rheolau `@font-face` ar gyfer Atkinson Hyperlegible
Next, sy’n pwyntio at y woff2s a anfonir yn y pecyn. Mae’n ar wahân oherwydd bod y wynebau tua 350 kB a
mae hunan-lwfyny ffontiau yn ddewis fwriadol.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Cynnwys darllenydd sgrin

<p>Mae neges cudd ar ôl y frawddeg hon.<span class="instui-screen-reader-content">Dim ond darllenydd sgrin sy’n hysbysu hyn.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Mae `.instui-screen-reader-content` yn cuddio elfen yn weledol tra’n ei chadw yn y goeden hygyrchedd
— ar gyfer labeli a thestun statws y dylai’r dechnoleg gynorthwyol eu darllen ond nad yw’r dyluniad yn eu dangos.

## Cyfleustodau

Mae `utilities.css` yn haen ddewisol o ddosbarthiadau traws-gloi: _primitive_ `View`, toriadau yn raddfa token,
a gorchmynion lliw semantig. Yn wahanol i ddosbarthiadau cydran `-modifier`, maent yn defnyddio **dau gôt** (`--mod`) fel na fyddant byth yn gwrthdaro â enwau modiwleiddwyr cydran, ac maent yn berthnasol i unrhyw
elfen — unig, neu wedi’u cyfuno ar gydran.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Arwyneb accent-blue gyda testun on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Wedi’i ganoli gyda mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — mae `.instui-view` yn `View` InstUI. Dyma’r sylfaen rydych yn haenu toriadau a lliw ar ei
ben, ac mae’n cario modiwleiddwyr allweddol-werth ar gyfer ei bropratau gweledol ei hun fel na ddylech gyrraedd am y cyfleustodau:
`-background-*` (ei arwynebau), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, a `-cursor-*` — mae’r rhain yn foddau un-dash `view` eu hunain,
heb gysylltiad â’r cyfleustodau dau-dash isod. Mae propiau gwerth-rhydd
(led/uchel/ mewnosodiad) yn aros fel arddulliau ar-lein; mae `margin`/`padding` yn defnyddio’r cyfleustodau toriadau.

**Toriadau** — dosbarthiadau fesul ochr ar y graddfa toriadau. Darllenwch hwy fel `{m|p}{side}-{step}`: `m` ar gyfer
marged neu `p` ar gyfer padio (neu’r geiriau llawn `margin`/`padding`), yna ochr rhesymol ddewisol, yna cam. Felly mae `.--m-lg` a `.--margin-lg` yr un peth, fel y mae `.--pt-md` a `.--paddingt-md`.

- Ochr: none (pawb), `t`/`b` (dechrau/diwedd bloc), `s`/`e` (dechrau/diwedd mewnol), `x`/`y` (echel mewnol/bloc). Mae ochrau rhesymol yn aros yn gywir mewn rhaglennau dde-i-rag.
- Camau: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ynghyd â `auto` ar gyfer marged yn unig.

Cyfuno hwy ar gyfer shorthand `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Lliw** — gorchmynion semantig sy’n aros ar y palet: `.--bg-<name>` (background),
`.--text-<name>` (lliw testun), a `.--border-<name>` (lliw bwrdd). Mae pob `<name>` yn
ddosbarth lliw semantig — y bwriadau (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) ynghyd â palet `accent-*` (`accent-blue`, `accent-green`, ac yn y blaen). Mae enw yn bodoli yn unig os yw’r tocyn yn bodoli yn y teulu hwnnw, felly nid yw `text-brand` yn ddosbarth — nid oes tocyn brand i destun. Nid oes modd cyrchu rhifyn neu hex aribïtrïol, ac mae pob gorchymyn yn dilyn y thema.

**Teuluoedd tocyn** — mae pob teulu “un tocyn, un eiddo” yn cael dosbarth fesul tocyn, wedi’i enwi ar ôl y
tocyn. Cyfansoddwch hwy’n rhydd:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (a `-depth1`…`-card`) → `box-shadow`

Mae pob un yn gosod dim ond ei briopertïau unig, felly mae angen `border-width`/`border-radius` ar gyfer lliw `border-*` a steil bwrdd i dynnu bwrdd mewn gwirionedd. Maent yn defnyddio’r enw tocyn llawn (`.--border-radius-md`), tra bod y cymorth lliw a thoriadau uchod yn defnyddio aliason byr (`.--bg-brand`, `.--mt-lg`) — mae’r aliasonau’n fyrbwyntiol ar gyfer ergonomeg; mae dosbarthiadau tocyn yn llythrennol ac yn estynedig.

**Trefniant** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) a `.--text-align-<value>` (`start`, `center`, `end`, `justify`) yn cwmpasu proffilau traws-gloi InstUI `display` a `textAlign` (View, Button, Metric, Tabs, …) fel dosbarthiadau y gellir eu cyfuno —
felly nid modiwleiddwyr penodol i bob cydran yw’r rheini.

Mae pob dosbarth dau-dash yn ennill y caesdad yn ddiamau dros fodiwleiddwr cydran unig-ennw o’r un enw, beth bynnag fo trefn mewnforio’r sheitlis — gweler [Confensiynau awduriaeth](/conventions/authoring)
am y mecanwaith.

Mae popeth yma yn bur CSS a gyrrir gan y tokenau `--instui-*`, felly mae’n dilyn InstUI trwy haen y tocyn. Gweler yr [API reference](/api/) am `componentsCss` a’r adeiladwyr fesul-cydran.

## Gorchuddion: deialog a popover

Mae cydrannau gorchudd yn marchogaeth hen-lwybrau platfform, felly maent yn ymddwyn yn hygyrch gyda dim neu ychydig o
JavaScript.

**Modal** — rhowch `.instui-modal` ar `<dialog>` naturiol. Fe gaiff trapio ffocws, cau-gyda-`Esc`, a
`::backdrop` am ddim; mae’r cefnlen wedi’i dywyllu gyda’r un tocyn `--instui-component-mask-background-color`
â `.instui-mask` (ychwanegwch `-blur` i’i rewio). Agorwch a chau gyda gorchmynion invoker — dim sgript:

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

**View cyd-destun / popover** — rhowch `.instui-context-view` ar elfen `[popover]` a’i thoglo gyda
`popovertarget`. Mae’n hedfan ar yr haen uchaf ac yn cael gwared yn ysgafn ar glic tu fas neu `Esc`, eto dim sgript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Trefniant drôr** — rhowch `.instui-drawer-layout` ar wraidd trefniant gyda plant `.tray` a `.content`.
Ychwanegwch yr awgrymyn `open` (neu `-open`) i ddatgelu’r drôr, a defnyddiwch `placement="end"`
(neu `-placement-end`) i’w docio i ochr diweddu mewnol — mae lleoliad yn penderfynu trwy eiddo rhesymol
`inset-inline-*`/`flex-direction`, felly mae’n troi’n awtomatig o dan `dir="rtl"` heb
reolau ychwanegol. Mae’r buntl rhyngweithio canolbwynt yn ychwanegu llwybro gorchmynion Invoker ac yn toglo modd gorchudd
(`should-overlay-tray`) pan fo lled yn croesi `--drawer-layout-min-width` (ddiofyn
`--instui-breakpoints-sm`, yna `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Masg** — mae `.instui-mask` ar gyfer gorchuddion mewn-flow (spinner dros gard); mae `::backdrop` modal yn cwmpasu achos modal.

Mae’r ddau batrwm hefyd wedi’u pacio fel elfennau arferol ymddygiadol yn `@pantoken/web-components`:
`<instui-modal open>` (__`<dialog>` yn cael ei gyrru gan ei nodwedd `open`) a `<instui-context-view>` (popover naturiol).

Cefnogaeth porwr: mae API popover a `popovertarget` yn Baseline 2024; mae gorchmynion invoker
(`command`/`commandfor`) yn Baseline 2025, felly ar borwyr hŷn gwnewch linciau’r botymau i `dialog.showModal()`
fel adran un-lin. Mae lleoli popover wrth ei sbardun yn defnyddio lleoliad anchora CSS lle mae hwnnw’n cael ei gefnogi (Chromium); fel arall mae’n canolbwyntio yn yr haen uchaf.

## Ffurflenni

**FormField** — mae `.instui-form-field` yn lapio CSS-Grid sy’n gosod label, y rheolydd, a negeseuon. Rhowch ef ar `<label>` fel bod y label yn cysylltu â’i reolydd yn naturiol. Mae ganddo dri ardal grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Mae `-layout-stacked` (ddiofyn) yn stacio’r ardaloedd; mae `-layout-inline` yn gosod y label wrth ymyl y rheolydd (addaswch gyda `-label-align-{start,end}` a `-v-align-{top,middle,bottom}`). Mae `-readonly` yn ail-liwio’r label.

Mae’r **asterisk gofynnol** yn ymddangos pan fo’r maes yn ofynnol gan _naill ai_ ddosbarth `-required` _neu_ reolydd naturiol `required` ynddo — felly gallwch osod `required` ar y mewngofnodi a bydd y nod yn ymddangos. Mae’n addurnol (__`::after` ar y label, allan o goedyn hygyrchedd); paru ef ag nodyn fel
"mae caeau wedi’u marcio \* yn ofynnol" oni bai bod y ffurflen yn eglur ei hun.

**FormFieldGroup** — mae `.instui-form-field-group` yn grwpio caeau perthnasol mewn `<fieldset>` gyda disgrifiad `<legend>`. Mae’n hollol drefniant (dim tocynnau penodol): mae’n stacio’r caeau’n ddiofyn;
mae `-layout-columns` / `-layout-inline` yn eu llifo i golofnau ymatebol, gyda `-row-spacing-*` /
`-col-spacing-*` a `-v-align-*` i addasu’r grid.

**RadioInputGroup** — mae `.instui-radio-input-group` yn yr un grwpio `<fieldset>`/`<legend>`,
arbenigol ar gyfer radio. Oherwydd bod y radios plentyn yn rhannu `name`, mae dewis yn un-ddewisiad yn naturiol —
felly mae set o fotymau troi yn ymddwyn fel un rheolydd, nid botymau rhydd. Mae `-variant-simple` (ddiofyn) yn gosod
radios safonol (`-layout-columns`/`-inline` yn eu llifo i rhes); mae `-variant-toggle` yn cysylltu’r
botymau `.instui-radio.-variant-toggle` plentyn yn un rheolydd segmentiedig (byrddau wedi’u cwtogi,
pen-y-mewn yn crwn):

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

**Negeseuon** — mae `.instui-form-field-messages` yn y cynnwys; mae pob `.instui-form-field-message` yn cymryd
`-type-*`: `-type-hint` (llwyd, diofyn), `-type-error` (testun coch + glyff cylch-rhybudd), `-type-success`
(testun gwyrdd + glyff cylch-ticio), a `-type-screenreader-only` (wedi’i dorri’n weledol, yn dal i gael ei gyhoeddi). Mae’r glyffau’n paentio yn `currentColor`, felly maent bob amser yn cyfateb i liw y neges. Mae `-type-new-error` yn hen-enw o `-type-error`. Cysylltwch y cynhwysydd â’r rheolydd gyda `aria-describedby`, a gosodwch
`aria-invalid` ar y rheolydd pan fo gwall.

Mewn FormField, mae neges `-type-error` yn dilyn dilysu ochr-cleient: mae’n aros wedi’i guddio tan fod rheolydd y maes yn `:user-invalid` (naturiol, ar ôl i’r defnyddiwr ryngweithio) — neu gallwch ei orfodi gyda `-invalid`
ar y `.instui-form-field` (ar gyfer gwall gweinydd). Nid yw `.instui-form-field-messages` annibynnol (heb fod mewn maes) yn cael ei effeithio. Mae cylch ffocws y rheolydd yn cydymffurfio: perygl pan fo `:user-invalid`/`-invalid`,
llwyddiant ar `-success`.

**Rheolyddion testun** — mae `.instui-text-input` (**`<input>` naturiol), `.instui-text-area` (**`<textarea>` naturiol,
aralladwy), a `.instui-simple-select` (__`<select>` naturiol gyda caret) yn rhannu un golwg a’r same
statws: `-invalid` (bwrdd gwall), `-success` (bwrdd llwyddiant), `-readonly`, **`:disabled` naturiol, a
`-size-{sm,md,lg}`. Ar gyfer eicon ar y blaen/cynnen (InstUI `renderBeforeInput`/`renderAfterInput`), rhowch y mewnbwn mewn `.instui-input-group` a ychwanegwch slot `.before`/`.after` (glyff `-icon-*`); mae `-should-not-wrap` yn ei gadw ar un linell. Mae `.instui-number-input` yn yr wyneb hwnnw gyda cholofn spinner +/- `.arrows` (**`type="number"` naturiol; cysylltwch y botymau â `stepUp()`/`stepDown()`). Mae `.instui-range-input` yn __`input[type="range"]` wedi’i arddullio sy’n rendro ei werth mewn bwbl gwrthdro `.instui-range-input-value`. Ar gyfer combobox cyfoethog gyda popover rhestr, defnyddiwch `@instructure/ui` — mae’r llyfrgell hon yn cwmpasu’r rheolyddion naturiol.

**Dewis dropdown wedi’i arddullio (arbennig)** — mae `select.css` dewisol yn uwchraddio’r un
elfen `.instui-simple-select`: mae’n arddullio’r dropdown agored (y panel a phob opsiwn, gyda hover a
statws wedi’u dewis) gan ddefnyddio model Select Addasadwy CSS.

> [!WARNING]
> Mae `select.css` yn dibynnu ar `appearance: base-select` / `::picker(select)`, sy’n **arniadol**
> (Chrome 135+, heb fod yn Baseline eto). Fe’i cynhwysir fel sheitlis ar wahân a phob rheol wedi’i gatu
> y tu ôl i `@supports (appearance: base-select)`, felly nid yw’n gwneud dim ar borwyr heb gefnogaeth — mae’r rheolydd `.instui-simple-select` yn aros y select naturiol syml. Llwythwch ef ond os ydych eisiau’r
> dropdown uwchraddiedig a chydnabod y cefnogaeth gyfyngedig.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
