# Komponentat

`@pantoken/components` šaddá klassa-bargga komponentta stilmusaid mat leat bargguid Instructure tokenbargguid gaskkas. Importere
styleheet ja merkka markuppan — ain dohko framværdnje.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Preferere guovddáš elementtat? `@pantoken/web-components` válddeheap dasa sama stilmusaid `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, ja máŋga mas —
> iegodat [package map](/api/).

## Konventuvnnat

CSS-konventuvnnat dál paketii leat basedat muhtun veršuvnna [RSCSS](https://ricostacruz.com/rscss/index.html) dohkorvuhtii.

Modifisera leat **avddas-čájá** — `-<prop>-<val>`, InstUI prop-nammasiid gilvvos — dak galget sáhttit čállit dahkat:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-propaat leat prop
namma iežamet, mii gal dáhpáhusa lea `true` (`-has-shadow`, `-clickable`); default-on boolean mii lea váikkuhit
inverta `-without-background`, `-without-border`. Suoidniid válddehat ovttas hui lágidan muhtun skrivvuid
(`-size-sm` = `-size-small`). Gos nama maid háliida InstUI-st, InstUI-semantihkka klassa lea maŋemus ja
deprekahttasahttá (dat. `-variant-info` → geavaha `-color-info`).

### Dádjá

Instructure UI React komponenta:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken komponentat:

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

InstUI `timeout` proppa, setta unitless `--timeout` muhtun proprietta millisekundas ja loada
Alert-interakšuvnna. Positiiva vērdni schedulereh dahkat; `0` (default) leat alertta ruoktas. Adda `transition`
utilihttas `instui-transition -fade-entered` klassaid InstUI fade-dál; ovttas dihte dahkát nu ahte snahtta. Interakšuvdna ohjjá `-fade-exiting`
státusa ja geavaha cancellable, bubblin `dismiss` event mii válddehahttá, dat app sáhte čájehit `preventDefault()` mainnit
alertta mount-tuvvon.

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

Progress-barrat válddehat arbitrary skaalat `--min` (`0` by default), `--value`, ja `--max`
(`100` by default), deprekahtta `--value-now` ja `--value-max` aliášaid. Adda `-should-animate`
maŋit InstUI'n ovtta-sekunda transition gos vērdni muhtii. `.value` leat `.bar` mellett juohke
rootin eanet; add `-render-value-inside` maŋit dan renderrá track'a dahje, muhto alignera start'a,
insteaddá (stylit geavahusat legibility maŋit meter color'a). Use nehterá `<progress>` sihkkar range ja `<meter>` gos minimum ii lea noll; web komponentat
valii nuhtii dahje daid `min` attributta bargoheap automatihkalaš. InstUI'n ii leat indeterminate státus, dasgo `<progress>`
mii leat without `value` attributta leat pantoken-dán maid njuolga dárkkadus: `progress-bar` animajá `.bar` sihkkar
sliding segmenttas ja `progress-circle` spinna ruvnna fixed arc's, juovlla `.value`.

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

Progress-circlat válddehat sama arbitrary skaalat `--min`, `--value`, ja `--max`.
`--value-now` ja `--value-max` leat deprekahttta funcional aliášaid. Adda `-should-animate` ja
loada focused interaction bundle maŋit reproducerrá InstUI mount animation; `--animation-delay` lea
unitless millisekundalaš delay. Deprekahttta `-should-animate-on-mount` ja
`-shold-animate-on-mount` skrivvuid leat sihkkar funkcional aliášaid.

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

## Klassen prefiks

Juokšuvat klassat leat namespace'd `instui-` by default. Bouwta stylesheet ovddasbargguid prefiksa — dahje ii — mainna
passera `prefix` mii lohkat buot builder:s. Dušše falsy vērdni (`null`, `undefined`, `""`, dahje olmmošáiggi) rievdad
prefiks mannat, dasgo sáhtát girjjit `class="heading -level-h1"` nu`class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Dash-prefiksearvodat modifierat (`.-color-secondary`, `.-level-h1`) leat váldos ivdnodat olbmui. Styleheetat mii paketii šaddá `instui` prefiks.

## Basša

`base.css` lea opt-in reset mii settaa global dokumenta defaults tokenbargguid gaskkas: `box-sizing`, `body` reset, page surface, bas text color ja font, `color-scheme` (dasgo `light-dark()` tokenat
ja nehterá controllat lusa thema), ja basa link. Loada muhtin, vuođđi komponenta ja prose
sheets, gos pantoken ovtta guovtti.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Skiphea dan gos don embedda komponentat host'a mii already theme'a eanet `html` ja `body` —
reset paint'a page surface, dasgo ii leat good dát host'iga. Buot mii settehaš beassat geavahit
low-specificity `:where()` selector:a, dasgo dii eanet doarvái dutnje rules.

`base.css` _applera_ brand font'a (`font-family: var(--instui-font-family-base)`, system
fallbacksa); da _load_ dii, importera opt-in `fonts.css` — `@font-face` rullegát Atkinson Hyperlegible
Next, mat ovtta woff2s mii paketii. Dat leat eret go faces leat ~350 kB ja
self-host font'a lea deliberate valgu.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skermmearráš čuottalusat

<p>Dat leat nihtečajánus mas muhto dohkket. <span class="instui-screen-reader-content">Guktit skermmearrášit girjjit dan doarvái.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` hide'r elementa visuvnalaččat go dat čállá accessibility-risttaga
— label'ide ja státusa text'ide mii assistive tech gal dohkkit muhto design ii leat dasa čállán.

## Utilihttat

`utilities.css` lea opt-in layer cross-cutting klassaid: `View` primitive, spacing token
skaalabargguid, ja semantic color overrides. Agu component `-modifier` klassaid, dii geavat **duvttin
dash** (`--mod`) dasgo dii minnge sáhttet eai riššat komponenta modifier nammad, ja dii applera buot
elementta — bare dahje komponennas composeerat.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue surface with on-color text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centered with mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` lea InstUI'n `View`. Dat lea basša mii layerer spacing ja color pässi, ja
bearra key-value modifieraid visuvnala propiid daide leat gullohusa dasgo utilihttat:
`-background-*` (su surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ja `-cursor-*` — dii leat `view`'s
own single-dash modifierat, man ii leat borran double-dash utilihttain. Free-value propaid
(width/height/inset) leat inline styllas; `margin`/`padding` geavat spacing utilihttas.

**Spacing** — per-side klassaid spacing skaala. Čállat daid nugo `{m|p}{side}-{step}`: `m` margin dahje `p` padding (dahje full
sanaid `margin`/`padding`), optional logical side, nu vai step. Dasto `.--m-lg` ja `.--margin-lg` leat sama, nugo `.--pt-md` ja `.--paddingt-md`.

- Sides: none (buot), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  axis). Logical sides boahtteheamis dálgeheap lihkosihttit giđđa-right-to-left layouts.
- Steps: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ja `auto` margin doarvái.

Compose dakkajit InstUI `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — semantic overrides mii bargga on-palette: `.--bg-<name>` (background),
`.--text-<name>` (text color), ja `.--border-<name>` (border color). Juokse `<name>` lea
semantic color token — intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) ja `accent-*` paleta (`accent-blue`, `accent-green`, ja nu go dahje). Nama lea lassin jos token lea daja family's, dasgo `text-brand` ii leat klassa — text'n ii leat brand token. Ii leat beaivváhit primitiva dahje arbitrár hex, ja buot override follovvra thema.

**Token familyat** — juohke "one token, one property" familyi geavahána klassa per token, namma tokenmii. Compose vástádusaid:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ja `-depth1`…`-card`) → `box-shadow`

Juokse geavahit doarvvut ovttas buot, dasgo `border-width`/`border-radius` galge leat `border-*` color ja border
style mainnit boahtit border. Dii geavat buot full token-nen (`.--border-radius-md`), muhto color ja spacing helpers ovttas goaleas aliases (`.--bg-brand`, `.--mt-lg`) — aliasat leat ergonoomalaš shortcuts; token klassat leavvot literal ja exhaustiv.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ja `.--text-align-<value>` (`start`, `center`, `end`, `justify`) coverera InstUI'n
cross-cutting `display` ja `textAlign` propaid (View, Button, Metric, Tabs, …) nugo composebara klassaid —
dasa ii leat per-komponent modifierat.

Buot double-dash klassa válddeha cascade'a deterministtalaš above same-named single-dash komponenta
modifier, ain ii berošt stylesheet import-ođđa — iegodat [Authoring conventions](/conventions/authoring)
mechanism'a.

Buot dál pure CSS mii ohjaa `--instui-*` tokenbargguid gaskkas, dasgo dat track'á InstUI token layer. Iegodat [API reference](/api/) `componentsCss` ja per-komponent builders.

## Overlayat: dialoga ja popover

Overlay komponentat gávdno native platform primitive:t, dasgo dii behávva accesability guovddáš váldas dahje máhte
JavaScript.

**Modal** — set `.instui-modal` dihte native `<dialog>`. Dat leat focus trapping, `Esc`-ma_close, ja
`::backdrop` muhto muhtin; backdrop lea dimmed dahje sama `--instui-component-mask-background-color`
token nu `.instui-mask` (adda `-blur` maŋit frost'it). Open ja close invoker commands — ii script:

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

**Context view / popover** — set `.instui-context-view` dihte `[popover]` elementta ja toggle dii riŋga
`popovertarget`. Dat lea top layer ja light-dismisses outside-click dahje `Esc`, dego ii script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — set `.instui-drawer-layout` root layout'á main `.tray` ja `.content`
childrean. Adda `open` attributta (dahje `-open`) maŋit reveal'er tray, ja geavaha `placement="end"`
(dahje `-placement-end`) adda dock'a inline-end sáhka — placement resolve:ra logical
`inset-inline-*`/`flex-direction` propii, dasgo dat flip'a automatihkalaš under `dir="rtl"` ii vuolde
extra rules. Focused interaction bundle addá Invoker command routing ja toggle overlay mode
(`should-overlay-tray`) gos width cross'a `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, das ná `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` stay in-flow overlays (spinner over card); modal'n `::backdrop`
cover'a modal-casem.

Buot patternaid sáhttet leat wraps nugo behavioral custom elementtat `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` drivven dahje `open` attributta) ja `<instui-context-view>` (native popover).

Browser support: popover API ja `popovertarget` leat Baseline 2024; invoker commands
(`command`/`commandfor`) leat Baseline 2025, dasgo olde browseraide barggahit bind buttons to `dialog.showModal()`
nugo one-line fallback. Positione popover céahppi trigger'á geavahit CSS anchor positioning gos
support'a (Chromium); muhttun čuojahit dahje centers top layer.

## Fomas

**FormField** — `.instui-form-field` lea CSS-Grid wrapper mii layout'á label, controlla, ja buot
messages. Setta da `<label>` dasgo label associate'á controlla nativalaš. Dat leat golbma grid
areas — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) stack'a áreas; `-layout-inline` setta label boras controlla (tune
geavahit `-label-align-{start,end}` ja `-v-align-{top,middle,bottom}`). `-readonly` recolora label'a.

**Required asterisk** álbmot go fálaldatšuvnnas lea required _nuppin_ `-required` class _dahje_ native `required` control inside it — dasgo sáhtát just set `required` input'ii ja mark shows.
Dat lea dekoratiivva ( `::after` label'ain, out accessibility tree); pair'a dan nugo
"fields marked \* are required" jos fomas ii leat obvious.

**FormFieldGroup** — `.instui-form-field-group` gruppá related fields in `<fieldset>` vástádusa ja
`<legend>` descriptión. Dat lea pure layout (ii dedicated token): default stack'a fields;
`-layout-columns` / `-layout-inline` flow dii responsiva columns, geavahit `-row-spacing-*` /
`-col-spacing-*` ja `-v-align-*` maŋit tune grid.

**RadioInputGroup** — `.instui-radio-input-group` lea sama `<fieldset>`/`<legend>` grouping,
specialisera radios. Dađđa radios childra share'a `name`, selection lea nativalaš single-choice —
dasgo set toggle buttons behave nugo one control, ii loos buttons. `-variant-simple` (default) layout standard radios (`-layout-columns`/`-inline` flow dii row); `-variant-toggle` connect'a child `.instui-radio.-variant-toggle` buttons into single segmented control (collapsed borders,
rounded outer ends):

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

**Messages** — `.instui-form-field-messages` lea container; juokse `.instui-form-field-message` gávdno
`-type-*`: `-type-hint` (gray, default), `-type-error` (ruoks text + circle-alert glyph), `-type-success`
(ruohta text + circle-check glyph), ja `-type-screenreader-only` (visually clipped, das leat guoskadus).
Glyphs paint'á `currentColor`, dasgo dii almmuhađat message color'ain. `-type-new-error` lea
deprekahttta alias `-type-error`. Wire container to controlla geavahit `aria-describedby`, ja set
`aria-invalid` controlla gos dárkkadus lea.

FormField sisne, `-type-error` message follow client-side validation: dat eatna hide'a go
field'a controlla lea `:user-invalid` (native, duopmái user interactii) — dahje don force'ra daid geavahit `-invalid`
on `.instui-form-field` (server-side error). Standalone `.instui-form-field-messages` (ii field:s) leat unaffected. Controlla focus ring follow'a: danger gos `:user-invalid`/`-invalid`,
success gos `-success`.

**Text controllat** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), ja `.instui-simple-select` (native `<select>` with caret) share ođđa look ja same
states: `-invalid` (error border), `-success` (success border), `-readonly`, native `:disabled`, ja
`-size-{sm,md,lg}`. For leading/trailing icon (InstUI `renderBeforeInput`/`renderAfterInput`), wrap
input in `.instui-input-group` ja add `.before`/`.after` slot ( `-icon-*` glyph); `-should-not-wrap`
keep'a on one line. `.instui-number-input` lea facade plus `.arrows` +/- spinner column (native
`type="number"`; wire buttons to `stepUp()`/`stepDown()`). `.instui-range-input` lea styled
`input[type="range"]` mii value render'a in `.instui-range-input-value` inverse bubble. For rich
combobox with listbox popover, use `@instructure/ui` — library covers native controllat.

**Styled select dropdown (experimental)** — opt-in `select.css` upgrade'a _same_
`.instui-simple-select` elementta: dat style'a open dropdown (panel ja juođiid option, hover ja
selected státusat) CSS Customizable Select model'a geavaheap.

> [!WARNING]
> `select.css` reliance'ar `appearance: base-select` / `::picker(select)`, mii lea **experimental**
> (Chrome 135+, ii geahčen Baseline). Dat šaddá separate opt-in sheet ja buot rullegi leat gate'd
> behind `@supports (appearance: base-select)`, dasgo ii doalvvo daid browsers mii ii suport'era — `.instui-simple-select` controlla just lea plain native select. Loada das go don váldit enhanced dropdown ja acceptera limited support.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
