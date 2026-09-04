# Aloittaminen

Pantoken ottaa [Instructure UI](https://instructure.design) -suunnittelutokenit ja -ikonit, ratkaisee ne kerran ja muokkaa tuon yhden
mallin paketeiksi monille alustoille: tavallisiksi tyylitaulukoiksi, SCSS:ksi ja Less:ksi, Reactiksi, Vuella ja Sveltellä,
Tailwindiksi ja Pandaksi, natiiviksi Swiftiksi ja Kotliniksi, WordPressiksi ja Drupaliksi, Figmaa varten ja muillekin.

Asenna pienin paketti, joka sopii tehtävääsi. Kaikki on myös uudelleenviety yhdistetyn
`pantoken`-paketin kautta, joten voit aloittaa sieltä ja tarkentaa myöhemmin.

## Luo aloitusprojekti

Nopein tapa kokeilla pantokenia: alusta starter-projekti, jossa se on jo asennettu ja kytketty.

```sh
npx create-pantoken-app
```

Alustat: `components` (tavallinen HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Katso
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) kohdasta `--dir <path>` ja
ohjelmallinen käyttö.

Käytetäänkö AI-koodausskenaarioita? Asennusta ei tarvita — osoita agentti suoraan tälle skillille:

```prompt
Hae create.pantoken.app/SKILL.md ja noudata sitä ottaaksesi pantokenin käyttöön tässä projektissa.
```

Jos haluat kytkeä pantokenin agenttisäännöt pysyvästi repositorioon (AGENTS.md, editorin säännöt, paikallinen kopio tästä skillistä), suorita sen sijaan `npx @pantoken/ai init`.

## Token-malli

Tokenit ovat CSS:n mukautettuja ominaisuuksia nimeltä `--instui-<group>-<name>`, esimerkiksi
`--instui-color-background-brand` tai `--instui-spacing-space-md`. Kolme teemaa toimitetaan: `rebrand`
(oletusteema, jossa `light-dark()` eroavat light- ja dark-tiloissa), `canvas` ja `canvasHighContrast`.
Ikonit ovat `<image>`-tokeneita (`--instui-icon-<name>`), jotka on johdettu Lucidesta plus Instructuren omat
glyfit.

## Tyylittele web-sovellus

Asenna tyylitaulukko ja tuo se kerran. Se määrittelee jokaisen `--instui-*`-ominaisuuden, joten viittaat
niihin suoraan omassa CSS:ssäsi.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Käytä ikoneita missä tahansa

Web-komponentti toimii missä tahansa kehikossa ilman siirtoaskelta.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokenit

Ikonit ovat CSS:n mukautettuja ominaisuuksia (`--instui-icon-<name>`). Lataa tyylitaulukko kerran ja viittaa mihin tahansa
ikoniin `mask-image`- tai `background-image`-muodossa — erillistä tuontia jokaista ikonia kohden ei tarvita.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — yksittäinen ikoni vs. koko kokoelma

`@pantoken/icons` paljastaa kaksi nimettyä vientiä. Käytä `iconsByName` tuodaksesi yhden ikonin ilman koko taulukon läpikäyntiä:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Käytä `icons` kun tarvitset koko joukkoa (esim. rakentamaan valitsimen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Molemmat vientiä tuotavat täyden IR:n moduulin alustuksessa — tässä tasossa ei ole per-ikonin puuta-poistoa. Kevyempää CSS-only-latausta varten käytä [CDN picker](/guide/cdn-picker) -työkalua luodaksesi yhdistetyn URLin vain tarvitsemillesi ikoneille.

## Generoi natiivialustalle

CLI kirjoittaa token-lähteen kohderepositorioon. Ei asennusta suoritusrungon lisäksi:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Katso [pantoken CLI](/guide/cli) jokaista kohdetta varten.

## VS Code -kirjoitusvinkit

`@pantoken/pantoken` toimittaa nyt VS Code -custom-data-tiedostoja, jotta downstream-projektit saavat luokan ja
tokenin täydennyksen HTML/CSS:ssä ilman pantoken-spesifistä laajennusta.

1. Asenna yhdistetty paketti:

```sh
npm i @pantoken/pantoken
```

1. Ohjaa VS Code kuluttajatyötilasta löytyvään toimitettuun custom-data JSON:iin:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Lataa VS Code uudelleen (tai suorita "Developer: Reload Window") ottaaksesi uuden datan käyttöön.

Tämä mahdollistaa ehdotukset `instui-*`-luokkatoimintojen (ja `-modifier`-luokkatoimintojen) sekä
`--instui-*`-mukautettujen ominaisuuksien osalta.

## Mihin seuraavaksi

- [Paketin kartta](/guide/packages) — mikä paketti valitaan tehtävän mukaan.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — asenna agenttiresurssit ja säännöt kuluttajarepoon.
- [Arkkitehtuuri](/guide/architecture) — miten token-malli, core ja outputit sopivat yhteen.
- [API-reference](/api/) — jokainen viety symboli, generoitu lähdekoodista.
