# Սկիզբ

pantoken-ը վերցնում է Instructure UI-ի դիզայնի տոկենները և պատկերակները, լուծում է դրանք մեկ անգամ և այդ մեկ մոդելը վերաձևավորում է բազմաթիվ հարթակների համար՝ սովորական ոճաթերթեր, SCSS և Less, React և Vue և Svelte, Tailwind և Panda, տեղական Swift և Kotlin, WordPress և Drupal, Figma և այլն։

Տեղադրեք այն ամենափոքր փաթեթը, որը համապատասխանում է ձեր խնդրին։ Բոլորը նաև վերարտահանվում են միավորված `pantoken` փաթեթով, այդպիսով կարող եք սկսել այնտեղից և հետագայում նեղացնել ընտրությունը։

## Սկիզբի նախագիծ scaffolding

Ամենաարագ ձևը pantoken-ը փորձելու՝ scaffold անել սկսնակ նախագիծ, որտեղ այն արդեն տեղադրված և կապված է։

```sh
npx create-pantoken-app react
```

Հարթակներ՝ `components` (ամբողջական HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. ՀՏԵՂ [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)՝ `--dir <path>` և ծրագրային օգտագործման գործառույթների համար։

Օգտագործում եք AI կոդավորման գործակալ՞ — ոչ մի տեղադրում անհրաժեշտ չէ — ուղղեք նրան անմիջապես այս skill-ին։

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Այն նույն կերպ է աշխատում Gemini CLI‑ի, Cursor CLI‑ի, OpenAI Codex CLI‑ի, GitHub Copilot CLI‑ի և Amazon Q Developer CLI‑ի համար — փոխարինեք `claude`‑ը `gemini`, `agent`, `codex`, `copilot -p`, կամ `q chat`‑ով համապատասխանաբար։ Եթե նախընտրում եք pantoken-ի գործակալի կանոնները ներդնել պահապան կերպով ռեպոյում (AGENTS.md, խմբագրիչի կանոններ, այս skill-ի տեղական պատճեն), կիրառեք `npx @pantoken/ai init`։

## Տոկենների մոդելը

Տոկենները CSS-ի custom properties են, անունները `--instui-<group>-<name>`, օրինակ `--instui-color-background-brand` կամ `--instui-spacing-space-md`. Առաքվում են երեք թեմաներ՝ `rebrand` (ստանդարտը, որտեղ `light-dark()` տարբերություններ կան լույսի և մթության միջև), `canvas`, և `canvasHighContrast`։ Պիկտոգրամները `<image>` տոկեններ են (`--instui-icon-<name>`), որոնք مشتق են Lucide-ից և Instructure-ի հարմարեցված գրավներից։

## Վեբ հավելվածի ոճավորում

Տեղադրեք ոճաթերթը և ներմուծեք այն մեկ անգամ։ Այն սահմանում է բոլոր `--instui-*` հատկությունները, այնպես որ դրանք ուղղակիորեն կարող եք ճշգրտել ձեր սեփական CSS-ում։

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

## Պիկտոգրամները օգտագործել ցանկացած վայրում

Վեբ կոմպոնենտը աշխատում է ցանկացած ֆռեյմվորքում՝ առանց պորտական աշխատանքի։

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS տոկեններ

Պիկտոգրամները CSS custom properties են (`--instui-icon-<name>`)։ Լավաշեք ոճաթերթը մեկ անգամ և վերաբերվեք ցանկացած պիկտոգրամի որպես `mask-image` կամ `background-image` — մշտական առանձին ներմուծումների կարիք չկա։

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — մեկ պիկտոգրամ vs ամբողջ հավաքածու

`@pantoken/icons` բացում է երկու անունավորված արտահանող։ Օգտագործեք `iconsByName` մեկ պիկտոգրամ վերցնելու համար առանց ամբողջ զանգվածը թերթելու։

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Օգտագործեք `icons` երբ ձեզ պետք է ամբողջ հավաքածուն (օր․ ընտրիչ ստեղծելու համար)։

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Երկու արտահանումներն էլ բեռնում են ամբողջ IR‑ը մոդուլի ինիցիալիզացիայի ժամանակ — այս մակարդակում պեր‑պիկտոգրամի tree‑shaking չկա։ Հիդ բացարձակաբար CSS‑միայն բեռների համար օգտագործեք [CDN picker](/guide/cdn-picker)՝ միայն անհրաժեշտ պիկտոգրամների համակցված URL ստեղծելու համար։

## Ծնված որպես բնիկ հարթակ

CLI‑ն գրում է տոկենների աղբյուրը՝ նպատակային ռեպոյում։ Բացի ռաններից, տեղադրում անհրաժեշտ չէ։

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Տարբեր նպատակների համար տես [the pantoken CLI](/guide/cli)։

## VS Code հեղինակագրման հուշումներ

`@pantoken/pantoken` այժմ ուղարկում է VS Code‑ի custom-data ֆայլեր, որպեսզի սպառող նախագծերը կարողանան ստանալ class և token completion HTML/CSS-ում առանց pantoken‑ման հատուկ ընդլայնման տեղադրման։

1. Տեղադրեք միավորված փաթեթը՝

```sh
npm i @pantoken/pantoken
```

1. Նշեք VS Code‑ը այն ուղարկված custom-data JSON-ի վրա ձեր սպառողի workspace‑ից՝

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Արևացրեք VS Code‑ը (կամ চালեք "Developer: Reload Window")՝ նոր տվյալները կիրառելու համար։

Սա միացնում է առաջարկները `instui-*` class տոկենների (և `-modifier` class տոկենների) համար, ինչպես նաև `--instui-*` custom properties‑ի համար։

## Որտեղ հաջորդ

- [Փաթեթների քարտեզը](/guide/packages) — ինչ փաթեթը վերցնել՝ ըստ առաջադրանքի։
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ինստաղի գործակալային ակտիվներ և կանոններ տեղադրեք սպառող ռեպոյում։
- [Արթեկտուրա](/guide/architecture) — ինչպես տոկենների մոդելը, core‑ը և ելքերը համադրվում են։
- [API հղում](/api/) — բոլոր արտահանված սիմվոլները, գեներացված աղբյուրից։
