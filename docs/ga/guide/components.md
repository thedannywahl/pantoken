# Comhpháirteanna

Seolann `@pantoken/components` stíleanna comhpháirte-bhunaithe a tógadh ón na tóicíní Instructure. Allmhaoinigh an stíleabhileog agus cuir lipéad ar do mharcáil — níl aon fhráma riachtanach.

```ts
import "@pantoken/components/components.css";
```

> [!NÓTA]
> An fearr eilimintí sainmhínithe? Cuimsíonn `@pantoken/web-components` na stíleanna céanna seo mar `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, agus tuilleadh — féach an
> [léarscáil phacáiste](/api/).

## Coinbhéisiúin

Tá na coinbhéisiúin CSS sa phacáiste seo bunaithe ar leagan modhnaithe de [RSCSS](https://ricostacruz.com/rscss/index.html).

Is iad na modhnóirí **eochair‑luach** — `-<prop>-<val>`, ailínithe le hainmneacha própa InstUI — mar sin léitear iad féin: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Is iad própaí bolscán (boolean) an t‑ainm própa amháin, áit a chiallaíonn a láithreachas `true` (`-has-shadow`, `-clickable`); má chasann bolscán réamhshocraithe as invertítear é (`-without-background`, `-without-border`). Glacann méideanna an dá leagan gearr agus fada
(`-size-sm` = `-size-small`). Má chuireann ainm sála le InstUI, oibríonn an rang InstUI‑seamanta fós
ach tá sé dúnta (m.sh. `-variant-info` → bain úsáid as `-color-info`).

### Sampla

Comhpháirte React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

comhpháirte pantoken:

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

Do phróip `timeout` de InstUI, socraigh an mhaoin shain‑airíonna gan aon aonad `--timeout` i milliseicindí agus luchtú
an idirghníomhaigh Alert. Socraíonn luach dearfach éalú; `0` (an réamhshocrú) fágann an foláireamh ina
áit. Cuir na ranganna `instui-transition -fade-entered` den uirlis `transition` le haghaidh díghéilleadh InstUI; déan neamhaird orthu má tá tú ag baint
é láithreach. Tiomáineann an idirghníomhaigh stáit `-fade-exiting` agus lasann sé imeacht cancelable,
bublála `dismiss` sula mbaintear, ionas gur féidir le feidhmchlár glaoch ar `preventDefault()` chun an
foláireamh a choinneáil suite.

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

Glacann barraí dul chun cinn scálaí ar bith trí `--min` (`0` de shaghas réamhshocraithe), `--value`, agus `--max`
(`100` de shaghas réamhshocraithe), le haliasanna dúnta `--value-now` agus `--value-max` aosta. Cuir `-should-animate`
chun trasú leath‑soicind InstUI a chur i bhfeidhm gach uair a athraíonn luach. Tá `.value` in aice le `.bar` mar
linbh den fréimnigh; cuir `-render-value-inside` chun é a chur thar an traicte, ailínithe lena tús,
ina ionad sin (stíleáil le haghaidh léitheacht i gcoinne dath an mheitéar). Bain úsáid as `<progress>` dúchais le haghaidh
raon bunaithe ar nialas agus `<meter>` nuair atá an íos‑luach neamh‑nialasach; roghnaíonn na comhpháirteanna gréasáin eatarthu
go huathoibríoch óna n‑airíonna `min`. Níl InstUI i staid indeterminate, mar sin má tá `<progress>`
gan a hairíonna `value` is meastachán pantoken‑amháin é: `progress-bar` animíonn `.bar` mar
seghment sleamhnáin agus casann `progress-circle` a fáinne ag uillinn shocraithe, an dá cheann ag cur i leataobh `.value`.

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

Glacann ciorcail dul chun cinn na scálaí céanna trí `--min`, `--value`, agus `--max`.
Fanann `--value-now` agus `--value-max` mar aicearraí feidhmiúla aosta. Cuir `-should-animate` agus
luchtú an bunteaghráin idirghníomhaigh dírithe chun athshlánú a dhéanamh ar an beoghanú suiteála InstUI; is moill gan aonad i milliseicindí é `--animation-delay`.
Fanann na litreacha scríofa `-should-animate-on-mount` agus `-shold-animate-on-mount` mar aicearraí feidhmiúla dúnta.

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

## Réamhtheideal rang

Tá gach rang ainmhdaithe le spás ainmne `instui-` de ghnáth. Tóg stíleabhileog le do réamhtheideal féin — nó gan rud ar bith — trí
`prefix` a rith chuig aon tógálaí. Droichíonn aon luach falsy (`null`, `undefined`, `""`, nó trí bheith as láthair) an
réamhtheideal go hiomlán, ionas gur féidir leat `class="heading -level-h1"` a údair in ionad `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Níl na modhnóirí le réamhdhath (-‑prefixed) (`.-color-secondary`, `.-level-h1`) athraithe cibé ar bith. Coinníonn na
stíleabhileoga a sheolann an pacáiste an réamhtheideal `instui`.

## Bun

Is athshocrú roghnach é `base.css` a shocríonn réamhshocruithe doiciméid domhanda ó na tóicíní: `box-sizing`, athshocrú
`body`, dromchla na leathanach, dath téacs bunúsach agus cló, `color-scheme` (ionas go n‑rèiteoidh `light-dark()` tóicíní
agus rialuithe dúchais an téama), agus nasc bunúsach. Luchtú uair amháin é, roimh na bileoga comhpháirte agus próis,
nuair a bhfuil pantoken ag úinéireacht ar an leathanach.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Sárthiceáil é má tá tú ag ionchlannú comhpháirteanna i óstach a dhéanann a théamú féin do `html` agus `body` —
cuireann an athshocrú dromchla an leathanaigh péinteáilte, mar sin ní maith leat é ag troid leis an óstach. Úsáideann gach rud a shocríonn sé
seachadáin íseal‑sainmhínithe `:where()`, mar sin buaileann do riail féin i gcónaí.

Cuirtear an cló branda i bhfeidhm le `base.css` (`font-family: var(--instui-font-family-base)`, le easnaimh córas); chun é a luchtú, importáil an roghnach `fonts.css` — rialacha `@font-face` do Atkinson Hyperlegible
Next, ag léiriú na woff2anna a sheoltar sa phacáiste. Tá sé ar leith mar tá na haiceanna thart ar ~350 kB agus rogha ar mhhostáil féin ar
shruthaí cló comhairte ríthábhachtach.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ábhar léitheoirí scáileáin

<p>Tá teachtaireacht i bhfolach tar éis an abairt seo.<span class="instui-screen-reader-content">Ní fhógraíonn ach léitheoirí scáileáin é seo.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Cuireann `.instui-screen-reader-content` eilimint i bhfolach go físúil agus í fós sa chrainn inacmhainneachta
— do lipéid agus téacs stádais a léann teicneolaíocht chúnamh ach nach gcaithfear a thaispeáint sa dearadh.

## Uirlisí

Is sraith roghnach de ranganna tras‑ghréasáin í `utilities.css`: prímad `View`, spásáil ar scála an tóicín,
agus athsheachaintí dath seamantaí. Murab ionann le ranganna `-modifier` comhpháirte, úsáideann siad **dhúbailte‑lus** (`--mod`) ionas nach gcruachóidh siad riamh le hainmneacha modhnóra comhpháirte, agus feidhmíonn siad ar aon
eilimint — lom, nó comhcheangailte le comhpháirt.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Dromchla gorm‑accent le téacs ar‑dath.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Lárnach le mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — is é `.instui-view` `View` InstUI. Is é an bun a chuireann tú spásáil agus dath air, agus iompróidh sé modhnóirí eochair‑luach dá phrópaí féin visíochta ionas nach mbeidh ort dul chuig uirlisí:
`-background-*` (a dromchlaí), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, agus `-cursor-*` — is iad seo modhnóirí aon‑dhosca `view` féin,
neamhbhaintreach le na huirlisí dhúbailte‑lus thíos. Fanann própaí luach‑saor
(leathanach/airde/insteallta) mar stíleanna líne; úsáideann `margin`/`padding` na huirlisí spáisála.

**Spásáil** — ranganna in aghaidh an taobh ar an scála spáisála. Léigh iad mar `{m|p}{side}-{step}`: `m` do
mhairnéas nó `p` do pháda (nó na focail iomlána `margin`/`padding`), taobh loighciúil roghnach, ansin céim. Mar sin tá `.--m-lg` agus `.--margin-lg` mar an gcéanna, mar atá `.--pt-md` agus `.--paddingt-md`.

- Taobhanna: none (go léir), `t`/`b` (tús/deireadh bloic), `s`/`e` (tús/deireadh inline), `x`/`y` (ais inline/bloic). Fanann na taobhanna loighciúla ceart i leaganacha deas‑go‑clé.
- Céimeanna: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` do mhairnéas amháin.

Comhlánaigh iad don ghrinnfhocal `margin="small auto large"` de InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Dath** — athsheachaintí seamanta a choinneáil ar‑phalete: `.--bg-<name>` (cúlra),
`.--text-<name>` (dath téacs), agus `.--border-<name>` (dath imeall). Is tóicín dath seamanta é gach `<name>` —
na hintreachtaí (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus an phalete `accent-*` (`accent-blue`, `accent-green`, agus mar sin de). Tá ainm ann amháin má tá an tóicín sa chlann sin, mar sin níl `text-brand` mar rang — níl tóicín branda do théacs. Níl bealach le rochtain ar phirimid nó hex randamach, agus leanann gach athsheachaint an téama.

**Teaghlaigh tóicín** — faigheann gach teaghlach "tóicín amháin, maoin amháin" rang in aghaidh an tóicín, ainmnithe tar éis an tóicín. Comhlánaigh iad go saor:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (agus `-depth1`…`-card`) → `box-shadow`

Ní leagann ach a mhaoin amháin siad, mar sin beidh `border-width`/`border-radius` ag teastáil ó `border-*` dath agus stíl imeall chun imeall a tharraingt le feiceáil. Úsáidtear an t‑ainm iomlán tóicín (`.--border-radius-md`), agus úsáideann na cúnamhóirí dath agus spáis thuas aicearraí giorra (`.--bg-brand`, `.--mt-lg`) — is giorranna ergonomacha iad na haicearraí; is litriúil agus gnóthach iad na ranganna tóicín.

**Luchtú** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) agus `.--text-align-<value>` (`start`, `center`, `end`, `justify`) clúdaíonn própaí tras‑ghréasáin `display` agus `textAlign` InstUI (View, Button, Metric, Tabs, …) mar ranganna comhlántacha —
mar sin níl siad mar mhodhnóirí in aghaidh an chomhpháirte.

Buaileann gach rang dhúbailte‑lus an chásál go cinnte thar modhnóir aon‑lus leis an ainm chéanna, beag beann ar ordugh luchtaithe stíleabhileog — féach [Coinbhéisiúin údaraithe](/conventions/authoring)
don mheicníocht.

Tá gach rud anseo pure CSS faoi thiomnaithe le tóicíní `--instui-*`, mar sin leanann sé InstUI tríd an sráid‑tóicín. Féach an [Tagairt API](/api/) do `componentsCss` agus na tógálaithe in aghaidh an chomhpháirte.

## Chlúdaigh: dialóg agus popover

Tagann na comhpháirte chlúdaigh le húsáid as prímad dúchasacha an ardáin, mar sin iompar siad go hinacmhainne le beag nó gan aon
JavaScript.

**Módail** — cuir `.instui-modal` ar `<dialog>` dúchasach. Faigheann sé trapáil fócas, dúnadh le `Esc`, agus
`::backdrop` saor in aisce; is é an tóicín `--instui-component-mask-background-color` an ceann céanna le `.instui-mask` (cuir `-blur` leis chun é a reo). Oscail agus dún le horduithe invoker — gan script:

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

**Radharc comhthéacs / popover** — cuir `.instui-context-view` ar eilimint `[popover]` agus lasc é le
`popovertarget`. Tá sé ar an gciseal uachtarach agus baintear é go héadrom ar chliceáil seachtrach nó le `Esc`, arís gan script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Léaráid tarraice** — cuir `.instui-drawer-layout` ar fréimnigh le `.tray` agus le leanaí `.content`.
Cuir an tréith `open` (nó `-open`) chun an tráid a nochtadh, agus bain úsáid as `placement="end"`
(nó `-placement-end`) chun é a dhaockáil ar an taobh istigh‑deirimhe (inline‑end) — réiteoidh an leagan trí mhaoine
loighciúla `inset-inline-*`/`flex-direction`, mar sin casfaidh sé go huathoibríoch faoi `dir="rtl"` gan riail bhreise. Cuir an bunteaghrán idirghníomhaigh dírithe le haghaidh beartclárú ordaithe Invoker agus lascann mód clúdaigh
(`should-overlay-tray`) nuair a sháraíonn leithead `--drawer-layout-min-width` (réamhshocrú
`--instui-breakpoints-sm`, ansin `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Masc** — fanann `.instui-mask` do chlúdaigh laistigh‑srutha (spinner thar cárta); clúdaíonn `::backdrop`
módail an chás módail.

Tá an dá pheatrán wraptha freisin mar eilimintí iompraíochta sa `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` tiomáinte ag a airíonna `open`) agus `<instui-context-view>` (popover dúchasach).

Tacaíocht brabhsálaí: is Bunlíne 2024 í an API popover agus `popovertarget`; is Bunlíne 2025 iad orduithe invoker
(`command`/`commandfor`), mar sin i mbrabhsálaithe níos sine ceangail na cnaipí le `dialog.showModal()`
mar iomlán droichead‑líne. Úsáid suíomhú anchor CSS chun popover a chur in aice lena spreagthóir nuair a thacaítear leis (Chromium); i gceantracha eile láróidh sé sa chiseal uachtarach.

## Foirmí

**FormField** — is wrapair CSS‑Grid é `.instui-form-field` a leagan amach le lipéad, an rialtóir, agus aon
theachtaireachtaí. Cuir é ar `<label>` ionas go gcuireann an lipéad comhoibriú lena rialtóir go dúchasach. Tá trí limistéar greille ann — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Stacann `-layout-stacked` (réamhshocrú) na limistéir; cuireann `-layout-inline` an lipéad in aice leis an rialtóir (coigeartaigh
le `-label-align-{start,end}` agus `-v-align-{top,middle,bottom}`). Athdathann `-readonly` an lipéad.

Taispeántar an **réaltaí riachtanach** nuair a éilítear an réimse ag _cé acu_ an rang `-required` _nó_ rialtóir dúchasach `required` istigh ann — mar sin is leor `required` a chur ar an ionchur agus taispeánfar an marc.
Is maisiúil é ( `::after` ar an lipéad, as an gcraonadh inacmhainneachta); péireáil é le nóta cosúil le
"tá réimsí a bhfuil \* orthu riachtanach" mura bhfuil an fhoirm féin‑léiritheach.

**FormFieldGroup** — grúpálann `.instui-form-field-group` réimsí gaolmhara i `<fieldset>` le
cur síos `<legend>`. Is leagan amach í (gan tóicíní tiomnacha): stacaíonn réamhshocrú na réimsí;
sruthóidh `-layout-columns` / `-layout-inline` iad i gcolúin freagracha, le `-row-spacing-*` /
`-col-spacing-*` agus `-v-align-*` chun an ghreille a choigeartú.

**RadioInputGroup** — is é `.instui-radio-input-group` an grúpáil `<fieldset>`/`<legend>` céanna,
speisialaithe do raidió. Toisc go roinneann na raidí páiste `name`, tá rogha amháin dúchasach — mar sin bailíonn sraith cnaipe lasc mar rialtóir aonair, ní mar chnaipí neamhspleácha. Leagann `-variant-simple` (réamhshocrú) as raidí caighdeánacha (`-layout-columns`/`-inline` iad a shreabhadh isteach i sraith); nascann `-variant-toggle` na
cnaipe `.instui-radio.-variant-toggle` páiste isteach i rialtóir séimeanta aonair (imeallacha comhbhrúite,
deireadh ciorclach seachtrach):

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

**Teachtaireachtaí** — is é `.instui-form-field-messages` an coinnire; tógann gach `.instui-form-field-message` `-type-*`: `-type-hint` (liath, réamhshocrú), `-type-error` (téacs dearg + glóif ciorcail‑foláirimh), `-type-success`
(téacs glas + glóif seic ciorcail), agus `-type-screenreader-only` (gearrtha go físúil, fós fógartha). Péinteálann na glóifí i `currentColor`, mar sin comhlíonann siad i gcónaí dath an teachtaireachta. Is aicearra aosta é `-type-new-error` de `-type-error`. Ceangail an coinnire leis an rialtóir le `aria-describedby`, agus socraigh
`aria-invalid` ar an rialtóir nuair atá earráid ann.

Laistigh de FormField, leanann teachtaireacht `-type-error` bailíochtú ó thaobh an chliaint: fanann sí i bhfolach go dtí go bhfuil rialtóir an réimse `:user-invalid` (dúchasach, tar éis idirghníomhú an úsáideora) — nó í a dhéantar éigin le `-invalid`
ar an `.instui-form-field` (do earráid ó fhreastalaí). Níl tionchar ag `.instui-form-field-messages` neamhspleách (nach bhfuil i réimse). Leanann fáinne fócas an rialtóra an treo céanna: agus riosca nuair atá `:user-invalid`/`-invalid`,
sonas ar `-success`.

**Rialuithe téacs** — roinneann `.instui-text-input` ( `<input>` dúchasach), `.instui-text-area` ( `<textarea>` dúchasach,
inathraithe), agus `.instui-simple-select` ( `<select>` dúchasach le caret) cuma agus stáit chéanna: `-invalid` (imeall earráide), `-success` (imeall rathúnais), `-readonly`, `:disabled` dúchasach, agus
`-size-{sm,md,lg}`. Do shiombail tosaigh/déanta ( `renderBeforeInput`/`renderAfterInput` InstUI), fillfidh tú an ionchur i `.instui-input-group` agus cuirfidh tú sliotán `.before`/`.after` (glóif `-icon-*`); coinníonn `-should-not-wrap`
é ar líne amháin. Is é `.instui-number-input` an aghaidh sin le colún spinner +/- `.arrows` ( `type="number"` dúchasach; nasc na cnaipí le `stepUp()`/`stepDown()`). Is select stíleáilte é `.instui-range-input`
a bhfuil `input[type="range"]` mar luach a thaispeánann i bpobal frithchomhartha `.instui-range-input-value`. Do chomhbhosca saibhir le popover liosta‑bosca, bain úsáid as `@instructure/ui` — clúdaíonn an leabharlann seo na rialuithe dúchasacha.

**Roghchlár roghnú stíleáilte (turgnamhach)** — uasghrádaíonn `select.css` roghnach an `.instui-simple-select` céanna: stíleálann sé an roghchlár oscailte (an painéal agus gach rogha, le staid hover agus roghnaithe) ag baint úsáide as an Múnla Roghnú Inchoigeartaithe CSS.

> [!RABHADH]
> Tá `select.css` ag brath ar `appearance: base-select` / `::picker(select)`, atá **turgnamhach**
> (Chrome 135+, nach bhfuil mar chuid fós de Bunlíne). Seoltar é mar bhileog roghnach ar leith agus tá gach riail faoi `@supports (appearance: base-select)`, mar sin ní dhéanann sé tada i mbrabhsálaithe nach dtacaíonn leis — fanann an rialtóir `.instui-simple-select` díreach an select dúchasach. Luchtú amháin má oireann an roghchlár feabhsaithe duit agus má ghlacann tú leis an tacaíocht theoranta.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
