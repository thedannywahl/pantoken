# Byrjaðu

pantoken tekur Instructure UI hönnunarmerki og tákn, leysir þau einu sinni og umbreytir því eina líkani í pakkningar fyrir marga vettvang: venjuleg stílsnið, SCSS og Less, React og Vue og Svelte, Tailwind og Panda, innfædd Swift og Kotlin, WordPress og Drupal, Figma, og fleira.

Settu upp minnsta pakkann sem hentar verkefninu þínu. Allt er einnig endurflutt í sameinaða `pantoken` pakkann, svo hægt er að byrja þar og þrengja niður síðar.

## Búa til byrjunarverkefni

Hraðasta leiðin til að prófa pantoken: búa til byrjunarverkefni þar sem það er þegar uppsett og tengt inn.

```sh
npx create-pantoken-app react
```

Vettvangar: `components` (venjulegt HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjá
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) fyrir `--dir <path>` og
forritunarnotkun.

Nota AI kóðunaraðstoð? Engin uppsetning þarf — bendið henni á hæfileikann beint:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Virkjar á sama hátt fyrir Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, og Amazon Q Developer CLI — skiptið `claude` út fyrir `gemini`, `agent`, `codex`, `copilot -p`, eða `q chat`. Ef óskað er eftir að tengja regluverk pantoken varanlega í geymsluna (AGENTS.md, ritstjóra reglur, staðbundin afrit af þessum hæfileika), keyrið `npx @pantoken/ai init` í staðinn.

## Líkanið fyrir táknin

Tákn eru CSS sérsniðnar eigindir nefndar `--instui-<group>-<name>`, til dæmis
`--instui-color-background-brand` eða `--instui-spacing-space-md`. Þrjú þemu fylgja með: `rebrand`
(sjálfgefið, með `light-dark()` þar sem ljós og dökkt eru mismunandi), `canvas`, og `canvasHighContrast`.
Táknin eru `<image>` tákn (`--instui-icon-<name>`) unnin úr Lucide auk sérsniðinna Instructure glyffa.

## Stíla vefforrit

Settu upp stílsnið og importaðu það einu sinni. Það skilgreinir allar `--instui-*` eigindir, þannig að þú vísað beint í þær úr þínum eigin CSS.

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

## Nota tákn hvar sem er

Vefíhluturinn virkar í hvaða ramma sem er, án endurportunar.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tákn

Tákn eru CSS sérsniðnar eigindir (`--instui-icon-<name>`). Hlaðið stílsniðinu einu sinni og vísið í hvaða
tákn sem er sem `mask-image` eða `background-image` — engin innflutningur á tákni þarf.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — eitt tákn vs. öll táknasafn

`@pantoken/icons` býður upp á tvö nefnd útflæði. Notið `iconsByName` til að sækja eitt tákn án þess að fara í gegnum
heila fylkið:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Notið `icons` þegar öll táknin þurfa að vera til staðar (t.d. til að byggja valkostavalkost):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Bæði útflæðin hlaða fulla IR við innleiðingu modules — engin per-tákn tré-hristingur á þessum
stigi. Fyrir létta aðeins-CSS hleðslu, notið [CDN valkosta](/guide/cdn-picker) til að búa til sameinað URL
fyrir aðeins þau tákn sem þú þarft.

## Útbúa fyrir innfæddan vettvang

CLI skrifar táknauppsprettu inn í markmið geymslu. Engin uppsetning umfram keyranda þarf:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjá [pantoken CLI](/guide/cli) fyrir alla markþætti.

## VS Code ritunarleiðbeiningar

`@pantoken/pantoken` sendir nú með sér VS Code custom-data skrár svo neytendaverkefni geti fengið flokk- og
táknfullkomnun í HTML/CSS án þess að setja upp pantoken-sértæka viðbót.

1. Settu upp sameinaða pakkann:

```sh
npm i @pantoken/pantoken
```

1. Bentu VS Code á send JSON custom-data frá neytendaverkefninu þínu:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Endurhleðslu VS Code (eða keyrðu "Developer: Reload Window") til að virkja nýju gögnin.

Þetta gerir tillögur fyrir `instui-*` flokktákn (og `-modifier` flokktákn) auk
`--instui-*` sérsniðinna eigna.

## Hvað næst

- [Pakka kortið](/guide/packages) — hvaða pakka á að nota eftir verkefni.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — settu upp hæfileika- og reglaskrár í neytendageymslu.
- [Arkitektúr](/guide/architecture) — hvernig táknalíkan, core og úttak passa saman.
- [API tilvísun](/api/) — hver táknaður útfluttur symbol, myndaður úr uppruna.
