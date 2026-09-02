# CDN og distribusjon

pantoken publiserer kvar pakke til npm, så du kan hente token, komponentar og web-komponentar direkte
frå eit CDN — ingen bygge‑steg, ingen bundlar. Denne sida dekkjer CSS combine‑URLen (med ein interaktiv
bygger), pluss web‑component drop‑ins.

## Token‑grunnlaget

Kvar pantoken‑komponent les `--instui-*` egendefinerte eigenskapar frå eit token‑ark på sida. To
variantar blir levert:

- `@pantoken/css/dist/style.lean.css` — den anbefalte CDN‑grunnmuren. Ho inneheld alle tokenar bortsett frå det
  fullstendige ikonsettet, så ho er om lag 23 KB gzipa.
- `@pantoken/css/dist/style.css` — det fullstendige arket, inkludert alle ~1,777 ikon‑glyf‑tokenar
  (`--instui-icon-*`). Om lag 140 KB gzipa. Last dette om du refererer ikonar breitt via
  `var(--instui-icon-*)`.

Elevasjonsskalaen og variablar for fokusring ligg i begge ark, så skuggar og fokusring fungerer med
berre grunnmuren lasta.

## Vel komponentane og ikonane dine

Den [interaktive CDN‑veljaren](/guide/cdn-picker) byggjer jsDelivr combine‑URLar for CSS og snippet‑ar for JavaScript‑pakker. Opna han, kryss av det du treng, og kopier den genererte outputen.

- **Components‑fane** — vel individuelle komponent‑stylesheet eller heile `components.css`‑fatet. Legg til base‑reset eller spacing/color‑utilities om du treng dei.
- **JS‑fane** — kopier eit ESM‑import‑snippet for `@pantoken/interactions`.
- **Icons‑fane** — vel individuelle ikon frå InstUI‑settet (~1,800 ikon) eller frå Simple Icons (~3,300 merke‑glyfar). Veljaren gir ei eiga combine‑URL for ikon‑CSS‑filene så du berre kan laste dei ikonane du faktisk brukar.
- **Web Components‑fane** — bygg `@pantoken/web-components`‑snippets (ESM selektiv registrering eller klassisk script‑bootstrap).

Kvar komponentfil er liten — dei fleste rundt 2 KB. Ein komponent som renderar ikon (`alert`, `checkbox`,
og nokre få andre) treng desse glyfane, så bygget legg til `@pantoken/components/dist/component-icons.css` (om lag
0.5 KB gzipa — dei 11 ikonane komponent‑settet brukar) når du plukkar det slanke arket. Det fullstendige arket
har dei allereie.

### Laste‑rekkefylgja og skrifttypar

Last token‑grunnmuren først, så valfri base‑reset, deretter komponentfilene, og til slutt utility‑ane — dei er overstyrings‑utilities, så dei overstyrer ein komponent sin eigen regel berre når dei ligg
etter i kaskaden. Combine‑URLen ovanfor ordnar dette for deg. Skrifttypar er eitt unntak:
`@pantoken/components/dist/fonts.css` peikar på fontfiler med relativ bane, så combine kan ikkje omskrive
dei — last han som sin eigen `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Alt samtidig

Marker **All components** i veljaren for å bytte til fatet, eller pek direkte på det sjølv (om lag 141 KB
gzipa) saman med token‑arket:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web‑komponentar

`@pantoken/web-components` registrerer rammeverks‑agnostiske `<instui-*>` egendefinerte element. Dei inlinear si
eige CSS, men les framleis token frå eit ark på sida, so last også ein token‑grunnmur.

### ES‑modular (anbefalt)

Ein ESM‑CDN løyser pakkens avhengigheiter for deg. Dette registrerer alle elementa:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Bruk det fulle token‑arket (eller det slanke arket pluss `component-icons.css`) slik at ikon‑renderande element som
`<instui-alert>` finn glyfane sine.

For å registrere berre nokre element — og deira nestede avhengigheiter — importer `register` og send `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Eit klassisk script‑tag

For ein drop‑in utan moduler, last IIFE‑bygget. Det bundlar avhengigheitene og auto‑registrerer alle
element ved last, og eksponerar ein `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Det er større enn ESM‑vegen — det inlinear `@pantoken/components` og `@pantoken/icons` — så bruk det
berre når du ikkje kan bruke moduler.

## Fastsetje versjonar

URL‑ane ovanfor — og dei veljaren skriv — peikar på siste release. Pinfest ein major (eller eksakt)
versjon for produksjon — til dømes `@pantoken/css@0` — så ein oppgradering aldri kjem som ein overrasking.
