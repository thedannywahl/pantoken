# Komme i gang

Pantoken tek design-tokena og ikonfigurane frå [Instructure UI](https://instructure.design), løser dei ein gong, og formar den éi
modellen om til pakkar for mange plattformer: vanlege stylesheet, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma, og meir.

Installer den minste pakken som passar oppgåva di. Alt er òg re-eksportert av den samanslegne
`pantoken`-pakken, så du kan starte der og snevre inn seinare.

## Bygg opp eit startprosjekt

Den raskaste måten å prøve pantoken på: bygg opp eit startprosjekt med det allereie installert og kopla inn.

```sh
npx create-pantoken-app
```

Plattformer: `components` (vanleg HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjå
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og
programmatisk bruk.

Bruker ein ein AI-kodeagent? Ingen installasjon trengst — peik han direkte på skillen:

```prompt
Hent create.pantoken.app/SKILL.md og følg den for å setje opp pantoken i dette prosjektet.
```

Om du heller vil kople pantoken sine agent-reglar inn i repoet permanent (AGENTS.md, editor-reglar, ei lokal kopi av denne skillen), køyr `npx @pantoken/ai init` i staden.

## Token-modellen

Tokenar er CSS-eigne eigenskapar namngjevne `--instui-<group>-<name>`, til dømes
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre tema blir leverte: `rebrand`
(default, med `light-dark()` der lys og mørk skil), `canvas`, og `canvasHighContrast`.
Ikon er `<image>`-tokenar (`--instui-icon-<name>`) henta frå Lucide pluss Instructure sine eigne
glyfar.

## Style ei nettapp

Installer stylesheetet og importer det éin gong. Det definerer alle `--instui-*`-eigenskapane, så du refererer
dei direkte frå din eigen CSS.

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

Web-komponenten fungerer i kva for eit rammeverk som helst, utan portering.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokenar

Ikon er CSS-eigne eigenskapar (`--instui-icon-<name>`). Last stylesheetet éin gong og referer eit ikon som ein `mask-image` eller `background-image` — ingen per-ikon import nødvendig.

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

Bruk `icons` når du treng heile settet (t.d. for å bygge ein veljar):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge eksportane lastar den fullstendige IR ved modul-initialisering — det finst ingen per-ikon tre-shaking på dette
nivået. For slank CSS-berging, bruk [CDN picker](/guide/cdn-picker) for å generere ein kombinert URL
for berre dei ikonane du treng.

## Generer for ein native plattform

CLI-en skriv token-kjelda inn i eit måldrepo. Ingen installasjon utover køyreren:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjå [pantoken CLI](/guide/cli) for alle måltavler.

## VS Code-forfattarhints

`@pantoken/pantoken` leverer no VS Code custom-data-fil(er) så downstream-prosjekt kan få klasse- og
token-autofullføring i HTML/CSS utan å installere ei pantoken-spesifikk utviding.

1. Installer den samanslegne pakken:

```sh
npm i @pantoken/pantoken
```

1. Peik VS Code til den leverte custom-data JSON-fila frå ditt forbrukar-arbeidsområde:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (eller køyr "Developer: Reload Window") for å bruke den nye dataen.

Dette gir forslag for `instui-*` klasse-token (og `-modifier` klasse-token) pluss
`--instui-*` eige eigenskapar.

## Kvar til neste

- [Pakkeoversikta](/api/) — kva pakke å bruke, etter oppgåve.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-assets og reglar i eit forbrukar-repo.
- [Arkitektur](/guide/architecture) — korleis token-modellen, kjerne og output heng saman.
- [API-referanse](/api/) — alle eksporterte symbol, generert frå kjelda.
