# CDN ja jakelu

pantoken julkaisee jokaisen paketin npm:iin, joten voit hakea tokeneita, komponentteja ja web-komponentteja suoraan
CDN:stä — ei build-vaihetta, ei bundleria. Tämä sivu käsittelee CSS-yhdistelmä-URL:ia (interaktiivisella
rakentajalla), sekä web-komponenttien drop-ineja.

## Tokenin perusta

Jokainen pantoken-komponentti lukee `--instui-*` mukautettuja ominaisuuksia sivulla olevasta token-tyylitaulukosta. Kaksi
versiota toimitetaan:

- `@pantoken/css/dist/style.lean.css` — suositeltu CDN-perusta. Se sisältää kaikki tokenit paitsi
  koko ikonipakkauksen, joten se on noin 23 KB gzippattuna.
- `@pantoken/css/dist/style.css` — täydellinen taulukko, joka sisältää kaikki ~1,777 ikoniglyyfi-tokenia
  (`--instui-icon-*`). Noin 140 KB gzippattuna. Lataa tämä, jos viittaat ikoneihin laajasti käyttäen
  `var(--instui-icon-*)`.

Korostusasteikko- ja focus-ring-muuttujat ovat molemmissa taulukoissa, joten varjot ja fokuskehys toimivat pelkällä
perustan latauksella.

## Valitse komponenttisi ja ikonisi

[Interaktiivinen CDN-valitsin](/guide/cdn-picker) rakentaa jsDelivr-yhdistelmä-URL:it CSS:lle ja antaa pätkiä JavaScript-paketteihin. Avaa se, valitse tarpeesi ja kopioi generoitu output.

- **Components-välilehti** — valitse yksittäisiä komponenttityylitiedostoja tai koko `components.css`-barreli. Lisää base-reset tai spacing/color-apuohjelmat tarpeen mukaan.
- **JS-välilehti** — kopioi ESM-import-pätkä `@pantoken/interactions`:lle.
- **Icons-välilehti** — valitse yksittäisiä ikoneita InstUI-kokoelmasta (~1,800 ikonia) tai Simple Icons -kokoelmasta (~3,300 brändiglyyfiä). Valitsin tuottaa erillisen yhdistelmä-URL:in ikonien CSS-tiedostoille, jotta voit ladata vain käyttämäsi ikonit.
- **Web Components -välilehti** — rakenna `@pantoken/web-components`-pätkiä (ESM-valinnainen rekisteröinti tai klassinen script-bootstrap).

Jokainen komponenttitiedosto on pieni — useimmat noin 2 KB. Komponentti, joka renderöi ikoneita (`alert`, `checkbox`,
ja muutama muu) tarvitsee näitä glyyfejä, joten rakentaja lisää `@pantoken/components/dist/component-icons.css` (noin
0.5 KB gzippattuna — 11 ikonia, joita komponenttisarja käyttää) aina kun valitset kevyen taulukon. Täysi taulukko
sisältää ne jo valmiiksi.

### Latausjärjestys ja fontit

Lataa token-perusta ensin, sitten valinnainen base-reset, sitten komponenttitiedostot ja lopuksi apuohjelmat — ne ovat ylikirjoitus-apuohjelmia, joten ne ylikirjoittavat komponentin oman säännön vain silloin kun ne tulevat sen jälkeen kaskadissa. Yllä oleva yhdistelmä-URL järjestää ne puolestasi. Fontit ovat yksi poikkeus:
`@pantoken/components/dist/fonts.css` viittaa fonttitiedostoihin suhteellisella polulla, joten combine ei voi kirjoittaa
niitä uudelleen — lataa se omana `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Kaikki kerralla

Valitse valitsimesta **All components** vaihtaaksesi barreliin, tai osoita siihen itse (noin 141 KB
gzippattuna) yhdessä token-taulukon kanssa:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web-komponentit

`@pantoken/web-components` rekisteröi kehyksettömät `<instui-*>` custom-elementit. Ne upottavat oman
CSS:nsä, mutta lukevat silti tokeneita sivulla olevasta taulukosta, joten lataa myös token-perusta.

### ES-moduulit (suositeltu)

ESM-CDN ratkaisee paketin riippuvuudet puolestasi. Tämä rekisteröi kaikki elementit:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Käytä täyttä token-taulukkoa (tai kevyttä taulukkoa plus `component-icons.css`), jotta ikoneita renderöivät elementit kuten
`<instui-alert>` löytävät glyyfinsä.

Rekisteröidäksesi vain joitain elementtejä — ja niiden sisäkkäisiä riippuvuuksia — tuo `register` ja välitä `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klassinen script-tag

Moduleita käyttämättömälle drop-inille lataa IIFE-buildin. Se pakkaa riippuvuudet ja rekisteröi automaattisesti kaikki
elementit latauksen yhteydessä, ja se paljastaa `PantokenWebComponents`-globaalin:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Se on suurempi kuin ESM-polku — se upottaa `@pantoken/components` ja `@pantoken/icons` — joten valitse se
vain, kun moduuleja ei voi käyttää.

## Version kiinnittäminen

Yllä olevat URL:t — ja ne, jotka valitsin kirjoittaa — seuraavat uusinta julkaisua. Kiinnitä major- (tai tarkka)
versio tuotantoon — esimerkiksi `@pantoken/css@0` — jotta päivitys ei yllätä.
