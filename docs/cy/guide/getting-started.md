# Dechrau

Mae pantoken yn cymryd tokenau dylunio a eiconau Instructure UI, yn eu datrys unwaith, ac yn ailffurfio'r un
model hwnnw i becynnau ar gyfer nifer o lwyfannau: taflenni arddull plaen, SCSS a Less, React a Vue a Svelte,
Tailwind a Panda, Swift a Kotlin naturiol, WordPress a Drupal, Figma, ac eraill.

Rydych yn gosod y pecyn lleiaf sy'n addas i'ch tasg. Mae popeth hefyd yn cael ei ail- allforio gan y
`pantoken` undod, felly gallwch ddechrau yno ac yna culhau'n ddiweddarach.

## Sgafell-prosiect dechrau

Y ffordd gyflymaf i roi cynnig ar pantoken: sgafell-prosiect dechrau gyda hi eisoes wedi'i gosod a'i diwreo.

```sh
npx create-pantoken-app react
```

Lwyfannau: `components` (HTML/CSS plaen), `react`, `vue`, `svelte`, `web-components`, `angular`. Gweler
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) am `--dir <path>` a
defnydd rhaglenol.

Defnyddiwch asiant codu AI? Dim gosod angen — pwyntiwch ef at y sgil yn uniongyrchol:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Gweithio yr un peth ar gyfer Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, a Amazon Q
Developer CLI — newid `claude` i `gemini`, `agent`, `codex`, `copilot -p`, neu `q chat`. Os ydych yn well ffrwd rheolau asiant pantoken i'r repo'n barhaol (AGENTS.md, rheolau golygydd, copi lleol
o'r sgil hwn), rhedwch `npx @pantoken/ai init` yn lle hynny.

## Y model token

Mae tokenau yn eiddo personol CSS a enwir `--instui-<group>-<name>`, er enghraifft
`--instui-color-background-brand` neu `--instui-spacing-space-md`. Mae tair thema yn dod: `rebrand`
(y diofyn, gyda `light-dark()` lle mae golau a thywyll yn wahanol), `canvas`, a `canvasHighContrast`.
Mae eiconau yn tokenau `<image>` (`--instui-icon-<name>`) a deillir o Lucide ynghyd â glyphs
custom Instructure.

## Arddullio ap gwe

Gosodwch y taflen arddull a'i mewnforio unwaith. Diffinnir pob eiddo `--instui-*`, felly rydych yn cyfeirio
atyn nhw'n uniongyrchol o'ch CSS eich hun.

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

## Defnyddio eiconau unrhyw le

Mae'r cydran gwe yn gweithio mewn unrhyw fframwaith, heb unrhyw borthi.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokenau CSS

Mae eiconau yn eiddo personol CSS (`--instui-icon-<name>`). Llwythwch y taflen arddull unwaith a chyfeiriwch at unrhyw
eicon fel `mask-image` neu `background-image` — dim angen mewnforio ar gyfer pob eicon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — eicon sengl vs. set llawn

Mae `@pantoken/icons` yn datgelu dwy allbwn wedi'u henwi. Defnyddiwch `iconsByName` i dynnu un eicon heb ddidoli
y rhestr gyfan:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Defnyddiwch `icons` pan fydd angen y set gyfan (e.e. i adeiladu dewiswr):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mae'r ddau allbwn yn llwytho'r IR llawn wrth gychwyn y modiwl — nid oes tree-shaking ar gyfer pob eicon ar y
haen hwn. Ar gyfer llwytho clymu a chlir sy'n seiliedig ar CSS yn unig, defnyddiwch y [dewiswr CDN](/guide/cdn-picker) i greu URL
cyfuniad ar gyfer dim ond yr eiconau sydd eu hangen arnoch.

## Generadu ar gyfer llwyfan naturiol

Ysgrifennodd y CLI ffynhonnell token i repo targed. Dim gosod heblaw'r rhedegwr:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gweler [y pantoken CLI](/guide/cli) i gael pob targed.

## Awgrymiadau awtomeiddio VS Code

Mae `@pantoken/pantoken` yn cael ffeiliau data-custome VS Code wedi'u rhoi yn awr fel y gall prosiectau defnyddiwr gael cwblhau dosbarth a
token mewn HTML/CSS heb osod estyniad penodol pantoken.

1. Gosodwch y pecyn undod:

```sh
npm i @pantoken/pantoken
```

1. Pwyntiwch VS Code at y JSON data-custome a gyflwynwyd o'ch gweithle defnyddiwr:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ail-lwytho VS Code (neu redeg "Developer: Reload Window") i gymhwyso'r data newydd.

Mae hyn yn galluogi awgrymiadau ar gyfer tokenau dosbarth `instui-*` (a tokenau dosbarth `-modifier`) yn ogystal â
eiddo personol `--instui-*`.

## Ble i fynd nesaf

- [Map pecynnau](/guide/packages) — pa becyn i'w gyrraedd, yn ôl y dasg.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — gosod asedau asiant a rheolau mewn repo defnyddiwr.
- [Pensaernïaeth](/guide/architecture) — sut mae'r model token, y craidd, a'r allbethau yn cyfateb.
- [Cyfeirlyfr API](/api/) — pob symbol a allforir, a gynhyrchir o'r ffynhonell.
