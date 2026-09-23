# Laajennukset

Pantoken-laajennus laajentaa token- tai CSS‑tuotosta ilman paketin haarauttamista. Rakennat sellaisen
`definePlugin` avulla `@pantoken/plugin-kit`:stä, ja sitten annat sen `buildTokens`:lle tai `toCss`:lle.

## Laadi laajennus

Anna `definePlugin`:lle ne koukut (hooks), jotka toteutat. Se palauttaa tavallisen laajennuksen, merkittynä
kyvykkyyksillä, jotka päätellään näistä koukuista. Laajennus voi laajentaa IR:ää (`tokens`, `icons`), CSS‑
tuotosta (`css`), tai molempia.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kyvykkyyksiin perustuva rekisteröinti

`buildTokens` ja `toCss` ajavat `checkPlugins`:n läpi lähetettyjen laajennusten yli. Ne varoittavat — ne eivät koskaan heitä poikkeusta —
kun laajennuksella ei ole vaiheelle sopivaa koukkua, joten pelkkien tokenien laajennus, joka annetaan
`toCss`:lle, ohitetaan huomautuksella sen sijaan, että se tekisi hiljaa mitään.

## Kokoa laajennuksia

Rakenna toisen laajennuksen päälle `extendPlugin`:lla, tai yhdistä vertaisten laajennuksia `mergePlugin`:lla:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Saman vaiheen koukut voidaan koostaa: `tokens` suorittaa ensin perustan ja sitten lisän, `css` yhdistää kaksi
panosta, ja `icons` suorittaa molemmat.

## Vahvista laajennuksesi tuotosta

Aja yhteiset drift-tarkistukset `@pantoken/utils`:stä laajennuksesi omalle tuotokselle testeissä, jotta
kirjoitusvirhe tai uudelleennimetty token epäonnistuu nopeasti ja paikallisesti:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Mukana tulevat laajennukset

- `@pantoken/plugin-simple-icons` — brändi‑ikonit simple-iconsista, rekisteröity ikonitokeneina.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ‑ikonit, rekisteröityinä `--instui-icon-*` kuva­tokeneina.
- `@pantoken/plugin-logos` — Instructuren tuotemerkkilogot SVG:inä, data-URI:ina ja `--instui-logo-*`
  kuvatokeneina.
- `@pantoken/plugin-prune-custom-props` — PostCSS‑plugin (ei pantoken‑laajennus), joka poistaa
  käyttämättömät custom‑propertyt tyylitiedostosta.

Lucide Labin rekisteri voidaan ladata laiskasti, ja sitten antaa synkroniselle token‑koukulle:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muutama asia, jotka olivat aiemmin laajennuksia, toimitetaan nyt `@pantoken/components`:ssa, koska niin moni komponentti tarvitsee
niitä suoraan: elevation‑varjot (`--instui-elevation-*`, `components.css`:ssa), focus‑outline
‑sormus ( `base.css`:ssa — jokainen fokusoitava saa sen, kun pantoken hallitsee sivua), ja Instructure‑brändin
fontit (Atkinson Hyperlegible Next: `base.css` soveltaa `--instui-font-family-base`; valinnainen
`@pantoken/components/fonts.css` lataa `@font-face` woff2‑tiedostot).

Katso kunkin laajennuksen vientiä varten [API‑viite](/api/).
