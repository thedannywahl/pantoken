# Componenti

`@pantoken/components` fornisce stili per componenti basati su classi costruiti dai token Instructure. Importa il foglio di stile e applicalo al markup — nessun framework richiesto.

```ts
import "@pantoken/components/components.css";
```

> [!NOTA]
> Preferisci elementi personalizzati? `@pantoken/web-components` avvolge questi stessi stili come `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, e altri — vedi la
> [mappa dei pacchetti](/guide/packages).

## Convenzioni

Le convenzioni CSS in questo pacchetto si basano su una versione modificata di [RSCSS](https://ricostacruz.com/rscss/index.html).

I modificatori sono **chiave-valore** — `-<prop>-<val>`, allineati ai nomi delle proprietà InstUI — quindi si leggono da soli: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Le proprietà booleane sono il solo nome della proprietà, dove la presenza significa `true` (`-has-shadow`, `-clickable`); una booleano con default attivo disattivato inverte (`-without-background`, `-without-border`). Le dimensioni accettano sia forme corte che lunghe
(`-size-sm` = `-size-small`). Quando un nome devia da InstUI, la classe con la semantica InstUI continua a funzionare
ma è deprecata (es. `-variant-info` → usa `-color-info`).

### Esempio

Componente React di Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

componenti pantoken:

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

Per la proprietà `timeout` di InstUI, imposta la proprietà personalizzata unitless `--timeout` in millisecondi e carica
l'interaction Alert. Un valore positivo programma la chiusura; `0` (il valore predefinito) lascia l'alert al suo posto. Aggiungi le classi `instui-transition -fade-entered` dell'utilità `transition` per la dissolvenza di InstUI; omettile per la rimozione immediata. L'interaction controlla lo stato `-fade-exiting` e genera un evento cancellabile e in bubbling `dismiss` prima della rimozione, così un'app può chiamare `preventDefault()` per mantenere l'alert montato.

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

Le barre di progresso accettano scale arbitrarie tramite `--min` (`0` per default), `--value`, e `--max`
(`100` per default), con alias deprecati `--value-now` e `--value-max`. Aggiungi `-should-animate`
per applicare la transizione di mezzo secondo di InstUI ogni volta che un valore cambia. `.value` sta accanto a `.bar` come
figlio della radice; aggiungi `-render-value-inside` per renderlo sopra la traccia, allineato al suo inizio,
invece (stilalo per la leggibilità rispetto al colore del metro). Usa un `<progress>` nativo per un
intervallo con base zero e `<meter>` quando il minimo è non-zero; i web component selezionano automaticamente tra essi
dall'attributo `min`. InstUI non ha stato indeterminato, quindi un `<progress>`
privo dell'attributo `value` è un'approssimazione pantoken: `progress-bar` anima `.bar` come un
segmento scorrevole e `progress-circle` fa ruotare il suo anello a un arco fisso, nascondendo entrambi `.value`.

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

I cerchi di progresso accettano le stesse scale arbitrarie tramite `--min`, `--value`, e `--max`.
`--value-now` e `--value-max` restano alias funzionali deprecati. Aggiungi `-should-animate` e
carica il bundle di interaction per il focus per riprodurre l'animazione di mount di InstUI; `--animation-delay` è un
ritardo in millisecondi unitless. Le grafie deprecate `-should-animate-on-mount` e
`-shold-animate-on-mount` rimangono alias funzionali.

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

## Prefisso delle classi

Ogni classe è namespaced con `instui-` per default. Costruisci un foglio di stile con il tuo prefisso — o senza — passando
`prefix` a qualsiasi builder. Qualsiasi valore falsy (`null`, `undefined`, `""`, o omettendolo) rimuove il
prefisso completamente, così puoi scrivere `class="heading -level-h1"` invece di `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

I modificatori prefissati da trattino (`.-color-secondary`, `.-level-h1`) restano invariati in ogni caso. I
foglio di stile forniti dal pacchetto mantengono il prefisso `instui`.

## Base

`base.css` è un reset opzionale che imposta default globali del documento dai token: `box-sizing`, un
reset `body`, la superficie della pagina, il colore e il font di base del testo, `color-scheme` (così i token
`light-dark()` e i controlli nativi seguono il tema), e un link di base. Caricalo una sola volta, prima dei fogli dei componenti e della prosa,
quando pantoken possiede la pagina.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Saltalo quando stai incorporando componenti in un host che già tema il proprio `html` e `body` —
il reset dipinge la superficie della pagina, quindi non vuoi che si confligga con l'host. Tutto ciò che imposta usa
selettori `:where()` a bassa specificità, quindi le tue regole prevalgono sempre.

`base.css` applica il font del brand (`font-family: var(--instui-font-family-base)`, con fallback di sistema); per caricarlo, importa l'opzionale `fonts.css` — regole `@font-face` per Atkinson Hyperlegible
Next, puntando ai woff2 inclusi nel pacchetto. È separato perché le famiglie pesano ~350 kB e
l'hosting self-hosted dei font è una scelta deliberata.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contenuto per screen reader

<p>C'è un messaggio nascosto dopo questa frase.<span class="instui-screen-reader-content">Solo gli screen reader lo annunciano.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` nasconde visivamente un elemento mantenendolo nell'albero di accessibilità
— per etichette e testo di stato che la tecnologia assistiva dovrebbe leggere ma il design non deve mostrare.

## Utility

`utilities.css` è uno strato opzionale di classi trasversali: un primitivo `View`, spaziatura sulla scala dei token,
e override semantici di colore. A differenza delle classi dei componenti `-modifier`, queste usano un **doppio
trattino** (`--mod`) così non entrano mai in collisione con i nomi dei modificatori di un componente, e si applicano a qualsiasi
elemento — semplice, o composto su un componente.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Superficie accent-blue con testo on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centrato con mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` è il `View` di InstUI. È la base su cui stratificare spaziatura e colore, e
porta modificatori chiave-valore per le proprie proprietà visuali così non devi ricorrere alle utility:
`-background-*` (le sue superfici), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, e `-cursor-*` — questi sono i modificatori a singolo trattino di `view`,
non correlati alle utility a doppio trattino qui sotto. Le proprietà a valore libero
(width/height/inset) restano inline styles; `margin`/`padding` usano le utility di spaziatura.

**Spaziatura** — classi per lato sulla scala di spaziatura. Leggile come `{m|p}{side}-{step}`: `m` per
margin o `p` per padding (o le parole intere `margin`/`padding`), un lato logico opzionale, poi uno step. Quindi `.--m-lg` e `.--margin-lg` sono identiche, così come `.--pt-md` e `.--paddingt-md`.

- Lati: none (tutti), `t`/`b` (inizio/fine blocco), `s`/`e` (inizio/fine inline), `x`/`y` (asse inline/block). I lati logici restano corretti in layout da destra a sinistra.
- Passi: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, più `auto` solo per margin.

Componili per lo shorthand `margin="small auto large"` di InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Colore** — override semantici che restano nella palette: `.--bg-<name>` (sfondo),
`.--text-<name>` (colore del testo), e `.--border-<name>` (colore del bordo). Ogni `<name>` è un
token di colore semantico — le intenzioni (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) più la palette `accent-*` (`accent-blue`, `accent-green`, e così via). Un nome esiste solo se il token esiste in quella famiglia, quindi `text-brand` non è una classe — il testo non ha
token del brand. Non c'è modo di raggiungere un primitivo o un hex arbitrario, e ogni override segue
il tema.

**Famiglie di token** — ogni famiglia "un token, una proprietà" ottiene una classe per token, nominata come il
token. Componile liberamente:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (e `-depth1`…`-card`) → `box-shadow`

Ognuna imposta solo la sua proprietà singola, quindi `border-width`/`border-radius` hanno bisogno di un colore `border-*` e di uno stile di bordo
per disegnare effettivamente un bordo. Queste usano il nome completo del token (`.--border-radius-md`), mentre gli helper di colore e spaziatura sopra usano alias brevi (`.--bg-brand`, `.--mt-lg`) — gli alias
sono scorciatoie ergonomiche; le classi token sono letterali ed esaustive.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) e `.--text-align-<value>` (`start`, `center`, `end`, `justify`) coprono le
proprietà trasversali `display` e `textAlign` di InstUI (View, Button, Metric, Tabs, …) come classi componibili —
quindi quelle non sono modificatori per componente.

Ogni classe a doppio trattino vince deterministically nella cascade su un modificatore a singolo trattino con lo stesso nome, indipendentemente dall'ordine di import dei fogli di stile — vedi le [Convenzioni di authoring](/conventions/authoring)
per il meccanismo.

Tutto qui è puro CSS guidato dai token `--instui-*`, quindi segue InstUI attraverso lo strato dei token. Vedi la [API reference](/api/) per `componentsCss` e i builder per componente.

## Overlay: dialog e popover

I componenti overlay sfruttano i primitivi nativi della piattaforma, quindi si comportano in modo accessibile con poco o nessun
JavaScript.

**Modal** — applica `.instui-modal` a un elemento nativo `<dialog>`. Ottiene focus trapping, chiusura con `Esc`, e un
`::backdrop` gratuitamente; il backdrop è scurito con lo stesso token `--instui-component-mask-background-color`
di `.instui-mask` (aggiungi `-blur` per sbiancarlo). Aprilo e chiudilo con comandi invoker — nessuno script:

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

**Context view / popover** — applica `.instui-context-view` a un elemento `[popover]` e alternalo con
`popovertarget`. Sta sul livello superiore e si chiude con click esterno o `Esc`, ancora una volta senza script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — applica `.instui-drawer-layout` a una root di layout con figli `.tray` e `.content`.
Aggiungi l'attributo `open` (o `-open`) per rivelare il tray, e usa `placement="end"`
(o `-placement-end`) per ancorarlo al lato inline-end — il posizionamento si risolve attraverso proprietà logiche
`inset-inline-*`/`flex-direction`, quindi si capovolge automaticamente sotto `dir="rtl"` senza
regole extra. Il bundle interaction per il focus aggiunge il routing dei comandi Invoker e alterna la modalità overlay
(`should-overlay-tray`) quando la larghezza supera `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, poi `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` resta per overlay in-flow (uno spinner sopra una card); il `::backdrop`
di un modal copre il caso modal.

Entrambi i pattern sono anche avvolti come elementi personalizzati comportamentali in `@pantoken/web-components`:
`<instui-modal open>` (un `<dialog>` guidato dal suo attributo `open`) e `<instui-context-view>` (un
popover nativo).

Supporto browser: l'API popover e `popovertarget` sono Baseline 2024; i comandi invoker
(`command`/`commandfor`) sono Baseline 2025, quindi su browser più vecchi collega i pulsanti a `dialog.showModal()`
come fallback in una riga. Il posizionamento del popover accanto al trigger usa il posizionamento anchor CSS dove
supportato (Chromium); altrove si centra nel layer superiore.

## Formulari

**FormField** — `.instui-form-field` è un wrapper CSS-Grid che dispone un'etichetta, il controllo, e eventuali
messaggi. Applicalo a un `<label>` così l'etichetta si associa nativamente al controllo. Ha tre aree di grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) impila le aree; `-layout-inline` mette l'etichetta accanto al controllo (regola
con `-label-align-{start,end}` e `-v-align-{top,middle,bottom}`). `-readonly` ricolora l'etichetta.

L'**asterisco required** appare quando il campo è richiesto da _o_ la classe `-required` _o_ da un
controllo nativo `required` al suo interno — quindi puoi semplicemente impostare `required` sull'input e il segno apparirà.
È decorativo (un `::after` sull'etichetta, fuori dall'albero di accessibilità); abbinalo a una nota come
"i campi contrassegnati con \* sono obbligatori" a meno che il form non sia autosufficiente.

**FormFieldGroup** — `.instui-form-field-group` raggruppa campi correlati in un `<fieldset>` con una
descrizione `<legend>`. È puro layout (nessun token dedicato): per default accatasta i campi;
`-layout-columns` / `-layout-inline` li dispongono in colonne responsive, con `-row-spacing-*` /
`-col-spacing-*` e `-v-align-*` per regolare la griglia.

**RadioInputGroup** — `.instui-radio-input-group` è lo stesso raggruppamento `<fieldset>`/`<legend>`,
specializzato per radio. Poiché le radio figlie condividono un `name`, la selezione è nativamente a scelta singola —
quindi un set di toggle button si comporta come un controllo unico, non come pulsanti indipendenti. `-variant-simple` (default) dispone
le radio standard (`-layout-columns`/`-inline` le trasformano in una riga); `-variant-toggle` connette i
bottoni `.instui-radio.-variant-toggle` figli in un unico controllo segmentato (bordi collassati,
estremità arrotondate):

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

**Messaggi** — `.instui-form-field-messages` è il contenitore; ogni `.instui-form-field-message` prende un
`-type-*`: `-type-hint` (grigio, default), `-type-error` (testo rosso + glifo cerchio-alert), `-type-success`
(testo verde + glifo cerchio-check), e `-type-screenreader-only` (visivamente nascosto, ancora annunciato).
I glifi si dipingono in `currentColor`, quindi corrispondono sempre al colore del messaggio. `-type-new-error` è un
alias deprecato di `-type-error`. Collega il contenitore al controllo con `aria-describedby`, e imposta
`aria-invalid` sul controllo quando c'è un errore.

All'interno di un FormField, un messaggio `-type-error` segue la validazione lato client: resta nascosto finché il
controllo del campo non è `:user-invalid` (nativo, dopo l'interazione dell'utente) — o lo mostri forzando con `-invalid`
sul `.instui-form-field` (per un errore server-side). Un `.instui-form-field-messages` standalone (non in
un field) è non influenzato. L'anello di focus del controllo segue: pericolo quando `:user-invalid`/`-invalid`,
successo su `-success`.

**Controlli di testo** — `.instui-text-input` (nativo `<input>`), `.instui-text-area` (nativo `<textarea>`,
ridimensionabile), e `.instui-simple-select` (nativo `<select>` con caret) condividono un aspetto e gli stessi
stati: `-invalid` (bordo di errore), `-success` (bordo di successo), `-readonly`, native `:disabled`, e
`-size-{sm,md,lg}`. Per un'icona leading/trailing (le `renderBeforeInput`/`renderAfterInput` di InstUI), avvolgi
l'input in `.instui-input-group` e aggiungi uno slot `.before`/`.after` (un glifo `-icon-*`); `-should-not-wrap`
lo mantiene su una sola riga. `.instui-number-input` è quella facciata più una colonna spinner +/- `.arrows` (nativo
`type="number"`; collega i pulsanti a `stepUp()`/`stepDown()`). `.instui-range-input` è un
`input[type="range"]` stilizzato il cui valore viene renderizzato in una bolla inversa `.instui-range-input-value`. Per una combobox ricca con un listbox popover, usa `@instructure/ui` — questa libreria copre i controlli nativi.

**Select stilizzato (sperimentale)** — un opzionale `select.css` aggiorna lo _stesso_
elemento `.instui-simple-select`: stila il dropdown aperto (il pannello e ogni opzione, con hover e
stati selezionati) usando il modello CSS Customizable Select.

> [!ATTENZIONE]
> `select.css` si basa su `appearance: base-select` / `::picker(select)`, che è **sperimentale**
> (Chrome 135+, non ancora Baseline). È fornito come foglio opzionale separato e ogni regola è condizionata
> da `@supports (appearance: base-select)`, quindi non fa nulla nei browser non supportati — il controllo
> `.instui-simple-select` rimane il select nativo semplice. Caricalo solo se vuoi il
> dropdown migliorato e accetti il supporto limitato.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
