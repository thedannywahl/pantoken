# Vtičniki

Pantoken vtičnik razširi izhod tokenov ali CSS brez forkanja paketa. Zgradite ga z `definePlugin` iz `@pantoken/plugin-kit`, nato pa ga podajte `buildTokens` ali `toCss`.

## Ustvarite vtičnik

Podajte `definePlugin` kljuke, ki jih implementirate. Vrne običajen vtičnik, označen s sposobnostmi, izpeljanimi iz teh kljuk. Vtičnik lahko razširi IR (`tokens`, `icons`), izhod CSS (`css`), ali oboje.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registracija, ki upošteva sposobnosti

`buildTokens` in `toCss` zaženejo `checkPlugins` nad vtičniki, ki jih podate. Opozori — nikoli ne vrže napake — ko vtičnik nima ustrezne kljuke za fazo, v kateri je registriran, zato se vtičnik, ki je samo za tokene in je podan `toCss`, preskoči z opombo namesto da bi tiho nič naredil.

## Sestavljanje vtičnikov

Zgradite na vrhu drugega vtičnika z `extendPlugin`, ali združite sorodnike z `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kljuke iste faze se sestavljajo: `tokens` zažene osnovni nato dodatek, `css` združi oba prispevka, in `icons` zažene oba.

## Preverite izhod vašega vtičnika

Zaženite skupne drift preverbe iz `@pantoken/utils` nad izhodom vašega vtičnika v njegovem testu, tako da tipkarska napaka ali preimenovan token hitro in lokalno odpove:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Vgrajeni vtičniki

- `@pantoken/plugin-simple-icons` — blagovne ikone iz simple-icons, registrirane kot ikonni tokeni.
- `@pantoken/plugin-logos` — Instructure produktne logotipe kot SVG, podatkovne URI in `--instui-logo-*`
  slikovne tokene.
- `@pantoken/plugin-prune-custom-props` — PostCSS vtičnik (ni pantoken vtičnik), ki odstrani
  neuporabljena uporabniška svojstva iz slogovnega lista.

Nekaj stvari, ki so bile prej vtičniki, zdaj izhaja iz `@pantoken/components`, saj jih tako veliko komponent potrebuje privzeto: sence elevacije (`--instui-elevation-*`, v `components.css`), obroček fokus-obrobe (v `base.css` — vsak fokusabilen element ga dobi, ko pantoken upravlja stran), in Instructure blagovne pisave (Atkinson Hyperlegible Next: `base.css` uporablja `--instui-font-family-base`; izbirni `@pantoken/components/fonts.css` naloži `@font-face` woff2 datoteke).

Poglejte [API referenco](/api/) za izvoze posameznih vtičnikov.
