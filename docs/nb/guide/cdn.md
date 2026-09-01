# CDN og distribusjon

pantoken publiserer alle pakker til npm, så du kan hente tokens, komponenter og webkomponenter direkte
fra en CDN — ingen byggetrinn, ingen bundler. Denne siden dekker CSS combine-URLen (med en interaktiv
bygger), pluss web-komponent drop-ins.

## Token-grunnlaget

Hver pantoken-komponent leser `--instui-*` egendefinerte egenskaper fra et token-ark på siden. To
varianter leveres:

- `@pantoken/css/dist/style.lean.css` — det anbefalte CDN-grunnlaget. Det inneholder alle tokens unntatt det
  komplette ikonsettet, så det er omtrent 23 KB gzipkomprimert.
- `@pantoken/css/dist/style.css` — det komplette arket, inkludert alle ~1,777 ikon-glyph-tokens
  (`--instui-icon-*`). Ca. 140 KB gzipkomprimert. Last dette hvis du refererer til ikoner bredt via
  `var(--instui-icon-*)`.

Hevingsskalaen og fokus-ring-variablene ligger i begge arkene, så skygger og fokusring fungerer med
kun grunnlaget lastet.

## Velg komponentene og ikonene dine

Den [interaktive CDN-velgeren](/guide/cdn-picker) bygger jsDelivr combine-URLer for CSS og snippets for JavaScript-pakker. Åpne den, kryss av det du trenger, og kopier den genererte outputen.

- **Components-fanen** — velg individuelle komponent-stylesheets eller hele `components.css` fatet. Legg til base reset eller spacing/color utilities hvis du trenger dem.
- **JS-fanen** — kopier et ESM-importsnutt for `@pantoken/interactions`.
- **Icons-fanen** — velg individuelle ikoner fra InstUI-settet (~1,800 ikoner) eller fra Simple Icons (~3,300 brand-glyphs). Velgeren gir en separat combine-URL for ikon-CSS-filene slik at du kun kan laste de ikonene du faktisk bruker.
- **Web Components-fanen** — bygg `@pantoken/web-components` snippets (ESM selektiv register eller klassisk script bootstrap).

Hver komponentfil er liten — de fleste er rundt 2 KB. En komponent som rendererer ikoner (`alert`, `checkbox`,
og noen få andre) trenger disse glyphsene, så bygghjelpen legger til `@pantoken/components/dist/component-icons.css` (omtrent
0.5 KB gzipkomprimert — de 11 ikonene komponentsettet bruker) når du velger det slanke arket. Det fulle arket
inneholder dem allerede.

### Last rekkefølge og fonter

Last token-grunnlaget først, deretter den valgfrie base reset, så komponentfilene, og utilities
til slutt — de er overstyrings-utilities, så de overstyrer en komponents egne regler bare når de havner
etter den i kaskaden. Combine-URLen ovenfor ordner dem for deg. Fonterne er ett unntak:
`@pantoken/components/dist/fonts.css` peker på fontfiler med relativ sti, så combine kan ikke omskrive
dem — last det som sitt eget `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Alt på en gang

Velg **All components** i velgeren for å bytte den til fatet, eller pek direkte på det selv (omtrent 141 KB
gzipkomprimert) sammen med token-arket:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web-komponenter

`@pantoken/web-components` registrerer rammeverks-agnostiske `<instui-*>` custom elements. De inliner sin
egen CSS, men leser fortsatt tokens fra et ark på siden, så last også et token-grunnlag.

### ES-moduler (anbefalt)

En ESM-CDN løser pakkens avhengigheter for deg. Dette registrerer alle elementene:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Bruk det fullstendige tokenarket (eller det slanke arket pluss `component-icons.css`) slik at elementer som renderer ikoner som
`<instui-alert>` finner sine glyphs.

For å registrere bare noen elementer — og deres nestede avhengigheter — importer `register` og passér `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Et klassisk script-tag

For en no-modules drop-in, last IIFE-bygget. Det bundler sine avhengigheter og auto-registrer hvert
element ved last, og eksponerer en `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Det er større enn ESM-veien — det inliner `@pantoken/components` og `@pantoken/icons` — så bruk det
bare når du ikke kan bruke moduler.

## Låsing av versjoner

URLene ovenfor — og de som velgeren skriver — peker på siste release. Lås en major (eller eksakt)
versjon for produksjon — for eksempel `@pantoken/css@0` — slik at en oppgradering aldri kommer som en overraskelse.
