# Սկսում ենք

Pantoken վերցնում է [Instructure UI](https://instructure.design) դիզայն տոկեններն ու պատկերակները, լուծում դրանք մեկ անգամ, և այն մեկ
մոդելը վերածում է բազմաթիվ պլատֆորմների համար նախատեսված փաթեթների՝ սովորական ոճաթղթեր, SCSS և Less, React և Vue և Svelte,
Tailwind և Panda, բնիկ Swift ու Kotlin, WordPress և Drupal, Figma և այլն։

Տեղադրում եք ամենափոքր փաթեթը, որը համապատասխան է ձեր խնդրին։ Քայլը-քայլով ամեն ինչ նաև ապտ(exports)ցվում է միավորված
`pantoken` փաթեթի կողմից, այնպես որ կարող եք սկսել այնտեղից ու հետո վերստին նեղացնել ընտրությունը։

## Սկելետային (scaffold) սկսարար նախագիծ

Ամենաարագ միջոցը pantoken փորձելու համար՝ scaffold անել սկսարար նախագիծ, որտեղ այն արդեն տեղադրված և միացված է։

```sh
npx create-pantoken-app
```

Պլատֆորմներ՝ `components` (սովորական HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Տեսեք
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)՝ համար `--dir <path>` և
պրոգրամավորված օգտագործման համար։

Օգտագործում եք AI կոդագրման գործակալ՞ Ոչ մի տեղադրում պետք չէ — ուղղեք այն անմիջապես հմտությանը՝

```prompt
Ներբեռնեք create.pantoken.app/SKILL.md և հետևեք այնտեղ գրված հրահանգներին՝ որպեսզի տեղադրեք pantoken այս նախագծում.
```

Եթե ցանկանում եք pantoken-ի գործակալային կանոնները փակցնել պահեստներում (AGENTS.md, editor կանոններ, այս հմտության տեղացին պատճեն) մշտապես, աշխատացրեք `npx @pantoken/ai init` փոխարեն։

## Տոկենների մոդել

Տոկենները CSS-ի կոստոմ պրոպերտիներ են՝ անվանված `--instui-<group>-<name>`-ով, օրինակ
`--instui-color-background-brand` կամ `--instui-spacing-space-md`. Պատմություններն (themes) երեքն են՝ `rebrand`
(նախնականը, `light-dark()`-ով երբ լայթն ու դարկը տարբեր են), `canvas`, և `canvasHighContrast`.
Պիկտոգրամները (icons) `<image>` տոկեններ են (`--instui-icon-<name>`), որոնք աճեցված են Lucide-ից և Instructure-ի հարմարեցված գլիֆներից։

## Վեբ հավելվածի ոճավորում

Տեղադրեքstylesheet-ը և ներմուծեք այն մեկ անգամ։ Այն սահմանում է յուրաքանչյուր `--instui-*` պրոպերտին, այնպես որ կարող եք ուղղակիորեն հղում տալ դրանց ձեր սեփական CSS-ում։

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

## Օգտագործեք պատկերակները որտեղ ասեք

Վեբ կոմպոնենտը աշխատում է ցանկացած ֆրեյիմրքում՝ առանց պորտավորման։

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

Պատկերակները CSS կոստոմ պրոպերտիներ են (`--instui-icon-<name>`). Լoad արեք stylesheet-ը մեկ անգամ և հղվեք ցանկացած
պատկերակի որպես `mask-image` կամ `background-image` — հատուկ ամեն-պատկերակի ներմուծում հարկավոր չէ։

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — մեկ պատկերակ ընդդեմ ամբողջ հավաքականի

`@pantoken/icons` բացում է երկու անունավորված export-ներ։ Օգտագործեք `iconsByName` մեկ պատկերակ ներմուծելու համար առանց ամբողջ զանգվածի շրջանցման․

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Օգտագործեք `icons` երբ ձեզ պետք է ամբողջ հավաքը (օր.՝ ընտրիչ կառուցելու համար)․

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Երկու export-ները մոդուլի ինիշիալիզացիայի պահի ամբողջ IR-ը լցնում են — այս մակարդակում առանձին պատկերակների համար tree-shaking չի կատարվում։ CSS-միայն բարակ բեռի համար օգտագործեք [CDN picker](/guide/cdn-picker)-ը՝ համար միայն ձեզ հարկավոր պատկերակների համակցված URL գեներացնելու։

## Ստեղծել բերվածություն (generate) բնիկ պլատֆորմի համար

CLI-ն գրում է տոկենների աղբյուրը նպատակյան 저장repo-ի մեջ։ Ոչինչ բացի գործավարից տեղադրելու չկա։

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Տեսեք [pantoken CLI](/guide/cli)-ը յուրաքանչյուր թիրախի համար։

## VS Code կազմողության խորհուրդներ

`@pantoken/pantoken` այժմ ուղարկում է VS Code-ի custom-data ֆայլեր, որպեսզի զամբյուղող նախագիծները ստանան class և
token լրացումներ HTML/CSS-ում առանց pantoken-ման հատուկ ընդլայնման տեղադրման։

1. Տեղադրեք միավորված փաթեթը՝

```sh
npm i @pantoken/pantoken
```

1. Վկայացրեք VS Code-ին ձեր սպառող աշխատանքային տարածքից ուղարկված custom-data JSON-ին։

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Պুনա/վերալիցքեք VS Code (կամ բացեք "Developer: Reload Window") նոր տվյալները կիրառելու համար։

Սա միացնում է առաջարկները `instui-*` class տոկենների (և `-modifier` class տոկենների) և
`--instui-*` կոստոմ պրոպերտիների համար։

## Ապագայում ուր

- [Փաթեթների քարտեզը](/api/) — ինչ փաթեթը փոխարկել՝ ըստ աշխատանքի։
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — տեղադրեք գործակալային աճյունները և կանոնները սպառող repo-ում։
- [Արհիտեքտուրա](/guide/architecture) — ինչպես տոկենային մոդելը, հիմնը և ելքերը համընկնում են։
- [API հղումն](/api/) — յուրաքանչյուր արտածված սիմվոլ, գեներացված աղբյուրից։
