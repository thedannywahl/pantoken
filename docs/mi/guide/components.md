# Ngā Wāhanga

`@pantoken/components` ka tuku kāhua wāhanga i runga i ngā karaehe i hangaia mai i ngā tohe Instructure. Kawemai
te pepa-kāhua ka tapiri i tō tohu — kāore he anga tūtohu e hiahiatia.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> He pai ake ngā wāhanga ritenga? Kōpiritia e `@pantoken/web-components` ēnei kāhua anō hei `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, me ētahi atu — tirohia te
> [mapa kete](/guide/packages).

## Ngā Tikanga

Ko ngā tikanga CSS i roto i tēnei kete e hāngai ana ki tētahi putanga whakarerekētia o [RSCSS](https://ricostacruz.com/rscss/index.html).

Ko ngā whakakāhoretanga he **kī-uara** — `-<prop>-<val>`, e hāngai ana ki ngā ingoa propa InstUI — nō reira ka pānuitia
mō rātou anō: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Ko ngā prop
pūtātea he ingoa prop anake, ā, ko te noho mai o te mea e tohu ana `true` (`-has-shadow`, `-clickable`);
ko te pūtātea-taunoa kua whakaweto ka huri rānei (`-without-background`, `-without-border`). Ka whakaaehia ngā rahi i ngā
spelling poto me te roa (`-size-sm` = `-size-small`). Ki te rereke te ingoa i te InstUI, ka mahi tonu te karaehe whai tikanga
o InstUI engari kua whakakorehia te whakamahi (hei tauira `-variant-info` → whakamahia `-color-info`).

### Tauira

Wāhanga React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken components:

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

Mō te prop `timeout` o InstUI, tautuhia te rawa ritenga ahurei `--timeout` me te kore wāhanga i roto i ngā hēkona-miriona ka uta
i te taunekeneke Alert. Mā te uara pūmanawa e whakarite te whakakore; `0` (te taunoa) ka waiho tonu te whakatūpato i te
wāhi. Tāpirihia ngā karaehe `instui-transition -fade-entered` o te raupaparorohiko `transition` mō te whakaheke-āhua o InstUI; kaua e tāpiri mō te
whakakore tonu. Ko te taunekeneke e whakahaere ana i te āhua `-fade-exiting` me te tuku i tētahi kaupapa whakamutu,
e rewa ana `dismiss` i mua i te tangohanga, nō reira ka taea e tētahi taupānga te waea `preventDefault()` kia noho tonu te
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

E whakaaehia ana e ngā pae ahunga te whānuitanga ritenga mā `--min` (`0` hei taunoa), `--value`, me `--max`
(`100` hei taunoa), me ngā ingoa āwhina kua whakakorehia `--value-now` me `--value-max`. Tāpirihia `-should-animate`
kia hoatu te panoni haurua-hēkona a InstUI ina hurihia te uara. `.value` ka noho i te taha o `.bar` hei
tamaiti o te pakiaka; tāpirihia `-render-value-inside` kia whakaahuatia tēnei i runga i te ara, kia taurite ki tōna tīmatanga,
nā te tikanga (whakaritehia kia kākāriki ki te tae mita). Whakamahia tētahi `<progress>` taketake hei
awhe tūnga-kore, me `<meter>` ina kore-zero te iti rawa; ka tīpako a ngā wāhanga paetukutuku i waenga i ēnei mā te āhuatanga `min` arotahi. Kāore he āhua kore-tau i roto i InstUI, nō reira ko te `<progress>`
kore ana te āhuatanga `value` he tatauranga-a-pantoken anake: `progress-bar` ka whakamāhorahora i `.bar` hei
wāhanga hīrere, ā `progress-circle` ka hurihuri i tōna mekameka i tētahi kokonga tūnga, e huna ana hoki `.value`.

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

E whakaaehia ana hoki e ngā porowhita pae te taua whānuitanga mā `--min`, `--value`, me `--max`.
Kei te noho hei āwhina mahi tonu ngā `--value-now` me `--value-max` kua whakakorehia. Tāpirihia `-should-animate` ka
uta i te kohinga taunekeneke arotahi kia hanga anō te whakatūnga whakauru o InstUI; ko `--animation-delay` he whakatā-kore wā ahurei. Kei te noho hei ingoa
āwhina mahi tonu ngā `-should-animate-on-mount` me `-shold-animate-on-mount` kua whakakorehia.

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

## Tohu karaehe

Ka āhukahuka ia karaehe ki te ingoa ā- momo `instui-` hei taunoa. Hangaia tētahi pepa-kāhua me tō ake tūmataraa — kāore ranei — mā te
tuku `prefix` ki tētahi kaiwhakakī. Mēnā he uara pāheke (`null`, `undefined`, `""`, rānei kia waiho), ka
tango katoa te tūmataraa, nō reira ka taea te kaituhi `class="heading -level-h1"` hei utu mō `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Ko ngā whakakāhoretanga te-pāpāho tetahi-tae (`.-color-secondary`, `.-level-h1`) kāore i huri ahakoa pēhea. Ko ngā
pepa-kāhua i tukuna e te kete e pupuru tonu ana i te tūmataraa `instui`.

## Turanga

Ko `base.css` he whirihora kōwhiringa e tautuhi ana i ngā taunoa tuhinga o te tuhinga mai i ngā tohe: `box-sizing`, he
whakaweto `body`, te mata whārangi, te tae tuhinga turanga me te momotuhi, `color-scheme` (nā reira ka whai tohu `light-dark()` me ngā tūemi mana nō te pūnaha),
me tētahi hono tūpato turanga. Utaia kotahi anake, i mua i ngā pepa wāhanga me te pepa tuhi
ina ko pantoken te rangatira o te whārangi.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Kaua e utaina ina whakauru koe i ngā wāhanga ki tētahi mana ahakoa e whakarite ana i āna ake `html` me `body` — ka whakakākahuria te whakaahua whārangi e te whakaweto, nō reira kāore koe e hiahia kia whakataetae te mana. Ko ngā mea katoa e tautuhia ana e ia e whakamahi ana i ngā
kōwhiringa kaha-iti `:where()`, nō reira ka manumanu tonu āu ake ture.

Ko `base.css` e tau ana te momotuhi waitohu (`font-family: var(--instui-font-family-base)`, me ngā
taumata pūnaha tairitenga); kia _uta_ ia, kawemai te `fonts.css` kōwhiringa — `@font-face` ture mō Atkinson Hyperlegible
Next, e tohu ana ki ngā woff2 kua tukuna i roto i te kete. He motuhake nā te mea ko ngā āhuatanga he ~350 kB
ā, ā, ko te manaaki ake i ngā momotuhi he kōwhiringa whai whakaaro.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ihirangi kaituhi mata

<p>Kei reira tētahi karere huna muri i tēnei rerenga.<span class="instui-screen-reader-content">Ko ngā kaituhi mata anake e pānui nei.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

Kei te huna e `.instui-screen-reader-content` tētahi wāhanga i te tirohanga ahakoa ka waiho ia i roto i te rākau tūnga —
mō ngā tūtohu me ngā kuputuhi tūnga e pānuitia ana e ngā taputapu āwhina engari kāore e whakaatuhia e te hoahoa.

## Ngā Rauemi

Ko `utilities.css` he papanga kōwhiringa o ngā karaehe whakawhiti-whakakapi: tētahi pūmua `View`, te wāhi i runga i te
taumata tohu, me ngā whakaweto tae whai tikanga. Ka rereke ki ngā karaehe `-modifier` wāhanga, ka whakamahi ēnei he **tawhito rua**
(`--mod`) kia kaua rātou e tūtaki ki ngā ingoa whakakāhoretanga o tētahi wāhanga, ā, ka taea te tono ki runga i tētahi
wāhanga — ā-tuhi, rānei kua hangaia ki runga i tētahi wāhanga.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Te mata ā-papura-accent me te kuputuhi on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Whakakotahi ki waenga mā te mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — ko `.instui-view` te `View` o InstUI. Koia te turanga e whakauruhia ai te wāhi me te tae, ā, ka
pūtaha i ngā kī-uara mō ōna ake āhuatanga ā-visual kia kore koe e hiahia ki ngā utilities:
`-background-*` (ōna mata), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, me `-cursor-*` — ko ēnei ngā
whakakāhoretanga tokorua-tae-a-`view` anō, kāore e pā ki ngā utilities rua-tae i raro. Ko ngā prop uara-kore
(whānui/teitei/taunga) ka mau tonu hei kōrero ā-ipurangi; `margin`/`padding` whakamahia ngā utilities wāhi.

**Whakatau Wāhi** — ngā karaehe mō ia taha i runga i te tauine wāhi. Pānuitia hei `{m|p}{side}-{step}`: `m` mō
margin rānei `p` mō te padding (rānei ngā kupu katoa `margin`/`padding`), tētahi taha whakarite,
ā, tētahi hipanga. Nō reira ko `.--m-lg` me `.--margin-lg` he ōrite, ā ko `.--pt-md` me `.--paddingt-md` ano hoki.

- Ngā taha: kāore (katoa), `t`/`b` (tīmata/whakamutunga poraka), `s`/`e` (tīmata/whakamutunga tuhinga), `x`/`y` (tuaka tuhinga/poraka). Ka tika tonu ngā taha whai tikanga i ngā whakatakotoranga mata-matau-ki-te-matana.
- Ngā hipanga: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, me `auto` mō te margin anake.

Whakakotahitia ērā mō te kupu poto `margin="small auto large"` o InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Tae** — ngā whakaweto whai tikanga e noho ana i runga i te papa tae: `.--bg-<name>` (papamuri),
`.--text-<name>` (tae kuputuhi), me `.--border-<name>` (tae here). Ia `<name>` he
taonga tae whai tikanga — ngā whāinga (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) me te kāhui `accent-*` palette (`accent-blue`, `accent-green`, me ērā atu). Ko te ingoa kei reira anake mēnā kei te token taua whenua i taua whānau, nō reira kāore te `text-brand` he karaehe — kāore he token waitohu mō te tuhinga. Kāore he huarahi ki te toro atu ki tētahi kawenga nohonga rānei he hex arā-tonu, ā ia whakaweto ka whai i te kaupapa.

**Ngā whānau token** — ia whānau "kotahi token, kotahi rawa" ka whiwhi karaehe mō ia token, kua ingoa i muri i te
token. Whakakotahitia kia āta:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (me `-depth1`…`-card`) → `box-shadow`

Ia mea ka tautuhi anake i tana rawa kotahi, nō reira me tētahi `border-*` tae me tētahi momo here kia kitea tētahi here tūturu mō `border-width`/`border-radius`. Ka whakamahi ēnei i te ingoa token katoa (`.--border-radius-md`), ā, ko ngā āwhina tae me wāhi i runga ake nei ka whakamahi i ngā ingoa pātea (`.--bg-brand`, `.--mt-lg`) — he poto ngā āwhina; ko ngā karaehe token he pūmuri me te kapi katoa.

**Raupaparanga** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) me `.--text-align-<value>` (`start`, `center`, `end`, `justify`) e kapi ana i ngā
prop whakawhiti-whakakāhore o InstUI (`display` me `textAlign`) (View, Button, Metric, Tabs, …) hei karaehe ka taea te whakakotahi —
nā reira ehara ēnei i te whakakāhoretanga mō ia wāhanga.

Ka toa tonu te karaehe rua-tae i te takiwā i runga i tētahi whakakāhoretanga wahanga-rua-tae kotahi-namu, ahakoa te raupapa uta pepa-kāhua — tirohia [Ngā tikanga kaituhi](/conventions/authoring)
mō te mekameka.

Ko ngā mea katoa i konei he CSS mārama e whakahaerehia ana e ngā token `--instui-*`, nō reira ka whai te papa kōrero InstUI mā te paparanga token.
Tirohia te [tohu API](/api/) mō `componentsCss` me ngā kaiwhakakī per-wāhanga.

## Ngā Tāpiri: kairere me popover

Ka eke ngā wāhanga tāpiri ki ngā pūnaha taketake o te tūmau, nō reira ka whanonga haumaru me te iti rawa te
JavaScript.

**Modal** — tāpirihia `.instui-modal` ki runga i tētahi `<dialog>` taketake. Ka riro māna te paparanga rēinga, te `Esc`-kia-kati, me tētahi
`::backdrop` hei kore utu; ka mākona te papamuri me te token `--instui-component-mask-background-color`
tahi me `.instui-mask` (tāpiri `-blur` kia mārō). Whakatuwherahia, kati mā ngā whakahau invoker — kāore he skripti:

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

**Context view / popover** — tāpirihia `.instui-context-view` ki runga i tētahi `[popover]` āhua ka hurihia mā
`popovertarget`. E tū ana i runga i te papa o runga ka whakamāharatia mā te pāwhiri i waho rānei `Esc`, ā, kāore he skripti:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Rārapa drawer** — tāpirihia `.instui-drawer-layout` ki runga i tētahi pakiaka whakarite me ngā tamariki `.tray` me `.content`.
Tāpiri te āhuatanga `open` (rānei `-open`) kia whakaatu i te ipu, ā, whakamahia `placement="end"`
(rānei `-placement-end`) kia taurite ki te taha mutunga-ipurangi — ka whakatauhia te tuunga mā ngā
taonga `inset-inline-*`/`flex-direction` whai tikanga, nō reira ka hurihia aunoa i raro i `dir="rtl"` me te kore ture taapiri. Ko te kohinga taunekeneke arotahi ka tāpiri i te ara whakahau Invoker me te hurihuri i te aratau tāpiri
(`should-overlay-tray`) ina wehe te whanui i te `--drawer-layout-min-width` (taunoa
`--instui-breakpoints-sm`, katahi `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — ka whakamahia te `.instui-mask` mō ngā tāpiri e rere ana i roto i te toka (he topata i runga i tētahi kāri); ko te `::backdrop`
o te modal ka kapi i te wā o te modal.

E whakakapi ana ēnei tauira hei wāhanga ritenga whai whanonga i `@pantoken/web-components`:
`<instui-modal open>` (he `<dialog>` e whakahaerehia ana e tōna āhuatanga `open`) me `<instui-context-view>` (he
popover taketake).

Tautoko pūtirotiro: ko te API popover me `popovertarget` he Paerewa 2024; ko ngā whakahau invoker
(`command`/`commandfor`) he Paerewa 2025, nō reira i runga i ngā pūtirotiro tawhito ka hono noa ngā pātene ki `dialog.showModal()`
hei whakahokia-kotahi. Ko te tūunga i tētahi popover i te taha o tōna whakaoho ka whakamahi i te tūnga piri CSS i runga i te tautoko (Chromium);
ki ērā wāhi ka arotahi ki te papa o runga.

## Ngā Puka

**FormField** — ko `.instui-form-field` he wrapa CSS-Grid e whakatakoto ana i tētahi tapanga, te mana, me ngā karere katoa. Tāpirihia ki runga i tētahi `<label>` kia hono te tapanga ki tōna mana māori. Kei a ia e toru ngā wāhi rārangi — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

Ko `-layout-stacked` (taunoa) ka tūteke ngā wāhi; ko `-layout-inline` ka whakaatu te tapanga i te taha o te mana (whakaritea mā te `-label-align-{start,end}` me `-v-align-{top,middle,bottom}`). Ka whakarerekē te tae o te tapanga mā te `-readonly`.

Ko te **asterisk taketake** ka puta ina hiahiatia te mara mā _tētahi_ o te karaehe `-required` _rānei_ mā tētahi
mana `required` taketake kei roto — nō reira ka taea noa te whakarite `required` ki runga i te kōkiri kia whiwhi te tohu.
He whakapaipai (he `::after` ki runga i te tapanga, kei waho o te rākau uru); hono atu ki tētahi tūtohu pēnei
"ko ngā wāhanga kua tohu \* he hiahiatanga" mēnā kāore te puka e tino mārama ana.

**FormFieldGroup** — ko `.instui-form-field-group` ka tāpiri i ngā wāhanga whai hononga ki tētahi `<fieldset>` me tētahi
whakamārama `<legend>`. He mahinga whakatakoto noa (kāore he token motuhake): ko te tūtohi taunoa ka tūteke i ngā wāhanga;
`-layout-columns` / `-layout-inline` ka whakarite i ngā wāhanga ki roto i ngā pou urupare, me `-row-spacing-*` /
`-col-spacing-*` me `-v-align-*` hei whakaniko i te rārangi.

**RadioInputGroup** — ko `.instui-radio-input-group` te taua kōpiritanga `<fieldset>`/`<legend>`,
kua motuhia mō ngā irarangi. Nā te mea ka whakapaehia e ngā irarangi tamariki tētahi `name`, he kōwhiringa kotahi-taonga ā-tangata —
nā reira ka mahi tētahi huinga pātene tāwhiti hei kotahi mana, ehara i ngā pātene wehe. Ko `-variant-simple` (taunoa) ka whakarite
i ngā irarangi paerewa (`-layout-columns`/`-inline` ka whakawhānui ki te rārangi); ko `-variant-toggle` ka hono i ngā
pātene `.instui-radio.-variant-toggle` tamariki hei mana wāhanga kotahi (ngawari ngā here,
pōro o waho):

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

**Ngā Karere** — ko `.instui-form-field-messages` te ipu; ia `.instui-form-field-message` ka tango i tētahi
`-type-*`: `-type-hint` (kōura, taunoa), `-type-error` (kuputuhi whero + ata porowhita-tūpuni), `-type-success`
(kuputuhi kākāriki + ata porowhita-tīkina), me `-type-screenreader-only` (kāore e kitea i te tirohanga, engari ka pānuitia tonu).
Ka peitahia ngā ata i roto i `currentColor`, nō reira ka taurite tonu ki te tae karere. Ko `-type-new-error` he ingoa kua whakakorehia mō `-type-error`. Honohono te ipu ki te mana mā `aria-describedby`, ā, tautuhia
`aria-invalid` ki te mana ina he hapa.

I roto i tētahi FormField, ka whai te karere `-type-error` i te tohu-kiritaki o te kaitirohanga: ka noho huna kia tae noa ki te
mana o te mara kia `:user-invalid` (tārite, i muri i te whakahoatanga mai o te kaiwhakamahi) — rānei ka ūnāia e koe mā te `-invalid`
i runga i te `.instui-form-field` (mō tētahi hapa server-side). He kore pānga te `.instui-form-field-messages` tū-tawhito (kāore i roto i
tētahi wāhanga). Ka whai hoki te mekameka aro ki te mana: mō te mōrearea ina `:user-invalid`/`-invalid`,
mō te angitūtanga ina `-success`.

**Ngā mana kuputuhi** — `.instui-text-input` ( `<input>` taketake), `.instui-text-area` ( `<textarea>` taketake,
ka taea te whakarerekē), me `.instui-simple-select` ( `<select>` taketake me tētahi caret) ka tiritiri i tētahi āhua kotahi me ngā
āhua ōrite: `-invalid` (here hapa), `-success` (here angitū), `-readonly`, `:disabled` taketake, me
`-size-{sm,md,lg}`. Mō tētahi ata ā-mua/ā-muri (InstUI `renderBeforeInput`/`renderAfterInput`), whakakīia te tomokanga ki `.instui-input-group` ka tāpirihia he toenga `.before`/`.after` (he ata `-icon-*`); ka
noho-tahi te `-should-not-wrap` ki runga i te rārangi kotahi. Ko `.instui-number-input` te kanohi ā-tuakiri me tētahi whiti `.arrows` +/- (kolamu spinner) ( `type="number"` taketake; hono ngā pātene ki `stepUp()`/`stepDown()`). Ko `.instui-range-input` he
`input[type="range"]` kua whakaahua e te kāhua āna uara ka whakaaturia i roto i tētahi `.instui-range-input-value` pūāhua. Mō tētahi combobox rikiriki me tētahi popover rārangi, whakamahia `@instructure/ui` — ka kapi tēnei whare i ngā mana taketake.

**Pūkete kōwhiri kua whakapaipai (arotake)** — he `select.css` kōwhiringa ka whakahou i te taua
ēnei `.instui-simple-select` taitara: ka whakapaipai i te pātaka tūwhera (te pani me ia kōwhiringa, me ngā āhua hopu me te tīpakonga) mā te tauira Select Ka taea te Whakarite CSS.

> [!WARNING]
> E whakawhirinaki ana `select.css` ki `appearance: base-select` / `::picker(select)`, ā, he **arotake**
> (Chrome 135+, kāore anō kia Paerewa). Kua tukuna hei pepa-kāhua motuhake kōwhiringa, ā ia ture kua herea ki muri o `@supports (appearance: base-select)`, nō reira kāore he mahi i ngā pūtirotiro kāore i tautokona — ko te
> `.instui-simple-select` noa te mana kōwhiri taketake. Utaia mēnā e hiahia ana koe i te
> kōwhiri hurihuri kua whakapaingia me te whakaae ki te tautoko herekore.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
