# Komponensek

A(z) `@pantoken/components` az Instructure tokenekből felépített osztályalapú komponensstílusokat biztosít. Importáld
a stíluslapot és lásd el címkékkel a markupot — keretrendszer nem szükséges.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Egyéni elemeket (custom elements) részesítesz előnyben? A(z) `@pantoken/web-components` ugyanezeket a stílusokat csomagolja be mint `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és továbbiak — lásd a
> [csomagtérképet](/guide/packages).

## Konvenciók

A csomagban található CSS-konvenciók az [RSCSS](https://ricostacruz.com/rscss/index.html) módosított változatán alapulnak.

A módosítók **kulcs-érték** (key-value) alapúak — `-<prop>-<val>`, az InstUI prop-nevekhez igazítva —, így önmagukért
beszélnek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A logikai (boolean) propok önmagukban álló prop-
nevek, ahol a jelenlétük `true` értéket jelent (`-has-shadow`, `-clickable`); az alapértelmezetten bekapcsolt, kikapcsolt logikai prop
invertálódik (`-without-background`, `-without-border`). A méretek rövid és hosszú írásmódot is elfogadnak
(`-size-sm` = `-size-small`). Ahol egy név eltér az InstUI-tól, az InstUI-szemantikus osztály továbbra is működik,
de elavult (pl. `-variant-info` → használd: `-color-info`).

### Példa

Instructure UI React-komponens:

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
az Alert interakciót. A pozitív érték ütemezi az eltüntetést; a `0` (az alapértelmezett) a helyén hagyja az értesítést.
Add hozzá az áttűnési (transition) plugin `instui-transition -fade-entered` osztályait az InstUI áttűnéséhez (fade); hagyd el
őket az azonnali eltávolításhoz. Az interakció vezérli a plugin `-fade-exiting` állapotát, és egy
megszakítható, buborékoló `dismiss` eseményt vált ki az eltávolítás előtt, így az alkalmazás meghívhatja a `preventDefault()`-t,
hogy az alert csatolva maradjon.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/plugin-transition/dist/transition.css"
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

A folyamatjelző sávok (progress bars) tetszőleges skálákat fogadnak el a `--min` (alapértelmezetten `0`), `--value` és `--max`
segítségével (alapértelmezetten `100`), az elavult `--value-now` és `--value-max` álnevekkel. Add hozzá a `-should-animate`-t,
hogy alkalmazd az InstUI fél másodperces átmenetét egy érték változásakor. A `.value` a `.bar` mellett helyezkedik el a gyökérelem
gyermekeként; add hozzá a `-render-value-inside`-t, hogy helyette a sáv fölött, annak elejéhez igazítva jelenjen meg
(stilizáld az olvashatóság érdekében a mérősáv színéhez képest). Használj natív `<progress>` elemet nulla alapú
tartományhoz, és `<meter>`-t, ha a minimum nem nulla; a webes komponensek automatikusan választanak közülük
a `min` attribútumuk alapján. Az InstUI nem rendelkezik határozatlan (indeterminate) állapottal, így egy `<progress>`,
amelyből hiányzik a `value` attribútum, egy pantoken-specifikus legjobb közelítés: a `progress-bar` csúszó szegmensként animálja a `.bar`-t,
a `progress-circle` pedig rögzített ívben forgatja a gyűrűjét, mindkettő elrejtve a `.value`-t.

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

A folyamatjelző körök (progress circles) ugyanezeket a tetszőleges skálákat fogadják el a `--min`, `--value` és `--max` révén.
A `--value-now` és a `--value-max` elavult funkcionális álnévként megmaradnak. Add hozzá a `-should-animate`-t, és
töltsd be a fókuszált interakciós csomagot az InstUI mount-animációjának reprodukálásához; a `--animation-delay` egy
mértékegység nélküli milliszekundumos késleltetés. Az elavult `-should-animate-on-mount` és
`-shold-animate-on-mount` írásmódok funkcionális álnévként megmaradnak.

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

Alapértelmezés szerint minden osztály a `instui-` névtérrel van ellátva. Készíts stíluslapot a saját előtagoddal — vagy előtag nélkül — úgy, hogy
átadod a `prefix` értéket bármely buildernek. Bármilyen hamis (falsy) érték (`null`, `undefined`, `""`, vagy az elhagyása) teljesen elhagyja az
előtagot, így a `class="instui-heading -level-h1"` helyett `class="heading -level-h1"`-t írhatsz:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjellel előtagolt módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok maradnak. A
csomag által szállított stíluslapok megtartják a `instui` előtagot.

## Base

A `base.css` egy opcionális (opt-in) reset, amely a tokenek alapján állítja be a globális dokumentum alapértelmezéseit: `box-sizing`, egy
`body` reset, az oldal felülete, az alap szövegszín és betűtípus, a `color-scheme` (hogy a `light-dark()` tokenek
és a natív vezérlők kövessék a témát), valamint egy alaphivatkozás (base link). Töltsd be egyszer, a komponens- és prózai
stíluslapok előtt, amikor a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd el, ha a komponenseket olyan gazdakörnyezetbe (host) ágyazod be, amely már saját stílust ad a `html` és `body` elemeknek —
a reset megfesti az oldal felületét, így nem cél, hogy ütközzön a hosttal. Minden, amit beállít,
alacsony specificitású `:where()` szelektorokat használ, így a saját szabályaid mindig érvényesülnek.

A `base.css` _alkalmazza_ a márka betűtípusát (`font-family: var(--instui-font-family-base)`, rendszer-
tartalékokkal); a _betöltéséhez_ importáld az opcionális `fonts.css`-t — `@font-face` szabályok az Atkinson Hyperlegible
Nexthez, amelyek a csomagban található woff2 fájlokra mutatnak. Ez külön van választva, mivel a betűkészletek mérete ~350 kB, és
a betűtípusok saját üzemeltetése tudatos döntés.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó-tartalom

<p>A mondat után van egy rejtett üzenet.<span class="instui-screen-reader-content">Ezt csak a képernyőolvasók olvassák fel.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A `.instui-screen-reader-content` vizuálisan elrejti az elemet, miközben megtartja azt a hozzáférhetőségi fában (accessibility tree)
— olyan címkékhez és állapotszövegekhez, amelyeket a kisegítő technológiáknak fel kell olvasniuk, de a dizájn nem jeleníti meg őket.

## Segédosztályok

A `utilities.css` egy opcionális réteg átfogó (cross-cutting) osztályokkal: egy `View` primitív, térközök a token-
skálán és szemantikus színfelülírások. A komponens `-modifier` osztályaitól eltérően ezek bármely
elemre érvényesek, így komponensekre vagy csupasz HTML-elemekre is felépíthetők.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md instui-mb-sm" style="border-radius: 6px;">
  <span class="instui-text instui-fg-on-color">Accent-blue felület on-color szöveggel.</span>
</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Középre igazítva mx-auto segítségével.</span>
</div>

```html
<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md">…</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto">…</div>
```

**View** — A `.instui-view` az InstUI `View` megfelelője. Ez az alap, amelyre a térközöket és a színeket rétegezheted, és
kulcs-érték módosítókat hordoz a saját vizuális propjaihoz, így nem kell segédosztályokhoz nyúlnod:
`-background-*` (a felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` és `-cursor-*`. A szabad értékű propok
(width/height/inset) inline stílusok maradnak; a `margin`/`padding` a térköz segédosztályokat használja.

**Térköz (Spacing)** — oldalankénti osztályok a térközskálán. Értelmezésük a következő formátum szerint történik: `{m|p}{side}-{step}`: `m` a
margóhoz (margin) vagy `p` a belső margóhoz (padding) (vagy a teljes szavak: `margin`/`padding`), egy opcionális logikai oldal, majd egy
lépésköz (step). Így a `.instui-m-lg` és a `.instui-margin-lg` megegyezik, ahogy a `.instui-pt-md` és
a `.instui-paddingt-md` is.

- Oldalak: nincs (mindegyik), `t`/`b` (blokk kezdete/vége), `s`/`e` (inline kezdete/vége), `x`/`y` (inline/blokk
  tengely). A logikai oldalak jobbról balra (RTL) tartó elrendezésekben is helyesek maradnak.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plusz a `auto` kizárólag a margóhoz.

Kombináld őket az InstUI `margin="small auto large"` rövidítéséhez:
`class="instui-mt-sm instui-mx-auto instui-mb-lg"`.

**Szín (Color)** — szemantikus felülírások, amelyek a palettán belül maradnak: `.instui-bg-<name>` (háttér),
`.instui-fg-<name>` (szövegszín) és `.instui-border-<name>` (szegélyszín). Minden egyes `<name>` egy
szemantikus színtoken — a szándékok (intents) (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plusz a(z) `accent-*` paletta (`accent-blue`, `accent-green` stb.). Egy
név csak akkor létezik, ha a token megtalálható az adott családban, így a `fg-brand` nem egy osztály — a szövegnek
nincs brand tokenje. Nem lehet közvetlenül primitívet vagy tetszőleges hexadecimális értéket elérni, és minden felülírás követi
a témát.

**Tokencsaládok** — minden „egy token, egy tulajdonság” család kap egy osztályt tokenenként, a tokenről
elnevezve. Kombináld őket szabadon:

- `.instui-font-family-heading`, `.instui-font-family-code`, … → `font-family`
- `.instui-font-weight-body-strong`, `.instui-font-weight-interactive`, … → `font-weight`
- `.instui-line-height-*` → `line-height`
- `.instui-border-radius-md`, `.instui-border-radius-full`, … → `border-radius`
- `.instui-border-width-sm`/`-md`/`-lg` → `border-width`
- `.instui-opacity-base`, `.instui-opacity-disabled` → `opacity`
- `.instui-elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak az egyetlen tulajdonságát állítja be, így a `border-width`/`border-radius` igényel egy `border-*` színt és egy szegély-
stílust a tényleges szegély megrajzolásához. Ezek a teljes tokennevet használják (`.instui-border-radius-md`), míg a
fenti szín- és térközsegítők rövid álneveket (`.instui-bg-brand`, `.instui-mt-lg`) — az álnevek
ergonómiai rövidítések; a tokenosztályok szó szerintiek és teljes körűek.

**Elrendezés (Layout)** — A `.instui-display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és a `.instui-text-align-<value>` (`start`, `center`, `end`, `justify`) lefedik az InstUI átfogó
`display` és `textAlign` propjait (View, Button, Metric, Tabs, …) kombinálható osztályokként —
így ezek nem komponensenkénti módosítók.

Minden itt található elem tiszta CSS, amelyet a `--instui-*` tokenek vezérelnek, így a tokenrétegen
keresztül követi az InstUI-t. Lásd az [API-referenciát](/api/) a `componentsCss`-hoz és a komponensenkénti builderekhez.

## Átfedések: dialog és popover

Az átfedő komponensek a natív platform primitívekre épülnek, így kevés vagy semmilyen
JavaScript nélkül is akadálymentesen működnek.

**Modális ablak (Modal)** — helyezd a `.instui-modal`-t egy natív `<dialog>` elemre. Ezzel fókuszcsapdát (focus trapping), `Esc`-gombos bezárást és egy
`::backdrop`-t kapsz ingyen; a háttér ugyanazzal a `--instui-component-mask-background-color`
tokkennel sötétedik, mint a `.instui-mask` (add hozzá a `-blur`-t a matt hatáshoz). Nyisd meg és zárd be invoker parancsokkal — szkript nélkül:

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

**Kontextus nézet / popover** — helyezd a `.instui-context-view`-t egy `[popover]` elemre, és kapcsold a
`popovertarget` segítségével. A felső rétegre (top layer) kerül, és külső kattintásra vagy `Esc`-ra automatikusan bezáródik (light-dismiss), szintén szkript nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Maszk (Mask)** — A `.instui-mask` a folyamatban lévő (in-flow) átfedésekhez marad (pl. egy spinner egy kártya felett); a modális ablak `::backdrop`
eleme lefedi a modális esetet.

Mindkét minta viselkedési egyéni elemként (behavioral custom elements) is be van csomagolva a `@pantoken/web-components` csomagban:
`<instui-modal open>` (egy `<dialog>`, amelyet a `open` attribútuma vezérel) és `<instui-context-view>` (egy
natív popover).

Böngészőtámogatás: a popover API és a `popovertarget` Baseline 2024-kompatibilisek; az invoker parancsok
(`command`/`commandfor`) Baseline 2025-kompatibilisek, így a régebbi böngészőkben kösd a gombokat a `dialog.showModal()`-hoz
egysoros tartalékként (fallback). A popover elhelyezése az indítója (trigger) mellett CSS anchor positioninget használ, ahol
támogatott (Chromium); máshol a felső réteg (top layer) közepére igazodik.

## Űrlapok

**FormField** — A `.instui-form-field` egy CSS-Grid wrapper, amely elrendezi a címkét (label), a vezérlőt (control) és az esetleges
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

A `-layout-stacked` (alapértelmezett) egymásra helyezi a területeket; a `-layout-inline` a vezérlő mellé teszi a címkét (finomhangolható
a `-label-align-{start,end}` és `-v-align-{top,middle,bottom}` segítségével). A `-readonly` átfesti a címkét.

A **kötelező mezőt jelző csillag** akkor jelenik meg, ha a mező kötelező _vagy_ a `-required` osztály, _vagy_ a
benne lévő natív `required` vezérlő miatt — így elegendő a `required` értéket beállítani a beviteli mezőn, és a jelzés megjelenik.
Ez dekoratív (egy `::after` a címkén, a hozzáférhetőségi fán kívül); társítsd egy olyan megjegyzéssel, mint
a „a \*-gal jelölt mezők kitöltése kötelező”, hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — A `.instui-form-field-group` a kapcsolódó mezőket egy `<fieldset>` elemben csoportosítja egy
`<legend>` leírással. Ez tiszta elrendezés (nincsenek dedikált tokenek): alapértelmezés szerint egymásra helyezi a mezőket;
a `-layout-columns` / `-layout-inline` reszponzív oszlopokba rendezi őket, a grid finomhangolásához pedig a `-row-spacing-*` /
`-col-spacing-*` és a `-v-align-*` használható.

**RadioInputGroup** — A `.instui-radio-input-group` ugyanez a `<fieldset>`/`<legend>` csoportosítás,
rádiógombokra specializálva. Mivel a gyermek rádiógombok közös `name` attribútummal rendelkeznek, a kiválasztás natívan egyetlen választásra korlátozódik —
így a kapcsológombok egyetlen vezérlőként viselkednek, nem különálló gombokként. A `-variant-simple` (alapértelmezett) standard
rádiógombokat rendez el (a `-layout-columns`/`-inline` egy sorba folyatja őket); a `-variant-toggle` összeköti a
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

**Üzenetek (Messages)** — A `.instui-form-field-messages` a konténer; minden egyes `.instui-form-field-message` egy
`-type-*` értéket vesz fel: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + egy circle-alert ikon), `-type-success`
(zöld szöveg + egy circle-check ikon) és `-type-screenreader-only` (vizuálisan levágva, továbbra is felolvasva).
Az ikonok `currentColor` színnel jelennek meg, így mindig illeszkednek az üzenet színéhez. A `-type-new-error` egy
elavult alias a `-type-error`-re. Kösd össze a konténert a vezérlővel a `aria-describedby` segítségével, és állítsd be
a `aria-invalid`-t a vezérlőn, ha hiba lép fel.

A FormField belsejében egy `-type-error` üzenet követi az ügyféloldali validációt: rejtve marad, amíg a
mező vezérlője nem lesz `:user-invalid` (natív, miután a felhasználó interakcióba lépett vele) — vagy kényszerítheted a `-invalid` használatával
a `.instui-form-field` elemen (szerveroldali hiba esetén). Egy önálló `.instui-form-field-messages` (amely nem mezőben
található) érintetlen marad. A vezérlő fókuszgyűrűje (focus ring) szintén ehhez igazodik: danger `:user-invalid`/`-invalid` esetén,
success a `-success` esetén.

**Szöveges vezérlők (Text controls)** — A `.instui-text-input` (natív `<input>`), a `.instui-text-area` (natív `<textarea>`,
átméretezhető) és a `.instui-simple-select` (natív `<select>` kurzorral/nyíllal) azonos megjelenést és ugyanazokat az
állapotokat osztják meg: `-invalid` (hibaszegély), `-success` (sikerszegély), `-readonly`, natív `:disabled` és
`-size-{sm,md,lg}`. Vezető/záró ikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`) csomagold
a beviteli mezőt a `.instui-input-group`-ba, és adj hozzá egy `.before`/`.after` slotot (egy `-icon-*` ikont); a `-should-not-wrap`
egyetlen sorban tartja azt. A `.instui-number-input` ugyanez a homlokzat kiegészítve egy `.arrows` +/- léptetőoszloppal (natív
`type="number"`; kösd a gombokat a `stepUp()`/`stepDown()`-hez). A `.instui-range-input` egy stilizált
`input[type="range"]`, amelynek értéke egy `.instui-range-input-value` inverz buborékban jelenik meg. Gazdag funkcionalitású,
listbox popoverrel rendelkező combobox esetén használd a `@instructure/ui`-ot — ez a könyvtár a natív vezérlőket fedi le.

**Stilizált select legördülő (kísérleti)** — egy opcionális (opt-in) `select.css` feljavítja _ugyanezt_
a `.instui-simple-select` elemet: stilizálja a megnyitott legördülőt (a panelt és az egyes opciókat, hover és
kijelölt állapotokkal) a CSS Customizable Select modellt használva.

> [!WARNING]
> A `select.css` a `appearance: base-select` / `::picker(select)` tulajdonságra épül, amely **kísérleti**
> (Chrome 135+, még nem Baseline). Különálló, opcionális stíluslapként érhető el, és minden szabály a
> `@supports (appearance: base-select)` mögé van zárva, így a nem támogatott böngészőkben semmit sem csinál — a
> `.instui-simple-select` vezérlő egyszerű natív select marad. Csak akkor töltsd be, ha szeretnéd a
> továbbfejlesztett legördülőt, és elfogadod a korlátozott támogatást.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
