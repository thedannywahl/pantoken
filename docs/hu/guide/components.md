# Komponensek

A(z) `@pantoken/components` az Instructure tokenekből felépített, osztályalapú komponensstílusokat biztosít. Importáld
a stíluslapot, és lásd el címkékkel a markupot — keretrendszerre sincs szükség.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Inkább az egyéni elemeket részesíted előnyben? A(z) `@pantoken/web-components` ugyanezeket a stílusokat csomagolja be `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és további elemekként — lásd a
> [csomagtérképet](/guide/packages).

## Konvenciók

A csomagban található CSS-konvenciók az [RSCSS](https://ricostacruz.com/rscss/index.html) módosított változatán alapulnak.

A módosítók **kulcs-érték** alapúak — `-<prop>-<val>`, az InstUI prop-neveihez igazítva —, így önmagukért
beszélnek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A boolean propok csupán maga a prop
neve, ahol a jelenlét értéke `true` (`-has-shadow`, `-clickable`); egy alapértelmezetten bekapcsolt, kikapcsolt boolean
invertálódik (`-without-background`, `-without-border`). A méretek rövid és hosszú írásmódot is elfogadnak
(`-size-sm` = `-size-small`). Ahol egy név eltér az InstUI-tól, az InstUI-szemantikus osztály továbbra is működik,
de elavult (pl. `-variant-info` → használd a(z) `-color-info` osztályt).

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

Az InstUI `timeout` propjához állítsd be a mértékegység nélküli `--timeout` egyéni tulajdonságot milliszekundumban, és töltsd be
az Alert interakciót. Egy pozitív érték ütemezi az eltüntetést; a(z) `0` (az alapértelmezett) helyben hagyja
az alertet. Add hozzá a(z) `transition` segédosztály `instui-transition -fade-entered` osztályait az InstUI áttűnéséhez; hagyd el
őket az azonnali eltávolításhoz. Az interakció vezérli a(z) `-fade-exiting` állapotot, és eltávolítás előtt egy megszakítható,
buborékoló `dismiss` eseményt vált ki, így az alkalmazás meghívhatja a(z) `preventDefault()` metódust az alert
csatolva tartásához.

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

A folyamatjelző sávok tetszőleges skálákat fogadnak el a(z) `--min` (alapértelmezés szerint `0`), `--value` és `--max`
(alapértelmezés szerint `100`) révén, az elavult `--value-now` és `--value-max` álnevekkel. Add hozzá a(z) `-should-animate` osztályt,
hogy az InstUI fél másodperces átmenetét alkalmazd az érték változásakor. A(z) `.value` a(z) `.bar` mellett helyezkedik el a
gyökérelem gyermekeként; add hozzá a(z) `-render-value-inside` osztályt, hogy ehelyett a sáv fölött, annak elejéhez igazítva jelenjen meg
(állíts be stílust az olvashatóság érdekében a mérősáv színével szemben). Használj natív `<progress>` elemet a
nulla alapú tartományhoz, és `<meter>` elemet, ha a minimum nem nulla; a webes komponensek a(z) `min`
attribútumuk alapján automatikusan választanak közülük. Az InstUI nem rendelkezik határozatlan állapottal, így a(z) `value`
attribútum nélküli `<progress>` egy pantoken-specifikus legjobb becslés: a(z) `progress-bar` egy csúszó szegmensként animálja a(z) `.bar` elemet,
a(z) `progress-circle` pedig rögzített íven forgatja a gyűrűjét, mindkettő elrejtve a(z) `.value` elemet.

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

A körkörös folyamatjelzők ugyanezeket a tetszőleges skálákat fogadják el a(z) `--min`, `--value` és `--max` révén.
A(z) `--value-now` és a(z) `--value-max` elavult funkcionális álnévként megmaradnak. Add hozzá a(z) `-should-animate` osztályt, és
töltsd be a fókuszált interakciós csomagot az InstUI mount-animációjának reprodukálásához; a(z) `--animation-delay` egy
mértékegység nélküli milliszekundumos késleltetés. Az elavult `-should-animate-on-mount` és
`-shold-animate-on-mount` írásmódok funkcionális álnevekként megmaradnak.

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

## Osztályelőtag

Alapértelmezés szerint minden osztály a(z) `instui-` névtérrel rendelkezik. Egyéni előtaggal — vagy előtag nélkül — is készíthetsz stíluslapot,
ha a(z) `prefix` értéket átadod bármely buildernek. Bármilyen falsy érték (`null`, `undefined`, `""`, vagy annak elhagyása) teljesen
eltávolítja az előtagot, így a(z) `class="instui-heading -level-h1"` helyett a(z) `class="heading -level-h1"` formát használhatod:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjeles előtaggal ellátott módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok maradnak. A
csomag által biztosított stíluslapok megtartják a(z) `instui` előtagot.

## Base

A(z) `base.css` egy opcionális reset, amely a tokenek alapján állítja be a globális dokumentum-alapértelmezéseket: `box-sizing`, egy
`body` reset, az oldal felülete, az alapszöveg színe és betűtípusa, `color-scheme` (így a(z) `light-dark()` tokenek
és a natív vezérlők követik a témát), valamint egy alap hivatkozás. Egyszer töltsd be, a komponens- és a próza-
stíluslapok előtt, amikor a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd el, ha a komponenseket olyan gazdakörnyezetbe ágyazod be, amely már megadja a saját `html` és `body` stílusát —
a reset kiszínezi az oldal felületét, így nem célszerű, hogy ütközzön a gazdakörnyezettel. Minden általa beállított szabály alacsony
specificitású `:where()` szelektorokat használ, így a saját szabályaid mindig érvényesülnek.

A(z) `base.css` _alkalmazza_ a márka betűtípusát (`font-family: var(--instui-font-family-base)`, rendszerbeli
tartalékokkal); a _betöltéséhez_ importáld az opcionális `fonts.css` fájlt — `@font-face` szabályok az Atkinson Hyperlegible
Next betűtípushoz, amelyek a csomagban található woff2 fájlokra mutatnak. Ez azért van külön, mert a betűkészletek mérete ~350 kB, és
a betűtípusok saját kiszolgálása tudatos döntés kérdése.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó-tartalom

<p>There's a hidden message after this sentence.<span class="instui-screen-reader-content">Only screen readers announce this.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A(z) `.instui-screen-reader-content` vizuálisan elrejti az elemet, miközben az akadálymentességi fában megőrzi azt
— olyan címkékhez és állapotszövegekhez, amelyeket a kisegítő technológiáknak fel kell olvasniuk, de a dizájnban nem kell megjelenniük.

## Segédosztályok

A(z) `utilities.css` egy opcionális réteg keresztirányú osztályokból: egy `View` primitív, térközök a tokenek
skáláján, valamint szemantikus színfelülbírálások. A komponensek `-modifier` osztályaival ellentétben ezek bármelyik
elemre érvényesek, így komponensekre vagy egyszerű HTML-tagekre is ráépíthetők.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md instui-mb-sm" style="border-radius: 6px;">
  <span class="instui-text instui-fg-on-color">Accent-blue surface with on-color text.</span>
</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centered with mx-auto.</span>
</div>

```html
<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md">…</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto">…</div>
```

**View** — A(z) `.instui-view` az InstUI `View` megfelelője. Ez az alap, amelyre a térközöket és színeket rétegezheted, és
kulcs-érték módosítókat tartalmaz a saját vizuális propjaihoz, így nem kell segédosztályokhoz nyúlnod:
`-background-*` (a felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, valamint `-cursor-*`. A szabad értékű propok
(width/height/inset) inline stílusok maradnak; a(z) `margin`/`padding` a térköz segédosztályokat használja.

**Spacing** — oldalankénti osztályok a térközskálán. Értelmezésük: `{m|p}{side}-{step}`: `m` a
marginhoz vagy `p` a paddinghez (vagy a teljes `margin`/`padding` szavak), egy opcionális logikai oldal, majd egy
lépésköz. Így a(z) `.instui-m-lg` és a(z) `.instui-margin-lg` megegyezik, csakúgy, mint a(z) `.instui-pt-md` és
a(z) `.instui-paddingt-md`.

- Oldalak: nincs (összes), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  tengely). A logikai oldalak jobbról balra (RTL) elrendezésekben is helyesek maradnak.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, valamint `auto` csak a marginhoz.

Kombináld őket az InstUI `margin="small auto large"` rövidítéséhez:
`class="instui-mt-sm instui-mx-auto instui-mb-lg"`.

**Color** — szemantikus felülbírálások, amelyek a palettán belül maradnak: `.instui-bg-<name>` (háttér),
`.instui-fg-<name>` (szövegszín) és `.instui-border-<name>` (szegélyszín). Minden `<name>` egy
szemantikus színtoken — a célok (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …), valamint a(z) `accent-*` paletta (`accent-blue`, `accent-green` stb.).
Egy név csak akkor érhető el, ha a token létezik az adott családban, így a(z) `fg-brand` nem létező osztály — a szövegnek
nincs brand tokenje. Primitív vagy tetszőleges hexadecimális szín elérésére nincs mód, és minden felülbírálás követi
a témát.

**Token-családok** — minden „egy token, egy tulajdonság” család tokenenként kap egy osztályt, amelyet a
tokenről neveztek el. Kombináld őket szabadon:

- `.instui-font-family-heading`, `.instui-font-family-code`, … → `font-family`
- `.instui-font-weight-body-strong`, `.instui-font-weight-interactive`, … → `font-weight`
- `.instui-line-height-*` → `line-height`
- `.instui-border-radius-md`, `.instui-border-radius-full`, … → `border-radius`
- `.instui-border-width-sm`/`-md`/`-lg` → `border-width`
- `.instui-opacity-base`, `.instui-opacity-disabled` → `opacity`
- `.instui-elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak az egyetlen tulajdonságát állítja be, így a(z) `border-width`/`border-radius` számára egy `border-*` színre és egy szegélystílusra
van szükség a szegély tényleges kirajzolásához. Ezek a teljes tokennevet használják (`.instui-border-radius-md`), míg a
fenti szín- és térközsegédek rövid álneveket (`.instui-bg-brand`, `.instui-mt-lg`) — az álnevek
ergonomikus rövidítések; a tokenosztályok szó szerintiek és kimerítőek.

**Layout** — A(z) `.instui-display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és a(z) `.instui-text-align-<value>` (`start`, `center`, `end`, `justify`) az InstUI keresztirányú
`display` és `textAlign` propjait (View, Button, Metric, Tabs, …) fedik le komponálható osztályokként —
így ezek nem komponensenkénti módosítók.

Itt minden tiszta CSS, amelyet a(z) `--instui-*` tokenek vezérelnek, így a tokenrétegen keresztül követi az InstUI-t.
Lásd az [API-referenciát](/api/) a(z) `componentsCss` és a komponensenkénti builderek tekintetében.

## Overlays: dialog és popover

Az overlay komponensek natív platformprimitívekre épülnek, így kevés JavaScripttel vagy akár anélkül is akadálymentesen viselkednek.

**Modal** — helyezd a(z) `.instui-modal` osztályt egy natív `<dialog>` elemre. Ezzel fókuszcsapdát, `Esc`-gombos bezárást és egy
`::backdrop` pszeudoelemet kapsz ingyen; a háttér sötétítése ugyanazzal a(z) `--instui-component-mask-background-color`
tokonnal történik, mint a(z) `.instui-mask` esetében (add hozzá a(z) `-blur` osztályt az elhomályosításhoz). Nyisd meg és zárd be invoker parancsokkal — szkript nélkül:

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

**Context view / popover** — helyezd a(z) `.instui-context-view` osztályt egy `[popover]` elemre, és kapcsold a(z)
`popovertarget` segítségével. A top layeren helyezkedik el, és kívülre kattintáskor vagy a(z) `Esc` leütésekor automatikusan bezáródik, szintén szkript nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — helyezd a(z) `.instui-drawer-layout` osztályt egy olyan layout-gyökérre, amelynek gyermekei a(z) `.tray` és a(z) `.content`.
Add hozzá a(z) `open` attribútumot (vagy `-open`), hogy felfedd a tálcát, és használd a(z) `placement="end"`
osztályt (vagy `-placement-end`), hogy az inline-end oldalhoz dokkold — az elhelyezés logikai
`inset-inline-*`/`flex-direction` tulajdonságokon keresztül oldódik meg, így a(z) `dir="rtl"` alatt automatikusan átfordul külön
szabályok nélkül. A fókuszált interakciós csomag Invoker parancs-útválasztást ad hozzá, és átkapcsolja az overlay módot
(`should-overlay-tray`), amikor a szélesség átlépi a(z) `--drawer-layout-min-width` értéket (alapértelmezett
`--instui-breakpoints-sm`, majd `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — A(z) `.instui-mask` az in-flow rátétekhez (például egy kártya feletti spinnerhez) szolgál; a modális ablakok `::backdrop`
eleme a modális esetet fedi le.

Mindkét minta viselkedési egyéni elemként is be van csomagolva a(z) `@pantoken/web-components` csomagban:
`<instui-modal open>` (egy `<dialog>`, amelyet a(z) `open` attribútuma vezérel) és `<instui-context-view>` (egy
natív popover).

Böngészőtámogatás: a popover API és a(z) `popovertarget` Baseline 2024 támogatottságúak; az invoker parancsok
(`command`/`commandfor`) Baseline 2025 besorolásúak, így a régebbi böngészőkben kösd a gombokat a(z) `dialog.showModal()`-hoz
egysoros tartalékként. A popover indítóelem mellé pozicionálása CSS anchor pozicionálást használ, ahol
ez támogatott (Chromium); más böngészőkben a top layer közepére igazodik.

## Forms

**FormField** — A(z) `.instui-form-field` egy CSS-Grid wrapper, amely elrendezi a címkét, a vezérlőt és az esetleges
üzeneteket. Helyezd egy `<label>` elemre, hogy a címke natívan kapcsolódjon a vezérlőjéhez. Három grid
területtel rendelkezik — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

A(z) `-layout-stacked` (alapértelmezett) egymás alá rendezi a területeket; a(z) `-layout-inline` a címkét a vezérlő mellé helyezi (finomhangolás
a(z) `-label-align-{start,end}` és a(z) `-v-align-{top,middle,bottom}` segítségével). A(z) `-readonly` átszínezi a címkét.

A **kötelező mezőt jelző csillag** akkor jelenik meg, ha a mezőt _vagy_ a(z) `-required` osztály, _vagy_ egy benne
lévő natív `required` vezérlő teszi kötelezővé — így elegendő a(z) `required` értéket beállítani az inputon, és a jelölés megjelenik.
Ez pusztán dekoratív (egy `::after` a címkén, az akadálymentességi fán kívül); párosítsd egy olyan megjegyzéssel, mint
„a \*-gal jelölt mezők kitöltése kötelező”, hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — A(z) `.instui-form-field-group` a kapcsolódó mezőket egy `<fieldset>` elembe csoportosítja egy
`<legend>` leírással. Ez tisztán elrendezés (nincsenek dedikált tokenek): az alapértelmezett egymás alá helyezi a mezőket;
a(z) `-layout-columns` / `-layout-inline` reszponzív oszlopokba rendezi őket, a grid finomhangolásához pedig a(z) `-row-spacing-*` /
`-col-spacing-*` és a(z) `-v-align-*` használható.

**RadioInputGroup** — A(z) `.instui-radio-input-group` ugyanaz a(z) `<fieldset>`/`<legend>` csoportosítás,
rádiógombokra specializálva. Mivel a gyermek rádiógombok közös `name` névvel rendelkeznek, a kiválasztás natívan egyválasztásos —
így a kapcsológombok készlete egyetlen vezérlőként viselkedik, nem különálló gombokként. A(z) `-variant-simple` (alapértelmezett)
szabványos rádiógombokat rendez el (a(z) `-layout-columns`/`-inline` egy sorba rendezi őket); a(z) `-variant-toggle` pedig összekapcsolja a
gyermek `.instui-radio.-variant-toggle` gombokat egyetlen szegmentált vezérlővé (összevont szegélyek,
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

**Messages** — A(z) `.instui-form-field-messages` a tároló; minden egyes `.instui-form-field-message` egy
`-type-*` értéket vesz fel: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + egy circle-alert glifa), `-type-success`
(zöld szöveg + egy circle-check glifa), valamint `-type-screenreader-only` (vizuálisan levágva, de továbbra is felolvasva).
A glifák `currentColor` színnel rajzolódnak ki, így mindig illeszkednek az üzenet színéhez. A(z) `-type-new-error` a(z)
`-type-error` elavult álneve. Kösd össze a tárolót a vezérlővel a(z) `aria-describedby` segítségével, és állítsd be
a(z) `aria-invalid` értéket a vezérlőn, ha hiba lép fel.

Egy FormFielden belül az `-type-error` üzenet követi a kliensoldali validációt: rejtve marad mindaddig, amíg a
mező vezérlője nem lesz `:user-invalid` (natív, miután a felhasználó interakcióba lépett vele) — vagy kényszerítheted a(z) `-invalid`
segítségével a(z) `.instui-form-field` elemen (szerveroldali hiba esetén). Egy önálló `.instui-form-field-messages` (amely nincs
mezőben) érintetlen marad. A vezérlő fókuszgyűrűje ennek megfelelően viselkedik: danger stílusú, ha `:user-invalid`/`-invalid`,
és success stílusú `-success` esetén.

**Text controls** — A(z) `.instui-text-input` (natív `<input>`), a(z) `.instui-text-area` (natív `<textarea>`,
átméretezhető) és a(z) `.instui-simple-select` (natív `<select>` kurzornyíllal) egységes megjelenést és azonos
állapotokat osztanak meg: `-invalid` (hibát jelző szegély), `-success` (sikert jelző szegély), `-readonly`, natív `:disabled`, és
`-size-{sm,md,lg}`. Egy kezdő/záró ikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`) csomagold
az inputot a(z) `.instui-input-group` elembe, és adj hozzá egy `.before`/`.after` slotot (egy `-icon-*` glifát); a(z) `-should-not-wrap`
egyetlen sorban tartja. A(z) `.instui-number-input` ezt a homlokzatot egészíti ki egy `.arrows` +/- léptető oszloppal (natív
`type="number"`; kösd a gombokat a(z) `stepUp()`/`stepDown()`-hoz). A(z) `.instui-range-input` egy formázott
`input[type="range"]`, amelynek értéke egy `.instui-range-input-value` inverz buborékban jelenik meg. Egy összetett,
listbox popoverrel rendelkező comboboxhoz válaszd a(z) `@instructure/ui` elemet — ez a könyvtár a natív vezérlőket fedi le.

**Stilizált select legördülő menü (kísérleti)** — egy opcionális `select.css` feljavítja _ugyanezt_ a(z)
`.instui-simple-select` elemet: a CSS Customizable Select modellt használva formázza a megnyitott legördülő menüt (a panelt és az egyes opciókat a hover és
selected állapotokkal együtt).

> [!WARNING]
> A(z) `select.css` a(z) `appearance: base-select` / `::picker(select)` funkcióra támaszkodik, amely **kísérleti**
> (Chrome 135+, még nem Baseline). Külön, opcionális stíluslapként kerül szállításra, és minden szabály
> a(z) `@supports (appearance: base-select)` mögé van zárva, így a nem támogatott böngészőkben nem csinál semmit — a(z)
> `.instui-simple-select` vezérlő egyszerű natív select marad. Csak akkor töltsd be, ha szeretnéd a
> továbbfejlesztett legördülő menüt, és elfogadod a korlátozott támogatottságot.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
