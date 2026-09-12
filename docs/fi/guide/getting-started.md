# Aloittaminen

Pantoken ottaa [Instructure UI](https://instructure.design) -suunnittelutokenit ja ikonit, ratkaisee ne kerran ja muokkaa tuon yhden mallin paketeiksi monille alustoille: tavallisiksi tyylitaulukoiksi, SCSS:ksi ja Lessiksi, Reactiksi ja Vuella ja Sveltellä, Tailwindiksi ja Pandaksi, natiiviksi Swiftiksi ja Kotliniksi, WordPressiksi ja Drupaliksi, Figmaa ja lisää.

Asenna pienin paketti, joka sopii tehtävääsi. Kaikki on myös uudelleenviety yhtenäiseen `pantoken`-pakettiin, joten voit aloittaa sieltä ja tarkentaa myöhemmin.

## Luo aloitusprojekti

Nopein tapa kokeilla pantokenia: luo aloitusprojekti, johon se on jo asennettu ja kytketty.

```sh
npx create-pantoken-app
```

Alustat: `components` (tavallinen HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Katso
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) varten `--dir <path>` ja ohjelmallinen käyttö.

Käytössäsi AI-koodausagentti? Asennusta ei tarvita — osoita agentti suoraan skillille:

```prompt
Hae create.pantoken.app/SKILL.md ja seuraa sitä asentaaksesi pantokenin tähän projektiin.
```

Jos haluat mieluummin kytkeä pantokenin agenttisäännöt pysyvästi repositorioon (AGENTS.md, editorin säännöt, paikallinen kopio tästä skillistä), suorita sen sijaan `npx @pantoken/ai init`.

## Token-malli

Tokenit ovat CSS:n mukautettuja ominaisuuksia nimeltään `--instui-<group>-<name>`, esimerkiksi
`--instui-color-background-brand` tai `--instui-spacing-space-md`. Kolme teemaa toimitetaan: `rebrand`
(oletus, jossa `light-dark()` eroaa light- ja dark-teemoissa), `canvas`, ja `canvasHighContrast`.
Ikonit ovat `<image>`-tokeneita (`--instui-icon-<name>`), jotka on johdettu Lucidesta sekä Instructuren omista glyfeistä.

## Tyylitä web-sovellus

Asenna tyylitaulukko ja tuo se kerran. Se määrittelee kaikki `--instui-*`-ominaisuudet, joten viittaat niihin suoraan omassa CSS:ssäsi.

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

Web-komponentti toimii missä tahansa frameworkissa ilman porttausta.

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

Ikonit ovat CSS:n mukautettuja ominaisuuksia (`--instui-icon-<name>`). Lataa tyylitaulukko kerran ja viittaa mihin tahansa ikoniin `mask-image`- tai `background-image`-muodossa — yksittäistä ikonia ei tarvitse tuoda erikseen.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — yksittäinen ikoni vs. koko kokoelma

`@pantoken/icons` tarjoaa kaksi nimettyä vientiä. Käytä `iconsByName` hakeaksesi yhden ikonin ilman, että tarvitsee iteroida koko taulukkoa:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Käytä `icons`, kun tarvitset koko kokoelman (esim. valitsimen rakentamiseen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Molemmat vientimuodot lataavat koko IR:n moduulin alustuksessa — tässä tasossa ei ole per-ikonin puuta-poistamista (tree-shaking). Kevyempään, vain CSS-pohjaiseen lataukseen käytä [CDN picker](/guide/cdn-picker) -työkalua generoimaan yhdistetty URL vain tarvitsemillesi ikooneille.

## Generoi natiiville alustalle

CLI kirjoittaa token-lähteen kohderepoon. Juoksijaa lukuun ottamatta ei tarvita asennusta:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Katso [pantoken CLI](/guide/cli) jokaista kohdetta varten.

## VS Code -kirjoitusvinkit

`@pantoken/pantoken` toimittaa nyt VS Code -custom-data -tiedostoja, jotta downstream-projektit voivat saada luokka- ja token-automaattitäydennyksiä HTML/CSS:ssä ilman pantoken-spesifistä laajennusta.

1. Asenna yhtenäinen paketti:

```sh
npm i @pantoken/pantoken
```

1. Ohjaa VS Code kuluttajatyötilastasi toimitettuun custom-data JSON:iin:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Lataa VS Code uudelleen (tai suorita "Developer: Reload Window") ottaaksesi uuden datan käyttöön.

Tämä mahdollistaa ehdotukset `instui-*` luokkatokeneille (ja `-modifier` luokkatokeneille) sekä `--instui-*` mukautetuille ominaisuuksille.

## Mihin seuraavaksi

- [Paketin kartta](/api/) — mikä paketti sopii mihinkin tehtävään.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — asenna agenttiassetit ja säännöt kuluttajarepoon.
- [Arkkitehtuuri](/guide/architecture) — miten token-malli, core ja tuotokset sopivat yhteen.
- [API-viite](/api/) — kaikki viedyt symbolit, generoitu lähdekoodista.
