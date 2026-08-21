# Komponensek

A(z) `@pantoken/components` az Instructure tokenekből felépített, osztályalapú komponensstílusokat biztosít. Importáld
a stíluslapot, és lásd el címkékkel a markupodat — keretrendszer nem szükséges.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Inkább az egyéni elemeket (custom elements) részesíted előnyben? A(z) `@pantoken/web-components` ugyanezeket a stílusokat csomagolja a következőkként: `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és továbbiak — lásd a
> [csomagtérképet](/guide/packages).

## Konvenciók

A csomagban található CSS-konvenciók az [RSCSS](https://ricostacruz.com/rscss/index.html) módosított változatán alapulnak.

A módosítók **kulcs-érték** (key-value) formátumúak — `-<prop>-<val>`, az InstUI prop nevekhez igazítva —, így magukért
beszélnek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A logikai (boolean) propok csupán magát a prop
nevét jelentik, ahol a jelenlétük `true` értéket jelent (`-has-shadow`, `-clickable`); az alapértelmezetten bekapcsolt, majd kikapcsolt logikai prop
invertálódik (`-without-background`, `-without-border`). A méretek a rövid és a hosszú írásmódot is elfogadják
(`-size-sm` = `-size-small`). Ahol egy név eltér az InstUI-tól, az InstUI-szemantikus osztály továbbra is működik,
de elavult (deprecated) (pl. `-variant-info` → használd: `-color-info`).

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

Az InstUI `timeout` propjához állítsd be a mértékegység nélküli `--timeout` egyéni tulajdonságot (custom property) ezredmásodpercben, és töltsd be
az Alert interakciót. Egy pozitív érték ütemezi az eltüntetést; a `0` (az alapértelmezett) a helyén hagyja az
alertet. Add hozzá a(z) `transition` segédosztály (utility) `instui-transition -fade-entered` osztályait az InstUI áttűnéséhez (fade); hagyd
el őket az azonnali eltávolításhoz. Az interakció vezérli a(z) `-fade-exiting` állapotot, és az eltávolítás előtt egy megszakítható (cancelable),
buborékoló (bubbling) `dismiss` eseményt vált ki, így az alkalmazás meghívhatja a(z) `preventDefault()` metódust, hogy az
alert csatolva (mounted) maradjon.

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

A folyamatjelző sávok (progress bars) tetszőleges skálákat fogadnak el a(z) `--min` (alapértelmezés szerint `0`), `--value` és `--max`
(alapértelmezés szerint `100`) tulajdonságokon keresztül, az elavult `--value-now` és `--value-max` aliasokkal. Add hozzá a(z) `-should-animate` osztályt,
hogy az InstUI fél másodperces átmenetét alkalmazza minden értékváltozáskor. A(z) `.value` a gyökérelem gyermekeként a(z) `.bar` mellett
helyezkedik el; add hozzá a(z) `-render-value-inside` osztályt, hogy ehelyett a sáv felett jelenjen meg, annak kezdetéhez igazítva
(formázd a mérősáv színe melletti olvashatóság érdekében). Használj natív `<progress>` elemet a
nulla alapú tartományokhoz, és `<meter>` elemet, ha a minimum nem nulla; a webes komponensek automatikusan választanak
közülük a(z) `min` attribútumuk alapján. Az InstUI nem rendelkezik határozatlan (indeterminate) állapottal, így a(z) `value`
attribútum nélküli `<progress>` egy csak a pantokenben létező legjobb becslés: a(z) `progress-bar` csúszó szegmensként animálja a(z) `.bar` elemet,
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

A folyamatjelző körök (progress circles) ugyanezeket a tetszőleges skálákat fogadják el a(z) `--min`, `--value` és `--max` tulajdonságokon keresztül.
A(z) `--value-now` és `--value-max` elavult funkcionális aliasként megmarad. Add hozzá a(z) `-should-animate` osztályt, és
töltsd be a fókuszált interakciós csomagot az InstUI mountolási animációjának reprodukálásához; a(z) `--animation-delay` egy
mértékegység nélküli, ezredmásodpercben megadott késleltetés. Az elavult `-should-animate-on-mount` és
`-shold-animate-on-mount` írásmódok funkcionális aliasként megmaradnak.

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

## Osztályelőtag (Class prefix)

Alapértelmezés szerint minden osztály a(z) `instui-` névtérrel rendelkezik. Hozz létre saját előtaggal ellátott stíluslapot — vagy előtag nélkülit —,
átadva a(z) `prefix` értéket bármely buildernek. Bármilyen hamis (falsy) érték (`null`, `undefined`, `""`, vagy annak elhagyása) teljesen
elhagyja az előtagot, így a(z) `class="instui-heading -level-h1"` helyett a(z) `class="heading -level-h1"` osztályt írhatod:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjellel előtagolt módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok maradnak. A
csomag által biztosított stíluslapok megőrzik a(z) `instui` előtagot.

## Base

A(z) `base.css` egy választható (opt-in) reset, amely globális dokumentum-alapértelmezéseket állít be a tokenekből: `box-sizing`, egy
`body` reset, az oldal felülete (surface), az alapértelmezett szövegszín és betűtípus, a(z) `color-scheme` (így a(z) `light-dark()` tokenek
és a natív vezérlők követik a témát), valamint egy alap hivatkozásstílus. Töltsd be egyszer, a komponens- és a próza- (prose)
stíluslapok előtt, amikor a pantoken uralja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd ki, amikor olyan gazdakörnyezetbe (host) ágyazol be komponenseket, amely már témaspecifikusan kezeli a saját `html` és `body` elemeit —
a reset lefesti az oldal felületét, így nem érdemes összeütközésbe kerülni a gazdakörnyezettel. Minden általa beállított érték
alacsony specificitású `:where()` szelektorokat használ, így a saját szabályaid mindig érvényesülnek.

A(z) `base.css` _alkalmazza_ a márka betűtípusát (`font-family: var(--instui-font-family-base)`, rendszerszintű
tartalék betűtípusokkal [fallbacks]); a _betöltéséhez_ importáld a választható `fonts.css` fájlt — `@font-face` szabályok az Atkinson Hyperlegible
Nexthez, a csomagban található woff2 fájlokra mutatva. Ez külön van választva, mivel a betűkészletek mérete ~350 kB, és a
betűtípusok saját hosztolása tudatos döntés.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó-tartalom

<p>A mondat után van egy rejtett üzenet.<span class="instui-screen-reader-content">Ezt csak a képernyőolvasók olvassák fel.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

A(z) `.instui-screen-reader-content` vizuálisan elrejti az elemet, miközben megtartja azt az akadálymentességi fában (accessibility tree)
— olyan címkék és állapotszövegek számára, amelyeket a kisegítő technológiáknak fel kell olvasniuk, de a dizájnban nem kell megjelenniük.

## Segédosztályok (Utilities)

A(z) `utilities.css` egy választható réteg keresztvágó (cross-cutting) osztályokból: egy `View` primitív, térközök a
tokenskálán és szemantikus színfelülbírálások. A komponens `-modifier` osztályaival ellentétben ezek bármely
elemre érvényesek, így ráépíthetők egy komponensre vagy egy egyszerű tagre is.

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

**View** — A(z) `.instui-view` az InstUI `View` eleme. Ez az alap, amelyre a térközöket és színeket rétegezheted, és
kulcs-érték módosítókat hordoz a saját vizuális propjaihoz, így nem kell segédosztályokhoz nyúlnod:
`-background-*` (a felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` és `-cursor-*`. A szabad értékű propok
(width/height/inset) inline stílusok maradnak; a(z) `margin`/`padding` a térköz segédosztályokat használja.

**Spacing** — oldalankénti osztályok a térközskálán. Értelmezésük a(z) `{m|p}{side}-{step}` minta szerint történik: `m` a
margóhoz (margin) vagy `p` a belső margóhoz (padding) (vagy a teljes `margin`/`padding` szavak), egy opcionális logikai oldal, majd egy
lépésköz (step). Így a(z) `.instui-m-lg` és a(z) `.instui-margin-lg` megegyezik, ahogyan a(z) `.instui-pt-md` és
a(z) `.instui-paddingt-md` is.

- Oldalak: nincs (összes), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  tengely). A logikai oldalak jobbról balra (RTL) tartó elrendezésekben is helyesek maradnak.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plusz a(z) `auto` kizárólag a margóhoz.

Kombináld őket az InstUI `margin="small auto large"` rövidítéséhez:
`class="instui-mt-sm instui-mx-auto instui-mb-lg"`.

**Color** — szemantikus felülbírálások, amelyek a palettán belül maradnak: `.instui-bg-<name>` (háttér),
`.instui-fg-<name>` (szövegszín) és `.instui-border-<name>` (szegélyszín). Minden egyes `<name>` egy
szemantikus színtoken — a szándékok (intents) (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …), valamint a(z) `accent-*` paletta (`accent-blue`, `accent-green` stb.).
Egy név csak akkor szerepel, ha a token létezik az adott családban, így a(z) `fg-brand` nem osztály — a szövegnek
nincs brand tokenje. Nincs mód primitív érték vagy tetszőleges hexadecimális szín elérésére, és minden felülbírálás követi
a témát.

**Token families** — minden „egy token, egy tulajdonság” család tokenenként kap egy osztályt, amely a
tokenről kapta a nevét. Kombináld őket szabadon:

- `.instui-font-family-heading`, `.instui-font-family-code`, … → `font-family`
- `.instui-font-weight-body-strong`, `.instui-font-weight-interactive`, … → `font-weight`
- `.instui-line-height-*` → `line-height`
- `.instui-border-radius-md`, `.instui-border-radius-full`, … → `border-radius`
- `.instui-border-width-sm`/`-md`/`-lg` → `border-width`
- `.instui-opacity-base`, `.instui-opacity-disabled` → `opacity`
- `.instui-elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak a saját egyetlen tulajdonságát állítja be, így a(z) `border-width`/`border-radius` osztályoknak egy `border-*` színre és egy szegélystílusra
van szükségük a szegély tényleges kirajzolásához. Ezek a teljes tokennevet használják (`.instui-border-radius-md`), míg a
fenti szín- és térközsegítők rövid aliasokat használnak (`.instui-bg-brand`, `.instui-mt-lg`) — az aliasok
ergonomikus rövidítések; a tokenosztályok szó szerintiek és kimerítőek.

**Layout** — A(z) `.instui-display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és a(z) `.instui-text-align-<value>` (`start`, `center`, `end`, `justify`) az InstUI több komponenst érintő
`display` és `textAlign` propjait (View, Button, Metric, Tabs, …) fedik le kombinálható osztályokként —
így ezek nem komponensenkénti módosítók.

Itt minden tiszta CSS, amelyet a(z) `--instui-*` tokenek vezérelnek, így a tokenrétegen keresztül követi
az InstUI-t. Lásd az [API-referenciát](/api/) a(z) `componentsCss` és a komponensenkénti builderek tekintetében.

## Átfedések: dialog és popover

Az átfedő komponensek (overlays) natív platformprimitívekre épülnek, így kevés vagy semmilyen
JavaScript nélkül is akadálymentesen működnek.

**Modal** — helyezd a(z) `.instui-modal` osztályt egy natív `<dialog>` elemre. Ezzel automatikusan megkapja a fókuszcsapdát, a(z) `Esc` gombbal történő bezárást és a
`::backdrop` pszeudo-elemet; a háttér ugyanazzal a(z) `--instui-component-mask-background-color`
tokennel van sötétítve, mint a(z) `.instui-mask` (add hozzá a(z) `-blur` osztályt az opálosításhoz). Nyisd meg és zárd be invoker parancsokkal — szkript nélkül:

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

**Context view / popover** — helyezd a(z) `.instui-context-view` osztályt egy `[popover]` elemre, és kapcsold (toggle) a(z)
`popovertarget` segítségével. A felső rétegre (top layer) kerül, és kívülre kattintáskor vagy az `Esc` gomb megnyomásakor automatikusan bezáródik (light-dismiss), szintén szkript nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Mask** — A(z) `.instui-mask` megmarad a dokumentumfolyambeli átfedésekhez (in-flow overlays, pl. spinner egy kártya felett); a modális ablakok `::backdrop`
eleme pedig lefedi a modális esetet.

Mindkét minta viselkedési egyéni elemekként (custom elements) is be van csomagolva a(z) `@pantoken/web-components` csomagban:
`<instui-modal open>` (egy `<dialog>`, amelyet a(z) `open` attribútuma vezérel) és `<instui-context-view>` (egy
natív popover).

Böngészőtámogatás: a popover API és a(z) `popovertarget` a Baseline 2024 része; az invoker parancsok
(`command`/`commandfor`) a Baseline 2025 részét képezik, így a régebbi böngészőkben kösd a gombokat a(z) `dialog.showModal()`
eseménykezelőhöz egysoros tartalékként (fallback). A popover pozicionálása a kiváltó eleme (trigger) mellett a CSS anchor positioninget használja, ahol
támogatott (Chromium); máshol a legfelső réteg közepére igazodik.

## Űrlapok

**FormField** — A(z) `.instui-form-field` egy CSS-Grid wrapper, amely elrendezi a címkét (label), a vezérlőt (control) és az esetleges
üzeneteket. Helyezd egy `<label>` elemre, hogy a címke natívan társuljon a vezérlőjéhez. Három grid
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

A(z) `-layout-stacked` (alapértelmezett) egymás alá helyezi a területeket; a(z) `-layout-inline` a címkét a vezérlő mellé helyezi (finomhangolás
a(z) `-label-align-{start,end}` és `-v-align-{top,middle,bottom}` segítségével). A(z) `-readonly` átszínezi a címkét.

A **kötelező mezőt jelző csillag** (required asterisk) akkor jelenik meg, ha a mező kötelező _vagy_ a(z) `-required` osztály, _vagy_ egy
benne található natív `required` vezérlő által — így elegendő beállítani a(z) `required` attribútumot az inputon, és a jelölés megjelenik.
Ez dekoratív (egy `::after` a címkén, az akadálymentességi fán kívül); párosítsd egy olyan megjegyzéssel, mint
a „A \*-gal jelölt mezők kitöltése kötelező”, hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — A(z) `.instui-form-field-group` a kapcsolódó mezőket csoportosítja egy `<fieldset>` elemben egy
`<legend>` leírással. Ez tiszta elrendezés (nincsenek dedikált tokenek): az alapértelmezett beállítás egymás alá rendezi a mezőket;
a(z) `-layout-columns` / `-layout-inline` reszponzív oszlopokba rendezi őket, a(z) `-row-spacing-*` /
`-col-spacing-*` és a(z) `-v-align-*` osztályokkal a grid finomhangolásához.

**RadioInputGroup** — A(z) `.instui-radio-input-group` ugyanaz a(z) `<fieldset>`/`<legend>` csoportosítás,
rádiógombokra specializálva. Mivel a gyermek rádiógombok közös `name` attribútummal rendelkeznek, a kiválasztás natívan egyválasztásos —
így a kapcsológombok csoportja egyetlen vezérlőként viselkedik, nem különálló gombokként. A(z) `-variant-simple` (alapértelmezett)
szabványos rádiógombokat rendez el (a(z) `-layout-columns`/`-inline` egy sorba folyatja őket); a(z) `-variant-toggle` a
gyermek `.instui-radio.-variant-toggle` gombokat egyetlen szegmentált vezérlővé (segmented control) köti össze (összevont szegélyek,
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

**Messages** — A(z) `.instui-form-field-messages` a tárolóelem; minden `.instui-form-field-message` kap egy
`-type-*` típust: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + egy circle-alert ikon), `-type-success`
(zöld szöveg + egy circle-check ikon), és `-type-screenreader-only` (vizuálisan levágott, de továbbra is felolvasott).
Az ikonok a(z) `currentColor` színnel rajzolódnak ki, így mindig illeszkednek az üzenet színéhez. A(z) `-type-new-error` a(z)
`-type-error` elavult aliasa. Kösd össze a konténert a vezérlővel a(z) `aria-describedby` segítségével, és állíts be
`aria-invalid` értéket a vezérlőn hiba esetén.

Egy FormFielden belül a(z) `-type-error` üzenet követi a kliensoldali validációt: rejtve marad mindaddig, amíg a
mező vezérlője nem lesz `:user-invalid` (natív, miután a felhasználó interakcióba lépett vele) — vagy kényszerítheted a(z) `-invalid`
osztállyal a(z) `.instui-form-field` elemen (kiszolgálóoldali hiba esetén). Egy önálló `.instui-form-field-messages` (nem
mezőben lévő) változatlan marad. A vezérlő fókuszgyűrűje (focus ring) szintén igazodik ehhez: danger állapotot jelez a(z) `:user-invalid`/`-invalid` esetén,
és success állapotot a(z) `-success` esetén.

**Text controls** — A(z) `.instui-text-input` (natív `<input>`), a(z) `.instui-text-area` (natív `<textarea>`,
átméretezhető) és a(z) `.instui-simple-select` (natív `<select>` egy lefelé mutató nyíllal [caret]) közös megjelenéssel és azonos
állapotokkal rendelkeznek: `-invalid` (hibaszegély), `-success` (sikerszegély), `-readonly`, natív `:disabled` és
`-size-{sm,md,lg}`. Egy kezdő/záró ikonhoz (leading/trailing icon, az InstUI `renderBeforeInput`/`renderAfterInput` propjai) csomagold
az inputot a(z) `.instui-input-group` elembe, és adj hozzá egy `.before`/`.after` slotot (egy `-icon-*` ikont); a(z) `-should-not-wrap`
egy sorban tartja azt. A(z) `.instui-number-input` ugyanez a burkolófelület kiegészítve egy `.arrows` +/- léptetőoszloppal (spinner column) (natív
`type="number"`; kösd a gombokat a(z) `stepUp()`/`stepDown()` metódusokhoz). A(z) `.instui-range-input` egy formázott
`input[type="range"]`, amelynek értéke egy `.instui-range-input-value` inverz buborékban jelenik meg. Egy összetett (rich)
comboboxhoz listbox popoverrel használd a(z) `@instructure/ui` elemet — ez a könyvtár a natív vezérlőket fedi le.

**Formázott legördülő lista (kísérleti)** — egy választható (opt-in) `select.css` feljavítja _ugyanezt_
a(z) `.instui-simple-select` elemet: formázza a nyitott legördülő menüt (a panelt és az egyes opciókat az egérrel rámutatott [hover] és
kiválasztott állapotokkal) a CSS Customizable Select modell használatával.

> [!WARNING]
> A(z) `select.css` a(z) `appearance: base-select` / `::picker(select)` megoldásra támaszkodik, amely **kísérleti** jellegű
> (Chrome 135+, még nem Baseline). Külön választható stíluslapként érhető el, és minden szabály a(z)
> `@supports (appearance: base-select)` mögé van zárva, így semmit sem tesz a nem támogatott böngészőkben — a
> `.instui-simple-select` vezérlő egyszerű natív select marad. Csak akkor töltsd be, ha szeretnéd a
> továbbfejlesztett legördülőt, és elfogadod a korlátozott támogatottságot.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
