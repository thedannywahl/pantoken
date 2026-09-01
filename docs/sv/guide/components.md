# Komponenter

`@pantoken/components` levererar klassbaserade komponentstilar byggda från Instructure-tokenarna. Importera
stilmallen och tagga din markup — inget ramverk krävs.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Föredrar du custom elements? `@pantoken/web-components` paketerar samma stilar som `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` med flera — se
> [package map](/guide/packages).

## Konventioner

CSS-konventionerna i detta paket baseras på en modifierad version av [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifierare är **nyckel-värde** — `-<prop>-<val>`, anpassade till InstUI-prop-namn — så de läser för
sig själva: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-props är bara prop-namnet,
där närvaro betyder `true` (`-has-shadow`, `-clickable`); en default-på boolean som stängs av
inverterar (`-without-background`, `-without-border`). Storlekar accepterar både korta och långa stavningar
(`-size-sm` = `-size-small`). Där ett namn avviker från InstUI fungerar fortfarande den InstUI-semantiska klassen
men är föråldrad (t.ex. `-variant-info` → använd `-color-info`).

### Exempel

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

För InstUI:s `timeout`-prop, sätt den enhetslösa `--timeout`-custom propertyn i millisekunder och ladda
Alert-interaktionen. Ett positivt värde schemalägger avvisning; `0` (standard) lämnar alerten kvar.
Lägg till `transition`-utilitets `instui-transition -fade-entered`-klasser för InstUI:s fading; utelämna
dem för omedelbar borttagning. Interaktionen driver `-fade-exiting`-tillståndet och avfyrar en avbokningsbar,
bubbleande `dismiss`-händelse före borttagning, så en applikation kan anropa `preventDefault()` för att behålla
alerten monterad.

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

Progressbars accepterar godtyckliga skalor genom `--min` (`0` som standard), `--value`, och `--max`
(`100` som standard), med föråldrade alias `--value-now` och `--value-max`. Lägg till `-should-animate`
för att applicera InstUI:s halvsekunds-transition när ett värde ändras. `.value` existerar parallellt med `.bar` som
ett barn till roten; lägg till `-render-value-inside` för att rendera det över spåret, istället, justerat mot dess start
(styla det för läsbarhet mot meterfärgen). Använd en native `<progress>` för ett
nollbaserat intervall och `<meter>` när minimum inte är noll; web components väljer mellan dem
automatiskt från sitt `min`-attribut. InstUI har inget indeterminate-tillstånd, så en `<progress>`
utan sitt `value`-attribut är en pantoken-endast bästa gissning: `progress-bar` animerar `.bar` som ett
glidande segment och `progress-circle` snurrar sin ring i en fast båge, båda döljer `.value`.

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

Progresscirklar accepterar samma godtyckliga skalor genom `--min`, `--value`, och `--max`.
`--value-now` och `--value-max` kvarstår som föråldrade funktionella alias. Lägg till `-should-animate` och
ladda focused interaction-buntet för att reproducera InstUI:s mount-animation; `--animation-delay` är en
enhetslös millisekundfördröjning. De föråldrade stavningarna `-should-animate-on-mount` och
`-shold-animate-on-mount` förblir funktionella alias.

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

## Klassprefix

Varje klass är namespacad `instui-` som standard. Bygg en stilmall med din egen prefix — eller utan —
genom att skicka `prefix` till vilken builder som helst. Ett falskt värde (`null`, `undefined`, `""`, eller att utelämna det) tar bort
prefixet helt, så du kan skapa `class="heading -level-h1"` istället för `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

De bindestrecks-prefixed modifierarna (`.-color-secondary`, `.-level-h1`) förändras inte oavsett. De
stilmallar som skickas med paketet behåller `instui`-prefixet.

## Bas

`base.css` är en opt-in-reset som sätter globala dokumentstandarder från tokenarna: `box-sizing`, en
`body`-reset, sidans yta, grundläggande textfärg och font, `color-scheme` (så `light-dark()`-tokenar
och native kontroller följer temat), och en bas-länk. Ladda den en gång, före komponent- och prose-stilarna,
när pantoken äger sidan.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hoppa över den när du bäddar in komponenter i en värd som redan tematiserar sin egen `html` och `body` —
reseten målar sidans yta, så du vill inte att den ska slåss med värden. Allt den sätter använder
lågspecifika `:where()`-selektorer, så dina egna regler vinner alltid.

`base.css` _applicerar_ varumärkesfonten (`font-family: var(--instui-font-family-base)`, med systemfallbacks); för att _ladda_ den, importera den opt-in `fonts.css` — `@font-face` regler för Atkinson Hyperlegible
Next, som pekar på woff2-filerna som levereras i paketet. Den är separat eftersom typsnitten är ~350 kB och
self-hosting av fonter är ett medvetet val.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Skärmläsarinnehåll

<p>Det finns ett dolt meddelande efter denna mening.<span class="instui-screen-reader-content">Endast skärmläsare meddelar detta.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` döljer ett element visuellt samtidigt som det behålls i tillgänglighetsträdet
— för etiketter och statustexter som assistiv teknik ska läsa men designen inte ska visa.

## Utilities

`utilities.css` är ett opt-in-lager av tvärgående klasser: ett `View`-primtiv, spacing på tokenskalan, och semantiska färg-överskrivningar. Till skillnad från komponenternas `-modifier`-klasser använder dessa en **dubbel
bindestreck** (`--mod`) så de aldrig kolliderar med en komponentens egna modifierarnamn, och de tillämpas på vilket
element som helst — naket eller komponerat på en komponent.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue-yta med on-color-text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centrerad med mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` är InstUI:s `View`. Det är basen du lägger spacing och färg ovanpå, och den
bär key-value modifierare för sina egna visuella props så du inte behöver nå efter utilities:
`-background-*` (dess ytor), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, och `-cursor-*` — dessa är `view`'s egna
single-dash modifierare, orelaterade till de dubbel-dash utilities nedan. Frivärdes-props
(width/height/inset) förblir inline-stilar; `margin`/`padding` använder spacing-utilities.

**Spacing** — per-sida klasser på spacing-skalan. Läs dem som `{m|p}{side}-{step}`: `m` för
margin eller `p` för padding (eller hela orden `margin`/`padding`), en valfri logisk sida, sedan ett
steg. Så `.--m-lg` och `.--margin-lg` är samma, liksom `.--pt-md` och `.--paddingt-md`.

- Sidor: none (alla), `t`/`b` (block start/slut), `s`/`e` (inline start/slut), `x`/`y` (inline/block
  axel). Logiska sidor håller sig korrekta i höger-till-vänster-layouts.
- Steg: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, samt `auto` för margin endast.

Sammansätt dem för InstUI:s `margin="small auto large"`-shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Färg** — semantiska överskrivningar som håller sig på paletten: `.--bg-<name>` (bakgrund),
`.--text-<name>` (textfärg), och `.--border-<name>` (kantfärg). Varje `<name>` är en
semantisk färgtoken — intents ( `base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*`-paletten (`accent-blue`, `accent-green`, med flera). Ett namn finns bara om tokenen finns i den familjen, så `text-brand` är inte en klass — text har
ingen brand-token. Det finns inget sätt att nå en primitiv eller ett godtyckligt hex, och varje överskrivning följer
temat.

**Tokenfamiljer** — varje "en token, en egenskap" familj får en klass per token, namngiven efter
tokenen. Kombinera fritt:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (och `-depth1`…`-card`) → `box-shadow`

Varje klass sätter bara sin enda egenskap, så `border-width`/`border-radius` behöver en `border-*`-färg och en kantstil för att faktiskt rita en kant. Dessa använder det fullständiga token-namnet (`.--border-radius-md`), medan färg- och spacing-hjälparna ovan använder korta alias (`.--bg-brand`, `.--mt-lg`) — aliasen är ergonomiska genvägar; token-klasserna är bokstavliga och uttömmande.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) och `.--text-align-<value>` (`start`, `center`, `end`, `justify`) täcker InstUI:s
tvärgående `display` och `textAlign` props (View, Button, Metric, Tabs, …) som komponerbara klasser —
så de är inte per-komponent modifierare.

Varje dubbel-dash-klass vinner kaskaden deterministiskt över en lik-namngiven single-dash komponentmodifierare, oavsett stylesheet-importordning — se [Authoring conventions](/conventions/authoring)
för mekanismen.

Allt här är ren CSS driven av `--instui-*`-tokenarna, så det följer InstUI genom tokenskiktet. Se [API reference](/api/) för `componentsCss` och per-komponent-builders.

## Överlägg: dialog och popover

Överläggskomponenterna använder native plattformsprimitiv, så de beter sig tillgängligt med liten eller ingen
JavaScript.

**Modal** — sätt `.instui-modal` på en native `<dialog>`. Den får fokusfångst, `Esc`-för-att-stänga, och en
`::backdrop` gratis; backdropen dimmas med samma `--instui-component-mask-background-color`
token som `.instui-mask` (lägg till `-blur` för att frosta den). Öppna och stäng med invoker-kommandon — ingen script:

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

**Context view / popover** — sätt `.instui-context-view` på ett `[popover]`-element och växla det med
`popovertarget`. Det sitter i topplagret och stängs vid klick utanför eller `Esc`, återigen utan script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — sätt `.instui-drawer-layout` på ett layout-root med `.tray` och `.content`
barn. Lägg till `open`-attributet (eller `-open`) för att visa trayen, och använd `placement="end"`
(eller `-placement-end`) för att docka den till inline-end sidan — placering löses genom logiska
`inset-inline-*`/`flex-direction` egenskaper, så den vänds automatiskt under `dir="rtl"` utan
extra regler. Det focused interaction-buntet lägger till Invoker-kommandorouting och växlar overlay-läge
(`should-overlay-tray`) när bredd korsar `--drawer-layout-min-width` (standard
`--instui-breakpoints-sm`, sedan `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` används för in-flow-överlägg (en spinner över ett kort); en modals `::backdrop`
täcker modal-fallet.

Båda mönstren är också inlindade som beteendemässiga custom elements i `@pantoken/web-components`:
`<instui-modal open>` (en `<dialog>` styrd av sitt `open`-attribut) och `<instui-context-view>` (en
native popover).

Browserstöd: popover-API:t och `popovertarget` är Baseline 2024; invoker-kommandon
(`command`/`commandfor`) är Baseline 2025, så på äldre webbläsare koppla knapparna till `dialog.showModal()`
som en enradig fallback. Positionering av en popover intill dess trigger använder CSS anchor-positionering där det stöds (Chromium); annars centreras den i topplagret.

## Formulär

**FormField** — `.instui-form-field` är en CSS-Grid-wrapper som lägger ut en label, kontrollen och eventuella
meddelanden. Sätt den på en `<label>` så etiketten associerar med sin kontroll nativt. Den har tre gridområden — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (standard) staplar områdena; `-layout-inline` placerar etiketten bredvid kontrollen (justera
med `-label-align-{start,end}` och `-v-align-{top,middle,bottom}`). `-readonly` recolorerar etiketten.

Den **obligatoriska asterisken** visas när fältet är obligatoriskt antingen via `-required`-klassen _eller_ en
native `required`-kontroll inuti — så du kan bara sätta `required` på inputen och markeringen syns.
Den är dekorativ (en `::after` på etiketten, utanför tillgänglighetsträdet); para ihop den med en notis som
"fält markerade med \* är obligatoriska" om inte formuläret är självförklarande.

**FormFieldGroup** — `.instui-form-field-group` grupperar relaterade fält i en `<fieldset>` med en
`<legend>`-beskrivning. Det är ren layout (inga dedikerade tokens): standard staplar fälten;
`-layout-columns` / `-layout-inline` flödar dem i responsiva kolumner, med `-row-spacing-*` /
`-col-spacing-*` och `-v-align-*` för att finjustera grid:en.

**RadioInputGroup** — `.instui-radio-input-group` är samma `<fieldset>`/`<legend>`-gruppering,
specialiserad för radios. Eftersom barnradios delar en `name`, är val nativt enkval — så en uppsättning toggle-knappar beter sig som en kontroll, inte lösa knappar. `-variant-simple` (standard) lägger
ut standardradios (`-layout-columns`/`-inline` flödar dem i en rad); `-variant-toggle` kopplar ihop
barnens `.instui-radio.-variant-toggle`-knappar till en segmenterad kontroll (ihopfällda kanter,
avrundade yttre ändar):

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

**Meddelanden** — `.instui-form-field-messages` är containern; varje `.instui-form-field-message` tar en
`-type-*`: `-type-hint` (grå, standard), `-type-error` (röd text + en circle-alert-glyf), `-type-success`
(grön text + en circle-check-glyf), och `-type-screenreader-only` (visuellt klippt, fortfarande annonserad).
Glyferna målas i `currentColor`, så de matchar alltid meddelandefärgen. `-type-new-error` är ett
föråldrat alias för `-type-error`. Knyt containern till kontrollen med `aria-describedby`, och sätt
`aria-invalid` på kontrollen när det finns ett fel.

Inuti en FormField följer ett `-type-error`-meddelande klientvalidering: det hålls dolt tills
fältets kontroll är `:user-invalid` (nativt, efter att användaren interagerat) — eller så tvingar du det med `-invalid`
på `.instui-form-field` (för ett serverside-fel). Ett fristående `.instui-form-field-messages` (inte i
ett fält) påverkas inte. Kontrollens fokusring följer efter: fara när `:user-invalid`/`-invalid`,
framgång på `-success`.

**Textkontroller** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizbar), och `.instui-simple-select` (native `<select>` med en caret) delar utseende och samma
tillstånd: `-invalid` (fel-kant), `-success` (framgång-kant), `-readonly`, native `:disabled`, och
`-size-{sm,md,lg}`. För en ledande/efterföljande ikon (InstUI:s `renderBeforeInput`/`renderAfterInput`), linda
inputen i `.instui-input-group` och lägg till en `.before`/`.after`-slot (en `-icon-*`-glyf); `-should-not-wrap`
håller den på en rad. `.instui-number-input` är det facadet plus en `.arrows` +/- spinner-kolumn (native
`type="number"`; koppla knapparna till `stepUp()`/`stepDown()`). `.instui-range-input` är en stylad
`input[type="range"]` vars värde renderas i en `.instui-range-input-value` invers bubbla. För en rik
combobox med en listbox-popover, använd `@instructure/ui` — detta bibliotek täcker de native kontrollerna.

**Styled select dropdown (experimentell)** — en opt-in `select.css` uppgraderar _samma_
`.instui-simple-select`-element: den styliserar den öppna dropdownen (panelen och varje option, med hover och
selected-tillstånd) med hjälp av CSS Customizable Select-modellen.

> [!WARNING]
> `select.css` förlitar sig på `appearance: base-select` / `::picker(select)`, vilket är **experimentellt**
> (Chrome 135+, inte ännu Baseline). Det levereras som ett separat opt-in-ark och varje regel är bakom `@supports (appearance: base-select)`, så det gör ingenting i osupportade webbläsare — `.instui-simple-select`-kontrollen förblir den vanliga native select. Ladda det endast om du vill ha
> den förbättrade dropdownen och accepterar det begränsade stödet.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
