# Komme i gang

Pantoken tar designtokens og ikoner fra [Instructure UI](https://instructure.design), løser dem én gang, og omformer den modellen til pakker for mange plattformer: vanlige stilark, SCSS og Less, React og Vue og Svelte, Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma og mer.

Installer den minste pakken som passer oppgaven din. Alt er også re-eksportert av den samlende `pantoken`-pakken, så du kan starte der og snevre det inn senere.

## Skaff et startprosjekt

Den raskeste måten å prøve pantoken: skaffold et startprosjekt med det allerede installert og tilkoblet.

```sh
npx create-pantoken-app
```

Plattformer: `components` (ren HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og
programmatisk bruk.

Bruker du en AI-kodingsagent? Ingen installasjon nødvendig — pek den direkte til ferdigheten:

```prompt
Hent create.pantoken.app/SKILL.md og følg den for å sette opp pantoken i dette prosjektet.
```

Hvis du heller vil koble pantokens agent-regler inn i repoet permanent (AGENTS.md, editor-regler, en lokal kopi av denne ferdigheten), kjør `npx @pantoken/ai init` i stedet.

## Token-modellen

Tokens er CSS custom properties kalt `--instui-<group>-<name>`, for eksempel
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre temaer leveres: `rebrand`
(standard, med `light-dark()` der lyst og mørkt avviker), `canvas`, og `canvasHighContrast`.
Ikoner er `<image>`-tokens (`--instui-icon-<name>`) avledet fra Lucide pluss Instructures egendefinerte glyphs.

## Style en webapp

Installer stilarket og importer det én gang. Det definerer alle `--instui-*`-egenskapene, så du kan referere
til dem direkte fra din egen CSS.

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

## Bruk ikoner hvor som helst

Webkomponenten fungerer i alle rammeverk, uten portering.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokens

Ikoner er CSS custom properties (`--instui-icon-<name>`). Last stilarket én gang og referer til et hvilket som helst
ikon som en `mask-image` eller `background-image` — ingen per-ikon import nødvendig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkeltikon vs. hele settet

`@pantoken/icons` eksponerer to navngitte eksport. Bruk `iconsByName` for å hente ett ikon uten å iterere
gjennom hele arrayet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Bruk `icons` når du trenger hele settet (f.eks. for å bygge en picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge eksportene laster den fullstendige IR ved modulinitialisering — det finnes ingen per-ikon tree-shaking på dette
nivået. For slank, kun-CSS lasting, bruk [CDN picker](/guide/cdn-picker) for å generere en kombinert URL
kun for ikonene du trenger.

## Generer for en native plattform

CLI-en skriver tokens-kilde inn i et målrepo. Ingen installasjon utover runneren:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI](/guide/cli) for alle mål.

## VS Code forfattertips

`@pantoken/pantoken` leverer nå VS Code custom-data filer slik at downstream-prosjekter kan få klasse- og
token-autofullføring i HTML/CSS uten å installere en pantoken-spesifikk utvidelse.

1. Installer den samlende pakken:

```sh
npm i @pantoken/pantoken
```

1. Pek VS Code til den medfølgende custom-data JSON fra ditt consumer-arbeidsområde:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Last VS Code på nytt (eller kjør "Developer: Reload Window") for å bruke de nye dataene.

Dette aktiverer forslag for `instui-*` klasse-tokens (og `-modifier` klasse-tokens) pluss
`--instui-*` custom properties.

## Hva nå

- [Pakkeoversikten](/guide/packages) — hvilken pakke man skal bruke for hvilken oppgave.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-assets og regler i et consumer-repo.
- [Arkitektur](/guide/architecture) — hvordan token-modellen, core og output henger sammen.
- [API-referanse](/api/) — alle eksporterte symboler, generert fra kilden.
