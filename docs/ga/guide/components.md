# Comhpháirteanna

`@pantoken/components` seoltaíonn stíleanna comhpháirte bunaithe ar ranga a tógadh ó na toicní Instructure. Iompórtáil an stíleagraf agus cuir lipéad ar do marcáil — níl aon fhráma ag teastáil.

```ts
import "@pantoken/components/components.css";
```

> [!NÓTA]
> Is fearr eilimintí saincheaptha? Cuirtear na stíleanna céanna sin i gclúdach ag `@pantoken/web-components` mar `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, agus níos mó — féach an
> [mapa pacáiste](/guide/packages).

## Coinbhéisí

Tá na coinbhéisí CSS sa phacáiste seo bunaithe ar leagan modhnaithe de [RSCSS](https://ricostacruz.com/rscss/index.html).

Is **eochair-luach** iad na modhnóirí — `-<prop>-<val>`, ailínithe le hainmneacha prop InstUI — mar sin léitear iad gan cur amú: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Is ainm prop amháin iad props bolscaireachta, agus ciallaíonn a láithreacht `true` (`-has-shadow`, `-clickable`); casann bolscaireas réamhshocraithe as a mhalairt (`-without-background`, `-without-border`). Glacann méideanna beirt scríbhinní gearra agus fada
(`-size-sm` = `-size-small`). Nuair a sháraíonn ainm InstUI, oibríonn an rang seimhneach InstUI fós
ach tá sé as úsáid (m.sh. `-variant-info` → bain úsáid as `-color-info`).

### Sampla

Comhpháirt React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

comhpháirteanna pantoken:

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

Maidir le prop `timeout` de InstUI, socraigh an mhaitrís neamh-aonadach `--timeout` mar mhaoin shaincheaptha i milliseicindí agus luchtú
an idirghníomhaigh Alert. Sceidealóidh luach dearfach díothú; fágann `0` (an réamhshocrú) an rabhadh ina áit. Cuir na ranganna `instui-transition -fade-entered` den `transition` fóntais le haghaidh éirí InstUI; seachnaigh iad le haghaidh bainte láithreach. Tiomáineann an idirghníomhú an stádas `-fade-exiting` agus losaíonn sé imeacht so-ghlanadh,
aisghairteach `dismiss` sular baineadh é, ionas gur féidir le feidhmchlár glaoch ar `preventDefault()` chun an
rabhadh a choinneáil slán.

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

Glacann barraí dul chun cinn scálaí ar bith trí `--min` (`0` de ghnáth), `--value`, agus `--max`
(`100` de réir réamhshocraithe), le aliásanna as úsáid `--value-now` agus `--value-max`. Cuir `-should-animate`
chuige chun trasúlú leath-soicind InstUI a chur i bhfeidhm gach uair a athraíonn luach. Tá `.value` ar thaobh `.bar` mar
iníon den fréamhshamhail; cuir `-render-value-inside` air chun é a tharraingt os cionn an rian, ailínithe lena tús,
in áit sin (stíl é le haghaidh léitheacht i gcoinne dath an mhéadair). Úsáid `<progress>` dúchais le haghaidh
raon bunaithe ar nialas agus `<meter>` nuair atá an íosmhéid neamh-nialasach; roghnaíonn na comhpótaí gréasáin eatarthu
go huathoibríoch óna hairíonna `min`. Níl stádas neamhchinnte ag InstUI, mar sin is réalachas pantoken é `<progress>`
a chailltear a hairíonna `value`: réamhshocraítear `progress-bar` `.bar` mar
seanmhír sleamhnáin agus casann `progress-circle` a fáinne ag aird taoibe seasta, ag cur i bhfolach `.value` beirt.

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
Fanann `--value-now` agus `--value-max` mar aliásanna feidhmiúla as úsáid. Cuir `-should-animate` agus
luchtú an baisnéise idirghníomhaigh dírithe chun athghiniú an ghluais bhunaidh mount InstUI a fheiceáil; is mhoill milliseicindí neamh-aonadach é `--animation-delay`. Fanann na scríbhinní `-should-animate-on-mount` agus
`-shold-animate-on-mount` (a bhfuil an litriú seanbhainteach) mar aliásanna feidhmiúla.

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

## Réamhfhocal rang

Tá gach rang ainmspásáilte mar `instui-` de réir réamhshocraithe. Tóg stíleagraf le do réamhfhocal féin — nó gan aon cheann — trí
`prefix` a threorú chuig aon thógálaí. Baintear an réamhfhocal go hiomlán má thabharfar luach bréagach ar bith (`null`, `undefined`, `""`, nó é a fhágáil amach), mar sin is féidir leat `class="heading -level-h1"` a údairiú in áit `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Níl na modhnóirí le dash (réamhphrefixáilte) (`.-color-secondary`, `.-level-h1`) athraithe ar aon bhealach. Coinníonn na
stíleagrafaí a seolfar leis an bpacáiste an réamhfhocal `instui`.

## Bun

Is athshocrú roghnach é `base.css` a shocraíonn réamhshocruithe doiciméad domhanda ón toicní: `box-sizing`, athshocrú
`body`, dromchla an leatháin, dath agus cló téacs bonn, `color-scheme` (ionas go leanfaidh toicní `light-dark()`
agus rialuithe dúchasacha an téama), agus nasc bun. Luchtú é uair amháin, roimh na scaileanna comhpháirte agus próis, nuair atá pantoken i gceannas ar an leathanach.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Seachain é nuair atá tú ag cuimilt comhpháirteanna isteach i óstach a théamaíonn a `html` agus `body` féin cheana —
cuireann an athshocrú dromchla an leatháin i bpéint, mar sin ní oireann sé le comhréireacht leis an óstach. Úsáidtear roghanna íseal-sonrachais `:where()`,
mar sin buaileann do riachtanais féin i gcónaí.

Cuirtear an cló branda i bhfeidhm ag `base.css` (`font-family: var(--instui-font-family-base)`, le fillteáin chóras); chun é a luchtú, iompórtáil an `fonts.css` roghnach — tá rialacha `@font-face` le haghaidh Atkinson Hyperlegible
Next, ag léiriú na woff2anna a sheolfar sa phacáiste. Tá sé ar leith mar tá na aghaidheanna thart ar ~350 kB agus rogha fhreastalaí féin ar chlódóirí ar chinneadh measartha.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ábhar léitheoir scáileáin

<p>Tá teachtaireacht i bhfolach tar éis an abairt seo.<span class="instui-screen-reader-content">Ní fhógraíonn ach léitheoirí scáileáin é seo.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Cuir i bhfolach eilimint go físúil ach coinnigh í sa chrann inrochtaineachta le `.instui-screen-reader-content`
— do lipéid agus téacs stádais atá le léamh ag teicneolaíocht chúnamh ach nach bhfuil an dearadh ag iarraidh a thaispeáint.

## Féinmhuintearas

Is sraith roghnach é `utilities.css` de ranganna tras-choitianta: primitiúin `View`, spásáil ar scála na toicní, agus ábhair dathanna seimhneacha. Murab ionann agus na ranganna `-modifier` comhpháirte, úsáideann siad **dhá-dash** (`--mod`) ionas nach ndéanfaidh siad coinbhleacht riamh le hainmneacha modhnóra comhpháirte, agus cuireann siad i bhfeidhm iad ar aon
eilimint — lom, nó comhdhéanta ar chomhpháirt.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Dromchla accent-blue le téacs on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Láraithe le mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — is é `.instui-view` an `View` de InstUI. Is é an bonn ar cuireann tú spásáil agus dath air, agus iompróidh sé modhnóirí eochair-luach dá chuid féin ionas nach mbeidh ort dul i dteagmháil le fóntais:
`-background-*` (a dromchlaí), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, agus `-cursor-*` — is iad seo modhnóirí aon-dash `view` féin,
neamhbhaintim le na fóntais dhá-dash thíos. Fanann props luach-saor (leithead/airde/insí) mar stíleanna líne; úsáideann `margin`/`padding` na fóntais spásála.

**Spásáil** — ranganna in aghaidh an taobha ar an scála spáis. Léigh iad mar `{m|p}{side}-{step}`: `m` do
mairg nó `p` do fheistiú (nó na focail iomlána `margin`/`padding`), taobh loighciúil roghnach, ansin céim. Mar sin tá `.--m-lg` agus `.--margin-lg` mar an gcéanna, agus mar sin tá `.--pt-md` agus `.--paddingt-md`.

- Taobha: none (go léir), `t`/`b` (tús/ deireadh bloc), `s`/`e` (tús/ deireadh líne), `x`/`y` (ais líne/ bloc). Fanann taobha loighciúla ceart i leaganacha deas-go-ciúin.
- Céimeanna: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` do mhairg amháin.

Comhcheangail iad le haghaidh shorthanda `margin="small auto large"` de InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Dath** — sraitheanna seimhneacha a fhanann ar-phailéad: `.--bg-<name>` (cúlra),
`.--text-<name>` (dath téacs), agus `.--border-<name>` (dath teorainne). Tá gach `<name>` ina thicnó dath seimhneach — na réitigh i gceist (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus an phailéad `accent-*` (`accent-blue`, `accent-green`, agus mar sin de). Níl ainm ann ach má tá an toicnó sa chlann sin, mar sin níl `text-brand` mar rang — níl token branda do théacs. Níl bealach le rochtain a fháil ar phiriméad ná hex randamach, agus leanann gach corrlach an téama.

**Clanna toicnó** — cuireann gach teaghlach "one token, one property" rang amháin in aghaidh gach toicnó, ainmniúcháin tar éis an toicnó. Comhcheangail iad go saor:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (agus `-depth1`…`-card`) → `box-shadow`

Socraíonn gach ceann díobh ach a mhaoin amháin, mar sin tá gá le `border-width`/`border-radius` le haghaidh dath agus stíl teorainne chun teorann i ndáiríre a tharraingt. Úsáidtear an t-ainm iomlán toicnó (`.--border-radius-md`), cé go n-úsáideann na cúntóirí dath agus spásála thuas aliásanna gearra (`.--bg-brand`, `.--mt-lg`) — is giorrúcháin chompordacha iad na aliásanna; tá na ranganna toicnó litriúil agus iomlán.

**Leagan** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) agus `.--text-align-<value>` (`start`, `center`, `end`, `justify`) clúdaíonn airíonna tras-choitianta `display` agus `textAlign` InstUI (View, Button, Metric, Tabs, …) mar ranganna in-athchomhdhlúite —
mar sin níl siad modhnóirí do gach comhpháirt ar leith.

Buaileann gach rang dhá-dash an cascade go cinnte thar modhnóir aon-dash dá ainm, beag beann ar ord iompórtála na stíleagraf — féach [Coinbhéisí údair](/conventions/authoring)
don mheicníocht.

Tá gach rud anseo ina CSS glan tiomáinte ag na toicní `--instui-*`, mar sin leanann sé InstUI tríd an sraith toicní. Féach an [tagairt API](/api/) do `componentsCss` agus na tógálacha in aghaidh an chomhpháirte.

## Oslánaí: dialóg agus popover

Tá na comhpháirteanna osláin ag úsáid prímáideacha dúchasacha an ardáin, mar sin iompraíonn siad go incháilithe le beagán nó gan aon
JavaScript.

**Modal** — cuir `.instui-modal` ar `<dialog>` dúchais. Faigheann sé greamaíocht fócas, `Esc`-le-dún, agus
`::backdrop` go saor; tá an backdrop doimhne le céim toicní `--instui-component-mask-background-color`
mar `.instui-mask` (cuir `-blur` leis chun é a reo). Oscail agus
dún é le horduithe invoker — gan script:

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

**Deasc comhthéacs / popover** — cuir `.instui-context-view` ar eilimint `[popover]` agus casadh air le
`popovertarget`. Tá sé ar an sraith uachtair agus déanann sé dí-aistriúchán é ar chliceáil lasmuigh nó `Esc`, arís gan script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Leagan tarraiceán** — cuir `.instui-drawer-layout` ar fréamh leagan le páistí `.tray` agus `.content`.
Cuir an hairíonna `open` (nó `-open`) chun an tráid a nochtadh, agus bain úsáid as `placement="end"`
(nó `-placement-end`) chun é a dhaingniú don taobh deireadh líne — réitítear suíomh tríd
airíonna loighciúla `inset-inline-*`/`flex-direction`, mar sin casann sé go huathoibríoch faoi `dir="rtl"` gan rialacha breise. Cuirann an baisnéis idirghníomhaigh dírithe ordú invoker agus steerann sé modh osláin
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

**Mask** — fanann `.instui-mask` do osláin san sruth (spinner os cárta); clúdaíonn `::backdrop`
an cás modal.

Tá an dá phatrún pacáistithe freisin mar eilimintí saincheaptha iompraíochta i `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` tiomáinte ag a hairíonna `open`) agus `<instui-context-view>` (popover dúchais).

Tacaíocht bhrabhsálaí: tá API popover agus `popovertarget` ina Bhonn 2024; tá ordú invoker
(`command`/`commandfor`) ina Bhonn 2025, mar sin ar bhrabhsálaithe níos sine ceangail na cnaipe le `dialog.showModal()`
mar chúlshocrú líne amháin. Úsáideann suíomh popover in aice lena spreagthóir phostú CSS anchor nuair a thacaítear leis (Chromium); in áiteanna eile lárnaíonn sé sa sraith uachtair.

## Foirmeacha

**FormField** — is wrapair CSS-Grid é `.instui-form-field` a leagan amach lipéad, an rialú, agus aon teachtaireachtaí. Cuir é ar `<label>` ionas go ndéanann an lipéad nascleanúint le rialú go dúchasach. Tá trí réigiún greille aige — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Leagann `-layout-stacked` (réamhshocrú) na réimsí síos; cuireann `-layout-inline` an lipéad i taobh an rialaithe (tune
le `-label-align-{start,end}` agus `-v-align-{top,middle,bottom}`). Athdathann `-readonly` an lipéad.

Tá an **réaltóir riachtanach** le feiceáil nuair atá an réimse éigeantach de chuid _ceachtar_ an rang `-required` _nó_ rialtóir dúchais `required` laistigh de — mar sin is féidir leat `required` a shocrú ar an ionchur agus beidh an marc le feiceáil.
Tá sé maisiúil ( `::after` ar an lipéad, as an chrann inrochtaineachta ); péireáil é le nóta cosúil le
"réimsí marcáilte \* atá riachtanach" mura bhfuil an fhoirm soiléir ina féin.

**FormFieldGroup** — grúpálann `.instui-form-field-group` réimsí gaolmhara i `<fieldset>` le cur síos `<legend>`. Is é an leagan amach íon (gan toicní tiomnaithe): seachadann réamhshocrú na réimsí;
cuireann `-layout-columns` / `-layout-inline` iad isteach i gcolúin freagracha, le `-row-spacing-*` /
`-col-spacing-*` agus `-v-align-*` chun an greille a choigeartú.

**RadioInputGroup** — is é `.instui-radio-input-group` an ghrúpáil céanna `<fieldset>`/`<legend>`,
speisialaithe do raidió. Toisc go roinntear `name` leis na raidió páistí, tá rogha aonair dúchasach —
mar sin iompraíonn sraith cnaipe lasc mar rialú aonair, ní cnaipe scaoilte. Leaganann `-variant-simple` (réamhshocrú)
raidió caighdeánach (`-layout-columns`/`-inline` iad a shruthú isteach i mharcáin); nascann `-variant-toggle` na
cnaipí `.instui-radio.-variant-toggle` le chéile mar rialú scoilte (teorainneacha comhbhrúite,
deirgeanna imill chiorclacha):

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

**Teachtaireachtaí** — is é `.instui-form-field-messages` an coimeádaí; glacann gach `.instui-form-field-message` `-type-*`: `-type-hint` (liath, réamhshocrú), `-type-error` (téacs dearg + giolla ciorcal-rabhadh), `-type-success`
(téacs glas + giolla seiceáil-chiorcal), agus `-type-screenreader-only` (dealraithe go físúil, fós fógartha).
Péinteálann na giollaí i `currentColor`, mar sin comh-mhaireann siad leis an dath teachtaireachta. Is aliás as úsáid é `-type-new-error` de `-type-error`. Ceangail an coimeádaí leis an rialú le `aria-describedby`, agus socraigh
`aria-invalid` ar an rialú nuair atá earráid ann.

Laistigh de FormField, leanann teachtaireacht `-type-error` bailíochtúchán ar thaobh an chliaint: fanann sí i bhfolach go dtí go bhfuil rialú an réimse `:user-invalid` (dúchasach, tar éis idirghníomhaigh an úsáideora) — nó cuirfidh tú é trí `-invalid`
ar an `.instui-form-field` (do earráid ó fhreastalaí). Níl aon tionchar ag `.instui-form-field-messages` aonair (gan bheith i réimse). Leanann fáinne fócas an rialaithe an riail freisin: contúirt nuair `:user-invalid`/`-invalid`,
rath ar `-success`.

**Rialuithe téacs** — roinntear cuma agus stáit ar `.instui-text-input` ( `<input>` dúchasach), `.instui-text-area` ( `<textarea>` dúchasach,
inathraithe), agus `.instui-simple-select` ( `<select>` dúchasach le cúrsóir), agus na stáit chéanna: `-invalid` (teorann earráide), `-success` (teorann rath), `-readonly`, `:disabled` dúchasach, agus
`-size-{sm,md,lg}`. Le haghaidh íocón tosaigh/déanta ( `renderBeforeInput`/`renderAfterInput` InstUI), cuimligh an ionchur i `.instui-input-group` agus cuir sliotán `.before`/`.after` (giolla `-icon-*`); coinníonn `-should-not-wrap`
é ar líne amháin. Is é `.instui-number-input` an aghaidh sin le colún spinner +/- `.arrows` (dúchasach
`type="number"`; ceangail na cnaipí le `stepUp()`/`stepDown()`). Is `.instui-range-input` `input[type="range"]` stíleáilte é a léireann a luach i bublán inbhéart `.instui-range-input-value`. Le haghaidh combobox saibhir le popover liosta, bain úsáid as `@instructure/ui` — clúdaíonn an leabharlann seo na rialuithe dúchasacha.

**Roghchlár roghnaithe stíleáilte (trialach)** — uasghrádaíonn `select.css` roghnach an _chomh_ eilimint `.instui-simple-select`: stíleáil an liosta oscailte (an phainéal agus gach rogha, le stádas hover agus roghnaithe) ag úsáid an Mhúnla Roghnaithe Inúsáidte CSS.

> [!RÉITIGH]
> Tá `select.css` ag brath ar `appearance: base-select` / `::picker(select)`, atá **trialach**
> (Chrome 135+, nach bhfuil Baseline fós). Tá sé seolta mar shraith roghnach ar leith agus tá gach riail ailínithe taobh thiar de `@supports (appearance: base-select)`, mar sin ní dhéanann sé aon rud i mbrabhsálaithe neamh-thacaíochta — fanann an rialtóir `.instui-simple-select` mar an roghchlár dúchasach simplí. Luchtú é má tá tú ag iarraidh an roghchlár feabhsaithe agus glacadh leis an tacaíocht teoranta.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
