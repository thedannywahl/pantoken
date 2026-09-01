# CDN e distribuzione

pantoken pubblica ogni pacchetto su npm, quindi è possibile prelevare token, componenti e web component direttamente
da un CDN — nessun passo di build, nessun bundler. Questa pagina copre l'URL di combinazione CSS (con un builder interattivo),
più i drop-in per i web component.

## La base dei token

Ogni componente pantoken legge le proprietà personalizzate `--instui-*` da un foglio di token nella pagina. Sono
disponibili due varianti:

- `@pantoken/css/dist/style.lean.css` — la foundation CDN consigliata. Contiene tutti i token eccetto il
  set completo di icone, quindi è circa 23 KB gzippati.
- `@pantoken/css/dist/style.css` — il foglio completo, che include tutti i ~1.777 token glifo delle icone
  (`--instui-icon-*`). Circa 140 KB gzippati. Caricare questo se si fanno riferimenti ampi alle icone tramite
  `var(--instui-icon-*)`.

La scala di elevazione e le variabili del focus-ring sono presenti in entrambi i fogli, quindi ombre e anello di focus funzionano con
solo la foundation caricata.

## Scegli i componenti e le icone

Il [selettore CDN interattivo](/guide/cdn-picker) costruisce URL di combinazione jsDelivr per il CSS e snippet per i pacchetti JavaScript. Aprilo, seleziona ciò che ti serve e copia l'output generato.

- **Scheda Components** — scegli fogli di stile per singoli componenti o l'intero barrel `components.css`. Aggiungi il reset base o le utility di spacing/color se ti servono.
- **Scheda JS** — copia uno snippet di import ESM per `@pantoken/interactions`.
- **Scheda Icons** — scegli icone singole dal set InstUI (~1.800 icone) o da Simple Icons (~3.300 glifi di brand). Il picker produce un URL di combinazione separato per i file CSS delle icone in modo da caricare solo le icone effettivamente usate.
- **Scheda Web Components** — costruisci snippet `@pantoken/web-components` (registrazione selettiva ESM o bootstrap con script classico).

Ogni file componente è piccolo — la maggior parte è intorno a 2 KB. Un componente che rende icone (`alert`, `checkbox`,
e alcuni altri) necessita di quei glifi, quindi il builder aggiunge `@pantoken/components/dist/component-icons.css` (circa
0.5 KB gzippati — le 11 icone usate dal set di componenti) ogni volta che si sceglie il foglio lean. Il foglio completo
li contiene già.

### Ordine di caricamento e font

Caricare prima la foundation dei token, poi l'eventuale reset base, poi i file dei componenti, e infine le utility — sono utility di override, quindi sovrascrivono effettivamente una regola del componente solo quando arrivano
dopo di essa nella cascade. L'URL di combinazione sopra li ordina già per te. I font sono l'unica eccezione:
`@pantoken/components/dist/fonts.css` punta ai file dei font tramite percorso relativo, quindi la combinazione non può riscriverli — caricalo come suo `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tutto insieme

Seleziona **All components** nel picker per passare al barrel, oppure punti direttamente a esso (circa 141 KB
gzippati) insieme al foglio dei token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registra elementi custom `<instui-*>` agnostici rispetto al framework. Includono il loro
CSS inline, ma leggono ancora i token da un foglio nella pagina, quindi caricare anche una foundation dei token.

### Moduli ES (consigliato)

Un CDN ESM risolve per te le dipendenze del pacchetto. Questo registra ogni elemento:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Usare il foglio token completo (o il foglio lean più `component-icons.css`) così che elementi che rendono icone come
`<instui-alert>` possano risolvere i loro glifi.

Per registrare solo alcuni elementi — e le loro dipendenze annidate — importa `register` e passa `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Un tag script classico

Per un drop-in senza moduli, carica la build IIFE. Bundle le dipendenze e auto-registra ogni
elemento al caricamento, esponendo una globale `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

È più grande del percorso ESM — include inline `@pantoken/components` e `@pantoken/icons` — quindi usarlo
solo quando non è possibile usare i moduli.

## Blocco delle versioni

Gli URL sopra — e quelli che il picker scrive — puntano alla release più recente. Blocca una major (o una versione esatta)
per la produzione — per esempio `@pantoken/css@0` — così un aggiornamento non ti sorprenderà.
