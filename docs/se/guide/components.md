# Komponenttat

`@pantoken/components` gaskkahusa class-básejuvvon komponentta stilat čuojahit Instructure-tokenaid. Importera
stylesheeta ja tagga markuppa — ii gal boares frameworka.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Dohkkehuvvat ieža elementaid? `@pantoken/web-components` válddeha eanet sama styledat `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, ja muit — geažil
> [package map](/guide/packages).

## Konventšuvnnat

CSS-konventšuvnnat sis dohkkeheapkárat ovttastuvvon veršuvnna [RSCSS](https://ricostacruz.com/rscss/index.html) maid leat modifearet.

Modifiserar leat **vuođđa-válgá** — `-<prop>-<val>`, InstUI-prop-nammai aligned — de sii leat čállan
dáid: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-proppat leat prop
nammagiin iežas, mii geahččii `true` (`-has-shadow`, `-clickable`); dat default-on boolean mii lea mátkabeaivvi
vuođđudit (`-without-background`, `-without-border`). Suoddjit barggá båddodettiin ja olmmoš čuovgga
(`-size-sm` = `-size-small`). Gos namma aldeha InstUI-dieđuid, InstUI-semantihkka class sáhttá deagu
muhto leat deprekeárvuohta (muhto. `-variant-info` → käytte `-color-info`).

### Dálažis

Instructure UI React komponentta:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken komponenttat:

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

InstUI:s `timeout` prop:s, setta unitless `--timeout` custom-prop millisekunddasa ja loada
Alert-interakšuvnna. Positiiva værdde suunná dismissála; `0` (default) de dávjá alertta
ána. Addta `transition` utilitiid `instui-transition -fade-entered` classaid InstUI:s fade‑guin; oalle
dátteheamis gávdnat. Interakšuvnna juoiggá `-fade-exiting` stáhta ja gaskká cancelerbar,
bubbluv `dismiss` event mii oahppot muhtumin, de app sáhtea guovtti `preventDefault()` viežžat
alertta muitala.

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

Progress-barrat acceptera arbitraarana skálas dál `--min` (`0` default), `--value`, ja `--max`
(`100` default), deprekeárvuohta `--value-now` ja `--value-max` aliassat. Addta `-should-animate`
máilbmuid aplikere InstUI:s beasse-sekundda transition gos värddii muuttá. `.value` sáhttá leat `.bar` bálvalusas
root:na; addta `-render-value-inside` classa sii galgá renderera olggobeal track:in, alignerad start:iin,
istamin (stilta dasa legibility meter color:in). Käytä native `<progress>` nugo
zero-pohjainen range ja `<meter>` gos minimuma lea eará-juokseva; web-komponentat valmáhvuođat daid
automatiskt dalle `min` attributta. InstUI:dal lea ii indeterminate státus, nupp `<progress>`
mii eai lea `value` attributta sáhttá leat pantoken-only best guess: `progress-bar` animere `.bar` nugo
sliding segment ja `progress-circle` rávvese ringa fixed arc:s, buot hidde `.value`.

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

Progress-circles acceptera sama arbitraarana skálaid dál `--min`, `--value`, ja `--max`.
`--value-now` ja `--value-max` gávdnidjá maid leat deprekeárvuohta functional aliassat. Addta `-should-animate` ja
loada focused interaction-bundle dasa reproducejá InstUI:s mount‑animáša; `--animation-delay` lea unitless millisecond delay. Deprekeárvuohta `-should-animate-on-mount` ja
`-shold-animate-on-mount` skrivvut leat funkšuvdnalaš aliassat.

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

## Class prefix

Buot class leat namespaced `instui-` defaultiid. Bovddá stylesheet ieža prefix:in — vai dahje ii — bohtet
`prefix` mihkkár builder:iin. Buot falsy værddit (`null`, `undefined`, `""`, vai omitting)
dáhpá prefix fárrui, nu ahte sáhtát autor `class="heading -level-h1"` statt `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Dash-prefixed modifiserat (`.-color-secondary`, `.-level-h1`) leat eará dihtii maid. Stylesheetat mii fáidnehot paketii keepa `instui` prefixin.

## Basih

`base.css` lea opt‑in reset mii setta global document defaulta token:iid: `box-sizing`, `body` reset, page surface, base text color ja font, `color-scheme` (nu `light-dark()` token:at
ja native controllat tracka thema), ja base link. Loada dasa go pantoken omistá sivu.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Skippe da go dárkanat komponenttat embedda host:iin mii already theme:er ieža `html` ja `body` —
reset olbmu vuođđuje page surface, niin don wanta ii beroha host:in. Buot maid mii setta uses
low-specificity `:where()` selectors, niin ieža ruledat álggevuođa guovtti.

`base.css` _applyi_ brand-font:in (`font-family: var(--instui-font-family-base)`, system
fallbacks); për _loaddá_ dat, importera opt‑in `fonts.css` — `@font-face` rules Atkinson Hyperlegible
Next:iin, mole davvis woff2s mii fáidnet paketis. Separate lea dasa maid faces lea ~350 kB ja
self-hosting fonddat lea deliberate val.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skírreadára obsah

<p>Dat leat heaset gávnnat maŋemus dolgga. <span class="instui-screen-reader-content">Dasto doarvái skírreadárat geahččet dán.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` heitá elementta visuvnna muhto čállá dan accessibility-tree:iin
— labelaid ja status text mii assistive tech galget čállit mutta design ii leat dasa.

## Utilitat

`utilities.css` lea opt‑in layer cross-cutting classaid: `View` primitiv, spacing token-scale:in, ja semantihkka color overrides. Eará komponentta `-modifier` classaid, dacu dahká **double
dash** (`--mod`) nu ahte ii barggut collide komponentta modifiseranammuid, ja sii applya buot
elementta — bare vai komponenda luhtte.

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

**View** — `.instui-view` lea InstUI:s `View`. Dat lea base mii don layera spacing ja color lágidan, ja
su livká key-value modifierat iežas visual-proppain niin don ii galggá geavahit utilitat:
`-background-*` (su surface:at), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ja `-cursor-*` — dakka leat `view`'s iežas
single-dash modifiserat, eai leat geavahus double-dash utilitat:mii. Free-value prop:at
(width/height/inset) leat inline-stylea; `margin`/`padding` geavahusa spacing-utilities.

**Spacing** — per-side classaid spacing scale:is. Čállat daid nugo `{m|p}{side}-{step}`: `m` margin dahje `p` padding (vai dássán `margin`/`padding`), optional logical side, ja step. Nubb `.--m-lg` ja `.--margin-lg` leat sama, nuibbi `.--pt-md` ja `.--paddingt-md`.

- Sided: none (buot), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  axis). Logical sides stay correct right-to-left layouta.
- Steps: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ja `auto` margin:ain.

Compose daid InstUI:s `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — semantihkka overrides mii stay on-palette: `.--bg-<name>` (background),
`.--text-<name>` (text color), ja `.--border-<name>` (border color). Buot `<name>` lea
semantic color token — intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*` paletti (`accent-blue`, `accent-green`, ja nu
eanet). Namma lea doarvái alleen jos token existeraa dán familjain, niin `text-brand` ii leat class — text:in
brand token ii leat. Ii lea mánnávuohta sáhttit primitive dahje arbitrary hex, ja buot override followa thema.

**Token familjat** — buot "one token, one property" familjat sáhttá class per token, nammad token:in. Compose čáppán:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ja `-depth1`…`-card`) → `box-shadow`

Buot mii settá doarje almmuhit prop:aid, niin `border-width`/`border-radius` galgá leama `border-*` color ja border
stylein máilbmi. Dát geavahusa full token-namma (`.--border-radius-md`), vai color ja spacing helperat gus use short aliassat (`.--bg-brand`, `.--mt-lg`) — aliassat
lean ergonomiske shortcutta; token-classat leat literála ja exhaustiiva.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ja `.--text-align-<value>` (`start`, `center`, `end`, `justify`) coverra InstUI:s
cross-cutting `display` ja `textAlign` proppaid (View, Button, Metric, Tabs, …) nugo composable classaid —
nu ii leat per-komponentta modifiserat.

Buot double-dash class dohkkehaisvuohta cascade:s deterministtala ovttas same-named single-dash component
modifierin, man stylesheet import olggobealde — geavahata [Authoring conventions](/conventions/authoring) mekanismaa.

Buot dát lea pur CSS mii gánddá `--instui-*` token:ain, niin dat track:á InstUI token-layer:in. Geažil [API reference](/api/) `componentsCss` ja per-komponentta builderat.

## Overlay: dialog ja popover

Overlay-komponenttat gokteha native platform-primitiivain, nu de liiká accesible mii leat vähá dahje ii álki
JavaScript:ta.

**Modal** — setta `.instui-modal` go native `<dialog>`. Dat gávnná focus-trapping, `Esc`-to-close, ja
`::backdrop` moadde; backdrop lea dimmeheapmi sama `--instui-component-mask-background-color`
token:in nugo `.instui-mask` (addta `-blur` frosta). Avása ja bođá daid invoker kommanda — ii skripta:

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

**Context view / popover** — setta `.instui-context-view` go `[popover]` element ja toggla daid `popovertarget`. Dat máhccá top layer:is ja light-dismissá ovttast click:in dahje `Esc`, ii skripta:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — setta `.instui-drawer-layout` go layout root:s `.tray` ja `.content`
children. Addta `open` attributt (vai `-open`) dahje lážžut tray:in, ja geavá `placement="end"`
(vai `-placement-end`) dahje dock:it inline-end side — placement resolvá loogal
`inset-inline-*`/`flex-direction` properties, niin dat flippa automatihkala under `dir="rtl"` ilman eará rule:aid. Focused interaction bundle addá Invoker command routing ja toggla overlay mode
(`should-overlay-tray`) gos width crossa `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, de `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` stay in-flow overlays (spinner över card); modal:s `::backdrop`
covera modal casen.

Bágo patternat leat wrappehtte behavioral custom elements:s `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` drivena daid `open` attributt:in) ja `<instui-context-view>` (native popover).

Browser support: popover API ja `popovertarget` leat Baseline 2024; invoker kommanda
(`command`/`commandfor`) Baseline 2025, nubb eaŋgá browsera gelda bođđa, wire buttons to `dialog.showModal()`
nugo one-line fallback. Positione popover mii oktan trigger:in uses CSS anchor positioning gos supported (Chromium); eará ođđa center­e top layer:is.

## Formala

**FormField** — `.instui-form-field` lea CSS-Grid wrapper mii layout:á label, control, ja buot
messages. Setta da `<label>` nu label associere kontrolla nativala. Dat leat golbma grid
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

`-layout-stacked` (default) stack:a areala; `-layout-inline` da label juoiggá control:in (tune
with `-label-align-{start,end}` ja `-v-align-{top,middle,bottom}`). `-readonly` recolor:á label:an.

**Required asterisk** sáhteha gos fiellda lea required _geahččat_ `-required` class _dakkár_ dahje native `required` control guovtti — nubb don sáhtát doarvái setta `required` on input ja mark das goffi. Dat lea dekoratiivva ( `::after` label:as, accessibility-tree:in eai) ; pair:a ja note maiddái "fields marked * are required" muhto jos form:s ii leat obvious.

**FormFieldGroup** — `.instui-form-field-group` gruppára relatot fields in `<fieldset>` vai `<legend>` description. Dat lea pur layout (ii dedicate tokens): default stack:á fields;
`-layout-columns` / `-layout-inline` flow:era responsive columns, gávdno `-row-spacing-*` /
`-col-spacing-*` ja `-v-align-*` álgge finessa grid.

**RadioInputGroup** — `.instui-radio-input-group` lea sama `<fieldset>`/`<legend>` grouping,
specializera rádiosa. Dál čalibiid rádiosa share:á `name`, selection lea nativala single-choice —
so toggle-button set behavevá nugo okta kontrolla, ii vel loos buttona. `-variant-simple` (default) layout:á
standard rádiosa (`-layout-columns`/`-inline` flow:era row); `-variant-toggle` konnektává
child `.instui-radio.-variant-toggle` buttona segmenterad control (collapsed borders,
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

**Messages** — `.instui-form-field-messages` lea container; buot `.instui-form-field-message` borgá `-type-*`: `-type-hint` (gray, default), `-type-error` (ruoksatext + circle-alert glyph), `-type-success`
(greenn text + circle-check glyph), ja `-type-screenreader-only` (visually clipped, muhto juoigget). Glyph:at paina `currentColor`, niin sii siempre match:era message color. `-type-new-error` lea deprekeárvuohta alias `-type-error`. Wire container to control with `aria-describedby`, ja setta
`aria-invalid` on control jos galgá error.

In FormField, `-type-error` message following client-side validation: da stay hidden muhto fiellda control
lea `:user-invalid` (native, govve user interact) — vai force it with `-invalid`
on `.instui-form-field` (server-side error). Standalone `.instui-form-field-messages` (ii in field) eai leat affected. Control focus-ring followa: danger gos `:user-invalid`/`-invalid`,
success gos `-success`.

**Text controls** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), ja `.instui-simple-select` (native `<select>` with caret) dihte galggá same look ja same
states: `-invalid` (error border), `-success` (success border), `-readonly`, native `:disabled`, ja
`-size-{sm,md,lg}`. Ama leading/trailing icon (InstUI:s `renderBeforeInput`/`renderAfterInput`), wrap
input in `.instui-input-group` ja addta `.before`/`.after` slot ( `-icon-*` glyph); `-should-not-wrap`
keeps ita on one line. `.instui-number-input` lea facade plus `.arrows` +/- spinner column (native
`type="number"`; wire buttons to `stepUp()`/`stepDown()`). `.instui-range-input` lea styled
`input[type="range"]` mii value rendera in `.instui-range-input-value` inverse bubble. For rich combobox
with listbox popover, use `@instructure/ui` — lib covera native controllat.

**Styled select dropdown (experimental)** — opt‑in `select.css` upgradea _sama_
`.instui-simple-select` element: dat staila open dropdown (panel ja buot option, hover ja
selected states) geavahusa CSS Customizable Select model.

> [!WARNING]
> `select.css` dependá `appearance: base-select` / `::picker(select)`, mii lea **experimental**
> (Chrome 135+, eai geavahus noch Baseline). Dat fáidnet sagast opt‑in sheet:na ja buot ruledat leat gated
> behind `@supports (appearance: base-select)`, nuiggá dat dohkkeha ii supported browsera — `.instui-simple-select` control doarvái plain native select. Loada dasa juohke jos don
> wanta enhanced dropdown ja acceptera limited support.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
