# Komponensek

`@pantoken/components` osztályalapú komponensstílusokat szállít, amelyeket az Instructure tokenekből építettek. Importáld
a stíluslapot és címkézd a markupodat — nincs szükség keretrendszerre.

```ts
import "@pantoken/components/components.css";
```

> [!MEGJEGYZÉS]
> Előnyben részesíted az egyedi elemeket? `@pantoken/web-components` ugyanazokat a stílusokat csomagolja `<instui-button>`, `<instui-alert>`,
> `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és még több formájában — lásd a
> [csomagtérképet](/guide/packages).

## Konvenciók

A csomag CSS-konvenciói egy módosított [RSCSS](https://ricostacruz.com/rscss/index.html) verzió alapján állnak.

A módosítók **kulcs-érték** formátumúak — `-<prop>-<val>`, amelyek igazodnak az InstUI prop neveihez — így önmagukban érthetőek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A logikai (boolean) propok csak a prop nevét használják; jelenlétük `true` jelent (`-has-shadow`, `-clickable`); egy alapértelmezett bekapcsolt logikai prop kikapcsolása invertál (`-without-background`, `-without-border`). A méretek elfogadják a rövid és hosszú elnevezéseket (`-size-sm` = `-size-small`). Ha egy név eltér az InstUI-tól, az InstUI-szemantikai osztály továbbra is működik, de elavult (például `-variant-info` → használja `-color-info`-t).

### Példa

Instructure UI React komponens:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken komponensek:

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

Az InstUI `timeout` propjához állítsd be az egység nélküli `--timeout` egyéni tulajdonságot milliszekundumban, és töltsd be az Alert interakciót. Pozitív érték ütemezi a bezárást; `0` (alapértelmezett) az alertet a helyén hagyja. Add hozzá a `transition` utilitás `instui-transition -fade-entered` osztályait az InstUI fade-hez; hagyd el őket az azonnali eltávolításhoz. Az interakció vezérli a `-fade-exiting` állapotot és egy visszavonható, buborékoló `dismiss` eseményt lő ki eltávolítás előtt, így egy alkalmazás meghívhatja a `preventDefault()`-t az alert megtartásához.

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

A progress barok tetszőleges skálákat fogadnak el a `--min` (`0` alapértelmezettként), `--value` és `--max`
(`100` alapértelmezettként) segítségével, elavult `--value-now` és `--value-max` aliasokkal. Add hozzá a `-should-animate`-ot,
hogy alkalmazd az InstUI félmásodperces átmenetét, amikor az érték változik. A `.value` a gyökér mellett ül, `.bar`-cal együtt gyermekként; add hozzá a `-render-value-inside`-ot, hogy a track fölé renderelje azt, a kezdőpontjához igazítva (stílusold olvashatóság szerint a meter színe ellen). Használj natív `<progress>`-t nulláról induló tartományhoz és `<meter>`-et, amikor a minimum nem nulla; a web komponensek automatikusan választanak közte a `min` attribútumuk alapján. Az InstUI-nak nincs determinizált (indeterminate) állapota, így egy `<progress>` amelynek hiányzik a `value` attribútuma, pantoken-specifikus legjobb tipp: `progress-bar` animálja a `.bar`-ot csúszó szegmensként és `progress-circle` forgatja a gyűrűjét rögzített ívben, mindkettő elrejti a `.value`-at.

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

A progress körök ugyanazokat a tetszőleges skálákat fogadják el a `--min`, `--value` és `--max` révén.
A `--value-now` és `--value-max` elavult funkcionális aliasokként maradnak. Add hozzá a `-should-animate`-et és töltsd be a fókuszált interakció csomagot az InstUI mount animációjának reprodukálásához; a `--animation-delay` egy egység nélküli milliszekundumos késleltetés. Az elavult `-should-animate-on-mount` és
`-shold-animate-on-mount` helyesírások funkcionális aliasként továbbra is működnek.

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

## Osztály előtag

Minden osztály alapértelmezés szerint `instui-` névtérbe kerül. Készíthetsz stíluslapot saját előtaggal — vagy anélkül — a `prefix` átadásával bármely buildernek. Bármely hamis érték (`null`, `undefined`, `""`, vagy ha kihagyod) teljesen eltávolítja az előtagot, így szerkeszthetsz `class="heading -level-h1"`-t `class="instui-heading -level-h1"` helyett:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjellel kezdődő módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok maradnak. A csomag által szállított stíluslapok megtartják a `instui` előtagot.

## Alap

A `base.css` egy opcionális reset, amely globális dokumentum alapértelmezéseket állít be a tokenekből: `box-sizing`, egy
`body` reset, a lap felülete, alap szövegszín és betű, `color-scheme` (így a `light-dark()` tokenek
és a natív vezérlők követik a témát), és egy alap link. Töltsd be egyszer, a komponens és a próza stíluslapok előtt, amikor a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd ki, amikor komponenseket ágyazol be egy olyan hostba, amely már témázza a saját `html` és `body`-ját —
a reset festi a lap felületét, tehát nem akarod, hogy a hostalversenyezzen. Minden, amit beállít, alacsony specifikusságú `:where()` szelektorokat használ, így a saját szabályaid mindig felülírják.

A `base.css` _alkalmazza_ a brand betűtípust (`font-family: var(--instui-font-family-base)`, rendszeres
visszaesésekkel); hogy _betöltsd_ azt, importáld az opcionális `fonts.css`-t — `@font-face` szabályok az Atkinson Hyperlegible
Next-hez, amelyek a csomagban szállított woff2 fájlokra mutatnak. Külön van, mert a fontok ~350 kB-osak és a betűk önhosztolása szándékos döntés.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó tartalom

<p>Van egy rejtett üzenet a mondat után.<span class="instui-screen-reader-content">Ezt csak a képernyőolvasók jelentik be.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A `.instui-screen-reader-content` egy elemet vizuálisan elrejt, miközben megtartja az akadálymentességi fában
— címkékhez és státusz szöveghez, amelyet az asszisztív technológiának olvasnia kell, de a dizájn nem mutat.

## Utilitások

A `utilities.css` egy opcionális, keresztmetszeti osztályréteg: egy `View` primitív, térköz a token skálán,
és szemantikus színfelülírások. Ellentétben a komponens `-modifier` osztályaival, ezek **kettőskötőjelet** (`--mod`) használnak, így soha nem ütköznek egy komponens saját módosítóneveivel, és bármely
elemen alkalmazhatók — önmagukban vagy komponensre komponálva.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue felület on-color szöveggel.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Középre igazítva mx-auto-val.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` az InstUI `View`-e. Ez az alap, amire rétegezheted a térközt és a színt, és
kulcs-érték módosítókat hordoz saját vizuális beállításaihoz, így nem kell utilitásokat erőltetni:
`-background-*` (felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, és `-cursor-*` — ezek a `view` saját
egykötéses módosítói, nem kapcsolódnak az alábbi kettőskötőjeles utilitásokhoz. Szabadértékű propok
(szélesség/magasság/beágyazás) maradjanak inline stílusok; a `margin`/`padding` a térköz utilitásokat használja.

**Térköz** — oldalankénti osztályok a térköz skálán. Írd őket `{m|p}{side}-{step}` formában: `m` margóhoz vagy `p` paddinghez (vagy a teljes szavak `margin`/`padding`), egy opcionális logikai oldal, majd egy lépés. Tehát `.--m-lg` és `.--margin-lg` ugyanaz, ahogy `.--pt-md` és `.--paddingt-md` is.

- Oldalak: none (minden), `t`/`b` (blokkelem kezdete/vége), `s`/`e` (inline kezdete/vége), `x`/`y` (inline/blokk
  tengely). A logikai oldalak helyesek jobbról balra elrendezésben is.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plusz `auto` csak margóhoz.

Komponáld őket az InstUI `margin="small auto large"` rövidítéssel:
`class="--mt-sm --mx-auto --mb-lg"`.

**Szín** — szemantikus felülírások, amelyek palettán maradnak: `.--bg-<name>` (háttér),
`.--text-<name>` (szövegszín), és `.--border-<name>` (keretszín). Minden `<name>` egy
szemantikus színtoken — az intenciók (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plusz a `accent-*` paletta (`accent-blue`, `accent-green`, és így tovább). Egy név csak akkor létezik, ha a token megtalálható abban a családban, tehát `text-brand` nem osztály — a szövegnek nincs brand tokenje. Nincs mód primitívhez vagy tetszőleges hex-hez nyúlni, és minden felülírás követi a témát.

**Token családok** — minden "egy token, egy tulajdonság" család minden tokenjéhez van egy osztály, a token neve alapján. Szabadon komponáld őket:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak az egy tulajdonságát állítja be, így a `border-width`/`border-radius`-nak szüksége van egy `border-*` színre és egy keretstílusra, hogy ténylegesen rajzoljon egy keretet. Ezek a teljes tokennevet használják (`.--border-radius-md`), míg a szín- és térkőzsegédletek fent rövid aliasokat használnak (`.--bg-brand`, `.--mt-lg`) — az aliasok ergonómikus rövidítések; a token osztályok literal és kimerítők.

**Elrendezés** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és `.--text-align-<value>` (`start`, `center`, `end`, `justify`) lefedik az InstUI
keresztmetszeti `display` és `textAlign` propjait (View, Button, Metric, Tabs, …) komponálható osztályokként —
tehát ezek nem komponensenkénti módosítók.

Minden kettőskötőjeles osztály determinisztikusan győz a névazonos egykötéses komponens módosító fölött, függetlenül a stíluslap import sorrendjétől — lásd az [Authoring conventions](/conventions/authoring) a mechanizmushoz.

Minden itt tiszta CSS, amelyet a `--instui-*` tokenek vezérelnek, így a tokenrétegen keresztül követi az InstUI-t. Lásd az [API referenciát](/api/) a `componentsCss` és a komponensenkénti builderek számára.

## Overlay-ek: dialog és popover

Az overlay komponensek natív platform primitívekre épülnek, így kis vagy semmilyen JavaScript nélkül is hozzáférhetően viselkednek.

**Modal** — tegyél `.instui-modal`-t egy natív `<dialog>`-re. Ez fókuszcsapdázást, `Esc`-vel történő bezárást és egy
`::backdrop`-t kap ingyen; a hátteret azonos `--instui-component-mask-background-color`
token sötétíti, mint `.instui-mask` (add hozzá a `-blur`-ot, hogy fagyos legyen). Nyisd és csukd invoker parancsokkal — nincs szükség scriptre:

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

**Context view / popover** — tegyél `.instui-context-view`-et egy `[popover]` elemre és váltogasd `popovertarget`-nel. A legfelső rétegen ül és kívülre kattintásra vagy `Esc`-ra könnyen eldobható, ismét nincs script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — tegyél `.instui-drawer-layout`-t egy elrendezés gyökerére `.tray` és `.content`
gyermekekkel. Add hozzá a `open` attribútumot (vagy `-open`) a tálca felfedéséhez, és használd a `placement="end"`
(vagy `-placement-end`)-t a beágyazás végén történő dokkoláshoz — a pozicionálás logikai
`inset-inline-*`/`flex-direction` tulajdonságokon keresztül oldódik meg, így automatikusan megfordul `dir="rtl"` alatt extra szabályok nélkül. A fókuszált interakció csomag hozzáadja az Invoker parancs útválasztást és átkapcsolja az overlay módot
(`should-overlay-tray`), amikor a szélesség átlépi a `--drawer-layout-min-width`-t (alapértelmezett
`--instui-breakpoints-sm`, majd `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — a `.instui-mask` az in-flow overlay-ekre marad (például egy spinner egy kártya fölött); egy modal `::backdrop`
a modal esetet fedi le.

Mindkét mintát viselkedési egyedi elemek is becsomagolják a `@pantoken/web-components`-ben:
`<instui-modal open>` (egy `<dialog>` meghajtva a `open` attribútuma által) és `<instui-context-view>` (egy
natív popover).

Böngészőtámogatás: a popover API és a `popovertarget` Baseline 2024; az invoker parancsok
(`command`/`commandfor`) Baseline 2025, így régebbi böngészőkön kösd a gombokat `dialog.showModal()`-hez egyszerű visszaesésként. Popover pozicionálása a trigger mellé CSS anchor pozícionálással történik, ahol támogatott (Chromium); máshol a felső réteg közepére igazodik.

## Űrlapok

**FormField** — a `.instui-form-field` egy CSS Grid wrapper, amely egy labelt, a kontrollt és tetszőleges
üzeneteket helyez el. Tedd egy `<label>`-re, hogy a címke natívan társuljon a kontrollal. Három grid területe van — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

A `-layout-stacked` (alapértelmezett) egymásra rakja a területeket; `-layout-inline` a címkét a kontroll mellé helyezi (hangold `-label-align-{start,end}` és `-v-align-{top,middle,bottom}` segítségével). A `-readonly` átfesti a címkét.

A **kötelező csillag** akkor jelenik meg, amikor a mező kötelező _akár_ a `-required` osztály által _vagy_ egy natív `required` vezérlő által benne — így csak beállíthatod a `required`-t a inputon és a jel megjelenik.
Dekoratív (egy `::after` a labelen, az akadálymentességi fán kívül); párosítsd egy megjegyzéssel, például "a *-gal jelölt mezők kötelezőek", kivéve ha az űrlap önmagában egyértelmű.

**FormFieldGroup** — a `.instui-form-field-group` csoportosítja a kapcsolódó mezőket egy `<fieldset>`-ben egy
`<legend>` leírással. Ez tiszta elrendezés (nincsenek dedikált tokenek): alapértelmezettben egymásra halmozza a mezőket;
`-layout-columns` / `-layout-inline` rugalmas oszlopokba rendezi őket, `-row-spacing-*` /
`-col-spacing-*` és `-v-align-*`-tal hangolva a rácsot.

**RadioInputGroup** — a `.instui-radio-input-group` ugyanaz a `<fieldset>`/`<legend>` csoportosítás,
speciálisan rádiókhoz. Mivel a gyermek rádiók megosztanak egy `name`-t, a kiválasztás natívan egyválasztós —
tehát egy toggle gombcsoport egy kontrolként viselkedik, nem szabad gombokként. A `-variant-simple` (alapértelmezett) a
standard rádiókat helyezi el (`-layout-columns`/`-inline` sorba rendezik őket); a `-variant-toggle` összekapcsolja a
gyermekként lévő `.instui-radio.-variant-toggle` gombokat egyetlen szegecselt kontrollá (befalazott keretek,
lekerekített külső végek):

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

**Üzenetek** — a `.instui-form-field-messages` a konténer; minden `.instui-form-field-message` vesz egy
`-type-*`-ot: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + kör-alert glyph), `-type-success`
(zöld szöveg + kör-check glyph), és `-type-screenreader-only` (vizuálisan elvágott, mégis bejelentett).
A glyphek a `currentColor`-ban festődnek, így mindig illeszkednek az üzenet színéhez. A `-type-new-error` egy
elavult alias a `-type-error`-nak. Kösd a konténert a vezérlőhöz `aria-describedby`-tel, és állítsd be
a `aria-invalid`-at a vezérlőn, ha hiba van.

Egy FormField belsejében egy `-type-error` üzenet a kliensoldali validációt követi: rejtve marad, amíg a
mező kontrollja `:user-invalid` (natív, miután a felhasználó interakcióba lép) — vagy erőlteted azt `-invalid`
-vel a `.instui-form-field`-on (szerveroldali hiba esetén). Egy önálló `.instui-form-field-messages` (nem mezőben) érintetlen marad. A kontroll fókuszgyűrűje hasonló: veszély, amikor `:user-invalid`/`-invalid`,
siker, amikor `-success`.

**Szövegvezérlők** — a `.instui-text-input` (natív `<input>`), `.instui-text-area` (natív `<textarea>`,
átméretezhető), és `.instui-simple-select` (natív `<select>` caret-tel) egy megjelenést és ugyanazokat
állapotokat osztják: `-invalid` (hibakeret), `-success` (sikerkeret), `-readonly`, natív `:disabled`, és
`-size-{sm,md,lg}`. Vezető/véget ikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`) csomagold be
az inputot `.instui-input-group`-ba és adj `.before`/`.after` slotot (egy `-icon-*` glyph); a `-should-not-wrap`
egysoros tartást biztosít. A `.instui-number-input` az a facade plusz egy `.arrows` +/- spinner oszlop (natív
`type="number"`; kösd a gombokat `stepUp()`/`stepDown()`-hez). A `.instui-range-input` egy stílusolt
`input[type="range"]`, amelynek értéke egy `.instui-range-input-value` fordított buborékban jelenik meg. Gazdag
comboboxhoz listbox popoverral, használj `@instructure/ui`-at — ez a könyvtár lefedi a natív kontrollokat.

**Stilizált select legördülő (kísérleti)** — egy opcionális `select.css` frissíti ugyanazt a
`.instui-simple-select` elemet: stílusolja a megnyitott legördülőt (a panelt és minden opciót, hover és
kiválasztott állapotokkal) a CSS Customizable Select modellel.

> [!FIGYELMEZTETÉS]
> A `select.css` a `appearance: base-select` / `::picker(select)`-re támaszkodik, amely **kísérleti**
> (Chrome 135+, még nem Baseline). Külön, opcionális lapon szállítjuk, és minden szabály le van zárva `@supports (appearance: base-select)` mögé, így nem csinál semmit a nem támogatott böngészőkben — a
> `.instui-simple-select` vezérlő egyszerű natív select marad. Csak akkor töltsd be, ha szeretnéd a
> bővített legördülőt és elfogadod a korlátozott támogatást.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
