# Komponenter

`@pantoken/components` leverer klassebaserede komponentstilarter bygget ud fra Instructure-tokens. Importér
stylesheetet og tag dit markup — intet framework kræves.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Foretrækker du brugerdefinerede elementer? `@pantoken/web-components` pakker de samme stilarter som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` og flere — se [package map](/api/).

## Konventioner

CSS-konventionerne i dette paket er baseret på en modificeret version af [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifiers er **nøgle-værdi** — `-<prop>-<val>`, afstemt med InstUI-prop-navne — så de læser sig selv: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Booleske props er blot prop-navnet, hvor tilstedeværelse betyder `true` (`-has-shadow`, `-clickable`); en default-aktiveret boolean slået fra
inverterer (`-without-background`, `-without-border`). Størrelser accepterer både korte og lange stavemåder
(`-size-sm` = `-size-small`). Hvor et navn afviger fra InstUI, virker den InstUI-semantiske klasse stadig
men er forældet (f.eks. `-variant-info` → brug `-color-info`).

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

For InstUI's `timeout` prop, sæt den enhedsløse `--timeout` custom property i millisekunder og indlæs
Alert-interactionen. En positiv værdi planlægger lukning; `0` (standard) lader alerten blive
på plads. Tilføj `transition` utility'ens `instui-transition -fade-entered` klasser for InstUI's fade; udelad
dem for øjeblikkelig fjernelse. Interaktionen styrer `-fade-exiting` state og udløser et annullerbart,
boblenede `dismiss` event før fjernelse, så en applikation kan kalde `preventDefault()` for at beholde
alerten monteret.

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

Progress bars accepterer vilkårlige skalaer via `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med forældede aliaser `--value-now` og `--value-max`. Tilføj `-should-animate`
for at anvende InstUI's halvt-sekunds transition når en værdi ændres. `.value` ligger side om side med `.bar` som
et child af roden; tilføj `-render-value-inside` for i stedet at rendere det over sporet, alignet til dets start
(style det for læsbarhed mod meter-farven). Brug et native `<progress>` for et
nul-baseret range og `<meter>` når minimum ikke er nul; webkomponenterne vælger automatisk mellem dem
fra deres `min` attribute. InstUI har ingen indeterminate state, så en `<progress>`
uden sit `value` attribute er pantoken-only bedste gæt: `progress-bar` animerer `.bar` som et
glidende segment og `progress-circle` spinner sin ring i en fast bue, begge skjuler `.value`.

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

Progress-cirkler accepterer de samme vilkårlige skalaer gennem `--min`, `--value` og `--max`.
`--value-now` og `--value-max` forbliver som forældede funktionelle aliaser. Tilføj `-should-animate` og
indlæs focused interaction-bundlet for at reproducere InstUI's mount-animation; `--animation-delay` er en
enhedsløs millisekund-forsinkelse. De forældede `-should-animate-on-mount` og
`-shold-animate-on-mount` stavemåder forbliver funktionelle aliaser.

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

## Klasse-præfiks

Hver klasse er navnerummet `instui-` som standard. Byg et stylesheet med dit eget præfiks — eller uden — ved
at sende `prefix` til enhver builder. Enhver falsy værdi (`null`, `undefined`, `""`, eller ved at udelade den) fjerner
præfikset helt, så du kan forfatte `class="heading -level-h1"` i stedet for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

De bindestregs-præfiksede modifiers (`.-color-secondary`, `.-level-h1`) er uændrede begge veje. De
stylesheets, som pakkes med pakken, beholder `instui` præfikset.

## Basis

`base.css` er en opt-in reset, der sætter globale dokumentstandarder fra tokens: `box-sizing`, en
`body` reset, sidesurface, grundlæggende tekstfarve og font, `color-scheme` (så `light-dark()` tokens
og native controls følger temaet), og en basal link-styling. Indlæs den én gang, før komponent- og prose-
sheets, når pantoken ejer siden.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Spring den over, når du embedder komponenter i et host, der allerede temaer sin egen `html` og `body` —
resetten maler sidesurface, så du ikke ønsker den til at kæmpe med hosten. Alt hvad den sætter bruger
lav-specificitets `:where()` selektorer, så dine egne regler altid vinder.

`base.css` _anvender_ brand-fonten (`font-family: var(--instui-font-family-base)`, med system
fallbacks); for at _indlæse_ den, importér den opt-in `fonts.css` — `@font-face` regler for Atkinson Hyperlegible
Next, pegende på woff2'erne leveret i pakken. Den er separat fordi skrifttyperne er ~350 kB og
self-hosting af fonte er et bevidst valg.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skærmlæser-indhold

<p>Der er en skjult besked efter denne sætning.<span class="instui-screen-reader-content">Kun skærmlæsere annoncerer dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler et element visuelt samtidig med at det beholdes i accessibility-treet
— til labels og statustekst som hjælpe-teknologi bør læse, men designet ikke skal vise.

## Utilities

`utilities.css` er et opt-in lag af tværgående klasser: en `View` primitiv, spacing på token-skalaen,
og semantiske farveoverskrivelser. I modsætning til komponentens `-modifier` klasser, bruger disse en **dobbel
bindestreg** (`--mod`) så de aldrig kolliderer med en komponents egne modifier-navne, og de anvendes på ethvert
element — bare eller komponeret ovenpå en komponent.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue surface med on-color tekst.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centreret med mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` er InstUI's `View`. Det er basis, du lægger spacing og farve ovenpå, og det
bærer nøgle-værdi modifiers for sine egne visuelle props så du ikke behøver række efter utilities:
`-background-*` (dets surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — disse er `view`'s egne
enkel-bindestregs modifiers, uafhængige af dobbelt-bindestreg utilities nedenfor. Fri-værdi props
(width/height/inset) forbliver inline-styles; `margin`/`padding` bruger spacing-utilities.

**Spacing** — per-side klasser på spacing-skalaen. Læs dem som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller de fulde ord `margin`/`padding`), en valgfri logisk side, så et
step. Så `.--m-lg` og `.--margin-lg` er det samme, ligesom `.--pt-md` og `.--paddingt-md`.

- Sider: none (alle), `t`/`b` (blok start/slut), `s`/`e` (inline start/slut), `x`/`y` (inline/blok
  akse). Logiske sider forbliver korrekte i højre-til-venstre layouts.
- Steps: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` kun for margin.

Kombinér dem for InstUI's `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farve** — semantiske overrides der forbliver på-palette: `.--bg-<name>` (baggrund),
`.--text-<name>` (tekstfarve), og `.--border-<name>` (kantfarve). Hver `<name>` er en
semantisk farvetoken — intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*` paletten (`accent-blue`, `accent-green`, og så videre). Et navn findes kun hvis tokenet findes i den familie, så `text-brand` er ikke en klasse — tekst har
ingen brand-token. Der er ingen måde at nå en primitiv eller en vilkårlig hex, og hver override følger
temaet.

**Token-familier** — hver "én token, én egenskab" familie får en klasse per token, navngivet efter tokenet. Kombinér dem frit:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver sætter kun sin ene egenskab, så `border-width`/`border-radius` behøver en `border-*` farve og en kant
style for faktisk at tegne en kant. Disse bruger det fulde token-navn (`.--border-radius-md`), mens
farve- og spacing-hjælperne ovenfor bruger korte aliaser (`.--bg-brand`, `.--mt-lg`) — aliaserne
er ergonomiske genveje; token-klasserne er bogstavelige og udtømmende.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dækker InstUI's
tværgående `display` og `textAlign` props (View, Button, Metric, Tabs, …) som komponerbare klasser —
så de er ikke per-komponent modifiers.

Hver double-dash klasse vinder kaskaden deterministisk over en samme-navn enkel-dash komponentmodifier, uanset stylesheet import-rækkefølge — se [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er ren CSS drevet af `--instui-*` tokens, så det følger InstUI gennem tokenlaget. Se [API reference](/api/) for `componentsCss` og per-komponent builders.

## Overlays: dialog og popover

Overlay-komponenterne bruger native platform-primitiver, så de opfører sig tilgængeligt med lidt eller ingen
JavaScript.

**Modal** — sæt `.instui-modal` på et native `<dialog>`. Det får focus-trapping, `Esc`-to-close, og et
`::backdrop` gratis; backdrop'en dæmpes med samme `--instui-component-mask-background-color`
token som `.instui-mask` (tilføj `-blur` for at frost'e den). Åbn og luk med invoker-kommandoer — ingen script:

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

**Context view / popover** — sæt `.instui-context-view` på et `[popover]` element og toggle det med
`popovertarget`. Det ligger øverst og lukkes ved klik-udenfor eller `Esc`, igen uden script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sæt `.instui-drawer-layout` på en layout-root med `.tray` og `.content`
children. Tilføj `open` attributten (eller `-open`) for at vise tray'en, og brug `placement="end"`
(eller `-placement-end`) for at dokke den til inline-end siden — placering løses via logiske
`inset-inline-*`/`flex-direction` properties, så den vender automatisk under `dir="rtl"` uden
ekstra regler. Det focused interaction-bundle tilføjer Invoker kommando-routing og toggler overlay-tilstand
(`should-overlay-tray`) når bredden krydser `--drawer-layout-min-width` (standard
`--instui-breakpoints-sm`, derefter `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` bruges til in-flow overlays (en spinner over et kort); en modals `::backdrop`
dækker modal-tilfældet.

Begge mønstre er også pakket som adfærds-baserede custom elements i `@pantoken/web-components`:
`<instui-modal open>` (en `<dialog>` drevet af dens `open` attribute) og `<instui-context-view>` (en
native popover).

Browser-support: popover API'en og `popovertarget` er Baseline 2024; invoker-kommandoer
(`command`/`commandfor`) er Baseline 2025, så på ældre browsere bind knapperne til `dialog.showModal()`
som en én-linje fallback. Positionering af en popover ved siden af dens trigger bruger CSS anchor-positionering hvor
understøttet (Chromium); andre steder centreres den i top-laget.

## Formularer

**FormField** — `.instui-form-field` er en CSS-Grid wrapper, der lægger label, control og eventuelle
beskeder ud. Sæt den på et `<label>` så labelen associerer med sin kontrol nativt. Den har tre grid
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

`-layout-stacked` (standard) stakker områderne; `-layout-inline` placerer label ved siden af control (juster
med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` recolorerer labelen.

Det **påkrævede asterisk** vises når feltet er påkrævet af _enten_ `-required` klassen _eller_ et
native `required` control indeni — så du kan blot sætte `required` på input'et og markeringen vises.
Den er dekorativ (en `::after` på labelen, uden for accessibility-treet); par den med en note som
"felter markeret \* er påkrævede" medmindre formen er selvindlysende.

**FormFieldGroup** — `.instui-form-field-group` grupperer relaterede felter i en `<fieldset>` med en
`<legend>` beskrivelse. Det er ren layout (ingen dedikerede tokens): default stakker felterne;
`-layout-columns` / `-layout-inline` flyder dem i responsive kolonner, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for at justere grid'et.

**RadioInputGroup** — `.instui-radio-input-group` er samme `<fieldset>`/`<legend>` grouping,
specialiseret til radios. Fordi child-radios deler en `name`, er valg nativt single-choice —
så et sæt toggle-knapper opfører sig som en kontrol, ikke løse knapper. `-variant-simple` (standard) lægger
standard radios ud (`-layout-columns`/`-inline` flyder dem i en række); `-variant-toggle` forbinder de
child `.instui-radio.-variant-toggle` knapper til en enkelt segmenteret kontrol (sammenklappede kanter,
afrundede yderender):

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

**Beskeder** — `.instui-form-field-messages` er containeren; hver `.instui-form-field-message` tager en
`-type-*`: `-type-hint` (grå, standard), `-type-error` (rød tekst + en cirkel-alert glyph), `-type-success`
(grøn tekst + en cirkel-check glyph), og `-type-screenreader-only` (visuelt klippet, stadig annonceret).
Glyphs males i `currentColor`, så de altid matcher beskedfarven. `-type-new-error` er et
forældet alias af `-type-error`. Forbind containeren til kontrollen med `aria-describedby`, og sæt
`aria-invalid` på kontrollen når der er en fejl.

Inde i en FormField følger en `-type-error` besked client-side validering: den forbliver skjult indtil
feltets kontrol er `:user-invalid` (naturligt, efter brugerinteraktion) — eller du tvinger den med `-invalid`
på `.instui-form-field` (for en server-side fejl). En standalone `.instui-form-field-messages` (ikke i
et felt) påvirkes ikke. Kontrollens focus-ring følger trop: danger når `:user-invalid`/`-invalid`,
success på `-success`.

**Tekst-kontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), og `.instui-simple-select` (native `<select>` med caret) deler ét udseende og de samme
states: `-invalid` (fejl-kant), `-success` (success-kant), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For et leading/trailing ikon (InstUI's `renderBeforeInput`/`renderAfterInput`), wrap
input'et i `.instui-input-group` og tilføj en `.before`/`.after` slot (en `-icon-*` glyph); `-should-not-wrap`
holder det på én linje. `.instui-number-input` er den facade plus en `.arrows` +/- spinner-kolonne (native
`type="number"`; bind knapperne til `stepUp()`/`stepDown()`). `.instui-range-input` er et stylet
`input[type="range"]` hvis værdi renderes i en `.instui-range-input-value` invers boble. For en rich
combobox med en listbox-popover, brug `@instructure/ui` — dette bibliotek dækker de native controls.

**Styled select dropdown (eksperimentel)** — en opt-in `select.css` opgraderer det _samme_
`.instui-simple-select` element: det styler den åbne dropdown (panelet og hver option, med hover og
valgt-tilstande) ved brug af CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` afhænger af `appearance: base-select` / `::picker(select)`, hvilket er **eksperimentelt**
> (Chrome 135+, ikke endnu Baseline). Det leveres som et separat opt-in sheet og hver regel er gated
> bag `@supports (appearance: base-select)`, så det gør ingenting i ikke-understøttede browsere — `.instui-simple-select` kontrollen
> forbliver blot det almindelige native select. Indlæs det kun hvis du vil have den
> forbedrede dropdown og accepterer den begrænsede support.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
