# Պատճենաչափեր

`@pantoken/components` վաճառում է դասերի վրա հիմնված կոմպոնենտային ոճեր, որոնք կառուցված են Instructure token-ներից: Ներմուծել stylesheet-ը և նշանել ձեր նշումը — ոչ մի ֆրեյմվորք չի պահանջվում:

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Նախընտրում եք հարմարեցված էլեմենտներ՞ `@pantoken/web-components` обվաշինգում է նույն ոճերը որպես `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` և այլն — դիտեք [package map](/guide/packages).

## Կոնվենցիաներ

Այս փաթեթի CSS կոնվենցիաները հիմնված են [RSCSS](https://ricostacruz.com/rscss/index.html)-ի փոփոխված տարբերակի վրա։

Մոդիֆիկատորները են **կլյու-արժեք** — `-<prop>-<val>`, համապատասխանեցված InstUI prop անուններին — այնպես որ դրանք ընթերցվում են իրենցից. `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Ցանկացած boolean prop-ը ներկայացված է միայն prop անվամբ, որտեղ առկայությունը նշանակում է `true` (`-has-shadow`, `-clickable`); default-on boolean-ը հակադարձվում է երբ անջատվում է (`-without-background`, `-without-border`). Չափերը গ্রহণում են կարճ և երկար գրառումները (`-size-sm` = `-size-small`). Երբ անունը շեղվում է InstUI-ից, InstUI-սեմանտիկ դասը դեռ աշխատում է, բայց դեֆեկատվել է (օր. `-variant-info` → օգտագործել `-color-info`):

### Օրինակ

Instructure UI React կոմպոնենտ.

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken կոմպոնենտները:

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

InstUI-ի `timeout` prop-ի համար սահմանեք միավորաչափ չունեցող `--timeout` custom property-ն միլիվարկյաններում և բեռավորեք Alert interaction-ը։ Անվրացական արժեքը ծրագրված է dismissal-ի համար; `0` (ստանդարտ) թողնում է զգուշացումն տեղում։ Ավելացրեք `transition` utility-ի `instui-transition -fade-entered` դասերը InstUI-ի fade-ի համար; բաց թողեք դրանք անմիջական հանումի դեպքում։ Interaction-ը վարում է `-fade-exiting` վիճակը և կրակում է կասեցվող, բաբլինգ `dismiss` իրադարձությունը հանելուց առաջ, այդպիսով հավելվածը կարող է կանչել `preventDefault()`՝ զգուշացումը մոնտաժված պահելու համար։

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

Progress bar-ները ընդունում են 任意 սանդղակներ `--min`-ի միջոցով (`0` ըստ լռության), `--value`, և `--max` (`100` ըստ լռության),՝ устаревшими `--value-now` և `--value-max` ալիասներով։ Ավելացրեք `-should-animate`՝ կիրառելու InstUI-ի կես վայրկյանյան transition-ը երբևէ արժեքը փոխվում է։ `.value` գտնվում է `.bar` կողքին որպես root-ի երեխան; ավելացրեք `-render-value-inside`՝ այն track-ի վրայից տեղադրելու համար, փոխարենը սկզբունքային հարավեցմամբ (Ցուցադրեք այն չափելի լինելու համար ըստ meter գույնի): Օգտագործեք բնիկ `<progress>` ժապավենի համար զրո-հիմքով տիրույթ և `<meter>` երբ minimum-ը ոչ զրո է; web components-ները ավտոմատ կերպով գեղեցիկ ընտրում են դրանցից `min` attribute-ի հիման վրա։ InstUI-ում indeterminate stanje գոյություն չունի, այնպես որ `<progress>` որն առանց `value` attribute-ի այն pantoken-ի միայն լավագույն ենթադրությունն է։ `progress-bar` անիմացնում է `.bar` որպես սահող հատված և `progress-circle` պտտում է նրա մատուռը ֆիքսված անկյունում, երկուսն էլ թաքցնում են `.value`։

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

Progress circle-ները ընդունում են նույն任意 սանդղակները `--min`, `--value`, և `--max`-ով։ `--value-now` և `--value-max` մնում են՝ որպես դեֆեկատված ֆունկցիոնալ ալիասներ։ Ավելացրեք `-should-animate` և բեռավորեք focused interaction bundle-ը՝ կրկնօրինակելու InstUI-ի mount անիմացիան; `--animation-delay` մի միավորաչափ-անհունկ միլիվարկյան դիլեյ է։ Դեֆեկատված `-should-animate-on-mount` և `-shold-animate-on-mount` գրառումները մնում են ֆունկցիոնալ ալիասներ։

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

## Դասերի նախաբան

Յուրաքանչյուր դասը նեյմսփեյսված է `instui-` ըստ լռության։ Ստեղծեք stylesheet ձեր սեփական prefix-ով — կամ առանց — փոխանցելով `prefix` ցանկացած builder-ին։ Ո cualquier falsy արժեք (`null`, `undefined`, `""`, կամ բաց թողնելը) ամբողջությամբ հեռացնում է prefix-ը, այնպես որ կարող եք հեղինակել `class="heading -level-h1"` փոխարեն `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Գծաճանաչյալ մոդիֆիկատորները (`.-color-secondary`, `.-level-h1`) նույնն են անկախ դրանից։ Փաթեթի ուղարկված stylesheet-ները պահում են `instui` prefix-ը։

## Բեյս

`base.css` ենթակայում է opt-in reset, որը սահմանում է գլոբալ document-ի լռությունները token-ներից՝ `box-sizing`, մի `body` reset, էջի մակերեսը, բազային տեքստային գույնն ու ֆոնը, `color-scheme` (մինչդեռ `light-dark()` token-ները և բնիկ կառավարիչները հետևում են թեմային), և բազային հղում։ Բեռնեք այն մեկ անգամ, կոմպոնենտի և պրոզե տախտակների առաջ, երբ pantoken-ը տիրապետում է էջին։

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Նտուքեք այն երբ դուք ներդնում եք կոմպոնենտներ հոստում, որը արդեն թեմատիկ իր պարունակող `html` և `body`-ը — reset-ը ներկառուցում է էջի մակերեսը, այնպես որ դուք չեք ուզում այն մրցակցի հոստի հետ։ Ամեն ինչ, որ այն դնում է, օգտագործում է ցածր-սպեցիֆիկություն `:where()` սելեկտորներ, այնպես որ ձեր սեփական կանոնները միշտ հաղթում են։

`base.css` _կիրառում_ է բրենդային տառատեսակը (`font-family: var(--instui-font-family-base)`, համակարգային fallback-ներով); նրա _բեռնելու_ համար ներմուծեք opt-in `fonts.css` — `@font-face` կանոններ Atkinson Hyperlegible Next-ի համար, որոնք մատնանշում են փաթեթում ուղարկված woff2 ֆայլերին։ Այն առանձին է, քանի որ ֆեյսները մոտավորապես ~350 kB են և տիրապետումը ֆոնտերի սեփական հոստինգը դիտված ընտրություն է։

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Էկրան-ընթերցողի բովանդակություն

<p>Այս նախադասությունից հետո կա թաքնված հաղորդագրություն։<span class="instui-screen-reader-content">Միայն էկրան-ընթերցողները կհաղորդեն սա։</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` թաքցնում է էլեմենտը տեսողականորեն՝ պահելով այն մատչելիության ծառում — համար label-ների և status տեքստի, որոնք օգնական տեխնոլոգիաները պետք է կարդան, բայց դիզայնը չպետք է ցուցադրի։

## Յուտիլիթիս

`utilities.css` opt-in շերտ է՝ խաչային-քղջրող դասերով։ Մեկ `View` primitive, spacing token-շարքով, և սեմանտիկ գույնի վերագրումներ։ Կոմպոնենտի `-modifier` դասերից տարբեր, այսները օգտագործում են **կրկնակի վահան** (`--mod`) այնպես որ դրանք երբեք չեն բախվում կոմպոնենտի սեփական մոդիֆիկատորների անունների հետ, և դրանք կիրառելի են ցանկացած էլեմենտի վրա — պարզ կամ կոմպոզիցիայով կոմպոնենտի վրա։

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue մակերեսը on-color տեքստով։</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Կենտրոնացված mx-auto-ով։</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI-ի `View`-ն է։ Սա այն բազան է, որի վրա շերտում եք spacing և գույնը, և այն կրում է key-value մոդիֆիկատորներ իր սեփական վիզուալ prop-ների համար՝ այնպես որ ձեզ հարկավոր չէ օգտվել utility-ներից: `-background-*` (նրա մակերեսները), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, և `-cursor-*` — այս բոլորը `view`-ի սեփական single-dash մոդիֆիկատորներն են, որոնք չեն संबంధվում երկու-dash utility-ների հետ ներքևում։ Ազատ-արժեք prop-ները (width/height/inset) մնալու են inline style-երում; `margin`/`padding` օգտագործում են spacing utilities:

**Spacing** — per-side դասեր spacing սանդղակում։ Ուսումնասիրեք նրանց որպես `{m|p}{side}-{step}`: `m` մարգին համար կամ `p` padding համար (կամ ամբողջ բառերը `margin`/`padding`), ընտրովի տրամաբանական կողմ, ապա քայլ։ Այսպիսով `.--m-lg` և `.--margin-lg` նույնն են, ինչպես `.--pt-md` և `.--paddingt-md`։

- Կողմերը: none (բոլորը), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block առանցք): Լոգիկական կողմերը ճիշտ են աջ-վերք ձախ ուղղությամբ։
- Քայլերը: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, և `auto` միայն margin-ի համար։

Կազմակցեք դրանք InstUI-ի `margin="small auto large"` շորտհենդի համար: `class="--mt-sm --mx-auto --mb-lg"`.

**Color** — սեմանտիկ վերագրումներ որոնք մնում են պալիտրայում: `.--bg-<name>` (ֆոն), `.--text-<name>` (տեքստի գույն), և `.--border-<name>` (բռերի գույն): Յուրաքանչյուր `<name>` սեմանտիկ գույնի token է — intents-ները (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) և `accent-*` պալիտրան (`accent-blue`, `accent-green`, և այլն). Անունը գոյություն ունի միայն եթե token-ը այդ ընտանիքում գոյություն ունի, այնպես որ `text-brand` դասը չի լինի — տեքստն ունի no brand token. Չկա ուղի primitive կամ 任意 hex դիտելու, և յուրաքանչյուր վերագրում հետևում է թեմային։

**Token ընտանիքներ** — յուրաքանչյուր «մեկ token, մեկ property» ընտանիք ստանում է դաս ըստ token-ի անվան, կոմպոզացրեք ազատորեն:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (և `-depth1`…`-card`) → `box-shadow`

Յուրաքանչյուրն էլ սահմանում է միայն իր մեկ property-ն, այնպես որ `border-width`/`border-radius` կարիք ունի `border-*` գույնի և border ոճի՝ որպեսզի իսկապես նկարի border: Այսները օգտագործում են ամբողջ token անունը (`.--border-radius-md`), մինչդեռ վերևի գույնի և spacing helper-ները օգտագործում են կարճ ալիասներ (`.--bg-brand`, `.--mt-lg`) — ալիասները էրգոնոմիկ շորտկատներ են; token դասերը բառացի և ընդգրկուն են։

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) և `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ընդգրկում են InstUI-ի խաչ-քտրող `display` և `textAlign` prop-ները (View, Button, Metric, Tabs, …) որպես կոմպոզիբլ դասեր — այսպես դրանք չեն հանդիսանում per-component մոդիֆիկատորներ։

Յուրաքանչյուր կրկնակի-դաշ դաս որոշում է cascade-ում որոշիչորեն նույնանուն single-dash կոմպոնենտի մոդիֆիկատորից, import կարգով չկախված — տես [Authoring conventions](/conventions/authoring) մեխանիզմի համար։

Ամեն ինչ այստեղ ամբողջովին CSS-ով է և ղեկավարվում է `--instui-*` token-ներով, այնպես որ այն հետևում է InstUI-ին token շերտի միջոցով։ Տես [API reference](/api/) `componentsCss` և per-component builders-ի համար։

## Օվերլեյներ՝ dialog և popover

Օվերլեյ կոմպոնենտները նստում են բնիկ պլատֆորմային պրիմիտիվների վրա, այնպես որ նրանք հասանելիորեն աշխատում են քիչ կամ առանց JavaScript-ի։

**Modal** — դարձրեք `.instui-modal` վրա բնիկ `<dialog>`-ն։ Այն ստանում է focus trapping, `Esc`-to-close, և `::backdrop` անվճար; backdrop-ը մթագրվում է նույն `--instui-component-mask-background-color` token-ով ինչպես `.instui-mask` (ավելացրեք `-blur`՝ այն իջեցնելու համար). Բացեք և փակեք այն invoker commands-ով — ոչ մի սցրիպտ չի պետք:

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

**Context view / popover** — դարձրեք `.instui-context-view` `[popover]` էլեմենտին և տոգլ արեք այն `popovertarget`-ով։ Այն նստում է վերին շերտում և լայթ-դիսմիս է տալիս արտաքին-սեղմում կամ `Esc`-ով, կրկին ոչ մի սցրիպտ:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — դարձրեք `.instui-drawer-layout` լեյաութ արմատին՝ `.tray` և `.content` երեխաներով։ Ավելացրեք `open` attribute-ը (կամ `-open`)՝ տրեյը ցուցադրելու համար, և օգտագործեք `placement="end"` (կամ `-placement-end`)՝ այն լուսային-ավարտը դոկավորելու համար — տեղադրումը լուծվում է լոգիկական `inset-inline-*`/`flex-direction` հատկություններով, այնպես որ այն ավտոմատ ձևափոխվում է `dir="rtl"`-ի դեպքում առանց լրացուցիչ կանոնների։ Focused interaction bundle-ը ավելացնում է Invoker command routing և տոգլացնում overlay ռեժիմը (`should-overlay-tray`) երբ լայնությունը հատում է `--drawer-layout-min-width` (լռությամբ `--instui-breakpoints-sm`, ապա `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` մնում է in-flow overlays-ի համար (spinner κάվարդի վրա); modal-ի `::backdrop` ծածկում է modal դեպքը։

Յուրաքանչյուր օրինակ նաև փաթեթվում է որպես վարքավեր (behavioral) հարմարեցված էլեմենտներ `@pantoken/web-components`-ում: `<instui-modal open>` (մի `<dialog>` որը ղեկավարվում է `open` attribute-ով) և `<instui-context-view>` (բնական popover)։

Բրաուզեր աջակցության նշում՝ popover API-յ եւ `popovertarget`-ը Baseline 2024 են; invoker commands (`command`/`commandfor`) Baseline 2025 են, այնպես որ հին բրաուզերներում կապեք buttons-ները `dialog.showModal()` որպես մի տող ֆոլբեք։ Popover-ի դիրքավորումը իր trigger-ի կողքին օգտագործում է CSS anchor positioning եթե աջակցվում է (Chromium); այլ դիքերում այն կենտրոնացվում է վերին շերտում։

## Ֆորմեր

**FormField** — `.instui-form-field` CSS-Grid օթար է, որը դասավորում է label-ը, control-ը, և ցանկացած messages։ Դնել այն `<label>`-ի վրա որպեսզի label-ը ասոցացվի իր control-ով բնիկ կերպով։ Այն ունի երեք grid տարածք — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ստանդարտ) կստեք հակապատկերը; `-layout-inline` դնում է label-ը կողքին control-ի (խմբավորեք `-label-align-{start,end}` և `-v-align-{top,middle,bottom}`). `-readonly` վերաբերվում է label-ի գույնին։

**Պարտադիր աստղիկը** հայտնվում է երբ դաշտը պարտադիր է _եթե_ `-required` դասն է _կամ_ բնիկ `required` control-ով նրա ներսում — այնպես որ կարող եք պարզապես սահմանել `required` input-ի վրա և նշանը կհայտվի։ Դա զարդարանք է (մեկ `::after` label-ի վրա, մատչելիության ծառից դուրս); զուգակցեք այն նշմամբ՝ ինչպիսիք են «ծածկագրված դաշտերը \* պարտադիր են» եթե ֆորման ինքնին չի պարզում։

**FormFieldGroup** — `.instui-form-field-group` խմբավորում է վերաբերող դաշտերը `<fieldset>`-ով և `<legend>` նկարագրությամբ։ Դա մաքուր լեյաուտ է (ոչ մասնագիտացված tokens): լռությամբ դաշտերը stack-վում են; `-layout-columns` / `-layout-inline` շարունակում են դրանք ռեսպոնսիվ սյուներով, `-row-spacing-*` / `-col-spacing-*` և `-v-align-*`-ը կարգավորում են grid-ը։

**RadioInputGroup** — `.instui-radio-input-group` նույնն է `<fieldset>`/`<legend>` grouping-ի, հատուկ radio-ների համար։ Քանի որ երեխաների radio-ները կիսում են `name`, ընտրությունը բնիկը միակ-ընտրության է — այնպես որ toggle buttonsների հավաքը գործում է որպես մեկ control, ոչ թե բաց-կապված button-ներ։ `-variant-simple` (ստանդարտ) դասավորում է ստանդարտ radios-ը (`-layout-columns`/`-inline` հյուսում դրանք տողով); `-variant-toggle` միացնում է երեխաների `.instui-radio.-variant-toggle` buttons-ը մեկ սեգմենտացված control-ով (կանգնած borders, շրջանաձեւ եզրեր):

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

**Messages** — `.instui-form-field-messages` հանդիսանում է կոնտեյներ; յուրաքանչյուր `.instui-form-field-message` ունենում է `-type-*`: `-type-hint` (սերի, լռությամբ), `-type-error` (կարմիր տեքստ + circle-alert գлиф), `-type-success` (կանաչ տեքստ + circle-check գلیف), և `-type-screenreader-only` (տեսողականորեն կլիպված, բայց դեռ հայտարարված): Գլիֆները ներկված են `currentColor`-ով, այնպես որ դրանք միշտ համապատասխանում են message գույնին։ `-type-new-error` դեֆեկատված ալիաս է `-type-error`-ի։ Կապեք կոնտեյներին control-ով `aria-describedby`-ով, և սահմանեք `aria-invalid` control-ի վրա երբ կա error։

FormField-ի ներսում, `-type-error` message-ը հետևում է client-side վավերացմանը՝ այն մնում է թաքնված մինչև control-ը դառնա `:user-invalid` (բնական, օգտագործողի փոխազդեցությունից հետո) — կամ դուք ստիպում եք այն `-invalid`-ով `.instui-form-field`-ի վրա (սերվեր-կողմ սխալի համար). Մեն-ոլ `.instui-form-field-messages` (չկա դաշտում) տատանվում է։ Control-ի focus ring-ը հետևում է նույնպես՝ վտանգավոր երբ `:user-invalid`/`-invalid`, հաջողություն երբ `-success`։

**Տեքստային կառավարիչներ** — `.instui-text-input` (բնական `<input>`), `.instui-text-area` (բնական `<textarea>`, փոփոխվող), և `.instui-simple-select` (բնական `<select>` caret-ով) կիսում են մեկ տեսք և նույն վիճակները: `-invalid` (error border), `-success` (success border), `-readonly`, բնիկ `:disabled`, և `-size-{sm,md,lg}`. Առջևի/հետևի գլիֆի համար (InstUI-ի `renderBeforeInput`/`renderAfterInput`), փաթաթեք input-ը `.instui-input-group`-ով և ավելացրեք `.before`/`.after` slot (մի `-icon-*` գлиф); `-should-not-wrap` պահում է այն մեկ տողում։ `.instui-number-input` այն facade-ն է՝ ավելացված `.arrows` +/- spinner սյունով (բնական `type="number"`; կապեք button-ները `stepUp()`/`stepDown()`-ին). `.instui-range-input` styleid `input[type="range"]` է որի արժեքը արտապատկերվում է `.instui-range-input-value` inverse bubble-ում։ Շարունակ combobox-ի համար listbox popover-ով, օգտագործեք `@instructure/ui` — այս գրադարանը ծածկում է բնիկ կառավարիչները։

**Styled select dropdown (փորձնական)** — opt-in `select.css` բարձրացնում է նույն `.instui-simple-select` էլեմենտը: այն ստիլավորում է բաց dropdown-ը (փանելը և յուրաքանչյուր ընտրությունը, hover և selected վիճակներով) օգտագործելով CSS Customizable Select մոդելը։

> [!WARNING]
> `select.css` կախված է `appearance: base-select` / `::picker(select)`-ից, որը **փորձնական է**
> (Chrome 135+, դեռ ոչ Baseline): Այն ուղարկվում է որպես առանձին opt-in sheet և յուրաքանչյուր կանոն սահմանված է `@supports (appearance: base-select)`-ով, այնպես որ այն ոչինչ չի անում չաջակցվող բրաուզերներում — `.instui-simple-select` control-ը պարզապես մնում է բնիկ select։ Լռությամբ բեռնել միայն եթե ուզում եք բարելավված dropdown և ընդունում եք սահմանափակ աջակցության։

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
