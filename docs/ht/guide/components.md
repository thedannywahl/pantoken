# Konpozan

`@pantoken/components` voye stil konpozan ki baze sou klas bati soti nan tokens Instructure yo. Enpòte
fèy stil la epi make markup ou — pa bezwen okenn kad.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Pi pito eleman koutim? `@pantoken/web-components` vlope menm estil sa yo kòm `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, ak plis ankò — gade
> [kat pake a](/guide/packages).

## Konvansyon

Konvansyon CSS nan pake sa a baze sou yon vèsyon modifye nan [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatè yo se **kle-valè** — `-<prop>-<val>`, aliyen ak non pwop InstUI — konsa yo li
poukont yo: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Pwop boolean se non pwop la sèlman,
kote prezans vle di `true` (`-has-shadow`, `-clickable`); yon boolean ki default-on vire
lè li etenn (`-without-background`, `-without-border`). Gwosè yo aksepte toude fòm kout ak long
(`-size-sm` = `-size-small`). Lè yon non devye de InstUI, klas semantik InstUI a toujou mache
men li dezapwouve (egzanp `-variant-info` → itilize `-color-info`).

### Egzanp

Konpozan React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken konpozan:

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

Pou pwop `timeout` InstUI a, mete pwopriyete koutim san inite `--timeout` an milisèkond epi chaje
entèraksyon Alert la. Yon valè pozitif pwograme fèmen; `0` (default) kite alèt la
nan plas li. Ajoute klas `instui-transition -fade-entered` nan sèvis utilite `transition` pou fade InstUI a; pa mete yo pou retire imedyat. Entèraksyon an kondwi eta `-fade-exiting` epi pouse yon evènman cancellable,
bubbling `dismiss` anvan retire a, konsa yon aplikasyon ka rele `preventDefault()` pou kenbe
alèt la monte.

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

Bar pwogrè yo aksepte echèl o aza atravè `--min` (`0` pa default), `--value`, ak `--max`
(`100` pa default), ak alias dezapwouve `--value-now` ak `--value-max`. Ajoute `-should-animate`
pou aplike tranzisyon demi-dezyèm InstUI a chak fwa yon valè chanje. `.value` chita ansanm ak `.bar` kòm
yon pitit rasin; ajoute `-render-value-inside` pou rann li sou tras la, aliyen ak kòmansman li,
otreman (style li pou li lizib kont koulè mezi a). Sèvi ak yon `<progress>` natif natal pou yon
ranj zewo-baze epi `<meter>` lè minimòm lan pa zewo; web konpozan yo chwazi ant yo
otomatikman soti nan atribi `min` yo. InstUI pa gen eta endetèmine, kidonk yon `<progress>`
ki manke atribi `value` se yon devinèt sèlman pantoken: `progress-bar` anime `.bar` kòm yon
segment glise epi `progress-circle` vire bag li a nan yon arc fiks, toude kache `.value`.

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

Sèk pwogrè yo aksepte menm echèl o aza atravè `--min`, `--value`, ak `--max`.
`--value-now` ak `--value-max` rete kòm alias fonksyonèl dezapwouve. Ajoute `-should-animate` epi
chaje pakèt entèraksyon pou konsantre pou rekree animasyon monte InstUI a; `--animation-delay` se yon
reta san inite an milisèkond. Fòm yo dezapwouve `-should-animate-on-mount` ak
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

Chak klas gen non espas `instui-` pa default. Bati yon fèy stil ak pwòp prefiks ou — oswa pa gen okenn — pa
pase `prefix` bay nenpòt konstriktè. Nenpòt valè falsy (`null`, `undefined`, `""`, oswa lè ou pa mete li) retire
prefiks la nèt, konsa ou ka otè `class="heading -level-h1"` olye de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifikatè ki gen tirè-prefiks (`.-color-secondary`, `.-level-h1`) pa chanje nan okenn ka. Fèy stil yo voye pa pake a kenbe prefiks `instui`.

## Baz

`base.css` se yon reset opsyonèl ki mete default dokiman global soti nan tokens yo: `box-sizing`, yon
reset `body`, sifas paj la, koulè tèks baz ak font la, `color-scheme` (pou `light-dark()` tokens
ak kontwòl natif natal suiv tèm nan), ak yon lyen baz. Chaje li yon sèl fwa, anvan fèy konpozan ak fèy pwòz
yo, lè pantoken posede paj la.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Sote li lè w ap anbede konpozan nan yon òt ki deja fè tèm pwòp li yo `html` ak `body` —
reset la pentire sifas paj la, kidonk ou pa vle li konfwonte òt la. Tout sa li mete itilize
selektè `:where()` ki gen espesifikite ba, kidonk pwòp règ ou yo toujou genyen.

`base.css` _aplike_ font mak la (`font-family: var(--instui-font-family-base)`, ak rezerv sistèm);
pou _chaje_ li, enpòte `fonts.css` opsyonèl la — `@font-face` règ pou Atkinson Hyperlegible
Next, ki pwen sou woff2 yo distribye nan pake a. Li separe paske fòm yo ~350 kB epi
òganize tèt pou font se yon chwa delibere.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Kontni lektè ekran

<p>Gen yon mesaj kache apre fraz sa a.<span class="instui-screen-reader-content">Se sèlman lektè ekran ki anons sa.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` kache yon eleman vizyèlman pandan li kenbe li nan pyebwa aksèbilite a
— pou etikèt ak tèks estati ke teknoloji asistans ta dwe li men konsepsyon an pa ta dwe montre.

## Utilitè

`utilities.css` se yon kouch opsyonèl nan klas kwa-koupe: yon primitif `View`, espas sou echèl token an,
ak ranplasman koulè semantik. Kontrèman ak klas konpozan `-modifier`, sa yo itilize yon **double
tirè** (`--mod`) konsa yo pa janm kolizyon ak non modifikatè konpozan yo, epi yo aplike sou nenpòt
eleman — senp, oswa konpoze sou yon konpozan.

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

**View** — `.instui-view` se `View` InstUI a. Li se baz ou aplike espas ak koulè sou li, epi li
pote modifikatè kle-valè pou pwòp pwop vizyèl li yo konsa ou pa bezwen ale nan utilitè:
`-background-*` (sifas li yo), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ak `-cursor-*` — sa yo se modifikatè
ak yon sèl tirè `view` pou pwòp li, ki pa gen rapò ak utilitè double-tirè yo pi ba. Pwop valè-libre
(lajè/wotè/inset) rete style inline; `margin`/`padding` itilize utilitè espas yo.

**Espas** — klas pou chak bò sou echèl espas la. Li yo kòm `{m|p}{side}-{step}`: `m` pou
marge oswa `p` pou padding (oswa mo konplè `margin`/`padding`), yon bò lojik opsyonèl, epi
yon etap. Kidonk `.--m-lg` ak `.--margin-lg` se menm bagay la, menm jan `.--pt-md` ak `.--paddingt-md`.

- Bò: none (tout), `t`/`b` (kòmansman/fin blòk), `s`/`e` (kòmansman/fin entèlen) , `x`/`y` (aks inline/block).
  Bò lojik rete kòrèk nan layout ki soti adwat-a-goch.
- Etap: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plis `auto` pou margin sèlman.

Konpoze yo pou `margin="small auto large"` shòthand InstUI a:
`class="--mt-sm --mx-auto --mb-lg"`.

**Koulè** — ranplasman semantik ki rete sou palèt la: `.--bg-<name>` (background),
`.--text-<name>` (koulè tèks), ak `.--border-<name>` (koulè bord). Chak `<name>` se yon
token koulè semantik — entansyon yo (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plis palèt `accent-*` (`accent-blue`, `accent-green`, elatriye). Yon non
la la sèlman si token an egziste nan fanmi sa a, kidonk `text-brand` pa yon klas — tèks pa gen
token mak. Pa gen fason pou rive sou yon primitif oswa yon hex o aza, epi chak ranplasman swiv
tèm nan.

**Fanmi token** — chak fanmi "yon token, yon pwopriyete" gen yon klas pa token, nonmen apre
token an. Konpoze yo lib:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ak `-depth1`…`-card`) → `box-shadow`

Chak youn mete sèlman pwopriyete li, kidonk `border-width`/`border-radius` bezwen yon koulè `border-*` ak yon estil bord
pou aktyèlman trase yon bord. Sa yo itilize non token konplè (`.--border-radius-md`), pandan ke
helpers koulè ak espas pi wo yo itilize alias kout (`.--bg-brand`, `.--mt-lg`) — alias yo se ti kout,
klas token yo literal epi egzostif.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ak `.--text-align-<value>` (`start`, `center`, `end`, `justify`) kouvri pwopriyete kwa-koupe InstUI yo
`display` ak `textAlign` (View, Button, Metric, Tabs, …) kòm klas konpozab —
donk sa yo pa modifikatè pa konpozan.

Chak klas double-tirè genyen kaskad la detèmine sou yon modifikatè konpozan menm-non ak yon sèl-tirè, kèlkeswa lòd enpòte fèy stil yo — gade [Konvansyon authoring](/conventions/authoring)
pou mekanis la.

Tout bagay isit la se CSS pwòp ki kondwi pa tokens `--instui-*`, kidonk li suiv InstUI atravè kouch token an. Gade [referans API](/api/) pou `componentsCss` ak konstriktè pa konpozan yo.

## Overlays: dialog ak popover

Konpozan overlay yo itilize primitif platfòm natif natal, kidonk yo konpòte yo aksesib avèk ti oswa pa gen JavaScript.

**Modal** — mete `.instui-modal` sou yon `<dialog>` natif natal. Li jwenn konfinman fokis, fèmen pa `Esc`, ak yon
`::backdrop` gratis; backdrop la fonse ak menm token `--instui-component-mask-background-color`
kòm `.instui-mask` (ajoute `-blur` pou kraze li). Louvri ak fèmen li ak invoker commands — pa gen script:

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

**Context view / popover** — mete `.instui-context-view` sou yon eleman `[popover]` epi alterne li ak
`popovertarget`. Li monte nan kouch anlè a epi fè light-dismiss sou klik ekstèn oswa `Esc`, ankò pa gen script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — mete `.instui-drawer-layout` sou yon rasin layout ak `.tray` ak `.content`
pitit. Ajoute atribi `open` (oswa `-open`) pou revele tray la, epi itilize `placement="end"`
(oswa `-placement-end`) pou dokke li sou bò inline-end — plasman rezoud atravè pwopriyete lojik
`inset-inline-*`/`flex-direction`, konsa li vire otomatikman anba `dir="rtl"` san
règ adisyonèl. Pakèt entèraksyon konsantre a ajoute routage koumand Invoker ak altène mòd overlay
(`should-overlay-tray`) lè lajè travèse `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, Lè sa a `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` rete pou overlays nan koule (yon spinner sou yon kat); yon modal `::backdrop`
kouvri ka modal la.

Tou de modèl yo anplis tou vlope kòm eleman koutim konpòtman nan `@pantoken/web-components`:
`<instui-modal open>` (yon `<dialog>` kondwi pa atribi `open`) ak `<instui-context-view>` (yon
popover natif natal).

Sipò navigatè: popover API a ak `popovertarget` se Baseline 2024; invoker commands
(`command`/`commandfor`) se Baseline 2025, kidonk sou navigatè ki pi ansyen mare bouton yo ak `dialog.showModal()`
kòm yon fallback yon-liy. Pozisyone yon popover bò kote trigger li itilize pozisyonman anchor CSS kote
li sipòte (Chromium); lòt kote li santre nan kouch anlè a.

## Fòm

**FormField** — `.instui-form-field` se yon anvlòp CSS-Grid ki ranje yon etikèt, kontwòl la, ak nenpòt
mesaj. Mete li sou yon `<label>` pou etikèt la asosye nativman ak kontwòl li. Li gen twa zòn rezo — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) pile zòn yo; `-layout-inline` mete etikèt la bò kote kontwòl la (ajiste avèk `-label-align-{start,end}` ak `-v-align-{top,middle,bottom}`). `-readonly` recolor etikèt la.

Asterisk **obligatwa** parèt lè chan an obligatwa pa _swa_ klas `-required` _oswa_ yon
kontwòl natif natal `required` andedan li — kidonk ou ka jis mete `required` sou input la epi mak la parèt.
Li dekoratif (yon `::after` sou etikèt la, soti nan pyebwa aksèbilite); pè li ak yon nòt tankou
"chan make \* yo obligatwa" sòf si fòm nan klè pou tèt li.

**FormFieldGroup** — `.instui-form-field-group` gwoupe chan ki gen rapò nan yon `<fieldset>` ak yon
deskripsyon `<legend>`. Li se sèlman layout (pa gen tokens dedye): default la stack chan yo;
`-layout-columns` / `-layout-inline` fè yo koule nan kolòn reponn, ak `-row-spacing-*` /
`-col-spacing-*` ak `-v-align-*` pou ajiste grid la.

**RadioInputGroup** — `.instui-radio-input-group` se menm gwoup `<fieldset>`/`<legend>`,
espesyalize pou radios. Paske radios pitit yo pataje yon `name`, seleksyon an se natirèlman yon sèl-chwa —
donk yon seri bouton toggle konpòte yo kòm yon sèl kontwòl, pa bouton lib. `-variant-simple` (default) ranje
radios estanda (`-layout-columns`/`-inline` fè yo koule nan yon ranje); `-variant-toggle` konekte
pitit bouton `.instui-radio.-variant-toggle` yo nan yon sèl kontwòl segmante (borders kolapsé,
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
`-type-*`: `-type-hint` (gri, default), `-type-error` (tèks wouj + glyph circle-alert), `-type-success`
(vèt tèks + glyph circle-check), ak `-type-screenreader-only` (vizyèlman klipé, toujou anons). Glyph yo pentire nan `currentColor`, konsa yo toujou matche koulè mesaj la. `-type-new-error` se yon
alias dezapwouve nan `-type-error`. Konekte kontenè a ak kontwòl la ak `aria-describedby`, epi mete
`aria-invalid` sou kontwòl la lè gen yon erè.

Anndan yon FormField, yon mesaj `-type-error` swiv validasyon bò-klian: li rete kache jiskaske
kontwòl chan an vin `:user-invalid` (natif natal, apre itilizatè a entèaji) — oswa ou fòse li ak `-invalid`
sou `.instui-form-field` (pou yon erè bò-sèvè). Yon `.instui-form-field-messages` endepandan (pa nan
yon chan) pa afekte. Bag fokis kontwòl la swiv menm bagay la: danje lè `:user-invalid`/`-invalid`,
siksè sou `-success`.

**Kontwòl tèks** — `.instui-text-input` (natif natal `<input>`), `.instui-text-area` (natif natal `<textarea>`,
rezizable), ak `.instui-simple-select` (natif natal `<select>` ak yon caret) pataje yon sèl aparans ak menm
eta yo: `-invalid` (bò erè), `-success` (bò siksè), `-readonly`, natif natal `:disabled`, ak
`-size-{sm,md,lg}`. Pou yon icon avan/dèyè (InstUI `renderBeforeInput`/`renderAfterInput`), anvlòp
input la nan `.instui-input-group` epi ajoute yon slot `.before`/`.after` (yon glyph `-icon-*`); `-should-not-wrap`
kenbe li sou yon liy. `.instui-number-input` se fasad sa a plis yon kolòn spinner +/- `.arrows` (natif natal
`type="number"`; konekte bouton yo ak `stepUp()`/`stepDown()`). `.instui-range-input` se yon
`input[type="range"]` style kote valè li rann nan yon ti balon inverse `.instui-range-input-value`. Pou yon combobox rich ak yon popover listbox, itilize `@instructure/ui` — bibliyotèk sa a kouvri kontwòl natif natal yo.

**Select dropdown style (eksperimantal)** — yon `select.css` opsyonèl amelyore menm
eleman `.instui-simple-select` la: li style dropdown ouvè a (panèl la ak chak opsyon, ak eta hover ak
selekte) itilize modèl CSS Customizable Select la.

> [!WARNING]
> `select.css` depann sou `appearance: base-select` / `::picker(select)`, ki se **eksperimantal**
> (Chrome 135+, pa ankò Baseline). Li voye kòm yon fèy opsyonèl separe epi chak règ bloke
> dèyè `@supports (appearance: base-select)`, kidonk li pa fè anyen nan navigatè ki pa sipòte — kontwòl
> `.instui-simple-select` la jis rete select natif natal plenn la. Chaje li sèlman si ou vle
> dropdown amelyore a epi aksepte sipò limite a.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
