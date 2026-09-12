# Komponente

`@pantoken/components` pošilja slogovne razrede komponent, zgrajene iz Instructure tokenov. Uvozi slogovno datoteko in označi svojo označbo — okvir ni potreben.

```ts
import "@pantoken/components/components.css";
```

> [!OPOMBA]
> Raje uporabljaš prilagojene elemente? `@pantoken/web-components` zavije iste sloge kot `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` in še več — glej
> [mapo paketov](/api/).

## Konvencije

CSS konvencije v tem paketu temeljijo na spremenjeni različici [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifikatorji so **ključ-vrednost** — `-<prop>-<val>`, usklajeni z imeni InstUI propov — zato so berljivi sami po sebi: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean prop-i so samo ime propa, kjer prisotnost pomeni `true` (`-has-shadow`, `-clickable`); privzeto vključen boolean, ki ga izklopiš, se inverzira (`-without-background`, `-without-border`). Velikosti sprejemajo kratke in dolge zapise (`-size-sm` = `-size-small`). Kjer ime odstopa od InstUI, InstUI-semantika razreda še vedno deluje, vendar je odsvetovana (npr. `-variant-info` → uporabi `-color-info`).

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

Za InstUIjev prop `timeout` nastavi brez-enotsko (unitless) lastnost `--timeout` v milisekundah in naloži Alert interakcijo. Pozitivna vrednost načrtuje zaprtje; `0` (privzeto) pusti opozorilo na mestu. Dodaj razrede `instui-transition -fade-entered` pripomočka `transition` za InstUIjev preliv; izpusti jih za takojšnje odstranjevanje. Interakcija upravlja stanje `-fade-exiting` in sproži preklicljiv, penast (bubbling) `dismiss` dogodek pred odstranitvijo, tako da aplikacija lahko pokliče `preventDefault()` za ohranitev opozorila priklopljenega.

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

Naprednostni trakovi sprejemajo poljubne lestvice preko `--min` (`0` privzeto), `--value` in `--max`
(`100` privzeto), z odsvetovanimi aliasi `--value-now` in `--value-max`. Dodaj `-should-animate`
da uporabiš InstUIjev polsekundni prehod, kadar se vrednost spremeni. `.value` stoji ob `.bar` kot
otrok korena; dodaj `-render-value-inside` da ga narišeš nad sledjo, poravnanega na začetek,
namesto tega (stiliraj za berljivost glede na barvo merilnika). Uporabi nativni `<progress>` za
ničelno osnovano razpon in `<meter>` kadar je minimum različen od nič; spletne komponente med njima
samodejno izbirajo glede na atribut `min`. InstUI nima nedoločnega (indeterminate) stanja, zato je `<progress>`
brez svojega atributa `value` pantoken-ova najboljša ugotovitev: `progress-bar` animira `.bar` kot
drsni segment in `progress-circle` vrti svoj obroč v fiksnem loku, obe skrivata `.value`.

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

Krogi napredka sprejemajo enake poljubne lestvice preko `--min`, `--value` in `--max`.
`--value-now` in `--value-max` ostajata kot odsvetovana funkcionalna aliasa. Dodaj `-should-animate` in
naloži focused interaction paket za ponovitev InstUIjeve animacije nameščanja; `--animation-delay` je
brez-enotsna zakasnitev v milisekundah. Odsvetovani zapis `-should-animate-on-mount` in
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

Vsak razred je privzeto imenski prostor `instui-`. Izgradi slogovno datoteko s svojo predpono — ali brez nje — tako, da
posreduješ `prefix` kateremukoli gradniku. Katera koli vrednost, ki je falsey (`null`, `undefined`, `""`, ali če jo izpustiš) popolnoma odstrani
predpono, tako da lahko avtorjaš `class="heading -level-h1"` namesto `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Pomaknjeno-dashane modifikatorje (`.-color-secondary`, `.-level-h1`) torej ne spreminja. Slogovne datoteke, ki jih pošilja paket, ohranijo predpono `instui`.

## Osnova

`base.css` je opt-in reset, ki nastavi globalne privzete vrednosti dokumenta iz tokenov: `box-sizing`, `body` reset, površino strani, osnovno barvo besedila in pisavo, `color-scheme` (tako da `light-dark()` tokeni
in nativni kontrolniki sledijo temi), in osnovno povezavo. Naloži ga enkrat, pred komponentinimi in proznimi (prose)
slogi, kadar pantoken upravlja stran.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Izpusti ga, ko vgrajuješ komponente v gostitelja, ki že upravlja lastno `html` in `body` —
reset pobarva površino strani, zato nočeš, da se upira gostitelju. Vse, kar nastavi, uporablja
nizko-specificne `:where()` selektorje, zato vedno zmagajo tvoje lastne pravila.

`base.css` _uporablja_ blagovno znamko pisave (`font-family: var(--instui-font-family-base)`, z rezervnimi sistemskimi
pisavami); da jo _naložiš_, uvozi izbirni `fonts.css` — `@font-face` pravila za Atkinson Hyperlegible
Next, ki kažejo na woff2 datoteke, priložene v paketu. Je ločeno, ker so pisave ~350 kB in
samo-hranjenje pisav je premična odločitev.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Vsebina za bralnike zaslona

<p>Po tem stavku sledi skrito sporočilo.<span class="instui-screen-reader-content">Samo bralniki zaslona to razglasijo.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` element vizualno skrije, hkrati pa ga obdrži v drevesu dostopnosti
— za oznake in statusna besedila, ki jih mora asistivna tehnologija prebrati, a jih dizajn ne sme prikazati.

## Pomožna orodja (Utilities)

`utilities.css` je izbirna plast presečnih razredov: primitiv `View`, razmiki po token lestvici, in semantični barvni preglasi. Za razliko od komponentnih `-modifier` razredov, ti uporabljajo **dvojni
pomičnik** (`--mod`), zato nikoli ne trčijo z imeni komponentnih modifikatorjev, in se nanašajo na kateri koli
element — samega ali sestavljenega na komponento.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Površina accent-blue z besedilom on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Poravnano na sredino z mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` je InstUIjev `View`. Je osnova, na katero nanašaš razmike in barvo, in nosi ključ-vrednost modifikatorje za svoje vizualne props, tako da ti ni treba posegati po utilitah:
`-background-*` (njenih površin), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, in `-cursor-*` — to so `view`-ovi lastni
enodashni modifikatorji, neodvisni od spodaj dvoj-dash utilit. Proste vrednosti (width/height/inset) ostanejo kot inline slogi; `margin`/`padding` uporabljata razmike utilit.

**Razmiki** — razredi po straneh na lestvici razmikov. Berejo se kot `{m|p}{side}-{step}`: `m` za
margino ali `p` za padding (ali polni besedi `margin`/`padding`), neobvezna logična stran, nato stopnja. Torej `.--m-lg` in `.--margin-lg` sta enaka, prav tako `.--pt-md` in `.--paddingt-md`.

- Strani: none (vse), `t`/`b` (začetek/konec bloka), `s`/`e` (začetek/konec inline), `x`/`y` (inline/blok
  os). Logične strani ostanejo pravilne v postavitvah desno-levo.
- Stopnje: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` samo za margin.

Združi jih za InstUIjev `margin="small auto large"` okrajšavo:
`class="--mt-sm --mx-auto --mb-lg"`.

**Barva** — semantični preglasi, ki ostanejo na paleti: `.--bg-<name>` (ozadje),
`.--text-<name>` (barva besedila), in `.--border-<name>` (barva obrobe). Vsak `<name>` je
semantičen barvni token — nameni (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus `accent-*` paleta (`accent-blue`, `accent-green` in tako dalje). Ime je prisotno le, če token obstaja v tej družini, zato `text-brand` ni razred — besedilo nima brand tokena. Ni načina, da bi dosegli primitiv ali poljuben hex, in vsak presežek sledi temi.

**Družine tokenov** — vsaka "en token, ena lastnost" družina dobi razred za vsak token, poimenovan po tokenu. Sestavljaj jih poljubno:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (in `-depth1`…`-card`) → `box-shadow`

Vsak nastavi samo svojo eno lastnost, zato `border-width`/`border-radius` potrebujeta `border-*` barvo in slog obrobe, da dejansko narišeta obrobo. Ti uporabljajo polno ime tokena (`.--border-radius-md`), medtem ko barvni in razmikovni pomočniki zgoraj uporabljajo kratke alias-e (`.--bg-brand`, `.--mt-lg`) — alias-i so ergonomski bližnjice; token razredi so dobesedni in izčrpni.

**Postavitev (Layout)** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) in `.--text-align-<value>` (`start`, `center`, `end`, `justify`) pokrivajo InstUIjeve
presečne `display` in `textAlign` props (View, Button, Metric, Tabs, …) kot sestavljivi razredi —
torej ti niso per-komponentni modifikatorji.

Vsak dvoj-dash razred deterministično premaga enako imenovan en-dash komponentni modifikator, ne glede na vrstni red uvoza slogov — glej [Avtorske konvencije](/conventions/authoring)
za mehanizem.

Vse tukaj je čisti CSS, ki ga poganjajo `--instui-*` tokeni, zato sledi InstUI skozi sloj tokenov. Glej [API reference](/api/) za `componentsCss` in gradnike po komponentah.

## Prekrivanja: dialog in popover

Overlay komponente uporabljajo nativne platformne primitive, zato se obnašajo dostopno z malo ali brez
JavaScripta.

**Modal** — postavi `.instui-modal` na nativni `<dialog>`. Dobite fokusno ujetje, `Esc`-za-zapiranje in
`::backdrop` brezplačno; ozadje je zatemnjeno z istim tokenom `--instui-component-mask-background-color`
kot `.instui-mask` (dodaj `-blur` za zmrzovanje). Odpri in zapri z invoker komandami — brez skripta:

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
otroki. Dodaj atribut `open` (ali `-open`) za prikaz pladnja, in uporabi `placement="end"`
(ali `-placement-end`) da ga zaskočiš na inline-end strani — postavitev se reši preko logičnih
`inset-inline-*`/`flex-direction` lastnosti, zato se samodejno obrne pod `dir="rtl"` brez
dodatnih pravil. Focused interaction paket doda usmerjanje Invoker komand in preklopi overlay način
(`should-overlay-tray`), ko širina preseže `--drawer-layout-min-width` (privzeto
`--instui-breakpoints-sm`, nato `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Maska (Mask)** — `.instui-mask` ostane za in-flow overlaye (spinner nad kartico); modalov `::backdrop`
krit pokrije modalni primer.

Oba vzorca sta zavita tudi kot vedenjski prilagojeni elementi v `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` poganjano z atributom `open`) in `<instui-context-view>` (nativni popover).

Podpora brskalnikov: popover API in `popovertarget` so Baseline 2024; invoker komande
(`command`/`commandfor`) so Baseline 2025, zato na starejših brskalnikih poveži gumbe na `dialog.showModal()`
kot enovrstični nadomestek. Pozicioniranje popoverja ob sprožilcu uporablja CSS anchor pozicioniranje tam, kjer je podprto (Chromium); drugje se centira v zgornjem sloju.

## Obrazci (Forms)

**FormField** — `.instui-form-field` je CSS-Grid ovojnica, ki razporedi oznako, kontrolnik in morebitna
sporočila. Položi ga na `<label>`, da se oznaka naravno poveže s svojim kontrolnikom. Ima tri mrežna
območja — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (privzeto) zloži območja navpično; `-layout-inline` postavi oznako ob kontrolnik (nastavi z `-label-align-{start,end}` in `-v-align-{top,middle,bottom}`). `-readonly` prebarva oznako.

**Zvezdica za obvezno polje** se pojavi, ko je polje obvezno bodisi z razredom `-required` _ali_ z
nativnim `required` kontrolnikom znotraj njega — zato lahko preprosto nastaviš `required` na vhod in oznaka se prikaže.
Je dekorativna ( `::after` na oznaki, izven drevesa dostopnosti); spari jo z opombo kot
"polja označena z \* so obvezna", razen če je obrazec jasen sam po sebi.

**FormFieldGroup** — `.instui-form-field-group` združi sorodna polja v `<fieldset>` z
`<legend>` opisom. Je čista postavitev (brez posebnih tokenov): privzeto zloži polja;
`-layout-columns` / `-layout-inline` jih razporedita v odzivne stolpce, z `-row-spacing-*` /
`-col-spacing-*` in `-v-align-*` za prilagoditev mreže.

**RadioInputGroup** — `.instui-radio-input-group` je ista `<fieldset>`/`<legend>` združitev,
specializirana za radio gumbe. Ker otroški radio gumbi delijo `name`, je izbira nativno enovalna —
torej niz preklopnih gumbov deluje kot en kontrolnik, ne kot posamični gumbi. `-variant-simple` (privzeto) razporedi
standardne radio gumbe (`-layout-columns`/`-inline` jih pretvorita v vrstico); `-variant-toggle` poveže
otroške `.instui-radio.-variant-toggle` gumbe v en sam segmentiran kontrolnik (zloženke obrob, zaobljeni zunanji robovi):

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

**Sporočila** — `.instui-form-field-messages` je vsebnik; vsako `.instui-form-field-message` zajema
`-type-*`: `-type-hint` (sivo, privzeto), `-type-error` (rdeče besedilo + krog-alert ikona), `-type-success`
(zeleno besedilo + krog-check ikona), in `-type-screenreader-only` (vizualno skrito, vendar še vedno razglašeno).
Ikone se pobarvajo v `currentColor`, zato vedno sovpadajo s barvo sporočila. `-type-new-error` je
odsvetovan alias za `-type-error`. Poveži vsebnik s kontrolnikom z `aria-describedby`, in nastavi
`aria-invalid` na kontrolnik, ko se pojavi napaka.

Znotraj FormField-a, `-type-error` sporočilo sledi validaciji na odjemalcu: ostane skrito dokler kontrolnik polja ni `:user-invalid` (nativno, po interakciji uporabnika) — ali pa ga prisiliš z `-invalid`
na `.instui-form-field` (za napako na strežniku). Samostojno `.instui-form-field-messages` (ne v polju) ni prizadeto. Fokusni obroč kontrolnika sledi: nevarnost ob `:user-invalid`/`-invalid`,
uspeh ob `-success`.

**Besedilni kontrolniki** — `.instui-text-input` (nativni `<input>`), `.instui-text-area` (nativni `<textarea>`,
spremenljiv velikost), in `.instui-simple-select` (nativni `<select>` s caret) imajo enak videz in ista
stanja: `-invalid` (obroba napake), `-success` (obroba uspeha), `-readonly`, nativni `:disabled`, in
`-size-{sm,md,lg}`. Za prednjo/zadnjo ikono (InstUIjev `renderBeforeInput`/`renderAfterInput`), obleci
input v `.instui-input-group` in dodaj slot `.before`/`.after` ( `-icon-*` glyph); `-should-not-wrap`
ohranja vse v eni vrstici. `.instui-number-input` je ta fasada plus `.arrows` +/- spinner stolpec (nativni
`type="number"`; poveži gumbe na `stepUp()`/`stepDown()`). `.instui-range-input` je stilski
`input[type="range"]`, katere vrednost se izriše v `.instui-range-input-value` inverzni oblaček. Za bogat
combobox s listbox popoverjem se uporabi `@instructure/ui` — ta knjižnica pokriva nativne kontrolnike.

**Stilizirani izbirnik (eksperimentalno)** — izbirni `select.css` nadgradi _isti_
`.instui-simple-select` element: stilira odprt spustni seznam (panel in vsako možnost, z hover in
izbranimi stanji) z uporabo CSS Customizable Select modela.

> [!OPOZORILO]
> `select.css` se opira na `appearance: base-select` / `::picker(select)`, kar je **eksperimentalno**
> (Chrome 135+, še ni Baseline). Pošilja se kot ločen izbirni list in vsako pravilo je zavarovano
> za `@supports (appearance: base-select)`, zato v nepodprtih brskalnikih ne naredi nič — kontrolnik
> `.instui-simple-select` ostane tipični nativni select. Naloži ga samo, če želiš izboljšan spustni seznam in sprejmeš omejeno podporo.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
