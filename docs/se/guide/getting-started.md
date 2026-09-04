# Gávcci almmuhit

Pantoken geavahit [Instructure UI](https://instructure.design) design-tokenat ja ikonat, várreheapmi dahkat maid dagu, ja rohke mielde mii modellan heivehat fálaldagat daid muhtin platformaid: ferdde stylesheetat, SCSS ja Less, React ja Vue ja Svelte, Tailwind ja Panda, nativat Swift ja Kotlin, WordPress ja Drupal, Figma ja muitalit.

Leat galggan instala dástallat váldoheapmi pakkea mii viežžii dutnje. Buot leat maiddái sihttahttán re-exported oka vuollá `pantoken` pakkeas, niin sáhtat almmuheapmi dátin ja nubbodat hui bures maid geavahit.

## Skavvasa álggu projektan

Fastta dohkket pantoken gávdnos: skavvasa álggu projektan mii leat dáhpáhusis installeran ja veakkat.

```sh
npx create-pantoken-app
```

Platformat: `components` (ferdde HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Leage
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) doaimmaid `--dir <path>` ja programmatálaš geavahit.

Geavahus AI coding agent? Ingea install: suodjalat skill direkttevaš osoaheapmi:

```prompt
Ládde create.pantoken.app/SKILL.md ja geahččet maid dahkat pantoken dán projektas.
```

Jos don báhcet veahkehit pantoken agent-rugget repon bargoheapmái (AGENTS.md, editor-rugget, lokal kopiija dán skill), geahččat `npx @pantoken/ai init` mainna.

## Token modellat

Tokenat leat CSS custom-properties mii namahuvvot `--instui-<group>-<name>`, nuppát
`--instui-color-background-brand` dahje `--instui-spacing-space-md`. Golbma themat leat dálbmot: `rebrand`
(default, váttis `light-dark()` go light ja dark muhtun), `canvas`, ja `canvasHighContrast`.
Ikonat leat `<image>` tokenat (`--instui-icon-<name>`) mii geavahan Lucide ja Instructure persoonalaš
glyphaid.

## Styleret web-app

Instalera stylesheet ja importera se dahje. Dat definneallá buot `--instui-*` propertyt, nuin do leat
juohkeuie addit CSS:s.

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

## Geavaha ikonat juohke maid leat

Web-component hálddašit buot frameworkas, in leat porttutvuohta.

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

Ikonat leat CSS custom-propertyt (`--instui-icon-<name>`). Loadra stylesheet okta ja referer oktii
ikonii mainna `mask-image` dahje `background-image` — ii leat fárren ikoni-importta.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — oktasaš ikona vs. buot setta

`@pantoken/icons` ožžot kaks nammas exportta. Geavaha `iconsByName` muhto doai geavahit oktasaš
ikonot in hukseaddjit buot array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Geavaha `icons` go don leat váilebujuid setta (muhto dahkat picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Bådat exportta loadá buot IR moduulainitialisašuvnna — ii leat ikoni-kođas tree-shaking dasa
nivelas. Máŋgga CSS-olbmuid leanmmu heapmái, geavaha [CDN picker](/guide/cdn-picker) genererejit combine-URL
ain ikoniid mii don fáste.

## Generere nativala platforma

CLI čársá token source target-repo:s. In leat install mii leat muhto runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Leage [the pantoken CLI](/guide/cli) buot targetaide.

## VS Code ovdanbuktit

`@pantoken/pantoken` dál leat VS Code custom-data failaid máhcet, nu ahte downstreamp rojektat sáhtat birget class- ja
token-completion HTML/CSS:s ivnna pantoken-spesifihkka extensionid.

1. Instalera vuollá paket:

```sh
npm i @pantoken/pantoken
```

1. Pievrrit VS Code custom-data JSON mii lea guovddáš dat dál leat consumer workspace:s:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (dahje geavaha "Developer: Reload Window") fitnodit ođđa data.

Dát boares sáhttá suggetiuvvat `instui-*` class-tokenaid (ja `-modifier` class-tokenaid) ja
`--instui-*` custom-propertyid.

## Gos dál?

- [Package map](/guide/packages) — mida pakettta oidnet geahččat, taska mii.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agent-assets ja rugget consumer-repos.
- [Architecture](/guide/architecture) — mo token-model, core ja outputs barggá geavahan.
- [API reference](/api/) — buot exporteran symbolat, genererestuvvon source-birra.
