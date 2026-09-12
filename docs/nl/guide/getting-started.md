# Aan de slag

Pantoken neemt de [Instructure UI](https://instructure.design) ontwerp-tokens en pictogrammen, lost ze één keer op en hervormt dat ene
model naar pakketten voor veel platforms: gewone stylesheets, SCSS en Less, React en Vue en Svelte,
Tailwind en Panda, native Swift en Kotlin, WordPress en Drupal, Figma, en meer.

Installeer het kleinste pakket dat bij je taak past. Alles wordt ook opnieuw geëxporteerd door het uniforme
`pantoken` pakket, dus je kunt daar beginnen en later verfijnen.

## Een startproject scaffolden

De snelste manier om pantoken te proberen: scaffold een starterproject met pantoken al geïnstalleerd en aangesloten.

```sh
npx create-pantoken-app
```

Platforms: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zie
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) voor `--dir <path>` en
programma-matig gebruik.

Gebruik je een AI-codering agent? Geen installatie nodig — wijs deze direct naar de skill:

```prompt
Haalt create.pantoken.app/SKILL.md op en volg het om pantoken in dit project in te stellen.
```

Als je pantoken's agentregels permanent in het repo wilt opnemen (AGENTS.md, editorregels, een lokale kopie van deze skill), gebruik dan in plaats daarvan `npx @pantoken/ai init`.

## Het token-model

Tokens zijn CSS custom properties genaamd `--instui-<group>-<name>`, bijvoorbeeld
`--instui-color-background-brand` of `--instui-spacing-space-md`. Drie thema's worden geleverd: `rebrand`
(de standaard, met `light-dark()` waar licht en donker verschillen), `canvas`, en `canvasHighContrast`.
Pictogrammen zijn `<image>` tokens (`--instui-icon-<name>`) afgeleid van Lucide plus Instructure's eigen
glyfen.

## Een webapp stylen

Installeer het stylesheet en importeer het één keer. Het definieert elke `--instui-*` eigenschap, zodat je ze rechtstreeks
in je eigen CSS kunt gebruiken.

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

De web component werkt in elk framework, zonder portering.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tokens

Pictogrammen zijn CSS custom properties (`--instui-icon-<name>`). Laad het stylesheet één keer en verwijs naar elk
pictogram als een `mask-image` of `background-image` — geen per-pictogram import nodig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enkel pictogram vs. volledige set

`@pantoken/icons` biedt twee benoemde exports. Gebruik `iconsByName` om één pictogram te halen zonder de
volledige array te itereren:

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

Beide exports laden de volledige IR bij module-initialisatie — er is op dit
niveau geen per-pictogram tree-shaking. Voor zuinige CSS-only loading, gebruik de [CDN picker](/guide/cdn-picker) om een gecombineerde URL
te genereren voor alleen de pictogrammen die je nodig hebt.

## Genereren voor een native platform

De CLI schrijft token-bron naar een doelsrepo. Geen installatie nodig behalve de runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zie [de pantoken CLI](/guide/cli) voor elk doel.

## VS Code authoring hints

`@pantoken/pantoken` levert nu VS Code custom-data bestanden zodat downstream projecten klasse- en
token-completie in HTML/CSS kunnen krijgen zonder een pantoken-specifieke extensie te installeren.

1. Installeer het uniforme pakket:

```sh
npm i @pantoken/pantoken
```

1. Wijs VS Code vanuit je consumer workspace naar de meegeleverde custom-data JSON:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Herlaad VS Code (of voer "Developer: Reload Window" uit) om de nieuwe data toe te passen.

Dit maakt suggesties mogelijk voor `instui-*` klasse-tokens (en `-modifier` klasse-tokens) plus
`--instui-*` custom properties.

## Waarnaartoe

- [De package-kaart](/api/) — welk pakket te gebruiken per taak.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installeer agent-assets en regels in een consumer-repo.
- [Architectuur](/guide/architecture) — hoe het token-model, core en outputs samenpassen.
- [API referentie](/api/) — elke geëxporteerde symbol, gegenereerd uit de bron.
