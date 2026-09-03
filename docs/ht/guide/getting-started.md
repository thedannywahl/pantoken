# Kòmanse

Pantoken pran tokèn konsepsyon ak ikon [Instructure UI](https://instructure.design), rezoud yo yon sèl fwa, epi re-fòme modèl sa a pou plizyè platfòm: feuille stil plenn, SCSS ak Less, React ak Vue ak Svelte, Tailwind ak Panda, natif Swift ak Kotlin, WordPress ak Drupal, Figma, ak plis ankò.

Enstale pake ki pi piti ki adapte ak travay ou. Tout bagay tou re-ekspòte pa pake inifye `pantoken`, kidonk ou ka kòmanse la epi reskonsantre pita.

## Kreye yon pwojè demaraj

Fason ki pi rapid pou eseye pantoken: eskafòld yon pwojè demaraj ki deja enstale ak konekte li.

```sh
npx create-pantoken-app
```

Platfòm: `components` (HTML/CSS plenn), `react`, `vue`, `svelte`, `web-components`, `angular`. Gade [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) pou `--dir <path>` ak itilizasyon pwogramatik.

Ap itilize yon ajan kodaj AI? Pa gen bezwen enstale — bay li aksè dirèkteman nan abilite a:

```prompt
Telechaje create.pantoken.app/SKILL.md epi swiv li pou mete pantoken nan pwojè sa a.
```

Si ou pito entegre règ ajan pantoken yo nan depo a pèmanan (AGENTS.md, règ editè, yon kopi lokal nan abilite sa a), kouri `npx @pantoken/ai init` olye.

## Modèl tokèn yo

Tokèn yo se pwopriyete koutim CSS ki rele `--instui-<group>-<name>`, pou egzanp `--instui-color-background-brand` oswa `--instui-spacing-space-md`. Twa tèm yo pibliye: `rebrand` (default la, ak `light-dark()` kote limyè ak fènwa diferan), `canvas`, ak `canvasHighContrast`. Ikon yo se tokèn `<image>` (`--instui-icon-<name>`) sòti nan Lucide plis glyf koutim Instructure yo.

## Stile yon aplikasyon wèb

Enstale stylesheet la epi enpòte li yon sèl fwa. Li defini chak pwopriyete `--instui-*`, kidonk ou ka refere yo dirèkteman soti nan pwòp CSS ou.

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

Web component la mache nan nenpòt kad, san okenn pòti.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokèn CSS

Ikon yo se pwopriyete koutim CSS (`--instui-icon-<name>`). Chaje stylesheet la yon sèl fwa epi refere nenpòt ikon kòm yon `mask-image` oswa `background-image` — pa bezwen enpòte chak ikon separeman.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ikon sèl vs. tout seri a

`@pantoken/icons` ekspoze de ekspòtasyon nonmen. Sèvi ak `iconsByName` pou rale yon sèl ikon san iterate sou tout tablo a:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Sèvi ak `icons` lè ou bezwen tout seri a (egzanp pou konstwi yon selektè):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Tou de ekspòtasyon yo chaje IR konplè a nan inisyalizasyon modil la — pa gen tree-shaking pa ikon nan nivo sa a. Pou chajman ki lejè sèlman ak CSS, itilize [CDN picker](/guide/cdn-picker) pou jenere yon URL konbine pou sèlman ikon ou bezwen yo.

## Jenere pou yon platfòm natif

CLI a ekri sous tokèn nan yon depo sib. Pa gen enstalasyon depase sa ki nesesè pou kouri li:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gade [the pantoken CLI](/guide/cli) pou chak sib.

## Konsèy otè VS Code

`@pantoken/pantoken` kounye a pibliye fichye done-custom VS Code pou pwojè konsomatè yo ka jwenn konplete klas ak tokèn nan HTML/CSS san yo pa enstale yon ekstansyon espesifik pantoken.

1. Enstale pake inifye a:

```sh
npm i @pantoken/pantoken
```

1. Pwen VS Code sou JSON done-custom ki voye a soti nan espas travay konsomatè ou:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Rekòmanse VS Code (oswa kouri "Developer: Reload Window") pou aplike nouvo done yo.

Sa pèmèt sijesyon pou tokèn klas `instui-*` (ak tokèn klas `-modifier`) plis pwopriyete koutim `--instui-*`.

## Ki kote pou ale pwochen

- [Kat pake a](/guide/packages) — ki pake pou chwazi selon travay la.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — enstale byen ak règ ajan nan yon depo konsomatè.
- [Achitekti](/guide/architecture) — kijan modèl tokèn, nwayo, ak rezilta yo anfòm ansanm.
- [Referans API](/api/) — chak senbòl ekspòte, jenere soti nan sous la.
