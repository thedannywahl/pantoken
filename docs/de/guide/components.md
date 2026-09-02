# Komponenten

`@pantoken/components` liefert klassenbasierte Komponentenstile, die aus den Instructure‑Tokens gebaut sind. Importiere das Stylesheet und versieh dein Markup mit Klassen — kein Framework erforderlich.

```ts
import "@pantoken/components/components.css";
```

> [!HINWEIS]
> Bevorzugst du benutzerdefinierte Elemente? `@pantoken/web-components` verpackt dieselben Stile als `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` und mehr — siehe die
> [Paketübersicht](/guide/packages).

## Konventionen

Die CSS‑Konventionen in diesem Paket basieren auf einer modifizierten Version von [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifier sind **Schlüssel‑Wert** — `-<prop>-<val>`, ausgerichtet an InstUI‑Prop‑Namen — sodass sie selbsterklärend sind: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolesche Props sind nur der Prop‑Name; ihre Präsenz bedeutet `true` (`-has-shadow`, `-clickable`); ein standardmäßig aktiviertes Boolean, das ausgeschaltet wird, invertiert (`-without-background`, `-without-border`). Größen akzeptieren sowohl kurze als auch lange Schreibweisen (`-size-sm` = `-size-small`). Weicht ein Name von InstUI ab, funktioniert die InstUI‑semantische Klasse weiterhin, ist aber veraltet (z. B. `-variant-info` → verwende `-color-info`).

### Beispiel

Instructure UI React Komponente:

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

Für InstUIs `timeout` Prop setze die einheitenlose `--timeout` Custom Property in Millisekunden und lade die Alert‑Interaktion. Ein positiver Wert plant das automatische Schließen; `0` (der Standard) lässt das Alert stehen. Füge die `transition` Utility's `instui-transition -fade-entered` Klassen für InstUIs Fade hinzu; lasse sie weg für sofortiges Entfernen. Die Interaktion steuert den `-fade-exiting` Zustand und feuert vor dem Entfernen ein abbrechbares, aufsteigendes `dismiss` Event, sodass eine Anwendung `preventDefault()` aufrufen kann, um das Alert montiert zu lassen.

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

Progress‑Bars akzeptieren beliebige Skalen über `--min` (`0` standardmäßig), `--value` und `--max`
(`100` standardmäßig), mit veralteten Aliasen `--value-now` und `--value-max`. Füge `-should-animate`
hinzu, um InstUIs halbe‑Sekunden‑Transition anzuwenden, wenn sich ein Wert ändert. `.value` steht neben `.bar` als
Kind des Roots; füge `-render-value-inside` hinzu, um es stattdessen über der Schiene am Anfang auszurichten (style es für Lesbarkeit gegen die Meter‑Farbe). Verwende ein natives `<progress>` für einen nullbasierten Bereich und `<meter>` wenn das Minimum nicht‑null ist; die Web‑Komponenten wählen automatisch zwischen ihnen anhand ihres `min` Attributes. InstUI kennt keinen indeterminierten Zustand; ein `<progress>`
ohne sein `value` Attribut ist eine pantoken‑eigene Annahme: `progress-bar` animiert `.bar` als
verschiebendes Segment und `progress-circle` dreht seinen Ring in einem festen Bogen, beide verbergen `.value`.

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

Progress‑Kreise akzeptieren dieselben beliebigen Skalen über `--min`, `--value` und `--max`.
`--value-now` und `--value-max` bleiben als veraltete funktionale Aliase bestehen. Füge `-should-animate` hinzu und
lade das Focused Interaction Bundle, um InstUIs Mount‑Animation zu reproduzieren; `--animation-delay` ist eine
einheitenlose Millisekunden‑Verzögerung. Die veralteten Schreibweisen `-should-animate-on-mount` und
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

## Klassen‑Präfix

Jede Klasse ist standardmäßig mit `instui-` namespaced. Baue ein Stylesheet mit eigenem Präfix — oder ohne — indem du
`prefix` an jeden Builder übergibst. Jeder falsy Wert (`null`, `undefined`, `""` oder Weglassen) entfernt
das Präfix vollständig, sodass du `class="heading -level-h1"` statt `class="instui-heading -level-h1"` authoren kannst:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Die mit Bindestrich vorangestellten Modifier (`.-color-secondary`, `.-level-h1`) bleiben in beiden Fällen unverändert. Die
durch das Paket gelieferten Stylesheets behalten das `instui` Präfix.

## Basis

`base.css` ist ein optionaler Reset, der globale Dokument‑Standards aus den Tokens setzt: `box-sizing`, ein
`body` Reset, die Seitenoberfläche, Basistexfarbe und Schrift, `color-scheme` (damit `light-dark()` Tokens
und native Controls dem Theme folgen), und einen Basis‑Link. Lade es einmal, bevor die Komponenten‑ und Prose‑Stylesheets geladen werden, wenn pantoken die Seite besitzt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Lasse es weg, wenn du Komponenten in ein Host‑System einbettest, das bereits seine eigenen `html` und `body` themt —
der Reset malt die Seitenoberfläche, also willst du nicht, dass er mit dem Host konkurriert. Alles, was gesetzt wird, verwendet
niedrigspezifische `:where()` Selektoren, sodass deine eigenen Regeln immer gewinnen.

`base.css` _wendet_ die Brand‑Schrift an (`font-family: var(--instui-font-family-base)`, mit System‑Fallbacks); um sie _zu laden_, importiere die optionale `fonts.css` — `@font-face` Regeln für Atkinson Hyperlegible
Next, die auf die im Paket enthaltenen WOFF2s verweisen. Sie ist getrennt, weil die Schriften ~350 kB groß sind und
Self‑Hosting von Fonts eine bewusste Entscheidung ist.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Screen‑Reader‑Inhalt

<p>Nach diesem Satz folgt eine versteckte Nachricht.<span class="instui-screen-reader-content">Nur Screenreader geben das aus.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` versteckt ein Element visuell, hält es aber im Accessibility‑Tree —
für Labels und Statustexte, die assistive Technologien lesen sollen, das Design jedoch nicht anzeigen darf.

## Utilities

`utilities.css` ist eine optionale Schicht von bereichsübergreifenden Klassen: ein `View` Primitive, Abstand auf der Token‑Skala und semantische Farb‑Overrides. Im Gegensatz zu den Komponenten‑`-modifier` Klassen verwenden diese einen **Doppel‑Bindestrich** (`--mod`), damit sie niemals mit den Modifier‑Namen einer Komponente kollidieren, und sie gelten für jedes Element — direkt oder zusammengesetzt auf einer Komponente.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent‑blue Oberfläche mit On‑Color Text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Zentriert mit mx‑auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` ist InstUIs `View`. Es ist die Basis, auf die du Abstände und Farben layerst, und es
trägt Schlüssel‑Wert Modifier für seine eigenen visuellen Props, sodass du nicht auf Utilities zurückgreifen musst:
`-background-*` (seine Oberflächen), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, und `-cursor-*` — dies sind `view`'s eigene
einfachen Bindestrich‑Modifier, unabhängig von den unten stehenden Doppel‑Bindestrich‑Utilities. Freiwert‑Props
(Breite/Höhe/Inset) bleiben Inline‑Styles; `margin`/`padding` verwenden die Spacing‑Utilities.

**Spacing** — Einzelseitige Klassen auf der Spacing‑Skala. Lies sie als `{m|p}{side}-{step}`: `m` für
Margin oder `p` für Padding (oder die vollen Wörter `margin`/`padding`), eine optionale logische Seite, dann eine Stufe. Also sind `.--m-lg` und `.--margin-lg` gleich, ebenso `.--pt-md` und `.--paddingt-md`.

- Seiten: none (alle), `t`/`b` (Block‑Start/Ende), `s`/`e` (Inline‑Start/Ende), `x`/`y` (Inline/Block‑Achse). Logische Seiten bleiben in Rechts‑nach‑Links Layouts korrekt.
- Schritte: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` nur für Margin.

Kombiniere sie für InstUIs `margin="small auto large"` Kurzform:
`class="--mt-sm --mx-auto --mb-lg"`.

**Farbe** — Semantische Overrides, die auf der Palette bleiben: `.--bg-<name>` (Hintergrund),
`.--text-<name>` (Textfarbe) und `.--border-<name>` (Rahmenfarbe). Jede `<name>` ist ein
semantischer Farbtoken — die Intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus die `accent-*` Palette (`accent-blue`, `accent-green`, und so weiter). Ein Name existiert nur, wenn das Token in dieser Familie vorhanden ist, daher ist `text-brand` keine Klasse — Text hat kein Brand‑Token. Es gibt keinen Weg zu einem Primitive oder einem beliebigen Hex‑Wert, und jedes Override folgt dem Theme.

**Token‑Familien** — Jede „ein Token, eine Eigenschaft“ Familie bekommt eine Klasse pro Token, benannt nach dem Token. Kombiniere sie frei:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (und `-depth1`…`-card`) → `box-shadow`

Jede setzt nur ihre eine Eigenschaft, also benötigen `border-width`/`border-radius` eine `border-*` Farbe und einen Rahmenstil, um wirklich einen Rand zu zeichnen. Diese verwenden den vollständigen Token‑Namen (`.--border-radius-md`), während die Farb‑ und Abstands‑Helfer oben kurze Aliase (`.--bg-brand`, `.--mt-lg`) verwenden — die Aliase sind ergonomische Shortcuts; die Token‑Klassen sind wörtlich und erschöpfend.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) und `.--text-align-<value>` (`start`, `center`, `end`, `justify`) decken InstUIs
bereichsübergreifende `display` und `textAlign` Props (View, Button, Metric, Tabs, …) als komponierbare Klassen ab — diese sind also keine komponentenspezifischen Modifier.

Jede Doppel‑Bindestrich‑Klasse gewinnt deterministisch in der Kaskade über einen gleichnamigen Einzel‑Bindestrich Komponenten‑Modifier, unabhängig von der Reihenfolge der Stylesheet‑Importe — siehe [Authoring conventions](/conventions/authoring)
für den Mechanismus.

Alles hier ist reines CSS, angetrieben von den `--instui-*` Tokens, sodass es InstUI durch die Token‑Ebene folgt. Siehe das [API‑Referenz](/api/) für `componentsCss` und die pro‑Komponenten Builder.

## Overlays: Dialog und Popover

Die Overlay‑Komponenten nutzen native Plattform‑Primitiven, sodass sie mit wenig oder keinem JavaScript zugänglich funktionieren.

**Modal** — setze `.instui-modal` auf ein natives `<dialog>`. Es erhält Fokus‑Trapping, `Esc`‑zum‑Schließen und ein
`::backdrop` kostenlos; der Hintergrund wird mit demselben `--instui-component-mask-background-color`
Token wie `.instui-mask` abgedimmt (füge `-blur` hinzu, um ihn zu frostieren). Öffne und schließe es mit Invoker‑Commands — kein Script:

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

**Context view / Popover** — setze `.instui-context-view` auf ein `[popover]` Element und toggle es mit
`popovertarget`. Es liegt in der obersten Schicht und schließt bei Klick außen oder `Esc` — wiederum ohne Script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer Layout** — setze `.instui-drawer-layout` auf eine Layout‑Root mit `.tray` und `.content`
Kindern. Füge das `open` Attribut (oder `-open`) hinzu, um das Tray zu öffnen, und verwende `placement="end"`
(oder `-placement-end`), um es an die Inline‑Ende Seite anzudocken — die Platzierung wird über logische
`inset-inline-*`/`flex-direction` Eigenschaften aufgelöst, sodass es sich unter `dir="rtl"` automatisch spiegelt, ohne zusätzliche Regeln. Das Focused Interaction Bundle fügt Invoker‑Command‑Routing hinzu und toggelt Overlay‑Modus
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

**Mask** — `.instui-mask` bleibt für in‑flow Overlays (ein Spinner über einer Karte); das `::backdrop` eines Modals deckt den Modal‑Fall ab.

Beide Muster sind auch als verhaltensgesteuerte Custom Elements in `@pantoken/web-components` verfügbar:
`<instui-modal open>` (ein `<dialog>` gesteuert durch sein `open` Attribut) und `<instui-context-view>` (ein
natives Popover).

Browser‑Support: die Popover‑API und `popovertarget` sind Baseline 2024; Invoker‑Commands
(`command`/`commandfor`) sind Baseline 2025, daher sollten in älteren Browsern die Buttons mit `dialog.showModal()`
als einzeiliger Fallback verbunden werden. Das Positionieren eines Popovers neben seinem Trigger verwendet CSS Anchor Positioning, wo unterstützt (Chromium); andernorts zentriert es in der obersten Schicht.

## Formulare

**FormField** — `.instui-form-field` ist ein CSS‑Grid Wrapper, der ein Label, das Control und beliebige
Nachrichten anordnet. Setze es auf ein `<label>`, damit das Label nativ mit seinem Control assoziiert wird. Es hat drei Grid‑Areas — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (Standard) stapelt die Bereiche; `-layout-inline` platziert das Label neben dem Control (anpassbar mit `-label-align-{start,end}` und `-v-align-{top,middle,bottom}`). `-readonly` färbt das Label um.

Das **Pflicht‑Sternchen** erscheint, wenn das Feld erforderlich ist durch _entweder_ die `-required` Klasse _oder_ ein
natives `required` Control darin — du kannst also einfach `required` auf das Input setzen und das Zeichen erscheint.
Es ist dekorativ (ein `::after` auf dem Label, aus dem Accessibility‑Tree); kombiniere es mit einem Hinweis wie
„Felder mit \* sind erforderlich“, sofern das Formular nicht selbsterklärend ist.

**FormFieldGroup** — `.instui-form-field-group` gruppiert verwandte Felder in einem `<fieldset>` mit einer
`<legend>` Beschreibung. Es ist reine Layout‑Logik (keine dedizierten Tokens): Standard stapelt die Felder;
`-layout-columns` / `-layout-inline` fließen sie in responsive Spalten, mit `-row-spacing-*` /
`-col-spacing-*` und `-v-align-*` zur Feinabstimmung des Grids.

**RadioInputGroup** — `.instui-radio-input-group` ist dieselbe `<fieldset>`/`<legend>` Gruppierung,
spezialisiert für Radios. Da die Kind‑Radios ein `name` teilen, ist die Auswahl nativ einstimmig —
so verhält sich eine Reihe von Toggle‑Buttons wie eine einzige Steuerung, nicht wie lose Buttons. `-variant-simple` (Standard) legt
Standard‑Radios aus (`-layout-columns`/`-inline` fließen sie in eine Reihe); `-variant-toggle` verbindet die
Kind‑`.instui-radio.-variant-toggle` Buttons zu einer einzigen segmentierten Steuerung (zusammengezogene Ränder,
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

**Nachrichten** — `.instui-form-field-messages` ist der Container; jede `.instui-form-field-message` nimmt einen
`-type-*`: `-type-hint` (grau, Standard), `-type-error` (roter Text + Kreis‑Warn‑Glyph), `-type-success`
(grüner Text + Kreis‑Check‑Glyph) und `-type-screenreader-only` (visuell abgeschnitten, wird aber noch angesagt).
Die Glyphen malen in `currentColor`, sodass sie immer zur Nachrichtenfarbe passen. `-type-new-error` ist ein
veralteter Alias von `-type-error`. Verbinde den Container mit der Kontrolle über `aria-describedby`, und setze
`aria-invalid` auf die Kontrolle, wenn ein Fehler vorliegt.

Innerhalb eines FormField folgt eine `-type-error` Nachricht der Client‑seitigen Validierung: sie bleibt verborgen, bis das
Feld‑Control `:user-invalid` ist (nativ, nachdem der Benutzer interagiert hat) — oder du zwingst sie mit `-invalid`
auf dem `.instui-form-field` (für einen Server‑seitigen Fehler). Ein eigenständiges `.instui-form-field-messages` (nicht in
einem Feld) bleibt unberührt. Der Fokusring der Kontrolle folgt demselben Muster: Gefahr bei `:user-invalid`/`-invalid`,
Erfolg bei `-success`.

**Text‑Controls** — `.instui-text-input` (nativer `<input>`), `.instui-text-area` (nativer `<textarea>`,
größenverstellbar) und `.instui-simple-select` (nativer `<select>` mit Caret) teilen ein einheitliches Aussehen und dieselben
Zustände: `-invalid` (Fehler‑Rahmen), `-success` (Erfolgs‑Rahmen), `-readonly`, native `:disabled`, und
`-size-{sm,md,lg}`. Für ein führendes/trailerndes Icon (InstUIs `renderBeforeInput`/`renderAfterInput`), umschließe
das Input mit `.instui-input-group` und füge einen `.before`/`.after` Slot hinzu (ein `-icon-*` Glyph); `-should-not-wrap`
hält alles in einer Zeile. `.instui-number-input` ist diese Fassade plus eine `.arrows` +/- Spinner‑Spalte (natives
`type="number"`; verbinde die Buttons mit `stepUp()`/`stepDown()`). `.instui-range-input` ist ein gestyltes
`input[type="range"]`, dessen Wert in einer `.instui-range-input-value` inversen Blase gerendert wird. Für ein reichhaltiges
Combobox mit Listbox‑Popover greife zu `@instructure/ui` — diese Bibliothek deckt die nativen Controls ab.

**Gestyltes Select‑Dropdown (experimentell)** — ein optionales `select.css` upgraded dasselbe
`.instui-simple-select` Element: es stylt das geöffnete Dropdown (Panel und jede Option, mit Hover‑ und
Selected‑Zuständen) mittels des CSS Customizable Select Modells.

> [!WARNUNG]
> `select.css` baut auf `appearance: base-select` / `::picker(select)` auf, welche **experimentell** sind
> (Chrome 135+, noch nicht Baseline). Es wird als separates optionales Sheet ausgeliefert und jede Regel ist hinter `@supports (appearance: base-select)` gegated, sodass es in nicht unterstützten Browsern nichts bewirkt — das
> `.instui-simple-select` Control bleibt einfach das native Select. Lade es nur, wenn du das
> verbesserte Dropdown möchtest und die eingeschränkte Unterstützung akzeptierst.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
