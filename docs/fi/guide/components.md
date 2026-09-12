# Komponentit

`@pantoken/components` toimittaa luokkapohjaiset komponenttityylit, jotka on rakennettu Instructure-tokenien pohjalta. Tuo tyylitaulukko ja merkitse markuppisi — ei kehystä vaadittu.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Pidätkö enemmän mukautetuista elementeistä? `@pantoken/web-components` käärii nämä samat tyylit `<instui-button>`-, `<instui-alert>`-, `<instui-badge>`-, `<instui-avatar>`-, `<instui-progress>`- ja muihin muotoihin — katso [pakettikartta](/api/).

## Käytännöt

Tämän paketin CSS-käytännöt perustuvat muokattuun versioon [RSCSS](https://ricostacruz.com/rscss/index.html):stä.

Muuttujat ovat **avain-arvo** -muotoisia — `-<prop>-<val>`, linjassa InstUI-prop-nimien kanssa — joten ne lukevat itsestäänselvästi: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolen propit ovat pelkkä propin nimi, jolloin niiden läsnäolo tarkoittaa `true` (`-has-shadow`, `-clickable`); oletuksena päällä oleva bool käännetään pois päältä (`-without-background`, `-without-border`). Koot hyväksyvät sekä lyhyen että pitkän kirjoitusasun (`-size-sm` = `-size-small`). Jos nimi poikkeaa InstUI:sta, InstUI-semanttinen luokka toimii silti mutta on vanhentunut (esim. `-variant-info` → käytä `-color-info`).

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

InstUI:n `timeout`-propille aseta yksikkötön `--timeout`-custom-property millisekunneissa ja lataa Alert-interaktio. Positiivinen arvo ajoittaa sulkemisen; `0` (oletus) jättää varoituksen paikalleen. Lisää `transition`-utilin `instui-transition -fade-entered`-luokat InstUI:n haalistumista varten; jätä ne pois, jos haluat välittömän poiston. Interaktio ohjaa `-fade-exiting`-tilaa ja laukaisee peruutettavan, kuplivan `dismiss`-tapahtuman ennen poistoa, joten sovellus voi kutsua `preventDefault()` pitääksensä varoitus kiinni.

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

Edistymispalkit hyväksyvät mielivaltaiset asteikot `--min` (`0` oletuksena), `--value` ja `--max` (`100` oletuksena), vanhentuneilla aliasnimillä `--value-now` ja `--value-max`. Lisää `-should-animate` käyttääksesi InstUI:n puolen sekunnin siirtymää aina arvon muuttuessa. `.value` sijaitsee rinnakkain `.bar` kanssa juuren lapsena; lisää `-render-value-inside` renderöidäksesi sen radan päälle, kohdistettuna sen alkuun (tyylitä luettavaksi mittarin värin päällä). Käytä natiivia `<progress>` nollapohjaiseen alueeseen ja `<meter>` kun minimi ei ole nolla; web-komponentit valitsevat niiden välillä automaattisesti `min`-attribuutin perusteella. InstUI:lla ei ole määräämätöntä tilaa, joten `<progress>` ilman `value`-attribuuttia on pantokenin paras arvaus: `progress-bar` animoi `.bar` liukuvana segmenttinä ja `progress-circle` pyörittää rengastaan kiinteällä kaarella, molemmat piilottaen `.value`.

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

Edistymisympyrät hyväksyvät samat mielivaltaiset asteikot `--min`, `--value` ja `--max`. `--value-now` ja `--value-max` säilyvät vanhentuneina funktionaalisina aliaksina. Lisää `-should-animate` ja lataa focused-interaktio-paketti toistaaksesi InstUI:n mount-animaation; `--animation-delay` on yksikkötön millisekunnin viive. Vanhentuneet kirjoitusasut `-should-animate-on-mount` ja `-shold-animate-on-mount` pysyvät toimivina aliaksina.

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

## Luokkien etuliite

Jokainen luokka on nimialueistettu oletuksena `instui-`. Rakenna tyylitaulukko omalla etuliitteelläsi — tai ilman — antamalla `prefix` mille tahansa rakentajalle. Mikä tahansa epätosi arvo (`null`, `undefined`, `""`, tai sen jättäminen pois) pudottaa etuliitteen kokonaan, joten voit kirjoittaa `class="heading -level-h1"` sijaan `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Kriivillä etuliitetyissä modifikaattoreissa (`.-color-secondary`, `.-level-h1`) ei ole muutosta kummallakaan tavalla. Paketin mukana tulevat tyylitaulukot säilyttävät `instui`-etuliitteen.

## Perus

`base.css` on valinnainen reset, joka asettaa dokumentin globaalit oletukset tokeneista: `box-sizing`, `body`-reset, sivun pinta, perustekstiväri ja fontti, `color-scheme` (jotta `light-dark()`-tokenit ja natiivit kontrollit seuraavat teemaa) ja peruslinkki. Lataa se kerran, ennen komponentti- ja proosataulukoita, kun pantoken hallinnoi sivua.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Ohita se, kun upotat komponentteja isäntään, joka jo teemaa omat `html` ja `body` — reset maalaa sivun pinnan, joten et halua sen taistelevan isännän kanssa. Kaikki mitä se asettaa käyttää matala-spesifisiä `:where()`-valitsimia, joten omat säännöt voittavat aina.

`base.css` _soveltaa_ brändifonttia (`font-family: var(--instui-font-family-base)`, järjestelmävarafonteilla); _ladata_ sen saa tuomalla valinnaisen `fonts.css` — `@font-face`-säännöt Atkinson Hyperlegible Nextille, osoittaen paketin mukana tuleviin woff2-tiedostoihin. Se on erillinen, koska fontit ovat ~350 kB ja fonttien itseisännöinti on tietoinen valinta.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ruudunlukijan sisältö

<p>Tämän lauseen jälkeen on piilotettu viesti.<span class="instui-screen-reader-content">Vain ruudunlukijat ilmoittavat tämän.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` piilottaa elementin visuaalisesti, mutta pitää sen saavutettavuuspuisteessa — etikettejä ja tilatekstiä varten, jotka apuvälineiden tulisi lukea, mutta suunnittelun ei näyttää.

## Utilit

`utilities.css` on valinnainen kerros poikkileikkaaville luokille: `View`-primitiivi, välistykset token-asteikolla ja semanttiset värikorvaukset. Toisin kuin komponentin `-modifier`-luokat, nämä käyttävät **kaksoisviivaa** (`--mod`), joten ne eivät koskaan törmää komponentin omiin modifikaattorinimiin, ja ne soveltuvat mihin tahansa elementtiin — paljaana tai kootuna komponentin päälle.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue -pinta on värjätty on-color-tekstillä.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Keskittynyt mx-auto:lla.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` on InstUI:n `View`. Se on perusta, jonka päälle kerrot välistykset ja värit, ja se kantaa avain-arvo -modifikaattoreita omille visuaalisille propseilleen, joten sinun ei tarvitse turvautua utiliteetteihin:
`-background-*` (sen pinnat), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ja `-cursor-*` — nämä ovat `view`-komponentin omia yksiviivaisia modifikaattoreita, eivätkä liity alla olevaan kaksoisviiva-utiliteettiin. Vapaamuotoiset propit (width/height/inset) pysyvät inline-tyyleinä; `margin`/`padding` käyttävät välistys-utiliteetteja.

**Välistykset** — per-puoli -luokat välistyskaavioon. Lue ne muodossa `{m|p}{side}-{step}`: `m` marginaalille tai `p` täytteelle (tai kokonaisina sanoina `margin`/`padding`), valinnainen looginen sivu, sitten askel. Joten `.--m-lg` ja `.--margin-lg` ovat sama asia, samoin kuin `.--pt-md` ja `.--paddingt-md`.

- Sivut: none (kaikki), `t`/`b` (lohkon alku/loppu), `s`/`e` (rivin alku/loppu), `x`/`y` (inline/lohko -akseli). Loogiset sivut pysyvät oikeina oikealta vasemmalle -asettelussa.
- Askeleet: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` vain marginaalia varten.

Kokoa niitä InstUI:n `margin="small auto large"`-pikatavan mukaisesti:
`class="--mt-sm --mx-auto --mb-lg"`.

**Väri** — semanttiset korvaukset, jotka pysyvät paletilla: `.--bg-<name>` (tausta),
`.--text-<name>` (tekstiväri) ja `.--border-<name>` (reunaväri). Jokainen `<name>` on semanttinen värintoken — intentiot (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*`-paletti (`accent-blue`, `accent-green`, ja niin edelleen). Nimi on olemassa vain, jos token löytyy kyseisestä perheestä, joten `text-brand` ei ole luokka — tekstillä ei ole bränditokenia. Ei ole tapaa päästä primitiiviin tai mielivaltaiseen hexiin, ja jokainen korvaus seuraa teemaa.

**Token-perheet** — jokainen "yksi token, yksi ominaisuus" -perhe saa luokan per token, nimetty tokenin mukaan. Yhdistä niitä vapaasti:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ja `-depth1`…`-card`) → `box-shadow`

Jokainen asettaa vain yhden ominaisuuden, joten `border-width`/`border-radius` tarvitsevat `border-*`-värin ja reunatyylin piirtääkseen reunan. Nämä käyttävät täyttä token-nimeä (`.--border-radius-md`), kun taas väri- ja välistys-apuohjelmat käyttävät lyhyitä aliaksia (`.--bg-brand`, `.--mt-lg`) — aliakset ovat ergonomisia pikavalintoja; token-luokat ovat kirjaimellisia ja kattavia.

**Asettelu** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ja `.--text-align-<value>` (`start`, `center`, `end`, `justify`) kattavat InstUI:n poikkileikkaavat `display` ja `textAlign` propit (View, Button, Metric, Tabs, …) koostettavina luokkina — ne eivät siis ole komponenttikohtaisia modifikaattoreita.

Jokainen kaksoisviiva-luokka voittaa kaskadin deterministisesti saman nimisen yksiviivaisen komponenttimodifikaattorin yli riippumatta tyylitaulukon tuontijärjestyksestä — katso [Authoring conventions](/conventions/authoring) mekanismia varten.

Kaikki tässä on puhdasta CSS:ää, jota ohjaavat `--instui-*`-tokenit, joten se seuraa InstUI:ta token-tason kautta. Katso [API reference](/api/) `componentsCss`:lle ja per-komponenttien rakentajille.

## Ylärakenteet: dialogi ja popover

Ylärakennekomponentit hyödyntävät natiiveja alustaprimittejä, joten ne käyttäytyvät saavutettavasti vähällä tai ilman JavaScriptiä.

**Modal** — laita `.instui-modal` natiiville `<dialog>`:lle. Se saa fokuslukituksen, `Esc`-sulkemisen ja `::backdrop` ilmaiseksi; taustalevy himmenee samalla `--instui-component-mask-background-color`-tokenilla kuin `.instui-mask` (lisää `-blur` jäähdytysefektiä varten). Avaa ja sulje invoker-komentoja käyttäen — ei skriptiä:

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

**Context view / popover** — laita `.instui-context-view` `[popover]`-elementtiin ja kytke se `popovertarget`:lla. Se sijaitsee ylimmällä kerroksella ja sulkeutuu ulkopainalluksella tai `Esc`, jälleen ilman skriptiä:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — laita `.instui-drawer-layout` asettelujuurena, jossa on `.tray` ja `.content` lapsia. Lisää `open`-attribuutti (tai `-open`) paljastaaksesi laukun, ja käytä `placement="end"` (tai `-placement-end`) telakointiin inline-end -puolelle — sijoittelu ratkaistaan loogisten `inset-inline-*`/`flex-direction` -ominaisuuksien kautta, joten se kääntyy automaattisesti `dir="rtl"`-tilassa ilman lisäsääntöjä. Focused-interaktio-paketti lisää Invoker-komentoroutingin ja kytkee overlay-tilan (`should-overlay-tray`) kun leveys ylittää `--drawer-layout-min-width` (oletus `--instui-breakpoints-sm`, sitten `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` pysyy virtausmielessä oleville ylärakenteille (spinner kortin päällä); modaalin `::backdrop` kattaa modaalitapauksen.

Molemmat mallit on myös kääritty käyttäytymiseen pohjautuviksi mukautetuiksi elementeiksi `@pantoken/web-components`:ssä:
`<instui-modal open>` (`<dialog>` ajettu `open`-attribuutillaan) ja `<instui-context-view>` (natiivi popover).

Selain­tuki: popover-API ja `popovertarget` ovat Baseline 2024; invoker-komennot (`command`/`commandfor`) ovat Baseline 2025, joten vanhemmissa selaimissa yhdistä painikkeet `dialog.showModal()`:iin yhden rivin vararatkaisuna. Popoverin sijoittaminen laukaisijan viereen käyttää CSS-ankkurointiasettelua siellä missä tuettu (Chromium); muissa paikoissa se keskittyy ylimmälle kerrokselle.

## Lomakkeet

**FormField** — `.instui-form-field` on CSS-Grid-kääre, joka asettelee etiketin, kontrollin ja mahdolliset viestit. Laita se `<label>`:lle, jotta etiketti liitetään natiivisti kontrolliin. Siinä on kolme ruudukkoaluetta — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (oletus) pinottaa alueet; `-layout-inline` asettaa etiketin kontrollin viereen (säädä `-label-align-{start,end}` ja `-v-align-{top,middle,bottom}`). `-readonly` muuttaa etiketin väriä.

**Pakollinen tähti** ilmestyy, kun kenttä on pakollinen joko `-required`-luokan TAI natiivin `required`-kontrollin avulla sen sisällä — joten voit vain asettaa `required` syötteeseen ja merkintä näkyy. Se on koristeellinen ( `::after` labelissa, saavutettavuuspuiden ulkopuolella); pari se huomautukseen kuten "kentät merkityt \* ovat pakollisia" ellei lomake ole itsestään selvä.

**FormFieldGroup** — `.instui-form-field-group` ryhmittelee liittyvät kentät `<fieldset>`:ssä, jossa on `<legend>`-kuvaus. Se on puhdas asettelu (ei omia tokeneita): oletus pinottaa kentät; `-layout-columns`/`-layout-inline` virtauttavat ne responsiivisiin sarakkeisiin, käyttäen `-row-spacing-*`/`-col-spacing-*` ja `-v-align-*` ruudukon hienosäätöön.

**RadioInputGroup** — `.instui-radio-input-group` on sama `<fieldset>`/`<legend>`-ryhmittely, erikoistettu radioille. Koska lapsiradiot jakavat `name`-ominaisuuden, valinta on natiivisti yksivalintainen — joten joukko toggle-painikkeita käyttäytyy yhtenä kontrollina, ei irtonaisina painikkeina. `-variant-simple` (oletus) asettaa standardiradiot (`-layout-columns`/`-inline` virtaavat ne riviin); `-variant-toggle` yhdistää lapsi-`.instui-radio.-variant-toggle`-painikkeet yhdeksi segmentoitu kontrolliksi (kutistuneet reunat, pyöristetyt ulkoreunat):

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

**Viestit** — `.instui-form-field-messages` on säiliö; jokainen `.instui-form-field-message` saa `-type-*`:n: `-type-hint` (harmaa, oletus), `-type-error` (punainen teksti + ympyrä-varoitus-glyfi), `-type-success` (vihreä teksti + ympyrä-tarkistus-glyfi), ja `-type-screenreader-only` (visuaalisesti rajattu, mutta silti ilmoitettu). Glyfit maalautuvat `currentColor`:lla, joten ne aina vastaavat viestin väriä. `-type-new-error` on vanhentunut alias `-type-error`:lle. Kytke säiliö kontrolliin `aria-describedby`:lla, ja aseta `aria-invalid` kontrolliin virheen ilmetessä.

FormFieldin sisällä `-type-error`-viesti seuraa client-side validointia: se pysyy piilossa kunnes kentän kontrolli on `:user-invalid` (natiivi, käyttäjän interaktion jälkeen) — tai pakotat sen `-invalid`:lla `.instui-form-field`:ssa (palvelinpuolen virhe). Erillinen `.instui-form-field-messages` (ei kentän sisällä) ei muutu. Kontrolin fokuskehys käyttäytyy vastaavasti: vaara kun `:user-invalid`/`-invalid`, onnistuminen `-success`.

**Tekstikontrollit** — `.instui-text-input` (natiivinen `<input>`), `.instui-text-area` (natiivinen `<textarea>`, muutettavissa) ja `.instui-simple-select` (natiivinen `<select>` kursoreilla) jakavat saman ulkoasun ja samat tilat: `-invalid` (virhereuna), `-success` (onnistumisreuna), `-readonly`, natiivi `:disabled`, ja `-size-{sm,md,lg}`. Johtavaa/takaista ikonia varten (InstUI:n `renderBeforeInput`/`renderAfterInput`) kääri input `.instui-input-group`:een ja lisää `.before`/`.after`-slot ( `-icon-*`-glyfi); `-should-not-wrap` pitää sen yhdellä rivillä. `.instui-number-input` on se fasadi plus `.arrows` +/- spinner-sarake (natiivinen `type="number"`; yhdistä painikkeet `stepUp()`/`stepDown()`). `.instui-range-input` on tyylitelty `input[type="range"]`, jonka arvo renderöidään `.instui-range-input-value`-käänteiskuplassa. Rikkaan comboboxin listbox-popoverin tarvitset `@instructure/ui` — kirjasto kattaa natiivit kontrollit.

**Tyylitelty select-valikko (kokeellinen)** — valinnainen `select.css` parantaa _samaa_ `.instui-simple-select`-elementtiä: se tyylittelee avautuvan valikon (paneelin ja jokaisen option, hover- ja valittu-tilat) CSS Customizable Select -mallin avulla.

> [!WARNING]
> `select.css` riippuu `appearance: base-select` / `::picker(select)`, joka on **kokeellinen**
> (Chrome 135+, ei vielä Baseline). Se toimitetaan erillisenä valinnaisena taulukkona ja jokainen sääntö on porttikoituna `@supports (appearance: base-select)`:lla, joten se ei tee mitään tukemattomissa selaimissa — `.instui-simple-select`-kontrolli pysyy vain tavallisena natiivina selectinä. Lataa se vain, jos haluat parannetun pudotusvalikon ja hyväksyt rajoitetun tuen.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
