# Aan de slag

pantoken neemt Instructure UI's design tokens en pictogrammen, lost ze één keer op en hervormt dat ene
model naar pakketten voor vele platforms: gewone stylesheets, SCSS en Less, React en Vue en Svelte,
Tailwind en Panda, native Swift en Kotlin, WordPress en Drupal, Figma, en meer.

Installeer het kleinste pakket dat bij je taak past. Alles wordt ook opnieuw geëxporteerd door het verenigde
`pantoken` pakket, zodat je daar kunt beginnen en later kunt verfijnen.

## Een startproject opzetten

De snelste manier om pantoken uit te proberen: schaaf een startproject uit met pantoken al geïnstalleerd en aangesloten.

```sh
npx create-pantoken-app react
```

Platforms: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zie
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) voor `--dir <path>` en
programma-gebruik.

Gebruik je een AI-codeeragent? Geen installatie nodig — wijs deze direct naar de skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Werkt hetzelfde voor Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI en Amazon Q
Developer CLI — vervang `claude` door `gemini`, `agent`, `codex`, `copilot -p`, of `q chat`. Als je liever pantoken's agentregels permanent in het repo wilt opnemen (AGENTS.md, editor-regels, een lokale kopie
van deze skill), voer dan `npx @pantoken/ai init` uit.

## Het tokenmodel

Tokens zijn CSS custom properties genaamd `--instui-<group>-<name>`, bijvoorbeeld
`--instui-color-background-brand` of `--instui-spacing-space-md`. Drie thema's worden meegeleverd: `rebrand`
(de standaard, met `light-dark()` waar licht en donker verschillen), `canvas`, en `canvasHighContrast`.
Pictogrammen zijn `<image>` tokens (`--instui-icon-<name>`) afgeleid van Lucide plus Instructure's aangepaste
glyphs.

## Een webapp stijlen

Installeer het stylesheet en importeer het eenmaal. Het definieert elke `--instui-*` eigenschap, dus je verwijst
er rechtstreeks naar vanuit je eigen CSS.

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

## Pictogrammen overal gebruiken

De webcomponent werkt in elk framework, zonder portering.

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

Pictogrammen zijn CSS custom properties (`--instui-icon-<name>`). Laad het stylesheet één keer en verwijs naar elk
pictogram als een `mask-image` of `background-image` — geen per-pictogram import nodig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkel pictogram vs. volledige set

`@pantoken/icons` biedt twee named exports. Gebruik `iconsByName` om één pictogram te halen zonder de
volledige array te itereren:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gebruik `icons` wanneer je de volledige set nodig hebt (bijv. om een picker te bouwen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Beide exports laden de volledige IR bij module-initialisatie — er is geen per-pictogram tree-shaking op dit
niveau. Voor slanke CSS-only lading, gebruik de [CDN picker](/guide/cdn-picker) om een gecombineerde URL te genereren
voor alleen de pictogrammen die je nodig hebt.

## Genereren voor een native platform

De CLI schrijft tokenbron naar een doel-repo. Geen installatie behalve de runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zie [de pantoken CLI](/guide/cli) voor elk doel.

## VS Code authoring hints

`@pantoken/pantoken` levert nu VS Code custom-data bestanden zodat downstream projecten klas- en
token-completie in HTML/CSS kunnen krijgen zonder een pantoken-specifieke extensie te installeren.

1. Installeer het verenigde pakket:

```sh
npm i @pantoken/pantoken
```

1. Wijs VS Code naar de meegeleverde custom-data JSON vanuit je consumer workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Herlaad VS Code (of voer "Developer: Reload Window" uit) om de nieuwe data toe te passen.

Dit maakt suggesties mogelijk voor `instui-*` class-tokens (en `-modifier` class-tokens) plus
`--instui-*` custom properties.

## Waarnaartoe nu

- [De pakketkaart](/guide/packages) — welk pakket te gebruiken, per taak.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installeer agent-assets en regels in een consumer-repo.
- [Architectuur](/guide/architecture) — hoe het tokenmodel, core en outputs samenhangen.
- [API referentie](/api/) — elk geëxporteerd symbool, gegenereerd uit de bron.
