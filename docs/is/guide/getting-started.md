# Komast af stað

Pantoken tekur hönnunarmerki og táknin frá [Instructure UI](https://instructure.design), leysir þau einu sinni og umbreytir þeirri einu
líkani í pakkningar fyrir mörg vettvang: hreinar stílblaðskrár, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, innfædda Swift og Kotlin, WordPress og Drupal, Figma og fleira.

Setja þarf upp minnsta pakkann sem hentar verkefninu. Allt er einnig endurflutt í sameinuðu
`pantoken` pakkanum, svo hægt er að byrja þar og þrengja síðar.

## Búa til upphafsverkefni

Hraðasta leiðin til að prófa pantoken: búa til upphafsverkefni með því þegar uppsett og tengt.

```sh
npx create-pantoken-app
```

Vettvangar: `components` (hreint HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjá
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) fyrir `--dir <path>` og
forritanlega notkun.

Nota AI kóðunaraðstoð? Engin uppsetning þarf — bendið henni á færnina beint:

```prompt
Sækdu create.pantoken.app/SKILL.md og fylgdu því til að setja upp pantoken í þessu verkefni.
```

Ef kjósa má að festa pantoken's agent-reglur í geymsluvaran varanlega (AGENTS.md, ritstjóra reglur, staðbundin afrit af þessari færni), keyra `npx @pantoken/ai init` í staðinn.

## Táknalíkanið

Tákn eru CSS sérsniðnar breytur nefndar `--instui-<group>-<name>`, til dæmis
`--instui-color-background-brand` eða `--instui-spacing-space-md`. Þrjár þemu fylgja: `rebrand`
(ættarbúnaðurinn, með `light-dark()` þar sem ljós og dökk skilja sig), `canvas`, og `canvasHighContrast`.
Tákn fyrir táknmyndir eru `<image>` tákn (`--instui-icon-<name>`) dregin frá Lucide auk sérsniðinna
stafrófa Instructure.

## Styla vefforrit

Setjið inn stílblaðið og flytjið það inn einu sinni. Það skilgreinir allar `--instui-*` breytur, svo hægt er að vísa
í þær beint úr eigin CSS.

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

Vefhlutinn virkar í hvaða ramma sem er, án portunar.

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

Tákn eru CSS sérsniðnar breytur (`--instui-icon-<name>`). Hlaðið stílblaðinu einu sinni og vísið í hvaða
tákn sem er sem `mask-image` eða `background-image` — engin innflutningur á tákni-við-tákni þarf.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — eitt tákn vs. allt sett

`@pantoken/icons` býður upp á tvö nafnbundin útflut: Notið `iconsByName` til að ná í eitt tákn án þess að ganga
í gegnum allan fylkið:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Notið `icons` þegar þörf er á öllu settinu (t.d. til að byggja upp valmynd):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Bæði útflut hlaða upp fullu IR við upphaf eininga — engin tréesmíð fyrir einstök tákn á þessu stigi. Fyrir létta CSS-eina hleðslu, notið [CDN picker](/guide/cdn-picker) til að mynda sameinaða slóð
fyrir aðeins þau tákn sem þið þurfið.

## Mynda fyrir innfædan vettvang

CLI skrifar táknauppsprettu inn í markgeymslu. Engin uppsetning þarf fyrir utan keyranda:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjá [pantoken CLI](/guide/cli) fyrir alla markþætti.

## VS Code ritunarleiðbeiningar

`@pantoken/pantoken` sendir nú með sér VS Code custom-data skrár svo neytendaverkefni geti fengið flokks- og
táknlokun í HTML/CSS án þess að setja upp pantoken-sértæka viðbót.

1. Setjið upp sameinaða pakkann:

```sh
npm i @pantoken/pantoken
```

1. Bendið VS Code á afhenta custom-data JSON úr neytendaverkefninu:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Endurhlaðið VS Code (eða keyrið "Developer: Reload Window") til að virkja nýju gögnin.

Þetta virkjar tillögur fyrir `instui-*` flokkatákn (og `-modifier` flokkatákn) auk
`--instui-*` sérsniðinna breyta.

## Hvert á að fara næst

- [Pakkakortið](/api/) — hvaða pakki hentar fyrir hvaða verkefni.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — setjið upp agent-eignir og reglur í neytendageymslu.
- [Arkitektúr](/guide/architecture) — hvernig táknalíkanið, kjarni og úttak passa saman.
- [API heimild](/api/) — hver táknaður útfluttur tákni, myndaður úr kóðanum.
