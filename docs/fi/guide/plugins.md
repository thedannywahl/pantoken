# Laajennokset

pantoken-laajennus laajentaa token- tai CSS-lähtöä ilman, että pakettia täytyy haarukoida. Rakennat sellaisen
`definePlugin` avulla `@pantoken/plugin-kit`:sta, ja annat sen sitten `buildTokens`:lle tai `toCss`:lle.

## Laajennuksen kirjoittaminen

Anna `definePlugin`:lle ne koukut (hooks), jotka toteutat. Se palauttaa tavallisen laajennuksen, brändättynä niistä koukuista
pääteltyillä kyvykkyyksillä. Laajennus voi laajentaa IR:ää (`tokens`, `icons`), CSS-lähtöä (`css`), tai molempia.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kyvykkyystietoinen rekisteröinti

`buildTokens` ja `toCss` ajavat `checkPlugins`:n laajennuksillesi. Ne varoittavat — eivät koskaan heitä poikkeusta —
kun laajennuksella ei ole vastaavaa koukkua sille vaiheelle, johon se rekisteröidään, joten pelkkä token-laajennus, joka annetaan
`toCss`:lle, ohitetaan ilmoituksella sen sijaan, että se tekisi hiljaisesti ei-mitään.

## Laajennusten yhdistäminen

Rakennettu toisen laajennuksen päälle `extendPlugin`:lla, tai yhdistä vertaisia `mergePlugin`:lla:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Saman vaiheen koukut yhdistyvät: `tokens` ajaa ensin perusosan ja sitten lisän, `css` yhdistää molemmat
panokset, ja `icons` ajaa molemmat.

## Vahvista laajennuksesi lähtö

Aja jaetut drift-tarkistukset `@pantoken/utils`:stä laajennuksesi omalle lähdölle testissään, jotta kirjoitusvirhe tai uudelleennimetty token epäonnistuu
nopeasti ja paikallisesti:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Mukana tulevat laajennukset

- `@pantoken/plugin-simple-icons` — brändää ikonit simple-icons:sta, rekisteröityinä ikonitokeneina.
- `@pantoken/plugin-logos` — Instructuren tuotemerkkilogot SVG-muodossa, data-URIina ja `--instui-logo-*`
  kuva-tokeneina.
- `@pantoken/plugin-prune-custom-props` — PostCSS-laajennus (ei pantoken-laajennus), joka poistaa
  käyttämättömät custom propertyt tyylitiedostosta.

Muutama aiemmin laajennuksena tarjottu osa toimitetaan nyt `@pantoken/components`:ssa, koska niin monella komponentilla on
tarve niille valmiiksi: elevation-varjot (`--instui-elevation-*`, `components.css`), focus-outline-kehä
(`base.css` — jokainen fokusoitava saa sen, kun pantoken hallitsee sivua), ja Instructure-brändin fontit
(Atkinson Hyperlegible Next: `base.css` soveltaa `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` lataa `@font-face` woff2:t).

Katso [API-viite](/api/) kunkin laajennuksen exporteista.
