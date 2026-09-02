# Aloittaminen

pantoken ottaa Instructure UI:n design-tokenit ja ikonit, ratkaisee ne kerran ja muokkaa sen yhden
mallin paketeiksi monille alustoille: tavalliset tyylitaulukot, SCSS ja Less, React ja Vue ja Svelte,
Tailwind ja Panda, natiivi Swift ja Kotlin, WordPress ja Drupal, Figma ja lisää.

Asenna pienin paketti, joka sopii tehtävääsi. Kaikki on myös uudelleenviety yhtenäiseen
`pantoken`-pakettiin, joten voit aloittaa sieltä ja tarkentaa myöhemmin.

## Aloitusprojektin luonnostelu

Nopein tapa kokeilla pantokenia: luonnostele aloitusprojekti, jossa se on jo asennettu ja kytketty.

```sh
npx create-pantoken-app react
```

Alustat: `components` (tavallinen HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Katso
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) varten `--dir <path>` ja
ohjelmallinen käyttö.

Käytätkö AI-koodausagenttia? Asennusta ei tarvita — osoita sitä suoraan skilliin:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Toimii samalla tavalla Gemini CLI:n, Cursor CLI:n, OpenAI Codex CLI:n, GitHub Copilot CLI:n ja Amazon Q
Developer CLI:n kanssa — vaihda `claude` tilalle `gemini`, `agent`, `codex`, `copilot -p` tai `q chat`. Jos haluat
kytkeä pantokenin agenttisäännöt pysyvästi repositorioon (AGENTS.md, editor-säännöt, paikallinen kopio
tätä skilliä), aja sen sijaan `npx @pantoken/ai init`.

## Token-malli

Tokenit ovat CSS-mukautettuja ominaisuuksia nimeltä `--instui-<group>-<name>`, esimerkiksi
`--instui-color-background-brand` tai `--instui-spacing-space-md`. Kolme teemaa toimitetaan: `rebrand`
(oletus, jossa `light-dark()` kun vaalea ja tumma eroavat), `canvas` ja `canvasHighContrast`.
ikonit ovat `<image>`-tokeneita (`--instui-icon-<name>`), johdettu Lucide-kirjastosta plus Instructuren omat
glyphit.

## Tyylittele web-sovellus

Asenna tyylitiedosto ja tuo se kerran. Se määrittelee jokaisen `--instui-*`-ominaisuuden, joten viittaat
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

Web-komponentti toimii missä tahansa frameworkissa, ilman porttausta.

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

Ikonit ovat CSS-mukautettuja ominaisuuksia (`--instui-icon-<name>`). Lataa tyylitiedosto kerran ja viittaa mihin tahansa
ikoniin `mask-image`- tai `background-image`-muodossa — ei tarvita per-ikonin importtia.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — yksittäinen ikoni vs. koko joukko

`@pantoken/icons` paljastaa kaksi nimettyä vientiä. Käytä `iconsByName` noutaaksesi yhden ikonin ilman koko
taulukon iteraatiota:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Käytä `icons` kun tarvitset koko joukon (esim. rakentamaan valitsimen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Molemmat exportit lataavat koko IR:n moduulin alustuksessa — tässä tasossa ei ole per-ikonin puupuustaamiseta. Kevyempään CSS-tasoiseen lataukseen käytä [CDN picker](/guide/cdn-picker) -työkalua luodaksesi yhdistetyn URLin
vain tarvitsemillesi ikoneille.

## Generoi natiivia alustaa varten

CLI kirjoittaa token-lähteen kohde-repoon. Ei asennusta juoksuttajan lisäksi:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Katso [pantoken CLI](/guide/cli) jokaista kohdetta varten.

## VS Code -kirjoitusvinkit

`@pantoken/pantoken` sisältää nyt VS Code -custom-data-tiedostot, jotta downstream-projektit saavat luokka- ja
token-automaattikompletionin HTML/CSS:ssä ilman pantoken-spesifistä laajennusta.

1. Asenna yhtenäinen paketti:

```sh
npm i @pantoken/pantoken
```

1. Ohjaa VS Code kuluttajatyötilastasi lähetettyyn custom-data JSON:iin:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Lataa VS Code uudelleen (tai aja "Developer: Reload Window") ottaaksesi uuden datan käyttöön.

Tämä mahdollistaa ehdotukset `instui-*` luokkato­keneille (ja `-modifier` luokkato­keneille) sekä
`--instui-*` mukautetuille ominaisuuksille.

## Mihin seuraavaksi

- [Paketin kartta](/guide/packages) — mikä paketti valitaan tehtävän mukaan.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — asenna agenttiresurssit ja säännöt kuluttajarepoon.
- [Arkkitehtuuri](/guide/architecture) — kuinka token-malli, core ja tuotokset liittyvät toisiinsa.
- [API-dokumentaatio](/api/) — jokainen viety symboli, generoitu lähteestä.
