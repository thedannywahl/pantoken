# Timata

Ka tango a Pantoken i ngā token hoahoa me ngā tohu o te [Instructure UI](https://instructure.design), ka rongoa kotahi, ka hanga anō taua tauira kotahi ki ngā kete mō ngā papa maha: ngā aratohu kāpeka mārama, SCSS me Less, React me Vue me Svelte, Tailwind me Panda, native Swift me Kotlin, WordPress me Drupal, Figma, me ētahi atu.

Ka tāuta koe i te kete iti rawa e hāngai ana ki tō mahi. Ka whakahokia anō ngā mea katoa e te kete whakakotahi `pantoken`, nō reira ka tīmata mai i reira, ā, ka whakaiti i muri mai.

## Whakarite kaupapa tīmata

Te ara tere ki te whakamātau i pantoken: whakaritea he kaupapa tīmata kua tāutahia, kua honoa rānei.

```sh
npx create-pantoken-app
```

Ngā papa: `components` (HTML/CSS mārama), `react`, `vue`, `svelte`, `web-components`, `angular`. Tirohia
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) mō `--dir <path>` me te
whakamahi auau.

E whakamahi ana i tētahi kaiāwhina waehere AI? Kāore he tāutanga e hiahiatia — whakakitea ki te pūkenga tōmua:

```prompt
Tikiake create.pantoken.app/SKILL.md, ā, whai i ōna tohutohu kia whakauruhia a pantoken ki tēnei kaupapa.
```

Mēnā e hiahia ana kia hono tonu ngā ture kāri pantoken ki te repo (AGENTS.md, ture etita, kape ā-rohe o tēnei pūkenga), whakahaerehia `npx @pantoken/ai init` hei utu.

## Te tauira token

Ko ngā token he rawa ritenga CSS kua ingoa `--instui-<group>-<name>`, hei tauira
`--instui-color-background-brand` rānei `--instui-spacing-space-md`. E toru ngā kaupapa e kawea mai ana: `rebrand`
(te taunoa, me `light-dark()` ina rerekē te mārama me te pō), `canvas`, me `canvasHighContrast`.
Ko ngā tohu he token `<image>` (`--instui-icon-<name>`) i ahu mai i Lucide me ngā tohu āwhina ritenga o Instructure.

## Hoahoa taupānga paetukutuku

Tāutia te rauemi ā-tārua ka kawemai kotahi. Ka tautuhia ia rawa `--instui-*`, nō reira ka āhei koe ki te tohu
i ēnei ā-tinana mā tō ake CSS.

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

## Whakamahia ngā tohu i ngā wāhi katoa

Ka mahi te wahanga paetukutuku i roto i ngā anga katoa, me kore he whakawhiti.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Ngā token CSS

Ko ngā tohu he rawa ritenga CSS (`--instui-icon-<name>`). Kawemai te rauemi ā-tārua kotahi ka tohu atu i tētahi tohu
hei `mask-image` rānei `background-image` — kāore he kawemai mō ia tohu motuhake e hiahiatia ana.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — tohu kotahi vs. te huinga katoa

Ka tuku e `@pantoken/icons` ngā kaweake ingoa e rua. Whakamahia `iconsByName` kia toia tētahi tohu kotahi, kaua e huri i te rārangi katoa:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Whakamahia `icons` mēnā e hiahia ana koe i te huinga katoa (hei tauira, hei hanga kaituhi):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

E kawemai ana ngā kaweake e rua i te IR katoa i te tīmatanga o te mōdule — kāore he tree-shaking mō ia tohu i tēnei taumata. Mō te kawemai haumākū anake mā te CSS, whakamahi i te [CDN picker](/guide/cdn-picker) hei hanga URL hāngai mō ngā tohu anake e hiahiatia ana.

## Hangaia mō tētahi papa whaiaro

Ka tuhia e te CLI ngā puna token ki roto i tētahi repo ūnga. Kāore he tāutanga anō i tua atu i te kaiwhakahaere:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Tirohia [te pantoken CLI](/guide/cli) mō ia ūnga.

## Āwhina ā-VS Code mō te kaituhi

Kei te kawe a `@pantoken/pantoken` ināianei i ngā kōnae raraunga ritenga VS Code kia taea ai e ngā kaupapa kaiwhakamahi te tiki oti-a-kāwai me te
whakakī token i roto i HTML/CSS me kore e tāuta i tētahi toronga pantoken-motuhake.

1. Tāuta te kete whakakotahi:

```sh
npm i @pantoken/pantoken
```

1. Tohua e VS Code te kōnae custom-data JSON kua kawea mai i tō wāhi mahi kaihoko:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Whakahou anō i VS Code (rānei whakahaere "Developer: Reload Window") kia tau ai ngā raraunga hou.

Ka whakaahei tēnei i ngā tūtohu mō ngā token karaaka `instui-*` (me ngā token karaaka `-modifier`) me
ngā rawa ritenga `--instui-*`.

## Kei hea te whai ake

- [Te mapi kete](/guide/packages) — ko tēhea kete hei toro atu, ā, mō te aha.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tāuta ngā rawa me ngā ture pūkenga ki roto i tētahi repo kaihoko.
- [Hanga](/guide/architecture) — me pehea te honohono o te tauira token, te pūtake, me ngā putanga.
- [Tohutoro API](/api/) — ia tohu kaweake, i hangaia i te puna.
