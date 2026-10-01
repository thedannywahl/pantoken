# Plugin

Un plugin pantoken estende l'output di token o CSS senza forkare un pacchetto. Se ne crea uno con
`definePlugin` da `@pantoken/plugin-kit`, quindi lo si passa a `buildTokens` o `toCss`.

## Creare un plugin

Fornire a `definePlugin` gli hook che si implementano. Restituisce un plugin normale, marchiato con le
capabilità dedotte da quegli hook. Un plugin può estendere l'IR (`tokens`, `icons`), l'output CSS
(`css`), o entrambi.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registrazione consapevole delle capacità

`buildTokens` e `toCss` eseguono `checkPlugins` sui plugin che passi. Avvisa — non lancia mai eccezioni —
quando un plugin non ha uno hook corrispondente per la fase in cui è registrato, quindi un plugin solo per token passato
a `toCss` viene saltato con una nota anziché restare silenziosamente inattivo.

## Comporre plugin

Basarsi su un altro plugin con `extendPlugin`, oppure combinare peer con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Gli hook della stessa fase si compongono: `tokens` esegue prima il base poi l'aggiunta, `css` unisce i due
contributi, e `icons` esegue entrambi.

## Validare l'output del tuo plugin

Eseguire i controlli di drift condivisi da `@pantoken/utils` sull'output del plugin nei suoi test, in modo che un
errore di battitura o un token rinominato fallisca rapidamente e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## I plugin inclusi

- `@pantoken/plugin-simple-icons` — icone brand da simple-icons, registrate come token icon.
- `@pantoken/plugin-lucide-lab` — icone Lucide Lab, registrate come token immagine `--instui-icon-*`.
- `@pantoken/plugin-logos` — loghi prodotto Instructure come SVG, data URI, e token immagine `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (non un plugin pantoken) che rimuove
  le custom property non usate da uno stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrandizza una pagina impostando un attributo
  (`data-pantoken-color`) su una delle 13 palette, o su `custom` per qualsiasi hex di brand. Vedi
  [Colori del tema](#theme-colors).
- `@pantoken/plugin-custom-components` — controlli personalizzati basati su token inclusi SegmentedControl
  e SkeletonLoader.

### Controllo segmentato

Usare un controllo segmentato per due a cinque viste o filtri correlati. Ogni opzione è una radio nativa etichettata nello stesso gruppo; segnare una come selezionata inizialmente. Usare tab o un dropdown se le opzioni non entrano comodamente, e usare gruppi di pulsanti per azioni anziché per scelte. Lo stile `-size-md` è il
predefinito, con `-size-sm` e `-size-lg` per contesti più compatti o più evidenti.

Importare `@pantoken/plugin-custom-components/segmented-control.css` per il controllo e i suoi pulsanti di overflow.
Usare una classe `-icon-*` su un'etichetta di segmento quando il segmento richiede un glifo; l'helper di interazione
promuove anche una classe `-icon-*` dall'input nativo al pittore dell'etichetta.
Dare al fieldset un `aria-label` descrittivo o una legenda visibile. L'helper preserva l'annuncio radio nativo, aggiunge la navigazione da tastiera, e opzionalmente rivela un segmento tagliato per pressione di freccia.
Usare controlli logici di inizio/fine e etichette di pulsanti accessibili in entrambe le direzioni:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Importare `@pantoken/interactions/segmented-control.iife.js` per la registrazione quando il DOM è pronto, oppure chiamare
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` da `@pantoken/interactions`
e chiamare `cleanup()` quando lo si rimuove. Il CSS e le scelte radio native funzionano senza JS; le frecce di overflow richiedono il comportamento. L'elemento selezionato usa l'ombra di design a due strati dai colori semantici di drop-shadow; è un'ombra per elemento-attivo distinta piuttosto che un composito
`--instui-elevation-*` esistente. I pulsanti di overflow usano i token del componente elevation3 upstream
attraverso `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Il sottopercorso `skeleton-loader.css` stilizza una forma decorativa Text, Avatar, o Image. Text accetta
`-size-xxs` tramite `-size-xxl`; Avatar e Image sono di dimensione media. Ogni opzionale `.skeleton-row`
aggiunge una riga di testo senza cambiare la dimensione. Lo shimmer CSS si ferma dopo tre sweep di 1.5 secondi e
rimane statico quando l'utente preferisce ridotta animazione. Funziona prima che JavaScript venga caricato.

Posizionare le forme solo dove apparirà contenuto dipendente dalla query, non su navigazione,
filtri, titoli o controlli già noti al server. Uno skeleton non è un indicatore di progresso né uno stato di attività di azione. Mantenere
il contenuto esistente visibile durante i refresh in background; usare uno spinner o lo stato busy di un pulsante per le azioni.

L'applicazione parent possiede i markup loading, loaded, empty, ed error. Fornire una regione di stato vuota per pagina e un alert vuoto separato nell'HTML server, entrambi **fuori** dalla regione di contenuto busy:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Chiamare il comportamento a livello parent quando lo stato della richiesta cambia. Aggiorna `aria-busy` e i due
annunci preesistenti, ma non sostituisce mai il contenuto né sposta il focus:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Se si usa il bundle di interazioni per componente invece dell'import diretto, dispatchare un
evento `pantoken:skeleton-state` sull'elemento `[data-skeleton-region]` con
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Ritardare la visualizzazione dei placeholder di 200–500ms per richieste veloci; il comportamento ritarda indipendentemente l'annuncio di loading di 400ms. Nei caricamenti passivi della pagina, lasciare il focus dove si trova. Spostare il focus su un risultato appena caricato solo quando l'azione dell'utente lo ha richiesto. Il nodo di stato annuncia risultati e stati vuoti; il nodo alert annuncia i fallimenti. Non combinare `aria-busy`, `role="status"`, e
`role="alert"` su un unico elemento.

Il registro di Lucide Lab può essere caricato lazy, quindi passato allo hook sincrono dei token:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Alcune cose che prima erano plugin ora vengono spedite in `@pantoken/components`, dato che molti componenti le richiedono out-of-the-box: ombre di elevazione (`--instui-elevation-*`, in `components.css`), l'anello focus-outline
(in `base.css` — ogni elemento focalizzabile lo riceve quando pantoken possiede la pagina), e i font brand di Instructure (Atkinson Hyperlegible Next: `base.css` applica `--instui-font-family-base`; l'opzionale
`@pantoken/components/fonts.css` carica i woff2 `@font-face`).

## Colori del tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emette un blocco `[data-pantoken-color="…"]` per ogni palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Ogni blocco punta le primitive di brand (`--instui-primitive-color-navy-*` e `-blue-*`)
alla palette scelta. Ridetermina inoltre le superfici di brand che upstream avevano appiattito in hex letterali,
mantenendo la loro alpha precombinata tramite `color-mix()`. I colori semantici di stato, gli accenti blu espliciti, e
le ombre di elevazione rimangono invariati. Provarlo nella
[demo di theming basata su swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Colore brand personalizzato

Impostare `data-pantoken-color="custom"` per rebrandizzare da qualsiasi hex, come il colore primario che un amministratore Canvas
digita nell'Editor del Tema. pantoken deriva una scala completa 10–200 `--instui-primitive-color-custom-*`
da esso:

1. **Curva di riferimento.** L'obiettivo di lightness di ogni step è la media della lightness OKLCH delle 13
   palette in quello step, con 0 fissato al bianco e 210 al nero. Quindi la spaziatura della scala personalizzata
   corrisponde a quella delle palette fornite.
2. **Ancora.** L'input atterra sullo step il cui obiettivo di lightness è il più vicino alla sua, quindi si aggancia a
   quella esatta lightness. `#cccccc` diventa `custom-40` a `#c9c9c9`: vicino all'input, ma non
   sempre identico. "Più vicino" significa lo step più vicino sulla curva, non il colore esistente più vicino.
3. **Riempimento.** Ogni altro step mantiene la tinta (hue) dell'input. La sua saturazione segue la curva di saturazione media delle palette rispetto all'ancora, ed è ridotta solo dove un colore esce dallo spazio sRGB.

Sono accettati solo `#rgb` e `#rrggbb`; qualsiasi altro valore lancia un `TypeError`, quindi un hex proveniente da un form
non può iniettare CSS.

A build time, emettere l'intera regola con le primitive derivate già dichiarate:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Per scegliere il colore a runtime senza distribuire l'insieme di token, precomputare la curva e la regola di remap
a build time. Quindi usare l'entry senza dipendenze `/scale` nel browser, e impostare solo le 20
primitive derivate:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Il selettore di tema del sito docs, l'editor di tema di Canvas, e la demo sopra funzionano tutti in questo modo.

Vedere la [API reference](/api/) per le esportazioni di ciascun plugin.
