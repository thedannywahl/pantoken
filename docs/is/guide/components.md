# Íhlutir

`@pantoken/components` sendir klasa-byggðar stíla fyrir íhluti smíðaða úr Instructure-táknum. Flytjið inn stílafrá og merkjið uppsetninguna ykkar — engin rammaþjónusta nauðsynleg.

```ts
import "@pantoken/components/components.css";
```

> [!ATH]
> Kjósirðu sérsniðna þætti? `@pantoken/web-components` umlykur sömu stíla sem `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og fleiri — sjá
> [pakka-kortið](/guide/packages).

## Venjur

CSS-venjur þessa pakka byggja á breyttri útgáfu af [RSCSS](https://ricostacruz.com/rscss/index.html).

Breytingar eru **lykil-gildi** — `-<prop>-<val>`, samhæfðar við InstUI prop nöfn — svo þær lesa sig sjálfar: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean-prop eru bara prop-nafnið; tilvist merkir `true` (`-has-shadow`, `-clickable`); boolean sem er sjálfgefið á en slökkt snýr ( `-without-background`, `-without-border`). Stærðir taka bæði stutt og löng stafsetningar
(`-size-sm` = `-size-small`). Þar sem nafn víkur frá InstUI virkar InstUI-semantíska klasanum enn
en er úrelt (t.d. `-variant-info` → notaðu `-color-info`).

### Dæmi

Instructure UI React-íhlutur:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken íhlutir:

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

Fyrir InstUI's `timeout` prop, stillið einingalausa `--timeout` sérsniðnu eiginleikann í millisekúndum og hlaðið Alert-samskiptin. Jákvætt gildi skipuleggur sjálfvirka lokun; `0` (sjálfgefið) skilur viðvörunina eftir. Bætið við `transition` gagnsemiinnar `instui-transition -fade-entered` klösum fyrir InstUI's fade; sleppið þeim fyrir tafarlausa fjarlægingu. Samskiptin stjórna `-fade-exiting` ástandinu og skjóta af sér afturkallanlegan,
bólgubundinn `dismiss` atburð áður en fjarlægð, svo forrit geti kallað `preventDefault()` til að halda
viðvöruninni uppsettri.

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

Framvindu-stikur taka hvaða kvarða sem er í gegnum `--min` (`0` sjálfgefið), `--value`, og `--max`
(`100` sjálfgefið), með úreltum `--value-now` og `--value-max` aliasum. Bætið við `-should-animate`
til að beita InstUI hálf-sekúndu umbreytingu þegar gildi breytist. `.value` situr með `.bar` sem
barn rótarinnar; bætið `-render-value-inside` við til að teikna það yfir brautina, raðað við byrjun hennar,
í staðinn (stílið fyrir lesanleika gegn lit mælisins). Notið innbyggða `<progress>` fyrir
núll-byggðan bil og `<meter>` þegar lágmark er ekki núll; vef-íhlutirnir velja milli þeirra
sjálfkrafa úr `min` eiginleikanum sínum. InstUI hefur ekki óákveðið ástand, svo `<progress>`
sem vantar `value` eiginleikann er pantoken-einungis bestu ágiskun: `progress-bar` hreyfir `.bar` sem
rennsli hluta og `progress-circle` snýst hringi á föstum boga, bæði fela `.value`.

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

Framvindu-hringir taka sama óskilyrta kvarða í gegnum `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` verða áfram sem úrelt virkni-aliasar. Bætið við `-should-animate` og
hladdu fókus-samskiptapakka til að endurskapa InstUI's uppsetningar-animasjón; `--animation-delay` er
einingalaus millisekúndu töf. Úreltu stafsetningar `-should-animate-on-mount` og
`-shold-animate-on-mount` verða áfram virkni-aliasar.

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

## Klasa-forskeyti

Hver klassi er nafnrýmið `instui-` sjálfgefið. Byggið stílafrá með ykkar eigin forskeyti — eða ekkert — með því að senda
`prefix` til hvaða smiðs sem er. Hvaða falskt gildi sem er (`null`, `undefined`, `""`, eða að sleppa því) fjarlægir
forskeytið alveg, svo þið getið höfundað `class="heading -level-h1"` í stað `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Kroppunda-breytingarnar (`.-color-secondary`, `.-level-h1`) breytast ekki hvorki né hvernig. Stílafrá sem pakkinn sendir halda áfram að nota `instui` forskeytið.

## Grunnur

`base.css` er valfrjálst endurstillingarlag sem setur hnattræna skjalsstillingu úr táknunum: `box-sizing`, a
`body` endurstillingu, síðuyfirborð, grunn textalit og letur, `color-scheme` (svo `light-dark()` tákn
og innfædd stýringar fylgja þemað), og grunn tengillitur. Hladdu því einu sinni, fyrir íhluta- og texta-
blaðunum, þegar pantoken á síðuna.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Sleppið því þegar þið innbyggið íhluti í hýsli sem þegar þemamyndar sitt eigið `html` og `body` —
endurstillingin mála síðuyfirborðið, svo þið viljið ekki að hún rífist við hýsilinn. Allt sem hún setur notar
lága sértækni `:where()` völd, svo ykkar reglur vinna alltaf.

`base.css` _beitir_ vörumerkjafontinum (`font-family: var(--instui-font-family-base)`, með kerfis-
varaföllum); til að _hlaða_ það, flytjið inn valfrjálsa `fonts.css` — `@font-face` reglur fyrir Atkinson Hyperlegible
Next, sem vísa á woff2 sem fylgja pakkanum. Það er aðskilið því leturgerðirnar eru ~350 kB og
sjálf-hýsa leturgerðir er meðvitaður kostur.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Efni fyrir skjálesara

<p>Það er falin skilaboð eftir þessari setningu.<span class="instui-screen-reader-content">Aðeins skjálesarar tilkynna þetta.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` felur stak sjónrænt en heldur því í aðgengistrénu
— fyrir merki og stöðutexta sem hjálpatækni á að lesa en hönnunin eigi ekki að sýna.

## Hjálparklasar

`utilities.css` er valfrjálst lag af þverskurðarklössum: `View` frumefni, bil á táknakvarða,
og merkingartengdar lita-yfirskriftir. Ólíkt íhluta `-modifier` klösum, nota þessir **tvöfalda
bandstrik** (`--mod`) svo þeir rekist aldrei á eigin breytunöfn íhluta, og þeir eiga við hvaða
stak — autt eða samansett á íhlut.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue yfirborð með on-color texta.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Miðstillt með mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` er InstUI's `View`. Það er grunnurinn sem þú lagar bil og lit á, og það
ber lykil-gildi breytur fyrir eigin sjónræna prop svo þú þarft ekki að sækja í gagnsemi:
`-background-*` (yfirborðin), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — þetta eru `view` eigin
einstreka bandstrik-breytingar, ótengdar við tvöföldu-dash gagnsemina hér að neðan. Frjáls-gildi prop
(breidd/hæð/innfelling) eru áfram inline-stílar; `margin`/`padding` nota bilagagnsemi.

**Bil** — per-hlið klös á bilakvarða. Lesið þau sem `{m|p}{side}-{step}`: `m` fyrir
mörk eða `p` fyrir fyllingu (eða fullu orðin `margin`/`padding`), valkvæð rökrétt hlið, þá
skref. Þannig eru `.--m-lg` og `.--margin-lg` þau sömu, eins og `.--pt-md` og `.--paddingt-md`.

- Hliðar: engin (öll), `t`/`b` (blokk byrjun/enda), `s`/`e` (inline byrjun/enda), `x`/`y` (inline/blokk
  ás). Rökréttar hliðar haldast réttar í hægri-til-vinstri útlögun.
- Skref: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, auk `auto` fyrir einungis margin.

Samsetjið þau fyrir InstUI's `margin="small auto large"` styttingu:
`class="--mt-sm --mx-auto --mb-lg"`.

**Lit** — merkingarbundnar yfirskriftir sem halda á-litapallettunni: `.--bg-<name>` (bakgrunn),
`.--text-<name>` (textalitur), og `.--border-<name>` (rammalitur). Hver `<name>` er
merkingarlitur-tákni — tilgangarnir (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plús `accent-*` pallettan (`accent-blue`, `accent-green`, og svo framvegis). Nafn er aðeins þar ef táknið er til í þeirri fjölskyldu, svo `text-brand` er ekki klasi — texti hefur
ekkert vörumerki-tákni. Ekki er hægt að ná til frumefnis eða handahófs hex, og hver yfirskrift fylgir
þemað.

**Táknafjölskyldur** — hver "einn tákn, eitt eigindi" fjölskylda fær klasa per tákni, nefnd eftir tákninu. Sameina frjálst:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver stillir aðeins eigindi sitt, svo `border-width`/`border-radius` þurfa `border-*` lit og rammastíl til að teikna ramma. Þeir nota fullt táknanafnið (`.--border-radius-md`), á meðan lit- og bil-aðstoðarinnar hér að ofan nota stutt alias (`.--bg-brand`, `.--mt-lg`) — aliasin eru þægilegar flýtileiðir; táknaklassarnir eru bókstaflegir og tæmandi.

**Skipulag** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ná yfir InstUI's
þverskurð `display` og `textAlign` prop (View, Button, Metric, Tabs, …) sem samsetjanlegar klasa —
svo þau eru ekki per-íhluta breytingar.

Allur tvöfalda-dash klassinn vinnur örugglega yfir sama nafna eina-dash íhluta-
breytingu, óháð innflutningsröð stílafráa — sjá [Authoring conventions](/conventions/authoring)
fyrir aðferðafræðina.

Allt hér er hreint CSS knúið af `--instui-*` táknunum, svo það fylgir InstUI í gegnum táknalagið. Sjá [API reference](/api/) fyrir `componentsCss` og per-íhluta smiða.

## Yfirlag: samtalargluggi og popover

Yfirlags-íhlutir nota innfædd pallar, svo þeir hegða sér aðgengilega með litlu eða engu
JavaScript.

**Modal** — settu `.instui-modal` á innfædda `<dialog>`. Það fær fókus-fangelsi, `Esc`-til-loka, og
`::backdrop` frítt; bakgrunnur dökkar með sama `--instui-component-mask-background-color`
tákni og `.instui-mask` (bætið við `-blur` til að frosta). Opnið og lokið með invoker skipunum — engin skrift:

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

**Samhengis-sýn / popover** — settu `.instui-context-view` á `[popover]` stak og kveikið/slökkt með
`popovertarget`. Það rís á efsta lagið og lokar við utanaðkomandi-smelli eða `Esc`, aftur engin skrift:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Skuffulayout** — settu `.instui-drawer-layout` á layout-rót með `.tray` og `.content`
börnum. Bætið við `open` eiginleikanum (eða `-open`) til að sýna bakka, og notið `placement="end"`
(eða `-placement-end`) til að festa hann við inline-end hlið — staðsetningin leysist með rökréttum
`inset-inline-*`/`flex-direction` eiginleikum, svo hún snýr sjálfkrafa undir `dir="rtl"` án
aukareglna. Fókus-samskiptapakkinn bætir Invoker skipanar-routing og rofar yfirlagsham (`should-overlay-tray`) þegar breidd fer yfir `--drawer-layout-min-width` (sjálfgefið
`--instui-breakpoints-sm`, síðan `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Maska** — `.instui-mask` stendur fyrir í-flæði yfirlög (spinner yfir korti); modal's `::backdrop`
nær yfir modal-tilfelli.

Bæði mynstur eru einnig umlykkt sem hegðunar-sérsniðnir þættir í `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` knúinn af `open` eiginleikanum sínum) og `<instui-context-view>` (innfæddur popover).

Vafra-stuðningur: popover API og `popovertarget` eru Baseline 2024; invoker skipanir
(`command`/`commandfor`) eru Baseline 2025, svo á eldri vöfrum tengið hnappana við `dialog.showModal()`
sem eins-lína varatilvik. Staðsetning popover við trigger notar CSS anchor-staðsetningu þar sem stutt (Chromium); annars miðstillist það í efsta laginu.

## Form

**FormField** — `.instui-form-field` er CSS-Grid umbúðir sem leggur út merkimiða, stjórnina og allar
skilaboð. Setjið það á `<label>` svo merkimiðinn tengist stýringunni innfædd. Það hefur þrjú grindarsvæði — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (sjálfgefið) staflar svæðunum; `-layout-inline` setur merkimiðann við hlið stýringar (tún með `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` endurlitar merkimiðann.

**Skylda-stjarna** birtist þegar reiturinn er krafinn af _eða_ `-required` klasanum _eða_
innfæddum `required` stjórn innanhúss — svo þú getur bara sett `required` á inntakið og merktið birtist.
Hún er skrautleg ( `::after` á merkimiðanum, úr aðgengistréinu); paraðu hana við athugasemd eins og
"reitir merktir \* eru skyldir" nema formið sé augljóst.

**FormFieldGroup** — `.instui-form-field-group` hópar skyld reiti í `<fieldset>` með
`<legend>` lýsingu. Það er hreint uppsetning (engin sérstök tákn): sjálfgefið staflar reitunum;
`-layout-columns` / `-layout-inline` flæða þau í aðlagandi dálka, með `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` til að fínstilla grindina.

**RadioInputGroup** — `.instui-radio-input-group` er sama `<fieldset>`/`<legend>` hópun,
sérhæft fyrir radio. Þar sem barn-radio deila `name`, er val innfædd eitt-val —
svo sett af rofabuttunum hegðar sér sem einn stjórn, ekki lausir hnappir. `-variant-simple` (sjálfgefið) raðar
stöðluðum radio ( `-layout-columns`/`-inline` flæða þau í röð); `-variant-toggle` tengir
barna `.instui-radio.-variant-toggle` hnappana í eitt sundurliðað stjórn (samanfallnar rammalínur,
aftari útlínur með brún):

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

**Skilaboð** — `.instui-form-field-messages` er umbúð; hver `.instui-form-field-message` tekur
`-type-*`: `-type-hint` (grátt, sjálfgefið), `-type-error` (rautt texta + hring-bjalla tákn), `-type-success`
(grænt texta + hring-merk tákn), og `-type-screenreader-only` (sjónrænt skorinn, enn tilkynnt). Táknin lita í `currentColor`, svo þau passa alltaf við skilaboðalit. `-type-new-error` er
úrelt alias af `-type-error`. Tengið umbúðirnar við stjórnina með `aria-describedby`, og stillið
`aria-invalid` á stjórnina þegar villa er til.

Innan FormField fylgir `-type-error` skilaboð client-hlið staðfestingu: þau halda sér falin þar til
stýringin er `:user-invalid` (innfædd, eftir notanda hefur haft samskipti) — eða þú neyðir það með `-invalid`
á `.instui-form-field` (fyrir server-hlið villu). Stöðug `.instui-form-field-messages` (ekki í reit) er óáhrifuð. Fokus hringur stjórnarinnar fylgir sömu reglu: hætta þegar `:user-invalid`/`-invalid`,
árangur á `-success`.

**Texta stýringar** — `.instui-text-input` (innfædd `<input>`), `.instui-text-area` (innfædd `<textarea>`,
aðgengjanleg), og `.instui-simple-select` (innfædd `<select>` með bendli) deila sama útliti og sömu
ástandum: `-invalid` (villa-rammi), `-success` (árangur-rammi), `-readonly`, innfædd `:disabled`, og
`-size-{sm,md,lg}`. Fyrir forgrunns/eftirbúna mynd (InstUI's `renderBeforeInput`/`renderAfterInput`), umlykið
inntakið í `.instui-input-group` og bætið `.before`/`.after` rými ( `-icon-*` tákn); `-should-not-wrap`
heldur því á einni línu. `.instui-number-input` er það yfirborð plús `.arrows` +/- spinner dálkur (innfædd
`type="number"`; tengið hnappana við `stepUp()`/`stepDown()`). `.instui-range-input` er stílhreint
`input[type="range"]` sem gildi birtast í `.instui-range-input-value` öfugum bubbl. Fyrir ríkt
combobox með listbox popover, veljið `@instructure/ui` — bókasafnið nær yfir innfæddar stjórnir.

**Stílaður select dropdown (tilraun)** — valfrjáls `select.css` uppfærsla sama
`.instui-simple-select` elementsins: hún stílar opna dropdown (spjaldið og hvern valmöguleika, með hover og
valdanum ástandum) með CSS Customizable Select módeli.

> [!VARÚÐ]
> `select.css` treystir á `appearance: base-select` / `::picker(select)`, sem er **tilraunakennt**
> (Chrome 135+, ekki enn Baseline). Það er sent sem aðskilið valfrjálst blað og hver regla er læst
> bakvið `@supports (appearance: base-select)`, svo það gerir ekkert í óstuddum vöfrum — `.instui-simple-select` stjórninn heldur sig sem venjulegur innfæddur select. Hladdu því aðeins ef þú vilt
> bættan dropdown og samþykkir takmarkaðan stuðning.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
