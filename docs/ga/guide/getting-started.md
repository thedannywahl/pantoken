# Ag tosú

Tógann Pantoken na [Instructure UI](https://instructure.design) dearaidh thokain agus íocóin, réitíonn siad uair amháin, agus athformáideann an múnla sin go pacáistí do go leor ardán: stíleanna íon, SCSS agus Less, React agus Vue agus Svelte, Tailwind agus Panda, Swift agus Kotlin dúchasacha, WordPress agus Drupal, Figma, agus níos mó.

Suiteáil an pacáiste is lú a oireann don tasc. Tá gach rud ath-easpórtáilte freisin ag an
pacáiste comhtháite `pantoken`, mar sin is féidir tú tosú ansin agus é a chúngú níos déanaí.

## Scafáil tionscadal tosaigh

An bealach is tapúla chun Pantoken a thriail: scafáil tionscadal tosaigh leis cheana féin suiteáilte agus ceangailte.

```sh
npx create-pantoken-app
```

Ardáin: `components` (HTML/CSS íon), `react`, `vue`, `svelte`, `web-components`, `angular`. Féach
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) le haghaidh `--dir <path>` agus
úsáid chlárúcháin.

Ag úsáid gníomhaire cóidithe AI? Níl gá le suiteáil — tabhair an scil dó go díreach:

```prompt
Faigh create.pantoken.app/SKILL.md agus lean é chun pantoken a shocrú sa tionscadal seo.
```

Má theastaíonn uait rialacha gníomhaire Pantoken a cheangal go buan isteach sa repo (AGENTS.md, rialacha eagarthóra, cóip áitiúil den scil seo), rith `npx @pantoken/ai init` ina ionad.

## An mhúnla toicín

Is sainairíonna custaim CSS iad toicíní darbh ainm `--instui-<group>-<name>`, mar shampla
`--instui-color-background-brand` nó `--instui-spacing-space-md`. Tá trí theama ann: `rebrand`
(an réamhshocrú, le `light-dark()` áit a bhfuil éadrom agus dorcha éagsúil), `canvas`, agus `canvasHighContrast`.
Is toicíní `<image>` iad íocóin (`--instui-icon-<name>`) a dhéantar ó Lucide plus gálaí saincheaptha Instructure.

## Stíliú aip ghréasáin

Suiteáil an stíleabhján agus iompórtáil é uair amháin. Sainmhíníonn sé gach maoin `--instui-*`, mar sin tagraíonn tú dóibh go díreach ó do CSS féin.

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

Oibríonn an comhéadan gréasáin i ngach fráma oibre, gan aon aistriú riachtanach.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Toicíní CSS

Is sainairíonna custaim CSS iad íocóin (`--instui-icon-<name>`). Lódáil an stíleabhján uair amháin agus tagraigh do íocón ar bith mar `mask-image` nó `background-image` — níl gá le iompórtáil in aghaidh an íocóin.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — íocón aonair vs. an tacar iomlán

Tugann `@pantoken/icons` dhá easpórtáil ainmniúcháin. Úsáid `iconsByName` chun íocón amháin a tharraingt gan an t-ord iomlán a phléascadh:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Úsáid `icons` nuair is gá duit an tacar iomlán (m.sh. chun picéir a thógáil):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Lódálann an dá easpórtáil an IR iomlán ag tosaigh an mhodúil — níl aon tree-shaking in aghaidh iníon-íocóin ag an leibhéal seo. Chun luchtú tanaí bunaithe ar CSS amháin, bain úsáid as an [CDN picker](/guide/cdn-picker) chun URL comhiomlán a ghiniúint le haghaidh na n-íocón amháin a theastaíonn uait.

## Giniúint do ardán dúchasach

Scríobhann an CLI foinse toicín isteach i repo sprioc. Níl aon shuiteáil de dhíth seachas an rithí:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Féach [an pantoken CLI](/guide/cli) do gach sprioc.

## Leideanna údarúcháin VS Code

Seolann `@pantoken/pantoken` comhaid sonraí saincheaptha VS Code anois ionas gur féidir le tionscadail thíos-srutha gnéithe agus comhlánaigh toicín a fháil i HTML/CSS gan síneadh pantoken sonraichte a shuiteáil.

1. Suiteáil an pacáiste comhtháite:

```sh
npm i @pantoken/pantoken
```

1. Táscair VS Code chuig an JSON sonraí saincheaptha seolta ó do spás oibre tomhaltóra:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Athlódáil VS Code (nó rith "Developer: Reload Window") chun an t-eolas nua a chur i bhfeidhm.

Cuireann seo moltaí ar fáil do thóicíní rang `instui-*` (agus thóicíní rang `-modifier`) chomh maith le sainairíonna custaim `--instui-*`.

## Cá le dul ina dhiaidh

- [An léarscáil pacáistigh](/api/) — cén pacáiste le roghnú, de réir tasc.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — suiteáil sócmhainní gníomhaire agus rialacha i repo tomhaltóra.
- [Ailtireacht](/guide/architecture) — conas a oireann an mhúnla toicín, an croí, agus na aschuir le chéile.
- [Tagairt API](/api/) — gach siombail easpórtáilte, ginte ón bhfoinse.
