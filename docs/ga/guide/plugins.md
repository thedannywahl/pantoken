# Breiseáin

Cuireann breiseán pantoken síneadh ar an aschur token nó CSS gan pacáiste a dhifreáil. Tógann tú ceann le
`definePlugin` ó `@pantoken/plugin-kit`, ansin pasálann tú é chuig `buildTokens` nó `toCss`.

## Údar breiseáin

Tabhair na hooks a chuirtear i gcrích do `definePlugin`. Fillfidh sé breiseán gnáth, brandaithe leis na
cumais a bhfuil tomhas orthu ó na hooks sin. Is féidir le breiseán an IR a shíneadh (`tokens`, `icons`), an aschur CSS
(`css`), nó an dá rud.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Clárlú feasach-ar-chumas

Ritheann `buildTokens` agus `toCss` `checkPlugins` thar na breiseáin a gcuireann tú isteach. Rabhraíonn sé — ní chumann sé earráid —
nuair nach bhfuil hook aonair ag breiseán don chéim ina bhfuil sé cláraithe, mar sin déantar breiseán atá dírithe ar thóicn amháin a
scipeáil le nóta nuair a chuirtear é chuig `toCss` seachas gan gníomh a dhéanamh go ciúin.

## Comhcheangal breiseán

Tóg ar bharr breiseán eile le `extendPlugin`, nó cumasc comhghleacaithe le `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Comhcheanglaítear hooks an chéid: rithfidh `tokens` an bunpháirt agus ansin an breiseán, ghiarálann `css` an dá
chion, agus rithfidh `icons` an bheirt.

## Bailíochtú aschur do bhreiseáin

Rith na seiceáilí drift comónta ó `@pantoken/utils` thar aschur do bhreiseáin féin ina thástáil, ionas go
mbeifí ag dul ar stailc tapa áitiúil má tá litriú mícheart nó má tá ainm token athainmnithe:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Na breiseáin atá pacáistithe

- `@pantoken/plugin-simple-icons` — brandaíonn sé icons ó simple-icons, cláraithe mar icon tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab icons, cláraithe mar `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — lógóanna táirgí Instructure mar SVGanna, URIanna sonraí, agus `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — breiseán PostCSS (ní breiseán pantoken é) a tharraingíonn as maoine saincheaptha neamhúsáidte ó stíleáil.
- `@pantoken/plugin-custom-theme-colors` — athbrandaíonn sé leathanach trí thréith amháin a shocrú
  (`data-pantoken-color`) chuig ceann de 13 pailéad, nó chuig `custom` do aon hex branda. Féach
  [Dathanna téama](#theme-colors).

Is féidir clárlann Lucide Lab a luchtú go mall, ansin í a phasáil chuig an hook token comhthráthach:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Cúpla ruda atáodh mar bhreiseáin anois a sheachadtar i `@pantoken/components`, ós rud é go dteastaíonn iad ó
anhais an oiread sin comhpháirteanna as an mbosca: scáthanna ardaithe (`--instui-elevation-*`, i `components.css`), an fáinne comhthimpeall-fócas
(i `base.css` — faigheann gach eilimint fócasála é nuair a bhíonn pantoken ag úinéireacht an leathanaigh), agus na clónna branda Instructure
(Atkinson Hyperlegible Next: cuireann `base.css` i bhfeidhm `--instui-font-family-base`; luchtóidh an rogha `@pantoken/components/fonts.css` na
woff2anna `@font-face`).

## Dathanna téama {#theme-colors}

Seolann `@pantoken/plugin-custom-theme-colors` bloc `[data-pantoken-color="…"]` amháin in aghaidh na pailéad
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Treoraíonn gach bloc na primitives branda (`--instui-primitive-color-navy-*` agus `-blue-*`)
ata orthu chuig an pailéad roghnaithe. Déanann sé ath-shamhlaiú ar na dromchlaí branda a dhéanfadh upstream a flatáil go hex litriúil,
ag coimeád a n-alpha bácáilte trí `color-mix()`. Fanann dathanna stádais shéamseamach, béimí gorma shonraithe, agus
scáthanna ardaithe ina n-áit. Bain triail astu sa
[demo téamúcháin bunaithe ar swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Dath branda saincheaptha

Socraigh `data-pantoken-color="custom"` chun athbranda a dhéanamh ón aon hex, mar an príomh-dath a chlóscríobhann riarthóir Canvas
sa Chomhéadain Theama. Tá pantoken ag díriú scála iomlán 10–200 `--instui-primitive-color-custom-*`
óna:

1. **Cuair cleachta.** Is é solúbthacht sprioc gach céim meán-solúbthachta OKLCH na 13
   pailéad ag an gcéim sin, le 0 sáraithe ag bán agus 210 ag dubh. Mar sin oireann spásáil an scála saincheaptha
   le spásáil na pailéad a sheolfar.
2. **Cloch.** Luíochann an ionchur ar an gcéim a bhfuil solúbthacht spriocnaithe chomh cóngarach dá sholas féin, ansin
   scuabann sé chuig an solúbthacht sin go cruinn. Éiríonn `#cccccc` mar `custom-40` ag `#c9c9c9`: cóngarach don ionchur, ach ní
   i gcónaí comhionann. Ciallaíonn "is cóngaraí" an céim is cóngaraí ar an gcuar, ní an dath pailéad atá ann cheana.
3. **Líon.** Coinníonn gach céim eile hue an ionchuir. Leanann a shátáiteacht cuar shátáiteach mheán na pailéad i gcoibhneas leis an gcloch, agus laghdaítear í ach amháin nuair a thiteann dath lasmuigh de sRGB.

Glacann sé le `#rgb` agus `#rrggbb` amháin; throwann aon rud eile `TypeError`, mar sin ní féidir le hex ón bhfoirm
CSS a instealladh.

Ag am an tógála, seol an riail iomlán leis na primitives díorthaithe curtha i láthair cheana:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Chun an dath a roghnú ag rith-am gan an tacar token a sheachadadh, réamh-ríomh an cuar agus an riail ath-mhapa ag am an tógála. Ansin bain úsáid as an iontráil neamh-spleách ar `/scale` sa bhrabhsálaí, agus socraigh na 20
primitives díorthaithe amháin:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Oibríonn roghnóir téama shuíomh na ndoiciméad, eagarthóir téama Canvas, agus an demo thuas ar an mbealach seo.

Féach an [tagairt API](/api/) do onnmhairí gach breiseáin.
