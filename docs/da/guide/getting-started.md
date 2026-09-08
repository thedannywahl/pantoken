# Kom godt i gang

Pantoken tager designtokens og ikoner fra [Instructure UI](https://instructure.design), resolver dem én gang, og omformer den ene model til pakker for mange platforme: almindelige stylesheets, SCSS og Less, React og Vue og Svelte, Tailwind og Panda, native Swift og Kotlin, WordPress og Drupal, Figma og mere.

Installer den mindste pakke, der passer til din opgave. Alt er også re-eksporteret af den samlede `pantoken` pakke, så du kan starte der og indsnævre senere.

## Scaffold et startprojekt

Den hurtigste måde at prøve pantoken på: scaffold et startprojekt med det allerede installeret og koblet ind.

```sh
npx create-pantoken-app
```

Platforme: `components` (almindelig HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` og programmatisk brug.

Bruger du en AI-kodingsagent? Ingen installation nødvendig — peg den direkte på skillen:

```prompt
Hent create.pantoken.app/SKILL.md og følg den for at konfigurere pantoken i dette projekt.
```

Hvis du hellere vil indbygge pantokens agent-regler i repoet permanent (AGENTS.md, editor-regler, en lokal kopi af denne skill), kør i stedet `npx @pantoken/ai init`.

## Token-modellen

Tokens er CSS custom properties navngivet `--instui-<group>-<name>`, for eksempel `--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre temaer medfølger: `rebrand` (standard, med `light-dark()` hvor lys og mørk adskiller sig), `canvas`, og `canvasHighContrast`. Ikoner er `<image>` tokens (`--instui-icon-<name>`) afledt af Lucide plus Instructures egne glyphs.

## Style en webapp

Installer stylesheetet og importér det én gang. Det definerer alle `--instui-*` properties, så du kan referere til dem direkte fra dit eget CSS.

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

Webkomponenten virker i alle frameworks, uden portering.

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

Ikoner er CSS custom properties (`--instui-icon-<name>`). Indlæs stylesheetet én gang og referer til et hvilket som helst ikon som en `mask-image` eller `background-image` — ingen import per ikon nødvendig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkelt ikon vs. fuldt sæt

`@pantoken/icons` eksponerer to navngivne exports. Brug `iconsByName` til at trække ét ikon uden at iterere over hele arrayet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Brug `icons` når du har brug for hele sættet (fx for at bygge en picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Begge exports indlæser den fulde IR ved modul-initialisering — der er ingen per-ikon tree-shaking på dette niveau. For slank CSS-only indlæsning, brug [CDN picker](/guide/cdn-picker) til at generere en kombineret URL kun for de ikoner, du har brug for.

## Generer til en native platform

CLI'en skriver token-kilden ind i et mål-repo. Ingen installation ud over runneren:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI](/guide/cli) for alle mål.

## VS Code forfatterhjælp

`@pantoken/pantoken` leverer nu VS Code custom-data filer, så downstream projekter kan få klasse- og token-autofuldførelse i HTML/CSS uden at installere en pantoken-specifik extension.

1. Installer den samlede pakke:

```sh
npm i @pantoken/pantoken
```

1. Peg VS Code på den medfølgende custom-data JSON fra dit forbruger-arbejdsområde:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Genindlæs VS Code (eller kør "Developer: Reload Window") for at anvende de nye data.

Dette giver forslag til `instui-*` klasse-tokens (og `-modifier` klasse-tokens) samt `--instui-*` custom properties.

## Hvorhen næste

- [Pakkeoversigten](/guide/packages) — hvilken pakke man skal vælge efter opgave.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installer agent-assets og regler i et forbruger-repo.
- [Arkitektur](/guide/architecture) — hvordan token-modellen, core og outputs passer sammen.
- [API reference](/api/) — alle eksporterede symboler, genereret fra kilden.
