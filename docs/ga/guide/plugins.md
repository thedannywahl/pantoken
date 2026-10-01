# Breiseáin

Leathnaíonn breiseán pantoken an t-aschur token nó CSS gan pacáiste a fhás. Tógann tú ceann le
`definePlugin` ó `@pantoken/plugin-kit`, ansin pasáil é chuig `buildTokens` nó `toCss`.

## Údar breiseáin

Tabhair na greimanna (hooks) a chuirfidh tú i bhfeidhm chuig `definePlugin`. Fillfidh sé ar breiseán gnáth, brandaithe leis na cumais a mheasadh ó na greimanna sin. Is féidir le breiseán an IR a leathnú (`tokens`, `icons`), an t-aschur CSS (`css`), nó an dá rud.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Clárú aitheanta-de-chumas

Ritheann `buildTokens` agus `toCss` `checkPlugins` thar na breiseáin a pasálann tú. Agus é ag rabhadh — ní thógtar eithne riamh — nuair nach bhfuil greim a oireann don chéim ina bhfuil breiseán cláraithe, mar sin sleamhnaítear breiseán token-aonair a pasáladh chuig `toCss` le nóta seachas gan oiread is aon ghníomh a dhéanamh go ciúin.

## Comhcheangal breiseán

Tóg breiseán ar bharr breiseán eile le `extendPlugin`, nó comhcheangail comh-mheaitheanna le `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Comhcheanglaíonn greimanna céim-cheart: ritheann `tokens` an bun ansin an breiseán, chomhtháthaíonn `css` an bheirt a chuidiú, agus ritheann `icons` an bheirt.

## Bailíochtú aschur do bhreiseáin

Rith na seiceálacha drift roinnte ó `@pantoken/utils` thar aschur do bhreiseáin féin ina thástáil, ionas go dtitfidh litriú mícheart nó token athainmniúcháin go tapa agus go háitiúil:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Na breiseáin pacáistithe

- `@pantoken/plugin-simple-icons` — brandáil lógónna ó simple-icons, cláraithe mar thokennna íocón.
- `@pantoken/plugin-lucide-lab` — lógónna Lucide Lab, cláraithe mar `--instui-icon-*` token íomhá.
- `@pantoken/plugin-logos` — lógónna táirgí Instructure mar SVGanna, URIanna sonraí, agus `--instui-logo-*`
  token íomhá.
- `@pantoken/plugin-prune-custom-props` — breiseán PostCSS (ní breiseán pantoken é) a chuireann próifílí saincheaptha neamhúsáidte as stíleán.
- `@pantoken/plugin-custom-theme-colors` — athbrandaíonn leathanach trí ghnáthghné a shocrú
  (`data-pantoken-color`) chuig ceann de 13 pailléid, nó chuig `custom` do aon hex branda. Féach
  [Dathanna téama](#theme-colors).
- `@pantoken/plugin-custom-components` — rialuithe saincheaptha tacaíochta-token lena n-áirítear SegmentedControl
  agus SkeletonLoader.

### Rialú roinnte

Bain úsáid as rialtóir roinnte do dhá go cúig radharc nó scagaire gaolmhar. Is raidió dúchais lipéadaithe é gach rogha i ngrúpa ainmniúil amháin; marcáil ceann amháin mar seiceáilte ar dtús. Bain úsáid as cluaisíní nó liosta anuas má ní oireann na roghanna go compórdach, agus bain úsáid as grúpaí cnaipe do ghníomhartha seachas roghanna. Is é stíl `-size-md` an réamhshocrú, le `-size-sm` agus `-size-lg` do chomhthéacsanna níos dainge agus níos suntasaí.

Allmhairigh `@pantoken/plugin-custom-components/segmented-control.css` don rialtóir agus dá chnaipeacha sreafa. Bain úsáid as rang `-icon-*` ar lipéad seicheam nuair is gá glyf don seicheam; cuireann an cúnamh idirghníomhaíochta an rang `-icon-*` óna iontráil dhúchais go dtí péintéir an lipéid. Tabhair `aria-label` tuairisciúil don fieldset nó finscéal infheicthe. Coinníonn an cúnamh an fógra raidió dúchais, cuireann sé nascleanúint méarchláir, agus nochtann sé go roghnach seicheam amháin greamaithe in aghaidh gach brú saighead. Bain úsáid as rialuithe tús/deireadh loighiciúla agus lipéid cnaipe inacmhainne i mbeirt treoracha:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Allmhairigh `@pantoken/interactions/segmented-control.iife.js` le haghaidh clárúcháin DOM-ready, nó glaoigh
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` ó `@pantoken/interactions`
agus glaoigh `cleanup()` nuair a bhaint as. Oibríonn an CSS agus na roghanna raidió dúchais gan JS; teastaíonn an iomarca saigheada don iompar. Úsáideann an mír roghnaithe scáil dearaidh dhá-sraithe ón dath do dhroimscáth shéamanta; is scáil mír-ghníomhach shainiúil í seachas comhdhéanamh `--instui-elevation-*` atá ann cheana. Úsáideann cnaipeacha iomarca na toicnéin ardaithe upstream elevation3 trí `--pantoken-segmented-overflow-shadow`.

### Luchtú skeleton

Tá stíl-phasfhocal faoi-bhealach `skeleton-loader.css` do théacs maisiúil, Avatar, nó cruth Íomhá amháin. Glacann Text le `-size-xxs` trí `-size-xxl`; tá Avatar agus Image meánmhéide. Cuirfidh gach `.skeleton-row` roghnach líne téacs amháin gan an méid a athrú. Stopann an gile CSS tar éis trí shweeps 1.5 soicind agus fanann sé statach nuair is fearr leis an úsáideoir gluaiseacht laghdaithe. Oibríonn sé sula luchtófar JavaScript.

Cuir cruthanna áit amháin amháin áit a bhfeicfear ábhar spleách ar cheist, ní thar nascleanúint, scagairí, ceannlínte, nó rialuithe a bhfuil eolas an fhreastalaí orthu. Ní tomhas dul chun cinn nó staid gnóghníomhach é skeleton. Coinnigh ábhar reatha le feiceáil le linn athnuachan cúlra; bain úsáid as spinner nó staid ghnóghníomhach cnaipe do ghníomhartha.

Tá stádas luchtaithe, luchtaithe, folamh, agus marcáil earráide faoi úinéireacht an iarratais tuismitheora. Soláthraigh limistéar stádais folamh amháin in aghaidh an leathanaigh agus rabhaidh folamh ar leith sa HTML freastalaí, araon **amach** ón limistéar ábhar gnóghnóthach:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Glaoigh an iompar leibhéal-tuismitheora nuair a athraíonn staid an iarrata. Nuashonraíonn sé `aria-busy` agus na dhá fhógra réamhchuirteacha, ach ní dhéanann sé riamh ábhar a athsholáthar ná fócas a bhogadh:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Má tá an pacáiste idirghníomhaíochtaí per-component á úsáid in ionad an allmhairiú díreach, scaipeadh imeacht `pantoken:skeleton-state` ar an eilimint `[data-skeleton-region]` le
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Múch moill ar _tuiscint_ na n-áplaceála trí 200–500ms do iarrataí tapa; déanann an iompar an moill fhógra luchtaithe faoi 400ms go neamhspleách. Ar luchtuithe leathanach pasba, fág fócas ina bhfuil sé. Bog fócas go toradh nua-luchtaithe ach amháin nuair a d’iarr gníomh an úsáideora é féin é. Fógraíonn an nóid stádais torthaí agus stáit fholamh; fógraíonn an nóid rabhaidh theip. Ná comhcheangail `aria-busy`, `role="status"`, agus
`role="alert"` ar eilimint amháin.

Féadfar clárú clárlainne Lucide Lab a luchtú go mall, ansin é a pasáil chuig an ngreim token comhsionnach:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Tá cúpla rud a bhíodh ina bhreiseáin anois ag dul i gcóir i `@pantoken/components`, ó tharla go n-úsáideann an-chuid comhpháirteanna iad amach den bhosca: scáthanna ardaithe (`--instui-elevation-*`, i `components.css`), fáinne béime fócas (i `base.css` — faigheann gach rud inléite é nuair a bhaineann pantoken leathanach leis), agus na claonta branda Instructure (Atkinson Hyperlegible Next: cuireann `base.css` i bhfeidhm `--instui-font-family-base`; luchtóidh an roghnú `@pantoken/components/fonts.css` na woff2s `@font-face`).

## Dathanna téama

Gintear `@pantoken/plugin-custom-theme-colors` bloc `[data-pantoken-color="…"]` amháin in aghaidh na pailléide
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Léiríonn gach bloc na príomhghnéithe branda (`--instui-primitive-color-navy-*` agus `-blue-*`)
ag an pailléid roghnaithe. Déanann sé freisin athghiniúint ar na dromchlaí branda a d’iompaigh upstream go hexanna litreacha, ag coinneáil a n-aigéad tochta trí `color-mix()`. Fanann dathanna stádais shéamanta, béimí gorma soiléire, agus scáthanna ardaithe ina n-áiteanna. Bain triail as sa
[taispeántas téamúcháin bunaithe ar swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Dath branda saincheaptha

Socraigh `data-pantoken-color="custom"` chun athbranda a dhéanamh ó aon hex, mar shampla an dath príomha a chlóscríobhann riarachán Canvas isteach sa Eagarthóir Téama. Déanann pantoken scála iomlán 10–200 `--instui-primitive-color-custom-*`
uaidh:

1. **Cuair cur i gcuimhne.** Is iad lonruchtacht sprioc gach chéim meán-lonruchtachta OKLCH na 13 pailléid ag an gcéim sin, le 0 socraithe ar bán agus 210 ar dhonn. Mar sin seachnaíonn spásáil an scála saincheaptha lena chéile a fheabhsú leis na pailléid a seoladh.
2. **Carnán.** Tagann an ionchur ar an gcéim a bhfuil an lonruchtacht sprioc is gaire dá lonruchtacht féin, ansin bíonn sé greamaithe chuig an lonruchtacht sin go cruinn. Éiríonn `#cccccc` mar `custom-40` ag `#c9c9c9`: gar don ionchur, ach ní i gcónaí comhionann. Ciallaíonn "is gaire" an céim is gaire ar an gcuaire, ní an dath pailléid atá ann cheana is cóngaraí.
3. **Líon.** Coinníonn gach céim eile dath tosaigh an ionchuir. Leanann a shástacht curv saturation mheán na pailléid i gcoibhneas leis an anchór, agus laghdaítear í ach amháin nuair a tharlaíonn go bhfuil dath lasmuigh de sRGB.

Glacann ach `#rgb` agus `#rrggbb`; throwann aon rud eile `TypeError`, mar sin ní féidir hex ó fhoirm a instealladh i CSS.

Ag am tógála, gintear an riail iomlán leis na príomhghnéithe gaolta a bheith suntasach cheana:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Chun an dath a roghnú ag runtime gan an tacar token a sheoladh, réamhghnóthaigh an cuáir agus an riail athmhapála ag am tógála. Ansin bain úsáid as an iontráil `/scale` saor ó spleáchas sa bhrabhsálaí, agus socraigh na 20 príomhghné dírithe amháin:

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

Oibríonn roghnóir téama shuíomh na ndoiciméad, an eagarthóir téama Canvas, agus an taispeántas thuas ar an mbealach seo.

Féach an [Tagairt API](/api/) le haghaidh onnmhairiú gach breiseáin.
