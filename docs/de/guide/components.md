# Komponenten

`@pantoken/components` liefert klassenbasierte Komponentenstile, erstellt aus den Instructure-Token. Importiere
das Stylesheet und versehe dein Markup mit den Klassen — kein Framework erforderlich.

```ts
import "@pantoken/components/components.css";
```

> [!HINWEIS]
> Bevorzugst du benutzerdefinierte Elemente? `@pantoken/web-components` verpackt dieselben Stile als `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` und mehr — siehe die
> [Paketkarte](/api/).

## Konventionen

Die CSS-Konventionen in diesem Paket basieren auf einer modifizierten Version von [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifier sind **Schlüssel-Wert** — `-<prop>-<val>`, ausgerichtet an InstUI-Prop-Namen — sodass sie für sich lesbar sind:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolesche Props sind nur der Prop-Name, wobei Präsenz
`true` bedeutet (`-has-shadow`, `-clickable`); ein standardmäßig aktiviertes Bool, das ausgeschaltet wird,
invertiert (`-without-background`, `-without-border`). Größen akzeptieren kurze und lange Schreibweisen
(`-size-sm` = `-size-small`). Weicht ein Name von InstUI ab, funktioniert die InstUI-semantische Klasse weiterhin,
ist aber veraltet (z. B. `-variant-info` → verwende `-color-info`).

### Beispiel

Instructure UI React-Komponente:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken Komponenten:

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

Für InstUIs `timeout`-Prop setze die einheitenlose `--timeout`-Custom-Property in Millisekunden und lade
die Alert-Interaktion. Ein positiver Wert plant das Ausblenden; `0` (die Voreinstellung) belässt die Alert-Komponente an
Ort und Stelle. Füge die `transition`-Utility-Klassen `instui-transition -fade-entered` für InstUIs Fade hinzu; lasse
sie weg für sofortige Entfernung. Die Interaktion steuert den `-fade-exiting`-Zustand und feuert ein abbrechbares,
blubberndes `dismiss`-Event vor der Entfernung, sodass eine Anwendung `preventDefault()` aufrufen kann, um die
Alert-Komponente eingebunden zu lassen.

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

Fortschrittsbalken akzeptieren beliebige Skalen über `--min` (`0` standardmäßig), `--value` und `--max`
(`100` standardmäßig), mit veralteten Aliasen `--value-now` und `--value-max`. Füge `-should-animate`
hinzu, um InstUIs halbe-Sekunden-Transition anzuwenden, wann immer sich ein Wert ändert. `.value` steht neben `.bar` als
Kind des Roots; füge `-render-value-inside` hinzu, um es stattdessen über die Spur gerendert und an ihrem Anfang ausgerichtet darzustellen
(style es für Lesbarkeit gegenüber der Meter-Farbe). Verwende ein natives `<progress>` für einen
nullbasierten Bereich und `<meter>`, wenn das Minimum ungleich null ist; die Webkomponenten wählen automatisch zwischen ihnen
aus ihrem `min`-Attribut. InstUI hat keinen indeterminierten Zustand, daher ist bei fehlendem `<progress>`
Attribut das Verhalten eine pantoken-interne beste Schätzung: `progress-bar` animiert `.bar` als
gleitendes Segment und `progress-circle` dreht seinen Ring in einem festen Bogen, wobei beide `.value` verbergen.

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

Fortschrittskreise akzeptieren dieselben beliebigen Skalen über `--min`, `--value` und `--max`.
`--value-now` und `--value-max` bleiben veraltete funktionale Aliase. Füge `-should-animate` hinzu und
lade das Focused-Interaction-Bundle, um InstUIs Mount-Animation zu reproduzieren; `--animation-delay` ist eine
einheitenlose Millisekunden-Verzögerung. Die veralteten Schreibweisen `-should-animate-on-mount` und
`-shold-animate-on-mount` bleiben funktionale Aliase.

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

## Klassen-Präfix

Jede Klasse ist standardmäßig unter `instui-` namespace-isiert. Baue ein Stylesheet mit eigenem Präfix — oder ohne — indem du
`prefix` an jeden Builder übergibst. Jeder falsy-Wert (`null`, `undefined`, `""` oder Weglassen)
entfernt das Präfix vollständig, sodass du `class="heading -level-h1"` statt `class="instui-heading -level-h1"` authoren kannst:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Die mit Bindestrich-präfigierten Modifier (`.-color-secondary`, `.-level-h1`) bleiben in jedem Fall unverändert. Die
vom Paket ausgelieferten Stylesheets behalten das `instui`-Präfix.

## Basis

`base.css` ist ein optionales Reset, das globale Dokument-Defaults aus den Token setzt: `box-sizing`, ein
`body`-Reset, die Seitenoberfläche, Basis-Textfarbe und Schrift, `color-scheme` (sodass `light-dark()`-Token
und native Steuerelemente dem Thema folgen), und einen Basis-Link. Lade es einmal, vor den Komponenten- und Prose-Stylesheets,
wenn pantoken die Seite thematisiert.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Überspringe es, wenn Komponenten in einen Host eingebettet werden, der bereits sein eigenes `html` und `body` themt —
das Reset malt die Seitenoberfläche, daher willst du nicht, dass es mit dem Host konkurriert. Alles, was es setzt, verwendet
niedrig-spezifische `:where()`-Selektoren, sodass deine eigenen Regeln immer gewinnen.

`base.css` _wendet an_ die Brand-Schrift (`font-family: var(--instui-font-family-base)`, mit System-Fallbacks); um sie _zu laden_, importiere das optionale `fonts.css` — `@font-face`-Regeln für Atkinson Hyperlegible
Next, die auf die im Paket enthaltenen woff2s zeigen. Es ist separat, weil die Schriftdateien ~350 kB groß sind und
Self-Hosting von Fonts eine bewusste Entscheidung ist.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Screenreader-Inhalt

<p>Nach diesem Satz befindet sich eine verborgene Nachricht.<span class="instui-screen-reader-content">Nur Screenreader geben dies wieder.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` versteckt ein Element visuell, während es im Accessibility-Tree bleibt
— für Labels und Statustexte, die assistive Technik lesen sollte, das Design aber nicht anzeigen soll.

## Utilities

`utilities.css` ist eine optionale Schicht querliegender Klassen: ein `View`-Primitiv, Abstände auf der Token-Skala und semantische Farbüberschreibungen. Anders als die Komponenten-`-modifier`-Klassen verwenden diese eine **Doppelstrich**-Konvention (`--mod`), sodass sie nie mit einem Komponenten-eigenen Modifiernamen kollidieren, und sie gelten für jedes
Element — direkt oder auf eine Komponente komponiert.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue Oberfläche mit On-Color Text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Zentriert mit mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` ist InstUIs `View`. Es ist die Basis, auf die du Abstände und Farben schichtest, und es
trägt Schlüssel-Wert-Modifier für seine eigenen visuellen Props, sodass du nicht auf Utilities zurückgreifen musst:
`-background-*` (seine Flächen), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, und `-cursor-*` — dies sind die
einfachen Bindestrich-Modifier von `view`, nicht verwandt mit den untenstehenden Doppelstrich-Utilities. Freiwert-Props
(Breite/Höhe/Inset) bleiben Inline-Styles; `margin`/`padding` nutzen die Spacing-Utilities.

**Abstand** — pro-Seite-Klassen auf der Spacing-Skala. Lies sie als `{m|p}{side}-{step}`: `m` für
Margin oder `p` für Padding (oder die vollen Wörter `margin`/`padding`), eine optionale logische Seite und dann ein
Schritt. Also sind `.--m-lg` und `.--margin-lg` gleich, ebenso `.--pt-md` und `.--paddingt-md`.

- Seiten: none (alle), `t`/`b` (Block-Anfang/Ende), `s`/`e` (Inline-Anfang/Ende), `x`/`y` (Inline/Block-Achse). Logische Seiten bleiben in rechts-nach-links-Layouts korrekt.
- Schritte: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` nur für Margin.

Kombiniere sie für InstUIs `margin="small auto large"`-Kurzschreibweise:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farbe** — semantische Überschreibungen, die auf der Palette bleiben: `.--bg-<name>` (Hintergrund),
`.--text-<name>` (Textfarbe) und `.--border-<name>` (Randfarbe). Jede `<name>` ist ein
semantisches Farbtoken — die Intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus die `accent-*`-Palette (`accent-blue`, `accent-green`, und so weiter). Ein Name existiert nur, wenn das Token in dieser Familie vorhanden ist, daher ist `text-brand` keine Klasse — Text hat kein Brand-Token. Es gibt keinen Weg, ein primitives Token oder ein beliebiges Hex zu erreichen, und jede Überschreibung folgt dem Thema.

**Token-Familien** — jede "ein Token, eine Eigenschaft"-Familie erhält eine Klasse pro Token, benannt nach dem Token. Kombiniere sie frei:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (und `-depth1`…`-card`) → `box-shadow`

Jede setzt nur ihre einzelne Eigenschaft, sodass `border-width`/`border-radius` eine `border-*`-Farbe und einen Randstil benötigen, um tatsächlich einen Rahmen zu zeichnen. Diese verwenden den vollständigen Token-Namen (`.--border-radius-md`), während die Farb- und Abstandshilfen oben kurze Aliase (`.--bg-brand`, `.--mt-lg`) nutzen — die Aliase sind ergonomische Abkürzungen; die Tokeng-Klassen sind wörtlich und erschöpfend.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) und `.--text-align-<value>` (`start`, `center`, `end`, `justify`) decken InstUIs
querliegende `display` und `textAlign` Props (View, Button, Metric, Tabs, …) als komponierbare Klassen ab —
sie sind also keine komponentenspezifischen Modifier.

Jede Doppelstrich-Klasse gewinnt deterministisch in der Kaskade über einen gleichnamigen Einzelstrich-Komponentenmodifier, unabhängig von der Reihenfolge der Stylesheet-Importe — siehe [Authoring conventions](/conventions/authoring)
für den Mechanismus.

Alles hier ist reines CSS, gesteuert von den `--instui-*`-Token, sodass es InstUI über die Token-Schicht folgt. Siehe die [API-Referenz](/api/) für `componentsCss` und die per-Komponente Builder.

## Overlays: Dialog und Popover

Die Overlay-Komponenten nutzen native Plattform-Primitiven, sodass sie mit wenig oder gar keinem JavaScript zugänglich funktionieren.

**Modal** — setze `.instui-modal` auf ein natives `<dialog>`. Es erhält Fokusfesselung, `Esc`-zum-Schließen und ein
`::backdrop` gratis; das Backdrop wird mit demselben `--instui-component-mask-background-color`
Token wie `.instui-mask` abgedunkelt (füge `-blur` hinzu, um es zu frostigen). Öffne und schließe es mit Invoker-Commands — kein Script:

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

**Context view / Popover** — setze `.instui-context-view` auf ein `[popover]`-Element und toggele es mit
`popovertarget`. Es liegt in der oberen Ebene und schließt bei Klick außerhalb oder `Esc` leicht — wiederum kein Script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer-Layout** — setze `.instui-drawer-layout` auf eine Layout-Root mit `.tray` und `.content`
Kindern. Füge das `open`-Attribut (oder `-open`) hinzu, um das Tray zu zeigen, und verwende `placement="end"`
(oder `-placement-end`), um es am Inline-Ende anzudocken — die Platzierung löst sich über logische
`inset-inline-*`/`flex-direction`-Eigenschaften auf, sodass sie unter `dir="rtl"` automatisch umschlägt, ohne
zusätzliche Regeln. Das Focused-Interaction-Bundle fügt Invoker-Command-Routing hinzu und toggelt den Overlay-Modus
(`should-overlay-tray`), wenn die Breite `--drawer-layout-min-width` überschreitet (Standard
`--instui-breakpoints-sm`, dann `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` bleibt für In-Flow-Overlays (ein Spinner über einer Karte); das `::backdrop` eines Modals
deckt den Modal-Fall ab.

Beide Muster sind außerdem als verhaltensbasierte Custom Elements in `@pantoken/web-components` eingewickelt:
`<instui-modal open>` (ein `<dialog>` gesteuert durch sein `open`-Attribut) und `<instui-context-view>` (ein
nativer Popover).

Browserunterstützung: die Popover-API und `popovertarget` sind Baseline 2024; Invoker-Commands
(`command`/`commandfor`) sind Baseline 2025, daher bei älteren Browsern die Buttons an `dialog.showModal()`
als einzeilige Fallback-Lösung binden. Das Positionieren eines Popovers neben seinem Trigger verwendet CSS Anchor Positioning, wo unterstützt (Chromium); andernorts zentriert es in der oberen Ebene.

## Formulare

**FormField** — `.instui-form-field` ist ein CSS-Grid-Wrapper, der ein Label, das Steuerelement und etwaige
Meldungen anordnet. Setze es auf ein `<label>`, damit das Label nativ mit seinem Steuerelement assoziiert wird. Es hat drei Grid-Areale — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (Standard) stapelt die Bereiche; `-layout-inline` legt das Label neben das Steuerelement (abstimmen mit `-label-align-{start,end}` und `-v-align-{top,middle,bottom}`). `-readonly` recoloriert das Label.

Der **Pflicht-Stern** erscheint, wenn das Feld entweder durch die Klasse `-required` _oder_ ein
nativen `required`-Control darin erforderlich ist — sodass du einfach `required` auf das Input setzen kannst und das Zeichen erscheint.
Es ist dekorativ (ein `::after` auf dem Label, außerhalb des Accessibility-Trees); kombiniere es mit einer Notiz wie
"Felder mit \* sind erforderlich", sofern das Formular nicht selbsterklärend ist.

**FormFieldGroup** — `.instui-form-field-group` gruppiert verwandte Felder in einem `<fieldset>` mit einer
`<legend>`-Beschreibung. Es ist reine Layoutarbeit (keine dedizierten Token): Standardmäßig stapelt es die Felder;
`-layout-columns` / `-layout-inline` lassen sie in responsive Spalten fließen, mit `-row-spacing-*` /
`-col-spacing-*` und `-v-align-*` zur Feinabstimmung des Grids.

**RadioInputGroup** — `.instui-radio-input-group` ist dieselbe `<fieldset>`/`<legend>`-Gruppierung,
spezialisiert für Radio-Buttons. Weil die Kind-Radios eine `name` teilen, ist die Auswahl nativ single-choice —
also verhält sich ein Set von Toggle-Buttons wie ein einziges Steuerelement, nicht wie einzelne Buttons. `-variant-simple` (Standard) legt
normale Radios aus (`-layout-columns`/`-inline` fließen sie in eine Reihe); `-variant-toggle` verbindet die
Kind-`.instui-radio.-variant-toggle`-Buttons zu einer einzigen segmentierten Steuerung (kollabierte Ränder,
abgerundete äußere Enden):

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

**Meldungen** — `.instui-form-field-messages` ist der Container; jede `.instui-form-field-message` nimmt eine
`-type-*`: `-type-hint` (grau, Standard), `-type-error` (roter Text + Kreis-Alert-Glyph), `-type-success`
(grüner Text + Kreis-Check-Glyph), und `-type-screenreader-only` (visuell abgeschnitten, wird dennoch angekündigt).
Die Glyphen werden in `currentColor` gefärbt, sodass sie immer zur Meldungsfarbe passen. `-type-new-error` ist ein
veralteter Alias von `-type-error`. Verdrahte den Container mit dem Steuerelement über `aria-describedby`, und setze
`aria-invalid` auf das Steuerelement, wenn ein Fehler vorliegt.

Innerhalb eines FormField folgt eine `-type-error`-Meldung der clientseitigen Validierung: sie bleibt verborgen, bis das
Steuerelement `:user-invalid` ist (nativ, nach Nutzerinteraktion) — oder du zwingst sie mit `-invalid`
auf dem `.instui-form-field` (für einen serverseitigen Fehler). Eine eigenständige `.instui-form-field-messages` (nicht in einem Feld) bleibt unbeeinflusst. Der Fokus-Ring des Steuerelements verhält sich entsprechend: Gefahr bei `:user-invalid`/`-invalid`,
Erfolg bei `-success`.

**Text-Steuerelemente** — `.instui-text-input` (natives `<input>`), `.instui-text-area` (natives `<textarea>`,
resizebar), und `.instui-simple-select` (natives `<select>` mit Caret) teilen ein Aussehen und dieselben
Zustände: `-invalid` (Fehler-Rand), `-success` (Erfolgs-Rand), `-readonly`, natives `:disabled`, und
`-size-{sm,md,lg}`. Für ein führendes/nachfolgendes Icon (InstUIs `renderBeforeInput`/`renderAfterInput`), wickle
das Input in `.instui-input-group` und füge einen `.before`/`.after`-Slot hinzu (eine `-icon-*`-Glyph); `-should-not-wrap`
hält alles in einer Zeile. `.instui-number-input` ist diese Fassade plus eine `.arrows` +/- Spinner-Spalte (natives
`type="number"`; verdrahte die Buttons mit `stepUp()`/`stepDown()`). `.instui-range-input` ist ein gestyltes
`input[type="range"]`, dessen Wert in einer `.instui-range-input-value`-inversen Blase gerendert wird. Für ein reiches
Combobox mit Listbox-Popover greife zu `@instructure/ui` — diese Bibliothek deckt die nativen Steuerelemente ab.

**Gestyltes Select-Dropdown (experimentell)** — ein optionales `select.css` upgraded dasselbe
`.instui-simple-select`-Element: es stylt das geöffnete Dropdown (das Panel und jede Option, mit Hover- und
Selected-Zuständen) unter Verwendung des CSS Customizable Select-Modells.

> [!WARNUNG]
> `select.css` beruht auf `appearance: base-select` / `::picker(select)`, die **experimentell** sind
> (Chrome 135+, noch nicht Baseline). Es wird als separates optionales Stylesheet geliefert und jede Regel ist hinter `@supports (appearance: base-select)` gegated, sodass es in nicht unterstützten Browsern nichts tut — das
> `.instui-simple-select`-Steuerelement bleibt einfach das native Select. Lade es nur, wenn du das
> erweiterte Dropdown möchtest und die eingeschränkte Unterstützung akzeptierst.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
