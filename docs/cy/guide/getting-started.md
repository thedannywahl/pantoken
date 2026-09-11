# Dechrau

Mae Pantoken yn cymryd tônau dylunio a symbolau [Instructure UI](https://instructure.design), yn eu datrys unwaith, ac yn ailffurfio’r un model hwnnw i mewn i becynnau ar gyfer sawl llwyfan: sheats steil plaen, SCSS a Less, React a Vue a Svelte, Tailwind a Panda, Swift a Kotlin brodorol, WordPress a Drupal, Figma, a mwy.

Rydych yn gosod y pecyn lleiaf sy’n addas ar gyfer eich tasg. Mae popeth hefyd yn cael ei ailallforio gan y pecyn unedig `pantoken`, felly gallwch ddechrau yno a chynhwysu’n fwy penodol yn nes ymlaen.

## Sgilffo prosiect cychwyn

Y ffordd gyflymaf i roi cynnig ar pantoken: sgilffo prosiect cychwyn gyda fe eisoes wedi’i osod a’i wifro.

```sh
npx create-pantoken-app
```

Llywddoedd: `components` (HTML/CSS plaen), `react`, `vue`, `svelte`, `web-components`, `angular`. Gweler
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) ar gyfer `--dir <path>` a
defnydd programadwy.

Yn defnyddio asiant codio AI? Dim angen gosod — pwyntiwch ef at y sgil yn uniongyrchol:

```prompt
Lawrlwythwch create.pantoken.app/SKILL.md a dilynwch ef i sefydlu pantoken yn y prosiect hwn.
```

Os hoffech yn hytrach wifro rheolau asiant pantoken i’r repo’n barhaol (AGENTS.md, rheolau golygydd, copi leol o’r sgil hwn), rhedwch `npx @pantoken/ai init` yn lle hynny.

## Y model tôn

Mae tônau yn eiddo personol CSS wedi’u henwi `--instui-<group>-<name>`, er enghraifft
`--instui-color-background-brand` neu `--instui-spacing-space-md`. Mae tair thema yn cael eu hanfon: `rebrand`
(y rhagosodedig, gyda `light-dark()` lle mae golau a thywyll yn wahanol), `canvas`, a `canvasHighContrast`.
Mae eiconau yn docynnau `<image>` (`--instui-icon-<name>`) a gynhyrchir o Lucide ynghyd â glyphs arferol Instructure.

## Steilio ap gwe

Gosodwch y stylesheet a’i fewnforio unwaith. Mae’n diffinio pob eiddo `--instui-*`, felly rydych yn cyfeirio atynt yn uniongyrchol o’ch CSS chi eich hun.

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

## Defnyddiwch eiconau unrhywle

Mae’r cydran gwe yn gweithio mewn unrhyw fframwaith, heb orfod porthi.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Docynnau CSS

Mae eiconau yn eiddo personol CSS (`--instui-icon-<name>`). Llwythwch y stylesheet unwaith a chyfeiriwch at unrhyw eicon fel `mask-image` neu `background-image` — nid oes angen mewnforio fesul-eicon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — eicon sengl vs. set lawn

Mae `@pantoken/icons` yn datgelu dau allforio enwi. Defnyddiwch `iconsByName` i dynnu un eicon heb orfod trawsio’r arae lawn:

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

Mae’r ddau allbwn yn llwytho’r IR lawn ar gychwyn modiwl — nid oes tree-shaking fesul-eicon ar y lefel hon. Ar gyfer llwytho trwchus CSS-yn-unig, defnyddiwch y [CDN picker](/guide/cdn-picker) i gynhyrchu URL cyfuno
ar gyfer yr eiconau rydych chi eu hangen yn unig.

## Genereiddio ar gyfer llwyfan brodorol

Mae’r CLI yn ysgrifennu ffynhonnell tôn i mewn i repo targed. Dim gosodiad y tu hwnt i’r rhedegwr:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gweler [y pantoken CLI](/guide/cli) am bob targed.

## Awgrymiadau awdurdodi VS Code

Mae `@pantoken/pantoken` yn awr yn cynnwys ffeiliau data-cwsustom VS Code fel y gall prosiectau defnyddwyr gael cwblhau dosbarth a thôn yn HTML/CSS heb osod estyniad penodol i pantoken.

1. Gosodwch y pecyn unedig:

```sh
npm i @pantoken/pantoken
```

1. Pwyntiwch VS Code at y JSON data-cwsustom wedi’i longio o’ch gofod defnyddiwr:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ail-lwythwch VS Code (neu redeg "Developer: Reload Window") i weithredu’r data newydd.

Mae hyn yn galluogi awgrymiadau ar gyfer docynnau dosbarth `instui-*` (a docynnau dosbarth `-modifier`) yn ogystal â
priodoleddau personol `--instui-*`.

## I ble nesaf

- [Map y pecynnau](/api/) — pa becyn i’w gyrchu, yn dibynnu ar y dasg.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — gosod asedau asiant a rheolau mewn repo defnyddiwr.
- [Pensaernïaeth](/guide/architecture) — sut mae’r model tôn, y core, a’r allbynnau yn cyd-fynd.
- [Cyfeirlyfr API](/api/) — pob symbol a allforir, wedi’i chynhyrchu o’r ffynhonnell.
