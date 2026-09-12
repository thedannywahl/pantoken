# Компоненти

`@pantoken/components` постачає стилі компонентів на основі класів, побудовані з токенів Instructure. Імпортуйте таблицю стилів і позначте вашу розмітку — фреймворк не потрібен.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Віддаєте перевагу кастомним елементам? `@pantoken/web-components` упаковує ті ж самі стилі як `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` та інші — див. [мапу пакунків](/api/).

## Умови (конвенції)

CSS-конвенції в цьому пакунку базуються на модифікованій версії [RSCSS](https://ricostacruz.com/rscss/index.html).

Модифікатори є **ключ-значення** — `-<prop>-<val>`, вирівняні з іменами пропсів InstUI — тому вони читаються самі за себе: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Булеві пропси — це просто ім'я пропсу, де присутність означає `true` (`-has-shadow`, `-clickable`); булевий пропс за замовчуванням увімкнений, вимкнений інвертується (`-without-background`, `-without-border`). Розміри приймають короткі та довгі написання (`-size-sm` = `-size-small`). Коли ім'я відрізняється від InstUI, семантичний клас InstUI все ще працює, але застарілий (наприклад `-variant-info` → використовуйте `-color-info`).

### Приклад

Компонент Instructure UI React:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken компоненти:

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

Для пропсу `timeout` InstUI встановіть безодиничну кастомну властивість `--timeout` в мілісекундах і завантажте взаємодію Alert. Позитивне значення планує відхилення; `0` (за замовчуванням) залишає алерт на місці. Додайте класи `instui-transition -fade-entered` утиліти `transition` для fade InstUI; опустіть їх для негайного видалення. Взаємодія керує станом `-fade-exiting` і викликає скасовувану, бульбашкову подію `dismiss` перед видаленням, тож додаток може викликати `preventDefault()`, щоб залишити алерт змонтованим.

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

Індикатори прогресу приймають довільні шкали через `--min` (`0` за замовчуванням), `--value` та `--max`
(`100` за замовчуванням), з застарілими псевдонімами `--value-now` і `--value-max`. Додайте `-should-animate`,
щоб застосувати півсекундний перехід InstUI, коли значення змінюється. `.value` співіснує з `.bar` як дочірній елемент кореня; додайте `-render-value-inside`, щоб відобразити його над треком, вирівняним по його початку,
натомість (стилізуйте для читабельності проти кольору метра). Використовуйте нативний `<progress>` для діапазону з нульовою основою і `<meter>`, коли мінімум ненульовий; веб-компоненти автоматично вибирають між ними за атрибутом `min`. У InstUI немає невизначеного стану, тому `<progress>`,
який позбавлений атрибуту `value`, — це лише найкраща здогадка pantoken: `progress-bar` анімує `.bar` як
зсувний сегмент, а `progress-circle` обертає його кільце під фіксованим кутом, обидва ховають `.value`.

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

Кругові індикатори приймають ті ж довільні шкали через `--min`, `--value` і `--max`.
`--value-now` і `--value-max` залишаються застарілими функціональними псевдонімами. Додайте `-should-animate` і
завантажте пакет взаємодії для фокусування, щоб відтворити анімацію монтування InstUI; `--animation-delay` — це
безодинична затримка в мілісекундах. Застарілі написання `-should-animate-on-mount` і
`-shold-animate-on-mount` залишаються функціональними псевдонімами.

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

## Префікс класів

Кожен клас за замовчуванням іменований у просторі імен `instui-`. Побудуйте таблицю стилів зі своїм префіксом — або без префікса — передаючи `prefix` будь-якому билдеру. Будь-яке falsy значення (`null`, `undefined`, `""` або його опускання) повністю видаляє префікс, тож ви можете авторити `class="heading -level-h1"` замість `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Модифікатори з дефісним префіксом (`.-color-secondary`, `.-level-h1`) залишаються незмінними в будь-якому випадку. Таблиці стилів, що постачаються пакунком, зберігають префікс `instui`.

## Базові стилі

`base.css` — це опційний скидання, що встановлює глобальні значення документа з токенів: `box-sizing`, скидання `body`, поверхня сторінки, базовий колір тексту та шрифту, `color-scheme` (щоб токени `light-dark()` та нативні контролі відстежували тему), і базове посилання. Завантажте його один раз, перед компонентною та прозовою таблицями стилів, коли pantoken керує темою сторінки.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Пропустіть його, коли ви вбудовуєте компоненти в хост, який вже темізує власну `html` і `body` —
скидання фарбує поверхню сторінки, тому ви не захочете, щоб воно конфліктувало з хостом. Все, що воно встановлює, використовує
низькоспецифічні селектори `:where()`, тому ваші власні правила завжди перемагають.

`base.css` _застосовує_ брендований шрифт (`font-family: var(--instui-font-family-base)`, з системними
фолбек-стилями); щоб _завантажити_ його, імпортуйте опційний `fonts.css` — правила `@font-face` для Atkinson Hyperlegible
Next, що вказують на woff2-файли, що постачаються в пакунку. Це окремо, бо файли шрифтів приблизно ~350 kB і
самохостинг шрифтів — це свідомий вибір.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Вміст для зчитувачів екрану

<p>Після цього речення є приховане повідомлення.<span class="instui-screen-reader-content">Тільки зчитувачі екрану оголошують це.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` приховує елемент візуально, зберігаючи його в дереві доступності
— для підписів і статусного тексту, який має зчитувати допоміжна технологія, але який дизайн не має відображати.

## Утиліти

`utilities.css` — це опційний шар перехресних класів: примітива `View`, відступи за шкалою токенів,
і семантичні кольорові переоприділення. На відміну від компонентних класів `-modifier`, ці використовують **подвійний
дефіс** (`--mod`), тож вони ніколи не конфліктують з іменами модифікаторів компонентів, і вони застосовуються до будь-якого
елемента — самостійно або композиційно на компоненті.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Поверхня accent-blue з текстом on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Вирівняно по центру з mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` це `View` InstUI. Це база, на яку нашаровуються відступи та колір, і вона
містить ключ-значення модифікатори для власних візуальних пропсів, щоб вам не доводилося тягнутися до утиліт:
`-background-*` (її поверхні), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, та `-cursor-*` — це власні
одно-дефісні модифікатори `view`, не пов'язані з подвійно-дефісними утилітами нижче. Властивості з довільними значеннями
(ширина/висота/вставка) залишаються inline-стилями; `margin`/`padding` використовують утиліти відступів.

**Відступи** — класи для окремих сторін за шкалою відступів. Читайте їх як `{m|p}{side}-{step}`: `m` для
margin або `p` для padding (або повні слова `margin`/`padding`), необов'язковий логічний бік, потім
крок. Тому `.--m-lg` і `.--margin-lg` однакові, так само як `.--pt-md` і `.--paddingt-md`.

- Сторони: none (всі), `t`/`b` (початок/кінець блоку), `s`/`e` (початок/кінець inline), `x`/`y` (inline/block
  вісь). Логічні сторони залишаються коректними в макетах справа-наліво.
- Кроки: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, плюс `auto` тільки для margin.

Компонувати їх для скорочення InstUI `margin="small auto large"`:
`class="--mt-sm --mx-auto --mb-lg"`.

**Колір** — семантичні переоприділення в палітрі: `.--bg-<name>` (фон),
`.--text-<name>` (колір тексту), і `.--border-<name>` (колір рамки). Кожен `<name>` — це
семантична кольорова назва токена — інтенції (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) плюс палітра `accent-*` (`accent-blue`, `accent-green` і т.д.). Ім'я існує лише якщо токен присутній у цій сім'ї, тому `text-brand` не є класом — тексту немає
брендового токена. Немає способу звернутися до примітива або довільного hex, і кожне переоприділення слідує темі.

**Сім'ї токенів** — кожна сім'я "один токен, одне властивість" отримує клас на токен, названий по токену. Комбінуйте їх вільно:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (і `-depth1`…`-card`) → `box-shadow`

Кожен встановлює лише одне своє властивість, тож `border-width`/`border-radius` потребують `border-*` кольору і стилю рамки, щоб фактично намалювати рамку. Вони використовують повну назву токена (`.--border-radius-md`), тоді як колірні та відступні допоміжні класи вище використовують короткі псевдоніми (`.--bg-brand`, `.--mt-lg`) — псевдоніми зручні; класи токенів буквальні та вичерпні.

**Макет** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) і `.--text-align-<value>` (`start`, `center`, `end`, `justify`) охоплюють крос-зрізові пропси `display` і `textAlign` InstUI (View, Button, Metric, Tabs, …) як композиційні класи —
тому вони не є модифікаторами кожного компонента.

Кожен клас з подвійним дефісом детермінованно перемагає однаковий по імені одно-дефісний компонентний модифікатор у каскаді, незалежно від порядку імпорту таблиць стилів — див. [Конвенції авторингу](/conventions/authoring) для механізму.

Все тут — чистий CSS, керований токенами `--instui-*`, тож це відстежує InstUI через шар токенів. Див. [Референс API](/api/) для `componentsCss` та побудувачів по компонентах.

## Оверлеї: діалог і поповер

Оверлейні компоненти використовують нативні платформи примітивів, тож вони поводяться доступно з малою або ж без JavaScript.

**Модал** — додайте `.instui-modal` на нативний `<dialog>`. Він отримує фокус-траплю, `Esc`-щоб-закрити, і `::backdrop` безкоштовно; бекдроп затемнюється тим же токеном `--instui-component-mask-background-color`
що й `.instui-mask` (додайте `-blur`, щоб зробити його матовим). Відкривайте і закривайте його командою-invoker — без скрипта:

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

**Context view / popover** — додайте `.instui-context-view` на елемент `[popover]` і перемикайте його за допомогою
`popovertarget`. Він розміщується у верхньому шарі і закривається при кліку поза або `Esc`, знову ж без скрипта:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — додайте `.instui-drawer-layout` на корінь макету з `.tray` та `.content`
дочірніми елементами. Додайте атрибут `open` (або `-open`), щоб розкрити шухляду, і використовуйте `placement="end"`
(або `-placement-end`), щоб пришвартувати її до inline-end сторони — розміщення вирішується через логічні
властивості `inset-inline-*`/`flex-direction`, тому воно автоматично інвертується під `dir="rtl"` без
додаткових правил. Пакет взаємодії для фокусування додає маршрутизацію команд Invoker і переключає режим оверлея
(`should-overlay-tray`) коли ширина перетинає `--drawer-layout-min-width` (за замовчуванням
`--instui-breakpoints-sm`, потім `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` залишається для in-flow оверлеїв (спінер над картою); `::backdrop` модала
покриває випадок модала.

Обидва патерни також обгорнуті як поведінкові кастомні елементи в `@pantoken/web-components`:
`<instui-modal open>` (— `<dialog>` керований через атрибут `open`) та `<instui-context-view>` (нативний popover).

Підтримка браузерів: API popover та `popovertarget` є Baseline 2024; команди invoker
(`command`/`commandfor`) — Baseline 2025, тому в старіших браузерах прив'яжіть кнопки до `dialog.showModal()`
як однорядковий фолбек. Позиціонування popover поруч з тригером використовує CSS anchor positioning де підтримується (Chromium); в інших випадках він центрирується у верхньому шарі.

## Форми

**FormField** — `.instui-form-field` це обгортка CSS-Grid, що розміщує підпис, контрол і будь-які
повідомлення. Додайте її на `<label>`, щоб підпис асоціювався з контролом нативно. Вона має три області сітки — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (за замовчуванням) складає області стосовно одна одної; `-layout-inline` розміщує підпис біля контролю (налаштуйте з `-label-align-{start,end}` та `-v-align-{top,middle,bottom}`). `-readonly` перефарбовує підпис.

**Зірочка "обов'язково"** з'являється, коли поле є обов'язковим або через клас `-required`, або через
нативний контрол `required` всередині нього — тож ви можете просто встановити `required` на input і маркер з'явиться.
Він декоративний ( `::after` на підписі, поза деревом доступності); поєднайте з приміткою на кшталт
"поля, позначені \* — обов'язкові", якщо форма не очевидна сама по собі.

**FormFieldGroup** — `.instui-form-field-group` групує пов'язані поля в `<fieldset>` з
описом `<legend>`. Це чистий макет (немає виділених токенів): за замовчуванням поля складаються вертикально;
`-layout-columns` / `-layout-inline` розміщують їх у відповідні колонки, з `-row-spacing-*` /
`-col-spacing-*` та `-v-align-*` для налаштування сітки.

**RadioInputGroup** — `.instui-radio-input-group` це та сама група `<fieldset>`/`<legend>`,
спеціалізована для радіо. Оскільки дочірні радіо ділять `name`, вибір є нативно одиночним —
тому набір перемикачів поводиться як один контрол, а не як розпливчасті кнопки. `-variant-simple` (за замовчуванням) розміщує
стандартні радіо (`-layout-columns`/`-inline` розміщують їх у ряд); `-variant-toggle` з'єднує
дочірні кнопки `.instui-radio.-variant-toggle` в єдиний сегментований контрол (зведені рамки,
закруглені зовнішні кінці):

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

**Повідомлення** — `.instui-form-field-messages` це контейнер; кожне `.instui-form-field-message` має
`-type-*`: `-type-hint` (сіре, за замовчуванням), `-type-error` (червоний текст + гліф кола-попередження), `-type-success`
(зелений текст + гліф кола-перевірки), і `-type-screenreader-only` (візуально обрізане, але все ще оголошується).
Гліфи фарбуються через `currentColor`, тож вони завжди відповідають кольору повідомлення. `-type-new-error` — застарілий псевдонім для `-type-error`. Підключіть контейнер до контролю за допомогою `aria-describedby`, і встановіть
`aria-invalid` на контролі, коли є помилка.

Всередині FormField, `-type-error` повідомлення слідує клієнтській валідації: воно залишається прихованим до тих пір, поки
контроль поля не стане `:user-invalid` (нативно, після взаємодії користувача) — або ви примусово показуєте його через `-invalid`
на `.instui-form-field` (для помилки на стороні сервера). Окреме `.instui-form-field-messages` (поза полем) не зачіпається. Контур фокусу контролю відповідає: danger коли `:user-invalid`/`-invalid`,
успіх при `-success`.

**Текстові контроли** — `.instui-text-input` (нативний `<input>`), `.instui-text-area` (нативний `<textarea>`,
з можливістю ресайзу), та `.instui-simple-select` (нативний `<select>` з кареткою) мають однаковий вигляд і стани: `-invalid` (рамка помилки), `-success` (рамка успіху), `-readonly`, нативний `:disabled`, та
`-size-{sm,md,lg}`. Для іконки зліва/справа (InstUI `renderBeforeInput`/`renderAfterInput`) обгорніть
input в `.instui-input-group` і додайте слот `.before`/`.after` (гліф `-icon-*`); `-should-not-wrap`
тримає його в один ряд. `.instui-number-input` — це фасад плюс стовпець спіна +/- `.arrows` (нативний
`type="number"`; пов'яжіть кнопки з `stepUp()`/`stepDown()`). `.instui-range-input` — стилізований
`input[type="range"]`, значення якого відображається в інверсній бульбашці `.instui-range-input-value`. Для складного
комбобоксу з listbox popover звертайтеся до `@instructure/ui` — ця бібліотека покриває нативні контроли.

**Стилізований випадач (експериментальний)** — опційний `select.css` оновлює _той самий_
елемент `.instui-simple-select`: він стилізує відкритий випадач (панель і кожну опцію, з hover та
станами вибраності) використовуючи модель CSS Customizable Select.

> [!WARNING]
> `select.css` покладається на `appearance: base-select` / `::picker(select)`, що є **експериментальними**
> (Chrome 135+, ще не Baseline). Він постачається як окрема опційна таблиця стилів і кожне правило захищене
> перевіркою `@supports (appearance: base-select)`, тож у неподтримуваних браузерах воно нічого не робить — контрол `.instui-simple-select` просто залишається звичайним нативним select. Завантажуйте його тільки якщо ви хочете
> покращений випадач і приймаєте обмежену підтримку.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
