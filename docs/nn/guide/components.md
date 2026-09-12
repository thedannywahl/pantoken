# Komponentar

`@pantoken/components` leverer klassebaserte komponent-stilar bygde frå Instructure-tokena. Importer stilarket og tagga markup-en — ingen rammeverk påkravd.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Føretrekkjer du eigne element? `@pantoken/web-components` pakkar dei same stilane som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og fleire — sjå
> [pakke-kartet](/api/).

## Konvensjonar

CSS-konvensjonane i denne pakken er baserte på ein modifisert versjon av [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatorar er **nøkkel-verdi** — `-<prop>-<val>`, tilpassa InstUI-prop-namn — så dei les seg sjølve: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-prop-ar er berre prop-namnet, der nærvær betyr `true` (`-has-shadow`, `-clickable`); ein default-på boolean som blir skrudd av inverterer (`-without-background`, `-without-border`). Storleikar godtek både korte og lange former (`-size-sm` = `-size-small`). Når eit namn avvik frå InstUI, fungerer framleis den InstUI-semantiske klassen, men er avvikla (t.d. `-variant-info` → bruk `-color-info`).

### Døme

Instructure UI React-komponent:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken-komponentar:

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

For InstUI sin `timeout` prop, set den einingslause `--timeout` custom property i millisekund og last Alert-interaksjonen. Ei positiv verdi planlegg avvising; `0` (standard) lar alerta stå på plass. Legg til `transition` sin `instui-transition -fade-entered`-klasse for InstUI sin fading; utelat dei for umiddelbar fjerning. Interaksjonen styrer `-fade-exiting`-staten og utløyser ein avbrytbar, boblande `dismiss`-hendelse før fjerning, så ein applikasjon kan kalle `preventDefault()` for å halde alerta montert.

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

Framdriftslinjer aksepterer vilkårlege skalar gjennom `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med avvikla alias `--value-now` og `--value-max`. Legg til `-should-animate`
for å bruke InstUI si ein-og-ein-halv-sekunds overgang når ein verdi endrar seg. `.value` ligg ved sidan av `.bar` som
eit barn av roten; legg til `-render-value-inside` for å rendere det over sporet, justert mot starten i staden
(style det for lesbarheit mot meter-fargen). Bruk eit native `<progress>` for eit
null-basert omfang og `<meter>` når minimum ikkje er null; web-komponentane vel automatisk mellom dei via sitt `min`-attributt. InstUI har ikkje indeterminert tilstand, så ein `<progress>`
som manglar sitt `value`-attributt er ein pantoken-eigens beste gjetning: `progress-bar` animarar `.bar` som eit
glidande segment og `progress-circle` snurrar ringen i ein fast bue, begge skjuler `.value`.

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

Framdriftssirklar aksepterer same vilkårlege skalar gjennom `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` vert verande som avvikla funksjonelle alias. Legg til `-should-animate` og
last det fokuserte interaksjonspakka for å reprodusere InstUI sin mount-animasjon; `--animation-delay` er ein
einingslaus millisekund-forsinkelse. Dei avvikla stavemåtane `-should-animate-on-mount` og
`-shold-animate-on-mount` fungerer framleis som alias.

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

## Klasseprefiks

Kvar klasse er namnromma `instui-` som standard. Bygg eit stilark med di eiga prefiks — eller ingen — ved å sende
`prefix` til ein kvar builder. Eit falskt verdi (`null`, `undefined`, `""`, eller å utelate det) fjernar
prefikset heilt, så du kan forfattar `class="heading -level-h1"` i staden for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Dei bindestrek-prefiksera modifikatorane (`.-color-secondary`, `.-level-h1`) er uendra uansett. Dei
stilark som blir leverte av pakken beheld `instui`-prefikset.

## Base

`base.css` er ein valfri reset som set globale dokumentstandardar frå tokena: `box-sizing`, ein
`body`-reset, sida sitt overflate, grunn tekstfarge og font, `color-scheme` (så `light-dark()`-tokenar
og native kontrollar følgjer temaet), og ein basis lenkje. Last den ein gong, før komponent- og prose-ark, når pantoken eig sida.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hopp over den når du byggjer inn komponentar i ein vert som allereie temar sine eigne `html` og `body` —
reset-en målar sida si overflate, så du vil ikkje at ho skal krangle med verda. Alt han set bruker
lav-spesifisitets `:where()`-selektorar, så dine eigne reglar vinner alltid.

`base.css` _gjev_ merkevaren-fonten (`font-family: var(--instui-font-family-base)`, med system
fallbacks); for å _laste_ han, importer den valfrie `fonts.css` — `@font-face`-reglar for Atkinson Hyperlegible
Next, peikar til woff2-ane som blir leverte i pakken. Det er separat fordi skrifttypane er ~350 kB og
eigenhosting av fontar er eit bevisst val.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skjermlesar-innhald

<p>Det finst ei skjult melding etter denne setninga.<span class="instui-screen-reader-content">Berre skjermlesarar annonserer dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler eit element visuelt medan det framleis er i tilgjengelegheitstreet
— for etikettar og status-tekst som hjelpeteknologi skal lese, men designet ikkje vise.

## Verktøy (Utilities)

`utilities.css` er eit valfritt lag med tverrgåande klasser: ein `View`-primtiv, spacing på token-skalaen,
og semantiske fargeoverstyringar. I motsetnad til komponent-`-modifier`-klassane, bruker desse ein **dobbel
minus** (`--mod`) så dei aldri kolliderer med ein komponent sin eigen modifikator, og dei gjeld for alle
element — nakne, eller komponerte oppå ein komponent.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue overflate med on-color tekst.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Sentrert med mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` er InstUI sin `View`. Det er basen du lagar spacing og farge på, og det
ber nøkkel-verdi modifikatorar for sine eigne visuelle prop-ar så du slepp å gripe til verktøy:
`-background-*` (sine overflater), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — desse er `view` sine eigne
ein-dash modifikatorar, urelaterte til dei dobbelt-dash verktøya under. Friverdi-prop-ar
(width/height/inset) held seg i inline-stilar; `margin`/`padding` brukar spacing-verktøya.

**Spacing** — per-side klasser på spacing-skalaen. Les dei som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller dei fulle orda `margin`/`padding`), ein valfri logisk side, og så eit steg. Så `.--m-lg` og `.--margin-lg` er det same, likeeins `.--pt-md` og `.--paddingt-md`.

- Sider: none (alle), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  akse). Logiske sider held seg rette i høgres-til-venstre layoutar.
- Steg: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, pluss `auto` for margin berre.

Set dei saman for InstUI sitt `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farge** — semantiske overstyringar som held seg på paletten: `.--bg-<name>` (bakgrunn),
`.--text-<name>` (tekstfarge), og `.--border-<name>` (kantfarge). Kvar `<name>` er ein
semantisk fargetoken — intensjonane (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) pluss `accent-*`-paletten (`accent-blue`, `accent-green`, og så vidare). Eit namn finst berre om tokenet finst i den familien, så `text-brand` er ikkje ei klasse — tekst har
ingen brand-token. Det finst ingen måte å nå ein primitiv eller ein arbitrær hex, og kvar overstyring følgjer
temaet.

**Token-familiar** — kvar "eit token, éin eigenskap"-familie får ei klasse per token, namngjeven etter
tokenet. Set dei fritt saman:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Kvar set berre si éi eigenskap, så `border-width`/`border-radius` treng ei `border-*`-farge og ein kantstil for å teikne ein kant. Desse brukar det fulle token-namnet (`.--border-radius-md`), medan farge- og spacing-hjelparane ovanfor brukar korte alias (`.--bg-brand`, `.--mt-lg`) — aliasa er ergonomiske snarvegar; token-klassane er litte og uttømande.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dekkjer InstUI sine
tverrgåande `display` og `textAlign` prop-ar (View, Button, Metric, Tabs, …) som komponérbare klassar —
så dei er ikkje per-komponent modifikatorar.

Kvar dobbelt-dash-klasse vinn kaskaden deterministisk over ein same-namna ein-dash komponentmodifikator, uavhengig av stilark-importrekkje — sjå [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er rein CSS driven av `--instui-*`-tokena, så det følgjer InstUI gjennom token-laget. Sjå [API-referansen](/api/) for `componentsCss` og per-komponent builderar.

## Overlegg: dialog og popover

Overlay-komponentane nyttar native plattform-primitiv, så dei oppfører seg tilgjengeleg med lite eller ingen
JavaScript.

**Modal** — set `.instui-modal` på eit native `<dialog>`. Det får fokusfangst, `Esc`-for-å-lukke, og ein
`::backdrop` gratis; bakgrunnen dimmast med same `--instui-component-mask-background-color`
token som `.instui-mask` (legg til `-blur` for frost). Opne og lukke med invoker-kommandoar — ingen skript:

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

**Context view / popover** — set `.instui-context-view` på eit `[popover]`-element og toggle det med
`popovertarget`. Det ligg i topplaget og løyser seg ved klikk utanfor eller `Esc`, igjen utan skript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — set `.instui-drawer-layout` på ein layout-rot med `.tray` og `.content`
barn. Legg til `open`-attributtet (eller `-open`) for å vise skuffa, og bruk `placement="end"`
(eller `-placement-end`) for å dokke den til inline-end sida — plassering vert løyst gjennom logiske
`inset-inline-*`/`flex-direction` eigenskapar, så den snur automatisk under `dir="rtl"` utan
ekstra reglar. Det fokuserte interaksjonspakka legg til Invoker-kommando-routing og togglar overlay-modus
(`should-overlay-tray`) når breidda kryssar `--drawer-layout-min-width` (standard
`--instui-breakpoints-sm`, deretter `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` blir brukt for in-flow overlays (ein spinner over eit kort); ein modal sin `::backdrop`
dekkjer modal-tilfellet.

Begge mønstra er også pakka som åtferdsbaserte custom elements i `@pantoken/web-components`:
`<instui-modal open>` (ein `<dialog>` driven av sitt `open`-attributt) og `<instui-context-view>` (ein
native popover).

Nettlesarstøtte: popover-API-en og `popovertarget` er Baseline 2024; invoker-kommandoar
(`command`/`commandfor`) er Baseline 2025, så på eldre nettlesarar lyt knappane kallast `dialog.showModal()`
som ein ein-linje fallback. Posisjonering av ein popover ved sida av triggeren brukar CSS anchor-posisjonering der
støtta finst (Chromium); elles vert den sentrert i topplaget.

## Skjema (Forms)

**FormField** — `.instui-form-field` er ein CSS-Grid wrapper som legg ut ei etikett, kontrollen, og eventuelle
meldingar. Set han på eit `<label>` slik at etiketten assosierar med kontrollen naturleg. Den har tre grid-område — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (standard) stakkar områda; `-layout-inline` plasserer etiketten ved sida av kontrollen (finjuster med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` recolorar etiketten.

Det **påkrevde stjerna** viser når feltet er obligatorisk av _antingen_ `-required`-klassen _eller_ ein
native `required`-kontroll innanfor — så du kan berre setje `required` på inputen og markøren viser.
Han er dekorativ (eit `::after` på etiketten, utanfor tilgjengelegheitstreet); par han med ei merknad som
"felt markerte med \* er påkravde" med mindre skjemaet er sjølvforklarande.

**FormFieldGroup** — `.instui-form-field-group` grupperer relaterte felt i eit `<fieldset>` med ein
`<legend>` beskriving. Det er rein layout (ingen dedikerte token): standard staplar felta;
`-layout-columns` / `-layout-inline` flyt dei inn i responsive kolonnar, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for å finstille grid-et.

**RadioInputGroup** — `.instui-radio-input-group` er same `<fieldset>`/`<legend>` gruppering,
spesialisert for radio-knappar. Sidan barne-radioane deler ein `name`, er val naturleg enkeltval —
så eit sett av toggle-knappar oppfører seg som éin kontroll, ikkje løse knappane. `-variant-simple` (standard) legg ut
standard radioar (`-layout-columns`/`-inline` flyt dei inn i ei rad); `-variant-toggle` koplar
barne-`.instui-radio.-variant-toggle` knappane saman til ein segmentert kontroll (samanløypta kantar,
runda ytre endar):

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

**Meldingar** — `.instui-form-field-messages` er behaldaren; kvar `.instui-form-field-message` tek ein
`-type-*`: `-type-hint` (grå, standard), `-type-error` (raud tekst + ein sirkulær-varsling-glyf), `-type-success`
(grøn tekst + ein sirkulær-sjekk-glyf), og `-type-screenreader-only` (visuelt klipt, framleis annonsert).
Glyfane målar i `currentColor`, så dei alltid matcher melding-fargen. `-type-new-error` er eit
avvikla alias for `-type-error`. Kopla behaldaren til kontrollen med `aria-describedby`, og set
`aria-invalid` på kontrollen når det er ei feil.

Innanfor eit FormField følgjer ein `-type-error` melding klient-side validering: han held seg skjult til
feltets kontroll er `:user-invalid` (native, etter brukarinteraksjon) — eller du tvingar han fram med `-invalid`
på `.instui-form-field` (for ei server-side feil). Ein frittståande `.instui-form-field-messages` (ikkje i
eit felt) er upåverka. Kontrollens fokus-ring følgjer same mønster: fare ved `:user-invalid`/`-invalid`,
suksess ved `-success`.

**Tekst-kontrollar** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), og `.instui-simple-select` (native `<select>` med ein caret) deler same utseende og dei same
tilstandane: `-invalid` (feil-kant), `-success` (suksess-kant), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For eit leiiande/etterfølgjande ikon (InstUI sine `renderBeforeInput`/`renderAfterInput`), pakk
inputen i `.instui-input-group` og legg til ein `.before`/`.after` slot (ein `-icon-*`-glyf); `-should-not-wrap`
held det på éi linje. `.instui-number-input` er det fasade-utseendet pluss ein `.arrows` +/- spinner-kolonne (native
`type="number"`; kopla knappane til `stepUp()`/`stepDown()`). `.instui-range-input` er ein stylad
`input[type="range"]` der verdien rendrar i ein `.instui-range-input-value` invers boble. For ein rik
combobox med ei listbox-popover, bruk `@instructure/ui` — dette biblioteket dekkjer dei native kontrollane.

**Stylad select-dropdown (eksperimentell)** — eit valfritt `select.css` oppgraderer den _same_
`.instui-simple-select` elementet: det stylar den opne dropdownen (panelet og kvar option, med hover og
valde tilstandar) ved bruk av CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` byggjer på `appearance: base-select` / `::picker(select)`, som er **eksperimentelt**
> (Chrome 135+, ikkje ennå Baseline). Det blir levert som eit separat valfritt ark og kvar regel er gjerda
> bak `@supports (appearance: base-select)`, så det gjer ingenting i u-støtta nettlesarar — den
> `.instui-simple-select`-kontrollen held seg berre den enkle native select. Last det berre om du vil ha den
> forbetra dropdownen og aksepterer den avgrensa støtta.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
