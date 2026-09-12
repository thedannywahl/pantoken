# Tīmata

Ka tango a Pantoken i ngā tohu hoahoa me ngā tohu ā-ata o te [Instructure UI](https://instructure.design), ka mahi rātou kia kotahi, ka hōputu anō i taua tauira kotahi hei mōkī mō ngā papa maha: pepa āhuatanga mā, SCSS me Less, React me Vue me Svelte, Tailwind me Panda, taketake Swift me Kotlin, WordPress me Drupal, Figma, me ētahi atu.

Ka tāuta koe i te mōkī iti rawa e hāngai ana ki tō mahi. Kei te kawe hoki ngā mea katoa e te mōkī kotahi ā-`pantoken`, nō reira ka tīmata koe ki reira ka āta whakarāpopoto ā muri ake.

## Hangaia he kaupapa tīmata

Ko te huarahi tere ki te whakamātautau i pantoken: hangaia he kaupapa tīmata kua tāuta, kua honoa hoki.

```sh
npx create-pantoken-app
```

Papa: `components` (HTML/CSS mārama), `react`, `vue`, `svelte`, `web-components`, `angular`. Tirohia [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) mō `--dir <path>` me te whakamahinga ā-papanga.

Kei te whakamahi i tētahi wakarite waehere AI? Kāore he tāutanga e hiahiatia — whakaatu ki taua pūkenga tika:

```prompt
Tikiake create.pantoken.app/SKILL.md ka whai i ngā tohutohu kia whakatū i te pantoken i roto i tēnei kaupapa.
```

Mēnā e hiahia ana kia hono tonu ngā ture wakarite pantoken ki te repo (AGENTS.md, ture kaiwhakatika, kape ā-rohe o tēnei pūkenga), whakahaerea `npx @pantoken/ai init` anō.

## Te tauira tohu

Ko ngā tohu he rawa ritenga CSS ka ingoa `--instui-<group>-<name>`, hei tauira
`--instui-color-background-brand` rānei `--instui-spacing-space-md`. E toru ngā kaupapa e tukuna ana: `rebrand`
(te taunoa, me `light-dark()` hei wehe i te mārama me te pō), `canvas`, me `canvasHighContrast`.
Ko ngā tohu tohu he tohu `<image>` (`--instui-icon-<name>`) i ahu mai i Lucide me ngā ahua ā-tāpare o Instructure.

## Hoahoa i tētahi taupānga tukutuku

Tāuta te pepa āhuatanga ka kawemai kotahi. Ka tautuhia ia `--instui-*` rawa, nō reira ka taea te tuku whakaaro
i rānei i tō ake CSS.

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

## Whakamahia ngā tohu ki ngā wāhi katoa

Ka mahi te paewhakarite tukutuku i ngā anga katoa, kāore he whakakapinga e hiahiatia.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Ngā tohu CSS

Ko ngā tohu he rawa ritenga CSS (`--instui-icon-<name>`). Kawemai te pepa āhuatanga kotahi ka tohu i tētahi tohu hei `mask-image` rānei `background-image` — kāore he kawemai mō ia tohu motuhake e hiahiatia.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — kotahi tohu rānei te huinga katoa

Ka whakaatu a `@pantoken/icons` i ngā kawe mōrahi e rua. Whakamahia `iconsByName` ki te toia tētahi tohu kotahi me te kore haere i te ara katoa:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Whakamahia `icons` mēnā e hiahia ana koe i te huinga katoa (hei tauira ki te waihanga i tētahi kaitīpako):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

E kawemai ana ngā kawe e rua i te IR katoa i te tīmatanga o te tauira — kāore he tārewa-rākau shake mō ia tohu i tēnei taumata. Mō te kawemai āhua pūmau me te whakamahi CSS-anake, whakamahia te [CDN picker](/guide/cdn-picker) hei hanga i tētahi URL whakakotahi mō ngā tohu e tika ana anake mōu.

## Waihanga mō tētahi papa taketake

Ka tuhituhi te CLI i te pūtake tohu ki roto i tētahi repo ārahi. Kāore he tāutanga atu i te kaikaiwhakaahu:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Tirohia [te pantoken CLI](/guide/cli) mō ngā whāinga katoa.

## Āwhina tuhi VS Code

Kei te tukuna ināianei e `@pantoken/pantoken` ngā kōnae raraunga ā-tuakiri mō VS Code kia taea ai e ngā kaupapa kaihoko te tiki oti ā-kāwai me ngā tohu i roto i HTML/CSS me te kore tāuta i tētahi toronga motuhake pantoken.

1. Tāuta te mōkī kotahi:

```sh
npm i @pantoken/pantoken
```

1. Whakatauritea a VS Code ki te raraunga custom-data JSON i tukuna mai i tō waahi mahi kaihoko:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Whakahou anō i VS Code (rānei whakahaere "Developer: Reload Window") kia oti te tono i ngā raraunga hou.

Ka whakahohe tēnei i ngā tūtohutanga mō ngā tohu kāwai `instui-*` (me ngā tohu kāwai `-modifier`) me ngā rawa ritenga `--instui-*`.

## He aha te whai ake

- [Te mapi mōkī](/api/) — te mōkī hei toro atu, mō ia mahi.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tāuta rawa wakarite me ngā ture ki roto i tētahi repo kaihoko.
- [Hoahoa](/guide/architecture) — me pēhea te hono o te tauira tohu, te pūtake, me ngā putanga.
- [Tohutoro API](/api/) — ia tohu kaweake, i hangaia mai i te pūtake.
