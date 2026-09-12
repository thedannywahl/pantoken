# Բաղադրիչներ

`@pantoken/components` թխում է դաս-ապահովված կոմպոնենտի ոճեր, որոնք կառուցված են Instructure տոկեններից: Ներմուծեք stylesheet-ը և ավելացրեք այն ձեր մարկափին՝ որևէ ֆրեյմворք անհրաժեշտ չէ:

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Նախընտրում եք հարմարեցված էլեմենտներ՞ `@pantoken/web-components` փաթեթը փաթեթավորում է նույն ոճերը որպես `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` և այլք — նայեք [փաթեթի քարտեզը](/api/):

## Պայմաններ

Այս փաթեթի CSS կոնվենցիաները հիմնված են [RSCSS](https://ricostacruz.com/rscss/index.html)-ի փոխանցված տարբերակի վրա:

Մոդիֆիկատորները են **բանալին-ապահովված**՝ `-<prop>-<val>`, համընկեցված InstUI prop անունների հետ — այնպես որ դրանք ընթանում են ինքնաբերաբար՝ `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`: Բուլյան prop-երը նշվում են միայն prop-ի անունով, երբ উপস্থিতությունը նշանակում է `true` (`-has-shadow`, `-clickable`); նախնականով թողնված բուլյանը անջատելիս հակադարձվում է (`-without-background`, `-without-border`). Չափերը ընդունում են կարճ և երկար գրվածքներն էլ ( `-size-sm` = `-size-small` ): Երբ անունը տարբերվում է InstUI-ից, InstUI-սեմանտիկ դասը դեռ աշխատում է, բայց դուրս է գալիս՝ որպես հին (օր. `-variant-info` → օգտագործեք `-color-info`):

### Օրինակ

Instructure UI React կոմպոնենտը:

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

InstUI-ի `timeout` prop-ի համար սահմանեք միավոր-առանց `--timeout` հարմարեցված հատկությունը միլիվիշակներում և լցրեք Alert ինթերակցիան. դրական արժեքը ժամանակավոր դուրս շպրտում է; `0` (ստանդարտ) պահում է ալերտը տեղում. Ավելացրեք `transition` utility-ի `instui-transition -fade-entered` դասերը InstUI-ի fade-ի համար; բաց թողեք դրանք՝ անմիջական հեռացման համար. Ինթերակցիան վարում է `-fade-exiting` վիճակը և հրապարակում է մակագրվող, ռողջացող `dismiss` իրադարձություն մինչև հեռացումը, այնպես որ հավելվածը կարող է կանչել `preventDefault()`՝ ալերտը պահելու համար:

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

Progress bar-ները ընդունում են ցանկացած մասշտաբ `--min`-ի միջոցով (`0` ըստ լռության), `--value` և `--max` (`100` ըստ լռության), հնացած `--value-now` և `--value-max` ազգանուններով: Ավելացրեք `-should-animate`՝ կիրառելու InstUI-ի կես-վայրկյան տրանզիցիան երբ արժեքը փոխվում է. `.value` նստած է `.bar` կողքին որպես root-ի երեխա; ավելացրեք `-render-value-inside`՝ այն վերագրելու վրա՝ track-ի վերևում, մատկերված իր սկզբին, փոխարենը (ձևավորեք այն՝ տեսանելի դարձնելու համար մետրի գույնի դիմաց). Օգտագործեք տեղական `<progress>` զրո-դիրքային շարքի համար և `<meter>` երբ նվազագույնը ոչ զրո է; web կոմպոնենտները ինքնաբերաբար ընտրում են նրանց իրենց `min` հատկանիշից. InstUI-ն չունի անորոշ վիճակ, այնպես որ `<progress>` առանց `value` հատկանիշի է pantoken-ի լավագույն ենթադրություն է՝ `progress-bar` անիմացնում է `.bar` որպես սահող սեգմենտ և `progress-circle` պտտեցնում է իր օղակը_fixed_arc_-ով, երկուսն էլ թաքցնելով `.value`.

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

Progress circle-ները ընդունում են նույն ցանկացած մասշտաբները `--min`, `--value` և `--max` միջոցով. `--value-now` և `--value-max` մնացել են որպես հնացած ֆունկցիոնալ ազգանուններ. Ավելացրեք `-should-animate` և լցրեք ֆոկուսավորված ինթերակցիան՝ վերարտադրելու InstUI-ի mount անիմացիան; `--animation-delay` մեկավոր-առանց միավոր միլիվիշակ հապաղում է. Հնացած `-should-animate-on-mount` և `-shold-animate-on-mount` գրման ձևերը մնացյալ են որպես ֆունկցիոնալ ազգանուններ.

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

## Դասի նախածանց

Յուրաքանչյուր դասը ունի namespace `instui-` ըստ լռության. Ստեղծեք stylesheet ձեր սեփական նախածանցով — կամ առանց — փոխանցելով `prefix` ցանկացած builder-ին. Ամեն falsy արժեք (`null`, `undefined`, `""`, կամ չնշելը) ամբողջությամբ հեռացնում է նախածանցը, այնպես որ կարող եք գրել `class="heading -level-h1"` փոխարեն `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Դաշ-առաջադրված մոդիֆիկատորները (`.-color-secondary`, `.-level-h1`) չփոփոխվում են ու այնպես էլ։ Փաթեթի կողմից առաքվող stylesheet-ները պահպանում են `instui` նախածանցը։

## Հիմք

`base.css` համարվում է օպտ-ին ռեսեթ, որը սահմանում է գլոբալ document-ի կանխորոշումները տոկեններից՝ `box-sizing`, `body` ռեսեթ, էջի մակերեսը, հիմնական տեքստի գույնը և ֆոնը, `color-scheme` (շնորհիվ որի `light-dark()` տոկենները և տեղական կառավարիչները հետևում են թեմային), և հիմնական հղումը. Լցրեք այն մեկ անգամ, կոմպոնենտ և prose տախտակների առաջ, երբ pantoken-ը տիրում է էջին.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Չավելացրեք այն, երբ ներարկում եք կոմպոնենտները հոստում, որը արդեն թեմավորում է իր սեփական `html` և `body` — ռեսեթը ներկում է էջի մակերեսը, այնպես որ չեք ցանկանա որ այն պայքարի հոսթի հետ. Ամեն ինչ, ինչ պարունակում է, օգտագործում է ցածր-բացատրական `:where()` ընտրիչներ, դրա համար ձեր սեփական կանոնները միշտ կգլխավորեն:

`base.css` _կիրառում է_ բրենդային ֆոնտը (`font-family: var(--instui-font-family-base)`, համակարգային ֆոլբեքներով); որպեսզի _բեռնեք_ այն, ներմուծեք օպտ-ին `fonts.css` — `@font-face` կանոնները Atkinson Hyperlegible Next-ի համար, որոնքկետադրում են փաթեթում առաքվող woff2 ֆայլերին. Այն առանձին է քանի որ երեսները մոտավորապես ~350 kB և ինքնաբավ ֆոնտերի հյուրընկալումը գիտական ընտրություն է:

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Էկրանի ընթերցողի բովանդակությունը

<p>Այս նախադասությունից հետո թաքնված հաղորդագրություն կա։<span class="instui-screen-reader-content">Ամենայնն էկրանի ընթերցողները միայն հայտարարում են սա։</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` տեսադաշտի համար թաքցնում է էլեմենտը՝ այն պահելով մատչելիության ծառում — պիտակների և կարգավիճակի տեքստի համար, որոնք օգնական տեխնոլոգիան պետք է կարդա, բայց դիզայնը չպետք է ցույց տա։

## Օգնական ծառայություններ

`utilities.css` օպտ-ին շերտ է միջբաժանային դասերով․ `View` պարզագույնը, spacing-ը տոկենի մասշտաբով, և սեմանտիկ գույնի վերագրումները. Ընդհանրապես կոմպոնենտ `-modifier` դասերի նման չեն՝ նրանք օգտագործում են **կրկնակի հիպեն** (`--mod`) որպեսզի երբեք չհանդիպեն կոմպոնենտի սեփական մոդիֆիկատորների անուններին, և նրանք կիրառելի են ցանկացած էլեմենտի վրա — լուռ կամ կոմպոզիտ՝ կոմպոնենտի վրա:

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue մակերես՝ on-color տեքստով.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Կենտրոնացված mx-auto-ով.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI-ի `View`-ն է։ Դա հիմքն է, որի վրա շերտավորում եք spacing և գույնը, և այն կրում է բանալին-ապահովված մոդիֆիկատորներ իր սեփական տեսողական prop-ների համար, որպեսզի չպետք լինի ձեռք տալ utility-ներին՝ `-background-*` (դրա մակերեսները), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, և `-cursor-*` — այս բոլորը `view`-ի սեփական մեկ-ակնանի մոդիֆիկատորներն են, որոնք չեն առնչվում ներքևի կրկնակի հիպեն utility-ների հետ. Ազատ-արժեք props (լայնություն/երկարություն/insset) մնում են inline ոճերում; `margin`/`padding` օգտագործում են spacing utility-ները:

**Spacing** — կողմ-համար դասեր spacing մասշտաբով. Կարդացեք դրանք որպես `{m|p}{side}-{step}`: `m` for margin կամ `p` for padding (կամ ամբողջ բառերը `margin`/`padding`), հնարավոր տրամաբանական կողմը, ապա քայլը. Ուստի `.--m-lg` և `.--margin-lg` նույնն են, ինչպես `.--pt-md` և `.--paddingt-md`:

- Կողեր՝ none (բոլորը), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block առանցք): տրամաբանական կողմերը ճիշտ են աջ-ձախ հիմնավորված դասավորումներում.
- Քայլեր՝ `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, և `auto`՝ միայն margin-ի համար.

Կոմպոզացրեք դրանք InstUI-ի `margin="small auto large"` կարճագրի համար: `class="--mt-sm --mx-auto --mb-lg"`.

**Գույն** — սեմանտիկ վերագրումներ, որոնք մնում են palette-ում՝ `.--bg-<name>` (բեքգրաونډ), `.--text-<name>` (տեքստի գույն), և `.--border-<name>` (սահման գույն): Յուրաքանչյուր `<name>` սեմանտիկ գույնի տոկեն է — ինտենտները (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) պլյուս `accent-*` պալիտան (`accent-blue`, `accent-green`, և այլն). Անունը միայն այն դեպքում է, եթե տոկենը գոյություն ունի այդ ընտանիքում, այնպես որ `text-brand` չի հանդիսանում դաս — տեքստը չունի բրենդային տոկեն. Չկա եղանակ հասնելու primitive կամ պատահական hex-ին, և յուրաքանչյուր վերագրում հետևում է թեմային.

**Տոկեն ընտանիքներ** — յուրաքանչյուր "մեկ տոկեն՝ մեկ հատկություն" ընտանիքը ունի դաս յուրաքանչյուր տոկենի համար, անունը՝ տոկենի անունով. Կոմպոզացրեք ազատորեն.

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (և `-depth1`…`-card`) → `box-shadow`

Յուրաքանչյուրն սահմանում է միայն իր սեփական հատկությունը, այնպես որ `border-width`/`border-radius` պետք է ունենան `border-*` գույն և սահման ոճ, որպեսզի իրականում տեսանելի սահման ունենան. Այսները օգտագործում են ամբողջ տոկենի անվանումը (`.--border-radius-md`), մինչդեռ գույնի և spacing-օգնողները օգտագործում են կարճ ալիասներ (`.--bg-brand`, `.--mt-lg`) — ալիասները հարմարավետ shortcuts են; տոկենի դասերը բառացի և ամբողջական են:

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) և `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ծածկում են InstUI-ի միջբաժանային `display` և `textAlign` prop-ները (View, Button, Metric, Tabs, …) որպես կոմպոզիտ դասեր — այսպիսով դրանք չեն հանդիսանում per-component մոդիֆիկատորներ:

Յուրաքանչյուր կրկնակի-հիպեն դասը հաղթում է cascade-ում նույնանուն մեկ-հիպեն կոմպոնենտի մոդիֆիկատորին, անկախ stylesheet-ի ներմուծման կարգից — նայել [Authoring conventions](/conventions/authoring) մեխանիզմի համար:

Ամեն ինչ այստեղ մաքուր CSS է՝ `--instui-*` տոկեններով որպես շարժիչ, ուստի այն հետևում է InstUI-ին տոկենի շերտով. Տեսեք [API reference](/api/) `componentsCss` և per-component builder-ների համար:

## Ծածկույթներ: երկխոսարան և փոփօվեր

Ծածկույթ կոմպոնենտները նստում են տեղական հարթակ-պրիմիտիվների վրա, այնպես որ նրանք աշխատում են մատչելիությամբ՝ փոքր կամ առանց JavaScript-ի:

**Մոդալ** — դարձրեք `.instui-modal` տեղական `<dialog>`-ի վրա. Այն ստանում է focus trapping, `Esc`-ով փակելու հնարավորություն, և `::backdrop` անվճար; backdrop-ը մթագրվում է նույն `--instui-component-mask-background-color` տոկենի նմանությամբ ինչպես `.instui-mask` (ավելացրեք `-blur`՝ այն բարակացնելու համար). Բաց և փակեք այն(invoker commands)-ով — ոչ մի սքրիպտ չի պետք:

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

**Կոնտեքստային դիտում / փոփօվեր** — դադարեք `.instui-context-view` վրա `[popover]` էլեմենտ և զննարկեք այն `popovertarget`-ով. այն նստած է վերին շերտում և լայթ-դիսմիս է արտաքին-կարող-կտտոցով կամ `Esc`, կրկին՝ ոչ մի սքրիպտ:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer դասավորություն** — դարձրեք `.instui-drawer-layout` դասավորության root-ի վրա `.tray` և `.content` երեխաներով. Ավելացրեք `open` հատկանիշը (կամ `-open`)՝ tray-ը բացելու համար, և օգտագործեք `placement="end"` (կամ `-placement-end`)՝ այն կապելու inline-end կողմում — տեղադրումը որոշվում է տրամաբանական `inset-inline-*`/`flex-direction` հատկություններով, այնպես որ այն ինքնաբերաբար շրջվում է `dir="rtl"` պայմաններում առանց լրացուցիչ կանոնների. Ֆոկուսացված ինթերակցիան ավելացնում է Invoker command-routing և փոխում overlay ռեժիմը (`should-overlay-tray`) երբ լայնությունը անցնում է `--drawer-layout-min-width` (ստանդարտ `--instui-breakpoints-sm`, ապա `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` մնում է in-flow ծածկույթների համար (մինչև քարտի վրա սպինները); մոդալի `::backdrop` ծածկում է մոդալային դեպքը.

Բոլոր օրինակները նույնպես փաթեթավորված են որպես վարքաբանական հարմարեցված էլեմենտներ `@pantoken/web-components`-ում: `<instui-modal open>` (մի `<dialog>` որը վարվում է իր `open` հատկանիշով) և `<instui-context-view>` (տեղական popover):

Բրաուզերի աջակցություն՝ popover API-ն և `popovertarget` են Baseline 2024; invoker commands (`command`/`commandfor`) են Baseline 2025, այդ պատճառով հնացած բրաուզերներում կապեք կոճակները `dialog.showModal()` որպես մեկ տող ֆելբեք. Popover-ը դիրքավորում trigger-ի կողքին օգտագործում է CSS anchor դիրքավորում որտեղ աջակցված է (Chromium); այլ տեղերում այն կենտրոնացվում է վերին շերտում:

## Ֆորմաներ

**FormField** — `.instui-form-field` CSS Grid գեղջ իրենց label-ը, control-ը և ցանկացած message-երը դնում է. Դրեք այն `<label>`-ի վրա այնպես որ label-ը ասոցացվի իր control-ի հետ բնովին. Այն ունի երեք grid տարածք — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ստանդարտ) շարքը դնում է շրջանները; `-layout-inline` դնում է label-ը կողքին control-ին (ձայնավորեք `-label-align-{start,end}` և `-v-align-{top,middle,bottom}`). `-readonly` վերագունավորում է label-ը.

**Պետքավոր աստղանիշը** հայտնվում է երբ դաշտը պարտադիր է _ըստը_ `-required` դասի _կամ_ բնիկ `required` control-ի պատճառով — այնպես որ կարող եք պարզապես սահմանել `required` ինպութի վրա և նշանը կերևա. Այն դեկորատիվ է (մի `::after` վրա label-ում, մատչելիության ծառից դուրս); զուգակցեք այն մի նշումով՝ «դաշտերը նշված \* պարտադիր են» եթե ֆորման ինքնաներկայացուն չէ:

**FormFieldGroup** — `.instui-form-field-group` խումբ է հարակից դաշտերը `<fieldset>`-ով և `<legend>` նկարագրությամբ. Դա մաքուր դասավորություն է (ոչ հատուկ տոկեններ): լռությամբ դաշտերը հանկարծակի են; `-layout-columns`/`-layout-inline` դրանք տեղափոխում են պատասխանատու սյուներ, `-row-spacing-*`/`-col-spacing-*` և `-v-align-*` թույլ են տալիս հարվածել grid-ը:

**RadioInputGroup** — `.instui-radio-input-group` նույն `<fieldset>`/`<legend>` խմբավորումն է, հատուկ radio-ների համար. Քանի որ երեխաներ radio-ները բաժնվում են `name`, ընտրությունը բնավնապես միա-ընտրանքային է — այդ պատճառով toggle քոճերի խումբը գործում է որպես մի کنترل, ոչ թե առանձին կոճակներ. `-variant-simple` (ստանդարտ) դասավորում է ստանդարտ radio-ները (`-layout-columns`/`-inline` դրանք շարքում); `-variant-toggle` վերամիավորում է երեխա `.instui-radio.-variant-toggle` կոճակները մեկ սեգմենտացված կոնտրոլի մեջ (կոլապսավորված սահմաններ, վառված արտաքին ծայրեր):

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

**Message-ներ** — `.instui-form-field-messages` է container-ը; յուրաքանչյուրը `.instui-form-field-message` ունի `-type-*`: `-type-hint` (բեժ, լռությամբ), `-type-error` (սգագույն տեքստ + circle-alert գղֆ), `-type-success` (կանաչ տեքստ + circle-check գղֆ), և `-type-screenreader-only` (տեսողականորեն կլիպված, բայց մինչեւ արդեն հայտարարվում է). Գղֆերը ներկվում են `currentColor`, այնպես որ նրանք միշտ համապատասխանում են message-ի գույնին. `-type-new-error` հնացած ալիասն է `-type-error`-ի. Կապեք container-ը control-ով `aria-describedby`-ով, և սահմանեք `aria-invalid` control-ի վրա երբ կա սխալ.

FormField-ի ներսում, `-type-error` message-ը հետևում է client-side վալիդացիային: այն մնում է թաքնված մինչև դաշտի control-ը `:user-invalid` (բնական, հետո օգտագործողի միջամտությունից) — կամ դուք ստիպում եք դա `-invalid`-ով `.instui-form-field`-ի վրա (սերվերի կողմի սխալի համար). Անկախ `.instui-form-field-messages` (ոչ դաշտում) չի ազդվում. Control-ի focus օղակը հետեւում է նույն տրամաբանությանը՝ վտանգը երբ `:user-invalid`/`-invalid`, հաջողությունը երբ `-success`:

**Տեքստային կառավարիչներ** — `.instui-text-input` (բնական `<input>`), `.instui-text-area` (բնական `<textarea>`, վերաձևավորվող), և `.instui-simple-select` (բնական `<select>` միասին caret-ով) ունեն նույն տեսքը և նույն վիճակները՝ `-invalid` (սխալի սահման), `-success` (հաջողության սահման), `-readonly`, բնիկ `:disabled`, և `-size-{sm,md,lg}`. Առաջնական/հետևորդական իկոնների համար (InstUI-ի `renderBeforeInput`/`renderAfterInput`), փաթեթեք input-ը `.instui-input-group`-ով և ավելացրեք `.before`/`.after` slot (մի `-icon-*` գղֆ); `-should-not-wrap` պահում է այն մեկ տողում. `.instui-number-input` է այն facade-ն գումարած `.arrows` +/- spinner սյունը (բնական `type="number"`; կապեք կոճակները `stepUp()`/`stepDown()`). `.instui-range-input` սթայլավորված `input[type="range"]` է որի արժեքը ռենդերվում է `.instui-range-input-value` հակառակ բուպլում. Հին կոմբոբոքսի համար ընտրեցեք `@instructure/ui` — այս գրադարանում ընդգրկված են բնիկ կառավարիչները:

**Սթայլավորված select dropdown (արտահայտիչ)** — օպտ-ին `select.css` արդիականացնում է նույն `.instui-simple-select` էլեմենտը՝ այն ոճավորում է բաց dropdown-ը (փանելը և յուրաքանչյուր օպցիան, hover և ընտրված վիճակներով) օգտագործելով CSS Customizable Select մոդելը:

> [!WARNING]
> `select.css` կախված է `appearance: base-select` / `::picker(select)`-ից, որը **արտահայտիչ է**
> (Chrome 135+, դեռ Baseline չի), այն առաքվում է որպես առանձին օպտ-ին թերթիկ և յուրաքանչյուր կանոն դրված է `@supports (appearance: base-select)`-ի հետևորդությամբ, այնպես որ այն ոչինչ չի անում ոչ աջակցվող բրաուզերներում — `.instui-simple-select` control-ը պարզապես մնում է սովորական բնիկ select: Լցրեք այն միայն եթե ուզում եք բարելավված dropdown և ընդունում եք սահմանափակ աջակցությունը.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
