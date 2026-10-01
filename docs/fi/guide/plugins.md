# Laajennukset

pantoken-laajennus laajentaa token- tai CSS-tuloa ilman paketin haarauttamista. Sen rakentaa `definePlugin`:lla `@pantoken/plugin-kit`-stä ja välittää sitten `buildTokens`:lle tai `toCss`:lle.

## Laajennuksen kirjoittaminen

Anna `definePlugin`:lle toteuttamasi koukut. Se palauttaa normaalin laajennuksen, joka on merkitty niistä koukuista pääteltyjen ominaisuuksien mukaan. Laajennus voi laajentaa IR:ää (`tokens`, `icons`), CSS-tulosta (`css`), tai molempia.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Ominaisuustietoinen rekisteröinti

`buildTokens` ja `toCss` suorittavat `checkPlugins`:n läpi lähetetyille laajennuksille. Se varoittaa — ei koskaan heitä virhettä — kun laajennuksella ei ole vastaavaa koukkua sille vaiheelle, johon se rekisteröitiin, joten pelkkää tokenia tuottava laajennus, joka annetaan `toCss`:lle, ohitetaan huomautuksella sen sijaan että se tekisi hiljaisesti ei mitään.

## Laajennusten yhdistäminen

Laajenna toisen laajennuksen päälle `extendPlugin`:lla, tai yhdistä vertaisia `mergePlugin`:lla:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Saman vaiheen koukut yhdistyvät: `tokens` suorittaa ensin perustan ja sitten lisäyksen, `css` yhdistää molemmat kontribuutiot, ja `icons` suorittaa molemmat.

## Vahvista laajennuksesi tulos

Suorita jaetut drift-tarkistukset `@pantoken/utils`:stä laajennuksesi omalle tuotokselle sen testissä, jotta kirjoitusvirhe tai uudelleennimetty token epäonnistuu nopeasti ja paikallisesti:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Mukana tulevat laajennukset

- `@pantoken/plugin-simple-icons` — brändi-ikonit simple-iconsista, rekisteröityinä ikonitokenina.
- `@pantoken/plugin-lucide-lab` — Lucide Lab -ikonit, rekisteröityinä `--instui-icon-*` kuva-tokeneina.
- `@pantoken/plugin-logos` — Instructuren tuotemerkkilogot SVG:inä, data-URI:ina ja `--instui-logo-*` kuva-tokeneina.
- `@pantoken/plugin-prune-custom-props` — PostCSS-laajennus (ei pantoken-laajennus), joka poistaa käyttämättömät custom propertyt tyylitaulukosta.
- `@pantoken/plugin-custom-theme-colors` — brändää sivun asettamalla yhden attribuutin
  (`data-pantoken-color`) yhdeksi 13 paletista tai `custom`:ksi minkä tahansa brändin hexille. Katso [Teeman värit](#theme-colors).
- `@pantoken/plugin-custom-components` — token-pohjaiset mukautetut kontrollit, mukaan lukien SegmentedControl
  ja SkeletonLoader.

### Segmentoitu valitsin

Käytä segmentoitu valitsinta kahdelle–viidelle liittyvälle näkymälle tai suodattimelle. Jokainen vaihtoehto on merkitty natiivinen radio yhdessä nimetyssä ryhmässä; merkitse yksi aluksi valituksi. Käytä välilehtiä tai pudotusvalikkoa, jos vaihtoehdot eivät mahdu mukavasti, ja käytä painikejoukkoja toimintoihin eikä valintoihin. `-size-md`-tyyli on oletus, `-size-sm` ja `-size-lg` sopivat tiiviimpiin ja näkyvämpiin yhteyksiin.

Tuo ohjainta ja sen ylivuotopainikkeita varten `@pantoken/plugin-custom-components/segmented-control.css`. Käytä segmentin merkinnässä `-icon-*`-luokkaa, kun segmentti tarvitsee kuvakkeen; vuorovaikutusapuri myös promotoi `-icon-*`-luokan sen natiivista inputista labelin piirtäjälle. Anna fieldsetille kuvaava `aria-label` tai näkyvä legenda. Apuri säilyttää natiivin radioilmoituksen, lisää näppäimistönavigoinnin ja paljastaa valinnaisesti yhden katkaistun segmentin nuolinäppäimen painalluksella. Käytä loogisia alku/loppu-kontrolleja ja saavutettavia painike-tekstejä molempiin suuntiin:

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

Tuo DOM-valmiiseen rekisteröintiin `@pantoken/interactions/segmented-control.iife.js`, tai kutsu
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` `@pantoken/interactions`:stä
ja kutsu `cleanup()` sen poiston yhteydessä. CSS ja natiiviset radio-valinnat toimivat ilman JS:ää; ylivuotonuolia varten tarvitaan käyttäytyminen. Valittu kohta käyttää semanttisten drop-shadow-värien kaksikerroksista varjomuotoilua; se on erillinen aktiivisen kohteen varjo eikä olemassa oleva `--instui-elevation-*` -komposiitti. Ylivuotopainikkeet käyttävät upstream elevation3-komponentin tokeneita `--pantoken-segmented-overflow-shadow`:n kautta.

### Skeleton-lataus

`skeleton-loader.css`-alatien tyyli muotoilee yhden koristeellisen Text-, Avatar- tai Image-muodon. Text hyväksyy `-size-xxs` `-size-xxl`:n kautta; Avatar ja Image ovat keskikokoisia. Jokainen valinnainen `.skeleton-row` lisää yhden tekstirivin muuttamatta kokoa. CSS:n hohto (shimmer) loppuu kolmen 1,5 sekunnin vedon jälkeen ja pysyy staattisena, kun käyttäjä suosii vähennettyä liikettä. Se toimii ennen JavaScriptin latautumista.

Sijoita muodot vain sinne, missä kyselyriippuva sisältö tulee näkyviin, ei palvelimen tuntemaan navigaatioon, suodattimiin, otsikoihin tai kontrolleihin. Skeleton ei ole edistymismittari eikä toiminnan kuormitustila. Pidä olemassa oleva sisältö näkyvissä taustapäivitysten aikana; käytä spinneriä tai painikkeen busy-tilaa toimintoihin.

Yläsovellus hallinnoi loading-, loaded-, empty- ja error-merkintöjä. Tarjoa yksi tyhjä tilavyöhyke per sivu ja erillinen tyhjä alert palvelimen HTML:ssä, molemmat **busy**-sisältöalueen ulkopuolella:

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

Kutsu yläkäyttötason käyttäytymistä, kun pyynnön tila muuttuu. Se päivittää `aria-busy` ja kaksi ennakkoon olemassa olevaa ilmoitusta, mutta ei koskaan korvaa sisältöä tai siirrä fokusta:

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

Jos käytetään komponenttikohtaisten vuorovaikutusten pakettia suoran importin sijaan, lähetä `pantoken:skeleton-state`-tapahtuma `[data-skeleton-region]`-elementille `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`:lla. Viivästytä paikkojen näyttämistä 200–500 ms nopeasti vastaaville pyynnöille; käyttäytyminen viivästää itsenäisesti latausilmoitusta 400 ms. Passiivisilla sivulatauksilla jätä fokus paikalleen. Siirrä fokus vain, kun käyttäjän oma toiminto pyysi sitä. Statustiedon solmu ilmoittaa tuloksista ja tyhjistä tiloista; alert-solmu ilmoittaa virheistä. Älä yhdistä `aria-busy`, `role="status"` ja `role="alert"` samaan elementtiin.

Lucide Labin rekisteri voidaan ladata laiskasti ja sitten välittää synkroniselle token-koukulle:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muutama aiemmin laajennuksina toimitettu asia sisältyy nyt `@pantoken/components`:een, koska niin monet komponentit tarvitsevat ne oletuksena: elevation-varjot (`--instui-elevation-*`, `components.css`), focus-outline-sormus (sisältää `base.css` — jokainen fokusoitava saa sen, kun pantoken hallitsee sivua), ja Instructure-brändifontit (Atkinson Hyperlegible Next: `base.css` soveltaa `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` lataa `@font-face`-woff2:t).

## Teeman värit {#theme-colors}

`@pantoken/plugin-custom-theme-colors` tuottaa yhden `[data-pantoken-color="…"]`-lohkon per paletti
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Jokainen lohko osoittaa brändin primitiivit (`--instui-primitive-color-navy-*` ja `-blue-*`)
valitulle paletille. Se myös uudelleenjohdettaa brändipinnat, jotka upstream oli litteäksi muutettu literal-hexiksi,
säilyttäen niiden esikevat alfa-arvot `color-mix()`:n kautta. Semanttiset tilavärit, eksplisiittiset siniset korostukset ja
elevation-varjot pysyvät ennallaan. Kokeile sitä
[swatch-pohjaisessa teema-demossa](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Mukautettu brändiväri

Aseta `data-pantoken-color="custom"` uudelleenbrändäämistä varten mistä tahansa hexistä, esimerkiksi pääväri, jonka Canvasin ylläpitäjä syöttää Teemaeditoriin. pantoken johtaa siitä täyden 10–200 `--instui-primitive-color-custom-*`
asteikon:

1. **Viitekäyrä.** Jokaisen askeleen tavoiteltu vaaleus on 13 paletin OKLCH-vaaleuden keskiarvo kyseisessä askeleessa, jossa 0 on kiinteästi valkoinen ja 210 musta. Näin mukautetun asteikon välistys vastaa toimitettuja paletteja.
2. **Ankkuri.** Syöte sijoittuu askeleeseen, jonka tavoiteltu vaaleus on lähimpänä sen omaa, ja sitten se napsahtaa täsmälleen siihen vaaleuteen. `#cccccc` muuttuu `custom-40`:ksi `#c9c9c9`:ssa: lähellä syötettä, mutta ei aina identtinen. "Lähin" tarkoittaa lähintä askelta käyrällä, ei lähintä olemassa olevaa palettiväriä.
3. **Täyttö.** Jokainen muu askel säilyttää syötteen sävyn. Sen kylläisyys seuraa palettien keskimääräistä kylläisyyskäyrää suhteessa ankkuriin, ja sitä vähennetään vain, jos väri putoaa sRGB:n ulkopuolelle.

Vain `#rgb` ja `#rrggbb` hyväksytään; mikä tahansa muu heittää `TypeError`, joten lomakkeesta tuleva hex ei voi injektoida CSS:ää.

Build-aikana tuota koko sääntö johdetuilla primitiiveillä jo deklaroituina:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Valitaksesi värin ajon aikana ilman token-sarjan toimittamista, esilaskekaa käyrä ja remap-sääntö build-aikana. Sitten käytä riippuvuudetonta `/scale`-sisäänkäyntiä selaimessa ja aseta vain 20
johdettua primitiiviä:

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

Doksaivan sivuston teemapicker, Canvasin teemaeditori ja yllä oleva demo toimivat kaikki tällä tavalla.

Katso [API-viite](/api/) kunkin laajennuksen vientien osalta.
