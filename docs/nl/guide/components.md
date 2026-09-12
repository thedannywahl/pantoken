# Componenten

`@pantoken/components` levert class-gebaseerde componentstijlen die zijn opgebouwd uit de Instructure-tokens. Importeer
de stylesheet en tag je markup — geen framework nodig.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Liever custom elements? `@pantoken/web-components` verpakt dezelfde stijlen als `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` en meer — zie de
> [package map](/api/).

## Conventies

De CSS-conventies in dit pakket zijn gebaseerd op een gemodificeerde versie van [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifiers zijn **key-value** — `-<prop>-<val>`, afgestemd op InstUI prop-namen — zodat ze voor zichzelf lezen: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Booleaanse props zijn alleen de propnaam, waarbij aanwezigheid betekent `true` (`-has-shadow`, `-clickable`); een default-on boolean die uitgeschakeld wordt
keert om (`-without-background`, `-without-border`). Groottes accepteren zowel korte als lange schrijfwijzen
(`-size-sm` = `-size-small`). Waar een naam afwijkt van InstUI werkt de InstUI-semantische klasse nog steeds
maar is verouderd (bijv. `-variant-info` → gebruik `-color-info`).

### Voorbeeld

Instructure UI React-component:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken componenten:

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

Voor InstUI's `timeout` prop, zet de eenheidsloze `--timeout` custom property in milliseconden en laad
de Alert-interactie. Een positieve waarde plant het wegvallen in; `0` (de standaard) laat de alert op
zijn plek. Voeg de `transition` utility's `instui-transition -fade-entered` klassen toe voor InstUI's fade; laat
ze weg voor directe verwijdering. De interactie bestuurt de `-fade-exiting` status en vuurt een annuleerbaar,
bubbelend `dismiss` event af vóór verwijdering, zodat een applicatie `preventDefault()` kan aanroepen om de
alert gemonteerd te houden.

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

Progress bars accepteren willekeurige schalen via `--min` (`0` standaard), `--value`, en `--max`
(`100` standaard), met verouderde aliassen `--value-now` en `--value-max`. Voeg `-should-animate`
toe om InstUI's halve-seconde transitie toe te passen wanneer een waarde verandert. `.value` staat naast `.bar` als
kind van de root; voeg `-render-value-inside` toe om het in plaats daarvan boven de track te renderen, uitgelijnd naar het begin —
(style het voor leesbaarheid tegen de meter-kleur). Gebruik een native `<progress>` voor een
nul-gebaseerd bereik en `<meter>` wanneer de minimum niet nul is; de webcomponenten selecteren automatisch tussen hen
op basis van hun `min` attribuut. InstUI heeft geen onbepaalde status, dus een `<progress>`
zonder zijn `value` attribuut is een pantoken-only beste gok: `progress-bar` animeert `.bar` als een
schuivend segment en `progress-circle` draait zijn ring met een vaste boog, beide verbergen `.value`.

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

Progress circles accepteren dezelfde willekeurige schalen via `--min`, `--value` en `--max`.
`--value-now` en `--value-max` blijven verouderde functionele aliassen. Voeg `-should-animate` toe en
laad het focused interaction-bundel om InstUI's mount-animatie te reproduceren; `--animation-delay` is een
eenheidsloze milliseconde vertraging. De verouderde schrijfwijzen `-should-animate-on-mount` en
`-shold-animate-on-mount` blijven functionele aliassen.

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

## Klasseprefix

Elke klasse is standaard namespaced met `instui-`. Bouw een stylesheet met je eigen prefix — of geen — door
`prefix` aan een builder door te geven. Elke falsy waarde (`null`, `undefined`, `""`, of het weglaten ervan) verwijdert de
prefix volledig, zodat je `class="heading -level-h1"` kunt schrijven in plaats van `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

De streepje-geprefexte modifiers (`.-color-secondary`, `.-level-h1`) blijven in beide gevallen ongewijzigd. De
stylesheets die door het pakket worden geleverd behouden de `instui` prefix.

## Basis

`base.css` is een opt-in reset die globale document-standaarden zet vanuit de tokens: `box-sizing`, een
`body` reset, het pagina-surface, basistekstkleur en lettertype, `color-scheme` (zodat `light-dark()` tokens
en native controls het thema volgen), en een basislink. Laad het één keer, vóór de component- en prozasheets,
wanneer pantoken de pagina beheert.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Sla het over wanneer je componenten in een host insluit die al zijn eigen `html` en `body` themet —
de reset schildert het pagina-surface, dus je wilt niet dat het met de host concurreert. Alles wat het zet gebruikt
laag-specificiteit `:where()` selectors, dus jouw eigen regels winnen altijd.

`base.css` _past_ het merklettertype toe (`font-family: var(--instui-font-family-base)`, met systeem-
fallbacks); om het te _laden_, importeer de opt-in `fonts.css` — `@font-face` regels voor Atkinson Hyperlegible
Next, verwijzend naar de woff2s die in het pakket zitten. Het is gescheiden omdat de fonts ~350 kB zijn en
self-hosting van fonts een bewuste keuze is.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Schermlezer-inhoud

<p>Er staat een verborgen bericht na deze zin.<span class="instui-screen-reader-content">Alleen schermlezers kondigen dit aan.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` verbergt een element visueel terwijl het in de toegankelijkheidboom blijft
— voor labels en statustekst die assistieve technologie moet voorlezen maar die het ontwerp niet moet tonen.

## Utilities

`utilities.css` is een opt-in laag van cross-cutting klassen: een `View` primitief, spacing op de token
schaal, en semantische kleuroverschrijvingen. In tegenstelling tot de component `-modifier` klassen, gebruiken deze een **dubbele
streep** (`--mod`) zodat ze nooit botsen met een component's eigen modifier-namen, en ze passen op elk
element — los, of opgebouwd op een component.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue surface met on-color tekst.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Gecentreerd met mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` is InstUI's `View`. Het is de basis waarop je spacing en kleur oplaag, en het
draagt key-value modifiers voor zijn eigen visuele props zodat je niet naar utilities hoeft te grijpen:
`-background-*` (zijn surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, en `-cursor-*` — dit zijn de single-dash
modifiers van `view`, onafhankelijk van de double-dash utilities hieronder. Vrije-waarde props
(width/height/inset) blijven inline styles; `margin`/`padding` gebruiken de spacing utilities.

**Spacing** — per-zijde klassen op de spacing-schaal. Lees ze als `{m|p}{side}-{step}`: `m` voor
margin of `p` voor padding (of de volledige woorden `margin`/`padding`), een optionele logische zijde, dan een
stap. Dus `.--m-lg` en `.--margin-lg` zijn hetzelfde, net als `.--pt-md` en `.--paddingt-md`.

- Zijden: none (alles), `t`/`b` (blok start/einde), `s`/`e` (inline start/einde), `x`/`y` (inline/blok
  as). Logische zijden blijven correct in rechts-naar-links layouts.
- Stappen: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` voor alleen margin.

Composeer ze voor InstUI's `margin="small auto large"` shorthand:
`class="--mt-sm --mx-auto --mb-lg"`.

**Kleur** — semantische overrides die op-palette blijven: `.--bg-<name>` (achtergrond),
`.--text-<name>` (tekstkleur), en `.--border-<name>` (randkleur). Elk `<name>` is een
semantische kleurtoken — de intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus de `accent-*` palette (`accent-blue`, `accent-green`, en zo
voort). Een naam bestaat alleen als de token in die familie bestaat, dus `text-brand` is geen klasse — tekst heeft
geen brand-token. Er is geen manier om een primitive of een willekeurige hex te bereiken, en elke override volgt
het thema.

**Tokengroepen** — elke "één token, één eigenschap" familie krijgt een klasse per token, genoemd naar het
token. Composeer ze vrij:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (en `-depth1`…`-card`) → `box-shadow`

Elk zet slechts zijn ene eigenschap, dus `border-width`/`border-radius` hebben een `border-*` kleur en een rand
stijl nodig om daadwerkelijk een rand te tekenen. Deze gebruiken de volledige tokennaam (`.--border-radius-md`), terwijl de
kleur- en spacing-helpers hierboven korte aliassen gebruiken (`.--bg-brand`, `.--mt-lg`) — de aliassen
zijn ergonomische snelkoppelingen; de token-klassen zijn letterlijk en uitputtend.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) en `.--text-align-<value>` (`start`, `center`, `end`, `justify`) dekken InstUI's
cross-cutting `display` en `textAlign` props (View, Button, Metric, Tabs, …) als composeerbare klassen —
dus die zijn geen per-component modifiers.

Elke double-dash klasse wint deterministisch in de cascade over een gelijknamige single-dash component
modifier, ongeacht de importvolgorde van stylesheets — zie [Authoring conventions](/conventions/authoring)
voor het mechanisme.

Alles hier is pure CSS aangedreven door de `--instui-*` tokens, dus het volgt InstUI via de token-
laag. Zie de [API reference](/api/) voor `componentsCss` en de per-component builders.

## Overlays: dialog en popover

De overlay-componenten gebruiken native platform-primitieven, dus ze gedragen zich toegankelijk met weinig of geen
JavaScript.

**Modal** — zet `.instui-modal` op een native `<dialog>`. Het krijgt focus-trapping, `Esc`-to-close, en een
`::backdrop` gratis; de backdrop is gedimd met dezelfde `--instui-component-mask-background-color`
token als `.instui-mask` (voeg `-blur` toe om het te verzachten). Open en sluit het met invoker-commando's — geen script:

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

**Context view / popover** — zet `.instui-context-view` op een `[popover]` element en toggel het met
`popovertarget`. Het rijdt op de bovenste laag en licht-dismissed bij buiten-klik of `Esc`, wederom geen script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — zet `.instui-drawer-layout` op een layout-root met `.tray` en `.content`
kinderen. Voeg het `open` attribuut toe (of `-open`) om de lade te onthullen, en gebruik `placement="end"`
(of `-placement-end`) om het te dokken aan de inline-eind zijde — plaatsing lost op via logische
`inset-inline-*`/`flex-direction` eigenschappen, dus het draait automatisch onder `dir="rtl"` zonder
extra regels. Het focused interaction-bundel voegt Invoker command routing toe en schakelt overlay-modus
(`should-overlay-tray`) wanneer de breedte `--drawer-layout-min-width` overschrijdt (standaard
`--instui-breakpoints-sm`, daarna `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` blijft voor in-flow overlays (een spinner over een kaart); een modal's `::backdrop`
dekt de modal-geval.

Beide patronen zijn ook als gedragsmatige custom elements ingepakt in `@pantoken/web-components`:
`<instui-modal open>` (een `<dialog>` gedreven door zijn `open` attribuut) en `<instui-context-view>` (een
native popover).

Browserondersteuning: de popover API en `popovertarget` zijn Baseline 2024; invoker-commando's
(`command`/`commandfor`) zijn Baseline 2025, dus op oudere browsers verbind de knoppen met `dialog.showModal()`
als één-regel fallback. Het positioneren van een popover naast zijn trigger gebruikt CSS anchor positioning waar
ondersteund (Chromium); elders centreert het in de bovenste laag.

## Formulieren

**FormField** — `.instui-form-field` is een CSS-Grid wrapper die een label, de control en eventuele
berichten layout. Zet het op een `<label>` zodat het label native met zijn control associeert. Het heeft drie grid
gebieden — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (standaard) stapelt de gebieden; `-layout-inline` plaatst het label naast de control (tune
met `-label-align-{start,end}` en `-v-align-{top,middle,bottom}`). `-readonly` verkleurt het label.

De **vereiste asterisk** verschijnt wanneer het veld vereist is door _ofwel_ de `-required` klasse _of_ een
native `required` control erin — dus je kunt gewoon `required` op de input zetten en het teken verschijnt.
Het is decoratief (een `::after` op het label, buiten de toegankelijkheidboom); combineer het met een nota zoals
"velden met \* zijn verplicht" tenzij het formulier zelfverklaarend is.

**FormFieldGroup** — `.instui-form-field-group` groepeert gerelateerde velden in een `<fieldset>` met een
`<legend>` beschrijving. Het is pure layout (geen specifieke tokens): standaard stapelt het de velden;
`-layout-columns` / `-layout-inline` laten ze in responsieve kolommen stromen, met `-row-spacing-*` /
`-col-spacing-*` en `-v-align-*` om het grid af te stemmen.

**RadioInputGroup** — `.instui-radio-input-group` is dezelfde `<fieldset>`/`<legend>` groepering,
gespecialiseerd voor radio's. Omdat de kind-radio's een `name` delen, is selectie native enkelkeuze —
dus een set toggle-buttons gedraagt zich als één control, niet losse knoppen. `-variant-simple` (standaard) legt
standaard radio's uit (`-layout-columns`/`-inline` stromen ze in een rij); `-variant-toggle` verbindt de
kind `.instui-radio.-variant-toggle` knoppen in een enkele gesegmenteerde control (ingeklapte randen,
afgeronde buitenkanten):

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

**Berichten** — `.instui-form-field-messages` is de container; elk `.instui-form-field-message` heeft een
`-type-*`: `-type-hint` (grijs, standaard), `-type-error` (rode tekst + een cirkel-waarschuwing glyph), `-type-success`
(groene tekst + een cirkel-check glyph), en `-type-screenreader-only` (visueel bijgesneden, nog steeds aangekondigd).
De glyphs schilderen in `currentColor`, dus ze passen altijd bij de berichtkleur. `-type-new-error` is een
verouderde alias van `-type-error`. Verbind de container met de control met `aria-describedby`, en zet
`aria-invalid` op de control wanneer er een fout is.

Binnen een FormField volgt een `-type-error` bericht client-side validatie: het blijft verborgen totdat de
veld-control `:user-invalid` is (native, na interactie van de gebruiker) — of je forceert het met `-invalid`
op de `.instui-form-field` (voor een server-side fout). Een standalone `.instui-form-field-messages` (niet in
een field) wordt niet beïnvloed. De focus-ring van de control volgt mee: danger bij `:user-invalid`/`-invalid`,
succes bij `-success`.

**Tekstcontrols** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), en `.instui-simple-select` (native `<select>` met een caret) delen één look en dezelfde
staten: `-invalid` (foutrand), `-success` (succesrand), `-readonly`, native `:disabled`, en
`-size-{sm,md,lg}`. Voor een voor-/achterliggende icoon (InstUI's `renderBeforeInput`/`renderAfterInput`), wikkel
de input in `.instui-input-group` en voeg een `.before`/`.after` slot toe (een `-icon-*` glyph); `-should-not-wrap`
houdt het op één regel. `.instui-number-input` is die façade plus een `.arrows` +/- spinner-kolom (native
`type="number"`; verbind de knoppen met `stepUp()`/`stepDown()`). `.instui-range-input` is een gestylde
`input[type="range"]` waarvan de waarde rendert in een `.instui-range-input-value` inverse bubbel. Voor een rijke
combobox met een listbox-popover, gebruik `@instructure/ui` — deze bibliotheek dekt de native controls.

**Gestileerde select dropdown (experimenteel)** — een opt-in `select.css` upgrade het _zelfde_
`.instui-simple-select` element: het style't de geopende dropdown (het paneel en elke optie, met hover- en
geselecteerde staten) met het CSS Customizable Select-model.

> [!WARNING]
> `select.css` vertrouwt op `appearance: base-select` / `::picker(select)`, wat **experimenteel** is
> (Chrome 135+, nog niet Baseline). Het wordt geleverd als een aparte opt-in sheet en elke regel is afgeschermd
> achter `@supports (appearance: base-select)`, dus het doet niets in niet-ondersteunde browsers — de
> `.instui-simple-select` control blijft gewoon de platte native select. Laad het alleen als je de
> verbeterde dropdown wilt en de beperkte ondersteuning accepteert.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
