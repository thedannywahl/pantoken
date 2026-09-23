# Breiseáin

Leathnaíonn breiseán pantoken aschur token nó CSS gan pacáiste a fhóraic. Tógann tú ceann le `definePlugin` ó `@pantoken/plugin-kit`, ansin pasálann tú é chuig `buildTokens` nó `toCss`.

## Cruthaigh breiseán

Tabhair na hooks a impleménóidh tú do `definePlugin`. Fillfidh sé breiseán gnáth, marcáilte leis na cumais a mheastear ó na hooks sin. Is féidir le breiseán an IR a leathnú (`tokens`, `icons`), aschur CSS a leathnú (`css`), nó an dá rud a dhéanamh.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Clárú atá eolach ar chumasanna

Ritheann `buildTokens` agus `toCss` `checkPlugins` thar na breiseáin a thugann tú. Tugann sé foláireamh — ní thógann sé earráid — nuair nach bhfuil hook oiriúnach ag breiseán don chéim ina bhfuil sé cláraithe, mar sin scipeáiltear breiseán atá dírithe ar thokens amháin a pasáladh chuig `toCss` le nóta seachas gan aon rud a dhéanamh go ciúin.

## Comhcheangail breiseáin

Tóg ar bhonn breiseán eile le `extendPlugin`, nó comhcheangail comhghleacaithe le `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Comhcheanglaíonn hooks den chéim chéanna: ritheann `tokens` an bunáit agus ansin an breis, cuireann `css` na ranníocaí le chéile, agus ritheann `icons` an dá cheann.

## Bailíochtú aschuir do bhreiseáin

Rith na seiceálacha drift roinnte ó `@pantoken/utils` thar aschur do bhreiseáin féin ina thriail, ionas go theipfidh litriú mícheart nó token athainmnithe go tapa agus go háitiúil:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Na breiseáin bhundáilte

- `@pantoken/plugin-simple-icons` — brandaigh deilbhíní ó simple-icons, cláraithe mar token deilbhín.
- `@pantoken/plugin-lucide-lab` — deilbhíní Lucide Lab, cláraithe mar `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — lógónna táirgí Instructure mar SVGanna, URIanna sonraí, agus `--instui-logo-*` image tokens.
- `@pantoken/plugin-prune-custom-props` — breiseán PostCSS (ní breiseán pantoken) a dhíbriseann airíonna saincheaptha neamhúsáidte ó stíleabhait.

Is féidir clárclár Lucide Lab a luchtú go moille, ansin é a phasáil chuig an hook token sioncrónach:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Tá cúpla rud a bhíodh ina mbreiseáin anois á bpacáistiú i `@pantoken/components`, ós rud é go bhfuil an-chuid comhdhéanamh ag teastáil uathu as an mbosca: scáthanna ardaithe (`--instui-elevation-*`, i `components.css`), an fáinne focus-outline (i `base.css` — faigheann gach eilimint fócasaithe é nuair atá pantoken i seilbh an leathanaigh), agus na clóanna branda Instructure (Atkinson Hyperlegible Next: cuireann `base.css` i bhfeidhm `--instui-font-family-base`; luchtóidh an roghnach `@pantoken/components/fonts.css` na woff2s `@font-face`).

Féach an [tagairt API](/api/) do onnmhairí gach breiseáin.
