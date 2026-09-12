# Boađeheapmi

Pantoken leat [Instructure UI](https://instructure.design) design-tokenat ja ikonuheapmi, ráhkadit das leat okta álgán, ja divrradit das oktan
modell mii ovddidit paketáid álggosii platformmaid: plain stylesheets, SCSS ja Less, React ja Vue ja Svelte,
Tailwind ja Panda, nativ Swift ja Kotlin, WordPress ja Drupal, Figma, ja muhtun.

Installerehkka váldde bargu package mii boađe sáhttá fitten dutnje. Dát buot leat maid re-exporterejuvvan dán unnan
`pantoken` package, nuorttaš dahkat ja olgguheapmái.

## Čalmmuskode projektas

Fastteste muhto pantoken dáŋggását: scaffolde čalmmuskode projekt mii lea dahje instalerejuvvan ja vuođđun.

```sh
npx create-pantoken-app
```

Platformaid: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lávkit
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) dál `--dir <path>` ja
programmatalaš earáidvuođa.

Gulahit AI kodaštusasagentta? Ii lean assermearri — dohko čuovvut skillii suorggamánu:

```prompt
Fetch create.pantoken.app/SKILL.md and follow it to set up pantoken in this project.
```

Jos don háliidat pantoken agennda reeggat čalbmiin repo ravddas (AGENTS.md, editor reeggat, local kopia dán skill), bargga `npx @pantoken/ai init` sijá.

## Token modellii

Tokenat leat CSS custom properties mii nammahat `--instui-<group>-<name>`, dohkkehus
`--instui-color-background-brand` dahje `--instui-spacing-space-md`. Guokte theme-riehpuid veahkehit: `rebrand`
(default), ge `light-dark()` go light ja dark leat eará, `canvas`, ja `canvasHighContrast`.
Ikonat leat `<image>` tokenat (`--instui-icon-<name>`) mii johtet Lucide-barggid plus Instructure sin
custom glyphs.

## Styla veahkki-app

Installera stylesheet ja importera das okta. Soda boađeainna buot `--instui-*` property, nu de sáhtege
viessuide dahje CSS-muhtun.

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

## Geavahit ikonaid gos doarjju

Web-komponentta duššeworks gaskkas frameworkas, ii porterejuvvo.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tokenat

Ikonat leat CSS custom properties (`--instui-icon-<name>`). Loadera stylesheet okta ja viessu almmuha ikondu `mask-image` dahje `background-image` — ii per-ikon import hlavvet.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — oktavuođa ikon vs. buot setta

`@pantoken/icons` muitalit goasvuhtii guovttos namma exports. Geavaha `iconsByName` mii čohkket okta ikona johttejuvvon
buot array-miid geatnegas:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Geavaha `icons` gos don hálid buot setta (d.b. birra picker buohkat):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Dii exporta load'et buot IR modulii initialisašuvnna — ii leat per-ikon tree-shaking dán
nivttis. Vaikko CSS-nuorra loadin, geavaha [CDN picker](/guide/cdn-picker) muhto luohtá combine URL
dárbbaš ikonaid maid don hálid.

## Generere nativ platformaiguin

CLI čállá token source mii doallá target repo. Ii install bilan juo runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lávkit [the pantoken CLI](/guide/cli) buot targetaide mii leat.

## VS Code authoring vejolašvuohta

`@pantoken/pantoken` dál name VS Code custom-data failaid niin dowmstream projektat sáhtá lassin klassaid ja
token completions HTML/CSS in-ngahččat, ii installera pantoken-spesifikk extension.

1. Installera dajčča package:

```sh
npm i @pantoken/pantoken
```

1. Poarta VS Code áddjá custom-data JSON mii leat šaddan consumer workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (dahje geavaha "Developer: Reload Window") mainna dán nuova datta.

Dát váldde sugerdusaid `instui-*` klass-tokenaid (ja `-modifier` klass-tokenaid) pluss
`--instui-*` custom properties.

## Gos manná dál

- [Package map](/api/) — mii package buorre du fitnasa barggut, task-aiguin.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agent assets ja reeggat consumer repo.
- [Architecture](/guide/architecture) — movttut token modellii, core ja outputs geavahallat hástalusa.
- [API reference](/api/) — buot exporterejuvvan symbol, genereruvvan source-barggi.
