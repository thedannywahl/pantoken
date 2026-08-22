# Komponensek

A `@pantoken/components` az Instructure tokenekből felépített, osztályalapú komponensstílusokat biztosít. Importáld
a stíluslapot, és jelöld meg a markupodat — nincs szükség keretrendszerre.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Jobban kedveled az egyéni elemeket? A `@pantoken/web-components` ugyanezeket a stílusokat csomagolja be mint `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és továbbiak — lásd a
> [csomagtérképet](/guide/packages).

## Konvenciók

A csomagban található CSS-konvenciók az [RSCSS](https://ricostacruz.com/rscss/index.html) módosított változatán alapulnak.

A módosítók **kulcs-érték** formátumúak — `-<prop>-<val>`, az InstUI propok neveihez igazítva —, így önmagukért
beszélnek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A logikai propok csupán a prop
nevéből állnak, ahol a jelenlétük `true` értéket jelent (`-has-shadow`, `-clickable`); egy alapértelmezetten bekapcsolt, majd kikapcsolt logikai prop
invertálódik (`-without-background`, `-without-border`). A méretek rövid és hosszú írásmódot is elfogadnak
(`-size-sm` = `-size-small`). Ahol egy név eltér az InstUI-tól, az InstUI-szemantikájú osztály továbbra is működik,
de elavult (pl. `-variant-info` → használd: `-color-info`).

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

Az InstUI `timeout` propjához állítsd be a mértékegység nélküli `--timeout` egyéni tulajdonságot ezredmásodpercben, és töltsd be
az Alert interakciót. Egy pozitív érték ütemezi az eltüntetést; a `0` (az alapértelmezett) a helyén
hagyja a figyelmeztetést. Add hozzá a `transition` segédosztály `instui-transition -fade-entered` osztályait az InstUI áttűnéséhez; hagyd
el őket az azonnali eltávolításhoz. Az interakció vezérli a `-fade-exiting` állapotot, és egy megszakítható,
buborékoló `dismiss` eseményt vált ki az eltávolítás előtt, így az alkalmazás meghívhatja a `preventDefault()` metódust a
figyelmeztetés csatolva tartásához.

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

A folyamatjelző sávok tetszőleges skálákat fogadnak a `--min` (alapértelmezetten `0`), `--value` és `--max`
(alapértelmezetten `100`) tulajdonságokon keresztül, elavult `--value-now` és `--value-max` álnevekkel. Add hozzá a `-should-animate` osztályt
az InstUI fél másodperces átmenetének alkalmazásához minden értékváltozáskor. A `.value` a `.bar` mellett helyezkedik el mint
a gyökérelem gyermeke; add hozzá a `-render-value-inside` osztályt, hogy ehelyett a sáv fölött, annak elejéhez igazítva jelenjen meg
(stílusozd úgy, hogy jól olvasható legyen a mérősáv színe felett). Használj natív `<progress>` elemet
nullabázisú tartomány esetén, és `<meter>` elemet, ha a minimum nem nulla; a webes komponensek a `min`
attribútumuk alapján automatikusan választanak közülük. Az InstUI nem rendelkezik határozatlan állapottal, így a `value`
attribútum nélküli `<progress>` egy pantoken-specifikus legjobb becslés: a `progress-bar` a `.bar` elemet
csúszó szegmensként animálja, a `progress-circle` pedig fix ívben forgatja a gyűrűjét, mindkettő elrejtve a `.value` elemet.

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

A folyamatjelző körök ugyanazokat a tetszőleges skálákat fogadják a `--min`, `--value` és `--max` által.
A `--value-now` és a `--value-max` elavult funkcionális álnévként maradnak meg. Add hozzá a `-should-animate` osztályt, és
töltsd be a fókuszált interakciós csomagot az InstUI csatolási animációjának reprodukálásához; a `--animation-delay` egy
mértékegység nélküli ezredmásodperces késleltetés. Az elavult `-should-animate-on-mount` és
`-shold-animate-on-mount` írásmódok funkcionális álnévként működnek tovább.

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

Alapértelmezés szerint minden osztály a `instui-` névtérrel rendelkezik. Készíts stíluslapot a saját előtagoddal — vagy előtag nélkül — úgy, hogy
átadod a `prefix` értéket bármelyik buildernek. Bármilyen falsy érték (`null`, `undefined`, `""`, vagy annak elhagyása) teljesen
eltávolítja az előtagot, így a `class="instui-heading -level-h1"` helyett a `class="heading -level-h1"` formát írhatod:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjeles előtagú módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok maradnak. A
csomag által biztosított stíluslapok megtartják a `instui` előtagot.

## Base

A `base.css` egy opcionálisan használható reset, amely a tokenekből állítja be a globális dokumentum-alapértelmezéseket: `box-sizing`, egy
`body` reset, az oldal felülete, az alapvető szövegszín és betűtípus, a `color-scheme` (így a `light-dark()` tokenek
és a natív vezérlők követik a témát), valamint egy alap hivatkozás. Töltsd be egyszer, a komponens- és a próza-
stíluslapok előtt, amikor a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd ki, ha a komponenseket egy olyan gazdakörnyezetbe ágyazod be, amely már beállítja a saját `html` és `body` témáját —
a reset megfesti az oldal felületét, így nem érdemes a gazdakörnyezettel ütköztetni. Minden, amit beállít,
alacsony specificitású `:where()` szelektorokat használ, így a saját szabályaid mindig érvényesülnek.

A `base.css` _alkalmazza_ a márka betűtípusát (`font-family: var(--instui-font-family-base)`, rendszer
tartalékokkal); a _betöltéséhez_ importáld az opcionális `fonts.css` fájlt — `@font-face` szabályok az Atkinson Hyperlegible
Next-hez, amelyek a csomagban szállított woff2 fájlokra mutatnak. Ez azért van külön, mert a betűkészletek mérete ~350 kB, és a
betűtípusok saját hosztolása tudatos döntés.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó-tartalom

<p>There's a hidden message after this sentence.<span class="instui-screen-reader-content">Only screen readers announce this.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A `.instui-screen-reader-content` vizuálisan elrejti az elemet, miközben az akadálymentességi fában
megtartja azt — olyan címkékhez és állapotszövegekhez, amelyeket a kisegítő technológiáknak fel kell olvasniuk, de a dizájnban nem kell megjelenniük.

## Segédosztályok

A `utilities.css` egy opcionális réteg átívelő osztályokkal: egy `View` primitív, térközök a tokenek
skáláján, valamint szemantikus színfelülbírálások. A komponens `-modifier` osztályaival ellentétben ezek **dupla
kötőjelet** (`--mod`) használnak, így sosem ütköznek a komponens saját módosítóneveivel, és bármely
elemre alkalmazhatók — önállóan vagy komponensre ráépítve.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue surface with on-color text.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centered with mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — A `.instui-view` az InstUI `View` megfelelője. Ez az alap, amelyre a térközöket és színeket rétegezheted, és
kulcs-érték módosítókat hordoz a saját vizuális propjaihoz, így nem szükséges segédosztályokhoz nyúlnod:
`-background-*` (annak felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, és `-cursor-*` — ezek a `view` saját,
egyszeres kötőjeles módosítói, függetlenül az alábbi dupla kötőjeles segédosztályoktól. A szabad értékű propok
(width/height/inset) inline stílusként maradnak meg; a `margin`/`padding` a térköz segédosztályokat használja.

**Térközök** — oldalankénti osztályok a térközskálán. Értelmezésük: `{m|p}{side}-{step}`: `m` a
marginhoz vagy `p` a paddinghez (vagy a teljes `margin`/`padding` szavak), egy opcionális logikai oldal, majd egy
lépés. Így a `.--m-lg` és a `.--margin-lg` megegyezik, akárcsak a `.--pt-md` és a `.--paddingt-md`.

- Oldalak: nincs (összes), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  tengely). A logikai oldalak jobbról balra olvasott elrendezésekben is helyesek maradnak.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, valamint `auto` csak a marginhoz.

Kombináld őket az InstUI `margin="small auto large"` rövidítéséhez:
`class="--mt-sm --mx-auto --mb-lg"`.

**Szín** — szemantikus felülbírálások, amelyek a palettán belül maradnak: `.--bg-<name>` (háttér),
`.--text-<name>` (szövegszín) és `.--border-<name>` (szegélyszín). Minden egyes `<name>` egy
szemantikus színtoken — a szándékok (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plusz a `accent-*` paletta (`accent-blue`, `accent-green`, stb.).
Egy név csak akkor érhető el, ha a token létezik az adott családban, így a `text-brand` nem osztály — a szöveghez
nem tartozik brand token. Nincs mód primitív érték vagy tetszőleges hexadecimális szín elérésére, és minden felülbírálás követi
a témát.

**Tokencsaládok** — minden „egy token, egy tulajdonság” család kap tokenenként egy osztályt, amelyet a
tokenről neveztek el. Kombináld őket szabadon:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak a saját egyetlen tulajdonságát állítja be, így a `border-width`/`border-radius` egy `border-*` színt és egy szegélystílust
igényel a szegély tényleges kirajzolásához. Ezek a teljes tokennevet használják (`.--border-radius-md`), míg a
fenti szín- és térközsegédek rövid álneveket (`.--bg-brand`, `.--mt-lg`) alkalmaznak — az álnevek
ergonómiai rövidítések; a tokenosztályok szó szerintiek és kimerítőek.

**Elrendezés** — A `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és a `.--text-align-<value>` (`start`, `center`, `end`, `justify`) lefedik az InstUI
átívelő `display` és `textAlign` propjait (View, Button, Metric, Tabs, …) kombinálható osztályokként —
így ezek nem komponensenkénti módosítók.

Minden dupla kötőjeles osztály determinisztikusan felülírja a kaszkádban az azonos nevű egyszeres kötőjeles komponensmódosítót,
függetlenül a stíluslapok importálási sorrendjétől — a működési mechanizmusért lásd a [Szerzői konvenciókat](/conventions/authoring).

Minden itt található elem tiszta CSS, amelyet a `--instui-*` tokenek vezérelnek, így a tokenrétegen
keresztül követi az InstUI-t. Lásd az [API-referenciát](/api/) a `componentsCss` és a komponensenkénti builderek tekintetében.

## Rátétek: dialog és popover

Az overlay komponensek natív platformprimitívekre épülnek, így minimális JavaScripttel vagy anélkül is akadálymentesen viselkednek.

**Modális ablak** — helyezd a `.instui-modal` osztályt egy natív `<dialog>` elemre. Ez fókuszcsapdát, `Esc`-bezárást és egy
`::backdrop` elemet biztosít ingyen; a háttér ugyanazzal az `--instui-component-mask-background-color`
tokennel sötétül, mint a `.instui-mask` esetében (add hozzá a `-blur` osztályt a matt hatáshoz). Nyisd meg és zárd be invoker parancsokkal — szkript nélkül:

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

**Kontextusnézet / popover** — helyezd a `.instui-context-view` osztályt egy `[popover]` elemre, és kapcsold a
`popovertarget` attribútummal. A felső rétegre kerül, és külső kattintásra vagy a(z) `Esc` gombra automatikusan bezáródik, szintén szkript nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Fiókos elrendezés** — helyezd a `.instui-drawer-layout` osztályt egy elrendezési gyökérelemre, amely `.tray` és `.content`
gyermekekkel rendelkezik. Add hozzá a `open` attribútumot (vagy `-open`), hogy megjelenítsd a tálcát, és használd a `placement="end"`
(vagy `-placement-end`) osztályt az inline-end oldalra dokkoláshoz — az elhelyezés a logikai
`inset-inline-*`/`flex-direction` tulajdonságokon keresztül oldódik meg, így automatikusan átfordul `dir="rtl"` alatt, külön
szabályok nélkül. A fókuszált interakciós csomag hozzáadja az Invoker parancsok útválasztását, és átkapcsolja az overlay módot
(`should-overlay-tray`), amikor a szélesség átlépi a `--drawer-layout-min-width` értéket (alapértelmezetten
`--instui-breakpoints-sm`, majd `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Maszk** — A `.instui-mask` a flow-ban lévő átfedésekhez (pl. egy spinner egy kártya felett) marad meg; a modális ablak `::backdrop`
eleme lefedi a modális esetet.

Mindkét minta viselkedési egyéni elemként is be van csomagolva a `@pantoken/web-components` csomagban:
`<instui-modal open>` (egy `<dialog>`, amelyet a `open` attribútuma vezérel) és `<instui-context-view>` (egy
natív popover).

Böngészőtámogatás: a popover API és a `popovertarget` a Baseline 2024 része; az invoker parancsok
(`command`/`commandfor`) a Baseline 2025 részei, így régebbi böngészőkön kösd a gombokat a `dialog.showModal()` híváshoz
egysoros tartalékként. A popover trigger mellé pozicionálása CSS anchor positioninget használ, ahol
támogatott (Chromium); máshol a felső réteg közepére kerül.

## Űrlapok

**FormField** — A `.instui-form-field` egy CSS-Grid wrapper, amely elrendezi a címkét, a vezérlőt és az esetleges
üzeneteket. Helyezd egy `<label>` elemre, így a címke natívan kapcsolódik a vezérlőjéhez. Három grid
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

A `-layout-stacked` (alapértelmezett) egymásra helyezi a területeket; a `-layout-inline` a vezérlő mellé helyezi a címkét (finomhangolás:
`-label-align-{start,end}` és `-v-align-{top,middle,bottom}`). A `-readonly` átszínezi a címkét.

A **kötelező mezőt jelző csillag** akkor jelenik meg, ha a mező kötelező _vagy_ a `-required` osztály, _vagy_ a
benne lévő natív `required` vezérlő alapján — így elég beállítani a `required` attribútumot az inputon, és a jelölés megjelenik.
Ez dekoratív (egy `::after` a címkén, az akadálymentességi fán kívül); társíts hozzá egy megjegyzést, mint
„a \*-gal jelölt mezők kitöltése kötelező”, hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — A `.instui-form-field-group` összetartozó mezőket csoportosít egy `<fieldset>` elemben egy
`<legend>` leírással. Ez tiszta layout (nincsenek dedikált tokenek): alapértelmezés szerint egymás alá helyezi a mezőket;
a `-layout-columns` / `-layout-inline` reszponzív oszlopokba rendezi őket, a `-row-spacing-*` /
`-col-spacing-*` és `-v-align-*` segítségével finomhangolva a rácsot.

**RadioInputGroup** — A `.instui-radio-input-group` ugyanez a `<fieldset>`/`<legend>` csoportosítás,
rádiógombokra specializálva. Mivel a gyermek rádiógombok közös `name` attribútummal rendelkeznek, a kiválasztás natívan egyválasztós —
így a kapcsológombok csoportja egyetlen vezérlőként viselkedik, nem különálló gombokként. A `-variant-simple` (alapértelmezett) standard
rádiógombokat rendez el (a `-layout-columns`/`-inline` egy sorba rendezi őket); a `-variant-toggle` összekapcsolja a
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

**Üzenetek** — A `.instui-form-field-messages` a tároló; mindegyik `.instui-form-field-message` egy
`-type-*` értéket vesz fel: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + egy circle-alert glifa), `-type-success`
(zöld szöveg + egy circle-check glifa) és `-type-screenreader-only` (vizuálisan levágva, de továbbra is bemondva).
A glifák a `currentColor` színével jelennek meg, így mindig illeszkednek az üzenet színéhez. A `-type-new-error` a
`-type-error` elavult alternatívája. Kapcsold a tárolót a vezérlőhöz a `aria-describedby` attribútummal, és állíts be
`aria-invalid` értéket a vezérlőn, ha hiba van.

Egy FormFielden belül a(z) `-type-error` üzenet követi a kliensoldali validációt: rejtve marad, amíg a
mező vezérlője nem lesz `:user-invalid` (natív, miután a felhasználó interakcióba lépett vele) — vagy kényszerítheted a `-invalid`
használatával a `.instui-form-field` elemen (szerveroldali hiba esetén). Egy önálló `.instui-form-field-messages` (nem mezőben)
nem érintett. A vezérlő fókuszgyűrűje követi a mintát: danger, ha `:user-invalid`/`-invalid`,
success a `-success` esetén.

**Szöveges vezérlők** — A `.instui-text-input` (natív `<input>`), a `.instui-text-area` (natív `<textarea>`,
átméretezhető) és a `.instui-simple-select` (natív `<select>` kurzorral) közös megjelenésűek és ugyanazokkal az
állapotokkal rendelkeznek: `-invalid` (hibaszegély), `-success` (sikerszegély), `-readonly`, natív `:disabled` és
`-size-{sm,md,lg}`. Kezdő/záró ikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`) csomagold
az inputot a `.instui-input-group` osztályba, és adj hozzá egy `.before`/`.after` slotot (egy `-icon-*` glifát); a `-should-not-wrap`
egy sorban tartja azt. A `.instui-number-input` ugyanez a felület egy `.arrows` +/- léptetőoszloppal (natív
`type="number"`; kösd a gombokat a `stepUp()`/`stepDown()` hívásokhoz). A `.instui-range-input` egy stílusozott
`input[type="range"]`, amelynek értéke egy `.instui-range-input-value` inverz buborékban jelenik meg. Összetett
comboboxhoz listbox popoverrel nyúlj a `@instructure/ui` csomaghoz — ez a könyvtár a natív vezérlőket fedi le.

**Stílusozott select legördülő (kísérleti)** — egy opcionális `select.css` feljavítja _ugyanezt a_
`.instui-simple-select` elemet: megformázza a megnyitott legördülő menüt (a panelt és az egyes opciókat, hover és
kijelölt állapotokkal) a CSS Customizable Select modellt használva.

> [!WARNING]
> A `select.css` a `appearance: base-select` / `::picker(select)` megoldásra támaszkodik, amely **kísérleti**
> (Chrome 135+, még nem Baseline). Külön opcionális stíluslapként kerül kiadásra, és minden szabály
> a `@supports (appearance: base-select)` mögé van zárva, így semmit sem csinál a nem támogatott böngészőkben — a
> `.instui-simple-select` vezérlő sima natív select marad. Csak akkor töltsd be, ha szeretnéd a
> továbbfejlesztett legördülő menüt, és elfogadod a korlátozott támogatást.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
