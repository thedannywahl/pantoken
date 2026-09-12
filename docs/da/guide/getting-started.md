# Kom godt i gang

Pantoken tager [Instructure UI](https://instructure.design) design tokens og ikoner, resolver dem én gang, og omformer den ene
model til pakker til mange platforme: almindelige stylesheets, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma, og mere.

Installer den mindste pakke, der passer til din opgave. Alt eksporteres også via den samlede
`pantoken` pakke, så du kan starte der og indsnævre senere.

## Scaffold et startprojekt

Den hurtigste måde at prøve pantoken: scaffold et startprojekt med det allerede installeret og sat op.

```sh
npx create-pantoken-app
```

Platforme: `components` (almindelig HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og
programmatisk brug.

Bruger du en AI-kodeagent? Ingen installation nødvendig — peg den direkte på skillen:

```prompt
Hent create.pantoken.app/SKILL.md og følg den for at sætte pantoken op i dette projekt.
```

Hvis du hellere vil indbygge pantokens agent-regler i repoet permanent (AGENTS.md, editor-regler, en lokal kopi af denne skill), kør `npx @pantoken/ai init` i stedet.

## Token-modellen

Tokens er CSS custom properties navngivet `--instui-<group>-<name>`, for eksempel
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre temaer følger med: `rebrand`
(standard, med `light-dark()` hvor lys og mørk adskiller sig), `canvas`, og `canvasHighContrast`.
Ikoner er `<image>` tokens (`--instui-icon-<name>`) afledt fra Lucide plus Instructures egne
glyphs.

## Style en webapp

Installer stylesheetet og importér det én gang. Det definerer hver `--instui-*` property, så du refererer
til dem direkte fra dit eget CSS.

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

## Brug ikoner hvor som helst

Webkomponenten virker i enhver framework, uden portering.

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

Ikoner er CSS custom properties (`--instui-icon-<name>`). Load stylesheetet én gang og referér til et hvilket som helst
ikon som en `mask-image` eller `background-image` — ingen per-ikon import nødvendig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkelt ikon vs. hele sættet

`@pantoken/icons` eksponerer to named exports. Brug `iconsByName` for at hente et enkelt ikon uden at iterere
gennem hele arrayet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Brug `icons` når du behøver hele sættet (f.eks. til at bygge en picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge exports loader den fulde IR ved modul-initialisering — der er ingen per-ikon tree-shaking på dette
niveau. For slank CSS-only loading, brug [CDN pickeren](/guide/cdn-picker) til at generere en kombineret URL
kun for de ikoner, du behøver.

## Generer til en native platform

CLI'en skriver token-kilden ind i et mål-repo. Ingen installation ud over runneren:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI'en](/guide/cli) for hvert target.

## VS Code authoring-hints

`@pantoken/pantoken` leverer nu VS Code custom-data filer, så downstream projekter kan få klasse- og
token-fuldførelse i HTML/CSS uden at installere en pantoken-specifik extension.

1. Installer den samlede pakke:

```sh
npm i @pantoken/pantoken
```

1. Peg VS Code på den medfølgende custom-data JSON fra dit consumer workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Genindlæs VS Code (eller kør "Developer: Reload Window") for at anvende de nye data.

Dette aktiverer forslag til `instui-*` klassetokens (og `-modifier` klassetokens) plus
`--instui-*` custom properties.

## Hvor til næste

- [Pakkekortet](/api/) — hvilken pakke man skal vælge, efter opgave.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-assets og regler i et consumer-repo.
- [Arkitektur](/guide/architecture) — hvordan token-modellen, kernen, og output hænger sammen.
- [API reference](/api/) — alle eksporterede symboler, genereret fra kilden.
