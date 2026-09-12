# Íhlutir

`@pantoken/components` sendir klasa-bundna íhluta-stíla byggða á Instructure tokenunum. Flytja inn stílsniðið og merkja uppsetninguna — engin ramma þörf.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Viltu frekar sérsniðnar frumur? `@pantoken/web-components` umlykur sömu stíla sem `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, og fleiri — sjá
> [pakka-kortið](/api/).

## Samræmi

CSS-samræmið í þessum pakka byggir á breyttri útgáfu af [RSCSS](https://ricostacruz.com/rscss/index.html).

Breytingar eru **lykil-gildi** — `-<prop>-<val>`, í samræmi við InstUI prop nöfn — þannig að þær lesa sjálfar sig: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolskeið prop eru aðeins prop nafnið, þar sem nærvera þýðir `true` (`-has-shadow`, `-clickable`); sjálfgefinn-on bool sem er slökktur snýr við (`-without-background`, `-without-border`). Stærðir taka bæði stutta og langa stafsetningu
(`-size-sm` = `-size-small`). Þar sem nafn víkur frá InstUI virkar InstUI-merkingin enn
en er úrelt (t.d. `-variant-info` → notaðu `-color-info`).

### Dæmi

Instructure UI React íhluti:

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

Fyrir InstUI's `timeout` prop, stilltu einingalausa `--timeout` sérsniðna eiginleikann í millisekúndum og hlaða Alert gagnvirkni. Jákvætt gildi skipuleggur lokun; `0` (sjálfgefið) skilur viðvörunina á staðnum. Bættu við `transition` gagnsemi `instui-transition -fade-entered` flokkum fyrir InstUI-daempun; slepptu þeim fyrir tafarlausa fjarlægingu. Gagnvirknin stýrir `-fade-exiting` ástandinu og kallar fram aflátanlegt, bubblað `dismiss` atburð áður en fjarlæging, svo forrit geti kallað `preventDefault()` til að halda viðvöruninni festri.

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

Framvindu-stiku taka á móti handahófskenndum skölum í gegnum `--min` (`0` sjálfgefið), `--value`, og `--max`
(`100` sjálfgefið), með úreltum `--value-now` og `--value-max` aliasum. Bættu við `-should-animate`
til að nota InstUI hálfsekúndu umbreytingu þegar gildi breytist. `.value` situr við hlið `.bar` sem
barn rótarinnar; bættu við `-render-value-inside` til að teikna það yfir rennibrautina, stillt að byrjun hennar,
í staðinn (stílun fyrir læsileika á móti lit mælisins). Notaðu innfædda `<progress>` fyrir
núll-miðað svið og `<meter>` þegar lágmark er ekki núll; veffrumurnar velja á milli þeirra
sjálfkrafa frá `min` eiginleikanum. InstUI hefur enga óákveðna stöðu, svo `<progress>`
sem vantar `value` eigindi er pantoken-einstaklings ágiskun: `progress-bar` hreyfir `.bar` sem
rennsli hluta og `progress-circle` snýr hring sinn á föstu bogastigi, bæði fela `.value`.

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

Framvindu-hringir taka við sömu handahófskenndu skölum í gegnum `--min`, `--value`, og `--max`.
`--value-now` og `--value-max` haldast sem úreltar virkar aliasar. Bættu við `-should-animate` og
hlaða bundlu fyrir fókus-gagnvirkni til að endurskapa InstUI upphafs-hreyfingu; `--animation-delay` er
einingalaus millisekúndu töf. Úreltu `-should-animate-on-mount` og
`-shold-animate-on-mount` stafsetningar halda sér sem virkar aliasar.

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

## Forskeyti flokks

Allar klösur eru nafnaflokkaðar `instui-` sjálfgefið. Smíða stílsnið með þínu eigin forskeyti — eða engu — með því að senda
`prefix` í hvaða byggjara sem er. Sérhvert falskt gildi (`null`, `undefined`, `""`, eða að sleppa því) fjarlægir
forskeytið alveg, svo þú getur ritað `class="heading -level-h1"` í stað `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Skilgreint-dash breytur (`.-color-secondary`, `.-level-h1`) breytast ekki hvorki né. Stílsniðin sem pakkinn sendir halda
`instui` forskeytinu.

## Grunnur

`base.css` er valkvætt endurstillingarlag sem setur global skjalsjálfgefnar stillingar frá tokenunum: `box-sizing`, a
`body` endurstilling, síðu-yfirborð, grunn textalit og letur, `color-scheme` (svo `light-dark()` tokenar
og innfæddir stýringar elti þemað), og grunntengill. Hlaða því einu sinni, fyrir íhluta- og prósa
blaða, þegar pantoken á síðuna.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Slepptu því þegar þú innbyrðir íhluti í hýsi sem hefur þegar sitt eigið `html` og `body` —
endurstillingin málar síðuyfirborðið, svo þú vilt ekki að hún berist gegn gestgjafanum. Allt sem hún setur notar
lágsértækar `:where()` vafranir, svo þínar reglur vinna alltaf.

`base.css` _varðar_ vörumerkis-lituð letur (`font-family: var(--instui-font-family-base)`, með kerfis-
varnarfalli); til að _hlaða_ það, flytja inn valfrjálsa `fonts.css` — `@font-face` reglur fyrir Atkinson Hyperlegible
Next, sem vísa á woff2 skrár sem fylgja pakkanum. Það er aðskilið vegna þess að leturflokkarnir eru ~350 kB og
sjálf-hýsing letur er meðvitað val.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Efni fyrir skjálesara

<p>Það er falin skilaboð eftir þessa setningu.<span class="instui-screen-reader-content">Aðeins skjálesarar kynna þetta.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` felur þátt sjónrænt en heldur því í aðgengistrénu
— fyrir merkingar og stöðutexta sem hjálpartækni ætti að lesa en hönnunin ætti ekki að sýna.

## Hjálparverkfæri

`utilities.css` er valkvætt lag af þverskurðarlögum: `View` frumefni, bil á token-kvarða,
og merkingarlit-yfirskrár. Ólíkt íhluta `-modifier` flokkum, nota þessi **tveggja
dash** (`--mod`) svo þau rekast aldrei á nafn breytna íhluta, og þau gilda á hvaða
þátt sem er — ber, eða sett saman á íhluta.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue yfirborð með on-color texta.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Miðja með mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` er InstUI's `View`. Það er grunnurinn sem þú lagðir bil og lit ofan á, og það
ber lykil-gildi breytur fyrir eigin sjónræna prop svo þú þarft ekki gagnsemi:
`-background-*` (yfirborð þess), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, og `-cursor-*` — þetta eru `view`'s eigin
ein-dash breytur, óskylt tvö-dash hjálparverkfærunum hér að neðan. Frjáls-gildi prop
(breidd/hæð/innsetning) eru áfram innlínustílar; `margin`/`padding` nota bil-hjálparverkfærin.

**Bilsýning** — per-hlið flokkarnir á bilakvarðanum. Lesið þau sem `{m|p}{side}-{step}`: `m` fyrir
mörk eða `p` fyrir púða (eða full orð `margin`/`padding`), valfrjáls rökstefna, síðan
skref. Svo `.--m-lg` og `.--margin-lg` eru það sama, eins og `.--pt-md` og `.--paddingt-md`.

- Hliðar: engin (öll), `t`/`b` (blokkar byrjun/endi), `s`/`e` (innlínubyrjun/endi), `x`/`y` (innlína/blokk
  ás). Rökstefnulegar hliðar haldast réttar í hægri-til-vinstri útlitum.
- Skref: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, auk `auto` aðeins fyrir mörk.

Samið þau fyrir InstUI's `margin="small auto large"` stuttskammti:
`class="--mt-sm --mx-auto --mb-lg"`.

**Litur** — merkingarlysingar sem halda sér á litatöflu: `.--bg-<name>` (bakgrunnur),
`.--text-<name>` (textalitur), og `.--border-<name>` (rammalitur). Hver `<name>` er
merkingarlitur-token — ætlarnir (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plús `accent-*` pallurinn (`accent-blue`, `accent-green`, og svo
framvegis). Nafn er aðeins til ef tokenið er í þeirri fjölskyldu, svo `text-brand` er ekki flokkur — texti hefur
ekkert vörumerki token. Engin leið er að ná til frumefnis eða handahófs hex, og hvert yfirskrift fylgir
þemanum.

**Token-fjölskyldur** — hver "einn token, ein eign" fjölskylda fær flokk per token, nefnd eftir tokeninu. Samsettu þau frjálslega:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (og `-depth1`…`-card`) → `box-shadow`

Hver stillir aðeins sína eina eign, svo `border-width`/`border-radius` þurfa `border-*` lit og rammastíl til að teikna ramma. Þessi nota fulla token-nafnið (`.--border-radius-md`), á meðan lit- og bil-aðstoðarverkfærin hér að ofan nota stutt alias (`.--bg-brand`, `.--mt-lg`) — aliasin eru þægileg styttingar; token-flokkarnir eru bókstaflegir og tæmandi.

**Uppsetning** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) og `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ná yfir InstUI's
þverskurðar `display` og `textAlign` prop (View, Button, Metric, Tabs, …) sem samsetjanlega flokka —
svo þau eru ekki per-íhluta breytur.

Allur tvö-dash flokkurinn vinnur ákvörðunarbundið yfir sama nafn ein-dash íhluta
breytu, óháð innflutningsröð stílsniðs — sjá [Ritunarsamræmi](/conventions/authoring)
fyrir vélafræðina.

Allt hér er hreint CSS knúið af `--instui-*` tokenunum, svo það eltir InstUI í gegnum token-lagið. Skoðaðu [API heimildina](/api/) fyrir `componentsCss` og per-íhluta byggjara.

## Yfirlag: gluggi og popover

Yfirlag-íhlutir nota innfæddar pallgrundargerðir, svo þeir haga sér aðgengilega með litlu eða engu
JavaScript.

**Modal** — settu `.instui-modal` á innfædda `<dialog>`. Hún fær fókus-fangelsi, `Esc`-til-loka, og
`::backdrop` ókeypis; bakgrunnur er dimbda með sama `--instui-component-mask-background-color`
token og `.instui-mask` (bættu við `-blur` til að frosta hann). Opnaðu og lokaðu með kveikjuskömmtum — engin skrift:

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

**Samhengi-sýn / popover** — settu `.instui-context-view` á `[popover]` þátt og skiptu um með
`popovertarget`. Hún rís á efsta lagið og lokast með klikkun utan eða `Esc`, aftur engin skrift:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Skúffu-uppsetning** — settu `.instui-drawer-layout` á uppsetningarót með `.tray` og `.content`
börnum. Bættu við `open` eiginleikanum (eða `-open`) til að sýna skúffuna, og notaðu `placement="end"`
(eða `-placement-end`) til að festa hana við inline-end hliðina — staðsetning leysist með rökstefnu
`inset-inline-*`/`flex-direction` eiginleikum, svo hún snýr sjálfkrafa undir `dir="rtl"` án
viðbótar reglna. Fókusaða gagnvirknibundlan bætir Invoker skipanalagnir og skipta yfir á yfirlagsham
(`should-overlay-tray`) þegar breidd fer yfir `--drawer-layout-min-width` (sjálfgefið
`--instui-breakpoints-sm`, þá `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Maska** — `.instui-mask` stendur fyrir innrennslis yfirlagi (spinner yfir spil), modal's `::backdrop`
kemur fyrir modal tilvik.

Báðar mynstur eru einnig pakkaðar sem hegðunar-sérsniðnar frumur í `@pantoken/web-components`:
`<instui-modal open>` (a `<dialog>` knúin af `open` eiginleikanum) og `<instui-context-view>` (innfæddur popover).

Vafra styður: popover API og `popovertarget` eru Baseline 2024; invoker skipanir
(`command`/`commandfor`) eru Baseline 2025, svo á eldri vöfrum tengdu hnappana við `dialog.showModal()`
sem eina línu fallback. Staðsetning popover við kveikju notar CSS anchor staðsetningu þar sem studdur (Chromium); annars miðjar hún í efsta laginu.

## Form

**FormField** — `.instui-form-field` er CSS-Grid umbúðari sem leggur upp merkimiða, stýringuna, og skilaboð. Settu það á `<label>` svo merkimiði tengist stýringunni innfædd. Það hefur þrjú net
svæði — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (sjálfgefið) staflar svæðunum; `-layout-inline` setur merkimiða við hlið stýringar (fínstilltu
með `-label-align-{start,end}` og `-v-align-{top,middle,bottom}`). `-readonly` endurlaritar merkimiðann.

**Þarf asterisk** birtist þegar reiturinn er krafinn af _annaðhvort_ `-required` klasa _eða_
innfætt `required` stýring innan hans — svo þú getur einfaldlega sett `required` á inntakið og merkið sýnist.
Það er skrautlegt ( `::after` á merkimiðanum, utan aðgengistrés); paraðu það með athugasemd eins og
"reitir merktir \* eru krafðir" nema formið sé augljóst sjálft.

**FormFieldGroup** — `.instui-form-field-group` hópar tengda reiti í `<fieldset>` með
`<legend>` lýsingu. Þetta er hreint uppsetning (engin token): sjálfgefið staflar reitunum;
`-layout-columns` / `-layout-inline` flæða þau í móttækilegum dálkum, með `-row-spacing-*` /
`-col-spacing-*` og `-v-align-*` til að fínstilla netið.

**RadioInputGroup** — `.instui-radio-input-group` er sama `<fieldset>`/`<legend>` hópun,
sérsniðin fyrir hringval. Vegna þess að barnahringarnir deila `name`, er val innfæddlega einu-val —
svo sett af rofa-hnöppum hegðar sér sem ein stýring, ekki lausir hnappir. `-variant-simple` (sjálfgefið) leggur
upp staðlaða hringi (`-layout-columns`/`-inline` flæða þá í röð); `-variant-toggle` tengir
barn `.instui-radio.-variant-toggle` hnappana í eina klofna stýringu (samanfallandi rammar,
hnöttuð ytri endar):

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

**Skilaboð** — `.instui-form-field-messages` er ílát; hvert `.instui-form-field-message` tekur
`-type-*`: `-type-hint` (grátt, sjálfgefið), `-type-error` (rautt texta + hringsviðvöru tákn), `-type-success`
(grænt texta + hringsathugun tákn), og `-type-screenreader-only` (sjónrænt klippt, enn tilkynnt). Táknin lita í `currentColor`, svo þau passa alltaf við skilaboðalit. `-type-new-error` er
úrelt alias af `-type-error`. Tengdu ílátið við stýringuna með `aria-describedby`, og stilltu
`aria-invalid` á stýringunni þegar villa er til.

Innan FormField fylgir `-type-error` skilaboð við staðbundna viðskiptavina-staðfestingu: það er falið þar til
stýring reitsins er `:user-invalid` (innfædd, eftir að notandi hefur haft samskipti) — eða þú neyðir það með `-invalid`
á `.instui-form-field` (fyrir þjónustu-hlið villu). Stak `.instui-form-field-messages` (ekki í reit) er óáreittur. Fókus hringur stýringar fylgir sömu reglu: hætta þegar `:user-invalid`/`-invalid`,
árangur á `-success`.

**Texta stýringar** — `.instui-text-input` (innfædd `<input>`), `.instui-text-area` (innfædd `<textarea>`,
breytanleg), og `.instui-simple-select` (innfædd `<select>` með setningarstaf) deila sama útliti og sömu
ástandum: `-invalid` (villa rammann), `-success` (árangur ramma), `-readonly`, innfædd `:disabled`, og
`-size-{sm,md,lg}`. Fyrir for- eða eftirlits tákn (InstUI's `renderBeforeInput`/`renderAfterInput`), umbúðu
inntakið í `.instui-input-group` og bættu við `.before`/`.after` sloti ( `-icon-*` tákn); `-should-not-wrap`
heldur því á einni línu. `.instui-number-input` er sú fasöð auk `.arrows` +/- spinner dálks (innfædd
`type="number"`; tengdu hnappana við `stepUp()`/`stepDown()`). `.instui-range-input` er stíluð
`input[type="range"]` þar sem gildi birtist í `.instui-range-input-value` öfugri blöðru. Fyrir ríka
combobox með listbox popover, notaðu `@instructure/ui` — þetta bókasafn nær yfir innfæddar stýringar.

**Stílaður select valmynd (tilraunaverkefni)** — valfrjálsi `select.css` uppfærir _sama_
`.instui-simple-select` þáttinn: það stílar opna valmyndina (spjaldið og hverja valkost, með hover og
valin ástand) með CSS Customizable Select módeli.

> [!WARNING]
> `select.css` reiðir sig á `appearance: base-select` / `::picker(select)`, sem er **tilraunakennt**
> (Chrome 135+, ekki enn Baseline). Það er sent sem sérvalið blað og hver regla er læst bakvið `@supports (appearance: base-select)`, svo hún gerir
> ekkert í óstuddum vöfrum — `.instui-simple-select` stýringin helst einfaldlega venjuleg innfædd select. Hlaða því aðeins ef þú vilt
> aukna valmynd og samþykkir takmarkaða stuðninginn.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
