# Komponentar

`@pantoken/components` leverer klasse-baserte komponentstilar bygd frå Instructure-tokena. Importer stilarket og tagg merksemda — ingen rammeverk påkravd.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Føretrekkjer du eigne element? `@pantoken/web-components` pakkar dei same stilane som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og meir — sjå
> [pakke-kartet](/guide/packages).

## Konvensjonar

CSS-konvensjonane i denne pakken baserer seg på ein modifisert versjon av [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatorar er **nøkkel-verdi** — `-<prop>-<val>`, justerte til InstUI-prop-namn — så dei les nesten av seg sjølv: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-propar er berre prop-namnet, der tilstadeheit betyr `true` (`-has-shadow`, `-clickable`); ein standard-på boolean som blir skrudd av
inverterer (`-without-background`, `-without-border`). Storleikar godtar både korte og lange stavingar
(`-size-sm` = `-size-small`). Når eit namn avvik frå InstUI, fungerer den InstUI-semantiske klassen framleis
men er avvikla (t.d. `-variant-info` → bruk `-color-info`).

### Døme

Instructure UI React-komponent:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken komponentar:

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

For InstUI sin `timeout` prop, sett den einheitslause `--timeout` eigenskapen i millisekund og last
Alert-interaksjonen. Ein positiv verdi planlegg avvising; `0` (standard) let alerta stå. Legg til `transition` nyttigheita sine `instui-transition -fade-entered` klassar for InstUI sin fading; utelat
dei for umiddelbar fjerning. Interaksjonen styrer `-fade-exiting` tilstanden og sender eit avbrytbart,
boblande `dismiss` event før fjerning, så ei applikasjon kan kalle `preventDefault()` for å halde
alerta montert.

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

Progresjonslinjer godtar vilkårlege skalar gjennom `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med avvikla alias: `--value-now` og `--value-max`. Legg til `-should-animate`
for å bruke InstUI sin halvsekunds overgang når ein verdi endrar seg. `.value` sit ved sida av `.bar` som
eit barn av roten; legg til `-render-value-inside` for å rendre det over sporet, alignert mot starten,
i staden (stil det for lesbarheit mot meter-fargen). Bruk ein native `<progress>` for eit
null-basert intervall og `<meter>` når minimum ikkje er null; web-komponentane vel mellom dei automatisk frå sin `min` attributt. InstUI har ingen indeterminert tilstand, så ein `<progress>`
som manglar sitt `value` attributt er eit pantoken-berre beste gjetning: `progress-bar` animarar `.bar` som ein
glidande segment og `progress-circle` spinna ringen sin ved ein fast bue, og begge skjuler `.value`.

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

Progresjonssirklar godtar same vilkårlege skalar gjennom `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` står att som avvikla funksjonelle alias. Legg til `-should-animate` og
last det fokuserte interaksjonspakka for å gjenskape InstUI sin mount-animasjon; `--animation-delay` er ein
einheitslaus millisekund-forsinkelse. Dei avvikla stavingane `-should-animate-on-mount` og
`-shold-animate-on-mount` forblir funksjonelle alias.

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

## Klasse-prefiks

Kvar klasse er namneromma `instui-` som standard. Bygg eit stilark med eige prefiks — eller utan — ved å
sende `prefix` til ein kvar builder. Ein falsy verdi (`null`, `undefined`, `""`, eller å utelate det) fjernar
prefikset heilt, så du kan skrive `class="heading -level-h1"` i staden for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Dei bindestrek-prefiksa modifikatorane (`.-color-secondary`, `.-level-h1`) endrar seg ikkje uansett. Dei
stilarkene som pakken leverer held `instui` prefikset.

## Grunnlag

`base.css` er ein valfri reset som set globale dokumentstandardar frå tokena: `box-sizing`, ein
`body` reset, sidens flate, grunn tekstfarge og font, `color-scheme` (så `light-dark()` tokenar
og native kontrollar følger temaet), og ei grunnleggjande lenke. Last det ein gong, før komponent- og prosa-
ark, når pantoken eig sida.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hopp over det når du inneber komponentar i ein host som allereie temaer sine eigne `html` og `body` —
reseten malar sideflata, så du vil ikkje at han skal stride mot hosten. Alt han set bruker
låg-spesifisitet `:where()` selektorar, så dine eigne reglar vinn alltid.

`base.css` _brukar_ merkevare-fonta (`font-family: var(--instui-font-family-base)`, med system
fallbacks); for å _laste_ den, importer den valfrie `fonts.css` — `@font-face` reglar for Atkinson Hyperlegible
Next, peikande på woff2-ane som blir leverte i pakken. Det er separat fordi skrifttypane er ~350 kB og
self-hosting av fontar er eit medvite val.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skjermlesar-innhald

<p>Det er ei skjult melding etter denne setninga.<span class="instui-screen-reader-content">Berre skjermlesarar kunngjev dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler eit element visuelt medan det held seg i tilgangstreet
— for etikettar og status-tekst som hjelpeteknologi bør lese, men designet ikkje skal vise.

## Nyttigheiter

`utilities.css` er eit valfritt lag av kryss-snitt klassar: ein `View` primitiv, spacing på token-skalaen, og semantiske fargeoverstyringar. I motsetnad til komponentens `-modifier` klassar, brukar desse ein **dobbel
dash** (`--mod`) så dei aldri kolliderer med ein komponents eigne modifikatornamn, og dei gjeld for eit
vilkårleg element — utan eller komponert på ein komponent.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue flate med on-color tekst.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Sentrert med mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` er InstUI sin `View`. Det er basen du lagar spacing og farge på, og det
ber nøkkel-verdi modifikatorar for sine eigne visuelle prop-ar slik at du slepp å nå etter nyttigheiter:
`-background-*` (sina flater), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — desse er `view` sine eigne
ein-dash modifikatorar, ikkje-relatert til dobbel-dash nyttigheitene nedanfor. Eigedomsverdiar med frie verdiar
(breidde/høgd/inset) held seg som inline-stilar; `margin`/`padding` brukar spacing-nyttigheitene.

**Spacing** — per-side klassar på spacing-skalaen. Les dei som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller dei fulle orda `margin`/`padding`), eit valfritt logisk side, så eit
steg. Så `.--m-lg` og `.--margin-lg` er det same, likeeins `.--pt-md` og `.--paddingt-md`.

- Sider: ingen (alle), `t`/`b` (blokksstart/-ende), `s`/`e` (inline start/ende), `x`/`y` (inline/blokk
  aksen). Logiske sider held seg korrekte i høgre-til-venstre oppsetjingar.
- Steg: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, pluss `auto` for margin berre.

Set dei saman for InstUI sin `margin="small auto large"` snarvegen:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farge** — semantiske overstyringar som held seg på-paletten: `.--bg-<name>` (bakgrunn),
`.--text-<name>` (tekstfarge), og `.--border-<name>` (rammefarge). Kvar `<name>` er ein
semantisk farge-token — intensjonane (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) pluss `accent-*` paletten (`accent-blue`, `accent-green`, og så vidare). Eit namn finst berre om tokenet finst i den familien, så `text-brand` er ikkje ein klasse — tekst har
ingen merkevare-token. Det finst ingen måte å nå ein primitiv eller ein vilkårleg hex, og kvar overstyring følger
temaet.

**Token-familiar** — kvar "eit token, éi eigenskap" familie får ei klasse per token, namngjeven etter tokenet. Set dei fritt saman:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Kvar set berre si eine eigenskap, så `border-width`/`border-radius` treng ein `border-*` farge og ein rammestil for å verkeleg teikne ein ramme. Desse bruker det fullstendige token-namnet (`.--border-radius-md`), medan farge- og spacing-hjelparane ovanfor brukar korte alias (`.--bg-brand`, `.--mt-lg`) — aliasa er ergonomiske snarvegar; token-klassane er bokstavelege og uttømmande.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dekkjer InstUI sine
kryss-snitt `display` og `textAlign` prop-ar (View, Button, Metric, Tabs, …) som komponerbare klassar —
så dei er ikkje per-komponent modifikatorar.

Kvar dobbel-dash klasse vinn kaskaden deterministisk over ein same-namna ein-dash komponentmodifikator, uavhengig av stilark-importrekkefølgje — sjå [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er rein CSS driven av `--instui-*` tokena, så det følgjer InstUI gjennom token-laget. Sjå [API-referansen](/api/) for `componentsCss` og per-komponent builderane.

## Overlays: dialog og popover

Overlay-komponentane brukar native plattform-primitivar, så dei oppfører seg tilgjengeleg med lite eller ingen
JavaScript.

**Modal** — sett `.instui-modal` på ein native `<dialog>`. Han får fokus-fangst, `Esc`-for-å-lukke, og ein
`::backdrop` gratis; backdropen blir dimma med same `--instui-component-mask-background-color`
token som `.instui-mask` (legg til `-blur` for å froste han). Opna og lukk med invoker-kommandoar — ingen skript:

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

**Context view / popover** — sett `.instui-context-view` på eit `[popover]` element og toggla det med
`popovertarget`. Det ligg på topp-laget og ljos-avviser ved klikk utanfor eller `Esc`, igjen ingen skript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sett `.instui-drawer-layout` på ein layout-rot med `.tray` og `.content`
barn. Legg til `open` attributtet (eller `-open`) for å vise skuffa, og bruk `placement="end"`
(eller `-placement-end`) for å doke han til inline-ende sida — plassering løysast gjennom logiske
`inset-inline-*`/`flex-direction` eigenskapar, så han snur automatisk under `dir="rtl"` utan
ekstra reglar. Det fokuserte interaksjonspakka legg til Invoker kommando-ruting og togglar overlay-modus
(`should-overlay-tray`) når breidda kryssar `--drawer-layout-min-width` (standard
`--instui-breakpoints-sm`, så `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` held for in-flow overlays (ein spinner over eit kort); ein modals `::backdrop`
dekkjer modal-tilfellet.

Begge mønstra er også innpakka som åtferdsbaserte custom elements i `@pantoken/web-components`:
`<instui-modal open>` (ein `<dialog>` driven av sitt `open` attributt) og `<instui-context-view>` (ein
native popover).

Nettlesarstøtte: popover-APIen og `popovertarget` er Baseline 2024; invoker-kommandoar
(`command`/`commandfor`) er Baseline 2025, så på eldre nettlesarar kople knappane til `dialog.showModal()`
som ein ein-linjers fallback. Plassera ein popover ved sida av triggearen bruker CSS anchor-posisjonering der
støtta finst (Chromium); elles sentrumlegg han i topp-laget.

## Skjema

**FormField** — `.instui-form-field` er ein CSS-Grid wrapper som plasserer ein etikett, kontrollen, og eventuelle
meldingar. Set han på ein `<label>` slik at etiketten assosierer med kontrollen naturleg. Han har tre grid
område — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (standard) stablear områda; `-layout-inline` plasserer etiketten ved sida av kontrollen (finjuster
med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` recolorar etiketten.

Det **påkrevde stjerna** viser når feltet er påkravd av _enten_ `-required` klassen _eller_ ein
native `required` kontroll inni — så du kan berre sette `required` på inputen og merket visast.
Det er dekorativt (ein `::after` på etiketten, utanfor tilgangstreet); par det med ei merknad som
"felt merka med \* er påkravde" med mindre skjemaet er sjølvloknande.

**FormFieldGroup** — `.instui-form-field-group` grupperer relaterte felt i ein `<fieldset>` med ei
`<legend>` beskriving. Det er rein layout (ingen dedikerte token): standard stablear felta;
`-layout-columns` / `-layout-inline` flyt dei til responsive kolonnar, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for å finstille gridet.

**RadioInputGroup** — `.instui-radio-input-group` er same `<fieldset>`/`<legend>` gruppering,
spesialisert for radioar. Fordi barne-radioane deler ein `name`, er valet naturleg enkeltval —
så ei rad av toggle-knappar oppfører seg som éin kontroll, ikkje lause knappar. `-variant-simple` (standard) legg
ut standard radioar (`-layout-columns`/`-inline` flyt dei til ei rad); `-variant-toggle` knyter
barne-`.instui-radio.-variant-toggle` knappane til eit einskaps segmentert kontroll (samanfalne rammer,
avrunda ytre endar):

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
`-type-*`: `-type-hint` (grå, standard), `-type-error` (raud tekst + ein sirkel-varsel glyph), `-type-success`
(grøn tekst + ein sirkel-sjekk glyph), og `-type-screenreader-only` (visuelt klipt, framleis kunngjort).
Glyphs-malast i `currentColor`, så dei passar alltid melding-fargen. `-type-new-error` er eit
avvikla alias av `-type-error`. Kople behaldaren til kontrollen med `aria-describedby`, og sett
`aria-invalid` på kontrollen når det finst ein feil.

Inni ein FormField, ein `-type-error` melding følgjer klient-side validering: han er skjult til kontrollen
er `:user-invalid` (native, etter brukaren har interagert) — eller du tvingar han med `-invalid`
på `.instui-form-field` (for ein server-side feil). Ein frittståande `.instui-form-field-messages` (ikkje i
eit felt) er uendra. Kontrollens fokus-ring følgjer same mønster: fare når `:user-invalid`/`-invalid`,
suksess på `-success`.

**Tekst-kontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizerbar), og `.instui-simple-select` (native `<select>` med ein caret) deler eitt utseende og same
tilstandar: `-invalid` (feil-ramme), `-success` (suksess-ramme), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For eit føre-/etter-ikon (InstUI sin `renderBeforeInput`/`renderAfterInput`), pakk
inputen i `.instui-input-group` og legg til eit `.before`/`.after` slot (ein `-icon-*` glyph); `-should-not-wrap`
held det på ei linje. `.instui-number-input` er det stripet pluss ei `.arrows` +/- spinner-kolonne (native
`type="number"`; kople knappane til `stepUp()`/`stepDown()`). `.instui-range-input` er ein stylad
`input[type="range"]` kvar verdi renderar i ei `.instui-range-input-value` invers boble. For ein rik
combobox med ei listbox-popover, bruk `@instructure/ui` — dette biblioteka dekkjer dei native kontrollane.

**Styled select dropdown (eksperimentelt)** — ein valbar `select.css` oppgraderer den _same_
`.instui-simple-select` elementet: han styljar den opne dropdownen (panelet og kvar option, med hover og
valgt-tilstandar) ved hjelp av CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` byggjer på `appearance: base-select` / `::picker(select)`, som er **eksperimentelt**
> (Chrome 135+, ikkje ennå Baseline). Det blir levert som eit separat valfritt ark og kvar regel er gatera
> bak `@supports (appearance: base-select)`, så det gjer ingenting i nettlesarar utan støtte — den
> `.instui-simple-select` kontrollen forblir berre den enkle native selecten. Last det berre om du vil ha den
> forbetra dropdownen og aksepterer den avgrensa støtta.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
