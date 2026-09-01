# Tīmata

Ka tango a pantoken i ngā tohu hoahoa me ngā tohu ata o Instructure UI, ka whakatau kotahi, ka hanga anō i taua tauira kotahi hei kete mō ngā papa maha: rauemi tauira ma, SCSS me Less, React, Vue me Svelte, Tailwind me Panda, native Swift me Kotlin, WordPress me Drupal, Figma, rānei atu.

Ka tāuta e koe te kete iti rawa e hāngai ana ki tō mahi. Katoa hoki ka kaweake anō e te `pantoken` mōkī kotahi, nō reira ka tīmata koe i reira ka āta whāngai ā muri ake.

## Whakarau i tētahi kaupapa tīmata

Ko te huarahi tere ki te whakamātau i pantoken: whakarau i tētahi kaupapa tīmata kua tāuta, kua whirihorahia hoki.

```sh
npx create-pantoken-app react
```

Ngā papanga: `components` (HTML/CSS mā), `react`, `vue`, `svelte`, `web-components`, `angular`. Tirohia
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) mō `--dir <path>` me te whakamahinga hōtaka.

E whakamahi ana i tētahi kaitautoko waea AI? Kāore he tāutanga e hiahiatia — tohu atu kia arahina te pūkenga:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Ka mahi anō i taua ara mō Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, me Amazon Q Developer CLI — whakakē `claude` mō `gemini`, `agent`, `codex`, `copilot -p`, rānei `q chat`. Mēnā e pai ana kia whakauruhia ngā ture kaitautoko o pantoken ki te repo mō ake tonu atu (AGENTS.md, ture ētita, tārua ā-rohe o tēnei pūkenga), whakahaerehia `npx @pantoken/ai init` hei tāpiri.

## Te tauira tohu

Ko ngā tohu he taonga ritenga CSS e ingoa ana `--instui-<group>-<name>`, hei tauira
`--instui-color-background-brand` rānei `--instui-spacing-space-md`. E toru ngā kaupapa tae e kawea mai ana: `rebrand`
(te taunoa, me `light-dark()` hei rerekē i te mārama me te pō), `canvas`, me `canvasHighContrast`.
Ko ngā tohu ata he `<image>` tokens (`--instui-icon-<name>`) i ahu mai i Lucide me ngā oro ritenga a Instructure.

## Whakararama i tētahi taupānga tukutuku

Tāuta te rauemi tauira ka kawemai kotahi. Ka tautuhia ia `--instui-*` rawa, nō reira ka taea e koe te tohu tika i aua wāhi mai i tō ake CSS.

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

## Whakamahia ngā ata ki ngā wāhi katoa

Ka mahi te wahanga tukutuku i roto i ngā anga katoa, me te kore whakarerekētanga.

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

Ko ngā ata he taonga ritenga CSS (`--instui-icon-<name>`). Kawemaihia te rauemi tauira kotahi ka tohu i tētahi ata hei `mask-image` rānei `background-image` — kāore he kawemai mō ia ata.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — tētahi ata kotahi vs. te kete katoa

Ka whakakitea e `@pantoken/icons` e rua ngā kaweake ingoa. Whakamahia `iconsByName` ki te tango i tētahi ata kotahi me te kore whakawhāiti i te rārangi katoa:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Whakamahia `icons` mēnā e hiahiatia ana te kete katoa (hei tauira, hei waihanga i tētahi kōwhiringa):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

E kawemai ana ngā kaweake e rua i te IR katoa i te tīmatanga o te kōwae — kāore he tree-shaking mō ia ata i tēnei taumata. Mō te kawemai māraiti ā-CSS anake, whakamahia te [CDN picker](/guide/cdn-picker) hei hanga i tētahi URL whakauru mō ngā ata anake e hiahiatia ana.

## Whakaputa mō tētahi papa taketake

Ka tuhi te CLI i te puna tohu ki roto i tētahi repo tūnga. Kāore he tāutanga atu i te kawe:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Tirohia [te pantoken CLI](/guide/cli) mō ia tūnga katoa.

## Ngā tohutohu kaituhi VS Code

Kua kawea mai ināianei e `@pantoken/pantoken` ngā kōnae raraunga-tahua ā-Whakarite mō VS Code kia taea e ngā kaupapa whakarauka te tiki whakaoti ā-kaihanga me ngā tohu kāwai i roto i HTML/CSS me te kore tāuta i tētahi toronga motuhake pantoken.

1. Tāuta te mōkī kotahi:

```sh
npm i @pantoken/pantoken
```

1. Tohua VS Code ki te kōnae raraunga-tahua kua kawea mai i tō wāhi mahi kaihoko:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Whakakāhore anō i VS Code (rānei whakahaere "Developer: Reload Window") kia whai hua ai ngā raraunga hou.

Ka whakahohe tēnei i ngā tūtohutanga mō ngā tohu kāwai `instui-*` (me ngā tohu kāwai `-modifier`) me ngā taonga ritenga `--instui-*`.

## Kei hea te haere ā muri

- [Te mapi mōkī](/guide/packages) — te kete hei toro māu, mā runga i te mahi.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tāuta ngā rawa me ngā ture kaitautoko ki tētahi repo kaihoko.
- [Pūhanga](/guide/architecture) — me pēhea te hono o te tauira tohu, te pūnaha matua, me ngā putanga.
- [Tohutohu API](/api/) — ia tohu kaweake, i hangaia mai i te puna.
