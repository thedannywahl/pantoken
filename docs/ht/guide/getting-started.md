# Kòmanse

pantoken pran token konsepsyon ak ikon Instructure UI yo, rezoud yo yon sèl fwa, epi refòme modèl sa a an pakè pou plizyè platfòm: fichye stil senp, SCSS ak Less, React ak Vue ak Svelte, Tailwind ak Panda, natif Swift ak Kotlin, WordPress ak Drupal, Figma, ak plis ankò.

Enstale pi piti pake ki adapte ak travay ou. Tout bagay tou re-ekspòte pa pake inifye `pantoken`, kidonk ou ka kòmanse la epi rafine pita.

## Kreye yon pwojè demaraj

Pi rapid fason pou eseye pantoken: eskafòldyè yon pwojè demaraj ak li deja enstale ak konekte.

```sh
npx create-pantoken-app react
```

Platfòm: `components` (HTML/CSS senp), `react`, `vue`, `svelte`, `web-components`, `angular`. Gade
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) pou `--dir <path>` ak
itikilasyon pwogramatik.

W ap itilize yon ajan kodaj AI? Pa bezwen enstalasyon — dirije li sou kapasite a dirèkteman:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Fonksyone menm jan pou Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, ak Amazon Q
Developer CLI — ranplase `claude` ak `gemini`, `agent`, `codex`, `copilot -p`, oswa `q chat`. Si ou pito konekte règleman ajan pantoken yo nan depo a pèmanan (AGENTS.md, règleman editè, yon kopi lokal
nan kapasite sa a), kouri `npx @pantoken/ai init` olye.

## Modèl token la

Token yo se pwopriyete koutim CSS ki rele `--instui-<group>-<name>`, pa egzanp
`--instui-color-background-brand` oswa `--instui-spacing-space-md`. Twa tèm parèt: `rebrand`
(defo a, ak `light-dark()` kote limyè ak fènwa diferan), `canvas`, ak `canvasHighContrast`.
Ikon yo se token `<image>` (`--instui-icon-<name>`) sòti nan Lucide plis glyf koutim
Instructure yo.

## Style yon aplikasyon web

Enstale fichye stil la epi enpòte li yon sèl fwa. Li defini chak pwopriyete `--instui-*`, kidonk ou ka refere
yo dirèkteman nan pwòp CSS ou.

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

## Itilize ikon nenpòt kote

Konpozan web la mache nan nenpòt kad (framework), san okenn pòte.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Token CSS

Ikon yo se pwopriyete koutim CSS (`--instui-icon-<name>`). Chaje fichye stil la yon sèl fwa epi refere nenpòt
ikon kòm yon `mask-image` oswa `background-image` — pa gen bezwen enpòte pou chak ikon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — yon sèl ikon kont tout ansanm lan

`@pantoken/icons` ekspoze de ekspòt nonmen. Sèvi ak `iconsByName` pou rale yon ikon san ou pa iterate
tout tablo a:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Sèvi ak `icons` lè ou bezwen tout ansanm lan (egzanp pou konstwi yon selector):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Tou de ekspòt yo chaje IR konplè a nan inisyalizasyon modil la — pa gen tree-shaking sou chak ikon nan
nivèl sa a. Pou chajman ki lejè sèlman ak CSS, sèvi ak [CDN picker](/guide/cdn-picker) pou jenere yon URL konbine
pou sèlman ikon ou bezwen yo.

## Jenere pou yon platfòm natif

CLI a ekri sous token nan yon depo sib. Pa gen okenn enstalasyon depase kouri a:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gade [pantoken CLI a](/guide/cli) pou chak sib.

## Konsèy otè VS Code

`@pantoken/pantoken` kounye a voye dosye done koutim VS Code se konsa pwojè konsomatè ka jwenn konplesyon klas ak
token nan HTML/CSS san yo pa enstale yon ekstansyon espesifik pantoken.

1. Enstale pake inifye a:

```sh
npm i @pantoken/pantoken
```

1. Pwen VS Code sou JSON done koutim ki voye a soti nan espas travay konsomatè ou:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reychaje VS Code (oswa kouri "Developer: Reload Window") pou aplike nouvo done yo.

Sa pèmèt sijesyon pou token klas `instui-*` (ak token klas `-modifier`) ansanm ak
pwopriyete koutim `--instui-*`.

## Kote pou ale apre

- [Kat pake yo](/guide/packages) — ki pake pou itilize, selon travay la.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — enstale resous ajan ak règleman nan yon depo konsomatè.
- [Achitekti](/guide/architecture) — kijan modèl token, nwayo, ak rezilta yo anfòm ansanm.
- [Referans API](/api/) — chak senbòl ekspòte, jenere soti nan sous la.
