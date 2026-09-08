# Aan de slag

Pantoken neemt de design tokens en pictogrammen van [Instructure UI](https://instructure.design), lost ze één keer op en vormt dat ene model om naar pakketten voor veel platforms: gewone stylesheets, SCSS en Less, React en Vue en Svelte, Tailwind en Panda, native Swift en Kotlin, WordPress en Drupal, Figma, en meer.

Installeer het kleinste pakket dat bij je taak past. Alles wordt ook opnieuw geëxporteerd door het verenigde `pantoken`-pakket, dus je kunt daar beginnen en later verfijnen.

## Een starterproject scaffolden

De snelste manier om pantoken uit te proberen: scaffold een starterproject met pantoken al geïnstalleerd en aangesloten.

```sh
npx create-pantoken-app
```

Platforms: `components` (platte HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zie [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) voor `--dir <path>` en programmatatisch gebruik.

Een AI-coding agent gebruiken? Geen installatie nodig — wijs deze rechtstreeks naar de skill:

```prompt
Haalt create.pantoken.app/SKILL.md op en volg het om pantoken in dit project in te stellen.
```

Als je liever pantoken's agentregels permanent in het repo wilt opnemen (AGENTS.md, editorregels, een lokale kopie van deze skill), voer dan in plaats daarvan `npx @pantoken/ai init` uit.

## Het tokenmodel

Tokens zijn CSS custom properties met de naam `--instui-<group>-<name>`, bijvoorbeeld `--instui-color-background-brand` of `--instui-spacing-space-md`. Drie thema's worden geleverd: `rebrand` (de standaard, met `light-dark()` waar licht en donker verschillen), `canvas`, en `canvasHighContrast`. Pictogrammen zijn `<image>`-tokens (`--instui-icon-<name>`) afgeleid van Lucide plus Instructure's aangepaste glyphs.

## Een webapp stijlen

Installeer het stylesheet en importeer het eenmaal. Het definieert elke `--instui-*`-eigenschap, zodat je ze rechtstreeks uit je eigen CSS kunt refereren.

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

Pictogrammen zijn CSS custom properties (`--instui-icon-<name>`). Laad het stylesheet eenmaal en referentieer elk pictogram als een `mask-image` of `background-image` — geen per-pictogram import nodig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkel pictogram versus volledige set

`@pantoken/icons` biedt twee benoemde exports. Gebruik `iconsByName` om één pictogram te halen zonder de volledige array te itereren:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gebruik `icons` wanneer je de hele set nodig hebt (bijv. om een picker te bouwen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Beide exports laden de volledige IR bij module-initialisatie — er is geen per-pictogram tree-shaking op dit niveau. Voor zuinige CSS-only laden, gebruik de [CDN picker](/guide/cdn-picker) om een gecombineerde URL te genereren voor alleen de pictogrammen die je nodig hebt.

## Genereren voor een native platform

De CLI schrijft tokenbron naar een doel-repo. Geen installatie behalve de runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zie [de pantoken CLI](/guide/cli) voor elk target.

## VS Code authoring tips

`@pantoken/pantoken` levert nu VS Code custom-data bestanden zodat downstream projecten klasse- en token-aanvulling in HTML/CSS kunnen krijgen zonder een pantoken-specifieke extensie te installeren.

1. Installeer het verenigde pakket:

```sh
npm i @pantoken/pantoken
```

1. Richt VS Code op de meegeleverde custom-data JSON vanuit je consumer workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Herlaad VS Code (of voer "Developer: Reload Window" uit) om de nieuwe data toe te passen.

Dit maakt suggesties mogelijk voor `instui-*` class-tokens (en `-modifier` class-tokens) plus `--instui-*` custom properties.

## Wat nu

- [De pakketkaart](/guide/packages) — welk pakket te gebruiken per taak.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installeer agent-assets en regels in een consumer-repo.
- [Architectuur](/guide/architecture) — hoe het tokenmodel, core, en outputs samenhangen.
- [API-referentie](/api/) — elk geëxporteerd symbool, gegenereerd uit de bron.
