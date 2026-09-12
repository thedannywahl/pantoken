# Wahanga

`@pantoken/components` ka tukuna ngā kāhua wahanga ā-kaiwhakahaere i hangaia mai i ngā token Instructure. Kawemai
te tārua kāhua me tohu tō tuhinga — kāore he anga e hiahiatia.

```ts
import "@pantoken/components/components.css";
```

> [!NOTI]
> He pai ake ngā āhuatanga ritenga? `@pantoken/web-components` ka kapi i ēnei kāhua anō hei `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, ā atu — tirohia te
> [mapi mōkī](/api/).

## Tikanga

Ko ngā tikanga CSS i roto i tēnei mōkī e hāngai ana ki tētahi putanga whakarerekētia o [RSCSS](https://ricostacruz.com/rscss/index.html).

Ko ngā whakarerekētanga he **kī-wāriu** — `-<prop>-<val>`, ā, e hāngai ana ki ngā ingoa prop InstUI — nō reira ka pānuitia ngā rātou:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. He ingoa noa ngā prop pāwhiri,
ā, nō te wāhi o te wāhi ko te tikanga `true` (`-has-shadow`, `-clickable`); ka huri atu tētahi
boolean taunoa kua whakaweto (`-without-background`, `-without-border`). Ka whakaae ngā rahi i ngā tuhinga poto me te roa
(`-size-sm` = `-size-small`). Ki te rerekē te ingoa ki InstUI, ka mahi tonu te karaehe InstUI-semantic
engari kua whakahēhia (hei tauira `-variant-info` → whakamahia `-color-info`).

### Tauira

Wahanga React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

wahanga pantoken:

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

Mō te prop `timeout` o InstUI, tautuhia te rawa ritenga-kore `--timeout` hei utu ritenga i ngā hēkona-miriona (milliseconds) ā kawemai
i te mahi whakauru Alert. Mā te uara pōtahi e whakarite te whakakore; `0` (he taunoa) ka waiho te whakatūpato kia
tū tonu. Tāpirihia ngā karaehe `instui-transition -fade-entered` o te āwhina `transition` mō te āhua tītaha o InstUI; kaua e
taapiri mēnā e hiahia ana koe kia tangohia tōmua tonu. Ko te mahi whakauru e taraiwa ana i te āhua `-fade-exiting` ā ka pupūa he
takahanga taea te whakakore, e pākia ana `dismiss` i mua i te tangohanga, kia taea ai e tētahi taupānga te kape `preventDefault()` kia mau tonu te
whakatūpato.

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

Ka whakaaetia e ngā pae ahunga he whakahāngai ritenga mā `--min` (`0` hei taunoa), `--value`, me `--max`
(`100` hei taunoa), me ngā ingoa āta whakahēhia `--value-now` me `--value-max`. Tāpirihia `-should-animate`
kia whakamahi i te panoni-wā-hapāwhā a InstUI i ngā wā katoa e rerekē ana te uara. Kei te taha o `.bar` te `.value` hei
tamariki o te pakiaki; tāpirihia `-render-value-inside` kia whakaatu i runga i te ara, ā, kia taurite ki tō tīmatanga,
arā, angaia mō te pāhekeheke; (hanga kia mārama ki te tae mita). Whakamahia he `<progress>` taketake mō te
rauna tīmatanga-zero ā `<meter>` mēnā kāore te iti rawa i te kore-zero; ka tīpako aunoa ngā wahanga tukutuku i waenga i ēnei
nā rātou ake āhuatanga `min`. Kāore ā InstUI he āhua kore-mōhio, nō reira ko te `<progress>`
kāore i te whai i tana āhuatanga `value` he kiko ā-pantoken anake: `progress-bar` ka nekehia `.bar` hei
wāhanga e neke haere ana ā `progress-circle` ka hurihia tōna pire i tētahi koki pūmau, e huna ana e rātou `.value`.

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

Ka whakaaetia e ngā porowhita ahunga ngā āhua whakarite rite mā `--min`, `--value`, me `--max`.
Kei te noho tonu `--value-now` me `--value-max` hei ingoa mahi kua whakahēhia. Tāpirihia `-should-animate` ā kawemai i te kete mahi aro kia
whakaahua anō i te nekehanga whakatū a InstUI; he whakatā kore-rahua te `--animation-delay`. Ko ngā tuhinga `-should-animate-on-mount` me
`-shold-animate-on-mount` kua whakahēhia e noho tonu hei ingoa mahi.

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

## Tūhono karaehe

E tapaina ana ia karaehe `instui-` mā te taunoa. Hangaia he tārua kāhua me tō ake tūhono — kāore rānei — mā te
tukua `prefix` ki tētahi kaituhi. Ka whakakore te tūhono mehemea he uara hē (`null`, `undefined`, `""`, me te kore
tuku) nō reira ka taea te tuhi `class="heading -level-h1"` mō `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Kāore i te panoni ngā whakarerekētanga tāpiri-tapa (`.-color-secondary`, `.-level-h1`). Ko ngā tārua kāhua i tukuna e te mōkī e pupuri ana i te tūhono `instui`.

## Whakawhāinga

Ko `base.css` he tautuhinga kōwhiringa e tautuhi ana i ngā whakatakotoranga tuhinga ā-ao mai i ngā token: `box-sizing`, he
tautuhinga `body`, te mata whārangi, te tae tuhinga taketake me te momo momotuhi, `color-scheme` (kia haere tahi ngā token `light-dark()` me ngā mana whakahaere
ākuwā), me tētahi hononga tuatahi. Kawemai kia kotahi, i mua i ngā ripanga wahanga me ngā ripanga tuhinga,
mēnā ko pantoken te rangatira o te whārangi.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Whāia kia kaua e whakamahi mēnā kei roto ngā wahanga ki roto i tētahi mana e āta kaupapa ana i tōna ake `html` me `body` —
ka peita te tautuhinga i te mata whārangi, nō reira kāore e tika kia whakahē te mana. E whakamahi ana ngā mea katoa i ngā
kaitono kōwhiringa iti-taumata `:where()`, nō reira ka wini ngā ture ake.

`base.css` _ka tono_ i te momotuhi tohu (`font-family: var(--instui-font-family-base)`, me ngā tūhuratanga pūnaha); ki te _tāuta_ i taua momotuhi, kawemai i te kōwhiringa `fonts.css` — `@font-face` ngā ture mō Atkinson Hyperlegible
Next, e tohu ana ki ngā woff2 kua tukuna i roto i te mōkī. He wehe ia nā te mea he ~350 kB ngā āhua momotuhi
ā, ko te whakatū-motu i ngā momotuhi he whakataunga tūpono.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ihirangi mō te kaipanoni mata

<p>Kei reira tētahi karere huna i muri i tēnei rerenga.<span class="instui-screen-reader-content">Ko ngā kaipanoni mata anake ka pānuitia tēnei.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Kei `.instui-screen-reader-content` te huna-a-whatu i tētahi tūemi ā, engari ka mau tonu i roto i te rakau whakaoranga
— mō ngā tūtohu me ngā kuputuhi ā-tūnga hei pānuihia e ngā taputapu āwhina engari kāore e whakaaturia e te hoahoa.

## Utauta

Ko `utilities.css` he paparanga kōwhiringa o ngā karaehe whakawhiti-kaiwhakararo: he pūtake `View`, te mokowā i runga i te pāmahana token,
me ngā whakaweto tae ā-āhua. Ka rereke i ngā karaehe `-modifier` wahanga, ka whakamahi ēnei i te **tākaro rua** (`--mod`) kia kore e
pureke ki ngā ingoa whakarerekē o tētahi wahanga, ā, ka taea te tono ki runga i tētahi
tūemi — kore whakakapi, kore whakarara rānei.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Mata accent-blue me te kuputuhi on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">I waenganui me te mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` ko te `View` o InstUI. Koinei te turanga ka tukuna ai te mokowā me te tae, ā,
he whakarerekētanga kī-wāriu hoki āna mō ōna ake prop ā-visual kia kaua koe e tūhura ki ngā utauta:
`-background-*` (ōna mata), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, me `-cursor-*` — ko ēnei ngā
whakarerekētanga kahore-tapahi o `view`, kāore e pā ana ki ngā utauta rua-tākaro i raro iho. Ko ngā prop uara-kore (whānui/teitei/taunga) ka noho hei kāhua tuara; whakamahia `margin`/`padding` mō ngā utauta mokowā.

**Mokowā** — ngā karaehe per-taha i runga i te rāpaki mokowā. Pānuitia hei `{m|p}{side}-{step}`: `m` mō
mārōtanga rānei, ā `p` mō te whakamau (ranei ngā kupu katoa `margin`/`padding`), he taha arataki kōwhiringa, ka whai
taahiraa. Nō reira ko `.--m-lg` me `.--margin-lg` he ōrite, ā ko `.--pt-md` me `.--paddingt-md` ano hoki.

- Ngā taha: kāore (katoa), `t`/`b` (tīmatanga/mutu poraka), `s`/`e` (tīmatanga/mutu ā-ipurangi), `x`/`y` (taraiwa ā-ipurangi/poraka).
  Ka tika ngā taha arataki i ngā kaupapa mata-matau ki-matau.
- Ngā taahiraa: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, tae atu ki `auto` mō te mārōtanga anake.

Whakakotahitia rātou mō te pōhoa-whakarāpopoto `margin="small auto large"` o InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Tae** — ngā whakaweto ā-āhua e noho ana i runga-i-te-papamuri: `.--bg-<name>` (mata),
`.--text-<name>` (tae kuputuhi), me `.--border-<name>` (tae paera). Ia `<name>` he
token tae ā-āhua — ngā whāinga (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) me te rārangi `accent-*` (`accent-blue`, `accent-green`, me āna atu). He ingoa
i reira anake mēnā kei te token i taua whānau, nō reira kāore te `text-brand` i te karaehe — kāore te kuputuhi he
token waitohu. Kāore he ara kia toro atu ki tētahi taketake, hex rānei, ā, ka whai ia whakaweto i te kaupapa.

**Ngā whānau token** — ia whānau "kotahi token, kotahi rawa" ka whiwhi karaehe mō ia token, whakamahia āu:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (me `-depth1`…`-card`) → `box-shadow`

Ia mea ka tautuhia anake tana rawa kotahi, nō reira me `border-width`/`border-radius` he tae `border-*` me tētahi āhua paera kia taea te tuhi paera. Ka whakamahia te ingoa token katoa (`.--border-radius-md`), ā, ko ngā awhina tae me mokowā i runga ake ka whakamahi i ngā ingoa poto (`.--bg-brand`, `.--mt-lg`) — ko ngā ingoa poto hei huarahi mārie; ko ngā karaehe token he tino āta.

**Whakanoho** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) me `.--text-align-<value>` (`start`, `center`, `end`, `justify`) e kapi ana i ngā
prop whakawhiti-kai o InstUI (`display` me `textAlign`) (View, Button, Metric, Tabs, …) hei karaehe taea te whakakotahi —
nā reira kāore ēra he whakarerekētanga mō ia wahanga.

Ia karaehe rua-tākaro ka wini i te rerenga whakakotahi ki runga i te whakarerekētanga-taketake kotahi-tākaro
mehemea he ingoa-ōrite, ahakoa te raupapa o ngā tārua kāhua — tirohia [Tikanga Tuhituhi](/conventions/authoring)
mō te pūnaha.

Katoa ēnei he CSS māmā e taraiwa ana i ngā token `--instui-*`, nō reira ka whai mōhio a InstUI mā te paparanga token. Tirohia te [tohu API](/api/) mō `componentsCss` me ngā kaituhi mō ia wahanga.

## Pūroro: matapihi me te popover

Ka whakamahi ngā wahanga pāroro i ngā āhuatanga taketake o te tūāpapa, nō reira ka mahi haumaru me te iti-iti rānei o te
JavaScript.

**Mōhini** — tāpirihia `.instui-modal` ki runga i te `<dialog>` taketake. Ka whiwhi i te maukati aro, `Esc`-kia-mutu,
me tētahi `::backdrop` mō noa; ka pōrearea te papa kua āta marama ki te token `--instui-component-mask-background-color`
pērā i `.instui-mask` (taapirihia `-blur` kia pupuhi). Whakatuwherahia, katingahia mā ngā whakahau invoker — kāore he script:

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

**Tirohanga horopaki / popover** — tāpirihia `.instui-context-view` ki tētahi tūemi `[popover]` ā whakatakahia ki
`popovertarget`. Kei runga i te papa o runga ka whakakorea mārama i te pāpā o waho, te pēhi-mutu rānei, ā, kāore he script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Whakanoho tīwiri** — tāpirihia `.instui-drawer-layout` ki runga i tētahi pākiki whakanoho me ngā tamariki `.tray` me `.content`.
Tāpiri te āhuatanga `open` (rānei `-open`) kia kitea te rēti, ā whakamahia `placement="end"`
(rānei `-placement-end`) kia tūtuki ki te taha-mutu-ipurangi — ka whakatau te tuunga mā ngā taonga arataki
`inset-inline-*`/`flex-direction`, nō reira ka hurihia aunoatia i raro i `dir="rtl"` me kāore he
ture āpiti. Ko te kete mahi aro e tāpiri ana i te ara whakawhiti whakahau Invoker me te hurihanga aratau pāroro
(`should-overlay-tray`) i te wā ka neke te whanui i runga i `--drawer-layout-min-width` (taunoa
`--instui-breakpoints-sm`, ka muri `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Māki** — ko `.instui-mask` mō ngā pāroro e noho ana i roto i te ahunga (he porowhita e runga ana i te kāri); ko te `::backdrop`
o te mōhini ka kapi i te keehi mōhini.

E kapi ana ngā tauira rāua hei āhuatanga ritenga hei ērā atu āhuatanga ritenga i roto i `@pantoken/web-components`:
`<instui-modal open>` (he `<dialog>` e taraiwa ana i tana āhuatanga `open`) me `<instui-context-view>` (he
popover taketake).

Tautoko pūtirotiro: ko te popover API me `popovertarget` he Paerewa 2024; ko ngā whakahau invoker
(`command`/`commandfor`) he Paerewa 2025, nō reira i ngā pūtirotiro tawhito ake me hono ngā pātene ki `dialog.showModal()`
hei tūāki kōwhiringa kotahi-rahi. Ko te tuunga o te popover e pāngia ana e te nohounga ā-āhua CSS anō i ngā wā e tautokohia ana (Chromium); ki ērā atu wāhi ka whakaritea ki te pokapū i te papa o runga.

## Puka

**FormField** — ko `.instui-form-field` he kapi CSS-Grid e whakarite ana i tētahi tūāhua, te mana, me ngā
karere. Tāpirihia ki runga i tētahi `<label>` kia hono ai te tūāhua ki tana mana i te āhua taketake. E toru ngā
awa rapa — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Ko `-layout-stacked` (taunoa) e tāpiritia ana ngā āwa; ka waiho te `-layout-inline` i te tūāhua ki te taha o te mana (whakaritea
mā `-label-align-{start,end}` me `-v-align-{top,middle,bottom}`). Ka hurihia te tae o te tūāhua mā `-readonly`.

Ko te **whetū ake** e puta ana ina whakatōia te mara e _kotahi rānei_ te karaehe `-required` _rānei_ he
mana taketake `required` i roto — nō reira ka taea e koe te whakarite `required` ki runga i te tomo ka puta te tohu.
He tāwhai āhua (he `::after` kei runga i te tūāhua, kaore i roto i te rakau urunga); whakakotahitia kia
hepanuitia he tuhinga pērā i "ko ngā mara kua tohua \* he mea taketake" mēnā kāore te puka e mārama ana nōna.

**FormFieldGroup** — `.instui-form-field-group` e ropera ana i ngā mara hono i roto i tētahi `<fieldset>` me tētahi
whakamārama `<legend>`. He hanga noa (kāore he token motuhake): ka tāpirihia ngā mara ki runga; `-layout-columns` / `-layout-inline` ka mahi i ngā pou whakautu, me `-row-spacing-*` /
`-col-spacing-*` me `-v-align-*` hei whakarite i te rapa.

**RadioInputGroup** — ko `.instui-radio-input-group` te rōpū ōrite `<fieldset>`/`<legend>`,
i whāngaihia mō ngā rēreo. Nā te mea e whakaatu tahi ana ngā rēreo tamariki i te `name`, he kōwhiringa kotahi-taketake te kōwhiri —
nā reira he whakahaere hono ngā pātene hurihuri, ehara i ngā pātene motuhake. Ko `-variant-simple` (taunoa) e whakarite ana i ngā rēreo paerewa (`-layout-columns`/`-inline` e whakakotahi ana rātou ki te rārangi); ko `-variant-toggle` ka hono i ngā
pātene `.instui-radio.-variant-toggle` tamariki ki tētahi mana wehea kotahi (paera puku,
mutunga porotaka):

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

**Karere** — ko `.instui-form-field-messages` te ipu; ia `.instui-form-field-message` ka tango i tētahi
`-type-*`: `-type-hint` (kerei, taunoa), `-type-error` (kuputuhi whero + he tohu porowhita-e whakatūpato), `-type-success`
(kuputuhi kākāriki + he tohu porowhita-tirohanga), me `-type-screenreader-only` (kua tapahia ā-whatu, kua pānuitia anō tonu).
Ka peita ngā tohu i roto i `currentColor`, nō reira ka ōrite tonu ki te tae karere. Ko `-type-new-error` he
ingoa whakahēhia o `-type-error`. Honohia te ipu ki te mana mā `aria-describedby`, ā, tautuhia
`aria-invalid` ki runga i te mana mēnā he hapa.

I roto i tētahi FormField, ka whai te karere `-type-error` i te whakatikatika-ki-te-kiritaki: ka huna tonutia kia tae noa ki te
mana o te mara kia `:user-invalid` (taketake, i muri i te wheako a te kaiwhakamahi) — ranei ka kaha koe mā te `-invalid`
ki runga i te `.instui-form-field` (mō he hapa kaitukutuku). Ko te `.instui-form-field-messages` motuhake (kāore i roto i
tētahi wāhanga) kāore e pā. Ka whai hoki te hoopi aro o te mana: he mōrearea mēnā `:user-invalid`/`-invalid`,
he angitu mēnā `-success`.

**Ngā mana kuputuhi** — ko `.instui-text-input` (taketake `<input>`), `.instui-text-area` (taketake `<textarea>`,
ka taea te whakarerekē), me `.instui-simple-select` (taketake `<select>` me tētahi caret) e tohu ana i tētahi āhua kotahi me ngā āhuatanga ano:
`-invalid` (paera hapa), `-success` (paera angitu), `-readonly`, taketake `:disabled`, me
`-size-{sm,md,lg}`. Mō tētahi tohu ā-mua/ā-muri (ko te `renderBeforeInput`/`renderAfterInput` o InstUI), tāpirihia te tomo ki roto i `.instui-input-group` ā tāpirihia he mokamoka `.before`/`.after` (he tohu `-icon-*`); ka pupuri `-should-not-wrap`
i runga i te rārangi kotahi. Ko `.instui-number-input` taua anga me tētahi column spinner +/- `.arrows` (taketake
`type="number"`; hono ngā pātene ki `stepUp()`/`stepDown()`). Ko `.instui-range-input` he
`input[type="range"]` kua hangaia ā ka whakaatuhia tōna uara i roto i tētahi `.instui-range-input-value` pahū whakarerekē. Mō tētahi combobox rahi me tētahi popover pouaka rārangi, whakamahia `@instructure/ui` — ka kapi tēnei whare i ngā mana taketake.

**Tōpūtanga tīpako kua whakahou (ā-tauwhāiti)** — he `select.css` kōwhiringa e whakahou ana i te _tēnei_
tino `.instui-simple-select`: ka hangaia te ahua o te tūpato tuwhera (te poari me ia kōwhiringa, me ngā āhuatanga pana me te
kōwhiringa kua tīpakotia) mā te tauira CSS Customizable Select.

> [!WHAKAMARAMA]
> Kei te whakawhirinaki `select.css` ki `appearance: base-select` / `::picker(select)`, ā, he **taumahi whakamātautau**
> (Chrome 135+, kāore anō kia Paerewa). Kua tukuna hei ripanga kōwhiringa motuhake ā, kua ārai ia ture ki muri i `@supports (appearance: base-select)`, nō reira kāore he mahi i ngā pūtirotiro kāore e tautoko ana — ko te
> `.instui-simple-select` noa te mana select taketake. Kawemai anake mēnā e hiahia ana koe i te
> pouaka kua whakakikihia ā e whakaae ana koe ki te tautoko iti.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
