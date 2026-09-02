# CDN & distribution

pantoken udgiver alle pakker til npm, så du kan hente tokens, komponenter og webkomponenter direkte
fra en CDN — ingen build-trin, ingen bundler. Denne side dækker CSS combine-URL'en (med en interaktiv
generator) samt web-komponent drop-ins.

## Token-grundlaget

Hver pantoken-komponent læser `--instui-*` custom properties fra et token-ark på siden. To
varianter leveres:

- `@pantoken/css/dist/style.lean.css` — den anbefalede CDN-grundpakke. Den indeholder alle tokens undtagen det
  fulde ikon-sæt, så den er omkring 23 KB gzippet.
- `@pantoken/css/dist/style.css` — det fulde ark, inklusive alle ~1.777 ikon-glyph-tokens
  (`--instui-icon-*`). Omkring 140 KB gzippet. Indlæs dette hvis du refererer til ikoner bredt via
  `var(--instui-icon-*)`.

Elevationsskalaen og focus-ring variablerne er i begge ark, så skygger og fokusring virker med
kun grundpakken indlæst.

## Vælg dine komponenter og ikoner

Den [interaktive CDN-picker](/guide/cdn-picker) bygger jsDelivr combine-URL'er til CSS og snippets til JavaScript-pakker. Åbn den, marker hvad du behøver, og kopier den genererede output.

- **Components fanen** — vælg individuelle komponent-stylesheets eller hele `components.css` barrel. Tilføj base reset eller spacing/color utilities hvis du har brug for dem.
- **JS fanen** — kopier et ESM import-snippet for `@pantoken/interactions`.
- **Icons fanen** — vælg individuelle ikoner fra InstUI-sættet (~1.800 ikoner) eller fra Simple Icons (~3.300 brand-glyphs). Picker'en outputter en separat combine-URL for ikon-CSS-filerne, så du kun kan indlæse de ikoner, du rent faktisk bruger.
- **Web Components fanen** — byg `@pantoken/web-components` snippets (ESM selektiv register eller klassisk script bootstrap).

Hver komponentfil er lille — de fleste er omkring 2 KB. En komponent der renderer ikoner (`alert`, `checkbox`,
og nogle få andre) har brug for de glyphs, så generatoren tilføjer `@pantoken/components/dist/component-icons.css` (omkring
0.5 KB gzippet — de 11 ikoner komponent-sættet bruger) når du vælger det slanke ark. Det fulde ark
indeholder dem allerede.

### Indlæsningsrækkefølge og skrifttyper

Indlæs token-grundlaget først, derefter den valgfrie base reset, så komponentfilerne, og til sidst utilities
— de er override-utilities, så de kun faktisk overskriver en komponentregel når de lander
efter den i kaskaden. Combine-URL'en ovenfor ordner dem allerede for dig. Skrifttyper er en undtagelse:
`@pantoken/components/dist/fonts.css` peger på fontfiler via relative stier, så combine kan ikke omskrive
dem — indlæs det som sit eget `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Alt på én gang

Marker **All components** i picker'en for at skifte til barrel, eller peg direkte på den selv (omkring 141 KB
gzippet) sammen med token-arket:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web-komponenter

`@pantoken/web-components` registrerer framework-agnostiske `<instui-*>` custom elements. De inliner deres
egen CSS, men læser stadig tokens fra et ark på siden, så indlæs også et token-grundlag.

### ES-moduler (anbefalet)

En ESM CDN løser pakkens afhængigheder for dig. Dette registrerer hvert element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Brug det fulde token-ark (eller det slanke ark plus `component-icons.css`) så ikon-renderende elementer som
`<instui-alert>` kan finde deres glyphs.

For kun at registrere nogle elementer — og deres indlejrede afhængigheder — importer `register` og giv `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Et klassisk script tag

For et no-modules drop-in, indlæs IIFE-buildet. Det bundler sine afhængigheder og auto-registrerer alle
elementer ved indlæsning, og eksponerer et `PantokenWebComponents` globalt:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Det er større end ESM-vejen — det inliner `@pantoken/components` og `@pantoken/icons` — så brug det
kun når du ikke kan bruge moduler.

## Fastlåsning af versioner

URL'erne ovenfor — og dem picker'en skriver — følger den seneste release. Fastlås en major (eller præcis)
version til produktion — for eksempel `@pantoken/css@0` — så en opgradering aldrig overrasker dig.
