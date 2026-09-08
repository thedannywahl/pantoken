# Komme i gang

Pantoken tek design-tokena og ikonene frå [Instructure UI](https://instructure.design), løysar dei éin gong, og formar denne eine
modellen om til pakkar for mange plattformer: vanlege stilark, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma, og meir.

Installer den minste pakken som passar oppgåva di. Alt blir også re-eksportert av den einskilde
`pantoken`-pakken, så du kan starte der og avgrense seinare.

## Lage eit startprosjekt

Den raskaste måten å prøve pantoken på: opprett eit startprosjekt med det allereie installert og kopla inn.

```sh
npx create-pantoken-app
```

Plattformer: `components` (vanleg HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjå
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og
programmatisk bruk.

Brukar du ein AI-kodeagent? Ingen installasjon nødvendig — peik han direkte på skilla:

```prompt
Hent create.pantoken.app/SKILL.md og følg den for å setje opp pantoken i dette prosjektet.
```

Om du heller vil kople pantoken sine agentreglar permanent inn i repoet (AGENTS.md, editor-reglar, ei lokal kopi av denne skillen), køyr `npx @pantoken/ai init` i staden.

## Token-modellen

Tokena er CSS custom properties med namn som `--instui-<group>-<name>`, til dømes
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre tema blir leverte: `rebrand`
(standard, med `light-dark()` der lys og mørk skil seg), `canvas`, og `canvasHighContrast`.
Ikon er `<image>`-token (`--instui-icon-<name>`) avleidd frå Lucide pluss Instructure sine eigne
glyphs.

## Style ei webløysing

Installer stilarket og importer det éin gong. Det definerer kvar einaste `--instui-*`-eigenskap, så du kan referere
til dei direkte frå eiga CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Bruk ikon kvar som helst

Web-komponenten fungerer i alle rammeverk, utan portering.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokon

Ikon er CSS custom properties (`--instui-icon-<name>`). Last stilarket éin gong og referer til eit ikon som ein `mask-image` eller `background-image` — ingen per-ikon import nødvendig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkeltikon vs. heile settet

`@pantoken/icons` eksponerer to namngjevne eksportar. Bruk `iconsByName` for å hente eitt ikon utan å iterere
gjennom heile arrayet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Bruk `icons` når du treng heile settet (t.d. for å bygge ein picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge eksportane lastar heile IR ved modulinitialisering — det finst ikkje per-ikon tree-shaking på dette
nivået. For lettare CSS-only lasting, bruk [CDN picker](/guide/cdn-picker) for å generere ein samla URL
for berre ikonene du treng.

## Generer for ein native plattform

CLI-en skriv tokenskildene inn i eit mål-repo. Ingen installasjon utover køyraren:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjå [pantoken CLI-en](/guide/cli) for alle mål.

## VS Code-forfattingshints

`@pantoken/pantoken` leverer no VS Code custom-data-filer slik at nedstrøms-prosjekt kan få klasse- og
token-autofullføring i HTML/CSS utan å installere ei pantoken-spesifikk utviding.

1. Installer den einskilde pakken:

```sh
npm i @pantoken/pantoken
```

1. Peik VS Code på den leverte custom-data JSON-fila frå forbrukarens arbeidsområde:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Last inn VS Code på nytt (eller køyr "Developer: Reload Window") for å gjere endringane gjeldande.

Dette gir forslag for `instui-*` klasse-token (og `-modifier` klasse-token) pluss
`--instui-*` custom properties.

## Kvar går ein vidare

- [Pakke-kartet](/guide/packages) — kva pakke du skal nå etter, etter oppgåve.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-assets og reglar i eit forbrukar-repo.
- [Arkitektur](/guide/architecture) — korleis token-modellen, kjerne og output heng saman.
- [API-referanse](/api/) — kvar eksportert symbol, generert frå kjelda.
