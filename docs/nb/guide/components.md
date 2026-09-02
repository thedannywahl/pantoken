# Komponenter

`@pantoken/components` leverer klassebaserte komponentstiler bygget fra Instructure-tokenene. Importer
stilarket og merk opp HTML-en — ingen rammeverk nødvendig.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Foretrekker du webkomponenter? `@pantoken/web-components` pakker disse samme stilene som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og flere — se
> [pakkeoversikten](/guide/packages).

## Konvensjoner

CSS-konvensjonene i denne pakken er basert på en modifisert versjon av [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatorer er **nøkkel-verdi** — `-<prop>-<val>`, tilpasset InstUI-prop-navn — så de leser for
seg selv: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolske props er
bare prop-navnet, der tilstedeværelse betyr `true` (`-has-shadow`, `-clickable`); en standard-på boolsk som slås av
inverterer (`-without-background`, `-without-border`). Størrelser aksepterer både korte og lange skrivemåter
(`-size-sm` = `-size-small`). Når et navn avviker fra InstUI, fungerer fortsatt den InstUI-semantiske klassen
men er avskrevet (f.eks. `-variant-info` → bruk `-color-info`).

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

For InstUIs `timeout`-prop, sett den enhetsløse `--timeout`-egendefinerte variabelen i millisekunder og last
Alert-interaksjonen. En positiv verdi planlegger lukking; `0` (standard) lar alert være på
plassen. Legg til `transition`-nyttighetsklassens `instui-transition -fade-entered`-klasser for InstUIs fade; utelat
dem for umiddelbar fjerning. Interaksjonen driver `-fade-exiting`-tilstanden og fyrer av en avbrytbar,
boblende `dismiss`-hendelse før fjerning, så en applikasjon kan kalle `preventDefault()` for å holde
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

Fremdriftslinjer (progress bars) aksepterer vilkårlige skalaer gjennom `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med avskrevne aliaser `--value-now` og `--value-max`. Legg til `-should-animate`
for å bruke InstUIs halvsekunds overgang når en verdi endres. `.value` sitter ved siden av `.bar` som
et barn av roten; legg til `-render-value-inside` for å rendere den over sporet, justert til starten,
i stedet (stil den for lesbarhet mot meter-fargen). Bruk et native `<progress>` for en
null-basert rekkevidde og `<meter>` når minimum ikke er null; webkomponentene velger mellom dem
automatisk fra sitt `min`-attributt. InstUI har ingen ubestemt tilstand, så en `<progress>`
som mangler sitt `value`-attributt er et pantoken-bare beste gjetning: `progress-bar` animerer `.bar` som et
glidende segment og `progress-circle` spinner ringen sin i et fast bue, begge skjuler `.value`.

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

Fremdriftssirkler aksepterer de samme vilkårlige skalaene gjennom `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` forblir avskrevne funksjonelle aliaser. Legg til `-should-animate` og
last fokusert interaksjonspakke for å reprodusere InstUIs monteringsanimasjon; `--animation-delay` er en
enhetsløs millisekund-forsinkelse. De avskrevne `-should-animate-on-mount` og
`-shold-animate-on-mount` skrivemåtene forblir funksjonelle aliaser.

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

Hver klasse er navngitt `instui-` som standard. Bygg et stilark med ditt eget prefiks — eller ingen — ved å
passere `prefix` til hvilken som helst bygger. En hvilken som helst falsy verdi (`null`, `undefined`, `""`, eller å utelate den) fjerner
prefikset helt, så du kan skrive `class="heading -level-h1"` i stedet for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Dash-prefikserte modifikatorer (`.-color-secondary`, `.-level-h1`) er uendret uansett. De
stilarkene som pakkes med pakken beholder `instui`-prefikset.

## Base

`base.css` er en valgfri reset som setter globale dokumentstandarder fra tokenene: `box-sizing`, en
`body`-reset, sidestrukturen, basistekstfarge og font, `color-scheme` (så `light-dark()`-tokenene
og native kontroller følger temaet), og en base lenke. Last det én gang, før komponent- og prose-
arkene, når pantoken eier siden.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hopp over det når du integrerer komponenter i en vert som allerede tematiserer sin egen `html` og `body` —
resetten maler sidestrukturen, så du vil ikke at den skal slåss med verten. Alt den setter bruker
lav-spesifisitets `:where()`-selektorer, så dine egne regler vinner alltid.

`base.css` _bruker_ merkevarefonten (`font-family: var(--instui-font-family-base)`, med system-
fallbacks); for å _laste_ den, importer den valgfrie `fonts.css` — `@font-face`-regler for Atkinson Hyperlegible
Next, som peker på woff2-ene som følger med pakken. Den er separat fordi fontene er ~350 kB og
self-hosting av fonter er et bevisst valg.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skjermleserinnhold

<p>Det er en skjult melding etter denne setningen.<span class="instui-screen-reader-content">Kun skjermlesere annonserer dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler et element visuelt samtidig som det beholdes i tilgjengelighetstreet
— for etiketter og statustekst som hjelpemidler skal lese, men designet ikke skal vise.

## Nyttigheter

`utilities.css` er et valgfritt lag av tverrgående klasser: en `View`-primitiv, spacing på tokenskalaen,
og semantiske fargeoverstyringer. I motsetning til komponentenes `-modifier`-klasser, bruker disse en **dobbel
dash** (`--mod`) slik at de aldri kolliderer med en komponents egne modifikatornavn, og de gjelder for ethvert
element — alene, eller komponert på en komponent.

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

**View** — `.instui-view` er InstUIs `View`. Det er grunnlaget du legger spacing og farge oppå, og det
bærer nøkkel-verdi modifikatorer for sine egne visuelle props så du slipper å rekke etter nyttigheter:
`-background-*` (dens overflater), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — disse er `view`s egne
enkeldash-modifikatorer, urelatert til de dobbel-dash nyttighetene nedenfor. Friverdipropps
(width/height/inset) forblir inline-stiler; `margin`/`padding` bruker spacing-nyttighetene.

**Spacing** — per-side klasser på spacingskalaen. Les dem som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller hele ordene `margin`/`padding`), en valgfri logisk side, så et
steg. Så `.--m-lg` og `.--margin-lg` er like, som `.--pt-md` og `.--paddingt-md`.

- Sider: none (alle), `t`/`b` (blokk start/slutt), `s`/`e` (inline start/slutt), `x`/`y` (inline/blokk
  akse). Logiske sider holder seg korrekte i høyre-til-venstre layouts.
- Steg: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, pluss `auto` kun for margin.

Kombiner dem for InstUIs `margin="small auto large"`-kortform:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farge** — semantiske overstyringer som holder seg på paletten: `.--bg-<name>` (bakgrunn),
`.--text-<name>` (tekstfarge), og `.--border-<name>` (kantfarge). Hver `<name>` er et
semantisk fargetoken — intensjonene (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) pluss `accent-*`-paletten (`accent-blue`, `accent-green`, og så videre). Et navn finnes kun hvis tokenet finnes i den familien, så `text-brand` er ikke en klasse — tekst har
ingen brand-token. Det er ingen måte å nå et primitiv eller en vilkårlig hex, og hver overstyring følger
temaet.

**Tokener/familier** — hver "ett token, én egenskap"-familie får en klasse per token, navngitt etter tokenet. Kombiner dem fritt:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver setter kun sin ene egenskap, så `border-width`/`border-radius` trenger en `border-*` farge og en kantstil for å faktisk tegne en kant. Disse bruker det fulle token-navnet (`.--border-radius-md`), mens farge- og spacing-hjelperne over bruker korte aliaser (`.--bg-brand`, `.--mt-lg`) — aliasene er ergonomiske snarveier; tokkenklassene er bokstavelige og uttømmende.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dekker InstUIs
tverrgående `display` og `textAlign` props (View, Button, Metric, Tabs, …) som komponérbare klasser —
så de er ikke per-komponent modifikatorer.

Hver dobbel-dash-klasse vinner kaskaden deterministisk over en like-navngitt enkeldash-komponentmodifikator, uavhengig av importrekkefølge for stilark — se [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er ren CSS drevet av `--instui-*`-tokenene, så det følger InstUI gjennom tokenlaget. Se [API-referansen](/api/) for `componentsCss` og per-komponent-byggerne.

## Overlays: dialog og popover

Overlay-komponentene bruker native plattformprimitiver, så de oppfører seg tilgjengelig med lite eller ingen
JavaScript.

**Modal** — sett `.instui-modal` på en native `<dialog>`. Den får fokusfanging, `Esc`-for-å-lukke, og en
`::backdrop` gratis; backdropen dimmes med samme `--instui-component-mask-background-color`
token som `.instui-mask` (legg til `-blur` for frost-effekt). Åpne og lukk med invoker-kommandoer — ingen skript:

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

**Kontekstvisning / popover** — sett `.instui-context-view` på et `[popover]`-element og vipp det med
`popovertarget`. Det ligger øverst og lukkes på klikk utenfor eller `Esc`, igjen uten skript:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sett `.instui-drawer-layout` på en layout-rot med `.tray` og `.content`
barn. Legg til `open`-attributtet (eller `-open`) for å avsløre skuffen, og bruk `placement="end"`
(eller `-placement-end`) for å dokke den til inline-end siden — plassering løses gjennom logiske
`inset-inline-*`/`flex-direction`-egenskaper, så den snur automatisk under `dir="rtl"` uten
ekstra regler. Den fokuserte interaksjonspakken legger til Invoker-kommando-ruting og veksler overlay-modus
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

Begge mønstrene er også pakket som atferdsbaserte webkomponenter i `@pantoken/web-components`:
`<instui-modal open>` (en `<dialog>` drevet av sitt `open`-attributt) og `<instui-context-view>` (en
native popover).

Nettleserstøtte: popover-APIet og `popovertarget` er Baseline 2024; invoker-kommandoer
(`command`/`commandfor`) er Baseline 2025, så på eldre nettlesere koble knappene til `dialog.showModal()`
som en ett-linjers fallback. Posisjonering av en popover ved siden av triggeren bruker CSS anchor-posisjonering der
støttet (Chromium); ellers sentreres den i topplaget.

## Skjemaer

**FormField** — `.instui-form-field` er en CSS-Grid-innpakning som legger ut en etikett, kontrollen og eventuelle
meldinger. Sett det på et `<label>` slik at etiketten assosieres med kontrollen nativt. Den har tre grid-
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

`-layout-stacked` (standard) stabler områdene; `-layout-inline` plasserer etiketten ved siden av kontrollen (juster
med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` farger etiketten om.

Den **påkrevde stjernen** vises når feltet er påkrevd av _enten_ `-required`-klassen _eller_ en
native `required`-kontroll inni det — så du kan bare sette `required` på inputfeltet og merket vises.
Det er dekorativt (en `::after` på etiketten, utenfor tilgjengelighetstreet); kombiner det med en merknad som
"felt merket \* er påkrevd" med mindre skjemaet er selvforklarende.

**FormFieldGroup** — `.instui-form-field-group` grupperer relaterte felt i en `<fieldset>` med en
`<legend>` beskrivelse. Det er ren layout (ingen dedikerte token): standard stabler feltene;
`-layout-columns` / `-layout-inline` flyter dem i responsive kolonner, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for å finjustere gridet.

**RadioInputGroup** — `.instui-radio-input-group` er samme `<fieldset>`/`<legend>`-grupperingen,
spesialisert for radioer. Fordi de underordnede radioene deler en `name`, er valg nativt enkeltvalg —
så et sett togglebrytere oppfører seg som én kontroll, ikke løse knapper. `-variant-simple` (standard) legger
ut standard radioer (`-layout-columns`/`-inline` flyter dem i en rad); `-variant-toggle` kobler de
underordnede `.instui-radio.-variant-toggle`-knappene til en enkelt segmentert kontroll (sammenklemte kanter,
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

**Meldinger** — `.instui-form-field-messages` er beholderen; hver `.instui-form-field-message` tar en
`-type-*`: `-type-hint` (grå, standard), `-type-error` (rød tekst + en sirkel-varsel-glyph), `-type-success`
(grønn tekst + en sirkel-sjekk-glyph), og `-type-screenreader-only` (visuelt klippet, fortsatt annonsert).
Glyphene males i `currentColor`, så de matcher alltid meldingsfargen. `-type-new-error` er et
avskrevet alias for `-type-error`. Koble beholderen til kontrollen med `aria-describedby`, og sett
`aria-invalid` på kontrollen når det er en feil.

Inne i en FormField følger en `-type-error`-melding klient-side validering: den forblir skjult til
feltets kontroll er `:user-invalid` (native, etter at brukeren har interagert) — eller du tvinger den med `-invalid`
på `.instui-form-field` (for en server-side feil). En frittstående `.instui-form-field-messages` (ikke i
et felt) påvirkes ikke. Kontrollens fokusring følger: farlig ved `:user-invalid`/`-invalid`,
suksess på `-success`.

**Tekstkontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), og `.instui-simple-select` (native `<select>` med caret) deler ett utseende og de samme
tilstandene: `-invalid` (feil-kant), `-success` (suksess-kant), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For et ledende/etterfølgende ikon (InstUIs `renderBeforeInput`/`renderAfterInput`), pakk
inputen i `.instui-input-group` og legg til en `.before`/`.after` slot (en `-icon-*` glyph); `-should-not-wrap`
holder det på én linje. `.instui-number-input` er den fasaden pluss en `.arrows` +/- spinnerkolonne (native
`type="number"`; koble knappene til `stepUp()`/`stepDown()`). `.instui-range-input` er en stilisert
`input[type="range"]` hvis verdi renderes i en `.instui-range-input-value` invers boble. For en rik
combobox med en listbox-popover, bruk `@instructure/ui` — dette biblioteket dekker de native kontrollene.

**Stilisert select-dropdown (eksperimentell)** — en valgfri `select.css` oppgraderer _samme_
`.instui-simple-select`-element: den stiler den åpne dropdownen (panelet og hver option, med hover og
valgtilstander) ved bruk av CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` avhenger av `appearance: base-select` / `::picker(select)`, som er **eksperimentelt**
> (Chrome 135+, ikke enda Baseline). Det leveres som et separat valg-ark og hver regel er gattet
> bak `@supports (appearance: base-select)`, så det gjør ingenting i u støttede nettlesere — den
> `.instui-simple-select`-kontrollen forblir bare den vanlige native select. Last det kun hvis du ønsker den
> forbedrede dropdownen og aksepterer den begrensede støtten.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
