# Ag tosú

Tógann Pantoken na [Instructure UI](https://instructure.design) dearaidh thóacáin agus íocóin, réitíonn iad uair amháin, agus athmhúnlaíonn an tsamhail sin go pacáistí do go leor ardáin: stíleanna neamhshimplí, SCSS agus Less, React agus Vue agus Svelte, Tailwind agus Panda, Swift agus Kotlin dúchais, WordPress agus Drupal, Figma, agus níos mó.

Suiteáil an pacáiste is lú a oireann do do thasc. Tá gach rud ath-easpáilte freisin ag an `pantoken` pacáiste aontaithe, mar sin is féidir tosú ansin agus indirghabhálacha a dhéanamh níos déanaí.

## Scaffaldaigh tionscadal tosaigh

An bealach is tapúla chun Pantoken a thriail: scaffaldaigh tionscadal tosaigh leis suiteáilte agus ceangailte cheana.

```sh
npx create-pantoken-app
```

Árdáin: `components` (HTML/CSS shimplí), `react`, `vue`, `svelte`, `web-components`, `angular`. Féach [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) le haghaidh `--dir <path>` agus úsáid chlárúcháin.

Ag baint úsáide as gníomhaire cóid AI? Níl aon shuiteáil riachtanach — treoróidh tú é díreach ag an scil:

```prompt
Faigh create.pantoken.app/SKILL.md agus lean é chun pantoken a shocrú sa tionscadal seo.
```

Má theastaíonn uait rialacha gníomhaire Pantoken a fhrámaú sa stór go buan (AGENTS.md, rialacha eagarthóra, cóip áitiúil den scil seo), rith `npx @pantoken/ai init` ina ionad.

## An tsamhail thóacáin

Is maoine saincheaptha CSS iad tóacáin darb ainm `--instui-<group>-<name>`, mar shampla `--instui-color-background-brand` nó `--instui-spacing-space-md`. Tá trí théama san earrach: `rebrand` (an réamhshocraithe, le `light-dark()` áit a bhfuil éadrom agus dorcha difriúil), `canvas`, agus `canvasHighContrast`. Is tóacáin `<image>` iad íocóin (`--instui-icon-<name>`) a dhéantar as Lucide plus gníomhartha saincheaptha Instructure.

## Stíliú aip gréasáin

Suiteáil an stíleálaí agus iompórtáil é uair amháin. Sainmhíníonn sé gach maoin `--instui-*`, mar sin tagraigh dóibh go díreach ó do CSS féin.

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

## Úsáid íocóin áit ar bith

Oibríonn an comhpháirtghné gréasáin i ngach creatlach, gan aon athaithniú.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tóacáin CSS

Is maoine saincheaptha CSS iad íocóin (`--instui-icon-<name>`). Lucht an stíleálaí uair amháin agus tagraigh do aon íocón mar `mask-image` nó `background-image` — níl aon iompórtáil in aghaidh an íocóin de dhíth.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — íocón singil vs. tacar iomlán

Nochtann `@pantoken/icons` dhá easpórtáil ainmnithe. Úsáid `iconsByName` chun íocón amháin a tharraingt amach gan an t-iarratas iomlán a athrú:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Úsáid `icons` nuair is gá an tacar iomlán (m.sh. chun roghnóir a thógáil):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Lucht an dá easpórtáil an IR iomlán ag tosaigh an mhodúil — níl aon shlán-scriosadh crainn in aghaidh an íocóin ag an leibhéal seo. Chun luchtú caol CSS-amhail amháin, úsáid an [CDN picker](/guide/cdn-picker) chun URL comhdhlúite a ghiniúint do na híocóin a theastaíonn uait amháin.

## Gineadh do ardán dúchais

Scríobhann an CLI foinse thóacáin isteach i stór sprioc. Níl aon shuiteáil níos mó ná an rithéir:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Féach [an pantoken CLI](/guide/cli) le haghaidh gach sprioc.

## Leideanna eagarthóireachta VS Code

Tá `@pantoken/pantoken` anois ag gabháil comhaid sonraí saincheaptha VS Code chun go bhféadfadh tionscadail thíosshrutha comharthaí rang agus comhlachtaí thóacáin a fháil i HTML/CSS gan síneadh sonrach pantoken a shuiteáil.

1. Suiteáil an pacáiste aontaithe:

```sh
npm i @pantoken/pantoken
```

1. Léirigh VS Code ar an JSON sonraí saincheaptha atá seolta ó do spás tomhaltóra:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Athlódáil VS Code (nó rith "Developer: Reload Window") chun an sonraíocht nua a chur i bhfeidhm.

Cuirtear mholtaí ar fáil do thóacáin rang `instui-*` (agus tóacáin rang `-modifier`) chomh maith le maoine saincheaptha `--instui-*`.

## Cá chuig leanúint

- [Léarscáil an phacáiste](/guide/packages) — cén pacáiste a bhaint amach, de réir tasc.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — suiteáil acmhainní agus rialacha gníomhaire i stór tomhaltóra.
- [Ailtireacht](/guide/architecture) — conas a cheanglaíonn an tsamhail thóacáin, an croí, agus na aschuir le chéile.
- [Tagairt API](/api/) — gach siombail easpórtáilte, ginte ón fhoinse.
