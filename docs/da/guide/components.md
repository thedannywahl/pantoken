# Komponenter

`@pantoken/components` leverer klassebaserede komponentstylinger bygget fra Instructure-tokenne. Importér
stylesheetet og tag dit markup — intet framework nødvendigt.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Foretrækker du custom elements? `@pantoken/web-components` pakker de samme styles som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` og flere — se
> [package map](/guide/packages).

## Konventioner

CSS-konventionerne i dette package er baseret på en modificeret version af [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifiers er **nøgle-værdi** — `-<prop>-<val>`, tilpasset InstUI prop-navne — så de læser for
sig selv: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-props er kun prop-navnet, hvor tilstedeværelse betyder `true` (`-has-shadow`, `-clickable`); en default-aktiveret boolean der slås fra
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

pantoken components:

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

For InstUI's `timeout` prop, sæt den unitløse `--timeout` custom property i millisekunder og load
Alert-interaktionen. En positiv værdi planlægger afvisning; `0` (default) lader alerten blive på
stedet. Tilføj `transition` utility'ens `instui-transition -fade-entered` klasser for InstUI's fade; udelad
dem for øjeblikkelig fjernelse. Interaktionen driver `-fade-exiting`-staten og affyrer en cancelerbar,
boblende `dismiss`-event før fjernelse, så en applikation kan kalde `preventDefault()` for at beholde
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

Progress bars accepterer vilkårlige skalaer gennem `--min` (`0` som standard), `--value`, og `--max`
(`100` som standard), med forældede `--value-now` og `--value-max` aliaser. Tilføj `-should-animate`
for at anvende InstUI's halve-sekunds transition når en værdi ændres. `.value` sidder sammen med `.bar` som
et child af root; tilføj `-render-value-inside` for at rendre den over tracken, justeret til dens start,
i stedet (style den for læsbarhed mod meter-farven). Brug et native `<progress>` for en
zero-baseret range og `<meter>` når minimum ikke er nul; webkomponenterne vælger mellem dem
automatisk ud fra deres `min` attribut. InstUI har ingen indeterminate-tilstand, så en `<progress>`
uden sit `value` attribut er et pantoken-only bedste gæt: `progress-bar` animerer `.bar` som et
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
load det fokuserede interaction-bundle for at reproducere InstUI's mount-animation; `--animation-delay` er en
unitløs millisekund-forsinkelse. De forældede `-should-animate-on-mount` og
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

Hver klasse er namespacet `instui-` som standard. Byg et stylesheet med dit eget præfiks — eller ingen — ved
at sende `prefix` til enhver builder. Enhver falsy værdi (`null`, `undefined`, `""`, eller at udelade den) fjerner
præfikset fuldstændigt, så du kan forfatte `class="heading -level-h1"` i stedet for `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

De bindestregs-præfiksede modifiers (`.-color-secondary`, `.-level-h1`) ændres ikke. De
stylesheets som pakkes med package'et bevarer `instui` præfikset.

## Base

`base.css` er en opt-in reset der sætter globale dokumentdefaults fra tokenne: `box-sizing`, en
`body` reset, sidenes surface, basis tekstfarve og font, `color-scheme` (så `light-dark()` tokenne
og native controls følger temaet), og en basis link-stil. Load den én gang, før komponent- og prose-
stylesheets, når pantoken ejer siden.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Spring den over når du embedder komponenter i et host, der allerede theme'er sin egen `html` og `body` —
resettet maler pagesurface, så du ikke vil have det kæmpe mod hostens styles. Alt hvad den sætter bruger
lav-specificitets `:where()` selectors, så dine egne regler altid vinder.

`base.css` _anvender_ brand-fonten (`font-family: var(--instui-font-family-base)`, med system
fallbacks); for at _loade_ den, importér den opt-in `fonts.css` — `@font-face` regler for Atkinson Hyperlegible
Next, pegende på woff2-filerne pakket i package'et. Den er separat fordi facerne er ~350 kB og
self-hosting af fonte er et bevidst valg.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skærmlæserindhold

<p>Der er en skjult besked efter denne sætning.<span class="instui-screen-reader-content">Kun skærmlæsere annoncerer dette.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skjuler et element visuelt mens det forbliver i tilgængelighedstræet
— til labels og statustekst som assistiv teknologi skal læse, men designet ikke skal vise.

## Utilities

`utilities.css` er et opt-in lag af tværgående klasser: en `View` primitiv, spacing på token-skalaen, og semantiske farve-overrides. I modsætning til komponent `-modifier` klasserne, bruger disse en **dobbelt
dash** (`--mod`) så de aldrig kolliderer med en komponents egne modifier-navne, og de anvendes på ethvert
element — bare, eller komponeret ovenpå en komponent.

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

**View** — `.instui-view` er InstUI's `View`. Det er basislaget du lægger spacing og farve ovenpå, og det
bærer nøgle-værdi modifiers for sine egne visuelle props så du ikke behøver række efter utilities:
`-background-*` (dets surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — disse er `view`'s egne
enkelt-bindestregs modifiers, upåvirkede af de dobbelt-dash utilities nedenfor. Fri-værdi props
(width/height/inset) forbliver inline styles; `margin`/`padding` bruger spacing-utilities.

**Spacing** — per-side klasser på spacingskalaen. Læs dem som `{m|p}{side}-{step}`: `m` for
margin eller `p` for padding (eller de fulde ord `margin`/`padding`), en valgfri logisk side, så et
trin. Så `.--m-lg` og `.--margin-lg` er det samme, ligesom `.--pt-md` og `.--paddingt-md`.

- Sider: none (alle), `t`/`b` (blok start/slut), `s`/`e` (inline start/slut), `x`/`y` (inline/blok
  akse). Logiske sider forbliver korrekte i højre-til-venstre layouts.
- Trin: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` kun for margin.

Kombinér dem for InstUI's `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — semantiske overrides der forbliver på-paletten: `.--bg-<name>` (baggrund),
`.--text-<name>` (tekstfarve), og `.--border-<name>` (border-farve). Hver `<name>` er en
semantisk farvetoken — intentsene (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*` paletten (`accent-blue`, `accent-green`, og så videre). Et navn er kun der hvis tokenen findes i den familie, så `text-brand` er ikke en klasse — tekst har
ingen brand-token. Der er ingen måde at nå en primitive eller et vilkårligt hex, og hver override følger
temaet.

**Token-familier** — hver "én token, én property" familie får en klasse per token, navngivet efter tokenen. Kombinér dem frit:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver sætter kun sin ene property, så `border-width`/`border-radius` behøver en `border-*` farve og en border
stil for faktisk at tegne en kant. Disse bruger det fulde token-navn (`.--border-radius-md`), mens
farve- og spacing-hjælperne ovenfor bruger korte aliaser (`.--bg-brand`, `.--mt-lg`) — aliaserne
er ergonomiske genveje; token-klasserne er bogstavelige og udtømmende.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dækker InstUI's
tværgående `display` og `textAlign` props (View, Button, Metric, Tabs, …) som komponerbare klasser —
så de er ikke per-komponent modifiers.

Hver dobbelt-dash klasse vinder kaskaden deterministisk over en ens-navngivet enkelt-dash komponents
modifier, uanset stylesheet-importrækkefølge — se [Authoring conventions](/conventions/authoring)
for mekanismen.

Alt her er ren CSS drevet af `--instui-*` tokenne, så det følger InstUI gennem tokenlaget. Se [API reference](/api/) for `componentsCss` og de per-komponent builders.

## Overlays: dialog og popover

Overlay-komponenterne bruger native platform-primitiver, så de opfører sig tilgængeligt med lidt eller ingen
JavaScript.

**Modal** — sæt `.instui-modal` på et native `<dialog>`. Det får fokus-fangst, `Esc`-to-close, og en
`::backdrop` gratis; backdropen er dimmet med samme `--instui-component-mask-background-color`
token som `.instui-mask` (tilføj `-blur` for at give frost). Åbn og luk med invoker-kommandoer — intet script:

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
`popovertarget`. Det ligger øverst og lukkes ved klik udenfor eller `Esc`, igen uden script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sæt `.instui-drawer-layout` på et layout-root med `.tray` og `.content`
children. Tilføj `open` attributten (eller `-open`) for at vise trayen, og brug `placement="end"`
(eller `-placement-end`) for at dokke den til inline-end siden — placering løses gennem logiske
`inset-inline-*`/`flex-direction` properties, så den flipper automatisk under `dir="rtl"` uden
yderligere regler. Det fokuserede interaction-bundle tilføjer Invoker kommando-routing og toggler overlay-tilstand
(`should-overlay-tray`) når bredden krydser `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, så `30rem`):

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

Begge mønstre er også pakket som behaviorelle custom elements i `@pantoken/web-components`:
`<instui-modal open>` (en `<dialog>` drevet af sin `open` attribut) og `<instui-context-view>` (en
native popover).

Browser-support: popover-API'en og `popovertarget` er Baseline 2024; invoker-kommandoer
(`command`/`commandfor`) er Baseline 2025, så på ældre browsere bind knapperne til `dialog.showModal()`
som en ét-linjers fallback. Positionering af en popover ved siden af triggeren bruger CSS anchor positioning hvor
det understøttes (Chromium); andre steder centrerer den i top-laget.

## Formularer

**FormField** — `.instui-form-field` er en CSS-Grid wrapper der placerer en label, control og eventuelle
beskeder. Sæt den på et `<label>` så labelen associerer med sin kontrol nativt. Den har tre grid
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

`-layout-stacked` (default) stabler områderne; `-layout-inline` placerer labelen ved siden af kontrollen (tunes
med `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` recolorerer labelen.

Det **påkrævede asterisk** vises når feltet er påkrævet af _enten_ `-required` klassen _eller_ en
native `required` kontrol inde i det — så du kan blot sætte `required` på inputtet og markeringen vises.
Den er dekorativ (et `::after` på labelen, udenfor tilgængelighedstræet); par den med en note som
"felter markeret \* er påkrævede" medmindre formen er selvforklarende.

**FormFieldGroup** — `.instui-form-field-group` grupper relaterede felter i et `<fieldset>` med en
`<legend>` beskrivelse. Det er ren layout (ingen dedikerede tokens): default stabler felterne;
`-layout-columns` / `-layout-inline` flyder dem i responsive kolonner, med `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` for at tune gridet.

**RadioInputGroup** — `.instui-radio-input-group` er den samme `<fieldset>`/`<legend>` gruppering,
specialiseret til radios. Fordi de child radios deler en `name`, er valg nativt single-choice —
så et sæt toggle-knapper opfører sig som én kontrol, ikke løse knapper. `-variant-simple` (default) lægger
standard radios ud (`-layout-columns`/`-inline` flyder dem i en række); `-variant-toggle` forbinder
child `.instui-radio.-variant-toggle` knapperne til et enkelt segmenteret kontrol (sammenklemte borders,
afrundede ydre ender):

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

**Messages** — `.instui-form-field-messages` er containeren; hver `.instui-form-field-message` tager en
`-type-*`: `-type-hint` (grå, default), `-type-error` (rød tekst + en circle-alert glyph), `-type-success`
(grøn tekst + en circle-check glyph), og `-type-screenreader-only` (visuelt klippet, stadig annonceret).
Glyphs males i `currentColor`, så de altid matcher message-farven. `-type-new-error` er et
forældet alias for `-type-error`. Forbind containeren til kontrollen med `aria-describedby`, og sæt
`aria-invalid` på kontrollen når der er en fejl.

Inde i en FormField følger en `-type-error` besked klient-side validering: den forbliver skjult indtil
feltets kontrol er `:user-invalid` (naturligt, efter brugerinteraktion) — eller du tvinger den med `-invalid`
på `.instui-form-field` (for en server-side fejl). En standalone `.instui-form-field-messages` (ikke i
et felt) er upåvirket. Kontrollens fokus-ring følger samme mønster: danger når `:user-invalid`/`-invalid`,
success ved `-success`.

**Tekstkontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), og `.instui-simple-select` (native `<select>` med caret) deler ét udseende og de samme
stater: `-invalid` (fejl-border), `-success` (succes-border), `-readonly`, native `:disabled`, og
`-size-{sm,md,lg}`. For et leading/trailing ikon (InstUI's `renderBeforeInput`/`renderAfterInput`), wrap
inputtet i `.instui-input-group` og tilføj en `.before`/`.after` slot (en `-icon-*` glyph); `-should-not-wrap`
holder det på én linje. `.instui-number-input` er den facade plus en `.arrows` +/- spinner-kolonne (native
`type="number"`; bind knapperne til `stepUp()`/`stepDown()`). `.instui-range-input` er en stylet
`input[type="range"]` hvis værdi renderes i en `.instui-range-input-value` inverse boble. Til en rich
combobox med listbox-popover, brug `@instructure/ui` — dette bibliotek dækker de native controls.

**Styled select dropdown (eksperimentel)** — en opt-in `select.css` opgraderer den _samme_
`.instui-simple-select` element: den styler den åbnede dropdown (panelet og hver option, med hover og
selected-states) ved hjælp af CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` afhænger af `appearance: base-select` / `::picker(select)`, hvilket er **eksperimentelt**
> (Chrome 135+, endnu ikke Baseline). Det leveres som et separat opt-in sheet og hver regel er gated
> bag `@supports (appearance: base-select)`, så det gør intet i ikke-understøttede browsere — `.instui-simple-select` kontrollen forbliver blot den almindelige native select. Load det kun hvis du ønsker den
> forbedrede dropdown og accepterer det begrænsede support.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
