# Vtičniki

Pantoken vtičnik razširi izhod tokenov ali CSS brez razvejitve paketa. Narejen je z
`definePlugin` iz `@pantoken/plugin-kit`, nato pa ga posredujete `buildTokens` ali `toCss`.

## Avtor vtičnika

Dajte `definePlugin` kuke, ki jih implementirate. Vrne običajen vtičnik, označen s
sposobnostmi, izpeljanimi iz teh kuk. Vtičnik lahko razširi IR (`tokens`, `icons`), izhod CSS (`css`), ali oboje.

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

`buildTokens` in `toCss` zaženeta `checkPlugins` nad vtičniki, ki jih posredujete. Opozori — nikoli ne vrže izjeme — kadar vtičnik nima ujemajočega se kuka za fazo, v kateri je registriran, zato se vtičnik, ki je samo za tokene in ga posredujete `toCss`, preskoči z opombo namesto da bi tiho ne naredil ničesar.

## Sestavljanje vtičnikov

Zgradite na vrhu drugega vtičnika z `extendPlugin`, ali združite vršnjake z `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kuki iste faze se sestavljajo: `tokens` zažene osnovo, nato dodatek, `css` združi oba prispevka, in `icons` zažene oba.

## Preverite izhod svojega vtičnika

Zaženite deljene kontrole drift iz `@pantoken/utils` nad izhodom vašega vtičnika v njegovem testu, tako da tipkarska napaka ali preimenovan token hitro in lokalno povzroči napako:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Vgrajeni vtičniki

- `@pantoken/plugin-simple-icons` — znamke ikon iz simple-icons, registrirane kot ikonotni tokeni.
- `@pantoken/plugin-lucide-lab` — ikone Lucide Lab, registrirane kot `--instui-icon-*` image tokeni.
- `@pantoken/plugin-logos` — Instructure logotipi produktov kot SVG, data URI-ji in `--instui-logo-*`
  image tokeni.
- `@pantoken/plugin-prune-custom-props` — PostCSS vtičnik (ni pantoken vtičnik), ki odstrani
  neuporabljene prilagojene lastnosti iz sloga.

Registrijo Lucide Lab je mogoče naložiti lenobno (lazy), nato pa jo posredovati sinhronemu token kuku:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nekatere stvari, ki so bile prej vtičniki, zdaj prihajajo v `@pantoken/components`, saj jih toliko komponent potrebuje takoj: sence višine (`--instui-elevation-*`, v `components.css`), obroček fokus-obrobe
(in `base.css` — vsak fokusabilni element ga dobi, ko pantoken upravlja stran), in Instructure znamčne
pisave (Atkinson Hyperlegible Next: `base.css` uporablja `--instui-font-family-base`; izbirni
`@pantoken/components/fonts.css` naloži `@font-face` woff2 datoteke).

Poglejte [API reference](/api/) za izvoze vsakega vtičnika.
