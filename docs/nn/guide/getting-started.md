# Kom i gang

pantoken tek Instructure UI sine design-token og ikonar, løyser dei ein gong, og formar den eine
modellen om til pakkar for mange plattformer: vanlege stilark, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma, og meir.

Installer den minste pakka som passar oppgåva di. Alt er òg re-eksportert av den samla
`pantoken`-pakken, så ein kan starte der og avgrense seinare.

## Skap eit startprosjekt

Den raskaste måten å prøve pantoken på: skapa eit startprosjekt med det allereie installert og kopla inn.

```sh
npx create-pantoken-app react
```

Plattformer: `components` (vanleg HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjå
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og
programmatisk bruk.

Bruker du ein AI-kodeagent? Ingen installasjon trengst — peik han direkte til skillen:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Fungerer på same måte for Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, og Amazon Q
Developer CLI — byt ut `claude` med `gemini`, `agent`, `codex`, `copilot -p`, eller `q chat`. Om du heller vil kopla pantoken sine agent-reglar permanent inn i repoet (AGENTS.md, editor-reglar, ei lokal kopi
av denne skillen), køyr `npx @pantoken/ai init` i staden.

## Token-modellen

Token er CSS custom properties med namn `--instui-<group>-<name>`, til dømes
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre tema blir leverte: `rebrand`
(standard, med `light-dark()` der lys og mørk skil seg frå kvarandre), `canvas`, og `canvasHighContrast`.
Iknonar er `<image>`-token (`--instui-icon-<name>`) avleidd frå Lucide pluss Instructure sine eigne
glyfar.

## Style ein web-app

Installer stilarket og importer det ein gong. Det definerer kvar einaste `--instui-*`-eigenskap, så du kan referera
til dei direkte frå eige CSS.

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

### CSS-token

Iknonar er CSS custom properties (`--instui-icon-<name>`). Last stilarket ein gong og referer eit ikon som ein `mask-image` eller `background-image` — ingen per-ikon-import påkravd.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkeltikon vs. heile settet

`@pantoken/icons` eksponerer to namngjevne eksportar. Bruk `iconsByName` for å hente eitt ikon utan å iterera
gjennom heile arrayet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Bruk `icons` når du treng heile settet (t.d. for å byggja ein veljar):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge eksportane lastar den fulle IR ved modul-initialisering — det finst ingen per-ikon tre-treeshaking på dette
nivået. For lettvekt CSS-bering, bruk [CDN picker](/guide/cdn-picker) for å generera ein samanslått URL
for berre ikonane du treng.

## Generer for ei native plattform

CLI-skrivet plasserer token-kjelde i eit mål-repo. Ingen installasjon utover kjørare:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjå [the pantoken CLI](/guide/cli) for kvar enkelt mål.

## VS Code authoring-hints

`@pantoken/pantoken` leverer no VS Code custom-data-filer slik at downstream-prosjekt kan få klasse- og
token-autofullføring i HTML/CSS utan å installera ei pantoken-spesifikk utviding.

1. Installer den samla pakken:

```sh
npm i @pantoken/pantoken
```

1. Peik VS Code til den medleverte custom-data JSON frå ditt forbrukar-arbeidsområde:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (eller køyr "Developer: Reload Window") for å ta i bruk den nye dataen.

Dette gir forslag for `instui-*` klasse-token (og `-modifier` klasse-token) pluss
`--instui-*` custom properties.

## Kvar til neste

- [Pakkeoversikta](/guide/packages) — kva pakke du skal bruke, etter oppgåve.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-asset og reglar i eit forbrukar-repo.
- [Arkitektur](/guide/architecture) — korleis token-modellen, kjernen, og output passar saman.
- [API-referanse](/api/) — alle eksporterte symbol, genererte frå kjelda.
