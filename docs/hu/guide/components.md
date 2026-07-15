# Komponensek

`@pantoken/components` osztályalapú komponensstílusokat szállít az Instructure tokenekből építve. Importáld
a stíluslapot, és címkézd fel a jelölést — nincs szükség keretrendszerre.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Inkább egyéni elemeket használnál? `@pantoken/web-components` ugyanezeket a stílusokat becsomagolja mint `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és sok más — lásd a
> [csomag térképet](/guide/packages).

## Konvenciók

A csomagban használt CSS-konvenciók az [RSCSS](https://ricostacruz.com/rscss/index.html) módosított verzióján alapulnak.

A módosítók **kulcs-érték** párok — `-<prop>-<val>`, igazodva az InstUI prop nevekhez — így magukért
beszélnek: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. A logikai propok pusztán a prop
neve, ahol a jelenlét azt jelenti, hogy `true` (`-has-shadow`, `-clickable`); egy alapértelmezésben bekapcsolt logikai kikapcsolása
megfordítja (`-without-background`, `-without-border`). A méretek rövid és hosszú írásmódot is elfogadnak
(`-size-sm` = `-size-small`). Ahol egy név eltér az InstUI-tól, az InstUI-szemantikájú osztály még mindig működik,
de elavult (pl. `-variant-info` → használd a `-color-info` osztályt).

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
  class="instui-alert -variant-success -transition-fade -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div class="instui-alert -color-success -transition-fade -has-shadow -icon-megaphone">
  This is the alert content.
</div>
```

## Osztály-előtag

Minden osztály alapértelmezetten `instui-` névtérrel rendelkezik. Építs saját előtaggal — vagy előtag nélkül — stíluslapot,
átadva `prefix`-t bármely buildernek. Bármilyen hamis érték (`null`, `undefined`, `""`, vagy kihagyása) teljesen eldobja
az előtagot, így `class="heading -level-h1"`-t írhatsz `class="instui-heading -level-h1"` helyett:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

A kötőjeles módosítók (`.-color-secondary`, `.-level-h1`) mindkét esetben változatlanok. A
csomag által szállított stíluslapok megtartják a `instui` előtagot.

## Alap

`base.css` egy opcionális reset, amely a tokenekből globális dokumentum-alapértékeket állít be: `box-sizing`, egy
`body` reset, az oldalfelület, alap szövegszín és betűtípus, `color-scheme` (hogy a `light-dark()` tokenek
és a natív vezérlők kövessék a témát), valamint egy alap link. Töltsd be egyszer, a komponens- és prózastíluslapok
előtt, amikor a pantoken birtokolja az oldalt.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Hagyd ki, amikor komponenseket ágyazol be egy olyan hostba, amely már saját `html` és `body` témával rendelkezik —
a reset megfesti az oldalfelületet, így nem akarod, hogy a hosttal küzdjön. Minden, amit beállít, alacsony
specifikusságú `:where()` szelektorokat használ, így a saját szabályaid mindig győznek.

`base.css` _alkalmazza_ a márkabetűtípust (`font-family: var(--instui-font-family-base)`, rendszertartalékokkal);
_betöltéséhez_ importáld az opcionális `fonts.css`-t — `@font-face` szabályok az Atkinson Hyperlegible
Next számára, a csomagban szállított woff2-kre mutatva. Külön van, mert a betűkészletek ~350 kB-osak, és
a betűtípusok saját tárhelyen tartása tudatos választás.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Képernyőolvasó tartalom

<p>Ez a mondat után egy rejtett üzenet található.<span class="instui-screen-reader-content">Csak a képernyőolvasók mondják be ezt.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` vizuálisan elrejt egy elemet, miközben megtartja az akadálymentesítési fában
— olyan címkékhez és állapotszövegekhez, amelyeket a segédtechnológiának be kell olvasnia, de a designnak nem szabad megjelenítenie.

## Segédosztályok

`utilities.css` egy opcionális réteg kereszthivatkozású osztályokból: egy `View` primitív, térközök a token-
skálán, és szemantikus szín-felülírások. A komponens `-modifier` osztályaival ellentétben ezek bármely
elemre alkalmazhatók, így egy komponensre vagy egy csupasz címkére is komponálhatók.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md instui-mb-sm" style="border-radius: 6px;">
  <span class="instui-text instui-fg-on-color">Accent-blue felület on-color szöveggel.</span>
</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Középre igazítva mx-auto-val.</span>
</div>

```html
<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md">…</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto">…</div>
```

**View** — `.instui-view` az InstUI `View` komponense. Ez az alap, amire térközöket és színeket rétegzel, és
kulcs-érték módosítókat hordoz a saját vizuális propjaihoz, így nem kell segédosztályokért nyúlnod:
`-background-*` (felületei), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` és `-cursor-*`. A szabad értékű propok
(width/height/inset) inline stílusok maradnak; `margin`/`padding` a térköz-segédosztályokat használják.

**Térközök** — oldalankénti osztályok a térközskálán. Olvasd őket így: `{m|p}{side}-{step}`: `m` margóhoz
vagy `p` paddinghez (vagy a teljes szavak: `margin`/`padding`), egy opcionális logikai oldal, majd egy
lépés. Így `.instui-m-lg` és `.instui-margin-lg` ugyanaz, akárcsak `.instui-pt-md` és
`.instui-paddingt-md`.

- Oldalak: nincs (mind), `t`/`b` (block eleje/vége), `s`/`e` (inline eleje/vége), `x`/`y` (inline/block
  tengely). A logikai oldalak jobbról balra elrendezésekben is helyesek maradnak.
- Lépések: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plusz `auto` csak margóhoz.

Komponáld őket az InstUI `margin="small auto large"` rövidítéséhez:
`class="instui-mt-sm instui-mx-auto instui-mb-lg"`.

**Színek** — szemantikus felülírások, amelyek a palettán maradnak: `.instui-bg-<name>` (háttér),
`.instui-fg-<name>` (szövegszín) és `.instui-border-<name>` (szegélyszín). Minden `<name>` egy
szemantikus színtoken — a szándékok (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plusz a `accent-*` paletta (`accent-blue`, `accent-green`, és így
tovább). Egy név csak akkor van ott, ha a token létezik abban a családban, így `fg-brand` nem osztály — a szövegnek
nincs márkatokene. Nincs mód elérni egy primitívet vagy tetszőleges hex-et, és minden felülírás követi
a témát.

**Tokencsaládok** — minden „egy token, egy tulajdonság" család egy osztályt kap tokenenként, a token
után elnevezve. Komponáld őket szabadon:

- `.instui-font-family-heading`, `.instui-font-family-code`, … → `font-family`
- `.instui-font-weight-body-strong`, `.instui-font-weight-interactive`, … → `font-weight`
- `.instui-line-height-*` → `line-height`
- `.instui-border-radius-md`, `.instui-border-radius-full`, … → `border-radius`
- `.instui-border-width-sm`/`-md`/`-lg` → `border-width`
- `.instui-opacity-base`, `.instui-opacity-disabled` → `opacity`
- `.instui-elevation-resting`/`-above`/`-topmost` (és `-depth1`…`-card`) → `box-shadow`

Mindegyik csak a saját tulajdonságát állítja be, így `border-width`/`border-radius` mellé szükség van egy `border-*` színre és szegélystílusra,
hogy valóban szegélyt rajzoljon. Ezek a teljes tokennevet használják (`.instui-border-radius-md`), míg a
fenti szín- és térköz-segédosztályok rövid aliasokat használnak (`.instui-bg-brand`, `.instui-mt-lg`) — az aliasok
ergonomikus rövidítések; a token-osztályok szó szerintiek és teljes körűek.

**Elrendezés** — `.instui-display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) és `.instui-text-align-<value>` (`start`, `center`, `end`, `justify`) lefedik az InstUI
kereszthivatkozású `display` és `textAlign` propjait (View, Button, Metric, Tabs, …) komponálható osztályokként —
így ezek nem komponensenkénti módosítók.

Itt minden tiszta CSS, amelyet a `--instui-*` tokenek vezérelnek, így a tokenrétegen keresztül követi az InstUI-t.
Lásd az [API referenciát](/api/) `componentsCss` és a komponensenkénti builderek részleteiért.

## Fedőrétegek: dialog és popover

A fedőréteg-komponensek natív platformprimitíveken lovagolnak, így akadálymentesen viselkednek kevés vagy semmi
JavaScripttel.

**Modal** — tedd rá `.instui-modal`-t egy natív `<dialog>` elemre. Ingyen kap fókuszcsapdát, `Esc`-bezárást és
`::backdrop`-t; a háttér ugyanazzal a `--instui-component-mask-background-color` tokennel van elhomályosítva, mint
`.instui-mask` (adj hozzá `-blur`-t a fagyasztott üveg hatásához). Nyisd és zárd invoker parancsokkal — nincs script:

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

**Context view / popover** — tedd rá `.instui-context-view`-t egy `[popover]` elemre, és váltogasd
`popovertarget`-val. A felső rétegen lovagol, és külső kattintásra vagy `Esc`-re könnyedén bezárul, ismét script nélkül:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Mask** — `.instui-mask` megmarad a folyamon belüli fedőrétegekhez (spinner egy kártya felett); egy modal `::backdrop`-ja
lefedi a modal esetet.

Mindkét minta viselkedési egyéni elemként is be van csomagolva a `@pantoken/web-components`-ben:
`<instui-modal open>` (egy `<dialog>`, amelyet `open` attribútuma vezérel) és `<instui-context-view>` (natív
popover).

Böngészőtámogatás: a popover API és a `popovertarget` 2024-es Baseline; az invoker parancsok
(`command`/`commandfor`) 2025-ös Baseline, így régebbi böngészőkön kösd a gombokat a `dialog.showModal()`-hoz
egysoros tartalékként. A popover pozicionálását a kiváltója mellett CSS anchor positioning használja ott, ahol
támogatott (Chromium); máshol a felső rétegben középen jelenik meg.

## Űrlapok

**FormField** — `.instui-form-field` egy CSS Grid burkoló, amely elhelyez egy címkét, a vezérlőt és bármely
üzeneteket. Tedd egy `<label>` elemre, hogy a címke natívan társuljon a vezérlőjével. Három rácsterülete van
— `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (alapértelmezett) egymásra rakja a területeket; `-layout-inline` a címkét a vezérlő mellé helyezi (hangolható
`-label-align-{start,end}`-val és `-v-align-{top,middle,bottom}`-vel). `-readonly` átszínezi a címkét.

A **kötelező csillag** akkor jelenik meg, ha a mező kötelező _vagy_ a `-required` osztály miatt, _vagy_ egy
natív `required` vezérlő miatt benne — így egyszerűen beállíthatod `required`-t a beviteli mezőn, és a jel megjelenik.
Dekoratív (egy `::after` a címkén, az akadálymentesítési fán kívül); párosítsd egy megjegyzéssel, mint
„a \*-gal jelölt mezők kötelezők", hacsak az űrlap nem magától értetődő.

**FormFieldGroup** — `.instui-form-field-group` kapcsolódó mezőket csoportosít egy `<fieldset>`-be egy
`<legend>` leírással. Tisztán elrendezés (nincsenek dedikált tokenek): alapértelmezetten egymásra rakja a mezőket;
`-layout-columns` / `-layout-inline` reszponzív oszlopokba folyatja őket, `-row-spacing-*` /
`-col-spacing-*` és `-v-align-*` hangolja a rácsot.

**RadioInputGroup** — `.instui-radio-input-group` ugyanaz a `<fieldset>`/`<legend>` csoportosítás,
rádiókhoz specializálva. Mivel a gyermek rádiók egy `name`-et osztanak meg, a kiválasztás natívan egy-választós —
így egy váltógombkészlet egyetlen vezérlőként viselkedik, nem laza gombokként. `-variant-simple` (alapértelmezett) rendezi
el a szabványos rádiókat (`-layout-columns`/`-inline` egy sorba folyatja őket); `-variant-toggle` összeköti a
gyermek `.instui-radio.-variant-toggle` gombokat egyetlen szegmentált vezérlővé (összecsukott szegélyek,
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

**Üzenetek** — `.instui-form-field-messages` a konténer; minden `.instui-form-field-message` egy
`-type-*`-t vesz: `-type-hint` (szürke, alapértelmezett), `-type-error` (piros szöveg + kör-figyelmeztetés glyph), `-type-success`
(zöld szöveg + kör-pipa glyph) és `-type-screenreader-only` (vizuálisan kivágva, de mégis bemondva).
A glyph-ek `currentColor`-ben festődnek, így mindig az üzenet színéhez illeszkednek. `-type-new-error` egy
elavult aliasa a `-type-error`-nak. Kösd a konténert a vezérlőhöz `aria-describedby`-val, és állítsd be
`aria-invalid`-t a vezérlőn, ha hiba van.

Egy FormField-en belül egy `-type-error` üzenet követi a kliensoldali érvényesítést: rejtve marad, amíg a
mező vezérlője `:user-invalid` (natív, miután a felhasználó interakcióba lépett) — vagy kikényszerítheted `-invalid`-val
a `.instui-form-field`-n (szerveroldali hibához). Egy önálló `.instui-form-field-messages` (mezőn kívül)
ez nem érinti. A vezérlő fókuszgyűrűje követi: veszély, ha `:user-invalid`/`-invalid`, és
siker, ha `-success`.

**Szövegvezérlők** — `.instui-text-input` (natív `<input>`), `.instui-text-area` (natív `<textarea>`,
átméretezhető) és `.instui-simple-select` (natív `<select>` egy caret-tel) egy megjelenést osztanak meg, és ugyanazokat az
állapotokat: `-invalid` (hibaszegély), `-success` (sikerszegély), `-readonly`, natív `:disabled` és
`-size-{sm,md,lg}`. Vezető/követő ikonhoz (InstUI `renderBeforeInput`/`renderAfterInput`), csomagold
a bevitelt `.instui-input-group`-be és adj hozzá egy `.before`/`.after` slot-ot (egy `-icon-*` glyph); `-should-not-wrap`
egy soron tartja. `.instui-number-input` ez a homlokzat plusz egy `.arrows` +/- spinner oszlop (natív
`type="number"`; kösd a gombokat `stepUp()`/`stepDown()`-hoz). `.instui-range-input` egy stílusozott
`input[type="range"]`, amelynek értéke `.instui-range-input-value` inverz buborékban renderelődik. Gazdag
combobox listbox popover-rel, `@instructure/ui`-hez nyúlj — ez a könyvtár a natív vezérlőket fedi le.

**Stílusozott select legördülő (kísérleti)** — egy opcionális `select.css` frissíti _ugyanazt_ a
`.instui-simple-select` elemet: stílusozza a nyitott legördülőt (a panelt és minden opciót, hover és
kiválasztott állapotokkal) a CSS Customizable Select modell használatával.

> [!WARNING]
> `select.css` a `appearance: base-select` / `::picker(select)`-ra támaszkodik, ami **kísérleti**
> (Chrome 135+, még nem Baseline). Külön opcionális stíluslapként van szállítva, és minden szabály
> `@supports (appearance: base-select)` mögé van zárva, így nem támogatott böngészőkben semmit sem tesz — a
> `.instui-simple-select` vezérlő egyszerűen a sima natív select marad. Csak akkor töltsd be, ha szeretnéd
> a bővített legördülőt, és elfogadod a korlátozott támogatást.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
