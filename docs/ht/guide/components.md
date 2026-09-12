# Konpozan

`@pantoken/components` livre estil konpozan ki baze sou klas bati soti nan tokens Instructure yo. Enpòte fichye stil la epi tag makèt ou — pa gen okenn kad ki nesesè.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Preferans pou eleman koutim? `@pantoken/web-components` vlope menm estil sa yo kòm `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, ak plis ankò — wè
> [kat pake a](/api/).

## Konvansyon

Konvansyon CSS nan pake sa a baze sou yon vèsyon modifye nan [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatè yo se **kle-valè** — `-<prop>-<val>`, aliyen ak non pwop InstUI — konsa yo li pou
tèt yo: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Pwop boolyen se non pwop la pou kont li, kote prezans vle di `true` (`-has-shadow`, `-clickable`); yon boolyen ki default-on epi vire sou off
envèti li (`-without-background`, `-without-border`). Gwosè aksepte tou de ekriti kout ak long
(`-size-sm` = `-size-small`). Lè yon non devye de InstUI, klas semantik InstUI a toujou mache
men li demode (pa egzanp `-variant-info` → itilize `-color-info`).

### Egzanp

Konpozan React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

konpozan pantoken:

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

Pou `timeout` pwop InstUI a, mete pwopriyete koutim inite-san `--timeout` an milisgond epi chaje
entèraksyon Alert la. Yon valè pozitif pwograme fèmen; `0` (valè default) kite avètisman an
an plas. Ajoute klas `instui-transition -fade-entered` nan itilite `transition` pou fade InstUI a; omèt
yo pou retiraj imedyat. Entèraksyon an kondwi eta `-fade-exiting` epi li tire yon evènman `dismiss` anilab,
ki bay bubbling anvan retire a, konsa yon aplikasyon ka rele `preventDefault()` pou kenbe
avètisman an monte.

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

Bare pwogrè aksepte echèl abitrè atravè `--min` (`0` pa default), `--value`, ak `--max`
(`100` pa default), ak alias demode `--value-now` ak `--value-max`. Ajoute `-should-animate`
pou aplike tranzisyon demi-dezyèm InstUI lè nenpòt valè chanje. `.value` chita ansanm ak `.bar` kòm
yon pitit nan rasin; ajoute `-render-value-inside` pou rann li sou tras la, aliyen ak kòmansman li,
olye de sa (style li pou lizibilite kont koulè mezi a). Itilize yon `<progress>` natif pou yon
seri ki kòmanse nan zewo epi `<meter>` lè minimòm nan pa zewo; web konpozan yo chwazi ant yo
otomatikman soti nan atribi `min` yo. InstUI pa gen eta endetèmine, kidonk yon `<progress>`
ki manke atribi `value` li se yon pi bon sipozisyon sèlman nan pantoken: `progress-bar` anime `.bar` kòm yon
segman glise epi `progress-circle` vire bag li nan yon arc fiks, tou de kache `.value`.

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

Sèk pwogrè aksepte menm echèl abitrè atravè `--min`, `--value`, ak `--max`.
`--value-now` ak `--value-max` rete kòm alias fonksyonèl demode. Ajoute `-should-animate` epi
chaje pake entèraksyon pou konsantre pou reprodwi animasyon monte InstUI a; `--animation-delay` se yon
reta inite-san an milisgond. Ekriti demode `-should-animate-on-mount` ak
`-shold-animate-on-mount` rete alias fonksyonèl.

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

## Prefiks klas

Chak klas gen non espas `instui-` pa default. Konstwi yon fichye stil ak pwòp prefiks pa ou — oswa pa gen okenn — pa
pase `prefix` bay nenpòt konstriktè. Nenpòt valè falsy (`null`, `undefined`, `""`, oswa omisyon li) retire
prefiks la nèt, konsa ou ka otè `class="heading -level-h1"` olye de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifikatè ki gen tach-goumi (`.-color-secondary`, `.-level-h1`) pa chanje nan okenn ka. Fichye stil yo livre pa pake a kenbe prefiks `instui` la.

## Baz

`base.css` se yon reset opt-in ki mete default global dokiman soti nan tokens yo: `box-sizing`, yon
reset `body`, sifas paj la, koulè tèks baz ak polis, `color-scheme` (konsa tokens `light-dark()`
ak kontwòl natif swiv tèm nan), ak yon lyen baz. Chaje li yon fwa, anvan fichye konpozan ak fichye pwaz,
lè pantoken posede paj la.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Sote li lè w ap anbrase konpozan nan yon òt òganizasyon ki deja fè tèm pwòp li yo `html` ak `body` —
reset la pentire sifas paj la, donk ou pa vle li fè konfli ak òt la. Tout sa li mete itilize
selektè `:where()` ki gen espesifikite ba, kidonk pwòp règ ou toujou genyen.

`base.css` _aplike_ polis mak la (`font-family: var(--instui-font-family-base)`, ak fallback sistèm);
pou _chaje_ li, enpòte opt-in `fonts.css` — `@font-face` règleman pou Atkinson Hyperlegible
Next, ki vize woff2 yo livre nan pake a. Li separe paske font yo ~350 kB epi
self-hosting font se yon chwa konsyan.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Kontni lektè ekran

<p>Gen yon mesaj kache apre fraz sa a.<span class="instui-screen-reader-content">Sèlman lektè ekran yo anonse sa.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` kache yon eleman vizyèlman pandan li kenbe li nan pyebwa aksèbilite a
— pou etikèt ak tèks estati ke teknoloji asistans ta dwe li men desen an pa dwe montre.

## Itilite

`utilities.css` se yon kouch opt-in nan klas kwa-koupe: yon primitif `View`, espas sou echèl token,
ak ranplasman koulè semantik. Kontrè ak `-modifier` klas konpozan yo, sa yo itilize yon **de-goumen**
(`--mod`) konsa yo p'ap janm kolizyon ak non modifikatè konpozan an, epi yo aplike sou nenpòt
eleman — bare, oswa konpoze sou yon konpozan.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Sifas accent-blue ak tèks on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Santre ak mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` se `View` InstUI a. Se baz la sou ki ou kouch espas ak koulè, epi li
pote modifikatè kle-valè pou pwòp pwop vizyèl li pou ou pa bezwen pase nan itilite:
`-background-*` (sifas li yo), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ak `-cursor-*` — sa yo se modifikatè
ak yon sèl tach pou `view` li yo, ki pa gen rapò ak doub-tach itilite ki anba yo. Pwop valè lib
(lajè/wo/ankadreman) rete stil anliyn; `margin`/`padding` itilize itilite espas yo.

**Espas** — klas pou chak bò sou echèl espas la. Li yo kòm `{m|p}{side}-{step}`: `m` pou
marge oswa `p` pou padding (oswa mo konplè `margin`/`padding`), yon kote lojik opsyonèl, epi yon
pa. Donk `.--m-lg` ak `.--margin-lg` se menm bagay la, menm jan `.--pt-md` ak `.--paddingt-md` egal.

- Bò: none (tout), `t`/`b` (kòmansman/fin blòk), `s`/`e` (kòmansman/fin liy), `x`/`y` (aks inline/block). Bò lojik rete kòrèk nan layout dwat-a-gòch.
- Pa: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plis `auto` pou marge sèlman.

Konpoze yo pou `margin="small auto large"` racourci InstUI a:
`class="--mt-sm --mx-auto --mb-lg"`.

**Koulè** — ranplasman semantik ki rete sou-palet: `.--bg-<name>` (background),
`.--text-<name>` (koulè tèks), ak `.--border-<name>` (koulè fwontyè). Chak `<name>` se yon
token koulè semantik — entansyon yo (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plis palèt `accent-*` (`accent-blue`, `accent-green`, elatriye). Yon non sèlman egziste si token an egziste nan fanmi sa a, konsa `text-brand` pa yon klas — tèks pa gen
token mak. Pa gen fason pou jwenn yon primitif oswa yon hex o aza, epi chak ranplasman swiv
tèm nan.

**Fanmi token** — chak fanmi "yon token, yon pwopriyete" jwenn yon klas pou chak token, ki rele apre token an. Konpoze yo lib:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ak `-depth1`…`-card`) → `box-shadow`

Chak mete sèlman pwopriyete pa li, kidonk `border-width`/`border-radius` bezwen yon koulè `border-*` ak yon stil fwontyè pou aktyèlman trase yon fwontyè. Sa yo itilize non token konplè a (`.--border-radius-md`), pandan ke èd koulè ak espas pi wo a itilize alias kout (`.--bg-brand`, `.--mt-lg`) — alias yo se ti kout men ergonomic; klas token yo literè ak egzostif.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ak `.--text-align-<value>` (`start`, `center`, `end`, `justify`) kouvri pwop kwazman-koupe InstUI yo `display` ak `textAlign` (View, Button, Metric, Tabs, …) kòm klas konpozab —
donk sa yo pa modifikatè pou chak konpozan.

Chak klas double-goumen genyen kaskad la determenistikman sou yon modifikatè konpozan menm-non,
kèlkeswa lòd enpòte fichye stil la — wè [Konvansyon otè](/conventions/authoring)
pou mekanis la.

Tout sa isit la se CSS pwòp ki kondwi pa tokens `--instui-*`, kidonk li swiv InstUI atravè kouch token an. Gade [Referans API](/api/) pou `componentsCss` ak konstriktè pou chak konpozan.

## Overlays: dyalòg ak popover

Konpozan overlay yo itilize primitif natif platfòm yo, konsa yo konpòte yo aksesib ak ti oswa pa gen
JavaScript.

**Modal** — mete `.instui-modal` sou yon `<dialog>` natif. Li jwenn bloke fokus, `Esc`-pou-fèmen, ak yon
`::backdrop` gratis; backdrop la fè nwa ak menm token `--instui-component-mask-background-color`
tankou `.instui-mask` (ajoute `-blur` pou friz li). Louvri ak fèmen li ak kòmand invoker — pa gen script:

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

**View kontèks / popover** — mete `.instui-context-view` sou yon eleman `[popover]` epi tougle li ak
`popovertarget`. Li chita sou kouch anwo a epi li fè yon leve-limyè lè klike deyò oswa `Esc`, ankò pa gen script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Layout drawer** — mete `.instui-drawer-layout` sou yon rasin layout ak pitit `.tray` ak `.content`.
Ajoute atribi `open` (oswa `-open`) pou revele tray la, epi itilize `placement="end"`
(oswa `-placement-end`) pou dok li sou bò inline-end — plasman rezoud atravè pwopriyete lojik
`inset-inline-*`/`flex-direction`, konsa li vire otomatikman anba `dir="rtl"` san
règ siplemantè. Pake entèraksyon ki konsantre a ajoute routage kòmand Invoker ak toggles mòd overlay
(`should-overlay-tray`) lè lajè travèse `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, lè sa a `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` rete pou overlays an-fliy (yon spinner sou yon kat); `::backdrop` modal la kouvri ka modal la.

Tou de modèl yo tou vlope kòm eleman koutim konpòtman nan `@pantoken/web-components`:
`<instui-modal open>` (yon `<dialog>` kondwi pa atribi `open` li) ak `<instui-context-view>` (yon
popover natif).

Sipò navigatè: API popover la ak `popovertarget` se Baseline 2024; kòmand invoker
(`command`/`commandfor`) se Baseline 2025, kidonk sou navigatè pi ansyen mare bouton yo a `dialog.showModal()`
kòm yon fallback yon-ligne. Pozisyone yon popover toupre deklanche li itilize pozisyonman anchor CSS kote
li sipòte (Chromium); lòt kote li santre nan kouch anwo a.

## Fòm

**FormField** — `.instui-form-field` se yon rido CSS-Grid ki plase yon etikèt, kontwòl la, ak nenpòt
mesaj. Mete li sou yon `<label>` konsa etikèt la asosye natirèlman ak kontwòl li. Li gen twa zòn grid
— `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) pil zòn yo; `-layout-inline` mete etikèt la bò kote kontwòl la (ajiste
ak `-label-align-{start,end}` ak `-v-align-{top,middle,bottom}`). `-readonly` rekoulè etikèt la.

Asteris obligatwa a parèt lè chan an obligatwa swa pa klas `-required` _oswa_ pa yon
kontwòl natif `required` andedan li — konsa ou ka jis mete `required` sou input la epi mak la parèt.
Li dekoratif (yon `::after` sou etikèt la, deyò pyebwa aksèbilite a); pè li ak yon nòt tankou
"chan make \* yo obligatwa" sòf si fòm nan deja klè.

**FormFieldGroup** — `.instui-form-field-group` gwoupe chan ki gen rapò nan yon `<fieldset>` ak yon
deskripsyon `<legend>`. Li se sèlman layout (pa gen tokens dedye): default pil chan yo;
`-layout-columns` / `-layout-inline` kouri yo nan kolòn reponn, ak `-row-spacing-*` /
`-col-spacing-*` ak `-v-align-*` pou ajiste griy la.

**RadioInputGroup** — `.instui-radio-input-group` se menm rido `<fieldset>`/`<legend>` la,
espesyalize pou radyo. Paske pitit radyo yo pataje yon `name`, seleksyon se natirèlman chwa-yon sèl —
donk yon seri bouton toggle konpòte kòm yon sèl kontwòl, pa bouton apa. `-variant-simple` (default) plase
radyo estanda (`-layout-columns`/`-inline` kouri yo nan yon ranje); `-variant-toggle` konekte
pitit bouton `.instui-radio.-variant-toggle` yo nan yon sèl kontwòl segmante (fwontyè kole,
bout ekstèn awondi):

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

**Mesaj** — `.instui-form-field-messages` se kontenè a; chak `.instui-form-field-message` pran yon
`-type-*`: `-type-hint` (gri, default), `-type-error` (tèks wouj + yon glif sikil-alèt), `-type-success`
(vèt tèks + yon glif sikil-chèk), ak `-type-screenreader-only` (koupe vizyèlman, toujou anonse).
Glif yo pentire nan `currentColor`, konsa yo toujou matche koulè mesaj la. `-type-new-error` se yon
alias demode nan `-type-error`. Mare kontenè a ak kontwòl la ak `aria-describedby`, epi mete
`aria-invalid` sou kontwòl la lè gen yon erè.

Anndan yon FormField, yon mesaj `-type-error` swiv validasyon bò kliyan: li rete kache jiskaske
kontwòl chan an vin `:user-invalid` (natif, apre itilizatè a entèaji) — oswa ou fòse li ak `-invalid`
sou `.instui-form-field` (pou yon erè bò sèvè). Yon `.instui-form-field-messages` endepandan (pa nan
yon chan) pa afekte. Bag fokus kontwòl la swiv menm: danje lè `:user-invalid`/`-invalid`,
siksè sou `-success`.

**Kontwòl tèks** — `.instui-text-input` (natif `<input>`), `.instui-text-area` (natif `<textarea>`,
resizable), ak `.instui-simple-select` (natif `<select>` ak yon caret) pataje yon sèl aparans ak menm
eta yo: `-invalid` (fwontyè erè), `-success` (fwontyè siksè), `-readonly`, natif `:disabled`, ak
`-size-{sm,md,lg}`. Pou yon ikon devan/dèyè (InstUI `renderBeforeInput`/`renderAfterInput`), anvlòp
input la nan `.instui-input-group` epi ajoute yon slot `.before`/`.after` (yon glif `-icon-*`); `-should-not-wrap`
kenbe li sou yon sèl liy. `.instui-number-input` se fasad sa a plis yon kolòn spinner +/- `.arrows` (natif
`type="number"`; mare bouton yo ak `stepUp()`/`stepDown()`). `.instui-range-input` se yon
`input[type="range"]` style kote valè li rann nan yon bòl envèse `.instui-range-input-value`. Pou yon combobox rich
ak yon listbox popover, chwazi `@instructure/ui` — bibliyotèk sa a kouvri kontwòl natif yo.

**Select dropdown estilize (eksperimantal)** — yon opt-in `select.css` amelyore menm
eleman `.instui-simple-select`: li stilize dropdown ouvri a (panèl la ak chak opsyon, ak eta hover ak
selected) lè l sèvi avèk modèl CSS Customizable Select.

> [!WARNING]
> `select.css` depann sou `appearance: base-select` / `::picker(select)`, ki se **eksperimantal**
> (Chrome 135+, pa ankò Baseline). Li livre kòm yon fichye opt-in separe e chak règ se bloke
> dèyè `@supports (appearance: base-select)`, konsa li pa fè anyen nan navigatè ki pa sipòte — kontwòl
> `.instui-simple-select` rete jis select natif plenn lan. Chaje li sèlman si ou vle dropdown
> amelyore a epi aksepte sipò limite a.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
