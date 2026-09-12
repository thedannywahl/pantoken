# Komponenter

`@pantoken/components` leverer klassebaserte komponentstiler bygget fra Instructure-tokenene. Importer
stilsiden og pakk inn markupen — ingen rammeverk kreves.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Foretrekker du egendefinerte elementer? `@pantoken/web-components` pakker de samme stilene som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og flere — se
> [package map](/api/).

## Konvensjoner

CSS-konvensjonene i denne pakken er basert på en modifisert versjon av [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatorer er **nøkkel-verdi** — `-<prop>-<val>`, justert til InstUI-prop-navn — slik at de leser seg selv: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolske props er bare prop-navnet, der tilstedeværelse betyr `true` (`-has-shadow`, `-clickable`); en default-på boolean som slås av inverterer (`-without-background`, `-without-border`). Størrelser godtar både korte og lange stavemåter (`-size-sm` = `-size-small`). Når et navn avviker fra InstUI, fungerer fortsatt InstUI-semantiske klassen, men er avskrevet (f.eks. `-variant-info` → bruk `-color-info`).

### Eksempel

Instructure UI React-komponent:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken-komponenter:

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

For InstUI sin `timeout`-prop, sett den enhetsløse `--timeout` custom property i millisekunder og last
Alert-interaksjonen. En positiv verdi planlegger lukking; `0` (standard) lar alerten stå. Legg til `transition`-utilityens `instui-transition -fade-entered`-klasser for InstUI sin fade; utelat
dem for umiddelbar fjerning. Interaksjonen styrer `-fade-exiting`-staten og fyrer et avbrytbar,
boblende `dismiss`-event før fjerning, slik at en applikasjon kan kalle `preventDefault()` for å beholde
alerten montert.

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

Progresjonslinjer aksepterer vilkårlige skalaer gjennom `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med avskrevne aliaser `--value-now` og `--value-max`. Legg til `-should-animate`
for å bruke InstUI sin halvsekunds overgang når en verdi endres. `.value` ligger sammen med `.bar` som
et barn av roten; legg til `-render-value-inside` for å gjengi den over sporet, justert mot starten,
i stedet (stil den for lesbarhet mot meterfargen). Bruk et native `<progress>` for et
null-basert område og `<meter>` når minimum ikke er null; web-komponentene velger mellom dem
automatisk fra sitt `min`-attributt. InstUI har ingen ubestemt tilstand, så en `<progress>`
uten sitt `value`-attributt er en pantoken-spesifikk beste gjetning: `progress-bar` animerer `.bar` som et
glidende segment og `progress-circle` spinner ringen i en fast bue, begge skjuler `.value`.

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

Progresjonssirkler aksepterer samme vilkårlige skalaer gjennom `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` forblir som avskrevne funksjonelle aliaser. Legg til `-should-animate` og
last det fokuserte interaksjons-bundtet for å gjenskape InstUI sin mount-animasjon; `--animation-delay` er en
enhetsløs millisekundforsinkelse. De avskrevne `-should-animate-on-mount` og
`-shold-animate-on-mount` stavemåtene forblir funksjonelle aliaser.

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

Hver klasse er navnerommet `instui-` som standard. Bygg en stilsiden med eget prefiks — eller ingen — ved å
passere `prefix` til hvilken som helst builder. En hvilken som helst falsy-verdi (`null`, `undefined`, `""`, eller å utelate den) fjerner
prefikset fullstendig, så du kan forfatte `class="heading -level-h1"` i stedet for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

De bindestrek-prefikserte modifikatorene (`.-color-secondary`, `.-level-h1`) er uendret uansett. De
stilsidene som leveres av pakken beholder `instui`-prefikset.

## Base

`base.css` er en valgfri reset som setter globale dokumentstandarder fra tokenene: `box-sizing`, en
`body`-reset, sidesurface, grunntekstfarge og font, `color-scheme` (så `light-dark()`-tokenene
og native kontroller følger temaet), og en base-lenke. Last den én gang, før komponent- og prosa-
arkene, når pantoken eier siden.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hopp over den når du embedder komponenter i en vert som allerede themeer sine egne `html` og `body` —
resetten maler sidesurface, så du vil ikke at den skal konkurrere med verten. Alt den setter bruker
lav-specificitets `:where()`-selektorer, så dine egne regler vinner alltid.

`base.css` _bruker_ merkevaren-fonten (`font-family: var(--instui-font-family-base)`, med system-
fallbacks); for å _laste_ den, importer den valgfrie `fonts.css` — `@font-face`-regler for Atkinson Hyperlegible
Next, som peker på woff2-ene levert i pakken. Den er separat fordi fontene er ~350 kB og
selvhosting av fonter er et bevisst valg.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skjermleser-innhold

<p>Det er en skjult melding etter denne setningen.<span class="instui-screen-reader-content">Kun skjermlesere kunngjør dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler et element visuelt samtidig som det holder det i tilgjengelighetstreet
— for etiketter og status-tekst som hjelpemidler bør lese, men designet ikke vise.

## Verktøyklasser

`utilities.css` er et valgfrislag av tverrgående klasser: en `View`-primitiv, spacing på tokenskalaen, og semantiske fargeoverstyringer. I motsetning til komponentens `-modifier`-klasser, bruker disse en **dobbel
dash** (`--mod`) slik at de aldri kolliderer med en komponents egne modifikatornavn, og de gjelder for ethvert
element — bare, eller komponert på en komponent.

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

**View** — `.instui-view` er InstUI sin `View`. Det er basen du legger spacing og farge på, og det
bærer nøkkel-verdi modifikatorer for sine egne visuelle props slik at du ikke trenger å bruke utilities:
`-background-*` (dens surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — disse er `view`'s egne
enkel-bindestrek modifikatorer, urelatert til de doble-dash utilities nedenfor. Friverdi-props
(width/height/inset) forblir inline-stiler; `margin`/`padding` bruker spacing-utilities.

**Spacing** — per-side klasser på spacingskalaen. Les dem som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller de fulle ordene `margin`/`padding`), en valgfri logisk side, så et
trinn. Så `.--m-lg` og `.--margin-lg` er det samme, som er `.--pt-md` og `.--paddingt-md`.

- Sider: none (alle), `t`/`b` (blokks start/slutt), `s`/`e` (inline start/slutt), `x`/`y` (inline/block
  akse). Logiske sider forblir korrekte i høyre-til-venstre oppsett.
- Trinn: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, pluss `auto` for margin kun.

Kombiner dem for InstUI sin `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farge** — semantiske overstyringer som holder seg på paletten: `.--bg-<name>` (bakgrunn),
`.--text-<name>` (tekstfarge), og `.--border-<name>` (kantfarge). Hver `<name>` er en
semantisk farvetoken — intensjonene (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) pluss `accent-*`-paletten (`accent-blue`, `accent-green`, og så videre). Et navn finnes bare hvis tokenet eksisterer i den familien, så `text-brand` er ikke en klasse — tekst har
ingen brand-token. Det finnes ingen måte å nå et primitiv eller en vilkårlig hex på, og hver overstyring følger
temaet.

**Token-familier** — hver "ett token, én egenskap" familie får en klasse per token, navngitt etter tokenet. Kombiner dem fritt:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver setter bare sin ene egenskap, så `border-width`/`border-radius` trenger en `border-*`-farge og en kantstil
for faktisk å tegne en kant. Disse bruker det fulle token-navnet (`.--border-radius-md`), mens
farge- og spacing-hjelperne over bruker korte aliaser (`.--bg-brand`, `.--mt-lg`) — aliasene
er ergonomiske snarveier; token-klassene er bokstavelige og uttømmende.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dekker InstUI sine
tverrgående `display` og `textAlign` props (View, Button, Metric, Tabs, …) som komponerbare klasser —
så de er ikke per-komponent modifikatorer.

Hver double-dash-klasse vinner kaskaden deterministisk over en like-navngitt enkel-dash komponentmodifikator, uavhengig av stilside-importrekkefølge — se [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er ren CSS drevet av `--instui-*`-tokenene, så det følger InstUI gjennom tokenslaget. Se [API reference](/api/) for `componentsCss` og per-komponent builders.

## Overlays: dialog og popover

Overlay-komponentene benytter native plattformprimitiver, så de oppfører seg tilgjengelig med lite eller ingen
JavaScript.

**Modal** — sett `.instui-modal` på et native `<dialog>`. Den får fokusfelle, `Esc`-for-å-lukke, og en
`::backdrop` gratis; backdropen er dimmet med samme `--instui-component-mask-background-color`
token som `.instui-mask` (legg til `-blur` for å frost). Åpne og lukk med invoker-kommandoer — ingen skript:

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

**Context view / popover** — sett `.instui-context-view` på et `[popover]`-element og veksle det med
`popovertarget`. Det ligger på topplaget og lukkes ved klikk utenfor eller `Esc`, igjen uten skript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sett `.instui-drawer-layout` på en layout-rot med `.tray` og `.content`
barn. Legg til `open`-attributtet (eller `-open`) for å avsløre skuffen, og bruk `placement="end"`
(eller `-placement-end`) for å dokke den til inline-end siden — plassering løses gjennom logiske
`inset-inline-*`/`flex-direction`-egenskaper, så den snur automatisk under `dir="rtl"` uten
ekstra regler. Det fokuserte interaksjons-bundtet legger til Invoker-kommandoruting og veksler overlay-modus
(`should-overlay-tray`) når bredden krysser `--drawer-layout-min-width` (standard
`--instui-breakpoints-sm`, så `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` brukes for in-flow overlays (en spinner over et kort); en modals `::backdrop`
dekker modal-tilfellet.

Begge mønstrene er også pakket som atferdsstyrte egendefinerte elementer i `@pantoken/web-components`:
`<instui-modal open>` (en `<dialog>` drevet av sitt `open`-attributt) og `<instui-context-view>` (en
native popover).

Nettleserstøtte: popover-APIen og `popovertarget` er Baseline 2024; invoker-kommandoer
(`command`/`commandfor`) er Baseline 2025, så på eldre nettlesere koble knappene til `dialog.showModal()`
som en én-linjers fallback. Å posisjonere en popover ved siden av trigget bruker CSS anchor-posisjonering der
det støttes (Chromium); ellers sentrerer den i topplaget.

## Skjemaer

**FormField** — `.instui-form-field` er en CSS-Grid wrapper som legger ut en label, kontrollen og eventuelle
meldinger. Sett den på et `<label>` så labelen assosierer nativt med sin kontroll. Den har tre grid-
områder — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (standard) stabler områdene; `-layout-inline` plasserer labelen ved siden av kontrollen (juster
med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` recolorerer labelen.

Den **påkrevde stjernen** vises når feltet er påkrevd av _enten_ `-required`-klassen _eller_ en
native `required`-kontroll inni det — så du kan bare sette `required` på inputen og markeringen vises.
Den er dekorativ (et `::after` på labelen, utenfor tilgjengelighetstreet); par den med en merknad som
"felt merket \* er påkrevd" med mindre skjemaet er selvinstruerende.

**FormFieldGroup** — `.instui-form-field-group` grupperer relaterte felt i en `<fieldset>` med en
`<legend>`-beskrivelse. Det er ren layout (ingen dedikerte token): standard stabler feltene;
`-layout-columns` / `-layout-inline` flyter dem inn i responsive kolonner, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for å finjustere gridet.

**RadioInputGroup** — `.instui-radio-input-group` er samme `<fieldset>`/`<legend>` gruppering,
spesialisert for radioer. Fordi barne-radioene deler en `name`, er utvalg nativt enkelvalg —
så et sett toggle-knapper oppfører seg som én kontroll, ikke løse knapper. `-variant-simple` (standard) legger
ut standard radioer (`-layout-columns`/`-inline` flyter dem i en rad); `-variant-toggle` kobler de
barne `.instui-radio.-variant-toggle` knappene til en enkelt segmentert kontroll (sammenklemte kanter,
avrundede ytre ender):

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

**Meldinger** — `.instui-form-field-messages` er containeren; hver `.instui-form-field-message` har en
`-type-*`: `-type-hint` (grå, standard), `-type-error` (rød tekst + en sirkel-advarsel-glyf), `-type-success`
(grønn tekst + en sirkel-sjekk-glyf), og `-type-screenreader-only` (visuelt klippet, fortsatt kunngjort).
Glyfene males i `currentColor`, så de matcher alltid meldingsfargen. `-type-new-error` er et
avskrevet alias for `-type-error`. Koble containeren til kontrollen med `aria-describedby`, og sett
`aria-invalid` på kontrollen når det er en feil.

Inne i en FormField følger en `-type-error` melding klient-side validering: den forblir skjult til
feltets kontroll er `:user-invalid` (naturlig, etter brukerinteraksjon) — eller du tvinger den med `-invalid`
på `.instui-form-field` (for en server-side feil). En frittstående `.instui-form-field-messages` (ikke i
et felt) er upåvirket. Kontrollens fokusring følger etter: fare ved `:user-invalid`/`-invalid`,
suksess ved `-success`.

**Tekstkontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), og `.instui-simple-select` (native `<select>` med caret) deler ett utseende og de samme
tilstandene: `-invalid` (feilkant), `-success` (suksesskant), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For et ledende/etterfølgende ikon (InstUI sin `renderBeforeInput`/`renderAfterInput`), pakk
inputen i `.instui-input-group` og legg til en `.before`/`.after` slot (en `-icon-*` glyf); `-should-not-wrap`
holder det på én linje. `.instui-number-input` er den fasaden pluss en `.arrows` +/- spinner-kolonne (native
`type="number"`; koble knappene til `stepUp()`/`stepDown()`). `.instui-range-input` er en stilisert
`input[type="range"]` hvis verdi gjengis i en `.instui-range-input-value` invers boble. For en rik
combobox med en listbox-popover, bruk `@instructure/ui` — dette biblioteket dekker de native kontrollene.

**Stilisert select-dropdown (eksperimentell)** — en valgbar `select.css` oppgraderer _samme_
`.instui-simple-select` element: den styler den åpne dropdownen (panelet og hver option, med hover og
valgt-tilstander) ved å bruke CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` er avhengig av `appearance: base-select` / `::picker(select)`, som er **eksperimentelt**
> (Chrome 135+, ikke ennå Baseline). Den leveres som et separat valgfrislag ark og hver regel er låst
> bak `@supports (appearance: base-select)`, så den gjør ingenting i u- støttede nettlesere — kontrollen
> `.instui-simple-select` forblir bare den vanlige native select. Last den kun hvis du ønsker den
> forbedrede dropdownen og aksepterer den begrensede støtten.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
