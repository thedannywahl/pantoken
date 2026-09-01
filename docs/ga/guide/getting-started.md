# Ag tosú

Tógann pantoken deonaí dearadh agus íomhánna Instructure UI, réitíonn iad uair amháin, agus athmhúnlaíonn an t-aon mhúnla sin isteach i bhoscaí pacáistithe do iliomad ardán: stíleanna simplí, SCSS agus Less, React agus Vue agus Svelte, Tailwind agus Panda, Swift agus Kotlin dúchais, WordPress agus Drupal, Figma, agus tuilleadh.

Suiteáil an pacáiste is lú a oireann don tasc. Tá gach rud ath-onnmhairithe freisin ag an `pantoken` pacáiste comhtháite, mar sin is féidir tosú ann agus é a chruinneachadh níos déanaí.

## Scafáil tionscadal tosaigh

Is é an bealach is tapúla chun pantoken a thriail: scafáil tionscadal tosaigh leis suiteáilte agus nascaithe cheana.

```sh
npx create-pantoken-app react
```

Ardáin: `components` (HTML/CSS shimplí), `react`, `vue`, `svelte`, `web-components`, `angular`. Féach
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) le haghaidh `--dir <path>` agus
úsáid chlárnach.

Ag baint úsáide as gníomhaire códúcháin AI? Níl aon shuiteáil ag teastáil — dírigh é chuig an scil go díreach:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Oibríonn sé ar an mbealach céanna do Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, agus Amazon Q
Developer CLI — cuir `claude` in ionad `gemini`, `agent`, `codex`, `copilot -p`, nó `q chat`. Má tá tú
ag iarraidh rialacha gníomhaire pantoken a nascadh go buan isteach sa stór (AGENTS.md, rialacha eagarthóra, cóip áitiúil
den scil seo), rith `npx @pantoken/ai init` ina ionad.

## An samhail token

Is sainairíonna sainchustaim CSS iad tokenanna darb ainm `--instui-<group>-<name>`, mar shampla
`--instui-color-background-brand` nó `--instui-spacing-space-md`. Tá trí théama san áireamh: `rebrand`
(an réamhshocrú, le `light-dark()` áit a bhfuil éadrom agus dorcha difriúil), `canvas`, agus `canvasHighContrast`.
Is iad na híomhánna ná tokenanna `<image>` (`--instui-icon-<name>`) a dhéantar ó Lucide chomh maith le glyphs saincheaptha Instructure.

## Stíliú aipe gréasáin

Suiteáil an stíleálaí agus allmhairigh é uair amháin. Déanann sé gach airíonna `--instui-*` a shainiú, mar sin tagraíonn tú dóibh go díreach ó do chuid CSS féin.

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

## Úsáid íomhánna áit ar bith

Oibríonn an comhlacht gréasáin in aon fhráma, gan aon phortáil.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokenanna CSS

Is sainairíonna sainchustaim CSS iad íomhánna (`--instui-icon-<name>`). Lódáil an stíleálaí uair amháin agus tagair do aon íomhá mar `mask-image` nó `background-image` — níl gá le allmhairiú in aghaidh na h-íomhá.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — íomhá singil vs. an tacar iomlán

Tugann `@pantoken/icons` dhá onnmhairiú ainmniúcháin. Úsáid `iconsByName` chun íomhá amháin a tharraingt gan an t-eagar iomlán a thrasnú:

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

Lódálann an dá onnmhairiú an IR iomlán ag tús an mhodúil — níl aon shruthchrithtiú crann-chomhartha in aghaidh na h-íomhá ag an leibhéal seo. Chun lódáil caol CSS-amháin, úsáid an roghnóir CDN [CDN picker](/guide/cdn-picker) chun URL chomhcheangailte a ghiniúint don íomhánna a theastaíonn uait amháin.

## Gineadh do ardán dúchais

Scríobhann an CLI foinse token isteach i stór sprioc. Níl aon shuiteáil seachas an rithéir:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Féach [an pantoken CLI](/guide/cli) le haghaidh gach sprioc.

## Leideanna údair VS Code

Seolann `@pantoken/pantoken` comhaid sonraí saincheaptha VS Code anois ionas gur féidir le tionscadail íseal-sreafa fáiltiú rang agus
comhlacht token i HTML/CSS gan síneadh pantoken-sainithe a shuiteáil.

1. Suiteáil an pacáiste comhtháite:

```sh
npm i @pantoken/pantoken
```

1. Dírigh VS Code ar an JSON sonraí saincheaptha a sheolfar ó do spás oibre tomhaltóra:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Athlódáil VS Code (nó rith "Developer: Reload Window") chun na sonraí nua a chur i bhfeidhm.

Ligeann sé seo moltaí do token clasa `instui-*` (agus token clasa `-modifier`) chomh maith le
sainairíonna `--instui-*`.

## Cá eile le dul

- [An léarscáil pacáiste](/guide/packages) — cén pacáiste atá le bhaint amach, de réir tasc.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — suiteáil suntasanna agus rialacha gníomhaire i stór tomhaltóra.
- [Ailtireacht](/guide/architecture) — conas a théann an samhail token, core, agus aschuir le chéile.
- [TagReferencia API](/api/) — gach siombail onnmhairithe, ginte ón bhfoinse.
