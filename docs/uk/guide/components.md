# Компоненти

`@pantoken/components` постачає стилі компонентів на основі класів, побудовані з токенів Instructure. Імпортуйте таблицю стилів і тегуйте вашу розмітку — без потреби в фреймворку.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Віддаєте перевагу кастомним елементам? `@pantoken/web-components` обгортає ті самі стилі як `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` та інші — див. [мапу пакетів](/guide/packages).

## Угоди

CSS-угоди в цьому пакеті базуються на модифікованій версії [RSCSS](https://ricostacruz.com/rscss/index.html).

Модифікатори — це **ключ-значення** — `-<prop>-<val>`, вирівняні з іменами пропсів InstUI — тож вони читаються самі за себе: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Булеві пропси — це просто ім'я пропса, присутність означає `true` (`-has-shadow`, `-clickable`); булевий пропс із значенням за замовчуванням увімкнено, який вимикають, інвертує (`-without-background`, `-without-border`). Розміри приймають короткі та довгі написання (`-size-sm` = `-size-small`). Там, де ім'я відрізняється від InstUI, семантичний клас InstUI все ще працює, але застарілий (наприклад `-variant-info` → використовуйте `-color-info`).

### Приклад

Компонент Instructure UI на React:

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

Для пропса InstUI `timeout` встановіть безодиничну користувацьку властивість `--timeout` в мілісекундах і завантажте взаємодію Alert. Позитивне значення планує автоматичне закриття; `0` (за замовчуванням) залишає сповіщення на місці. Додайте утиліту `transition` класи `instui-transition -fade-entered` для ефекту зникнення InstUI; опустіть їх для миттєвого видалення. Взаємодія керує станом `-fade-exiting` і викликає скасовувану, поширювану подію `dismiss` перед видаленням, тож додаток може викликати `preventDefault()`, щоб тримати сповіщення змонтованим.

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

Індикатори прогресу приймають довільні шкали через `--min` (`0` за замовчуванням), `--value` і `--max`
(`100` за замовчуванням), з застарілими псевдонімами `--value-now` та `--value-max`. Додайте `-should-animate`
щоб застосувати півсекундний перехід InstUI при зміні значення. `.value` стоїть поруч з `.bar` як
дитина кореня; додайте `-render-value-inside`, щоб відрендерити його над треком, вирівняним до початку,
замість цього (оформіть його для читабельності на фоні кольору метра). Використовуйте нативний `<progress>` для
діапазону з нуля і `<meter>`, коли мінімум відмінний від нуля; веб-компоненти обирають між ними
автоматично за атрибутом `min`. У InstUI немає невизначеного стану, тож `<progress>`,
який позбавлений атрибуту `value`, — це лише найкраща здогадка pantoken: `progress-bar` анімує `.bar` як
ковзаючий сегмент, а `progress-circle` крутить його кільце за фіксованою дугою; обидва приховують `.value`.

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

Кругові індикатори прогресу приймають ті самі довільні шкали через `--min`, `--value` і `--max`.
`--value-now` та `--value-max` залишаються як застарілі функціональні псевдоніми. Додайте `-should-animate` і
завантажте бандл взаємодій для фокусу, щоб відтворити анімацію монтажу InstUI; `--animation-delay` — це
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

Кожен клас просторово іменований `instui-` за замовчуванням. Побудуйте таблицю стилів зі своїм префіксом — або без нього — передаючи
`prefix` будь-якому билдера. Будь-яке false-подібне значення (`null`, `undefined`, `""`, або пропуск) повністю видаляє
префікс, тож можна авторити `class="heading -level-h1"` замість `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Модифікатори з дефісом на початку (`.-color-secondary`, `.-level-h1`) незмінні в обох випадках. Таблиці стилів, що постачаються пакетом, зберігають префікс `instui`.

## База

`base.css` — це opt-in reset, який встановлює глобальні значення документа з токенів: `box-sizing`, скидання `body`, поверхню сторінки, базовий колір тексту і шрифт, `color-scheme` (щоб `light-dark()` токени
і нативні контролі відслідковували тему), і базове посилання. Завантажте його один раз, перед компонентною і прозовою
таблицями стилів, коли pantoken володіє сторінкою.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Пропустіть його, коли вбудовуєте компоненти в хост, який вже темує свою `html` і `body` —
reset фарбує поверхню сторінки, тож не хочете, щоб він конфліктував із хостом. Все, що він встановлює, використовує
низько-специфічні селектори `:where()`, тож ваші власні правила завжди мають перевагу.

`base.css` _застосовує_ бренд-шрифт (`font-family: var(--instui-font-family-base)`, з системними
фолбек-параметрами); щоб _завантажити_ його, імпортуйте opt-in `fonts.css` — `@font-face` правила для Atkinson Hyperlegible
Next, що вказують на woff2-файли, які постачає пакет. Це окремо, тому що файли шрифтів близько ~350 kB і
самостійне хостинг шрифтів — свідомий вибір.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Вміст для екранних рідерів

<p>Після цього речення є приховане повідомлення.<span class="instui-screen-reader-content">Тільки екранні рідери це оголошують.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ховає елемент візуально, залишаючи його в дереві доступності
— для підписів і статусного тексту, який має читати допоміжне ПЗ, але дизайн не повинен показувати.

## Утиліти

`utilities.css` — opt-in шар перехресних класів: примітив `View`, відступи за токен-скаляром,
і семантичні кольорові переважування. На відміну від компонентних класів `-modifier`, ці використовують **подвійний
дефіс** (`--mod`), тож вони ніколи не конфліктуватимуть з іменами модифікаторів компонентів, і застосовуються до будь-якого
елемента — самостійно або в композиції з компонентом.

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

**View** — `.instui-view` — це `View` InstUI. Це базовий елемент, на який накладаються відступи та колір, і він
несе ключ-значення модифікатори для власних візуальних пропсів, тож не треба звертатись до утиліт:
`-background-*` (його поверхні), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, і `-cursor-*` — це власні
модифікатори `view`, з одним дефісом, не пов'язані з подвійним дефісом утиліт нижче. Пропси зі значенням вільного формату
(ширина/висота/вставки) залишаються інлайн-стилями; `margin`/`padding` використовують утиліти відступів.

**Відступи** — класи для кожної сторони за шкалою відступів. Читаються як `{m|p}{side}-{step}`: `m` для
margin або `p` для padding (або повні слова `margin`/`padding`), необов'язкова логічна сторона, потім
ступінь. Тож `.--m-lg` і `.--margin-lg` однакові, як і `.--pt-md` і `.--paddingt-md`.

- Сторони: none (усі), `t`/`b` (початок/кінець блоку), `s`/`e` (початок/кінець рядка), `x`/`y` (вісь inline/block).
  Логічні сторони залишаються коректними у макетах справа-наліво.
- Ступені: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, плюс `auto` лише для margin.

Складайте їх разом для скорочення InstUI `margin="small auto large"`:
`class="--mt-sm --mx-auto --mb-lg"`.

**Колір** — семантичні переважування, що залишаються в палітрі: `.--bg-<name>` (фон),
`.--text-<name>` (колір тексту), і `.--border-<name>` (колір бордера). Кожен `<name>` — це
семантичний кольоровий токен — інтенти (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) плюс палітра `accent-*` (`accent-blue`, `accent-green`, і далі). Ім'я існує тільки якщо токен є в цій родині, тож `text-brand` не є класом — текст не має брендового токена. Неможливо звернутися до примітива або довільного hex, і кожне переважування дотримується теми.

**Родини токенів** — кожна "один токен, одне властивість" родина має клас на токен, названий по імені токена. Комбінуйте їх довільно:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (і `-depth1`…`-card`) → `box-shadow`

Кожен встановлює лише свою властивість, тож `border-width`/`border-radius` потребують `border-*` колір і стиль бордера, щоб фактично намалювати рамку. Вони використовують повне ім'я токена (`.--border-radius-md`), тоді як кольорові та відступні хелпери вище використовують короткі псевдоніми (`.--bg-brand`, `.--mt-lg`) — ці псевдоніми зручні; класи токенів є буквальними і вичерпними.

**Макет** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) і `.--text-align-<value>` (`start`, `center`, `end`, `justify`) охоплюють перехресні пропси
`display` і `textAlign` InstUI (View, Button, Metric, Tabs, …) як композиційні класи —
тому вони не є модифікаторами для кожного компонента.

Кожен клас з подвійним дефісом завжди перемагає в каскаді над одноіменним модифікатором з одним дефісом, незалежно від порядку імпорту стилів — див. [Угоди авторингу](/conventions/authoring) для механізму.

Усе тут — чистий CSS, керований токенами `--instui-*`, тож він відслідковує InstUI через шар токенів. Див. [API reference](/api/) для `componentsCss` і генератори по компонентах.

## Оверлеї: діалог і поповер

Оверлей-компоненти використовують нативні примітиви платформи, тож вони поводяться доступно з мінімумом або без JavaScript.

**Modal** — покладіть `.instui-modal` на нативний `<dialog>`. Він отримує фокус-трепінг, закриття по `Esc` і
`::backdrop` без додаткового коду; фон затемнюється тим же токеном `--instui-component-mask-background-color`
що і `.instui-mask` (додайте `-blur`, щоб злегка заморозитись). Відкривайте та закривайте його invoker командами — без скрипта:

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

**Context view / popover** — покладіть `.instui-context-view` на елемент `[popover]` і перемикайте його за допомогою
`popovertarget`. Він їде у верхній шар і зникає при кліку поза ним або `Esc`, знову ж таки без скрипта:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — покладіть `.instui-drawer-layout` на корінь макета з `.tray` і `.content`
дітьми. Додайте атрибут `open` (або `-open`), щоб відкрити панель, і використовуйте `placement="end"`
(або `-placement-end`), щоб закріпити її на inline-end боці — розміщення визначається логічними
властивостями `inset-inline-*`/`flex-direction`, тож воно автоматично перевертається під `dir="rtl"` без
додаткових правил. Бандл фокусованих взаємодій додає маршрутизацію команд Invoker і переключає режим оверлею
(`should-overlay-tray`), коли ширина перетинає `--drawer-layout-min-width` (за замовчуванням
`--instui-breakpoints-sm`, потім `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` підходить для вбудованих оверлеїв (спінер над картою); `::backdrop`
модального покриття покриває випадок модального вікна.

Обидва патерни також обгорнуті як поведінкові кастомні елементи в `@pantoken/web-components`:
`<instui-modal open>` (керований `<dialog>` через свій атрибут `open`) і `<instui-context-view>` (нативний поповер).

Підтримка браузерів: Popover API і `popovertarget` — Baseline 2024; invoker команди
(`command`/`commandfor`) — Baseline 2025, тож в старіших браузерах підключайте кнопки до `dialog.showModal()`
як одно-рядковий fallback. Позиціонування поповера поруч з тригером використовує CSS anchor positioning де підтримується (Chromium); інакше він центрується в верхньому шарі.

## Форми

**FormField** — `.instui-form-field` — це обгортка CSS-Grid, що розміщує підпис, контрол і будь-які
повідомлення. Покладіть його на `<label>`, щоб підпис був асоційований з контролом нативно. Він має три області грида — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (за замовчуванням) складає області стопкою; `-layout-inline` розміщує підпис поруч з контролом (налаштовується
через `-label-align-{start,end}` і `-v-align-{top,middle,bottom}`). `-readonly` змінює колір підпису.

**Зірочка обов'язковості** з'являється, коли поле є обов'язковим _або_ через клас `-required` _або_ нативний контроль `required` всередині нього — тож можна просто встановити `required` на input і маркер відобразиться.
Вона декоративна (це `::after` на підписі, поза деревом доступності); поєднайте її з приміткою на кшталт
"поля, позначені \*, є обов'язковими", якщо форма не очевидна.

**FormFieldGroup** — `.instui-form-field-group` групує пов'язані поля в `<fieldset>` з
описом `<legend>`. Це чистий макет (без спеціальних токенів): за замовчуванням поля складаються стопкою;
`-layout-columns` / `-layout-inline` розміщують їх у адаптивні колонки, з `-row-spacing-*` /
`-col-spacing-*` і `-v-align-*` для налаштування грида.

**RadioInputGroup** — `.instui-radio-input-group` — це та сама групування `<fieldset>`/`<legend>`,
спеціалізована для радіо-кнопок. Оскільки дочірні радіо ділять `name`, вибір є нативно одиночним —
тому набір кнопок-перемикачів поводиться як один контрол, а не як окремі кнопки. `-variant-simple` (за замовчуванням) розміщує
стандартні радіо (`-layout-columns`/`-inline` розташовують їх у ряд); `-variant-toggle` з'єднує
дочірні `.instui-radio.-variant-toggle` кнопки в єдиний сегментований контрол (спаяні бордери,
округлені зовнішні кінці):

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

**Повідомлення** — `.instui-form-field-messages` — це контейнер; кожне `.instui-form-field-message` має
`-type-*`: `-type-hint` (сіре, за замовчуванням), `-type-error` (червоний текст + гліф кола-попередження), `-type-success`
(зелений текст + гліф кола-підтвердження), і `-type-screenreader-only` (візуально обрізане, але все ще оголошується).
Гліфи фарбуються в `currentColor`, тож вони завжди відповідають кольору повідомлення. `-type-new-error` — застарілий псевдонім `-type-error`. Зв'яжіть контейнер з контролом через `aria-describedby`, і встановіть
`aria-invalid` на контрол, коли є помилка.

Всередині FormField, `-type-error` повідомлення слідує за клієнтською валідацією: воно приховане доти, поки контрол поля не буде `:user-invalid` (нативно, після взаємодії користувача) — або ви змусите його показати через `-invalid`
на `.instui-form-field` (для помилки сервера). Самостійне `.instui-form-field-messages` (не в полі) не зачіпається. Кільце фокусу контролу відповідає: danger коли `:user-invalid`/`-invalid`,
успіх на `-success`.

**Текстові контроли** — `.instui-text-input` (нативний `<input>`), `.instui-text-area` (нативний `<textarea>`,
з можливістю зміни розміру), і `.instui-simple-select` (нативний `<select>` з кареткою) ділять один вигляд і ті самі
стани: `-invalid` (рамка помилки), `-success` (рамка успіху), `-readonly`, нативний `:disabled`, та
`-size-{sm,md,lg}`. Для іконки спереду/ззаду (InstUI `renderBeforeInput`/`renderAfterInput`) обгорніть
input в `.instui-input-group` і додайте слот `.before`/`.after` (гліф `-icon-*`); `-should-not-wrap`
утримує його в один рядок. `.instui-number-input` — це фасад плюс колонка спінера +/- `.arrows` (нативний
`type="number"`; підключіть кнопки до `stepUp()`/`stepDown()`). `.instui-range-input` — стилізований
`input[type="range"]`, значення якого рендериться в `.instui-range-input-value` інверсній бульбашці. Для багатого
комбобоксу зі списком-поповером, використайте `@instructure/ui` — ця бібліотека покриває нативні контролі.

**Стилізований select dropdown (експериментально)** — opt-in `select.css` оновлює _той самий_
елемент `.instui-simple-select`: він стилізує відкритий дропдаун (панель і кожну опцію, з ховером та
станом вибраного) використовуючи модель CSS Customizable Select.

> [!WARNING]
> `select.css` покладається на `appearance: base-select` / `::picker(select)`, які є **експериментальними**
> (Chrome 135+, ще не Baseline). Він постачається як окрема opt-in таблиця стилів і кожне правило захищене
> за `@supports (appearance: base-select)`, тож у непідтримуваних браузерах він нічого не робить — контроль `.instui-simple-select` просто залишається звичайним нативним select. Завантажуйте його лише якщо бажаєте покращений дропдаун і приймаєте обмежену підтримку.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
