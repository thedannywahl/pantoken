# Dechrau

Mae Pantoken yn cymryd tocynnau dylunio a eicons [Instructure UI](https://instructure.design), yn eu datrys unwaith, ac yn aildrefnu’r un model hwnnw i mewn i becynnau ar gyfer sawl llwyfan: taflenni steil syml, SCSS a Less, React a Vue a Svelte, Tailwind a Panda, Swift a Kotlin brodorol, WordPress a Drupal, Figma, a mwy.

Rydych yn gosod y pecyn lleiaf sy’n addas i’ch tasg. Mae popeth hefyd yn cael ei ail-allforio gan y pecyn undod`pantoken`, felly gallwch ddechrau yno a chyfyngu’n ddiweddarach.

## Creu prosiect cychwynnol

Y ffordd gyflymaf i roi cynnig ar pantoken: scaffold prosiect cychwynnol gyda fe wedi’i osod a’i wrethi mewn eisoes.

```sh
npx create-pantoken-app
```

Lwyfannau: `components` (HTML/CSS syml), `react`, `vue`, `svelte`, `web-components`, `angular`. Gweler
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) am `--dir <path>` a
defnydd rhaglenol.

A ydych yn defnyddio asiant codio AI? Dim angen gosod — pwyntiwch ef at y sgil yn uniongyrchol:

```prompt
Lawrlwytho create.pantoken.app/SKILL.md a dilynwch ef i sefydlu pantoken yn y prosiect hwn.
```

Os hoffech wrethu rheolau asiant pantoken i’r repo’n barhaol (AGENTS.md, rheolau golygydd, copi lleol o’r sgil hwn), rhedwch `npx @pantoken/ai init` yn lle hynny.

## Y model tocynnau

Mae tocynnau yn eiddo arferol CSS wedi’u henwi `--instui-<group>-<name>`, er enghraifft
`--instui-color-background-brand` neu `--instui-spacing-space-md`. Mae tri themâu yn cael eu cludo: `rebrand`
(y rhagosodiad, gyda `light-dark()` lle mae golau a thywyll yn wahanol), `canvas`, a `canvasHighContrast`.
Mae eicons yn docynnau `<image>` (`--instui-icon-<name>`) a ddeillir o Lucide yn ogystal ag eiconau arferol Instructure.

## Arllwys steil i ap gwe

Gosodwch y taflen steil a’i mewnforio unwaith. Mae’n diffinio pob eiddo `--instui-*`, felly cyfeiriwch atyn nhw’n syth o’ch CSS eich hun.

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

## Defnyddiwch eicons unrhyw le

Mae’r rhanogaeth gwe yn gweithio mewn unrhyw fframwaith, heb ategyniad.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tocynnau CSS

Mae eicons yn eiddo arferol CSS (`--instui-icon-<name>`). Llwythwch y taflen steil unwaith a chyfeiriwch at unrhyw eicon fel `mask-image` neu `background-image` — dim angen mewnforio fesul eicon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — un eicon vs set llawn

Mae `@pantoken/icons` yn agor dau allbwn enwad. Defnyddiwch `iconsByName` i echdynnu un eicon heb iteru’r array llawn:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Defnyddiwch `icons` pan fyddwch angen y set gyfan (er enghraifft i adeiladu dewiswr):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mae’r ddau allbwn yn llwytho’r IR llawn ar gychwyn y modiwl — nid oes tree-shaking fesul eicon ar y lefel hon. Am lwytho denau sy’n seiliedig ar CSS yn unig, defnyddiwch y [CDN picker](/guide/cdn-picker) i gynhyrchu URL cyfuno ar gyfer dim ond yr eicons sydd eu hangen arnoch.

## Generadu ar gyfer llwyfan brodorol

Mae’r CLI yn ysgrifennu tarddiad tocynnau i repo cyrchfan. Dim gosod heblaw’r rhedegwr:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Gweler [y pantoken CLI](/guide/cli) am bob cyrchfan.

## Awgrymiadau awduriaeth VS Code

Mae `@pantoken/pantoken` bellach yn cyflwyno ffeiliau data-cyferbyniad VS Code fel y gall prosiectau defnyddwyr gael cwblhau dosbarth a thocyn mewn HTML/CSS heb osod estyniad penodol pantoken.

1. Gosodwch y pecyn undod:

```sh
npm i @pantoken/pantoken
```

1. Pwyntiwch VS Code at y JSON data-cyferbyniad a anfonwyd o’ch gweithle defnyddiwr:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ail-lwytho VS Code (neu redeg "Developer: Reload Window") i gymhwyso’r data newydd.

Mae hyn yn galluogi awgrymiadau ar gyfer tocynnau dosbarth `instui-*` (a thocynnau dosbarth `-modifier`) yn ogystal â
eiddo arferol `--instui-*`.

## Ble i fynd nesaf

- [Y map pecynnau](/api/) — pa becyn i’w gyrraedd, fesul tasg.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — gosod asedau a rheolau asiant mewn repo defnyddiwr.
- [Pensaernïaeth](/guide/architecture) — sut mae’r model tocynnau, y core, a’r allbynnau yn cyd-fynd.
- [Cyfeirlyfr API](/api/) — pob symbol a allbwn, a gynhyrchir o’r ffynhonnell.
