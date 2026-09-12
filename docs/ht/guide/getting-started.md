# Kòmanse

Pantoken pran token konsepsyon ak ikon [Instructure UI](https://instructure.design), rezoud yo yon fwa, epi re-fòme modèl sa a an pakè pou plizyè platfòm: fichye stil senp, SCSS ak Less, React ak Vue ak Svelte, Tailwind ak Panda, natif Swift ak Kotlin, WordPress ak Drupal, Figma, ak plis ankò.

Enstale pi piti pake ki adapte ak travay ou. Tout bagay tou re-ekspòte pa pake ini `pantoken`, kidonk ou ka kòmanse la epi rafine pita.

## Kreye yon pwojè demaraj

Fason ki pi rapid pou eseye pantoken: kreye yon pwojè demaraj avèk li deja enstale ak konekte.

```sh
npx create-pantoken-app
```

Platfòm: `components` (HTML/CSS senp), `react`, `vue`, `svelte`, `web-components`, `angular`. Gade
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) pou `--dir <path>` ak
itilizasyon pwogramatik.

Sèvi ak yon ajan kòd AI? Pa bezwen enstalasyon — montre li konpetans la dirèkteman:

```prompt
Rale create.pantoken.app/SKILL.md epi swiv li pou configured pantoken nan pwojè sa a.
```

Si ou prefere konekte règ ajan pantoken yo nan repozitwa a pèmananman (AGENTS.md, règ editè, yon kopi lokal nan konpetans sa a), kouri `npx @pantoken/ai init` olye.

## Modèl token an

Tokens yo se pwopriyete koutim CSS ki rele `--instui-<group>-<name>`, pa egzanp
`--instui-color-background-brand` oswa `--instui-spacing-space-md`. Twa tèm vini ak li: `rebrand`
(defo a, ak `light-dark()` kote limyè ak fè nwa diferan), `canvas`, ak `canvasHighContrast`.
Ikon yo se tokens `<image>` (`--instui-icon-<name>`) sòti nan Lucide plis glyph koutim Instructure.

## Fòme yon aplikasyon wèb

Enstale fichye stil la epi enpòte li yon sèl fwa. Li defini chak pwopriyete `--instui-*`, kidonk ou refere yo dirèkteman soti nan pwòp CSS ou.

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

## Sèvi ak ikon nenpòt kote

Konpozan wèb la mache nan nenpòt kad, san okenn pòting.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Ikon yo se pwopriyete koutim CSS (`--instui-icon-<name>`). Chaje fichye stil la yon sèl fwa epi refere nenpòt
ikon kòm yon `mask-image` oswa `background-image` — pa bezwen enpòte chak ikon separeman.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — yon sèl ikon kont tout seri a

`@pantoken/icons` ekspoze de ekspòtasyon nonmen. Sèvi ak `iconsByName` pou rale yon ikon san iterate
tout tablo a:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Sèvi ak `icons` lè ou bezwen tout seri a (egzanp pou konstwi yon chwazi):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Toude ekspòtasyon yo chaje IR konplè a nan inisyalizasyon modil la — pa gen tree-shaking pa-ikon nan nivo sa a. Pou chajman mens sèlman CSS, itilize [CDN picker](/guide/cdn-picker) pou jenere yon URL konbine
pou sèlman ikon ou bezwen yo.

## Jenere pou yon platfòm natif

CLI a ekri sous token nan yon repozitwa sib. Pa gen enstalasyon depase kouriè a:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gade [pantoken CLI](/guide/cli) pou chak sib.

## Konsèy ekriti VS Code

`@pantoken/pantoken` kounye a vini ak fichye done-personalize VS Code pou pwojè konsomatè ka jwenn konplèsyon klas ak
token nan HTML/CSS san yo pa enstale yon ekstansyon espesifik pantoken.

1. Enstale pake ini a:

```sh
npm i @pantoken/pantoken
```

1. Montre VS Code fichye JSON done-personalize ki te anbake a depi espas travay konsomatè w la:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Rekòmanse VS Code (oswa kouri "Developer: Reload Window") pou aplike nouvo done yo.

Sa pèmèt sijesyon pou token klas `instui-*` (ak token klas `-modifier`) plis
pwopriyete koutim `--instui-*`.

## Ki kote pou ale apre

- [Kat pake a](/api/) — ki pake pou itilize, selon travay la.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — enstale byen ak règ ajan yo nan yon repozitwa konsomatè.
- [Achitekti](/guide/architecture) — kijan modèl token, kè a, ak rezilta yo anfòm ansanm.
- [Referans API](/api/) — chak senbòl ekspòte, jenere soti nan sous la.
