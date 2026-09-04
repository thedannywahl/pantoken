# Սկսելու մասին

Pantoken վերցնում է [Instructure UI](https://instructure.design) դիզայնի տոկեններն ու պատկերակները, լուծում է դրանք մեկ անգամ, և այդ մեկ մոդելը վերածում է փաթեթների՝ բազմաթիվ հարթակների համար՝ պարզ ոճաթերթեր, SCSS և Less, React և Vue և Svelte, Tailwind և Panda, տեղական Swift և Kotlin, WordPress և Drupal, Figma և այլն։

Տեղադրում եք ամենափոքր փաթեթը, որը համապատասխանում է ձեր խնդրին։ Ամեն ինչ նաև վերաարտահանվում է միավորված `pantoken` փաթեթով, այնպես որ կարող եք սկսել այնտեղից և հետագայում հստակեցնել։

## Սկավանդել ստարտեր նախագիծ

Ամենարapid-ը pantoken-ը փորձելու համար՝ սկավանդել ստարտեր նախագիծ՝ այն արդեն տեղադրված և միացված վիճակում։

```sh
npx create-pantoken-app
```

Պլատֆորմներ՝ `components` (պարզ HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Տեսեք [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)՝ `--dir <path>` և ծրագրային օգտագործման համար։

Օգտագործում եք AI կոդավորման գործակալ՞ — տեղադրում չի պահանջվում — ուղղեք այն ուղղակիորեն դեպի այդ skill-ը.

```prompt
Ներբեռնել create.pantoken.app/SKILL.md և հետևել դրան՝ այս նախագծում pantoken-ը կարգավորելու համար։
```

Եթե նախընտրում եք pantoken-ի agent կանոնները մշտապես միացնել ռեպոյին (AGENTS.md, խմբագրիչի կանոններ, այս skill-ի տեղական պատճեն), փոխարենը վարեք `npx @pantoken/ai init`։

## Տոկենների մոդելը

Տոկենները CSS հարմարեցված հատկություններ են՝ անվանված `--instui-<group>-<name>`, օրինակ `--instui-color-background-brand` կամ `--instui-spacing-space-md`. Թեմաներ են ուղարկվում երեքը՝ `rebrand` (նախնականը, որի մեջ `light-dark()` են այնտեղ, որտեղ light և dark տարբեր են), `canvas`, և `canvasHighContrast`. Պատկերակները `<image>` տոկեններ են (`--instui-icon-<name>`), որոնք առաջացվել են Lucide-ից և Instructure-ի կասիրակ գլիֆներից։

## Ստիլավորել վեբ հավելված

Տեղադրեք ոճաթերթը և ներմուծեք այն մեկ անգամ։ Այն սահմանում է յուրաքանչյուր `--instui-*` հատկությունը, այնպես որ կարող եք ուղղակիորեն հղում անել դրանց ձեր սեփական CSS-ից։

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

## Օգտագործել պատկերակները ցանկացած տեղ

Վեբ կոմպոնենտը գործում է ցանկացած ֆրեյմվորքում, առանց պորտավորման։

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

Պիտակները CSS հարմարեցված հատկություններ են (`--instui-icon-<name>`). Լրացրեք ոճաթերթը մեկ անգամ և հղվեք ցանկացած պատկերակի որպես `mask-image` կամ `background-image` — յուրաքանչյուր պատկերակի առանձին ներմուծում անհրաժեշտ չէ։

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — մեկ պատկերակ ընդդեմ ամբողջ հավաքածուի

`@pantoken/icons` բացահայտում է երկու անվանված արտահանման. Օգտագործեք `iconsByName` մեկ պատկերակ բերելու համար առանց ամբողջ զանգվածը կրկնելու։

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Օգտագործեք `icons` երբ անհրաժեշտ է ամբողջ հավաքածուն (օր.՝ պիկեր կառուցելու համար)։

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Երկու արտահանմանն էլ մոդուլի սկզբնականացում պահին բեռնվում է ամբողջ IR-ը — այս մակարդակում չկա per-icon tree-shaking։ Քիչ քաշով CSS-միայն բեռնման համար օգտագործեք [CDN picker](/guide/cdn-picker)-ը՝ միայն անհրաժեշտ պատկերակների համար միացված URL արտադրելու։

## Ստեղծել տեղական հարթակի համար

CLI-ն գրում է տոկենների աղբյուրը նպատակային ռեպոյի մեջ։ Լրացուցիչ տեղադրում չի պահանջվում բացի runner-ից։

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Տեսեք [the pantoken CLI](/guide/cli)՝ բոլոր թիրախների համար։

## VS Code հեղինակային նշումների նկատառումներ

`@pantoken/pantoken` այժմ ուղարկում է VS Code custom-data ֆայլեր, որպեսզի ներքևի նախագծերը կարողանան ստանալ class և token completion HTML/CSS-ում առանց pantoken-մասնագիտական ընդլայնման տեղադրման։

1. Տեղադրել միավորված փաթեթը:

```sh
npm i @pantoken/pantoken
```

1. Ցուցիչը VS Code-ի՝ դեպի ուղարկված custom-data JSON-ը ձեր consumer workspace-ից.

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Վերսկավել VS Code (կամ চালարկել "Developer: Reload Window") նոր տվյալը կիրառելու համար։

Սա թույլ է տալիս առաջարկություններ `instui-*` class տոկենների (և `-modifier` class տոկենների) և `--instui-*` հարմարեցված հատկությունների համար։

## Շարունակել որտե՞ղ

- [Փաթեթների քարտեզը](/guide/packages) — որ փաթեթին դիմել՝ ըստ աշխատանքի։
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — տեղադրեք agent գույքային ֆայլերը և կանոնները consumer ռեպոյում։
- [Արդյունաբերական ճարտարապետություն](/guide/architecture) — ինչպես տեղավորվում են տոկենների մոդելը, core- ը և output-երը։
- [API հղումներ](/api/) — յուրաքանչյուր արտահանված սիմվոլ, գեներացված աղբյուրից։
