# Компоненты

`@pantoken/components` поставляет стили компонентов на основе классов, собранные из токенов Instructure. Импортируйте таблицу стилей и пометьте вашу разметку — фреймворк не требуется.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Предпочитаете кастомные элементы? `@pantoken/web-components` оборачивает те же стили как `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` и другие — см. карту
> [пакетов](/api/).

## Соглашения

CSS-соглашения в этом пакете основаны на модифицированной версии [RSCSS](https://ricostacruz.com/rscss/index.html).

Модификаторы — это **ключ-значение** — `-<prop>-<val>`, согласованные с именами пропсов InstUI — поэтому они читаются сами за себя: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Булевыe пропсы — просто имя пропса, присутствие означает `true` (`-has-shadow`, `-clickable`); булев по умолчанию, отключённый, инвертирует (`-without-background`, `-without-border`). Размеры принимают короткие и длинные написания
(`-size-sm` = `-size-small`). Если имя отклоняется от InstUI, семантический класс InstUI всё ещё работает,
но помечен как устаревший (например `-variant-info` → используйте `-color-info`).

### Пример

Компонент Instructure UI на React:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

компоненты pantoken:

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

Для пропса `timeout` InstUI установите без ед. измерения настраиваемое свойство `--timeout` в миллисекундах и загрузите взаимодействие Alert. Положительное значение планирует закрытие; `0` (по умолчанию) оставляет алерт на месте. Добавьте классы `instui-transition -fade-entered` утилиты `transition` для эффекта исчезновения InstUI; опустите их для мгновенного удаления. Взаимодействие управляет состоянием `-fade-exiting` и генерирует отменяемое, всплывающее событие `dismiss` перед удалением, так что приложение может вызвать `preventDefault()`, чтобы удержать алерт смонтированным.

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

Индикаторы прогресса принимают произвольные шкалы через `--min` (`0` по умолчанию), `--value` и `--max`
(`100` по умолчанию), с устаревшими псевдонимами `--value-now` и `--value-max`. Добавьте `-should-animate`
чтобы применять полусекундный переход InstUI при изменении значения. `.value` находится рядом с `.bar` как дочерний элемент корня; добавьте `-render-value-inside`, чтобы отрисовать его над треком, выровненным по началу, вместо этого
(стилизовать для читаемости на фоне цвета метра). Используйте нативный `<progress>` для диапазона с нуля и `<meter>`, когда минимум не равен нулю; веб-компоненты автоматически выбирают между ними по атрибуту `min`. У InstUI нет состояния «неопределённо», поэтому `<progress>`,
у которого отсутствует атрибут `value`, — это лучшая догадка pantoken: `progress-bar` анимирует `.bar` как
скользящий сегмент, а `progress-circle` вращает своё кольцо с фиксированной дугой, оба скрывая `.value`.

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

Круги прогресса принимают те же произвольные шкалы через `--min`, `--value` и `--max`.
`--value-now` и `--value-max` остаются устаревшими функциональными псевдонимами. Добавьте `-should-animate` и
загрузите бандл взаимодействий для фокуса, чтобы воспроизвести анимацию монтирования InstUI; `--animation-delay` — это
безединичная задержка в миллисекундах. Устаревшие написания `-should-animate-on-mount` и
`-shold-animate-on-mount` остаются функциональными псевдонимами.

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

## Префикс классов

Каждый класс по умолчанию имеет пространство имён `instui-`. Постройте таблицу стилей с собственным префиксом — или без него — передавая `prefix` любому билдеру. Любое ложное значение (`null`, `undefined`, `""` или опускание) полностью убирает
префикс, так что можно авторить `class="heading -level-h1"` вместо `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Модификаторы с дефисом спереди (`.-color-secondary`, `.-level-h1`) остаются неизменными в любом случае. Таблицы стилей, поставляемые пакетом, сохраняют префикс `instui`.

## База

`base.css` — это opt-in reset, который устанавливает глобальные значения документа из токенов: `box-sizing`, сброс `body`, поверхность страницы, базовый цвет текста и шрифт, `color-scheme` (чтобы токены `light-dark()` и нативные элементы управления отслеживали тему), и базовая ссылка. Загрузите его один раз, перед таблицами стилей компонентов и прозы, когда pantoken владеет страницей.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Пропустите его, если вы встраиваете компоненты в хост, который уже темизирует собственные `html` и `body` —
сброс рисует поверхность страницы, поэтому не хотите, чтобы он конфликтовал с хостом. Всё, что он задаёт, использует
селекторы с низкой специфичностью `:where()`, так что ваши собственные правила всегда побеждают.

`base.css` _применяет_ фирменный шрифт (`font-family: var(--instui-font-family-base)`, с системными
фолбэками); чтобы _загрузить_ его, импортируйте opt-in `fonts.css` — правила `@font-face` для Atkinson Hyperlegible
Next, указывающие на woff2-файлы, поставляемые в пакете. Это отдельно, потому что гарнитуры ~350 kB и
самостоятельный хостинг шрифтов — осознанный выбор.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Содержание для экранных читалок

<p>Здесь есть скрытое сообщение после этого предложения.<span class="instui-screen-reader-content">Только экранные читалки это объявляют.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` скрывает элемент визуально, оставляя его в дереве доступности
— для меток и статусного текста, которые вспомогательные технологии должны читать, но дизайн не должен показывать.

## Утилиты

`utilities.css` — это opt-in слой сквозных классов: примитив `View`, отступы по шкале токенов и семантические переопределения цветов. В отличие от компонентных классов `-modifier`, эти используют **двойной дефис** (`--mod`), чтобы никогда не пересекаться с именами модификаторов компонента, и применяются к любому
элементу — как отдельному, так и составленному поверх компонента.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Поверхность accent-blue с текстом on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Выравнено по центру с mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` — это `View` InstUI. Это базовый блок, на который накладываются отступы и цвет, и он
несёт key-value модификаторы для собственных визуальных свойств, чтобы не приходилось прибегать к утилитам:
`-background-*` (его поверхности), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, и `-cursor-*` — это собственные
модификаторы с одним дефисом у `view`, не связанные с двойным дефисом утилит ниже. Свободные свойства
(ширина/высота/inset) остаются inline-стилями; `margin`/`padding` используют утилиты отступов.

**Отступы** — классы по сторонам на шкале отступов. Читаются как `{m|p}{side}-{step}`: `m` для
margin или `p` для padding (или полные слова `margin`/`padding`), необязательная логическая сторона, затем шаг. Поэтому `.--m-lg` и `.--margin-lg` одинаковы, как и `.--pt-md` и `.--paddingt-md`.

- Стороны: none (все), `t`/`b` (начало/конец блока), `s`/`e` (начало/конец inline), `x`/`y` (ось inline/block). Логические стороны остаются корректными в макетах справа-налево.
- Шаги: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, плюс `auto` только для margin.

Компоновать их для сокращения `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Цвет** — семантические переопределения, остающиеся в палитре: `.--bg-<name>` (фон),
`.--text-<name>` (цвет текста) и `.--border-<name>` (цвет границы). Каждый `<name>` — это
семантический цветовой токен — интенты (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) плюс палитра `accent-*` (`accent-blue`, `accent-green` и далее). Имя присутствует только если токен существует в этой группе, поэтому `text-brand` не является классом — у текста нет брендового токена. Нет способа обратиться к примитиву или произвольному hex, и каждое переопределение следует теме.

**Семейства токенов** — каждое семейство «один токен — одно свойство» получает класс на токен, названный по токену. Компоновать их свободно:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (и `-depth1`…`-card`) → `box-shadow`

Каждый устанавливает только своё свойство, поэтому `border-width`/`border-radius` нуждаются в `border-*` цвете и стиле границы, чтобы действительно нарисовать рамку. Они используют полное имя токена (`.--border-radius-md`), в то время как помощники цвета и отступов выше используют короткие псевдонимы (`.--bg-brand`, `.--mt-lg`) — псевдонимы удобны; классы токенов — буквальные и исчерпывающие.

**Макет** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) и `.--text-align-<value>` (`start`, `center`, `end`, `justify`) покрывают сквозные пропсы `display` и `textAlign` InstUI (View, Button, Metric, Tabs, …) как составные классы —
поэтому они не являются модификаторами для отдельных компонентов.

Любой класс с двойным дефисом детерминированно выигрывает каскад над одноимённым модификатором компонента с одним дефисом, независимо от порядка импорта таблиц стилей — см. [Соглашения по авторингу](/conventions/authoring) для механизма.

Всё здесь — чистый CSS, управляемый токенами `--instui-*`, поэтому он отслеживает InstUI через слой токенов. Смотрите [API reference](/api/) для `componentsCss` и билдеров по компонентам.

## Оверлеи: диалог и поповер

Оверлейные компоненты используют нативные платформенные примитивы, поэтому они ведут себя доступно с минимальным или вовсе без JavaScript.

**Модал** — поместите `.instui-modal` на нативный `<dialog>`. Он получает захват фокуса, закрытие по `Esc` и `::backdrop` бесплатно; фон затемняется тем же токеном `--instui-component-mask-background-color`
что и `.instui-mask` (добавьте `-blur`, чтобы сделать его замороженным). Открывайте и закрывайте с помощью invoker-команд — без скрипта:

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

**Контекстный просмотр / поповер** — поместите `.instui-context-view` на элемент `[popover]` и переключайте его с помощью
`popovertarget`. Он занимает верхний слой и закрывается по клику вне или по `Esc`, снова без скрипта:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — поместите `.instui-drawer-layout` на корень макета с дочерними `.tray` и `.content`.
Добавьте атрибут `open` (или `-open`), чтобы открыть лоток, и используйте `placement="end"`
(или `-placement-end`), чтобы докировать его к стороне inline-end — расположение разрешается через логические
свойства `inset-inline-*`/`flex-direction`, поэтому он автоматически переворачивается при `dir="rtl"` без
дополнительных правил. Бандл взаимодействий для фокуса добавляет маршрутизацию Invoker-команд и переключает режим оверлея
(`should-overlay-tray`), когда ширина пересекает `--drawer-layout-min-width` (по умолчанию
`--instui-breakpoints-sm`, затем `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Маска** — `.instui-mask` остаётся для оверлеев в потоке (спиннер над карточкой); `::backdrop` модала покрывает модальный случай.

Обе схемы также обёрнуты как поведенческие кастомные элементы в `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` управляемый его атрибутом `open`) и `<instui-context-view>` (нативный popover).

Поддержка браузеров: API поповера и `popovertarget` — Baseline 2024; invoker-команды
(`command`/`commandfor`) — Baseline 2025, поэтому в старых браузерах подключите кнопки к `dialog.showModal()`
как однострочный fallback. Позиционирование поповера рядом с триггером использует CSS anchor positioning там, где поддерживается (Chromium); в других местах он центрируется в верхнем слое.

## Формы

**FormField** — `.instui-form-field` — это CSS-Grid оболочка, раскладывающая метку, контрол и любые
сообщения. Поместите её на `<label>`, чтобы метка ассоциировалась с контролом нативно. У неё три области сетки — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (по умолчанию) стекует области; `-layout-inline` размещает метку рядом с контролом (настраивается с помощью `-label-align-{start,end}` и `-v-align-{top,middle,bottom}`). `-readonly` перекрашивает метку.

Звёздочка обязательности появляется, когда поле обязательно _либо_ классом `-required` _либо_ нативным `required` элементом внутри — поэтому можно просто поставить `required` на input и маркер отобразится.
Это декоративно ( `::after` на метке, вне дерева доступности); сопутствуйте заметкой вроде
"поля отмеченные \* обязательны", если форма не очевидна.

**FormFieldGroup** — `.instui-form-field-group` группирует связанные поля в `<fieldset>` с
описанием `<legend>`. Это чистый макет (без выделенных токенов): по умолчанию поля стекуются;
`-layout-columns` / `-layout-inline` размещают их в адаптивные колонки, с `-row-spacing-*` /
`-col-spacing-*` и `-v-align-*` для настройки сетки.

**RadioInputGroup** — `.instui-radio-input-group` — это та же группировка `<fieldset>`/`<legend>`,
специализированная для радио. Поскольку дочерние радио разделяют `name`, выбор нативно одиночный —
поэтому набор переключателей ведёт себя как один контрол, а не как отдельные кнопки. `-variant-simple` (по умолчанию) раскладывает
стандартные радио (`-layout-columns`/`-inline` размещают их в ряд); `-variant-toggle` соединяет
дочерние кнопки `.instui-radio.-variant-toggle` в единый сегментированный контрол (слитые границы,
закруглённые внешние края):

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

**Сообщения** — `.instui-form-field-messages` — контейнер; каждое `.instui-form-field-message` принимает
`-type-*`: `-type-hint` (серый, по умолчанию), `-type-error` (красный текст + значок круга-оповещения), `-type-success`
(зелёный текст + значок круга-проверки) и `-type-screenreader-only` (визуально обрезано, но всё ещё объявляется). Значки окрашиваются в `currentColor`, так что они всегда соответствуют цвету сообщения. `-type-new-error` — это
устаревший псевдоним `-type-error`. Свяжите контейнер с контролом через `aria-describedby`, и установите
`aria-invalid` на контрол при ошибке.

Внутри FormField, сообщение `-type-error` следует за валидацией на стороне клиента: оно остаётся скрытым до тех пор, пока контрол поля не станет `:user-invalid` (нативно, после взаимодействия пользователя) — или вы не форсируете его с помощью `-invalid`
на `.instui-form-field` (для серверной ошибки). Отдельный `.instui-form-field-messages` (не в поле) не затрагивается. Кольцо фокуса контрола следует той же логике: опасность при `:user-invalid`/`-invalid`,
успех при `-success`.

**Текстовые контролы** — `.instui-text-input` (нативный `<input>`), `.instui-text-area` (нативный `<textarea>`,
с возможностью изменения размера) и `.instui-simple-select` (нативный `<select>` с кареткой) имеют единый вид и те же
состояния: `-invalid` (граница ошибки), `-success` (граница успеха), `-readonly`, нативный `:disabled`, и
`-size-{sm,md,lg}`. Для иконки с начала/конца (InstUI `renderBeforeInput`/`renderAfterInput`), оберните
input в `.instui-input-group` и добавьте слот `.before`/`.after` (иконка `-icon-*`); `-should-not-wrap`
удерживает его в одной линии. `.instui-number-input` — это фасад плюс колонка спиннера +/- `.arrows` (нативный
`type="number"`; подключите кнопки к `stepUp()`/`stepDown()`). `.instui-range-input` — стилизованный
`input[type="range"]`, значение в котором отображается в инверсной пузыристой `.instui-range-input-value`. Для богатого
combobox с листбокс-поповером используйте `@instructure/ui` — эта библиотека покрывает нативные контролы.

**Стилизованный select (experimental)** — opt-in `select.css` улучшает _тот же_
элемент `.instui-simple-select`: он стилизует открытое выпадающее меню (панель и каждую опцию, с hover и
selected состояниями), используя модель CSS Customizable Select.

> [!WARNING]
> `select.css` опирается на `appearance: base-select` / `::picker(select)`, что **экспериментально**
> (Chrome 135+, ещё не в Baseline). Он поставляется как отдельный opt-in лист и каждое правило защищено
> условием `@supports (appearance: base-select)`, так что в неподдерживаемых браузерах оно ничего не делает — контрол
> `.instui-simple-select` просто остаётся нативным select. Загружайте его только если хотите
> улучшенный выпадающий список и принимаете ограниченную поддержку.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
