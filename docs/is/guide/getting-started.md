# Komast af stað

Pantoken tekur hönnunarstákona og tákn frá [Instructure UI](https://instructure.design), leysir þau niður einu sinni og umbreytir þeirri einu
gerð í pakkninga fyrir marga vettvanga: hreinar stílsíður, SCSS og Less, React og Vue og Svelte,
Tailwind og Panda, innfædd Swift og Kotlin, WordPress og Drupal, Figma og fleira.

Setjið upp minnsta pakkann sem hentar ykkar verkefni. Allt er einnig endurflutt í sameinaða
`pantoken` pakkanum, svo hægt er að byrja þar og þrengja síðar.

## Setja upp grunnverkefni

Hraðasta leiðin til að prófa pantoken: setja upp grunnverkefni með því þegar það er uppsett og tengt inn.

```sh
npx create-pantoken-app
```

Vettvangar: `components` (hreint HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Sjá
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) fyrir `--dir <path>` og
forritunarnotkun.

Nota gervigreindarkóðaaðstoð? Engin uppsetning nauðsynleg — bendið henni beint á hæfileikann:

```prompt
Sækja create.pantoken.app/SKILL.md og fylgja því til að setja upp pantoken í þessu verkefni.
```

Ef frekar á að festa reglur pantoken fyrir fulla vinnu í geymslunni (AGENTS.md, ritlar reglur, staðbundin afrit af þessum hæfileika), keyrið `npx @pantoken/ai init` í staðinn.

## Token-líkanið

Tokens eru CSS sérsniðnar breytur nefndar `--instui-<group>-<name>`, til dæmis
`--instui-color-background-brand` eða `--instui-spacing-space-md`. Þrjár þemu fylgja: `rebrand`
(staðlað, með `light-dark()` þar sem ljós og dökkur verða ólík), `canvas`, og `canvasHighContrast`.
Táknin eru `<image>` tokens (`--instui-icon-<name>`) unnin úr Lucide auk sérsniðinna
gílyfa Instructure.

## Stíla vefforrit

Setjið upp stílsíðuna og innfluttið hana einu sinni. Hún skilgreinir hverja `--instui-*` eign, svo þið vísið
beint í þær úr ykkar eigin CSS.

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

Vefþátturinn virkar í hvaða ramma sem er, án aðlögunar.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tokens

Táknin eru CSS sérsniðnar breytur (`--instui-icon-<name>`). Hlaðið stílsíðunni einu sinni og vísið í hvaða
tákn sem er sem `mask-image` eða `background-image` — engin innflutningur á hverju tákni fyrir sig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — eitt tákn vs. allt sett

`@pantoken/icons` býður upp á tvö nafngreind útflutningsatriði. Notið `iconsByName` til að ná í eitt tákn án þess að fara í
gegnum alla fylkið:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Notið `icons` þegar þið þurfið allt settið (t.d. til að byggja valkassa):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Bæði útflutningsatriðin hlaða allan IR við upphaf modules — engin tréeyðing á einstökum táknum á þessu
stigi. Fyrir léttan, aðeins-CSS hleðslu, notið [CDN vöruveljara](/guide/cdn-picker) til að búa til sameinaða slóð
fyrir aðeins þau tákn sem þið þarfnist.

## Mynda fyrir innfæddan vettvang

CLI skrifar token-uppruna inn í markmið-geymslu. Engin uppsetning fyrir utan keyranda:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Sjá [pantoken CLI](/guide/cli) fyrir alla markmiðaútfærslur.

## VS Code ritunarábendingar

`@pantoken/pantoken` inniheldur nú VS Code custom-data skrár svo niðurstreymisverkefni geti fengið sjálfkláru fyrir flokka og
token í HTML/CSS án þess að setja upp sérstakt pantoken-viðbætur.

1. Setjið upp sameinaða pakkann:

```sh
npm i @pantoken/pantoken
```

1. Bendið VS Code á afhentar custom-data JSON skrár frá neytandaverkefninu ykkar:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Endurhleðið VS Code (eða keyrið "Developer: Reload Window") til að taka nýju gögnin í gildi.

Þetta gerir tillögur fyrir `instui-*` flokkatokens (og `-modifier` flokkatokens) auk
`--instui-*` sérsniðinna eiginleika kleift.

## Hvert næst

- [Pakkaakortið](/guide/packages) — hvaða pakkann á að ná í, eftir verkefni.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — setjið upp hæfileikaaðföng og reglur í neytandageymslu.
- [Arkitektúr](/guide/architecture) — hvernig token-líkan, kjarni, og útflutningar passa saman.
- [API tilvísun](/api/) — hvert útflutt tákn, framleitt úr upprunanum.
