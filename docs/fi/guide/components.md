# Komponentit

`@pantoken/components` toimittaa luokkaperusteiset komponenttityylit, jotka on rakennettu Instructure-tokenien pohjalta. Tuo tyylitiedosto ja merkitse markuppisi — ei vaadi kehystä.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Suositko mukautettuja elementtejä? `@pantoken/web-components` käärii nämä samat tyylit `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` ja monena muuna — katso [package map](/guide/packages).

## Konventiot

Tämän paketin CSS-konventiot perustuvat muokattuun versioon [RSCSS](https://ricostacruz.com/rscss/index.html):stä.

Modifioijat ovat **avain-arvo** -tyyppisiä — `-<prop>-<val>`, yhteensopivia InstUI-prop-nimien kanssa — joten ne luetaan itsenäisesti: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-propit ovat pelkkä propin nimi, jolloin sen läsnäolo tarkoittaa `true` (`-has-shadow`, `-clickable`); oletusarvoisesti päällä oleva boolean käännetään pois päältä (`-without-background`, `-without-border`). Koot hyväksyvät sekä lyhyet että pitkät kirjoitusasut (`-size-sm` = `-size-small`). Kun nimi poikkeaa InstUI:stä, InstUI-semanttinen luokka toimii silti mutta on vanhentumassa (esim. `-variant-info` → käytä `-color-info`).

### Esimerkki

Instructure UI React -komponentti:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken-komponentit:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

InstUI:n `timeout` propille aseta yksikköön perustumaton `--timeout` CSS-muuttuja millisekunneissa ja lataa Alert-interaktio. Positiivinen arvo ajastaa sulkeutumisen; `0` (oletus) jättää alertin paikalleen. Lisää `transition` utiliteetin `instui-transition -fade-entered` -luokat InstUI:n häivytykseen; jätä ne pois, jos haluat välittömän poiston. Interaktio ohjaa `-fade-exiting`-tilaa ja laukaisee peruutettavan, pulppuavan `dismiss`-tapahtuman ennen poistoa, jotta sovellus voi kutsua `preventDefault()` pitääksesi alertin kiinnitettynä.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Etenemispalkit hyväksyvät mielivaltaiset asteikot `--min` kautta (`0` oletuksena), `--value` ja `--max` (`100` oletuksena), sekä vanhentuneet `--value-now` ja `--value-max` alias-nimet. Lisää `-should-animate` soveltaaksesi InstUI:n puolen sekunnin siirtymää aina, kun arvo muuttuu. `.value` on rinnakkainen `.bar`:n kanssa juuren lapsena; lisää `-render-value-inside` renderöidäksesi sen radan päälle, kohdistettuna radan alkuun (tyylitä luettavaksi mittarin värin päällä). Käytä natiivista `<progress>` nollapohjaiseen mittakaavaan ja `<meter>` kun minimi ei ole nolla; web-komponentit valitsevat niiden välillä automaattisesti `min`-attribuutin perusteella. InstUI:lla ei ole indeterminoitua tilaa, joten `<progress>`, jolta puuttuu `value`-attribuutti, on pantokenin arvio: `progress-bar` animaatio liikuttavaksi segmentiksi ja `progress-circle` pyörittää rengastaan kiinteällä kaarella, molemmat piilottavat `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Etenemispallot hyväksyvät samat mielivaltaiset asteikot `--min`, `--value` ja `--max`. `--value-now` ja `--value-max` pysyvät vanhentuneina funktionaalisina aliaksina. Lisää `-should-animate` ja lataa fokusoitu interaktiopaketti toistaaksesi InstUI:n mount-animaation; `--animation-delay` on yksikköön perustumaton millisekunnin viive. Vanhentuneet `-should-animate-on-mount` ja `-shold-animate-on-mount` kirjoitusasut pysyvät toimivina aliaksina.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Luokan etuliite

Jokainen luokka on oletuksena nimiavarrettu `instui-`. Rakenna tyylitiedosto omalla etuliitteelläsi — tai ilman — välittämällä `prefix` mille tahansa builderille. Mikä tahansa epätosi arvo (`null`, `undefined`, `""`, tai sen jättäminen pois) poistaa etuliitteen kokonaan, joten voit kirjoittaa `class="heading -level-h1"` sijaan `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Tavuviivalla etuliitetyt modifioijat (`.-color-secondary`, `.-level-h1`) pysyvät muuttumattomina kumpaankin suuntaan. Paketissa toimitetut tyylit pitävät `instui` etuliitteen.

## Perus

`base.css` on valinnainen reset, joka asettaa globaalit dokumentin oletukset tokeneista: `box-sizing`, `body` reset, sivupinta, perus tekstiväri ja fontti, `color-scheme` (jotta `light-dark()` tokenit ja natiivit kontrollit seuraavat teemaa), ja perus linkki. Lataa se kerran, ennen komponentti- ja prose-tyylejä, kun pantoken omistaa sivun.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Ohita se, kun upotat komponentteja hostiin, joka jo teemaa oman `html` ja `body` — reset maalaa sivupinnan, joten et halua sen taistelevan hostin kanssa. Kaikki mitä se asettaa käyttää matala-spesifisiä `:where()` -valitsimia, joten omat sääntösi voittavat aina.

`base.css` _applikoituu_ brändifonttiin (`font-family: var(--instui-font-family-base)`, järjestelmävarafonteilla); sen _lataamiseksi_ tuo valinnainen `fonts.css` — `@font-face` säännöt Atkinson Hyperlegible Nextille, osoittaen paketin mukana toimitettuihin woff2-tiedostoihin. Se on erillinen, koska fontit ovat ~350 kB ja itse-hostatut fontit ovat tietoinen valinta.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Näytönlukija-sisältö

<p>Lauseen jälkeen on piilotettu viesti.<span class="instui-screen-reader-content">Vain näytönlukijat kertovat tästä.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` piilottaa elementin visuaalisesti mutta pitää sen saavutettavuuspuitteessa — etiketeille ja tilaviestille, jotka apuvälineiden tulisi lukea mutta suunnittelun ei näyttää.

## Utiliteetit

`utilities.css` on valinnainen kerros poikkileikkaaville luokille: `View`-primitii vi, marginaalit token-asteikolla ja semanttiset väriylikirjoitukset. Toisin kuin komponentin `-modifier` -luokat, nämä käyttävät **kaksoistavaa** (`--mod`), joten ne eivät koskaan törmää komponentin omiin modifioijanimiin, ja ne soveltuvat mihin tahansa elementtiin — paljaana tai yhdistettynä komponenttiin.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue -pinta on on-color-tekstillä.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Keskittynyt mx-auto:lla.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` on InstUI:n `View`. Se on pohja, jonka päälle kerrostat marginaalit ja värit, ja se kantaa avain-arvo -modifioijat omille visuaalisille propeilleen, joten sinun ei tarvitse turvautua utiliteetteihin: `-background-*` (sen pinnat), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ja `-cursor-*` — nämä ovat `view`'n omia yksitavu-modifioijia, riippumattomia alla olevista kaksoistavut-utiliteeteista. Vapaamuotoiset arvopropit (leveys/korkeus/insert) pysyvät inline-tyyleinä; `margin`/`padding` käyttävät spacing-utiliteetteja.

**Välistys (Spacing)** — sivukohtaiset luokat spacing-asteikolla. Lue ne muodossa `{m|p}{side}-{step}`: `m` marginaalille tai `p` paddingille (tai täydet sanat `margin`/`padding`), valinnainen looginen sivu, sitten askel. Joten `.--m-lg` ja `.--margin-lg` ovat samat, samoin kuin `.--pt-md` ja `.--paddingt-md`.

- Sivut: none (kaikki), `t`/`b` (lohkon alku/loppu), `s`/`e` (rivinvastaava alku/loppu), `x`/`y` (inline/lohko-akseli). Loogiset sivut pysyvät oikeina oikealta vasemmalle -asetteluissa.
- Askeleet: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` vain marginaalille.

Yhdistä ne InstUI:n `margin="small auto large"` pikakirjoitukseen:
`class="--mt-sm --mx-auto --mb-lg"`.

**Väri** — semanttiset ylikirjoitukset, jotka pysyvät paletilla: `.--bg-<name>` (tausta), `.--text-<name>` (tekstiväri), ja `.--border-<name>` (reunaväri). Jokainen `<name>` on semanttinen vär token — intentit (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) plus `accent-*` paletti (`accent-blue`, `accent-green`, ja niin edelleen). Nimi on paikallaan vain, jos token on olemassa kyseisessä perheessä, joten `text-brand` ei ole luokka — tekstillä ei ole brändi-tokenia. Ei ole tapaa tavoittaa primitiiviä tai mielivaltaista heksaa, ja jokainen ylikirjoitus seuraa teemaa.

**Token-perheet** — jokainen "yksi token, yksi property" -perhe saa luokan per token, nimetty tokenin mukaan. Yhdistä niitä vapaasti:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ja `-depth1`…`-card`) → `box-shadow`

Jokainen asettaa vain yhden propertyn, joten `border-width`/`border-radius` tarvitsevat `border-*` värin ja reunastyylin piirtääkseen reunan. Nämä käyttävät täyttä token-nimeä (`.--border-radius-md`), kun taas väri- ja spacing-apuohjelmat yllä käyttävät lyhyitä alias-nimiä (`.--bg-brand`, `.--mt-lg`) — aliasit ovat ergonomisia oikopolkuja; token-luokat ovat kirjaimellisia ja täydellisiä.

**Asettelu (Layout)** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) ja `.--text-align-<value>` (`start`, `center`, `end`, `justify`) kattavat InstUI:n poikkileikkaavat `display` ja `textAlign` propit (View, Button, Metric, Tabs, …) koostettavina luokkina — joten ne eivät ole komponenttikohtaisia modifioijia.

Jokainen kaksoistavu-luokka voittaa kaskadin deterministisesti saman nimisen yksitavu-komponentin modifioijan yli, riippumatta tyylitiedostojen import-järjestyksestä — katso [Authoring conventions](/conventions/authoring) mekanismia varten.

Kaikki täällä on puhdasta CSS:ää, jota ohjaavat `--instui-*` tokenit, joten se seuraa InstUI:ta token-kerroksen kautta. Katso [API reference](/api/) `componentsCss`:lle ja per-komponenttibuildereille.

## Ylilevyt: dialogi ja popover

Ylilevykomponentit käyttävät natiiveja alustaprimittejä, joten ne käyttäytyvät saavutettavasti vähällä tai ilman JavaScriptiä.

**Modal** — laita `.instui-modal` natiiville `<dialog>`. Se saa fokusloukkauksen, `Esc`-sulkemisen ja `::backdrop` ilmaiseksi; tausta himmennetään samalla `--instui-component-mask-background-color` tokenilla kuin `.instui-mask` (lisää `-blur` ylläksi). Avaa ja sulje invoker-komentoja käyttäen — ei skriptiä:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — laita `.instui-context-view` `[popover]`-elementtiin ja vaihda sitä `popovertarget`:lla. Se ajelee päällimmäisellä kerroksella ja sulkeutuu ulkopainalluksella tai `Esc`, jälleen ilman skriptiä:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — laita `.instui-drawer-layout` asettelun juureen, jossa on `.tray` ja `.content` lapsia. Lisää `open` attribuutti (tai `-open`) paljastaaksesi laatikon, ja käytä `placement="end"` (tai `-placement-end`) kiinnittääksesi sen inline-end -puolelle — sijoittelu ratkaistaan loogisten `inset-inline-*`/`flex-direction` ominaisuuksien kautta, joten se kääntyy automaattisesti `dir="rtl"` alla ilman lisäsääntöjä. Fokusoitu interaktiopaketti lisää Invoker-komentoroutingin ja vaihtaa overlay-tilan (`should-overlay-tray`) kun leveys ylittää `--drawer-layout-min-width` (oletus `--instui-breakpoints-sm`, sitten `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` sopii in-flow -ylilevyihin (spinner kortin päällä); modaalin `::backdrop` kattaa modaalitapauksen.

Molemmat mallit on myös kääritty käyttäytymisellisiksi mukautetuiksi elementeiksi `@pantoken/web-components`:ssä: `<instui-modal open>` ( `<dialog>` ohjattuna `open`-attribuutillaan) ja `<instui-context-view>` (natiivi popover).

Selaintuki: popover-API ja `popovertarget` ovat Baseline 2024; invoker-komennot (`command`/`commandfor`) ovat Baseline 2025, joten vanhemmilla selaimilla kytke painikkeet `dialog.showModal()`:iin yhden rivin varajärjestelynä. Popoverin sijoittaminen laukaisimen viereen käyttää CSS-anchor-sijoittelua, missä tuettu (Chromium); muissa tapauksissa se keskitetään päällimmäiseen kerrokseen.

## Lomakkeet

**FormField** — `.instui-form-field` on CSS-grid-kääre, joka asettelee etiketin, kontrollin ja mahdolliset viestit. Aseta se `<label>`:iin, jotta etiketti assosioituu kontrolliin natiivisti. Siinä on kolme grid-aluetta — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (oletus) pinottaa alueet; `-layout-inline` asettaa etiketin kontrollin viereen (viritä `-label-align-{start,end}` ja `-v-align-{top,middle,bottom}`). `-readonly` värittää etiketin.

**Pakollinen tähti** ilmestyy, kun kenttä on pakollinen joko `-required` -luokan TAI natiivin `required` kontrollin kautta sen sisällä — joten voit asettaa `required` syötteeseen ja merkki näkyy. Se on koristeellinen ( `::after` etiketissä, saavutettavuuspuiden ulkopuolella); yhdistä se huomautukseen kuten "kentät, joissa on \* ovat pakollisia", ellet muotoa ole itsestäänselvä.

**FormFieldGroup** — `.instui-form-field-group` ryhmittelee liittyvät kentät `<fieldset>`:ssä, jolla on `<legend>` kuvaus. Se on puhdasta asettelua (ei omia tokeneita): oletus pinottaa kentät; `-layout-columns` / `-layout-inline` virtauttavat ne responsiivisiin sarakkeisiin, ja `-row-spacing-*` / `-col-spacing-*` sekä `-v-align-*` virittävät gridin.

**RadioInputGroup** — `.instui-radio-input-group` on sama `<fieldset>`/`<legend>` -ryhmittely, erikoistettu radioille. Koska lapsiradiot jakavat `name`, valinta on natiivisti yksivalintainen — joten joukko vaihtopainikkeita käyttäytyy yhtenä kontrollina, ei irrallisina painikkeina. `-variant-simple` (oletus) asettaa standardiradiot (`-layout-columns`/`-inline` virtaavat ne riviin); `-variant-toggle` yhdistää lapsi-`.instui-radio.-variant-toggle` painikkeet yhdeksi segmentoitu kontrolliksi (kellastetut reunat, pyöristetyt ulkoreunat):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Viestit** — `.instui-form-field-messages` on kontaineri; jokainen `.instui-form-field-message` saa `-type-*`:n: `-type-hint` (harmaa, oletus), `-type-error` (punainen teksti + ympyrä-häly-glyfi), `-type-success` (vihreä teksti + ympyrä-tarkista-glyfi), ja `-type-screenreader-only` (visuaalisesti leikattu, mutta edelleen ilmoitettu). Glyfit maalautuvat `currentColor`:ssa, joten ne vastaavat aina viestin väriä. `-type-new-error` on vanhentunut alias `-type-error`:lle. Kytke kontainer kontrolliin `aria-describedby`:lla, ja aseta `aria-invalid` kontrolliin, kun on virhe.

FormFieldin sisällä `-type-error` -viesti seuraa asiakaspuolen validointia: se pysyy piilossa, kunnes kentän kontrolli on `:user-invalid` (natiivi, käyttäjän jälkeen) — tai pakota se `-invalid`:llä `.instui-form-field`:ssa (server-puolen virhe). Erillinen `.instui-form-field-messages` (ei kentässä) ei muutu. Kontrollin fokuskehys seuraa samaa logiikkaa: vaara kun `:user-invalid`/`-invalid`, onnistuminen `-success`.

**Tekstikontrollit** — `.instui-text-input` (natiivi `<input>`), `.instui-text-area` (natiivi `<textarea>`, resizable), ja `.instui-simple-select` (natiivi `<select>` kursorilla) jakavat saman ulkonäön ja tilat: `-invalid` (virhereuna), `-success` (onnistumisreuna), `-readonly`, natiivinen `:disabled`, ja `-size-{sm,md,lg}`. Johtavan/takaisen ikonille (InstUI:n `renderBeforeInput`/`renderAfterInput`) kääri input `.instui-input-group`:iin ja lisää `.before`/`.after` slotin ( `-icon-*` glyfi); `-should-not-wrap` pitää sen yhdellä rivillä. `.instui-number-input` on kyseinen fasadi plus `.arrows` +/- spinner-sarake (natiivi `type="number"`; kytke painikkeet `stepUp()`/`stepDown()`). `.instui-range-input` on tyylitelty `input[type="range"]`, jonka arvo renderöityy `.instui-range-input-value` vastakkaiseen kuplaan. Rikkaalle comboboxille listbox-popoverilla käytä `@instructure/ui`:ia — kirjasto kattaa natiivikontrollit.

**Tyylitelty select-dropdown (kokeellinen)** — valinnainen `select.css` päivittää saman `.instui-simple-select` elementin: se muotoilee avautuvan dropdownin (paneelin ja jokaisen optionin, hover- ja valitut-tiloineen) käyttäen CSS Customizable Select -mallia.

> [!WARNING]
> `select.css` riippuu `appearance: base-select` / `::picker(select)`:sta, mikä on **kokeellista** (Chrome 135+, ei vielä Baseline). Se toimitetaan erillisenä valinnaisena tyylilomakkeena ja jokainen sääntö on suojattu `@supports (appearance: base-select)`:lla, joten se ei tee mitään tuettomissa selaimissa — `.instui-simple-select` kontrolli pysyy tavallisena natiivina selectina. Lataa se vain, jos haluat parannetun dropdownin ja hyväksyt rajoitetun tuen.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
