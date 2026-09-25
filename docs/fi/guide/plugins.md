# Laajennukset

pantoken-laajennus laajentaa tokenien tai CSS:n tuotosta ilman, että pakettia täytyy haarukoida. Rakentaminen tapahtuu `definePlugin` avulla `@pantoken/plugin-kit` -koodista, jonka jälkeen se annetaan `buildTokens`:lle tai `toCss`:lle.

## Kirjoita laajennus

Anna `definePlugin` toteuttamasi koukut. Se palauttaa tavallisen laajennuksen, merkittynä koukkujen perusteella pääteltyillä ominaisuuksilla. Laajennus voi laajentaa IR:ää (`tokens`, `icons`), CSS-tuotosta (`css`), tai molempia.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Ominaisuustietoiseen rekisteröintiin

`buildTokens` ja `toCss` suorittavat `checkPlugins` läpi lähetetyille laajennuksille. Ne antavat varoituksen — ne eivät koskaan heitä virhettä — kun laajennuksella ei ole vastaavaa koukkua sille vaiheelle, johon se rekisteröidään. Näin pelkkää tokenia tuottava laajennus, joka annetaan `toCss`:lle, ohitetaan merkinnällä sen sijaan että se jättäisi asian huomiotta.

## Yhdistä laajennuksia

Rakenna toisen laajennuksen päälle `extendPlugin`:lla, tai yhdistä tasavertaiset laajennukset `mergePlugin`:lla:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Saman vaiheen koukut yhdistyvät: `tokens` ajaa ensin perustan sitten lisäyksen, `css` yhdistää molemmat kontribuutiot, ja `icons` ajaa molemmat.

## Varmista laajennuksesi tulos

Suorita jaetut drift-tarkistukset `@pantoken/utils`:stä laajennuksesi oman tuotoksen yli testissä, jotta kirjoitusvirhe tai uudelleennimetty token epäonnistuu nopeasti ja paikallisesti:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Mukana tulevat laajennukset

- `@pantoken/plugin-simple-icons` — brändi-ikonit simple-iconsista, rekisteröityinä ikonitokeneina.
- `@pantoken/plugin-lucide-lab` — Lucide Lab -ikonit, rekisteröitynä `--instui-icon-*` kuvatokeneina.
- `@pantoken/plugin-logos` — Instructuren tuotemerkkilogot SVG:inä, data-URI:ina ja `--instui-logo-*`
  kuvatokeneina.
- `@pantoken/plugin-prune-custom-props` — PostCSS-laajennus (ei pantoken-laajennus), joka poistaa käyttämättömät mukautetut ominaisuudet tyylitiedostosta.
- `@pantoken/plugin-custom-theme-colors` — muuttaa sivun brändiä asettamalla yhden attribuutin
  (`data-pantoken-color`) yhdeksi 13 paletista tai `custom` mihin tahansa brändin heksiin. Katso
  [Teemavärit](#theme-colors).

Lucide Labin rekisteri voidaan ladata laiskasti ja sitten antaa synkroniselle token-koukulle:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muutama aiemmin laajennuksena toimitettu osa sisältyy nyt `@pantoken/components`:ään, koska niin monet komponentit tarvitsevat niitä oletuksena: elevation-varjot (`--instui-elevation-*`, `components.css`), focus-outline-sormus ( `base.css` — jokainen fokusoitava saa sen, kun pantoken omistaa sivun), ja Instructuren brändi-fontit (Atkinson Hyperlegible Next: `base.css` soveltaa `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` lataa `@font-face` woff2-tiedostot).

## Teemavärit {#theme-colors}

`@pantoken/plugin-custom-theme-colors` tuottaa yhden `[data-pantoken-color="…"]`-lohkotuksen per paletti
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Kukin lohko osoittaa brändin primitiivit (`--instui-primitive-color-navy-*` ja `-blue-*`)
valitulle paletille. Se myös uudelleenjohdettaa ne brändipinnat, jotka upstream oli litistänyt kirjaimellisiksi hexeiksi, säilyttäen niiden leivotun alfan `color-mix()` kautta. Semanttiset tilavärit, eksplisiittiset siniset korostukset ja elevation-varjot pysyvät ennallaan. Kokeile [näytepohjaista teema-demoa](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Mukautettu brändiväri

Aseta `data-pantoken-color="custom"` uudelleenbrändäykseen mistä tahansa heksistä, esimerkiksi pääväri, jonka Canvasin ylläpitäjä kirjoittaa Teemamuokkaajaan. pantoken johdettaa siitä täydellisen 10–200 `--instui-primitive-color-custom-*`
asteikon:

1. **Viitekõyrä.** Kunkin askeleen kohdevalotusarvo on 13 paletin saman askeleen keskimääräinen OKLCH-valoisuus, missä 0 on valkoinen ja 210 musta. Näin mukautetun asteikon erotus vastaa toimitettuja paletteja.
2. **Ankkuri.** Syöte sijoittuu sille askeleelle, jonka kohdevalotusarvo on lähimpänä sen omaa, ja sitten se napsahtaa tarkasti siihen valotukseen. `#cccccc` muuttuu `custom-40`:ksi kohdassa `#c9c9c9`: lähellä syötettä, mutta ei aina identtinen. "Lähin" tarkoittaa lähintä askelta käyrällä, ei lähintä olemassa olevaa palettiväriä.
3. **Täyttö.** Jokainen muu askel säilyttää syötteen sävyn. Sen kylläisyys seuraa palettien keskimääräistä kylläisyyskäyrää suhteessa ankkuriin, ja sitä vähennetään vain siellä, missä väri osuu sRGB-alueen ulkopuolelle.

Vain `#rgb` ja `#rrggbb` hyväksytään; mikä tahansa muu aiheuttaa `TypeError`-poikkeuksen, joten lomakkeesta tullut heksiarvo ei voi injektoida CSS:ää.

Käännä koko sääntö rakennusvaiheessa valmiiksi johdetuilla primitiiveillä:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Kun halutaan valita väri ajonaikaisesti ilman token-setin lähettämistä, esilasketaan käyrä ja uudelleenkartoitussääntö rakennusvaiheessa. Sitten käytetään riippuvuusvapaata `/scale` -merkintää selaimessa ja asetetaan vain 20 johdettua primitiiviä:

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

Doksaitein teemanvalitsin, Canvasin teemaeditori ja yllämainittu demo toimivat tällä tavalla.

Katso [API-viite](/api/) kunkin laajennuksen vientien dokumentaatiota.
