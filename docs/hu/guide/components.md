# Komponensek

`@pantoken/components` osztályalapú komponensstílusokat szállít az Instructure tokenekből. Importáld a stíluslapot és címkézd meg a markupodat — nincs szükség keretrendszerre.

```ts
import "@pantoken/components/components.css";
```

> [!MEGJEGYZÉS]
> Egyedi elemeket részesítenél előnyben? `@pantoken/web-components` ezekkel ugyanazokat a stílusokat csomagolja `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és még több formájában — lásd a [package map](/api/)-et.

## Konvenciók

A csomag CSS konvenciói a módosított [RSCSS](https://ricostacruz.com/rscss/index.html) verzióra épülnek.

A módosítók **kulcs-érték** típusúak — `-<prop>-<val>`, az InstUI prop neveihez igazítottak — így önmagukban olvashatók: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A boolean propok csak a prop nevét használják; jelenlétük `true`-t jelent (`-has-shadow`, `-clickable`); egy alapértelmezetten aktív boolean kikapcsolása invertál (`-without-background`, `-without-border`). A méretek rövid és hosszú írásmóddal egyaránt elfogadottak (`-size-sm` = `-size-small`). Ha egy név eltér az InstUI-tól, az InstUI-szemantikus osztály továbbra is működik, de elavult (pl. `-variant-info` → használja `-color-info`-t).

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

Az InstUI `timeout` propjához állítsd be az egység nélküli `--timeout` egyéni tulajdonságot milliszekundumban és töltsd be az Alert interakciót. Pozitív érték ütemezi az elrejtést; `0` (alapértelmezett) hagyja az alertet a helyén. Add hozzá a `transition` utility `instui-transition -fade-entered` osztályait az InstUI fade-hez; hagyd el őket az azonnali eltávolításhoz. Az interakció vezérli a `-fade-exiting` állapotot és egy visszavonható, buborékoló `dismiss` eseményt indít az eltávolítás előtt, így az alkalmazás meghívhatja `preventDefault()`-t az alert megtartásához.

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

A progress bárok tetszőleges skálákat fogadnak a `--min` (`0` alapértelmezett), `--value` és `--max` (`100` alapértelmezett) segítségével, elavult `--value-now` és `--value-max` aliasokkal. Add hozzá a `-should-animate`-ot, hogy alkalmazza az InstUI félmásodperces átmenetét, amikor egy érték változik. A `.value` a gyökér gyermekeként ül a `.bar` mellett; add hozzá a `-render-value-inside`-ot, hogy a sáv fölé renderelje, a kezdőpontjához igazítva (stílusozd az olvashatóság érdekében a méter színével szemben). Használj natív `<progress>`-t nulláról induló tartományhoz és `<meter>`-t, ha a minimum nem nulla; a web komponensek automatikusan választanak köztük a `min` attribútumuk alapján. Az InstUI-nak nincs indeterminált állapota, így egy `<progress>` nélküli `value` attribútum pantoken-specifikus legjobb tipp: `progress-bar` animálja `.bar`-ot csúszó szegmensként és `progress-circle` forog a gyűrűjével fix íven, mindkettő elrejti `.value`-t.

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

A progress körök ugyanazokat a tetszőleges skálákat fogadják a `--min`, `--value` és `--max` segítségével. A `--value-now` és `--value-max` továbbra is elavult funkcionális aliasok. Add hozzá a `-should-animate`-et és töltsd be a fókuszált interakció csomagot az InstUI mount animáció reprodukálásához; a `--animation-delay` egység nélküli milliszekundumos késleltetés. Az elavult `-should-animate-on-mount` és `-shold-animate-on-mount` írásmódok továbbra is működő aliasok.

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

Minden osztály alapértelmezetten `instui-` névtérbe tartozik. Készíts saját előtaggal — vagy nélküli — stíluslapot úgy, hogy átadod a `prefix`-t bármely buildernek. Bármely falsy érték (`null`, `undefined`, `""` vagy elhagyása) teljesen eltávolítja az előtagot, így szerződhetsz `class="heading -level-h1"`-t `class="instui-heading -level-h1"` helyett:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjeles előtagú módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok. A csomag által szállított stíluslapok megtartják a `instui` előtagot.

## Alapok

A `base.css` egy választható reset, amely globális dokumentum alapértékeket állít be a tokenekből: `box-sizing`, egy `body` reset, az oldal felülete, alap szövegszín és betű, `color-scheme` (így `light-dark()` tokenek és natív vezérlők követik a témát), és egy alap link. Töltsd be egyszer, a komponens és próza lemezek előtt, ha a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd ki, amikor komponenseket ágyazol be egy olyan hostba, amely már tematikázza a saját `html` és `body`-ját — a reset felfesti az oldal felületét, így nem akarod, hogy a hostal harcoljon. Minden, amit beállít, alacsony specifikusságú `:where()` szelektorokat használ, tehát a saját szabályaid mindig felülírják.

A `base.css` _alkalmazza_ a brand betűtípust (`font-family: var(--instui-font-family-base)`, rendszer visszaeséssel); a betűk _betöltéséhez_ importáld az opciós `fonts.css`-at — `@font-face` szabályok az Atkinson Hyperlegible Next-re mutatnak, amelyek a csomagban szállított woff2 fájlokra hivatkoznak. Külön van, mert a betűkészletek ~350 kB-ok és a saját hosztolás tudatos döntés.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó tartalom

<p>Van egy rejtett üzenet e mondat után.<span class="instui-screen-reader-content">Ezt csak a képernyőolvasók jelentik be.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A `.instui-screen-reader-content` vizuálisan elrejti az elemet miközben megtartja az akadálymentességi fastruktúrában — címkékhez és státuszszövegekhez, amelyeket a segédeszközöknek fel kell olvasniuk, de a dizájn ne mutassa.

## Utility-k

A `utilities.css` egy választható réteg a keresztmetszeti osztályoknak: egy `View` primitív, térköz a token skálán, és szemantikus színfelülbírálások. A komponens `-modifier` osztályoktól eltérően ezek **kettős kötőjelet** (`--mod`) használnak, így soha nem ütköznek egy komponens saját módosítóival, és bármely elemre alkalmazhatók — egyszerűen vagy komponensre komponálva.

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

**View** — a `.instui-view` az InstUI `View`-je. Ez az alap, amire rétegezed a térközt és a színt, és viseli a kulcs-érték módosítókat saját vizuális propjaihoz, így nem kell utilitások után nyúlnod: `-background-*` (a felületei), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, és `-cursor-*` — ezek `view` saját egykötéses módosítói, nem kapcsolódnak a dupla kötőjeles utilitásokhoz lent. Szabad értékű propok (width/height/inset) maradnak inline stílusok; a `margin`/`padding` használják a spacing utilokat.

**Térköz** — oldalankénti osztályok a spacing skálán. Úgy olvasd őket, mint `{m|p}{side}-{step}`: `m` margóra vagy `p` paddingre (vagy a teljes szavak `margin`/`padding`), opcionális logikai oldal, majd egy lépés. Tehát `.--m-lg` és `.--margin-lg` ugyanazok, ahogy `.--pt-md` és `.--paddingt-md` is.

- Oldalak: none (mind), `t`/`b` (blokkelemzés kezdete/vége), `s`/`e` (inline kezdete/vége), `x`/`y` (inline/blokk tengely). A logikai oldalak helyesek jobb-balra elrendezésben is.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plusz `auto` csak marginhoz.

Komponáld őket az InstUI `margin="small auto large"` rövidítéssel: `class="--mt-sm --mx-auto --mb-lg"`.

**Szín** — szemantikus felülbírálások, amelyek palettán belül maradnak: `.--bg-<name>` (háttér), `.--text-<name>` (szövegszín) és `.--border-<name>` (keretszín). Minden `<name>` egy szemantikus szín token — az intenciók (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) plusz a `accent-*` paletta (`accent-blue`, `accent-green`, stb.). Egy név csak akkor létezik, ha a token megtalálható abban a családban, így `text-brand` nem osztály — a szövegnek nincs brand tokenje. Nincs mód primitív vagy tetszőleges hex elérésére, és minden felülbírálás követi a témát.

**Token családok** — minden "egy token, egy tulajdonság" család kap egy osztályt tokenenként, a token neve alapján. Szabadon komponálhatók:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak a saját egy tulajdonságát állítja be, így `border-width`/`border-radius`-nek szüksége lesz egy `border-*` színre és egy keret stílusra, hogy ténylegesen rajzoljon keretet. Ezek a teljes token nevet használják (`.--border-radius-md`), míg a szín- és térköz segédosztályok rövid aliasokat (`.--bg-brand`, `.--mt-lg`) használnak — az aliasok ergonómiai rövidítések; a token osztályok literal és kimerítőek.

**Elrendezés** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) és `.--text-align-<value>` (`start`, `center`, `end`, `justify`) lefedik az InstUI keresztmetszeti `display` és `textAlign` propjait (View, Button, Metric, Tabs, …) komponálható osztályként — tehát ezek nem komponensenkénti módosítók.

Minden dupla kötőjeles osztály determinisztikusan felülírja ugyanilyen nevű egykötéses komponens módosítót, függetlenül a stíluslap beimportálási sorrendjétől — lásd a [Authoring conventions](/conventions/authoring) mechanizmusát.

Minden itt tisztán CSS által hajtott az `--instui-*` tokenek által, így követi az InstUI-t a tokenrétegen keresztül. Lásd az [API reference](/api/) az `componentsCss` és a komponensenkénti builderek részleteiért.

## Overlay-ek: dialógus és popover

Az overlay komponensek natív platform primitíveken ülnek, így kis vagy semleges JavaScript-tel is hozzáférhetőek maradnak.

**Modal** — tegyél `.instui-modal`-t egy natív `<dialog>`-re. Kap fókuszcsapdát, `Esc`-t a bezáráshoz, és egy `::backdrop`-t ingyen; a háttér elhomályosítása ugyanazzal a `--instui-component-mask-background-color` tokennel történik, mint `.instui-mask` (add hozzá a `-blur`-ot, hogy fagyos legyen). Nyisd és zárd invoker parancsokkal — nincs szükség scriptre:

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

**Context view / popover** — tegyél `.instui-context-view`-et egy `[popover]` elemre és toggle-ld `popovertarget`-nel. A legfelső rétegen ül és külső kattintással vagy `Esc`-ral könnyen elrejthető, szintén script nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — tegyél `.instui-drawer-layout`-t egy elrendezés gyökerére `.tray` és `.content` gyermekekkel. Add hozzá a `open` attribútumot (vagy `-open`-t) a tálca felfedéséhez, és használd a `placement="end"`-ot (vagy `-placement-end`-t) a dokkoláshoz az inline-vég oldalra — a pozícionálás logikai `inset-inline-*`/`flex-direction` tulajdonságokon keresztül oldódik meg, így automatikusan megfordul `dir="rtl"` alatt extra szabályok nélkül. A fókuszált interakció csomag hozzáadja az Invoker parancs routingot és vált overlay módra (`should-overlay-tray`), amikor a szélesség átlépi a `--drawer-layout-min-width`-t (alapértelmezett `--instui-breakpoints-sm`, majd `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — a `.instui-mask` az in-flow overlay-ekre való (pl. spinner egy kártyán); egy modal `::backdrop` lefedi a modal esetet.

Mindkét mintázat viselkedéses egyedi elemmel is csomagolva van a `@pantoken/web-components`-ben: `<instui-modal open>` (egy `<dialog>` vezérelt az `open` attribútuma alapján) és `<instui-context-view>` (egy natív popover).

Böngésző támogatás: a popover API és `popovertarget` Baseline 2024; az invoker parancsok (`command`/`commandfor`) Baseline 2025, így régebbi böngészőkön kösd össze a gombokat `dialog.showModal()`-tel egy egysoros fallbackként. Popover pozícionálása a trigger mellett CSS anchor pozícionálással történik, ahol támogatott (Chromium); máshol a tetei réteg közepére igazít.

## Űrlapok

**FormField** — a `.instui-form-field` egy CSS Grid wrapper, amely címkét, vezérlőt és üzeneteket helyez el. Tedd egy `<label>`-re, hogy a címke natívan társuljon a vezérlőhöz. Három grid területe van — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

A `-layout-stacked` (alapértelmezett) egymásra rakja a területeket; a `-layout-inline` a címkét a vezérlő mellé helyezi (hangold a `-label-align-{start,end}` és `-v-align-{top,middle,bottom}` segítségével). A `-readonly` átszínezi a címkét.

A **kötelező csillag** akkor jelenik meg, ha a mező kötelező _vagy_ a `-required` osztály, _vagy_ egy natív `required` vezérlő van benne — így egyszerűen beállíthatod `required`-t a inputon és a jel megjelenik. Dekoratív (egy `::after` a címkén, az akadálymentességi fában kívül); párosítsd egy megjegyzéssel, mint „a csillaggal jelölt mezők kötelezőek”, hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — a `.instui-form-field-group` csoportosít kapcsolódó mezőket egy `<fieldset>`-ben egy `<legend>` leírással. Ez tiszta elrendezés (nincsenek dedikált tokenek): alapértelmezés szerint veremként jeleníti meg a mezőket; a `-layout-columns` / `-layout-inline` responszív oszlopokba folyattja őket, a `-row-spacing-*` / `-col-spacing-*` és `-v-align-*` segítségével hangolva a gridet.

**RadioInputGroup** — a `.instui-radio-input-group` ugyanaz a `<fieldset>`/`<legend>` csoportosítás, rádiókra specializálva. Mivel a gyermek rádiók megosztanak egy `name`-t, a kiválasztás natívan egyválasztásos — így egy toggle gombokból álló halmaz egy vezérlőként viselkedik, nem szabad gombokként. A `-variant-simple` (alapértelmezett) szabványos rádiókat helyez el (`-layout-columns`/`-inline` sorba folyattatja őket); a `-variant-toggle` összeköti a gyermek `.instui-radio.-variant-toggle` gombokat egyetlen szeparált kontrollá (összecsukott keretek, lekerekített külső végek):

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

**Üzenetek** — a `.instui-form-field-messages` a konténer; minden `.instui-form-field-message` egy `-type-*`-ot vesz fel: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + kör-alert ikon), `-type-success` (zöld szöveg + kör-pipa ikon), és `-type-screenreader-only` (vizuálisan elvágott, de továbbra is bejelentett). Az ikonok `currentColor`-ban festődnek, így mindig illeszkednek az üzenet színéhez. A `-type-new-error` elavult aliasa a `-type-error`-nak. Kösd a konténert a vezérlőhöz `aria-describedby`-tel, és állítsd be a `aria-invalid`-at a vezérlőn, ha hiba van.

Egy FormField-en belül egy `-type-error` üzenet a kliensoldali validációt követi: rejtve marad, amíg a mező vezérlője `:user-invalid` (natív, a felhasználói interakció után) — vagy erőltetheted `-invalid`-vel a `.instui-form-field`-on (szerveroldali hiba esetén). Egy önálló `.instui-form-field-messages` (nem egy mezőben) nincs hatással. A vezérlő fókuszgyűrűje ennek megfelelően viselkedik: veszély, amikor `:user-invalid`/`-invalid`, siker `-success` esetén.

**Szövegvezérlők** — `.instui-text-input` (natív `<input>`), `.instui-text-area` (natív `<textarea>`, átméretezhető), és `.instui-simple-select` (natív `<select>` karéttel) ugyanazt a megjelenést és állapotokat osztják: `-invalid` (hiba keret), `-success` (siker keret), `-readonly`, natív `:disabled`, és `-size-{sm,md,lg}`. Egy vezető/végikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`) csomagold az inputot `.instui-input-group`-ba és adj hozzá egy `.before`/`.after` slotot (egy `-icon-*` ikon); a `-should-not-wrap` egy sorban tartja. A `.instui-number-input` az a homlokzat plusz egy `.arrows` +/- spinner oszloppal (natív `type="number"`; kösd a gombokat `stepUp()`/`stepDown()`-hez). A `.instui-range-input` egy stílusolt `input[type="range"]`, amelynek értéke egy `.instui-range-input-value` invert buborékban renderelődik. Egy gazdag comboboxhoz listbox popoverrel, használd a `@instructure/ui`-at — ez a könyvtár lefedi a natív vezérlőket.

**Stilizált select legördülő (kísérleti)** — egy választható `select.css` frissíti ugyanazt a `.instui-simple-select` elemet: stilizálja a nyitott legördülőt (panel és minden opció, hover és kiválasztott állapotok) a CSS Customizable Select modell használatával.

> [!FIGYELMEZTETÉS]
> A `select.css` függ a `appearance: base-select` / `::picker(select)`-tól, ami **kísérleti**
> (Chrome 135+, még nem Baseline). Külön opciós lemezként van szállítva és minden szabály `@supports (appearance: base-select)` mögé van zárva, így nem csinál semmit a nem támogatott böngészőkben — a `.instui-simple-select` vezérlő egyszerű natív select marad. Csak akkor töltsd be, ha a fejlettebb legördülőt szeretnéd és elfogadod a korlátozott támogatást.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
