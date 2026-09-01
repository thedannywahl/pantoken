# Ovdalastit

pantoken geavahit Instructure UI:s design-tokenat ja ikkonat, ráhkistá ovttas, ja muohttá das mátkki
modella pakkkain buohkaid platformaid: simple stylesheets, SCSS ja Less, React ja Vue ja Svelte,
Tailwind ja Panda, nativ Swift ja Kotlin, WordPress ja Drupal, Figma, ja muhtun.

Dasa leat girkadat álggaheapmi paketta mii máksit dutnje barggá. Buot leat sii re-exporttejuvvan dihte ráhkes
`pantoken` paketta, de sáhtát álggahit das ja gávdnat mánusas.

## Skafolde almmuheaddji projekta

Fasttalaš vuohti pantoken barggut: skafolde almmuheaddji projekta mii lea almmuhis installerbuvvan ja oktageavvan.

```sh
npx create-pantoken-app react
```

Platformat: `components` (simple HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lávki
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) dutnje `--dir <path>` ja
programmatálaš geavahit.

Geat leat AI-koodadaguid vuolimus? Ii ledje installašuvdna — stávvat skillii direktalaš:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Dát leat vejolaš samegearddi Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, ja Amazon Q
Developer CLI — vaihda `claude` mii `gemini`, `agent`, `codex`, `copilot -p`, dahje `q chat`. Jus don
geavahát pantoken agent-ráđđiiguin repo:ha báikkit (AGENTS.md, editor-ráđđiigaid, lokaalna copy
dát skillii), ráhkad `npx @pantoken/ai init` ii dat.

## Token-modela

Tokenat leat CSS čađa-properties nammat `--instui-<group>-<name>`, esimerkiksi
`--instui-color-background-brand` dahje `--instui-spacing-space-md`. Golbma themes leat: `rebrand`
(default, `light-dark()` mii light ja dark leat olágán), `canvas`, ja `canvasHighContrast`.
Ikkonat leat `<image>` tokenat (`--instui-icon-<name>`) mii leat jearrat Lucide:st ja Instructure:s
rajiid glyph:aid.

## Styla web-app

Installera stylesheet ja importera dat ovttas. Dat dáiddá buot `--instui-*` property, vai don geavahát
dál álget CSS:ssa.

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

## Geavaha ikkonat guhkes

Web-komponentta geavahit buot framework:s, ii leat porttadhusa.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokenat

Ikkonat leat CSS čađa-properties (`--instui-icon-<name>`). Loadera stylesheet ovttas ja geavaha
mo buot ikkon beassat `mask-image` dahje `background-image` — ii per-ikkona import.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ovtta ikkon vs. buot setta

`@pantoken/icons` čájeha duođaid namma exporta. Geavaha `iconsByName` ožžon ikkon mii ii
máste čájehit buot array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Geavaha `icons` jus don galgá buot setta (d.e. dárkkistit picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Both exports loadera buot IR moduul boahtteáiggis — ii leat per-ikkona tree-shaking ii injuhit
dát leiavuođa. Das lean CSS-only boares load: geavaha [CDN picker](/guide/cdn-picker) birra generera
combina URL doarjjis dušše ikkonat mii don galgat.

## Genererá native platforma jaoks

CLI ráhkistá token source target-repo:ha. Ii installerlašuvnna maid runner:in:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lávki [the pantoken CLI](/guide/cli) buot target:aid.

## VS Code ovddasvuođašvuođaid

`@pantoken/pantoken` dál ráhkistá VS Code custom-data JSON:at nugo downstream projektat sáhtá
fáhcat class ja token completion HTML/CSS:s ii leat pantoken-specific extension:ia.

1. Installera unifika paketta:

```sh
npm i @pantoken/pantoken
```

1. Pointers VS Code:s mátkása custom-data JSON daddin consumer workspace:hh:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (dahje čuovggat "Developer: Reload Window") aplikerejuvvo ovttas data.

Dát boahtaše sugestionaigu `instui-*` class token:aid (ja `-modifier` class token:aid) ovtta
`--instui-*` custom properties.

## Gos dál?

- [Package map](/guide/packages) — mii paketta geavahát, beroštit barggá.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agent-assets ja ráđđiigaid consumer repo:han.
- [Architecture](/guide/architecture) — mo token-modela, core, ja outputs galggašuvvat ovttas.
- [API reference](/api/) — buot exporteerat symbol, genereremehtta source:st.
