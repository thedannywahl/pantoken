# Komponente

`@pantoken/components` pošilja slogovne razrede komponent, zgrajene iz Instructure tokenov. Uvozi
stilno datoteko in označi svojo označevalno kodo — ni potreben noben ogrodje.

```ts
import "@pantoken/components/components.css";
```

> [!OPOMBA]
> Raje prilagojeni elementi? `@pantoken/web-components` ovije iste sloge kot `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` in še več — poglej
> [mapo paketov](/guide/packages).

## Konvencije

CSS konvencije v tem paketu temeljijo na spremenjeni različici [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifierji so **ključ-vrednost** — `-<prop>-<val>`, usklajeni z imeni InstUI propov — zato pomenijo sami po sebi: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean prop-i so samo ime propa, kjer prisotnost pomeni `true` (`-has-shadow`, `-clickable`); privzeti boolean, vključen po privzetku in izklopljen, se inverzira (`-without-background`, `-without-border`). Velikosti sprejemajo kratke in dolge zapise (`-size-sm` = `-size-small`). Kjer ime odstopa od InstUI, InstUI-semantni razred še vedno deluje, vendar je zastarel (npr. `-variant-info` → uporabi `-color-info`).

### Primer

Instructure UI React komponenta:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken komponente:

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

Za InstUI-jev prop `timeout` nastavi enotsko brezmerno `--timeout` prilagodljivo lastnost v milisekundah in naloži Alert interakcijo. Pozitivna vrednost načrtuje zapiranje; `0` (privzeto) pusti opozorilo na mestu. Dodaj razrede `instui-transition -fade-entered` pripomočka `transition` za InstUIjev fade; izpusti jih za takojšnje odstranjevanje. Interakcija upravlja stanje `-fade-exiting` in sproži preklicljiv, mehurčkast dogodek `dismiss` pred odstranitvijo, da lahko aplikacija pokliče `preventDefault()` in pusti opozorilo priklopljeno.

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

Napredne vrstice (progress bars) sprejemajo poljubne lestvice preko `--min` (`0` privzeto), `--value` in `--max`
(`100` privzeto), z zastarelimi aliasi `--value-now` in `--value-max`. Dodaj `-should-animate`
za uporabo polsekundnega InstUI prehoda vsakič, ko se vrednost spremeni. `.value` stoji ob `.bar` kot
otrok korena; dodaj `-render-value-inside`, da ga upodobiš nad progo, poravnano na njen začetek,
namesto tega (stiliraj za berljivost glede na barvo merilnika). Uporabi nativen `<progress>` za
nulto osnovno lestvico in `<meter>`, kadar je minimum različen od nič; spletne komponente med njima
samodejno izbirajo glede na atribut `min`. InstUI nima nedoločenega (indeterminate) stanja, zato je `<progress>`
brez atributa `value` pantoken-ova najboljša ocena: `progress-bar` animira `.bar` kot
drseči segment in `progress-circle` vrti svoj obroč z določeno loku, oba pa skrivata `.value`.

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

Napredni krogi (progress circles) sprejemajo iste poljubne lestvice preko `--min`, `--value` in `--max`.
`--value-now` in `--value-max` ostajata kot zastarela funkcionalna aliasa. Dodaj `-should-animate` in
naloži focused interaction bundle za reproduciranje InstUI-jeve mount animacije; `--animation-delay` je
enotsko brezmerno zamik v milisekundah. Zastarela črkovanja `-should-animate-on-mount` in
`-shold-animate-on-mount` ostajata funkcionalna aliasa.

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

## Predpona razredov

Vsak razred je privzeto imenskoprostorsko `instui-`. Zgradi stilno datoteko s svojo predpono — ali brez — s
posredovanjem `prefix` kateremukoli graditelju. Vsaka vrednost, ki evalvira v false (`null`, `undefined`, `""` ali njena izpustitev) odstrani
predpono v celoti, tako da lahko pišeš `class="heading -level-h1"` namesto `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Kaveljčno-predponjeni modifierji (`.-color-secondary`, `.-level-h1`) ostanejo nespremenjeni v obeh primerih. Slogovne datoteke, ki jih pošilja paket, ohranjajo `instui` predpono.

## Baza

`base.css` je opcijski reset, ki nastavi globalne privzete vrednosti dokumenta iz tokenov: `box-sizing`, reset `body`, površino strani, osnovno barvo besedila in pisavo, `color-scheme` (tako da `light-dark()` tokeni
in nativeni kontrolniki sledijo temi), in osnovno povezavo. Naloži ga enkrat, pred komponentnimi in proznimi
listi, ko pantoken upravlja stran.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Preskoči ga, ko vgrajuješ komponente v gostitelja, ki že tematizira svojo `html` in `body` —
reset barva površino strani, zato nočeš, da se bori z gostiteljem. Vse, kar nastavi, uporablja
nizko-specificne selektorje `:where()`, zato vedno prevladajo tvoje lastne pravila.

`base.css` _uporablja_ blagovno pisavo (`font-family: var(--instui-font-family-base)`, s sistemskimi
rezervnimi pisavami); da jo _naložiš_, uvozi opcijski `fonts.css` — `@font-face` pravila za Atkinson Hyperlegible
Next, ki kažejo na woff2 datoteke, priložene v paketu. Ločeno je, ker so pisave ~350 kB in
samostojno gostovanje pisav je premična odločitev.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Vsebina za bralnike zaslona

<p>Po tem stavku je skrito sporočilo.<span class="instui-screen-reader-content">Samo bralniki zaslona to najavijo.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` skrije element vizualno, medtem ko ga pusti v drevesu dostopnosti
— za oznake in statusna besedila, ki naj jih asistivna tehnologija prebere, vendar jih dizajn ne pokaže.

## Pomočniki (Utilities)

`utilities.css` je opcijska plast prečnih razredov: primitiv `View`, razmiki na token lestvici,
in semantični barvni presežki. Za razliko od komponentnih `-modifier` razredov, ti uporabljajo **dvojno
vezaj** (`--mod`), da nikoli ne trčijo s komponentnimi imeni modifierjev, in se uporabljajo na kateremkoli
elementu — golem ali sestavljenem na komponenti.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Površina accent-blue z besedilom on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Na sredini z mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` je InstUI-jev `View`. Je baza, na katero naneseš razmike in barvo, in
ima ključ-vrednost modifierje za svoje vizualne prop-e, tako da ni treba posegati po pripomočkih:
`-background-*` (njegove površine), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, in `-cursor-*` — to so `view`-ovi
lastni modifierji z eno vezajo, neodvisni od spodaj navedenih pripomočkov z dvojno vezajo. Prop-i z vrednostjo svobode
(width/height/inset) ostanejo kot inline stili; `margin`/`padding` uporabita pripomočke za razmike.

**Razmiki** — razredi za vsako stran na lestvici razmikov. Preberi jih kot `{m|p}{side}-{step}`: `m` za
margino ali `p` za padding (ali polni besedi `margin`/`padding`), opcijska logična stran, nato
stopnja. Torej `.--m-lg` in `.--margin-lg` sta enaka, prav tako `.--pt-md` in `.--paddingt-md`.

- Strani: none (vse), `t`/`b` (začetek/konec bloka), `s`/`e` (začetek/konec inline), `x`/`y` (inline/blokovna os). Logične strani ostanejo pravilne v postavitvah desno-levo.
- Stopnje: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` samo za margino.

Sestavi jih za InstUI-jev `margin="small auto large"` okrajšavo:
`class="--mt-sm --mx-auto --mb-lg"`.

**Barva** — semantični presežki, ki ostanejo na paleti: `.--bg-<name>` (ozadje),
`.--text-<name>` (barva besedila), in `.--border-<name>` (barva obrobe). Vsak `<name>` je
semantični barvni token — intence (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*` paleta (`accent-blue`, `accent-green`, in tako naprej). Ime je prisotno samo, če token obstaja v tej družini, zato `text-brand` ni razred — besedilo nima brand tokena. Ni načina, da bi dosegli primitiv ali poljuben hex, in vsak presežek sledi temi.

**Družine tokenov** — vsaka družina "en token, ena lastnost" dobi razred za vsak token, imenovan po
tokenu. Sestavljaj jih poljubno:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (in `-depth1`…`-card`) → `box-shadow`

Vsak nastavi samo svojo eno lastnost, zato `border-width`/`border-radius` potrebujeta `border-*` barvo in slog obrobe, da se obroba dejansko nariše. Ti uporabljajo polno ime tokena (`.--border-radius-md`), medtem ko barvni in razmik pripomočki zgoraj uporabljajo kratke alias-e (`.--bg-brand`, `.--mt-lg`) — alias-i so ergonomske bližnjice; razredi tokenov so dobesedni in izčrpni.

**Postavitev (Layout)** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) in `.--text-align-<value>` (`start`, `center`, `end`, `justify`) pokrivajo InstUI-jeve
prečne `display` in `textAlign` prope (View, Button, Metric, Tabs, …) kot sestavljivi razredi —
torej ti niso modifierji, specifični za posamezno komponento.

Vsak razred z dvojno vezajo deterministično zmaga v kaskadi nad enako imenovanim komponentnim
modifierjem, ne glede na vrstni red uvoza stilnih datotek — poglej [Avtorske konvencije](/conventions/authoring)
za mehanizem.

Vse tukaj je čisti CSS, ki ga poganjajo `--instui-*` tokeni, zato sledi InstUI preko sloja tokenov. Glej [API referenco](/api/) za `componentsCss` in graditelje za posamezne komponente.

## Prekrivanja: dialog in popover

Overlay komponente uporabljajo nativeni platformni primitiv, zato se vedo dostopno z malo ali brez
JavaScripta.

**Modal** — postavi `.instui-modal` na nativen `<dialog>`. Dobi fokusno ujeto, `Esc`-za-zapiranje, in
`::backdrop` brezplačno; backdrop je potemnjen z istim tokenom `--instui-component-mask-background-color`
kot `.instui-mask` (dodaj `-blur` za zameglitev). Odpri in zapri z invoker ukazi — brez skripta:

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

**Context view / popover** — postavi `.instui-context-view` na element `[popover]` in ga preklapljaj z
`popovertarget`. Leži na najvišjem sloju in se zapre ob kliku zunaj ali z `Esc`, spet brez skripta:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — postavi `.instui-drawer-layout` na koren postavitve z `.tray` in `.content`
otroki. Dodaj atribut `open` (ali `-open`), da razkriješ predal, in uporabi `placement="end"`
(ali `-placement-end`) za pritrditev na inline-end stran — postavitev se reši prek logičnih
`inset-inline-*`/`flex-direction` lastnosti, zato se samodejno obrne pod `dir="rtl"` brez
dodatnih pravil. Focused interaction bundle doda Invoker usmerjanje ukazov in preklopi overlay način
(`should-overlay-tray`), ko širina prestopi `--drawer-layout-min-width` (privzeto
`--instui-breakpoints-sm`, nato `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` ostane za v-teku-prekrivanja (spinner nad kartico); modalov `::backdrop`
pokrije modalni primer.

Oba vzorca sta tudi zavita kot vedenjski prilagojeni elementi v `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` poganjana preko atributa `open`) in `<instui-context-view>` (nativni popover).

Podpora brskalnikov: popover API in `popovertarget` sta Baseline 2024; invoker ukazi
(`command`/`commandfor`) so Baseline 2025, zato na starejših brskalnikih poveži gumbe na `dialog.showModal()`
kot enovrstični fallback. Pozicioniranje popoverja ob sprožilcu uporablja CSS anchor position, kjer je podprto (Chromium); drugje se centrirano prikaže v zgornjem sloju.

## Obrazci (Forms)

**FormField** — `.instui-form-field` je CSS-Grid ovojnica, ki postavi oznako, kontrolnik in morebitna
sporočila. Postavi ga na `<label>`, da se oznaka nativno poveže s kontrolnikom. Ima tri mrežna
področja — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (privzeto) zloži področja; `-layout-inline` postavi oznako ob kontrolnik (nastavi
s `-label-align-{start,end}` in `-v-align-{top,middle,bottom}`). `-readonly` prebarva oznako.

**Zvezdica obveznosti** se prikaže, ko je polje obvezno _bodisi_ razred `-required` _ali_ nativni kontrol `required` znotraj njega — tako lahko preprosto nastaviš `required` na vhodu in oznaka se prikaže.
Je dekorativna ( `::after` na oznaki, zunaj drevesa dostopnosti); združi jo z opombo, kot je
"polja označena z \* so obvezna", razen če je obrazec samorazumljiv.

**FormFieldGroup** — `.instui-form-field-group` združuje sorodna polja v `<fieldset>` z
opisom `<legend>`. Je čista postavitev (brez namenskih tokenov): privzeto zloži polja;
`-layout-columns` / `-layout-inline` jih pretočita v odzivne stolpce, z `-row-spacing-*` /
`-col-spacing-*` in `-v-align-*` za prilagoditev mreže.

**RadioInputGroup** — `.instui-radio-input-group` je ista `<fieldset>`/`<legend>` skupina,
specializirana za radio gumbe. Ker otroški radii delijo `name`, je izbira nativno enostavna —
torej niz preklopnih gumbov deluje kot ena kontrola, ne kot posamezni gumbi. `-variant-simple` (privzeto) postavi
standardne radii (`-layout-columns`/`-inline` jih pretočita v vrstico); `-variant-toggle` poveže
otroške `.instui-radio.-variant-toggle` gumbe v en sam segmentiran kontrol (zdrsne obrobe,
zaobljeni zunanji konci):

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

**Sporočila** — `.instui-form-field-messages` je vsebnik; vsako `.instui-form-field-message` prevzame
`-type-*`: `-type-hint` (sivo, privzeto), `-type-error` (rdeče besedilo + krog-opozorilna ikona), `-type-success`
(zeleno besedilo + krog-potrditvena ikona), in `-type-screenreader-only` (vizualno odrezano, vendar še vedno najavljeno).
Ikone se barvajo v `currentColor`, zato vedno ujemajo barvo sporočila. `-type-new-error` je
zastareli alias za `-type-error`. Poveži vsebnik s kontrolnikom z `aria-describedby`, in nastavi
`aria-invalid` na kontrolniku, ko je napaka.

Znotraj FormField-a, `-type-error` sporočilo sledi validaciji na odjemalcu: ostane skrito dokler kontrola polja ni `:user-invalid` (nativno, po interakciji uporabnika) — ali ga prisiliš z `-invalid`
na `.instui-form-field` (za napako strežnika). Samostojno `.instui-form-field-messages` (ne v polju) ni prizadeto. Obroč fokusa kontrolnika sledi: nevarnost ko `:user-invalid`/`-invalid`,
uspeh na `-success`.

**Besedilni kontrolniki** — `.instui-text-input` (nativen `<input>`), `.instui-text-area` (nativen `<textarea>`,
spremenljiv), in `.instui-simple-select` (nativen `<select>` z caret-om) delijo en izgled in ista
stanja: `-invalid` (obroba napake), `-success` (obroba uspeha), `-readonly`, nativni `:disabled`, in
`-size-{sm,md,lg}`. Za vodilno/končno ikono (InstUI-jevi `renderBeforeInput`/`renderAfterInput`), zavij vhod v `.instui-input-group` in dodaj reži `.before`/`.after` ( `-icon-*` glifik); `-should-not-wrap`
ohranja v eni vrstici. `.instui-number-input` je ta fasada plus `.arrows` +/- spinner stolpec (nativen
`type="number"`; poveži gumbe z `stepUp()`/`stepDown()`). `.instui-range-input` je stiliran
`input[type="range"]`, katere vrednost se upodobi v `.instui-range-input-value` inverzni oblaček. Za bogat
combobox z listbox popoverjem, uporabi `@instructure/ui` — ta knjižnica pokriva nativne kontrolnike.

**Stilirani select dropdown (eksperimentalno)** — opcijski `select.css` nadgradi _isti_
element `.instui-simple-select`: stilira odprti dropdown (panel in vsako možnost, s hover in
izbranimi stanji) z uporabo modela CSS Customizable Select.

> [!OPOZORILO]
> `select.css` se zanaša na `appearance: base-select` / `::picker(select)`, kar je **eksperimentalno**
> (Chrome 135+, še ni Baseline). Pošilja se kot ločen opcijski list in vsako pravilo je oključeno
> za `@supports (appearance: base-select)`, zato v nepodprtih brskalnikih ne naredi nič — kontrol `.instui-simple-select` ostane navaden nativni select. Naloži ga samo, če želiš izboljšan dropdown in sprejemaš omejeno podporo.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
