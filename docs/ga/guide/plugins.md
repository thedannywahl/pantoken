# Breiseáin

Síneann breiseán pantoken as an aschur tóicín nó CSS gan pacáiste a fhréamhadh. Tógann tú ceann le `definePlugin` ó `@pantoken/plugin-kit`, ansin passa é chuig `buildTokens` nó `toCss`.

## Údar breiseáin

Tabhair na hooks a chuireann tú i bhfeidhm do `definePlugin`. Fillfidh sé breiseán gnáth, brandaithe leis na cumais a réitítear ó na hooks sin. Is féidir le breiseán an IR a shíneadh (`tokens`, `icons`), aschur an CSS (`css`), nó an dá rud.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Clárú a thuigeann cumais

Ritheann `buildTokens` agus `toCss` `checkPlugins` thar na breiseáin a ritheann tú. Rabhraíonn sé — ní chaithtear é riamh — nuair nach bhfuil hook comhfhreagrach ag breiseán don chéim ina bhfuil sé cláraithe, mar sin scipeáiltear breiseán atá dírithe ar thóicíní amháin a ritheadh chuig `toCss` le nóta seachas gan ghá a dhéanamh gan fhuaim.

## Comhcheangal breiseáin

Tóg ar bharr breiseán eile le `extendPlugin`, nó cumais a chomhcheangal le comhghleacaithe le `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Comhcheanglaíonn hooks den chéim chéanna: rithann `tokens` an bonn ansin an breiseán breise, comhtháthaíonn `css` an dá rannchuidiú, agus rithann `icons` an dá cheann.

## Bailíochtú aschur do bhreiseáin

Rith na seiceálacha drift roinnte ó `@pantoken/utils` thar aschur do bhreiseáin féin ina thástáil, ionas go n-eascróidh botún litrithe nó tóicín athainmnithe go tapa agus go háitiúil:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Na breiseáin phacáistithe

- `@pantoken/plugin-simple-icons` — siombailí branda ó simple-icons, cláraithe mar thóicíní íocón.
- `@pantoken/plugin-logos` — lógónna táirgí Instructure mar SVGanna, URIs sonraí, agus tóicíní íomhá `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — breiseán PostCSS (ní breiseán pantoken é) a tharraingíonn airíonna saincheaptha neamhúsáidte as stíleáil.

Tá cúpla rud a bhíodh mar bhreiseáin anois á n-uaslódáil i `@pantoken/components`, ós rud é go dteastaíonn iad ó go leor comhpháirteanna amuigh den bhosca: scáthanna uainíochta (`--instui-elevation-*`, in `components.css`), fáinne téad fócas (in `base.css` — faigheann gach eilimint in-ghníomhach é nuair a bhainfidh pantoken leis an leathanach), agus na clóanna branda Instructure (Atkinson Hyperlegible Next: chuirtear i bhfeidhm `base.css` `--instui-font-family-base`; lódálann an roghnach `@pantoken/components/fonts.css` na woff2s `@font-face`).

Féach an [API reference](/api/) le haghaidh onnmhairíochtaí gach breiseáin.
