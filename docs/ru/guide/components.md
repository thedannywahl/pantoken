# Компоненты

`@pantoken/components` поставляется со стильными компонентами на основе классов, собранными из токенов Instructure. Импортируйте таблицу стилей и пометьте вашу разметку — фреймворк не требуется.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Предпочитаете пользовательские элементы? `@pantoken/web-components` оборачивает те же стили как `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` и другие — см. карту
> [пакетов](/guide/packages).

## Соглашения

Правила CSS в этом пакете основаны на модифицированной версии [RSCSS](https://ricostacruz.com/rscss/index.html).

Модификаторы — это **ключ-значение** — `-<prop>-<val>`, согласованные с именами пропсов InstUI — поэтому они читаются самостоятельно: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Булевыe пропсы — это само имя пропса; их наличие означает `true` (`-has-shadow`, `-clickable`); булевый проп по умолчанию, включённый по умолчанию, инвертируется при отключении (`-without-background`, `-without-border`). Размеры принимают короткие и полные написания (`-size-sm` = `-size-small`). Там, где имя отличается от InstUI, семантический класс InstUI по-прежнему работает, но помечен как устаревший (например `-variant-info` → используйте `-color-info`).

### Пример

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

Для пропса InstUI `timeout` задайте безединичное кастомное свойство `--timeout` в миллисекундах и загрузите взаимодействие Alert. Положительное значение планирует скрытие; `0` (по умолчанию) оставляет алерт на месте. Добавьте классы `instui-transition -fade-entered` утилиты `transition` для эффекта затухания InstUI; опустите их для мгновенного удаления. Взаимодействие управляет состоянием `-fade-exiting` и генерирует отменяемое, всплывающее событие `dismiss` перед удалением, так что приложение может вызвать `preventDefault()`, чтобы удержать алерт в DOM.

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

Полосы прогресса принимают произвольные шкалы через `--min` (по умолчанию `0`), `--value` и `--max`
(по умолчанию `100`), с устаревшими псевдонимами `--value-now` и `--value-max`. Добавьте `-should-animate`,
чтобы применять полусекундный переход InstUI при изменении значения. `.value` располагается рядом с `.bar` как
дочерний элемент корня; добавьте `-render-value-inside`, чтобы отрисовать его поверх трека, выровненным по началу,
вместо этого (стилируйте для читаемости на фоне цвета метра). Используйте родной `<progress>` для
диапазона с нулевой базой и `<meter>`, когда минимум ненулевой; веб-компоненты выбирают между ними
автоматически по атрибуту `min`. В InstUI нет состояния indeterminate, поэтому `<progress>`,
у которого отсутствует атрибут `value`, — это догадка pantoken: `progress-bar` анимирует `.bar` как
скользящий сегмент, а `progress-circle` вращает кольцо на фиксированном дуговом секторе, при этом оба скрывают `.value`.

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

Круговые индикаторы принимают те же произвольные шкалы через `--min`, `--value` и `--max`.
`--value-now` и `--value-max` остаются устаревшими функциональными псевдонимами. Добавьте `-should-animate` и
загрузите пакет взаимодействий для фокуса, чтобы воспроизвести анимацию монтирования InstUI; `--animation-delay` — это
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

Каждый класс по умолчанию именуется в пространстве имён `instui-`. Постройте таблицу стилей с вашим префиксом — или без — передав `prefix` любому билдеру. Любое ложное значение (`null`, `undefined`, `""` или его опускание) полностью убирает префикс, так что вы можете писать `class="heading -level-h1"` вместо `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Модификаторы с дефисным префиксом (`.-color-secondary`, `.-level-h1`) в любом случае не меняются. Таблицы стилей, поставляемые пакетом, сохраняют префикс `instui`.

## База

`base.css` — это опциональный reset, который устанавливает глобальные значения документа из токенов: `box-sizing`, reset `body`, поверхность страницы, базовый цвет текста и шрифт, `color-scheme` (чтобы токены `light-dark()` и нативные элементы управления следовали теме), и базовую ссылку. Загрузите его один раз, перед таблицами стилей компонентов и прозы, когда pantoken владеет страницей.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Пропустите его, если вы встраиваете компоненты в хост, который уже задаёт свою собственную тему `html` и `body` —
reset красит поверхность страницы, поэтому вам не нужно, чтобы он конфликтовал с хостом. Всё, что он устанавливает, использует
низкоспецифичные селекторы `:where()`, поэтому ваши собственные правила всегда имеют приоритет.

`base.css` _применяет_ фирменный шрифт (`font-family: var(--instui-font-family-base)`, с системными запасными шрифтами); чтобы _загрузить_ его, импортируйте опциональный `fonts.css` — `@font-face` правила для Atkinson Hyperlegible
Next, указывающие на woff2-файлы, поставляемые в пакете. Это отдельно потому, что гарнитуры ~350 кБ и
самостоятельный хостинг шрифтов — осознанный выбор.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Контент для чтения экраном

<p>После этого предложения скрытое сообщение.<span class="instui-screen-reader-content">Только скринридеры это озвучивают.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` визуально скрывает элемент, оставляя его в дереве доступности
— для ярлыков и статусных текстов, которые вспомогательные технологии должны читать, а дизайн показывать не должен.

## Утилиты

`utilities.css` — это опциональный слой кросс-срезовых классов: примитив `View`, отступы по шкале токенов и семантические переопределения цвета. В отличие от компонентных классов `-modifier`, эти используют **двойной дефис** (`--mod`), чтобы никогда не пересекаться с собственными именами модификаторов компонента, и применяются к любому
элементу — голому или составленному поверх компонента.

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

**View** — `.instui-view` это `View` InstUI. Это база, на которую накладываются отступы и цвета, и она
несёт модификаторы ключ-значение для собственных визуальных пропсов, чтобы не пришлось тянуться к утилитам:
`-background-*` (её поверхности), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` и `-cursor-*` — это собственные
одно-дефисные модификаторы `view`, не связанные с двойным дефисом утилит ниже. Пропсы со свободным значением
(ширина/высота/вставки) остаются inline-стилями; `margin`/`padding` используют утилиты отступов.

**Отступы** — классы по стороне на шкале отступов. Читайте их как `{m|p}{side}-{step}`: `m` для
маргина или `p` для паддинга (или полные слова `margin`/`padding`), опциональная логическая сторона, затем
шаг. Так что `.--m-lg` и `.--margin-lg` одинаковы, как и `.--pt-md` и `.--paddingt-md`.

- Стороны: none (все), `t`/`b` (начало/конец блока), `s`/`e` (начало/конец inline), `x`/`y` (осевая линия inline/block). Логические стороны остаются корректными в макетах справа-налево.
- Шаги: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, плюс `auto` только для margin.

Комбинируйте их для сокращения InstUI `margin="small auto large"`:
`class="--mt-sm --mx-auto --mb-lg"`.

**Цвет** — семантические переопределения, остающиеся в палитре: `.--bg-<name>` (фон),
`.--text-<name>` (цвет текста) и `.--border-<name>` (цвет границы). Каждый `<name>` — это
семантический токен цвета — интенты (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) плюс палитра `accent-*` (`accent-blue`, `accent-green` и т.д.). Имя присутствует только если токен существует в этой семье, поэтому `text-brand` не является классом — текст не имеет брендового токена. Нельзя обратиться к примитиву или произвольному hex, и каждое переопределение следует теме.

**Семейства токенов** — каждое семейство «один токен, одно свойство» получает класс для каждого токена, названный по имени токена. Комбинируйте их свободно:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (и `-depth1`…`-card`) → `box-shadow`

Каждый выставляет только своё свойство, поэтому `border-width`/`border-radius` нуждаются в `border-*` цвете и стиле границы, чтобы действительно отрисовать границу. Эти классы используют полное имя токена (`.--border-radius-md`), тогда как помощники по цвету и отступам выше используют короткие алиасы (`.--bg-brand`, `.--mt-lg`) — алиасы удобны; классы токенов — буквальные и исчерпывающие.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) и `.--text-align-<value>` (`start`, `center`, `end`, `justify`) покрывают кросс-срезовые пропсы `display` и `textAlign` InstUI (View, Button, Metric, Tabs, …) как составные классы —
так что это не модификаторы на компонент.

Каждый класс с двойным дефисом детерминированно побеждает одноимённый одно-дефисный модификатор компонента, независимо от порядка подключения таблиц стилей — см. [Правила авторинга](/conventions/authoring)
для механизма.

Всё здесь — чистый CSS, управляемый токенами `--instui-*`, поэтому он следует InstUI через слой токенов. См. [API reference](/api/) для `componentsCss` и билдера по каждому компоненту.

## Оверлеи: диалог и поповер

Компоненты оверлеев опираются на нативные платформенные примитивы, поэтому ведут себя доступно с минимальным или без JavaScript.

**Modal** — поместите `.instui-modal` на нативный `<dialog>`. Он получает захват фокуса, закрытие по `Esc` и
`::backdrop` бесплатно; задний фон затемняется тем же токеном `--instui-component-mask-background-color`
что и `.instui-mask` (добавьте `-blur`, чтобы подснежить). Открывайте и закрывайте через invoker-команды — без скрипта:

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

**Context view / popover** — поместите `.instui-context-view` на элемент `[popover]` и переключайте его с помощью
`popovertarget`. Он находится в верхнем слое и закрывается по клику вне или по `Esc`, снова без скрипта:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — поместите `.instui-drawer-layout` на корень макета с дочерними `.tray` и `.content`.
Добавьте атрибут `open` (или `-open`) чтобы показать выдвижной лоток, и используйте `placement="end"`
(или `-placement-end`) чтобы закрепить его по inline-end стороне — позиционирование разрешается через логические
свойства `inset-inline-*`/`flex-direction`, поэтому оно автоматически меняет сторону под `dir="rtl"` без
дополнительных правил. Пакет взаимодействий для фокуса добавляет маршрутизацию Invoker-команд и переключает режим оверлея
(`should-overlay-tray`) при пересечении ширины `--drawer-layout-min-width` (по умолчанию
`--instui-breakpoints-sm`, затем `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` используется для in-flow оверлеев (спиннер поверх карточки); у модального случая используется `::backdrop`.

Обе модели также обернуты как поведенческие кастомные элементы в `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` управляемый атрибутом `open`) и `<instui-context-view>` (нативный popover).

Поддержка браузеров: Popover API и `popovertarget` — Baseline 2024; invoker-команды
(`command`/`commandfor`) — Baseline 2025, поэтому в старых браузерах привяжите кнопки к `dialog.showModal()`
как однострочный fallback. Позиционирование поповера рядом с триггером использует CSS anchor positioning там, где поддерживается (Chromium); в остальных случаях он центрируется в верхнем слое.

## Формы

**FormField** — `.instui-form-field` это оболочка на CSS-Grid, выстраивающая метку, контроль и любые
сообщения. Поместите его на `<label>`, чтобы метка ассоциировалась с контролом нативно. У него три области грида — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (по умолчанию) стекает области; `-layout-inline` ставит метку рядом с контролом (настраивается через `-label-align-{start,end}` и `-v-align-{top,middle,bottom}`). `-readonly` перекрашивает метку.

**Звёздочка обязательности** появляется, когда поле обязательно либо классом `-required`, либо нативным контролом `required` внутри — поэтому можно просто установить `required` на input и метка покажется.
Она декоративна ( `::after` на метке, вне дерева доступности); сопоставьте её с примечанием вроде
"поля, отмеченные \* обязательны", если форма не очевидна.

**FormFieldGroup** — `.instui-form-field-group` группирует связанные поля в `<fieldset>` с описанием `<legend>`. Это чистый layout (без специальных токенов): по умолчанию поля стекуются;
`-layout-columns` / `-layout-inline` размещают их в адаптивные колонки, с `-row-spacing-*` /
`-col-spacing-*` и `-v-align-*` для тонкой настройки грида.

**RadioInputGroup** — `.instui-radio-input-group` это та же группировка `<fieldset>`/`<legend>`,
специализированная для радио. Поскольку дочерние радио разделяют `name`, выбор нативно одиночный —
поэтому набор переключателей ведёт себя как один контрол, а не как отдельные кнопки. `-variant-simple` (по умолчанию) раскладывает
стандартные радио (`-layout-columns`/`-inline` располагают их в ряд); `-variant-toggle` соединяет
дочерние кнопки `.instui-radio.-variant-toggle` в одно сегментированное управление (схлопнутые границы,
скруглённые внешние концы):

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

**Messages** — `.instui-form-field-messages` это контейнер; каждое `.instui-form-field-message` принимает
`-type-*`: `-type-hint` (серый, по умолчанию), `-type-error` (красный текст + глиф оповещения в круге), `-type-success`
(зелёный текст + глиф подтверждения в круге), и `-type-screenreader-only` (визуально обрезано, но всё ещё озвучивается).
Глифы раскрашиваются в `currentColor`, поэтому всегда соответствуют цвету сообщения. `-type-new-error` — устаревший псевдоним для `-type-error`. Свяжите контейнер с контролом через `aria-describedby`, и установите
`aria-invalid` на контрол при ошибке.

Внутри FormField, `-type-error` сообщение следует за клиентской валидацией: оно скрыто до тех пор, пока
контрол поля не станет `:user-invalid` (нативно, после взаимодействия пользователя) — или вы не принудите его с помощью `-invalid`
на `.instui-form-field` (для серверной ошибки). Отдельный `.instui-form-field-messages` (не в поле) не затрагивается. Контур фокуса контрола следует той же логике: опасность при `:user-invalid`/`-invalid`,
успех при `-success`.

**Текстовые контроли** — `.instui-text-input` (нативный `<input>`), `.instui-text-area` (нативный `<textarea>`,
поддающийся изменению размера) и `.instui-simple-select` (нативный `<select>` с кареткой) имеют единый вид и те же
состояния: `-invalid` (граница ошибки), `-success` (граница успеха), `-readonly`, нативный `:disabled`, и
`-size-{sm,md,lg}`. Для иконки в начале/конце (InstUI `renderBeforeInput`/`renderAfterInput`), оберните
input в `.instui-input-group` и добавьте слот `.before`/`.after` (глиф `-icon-*`); `-should-not-wrap`
сохраняет всё в одной строке. `.instui-number-input` — это фасад плюс колонка спиннера `.arrows` +/- (нативный
`type="number"`; привяжите кнопки к `stepUp()`/`stepDown()`). `.instui-range-input` — это стилизованный
`input[type="range"]`, значение которого отображается в `.instui-range-input-value` инверсной подсказке. Для богатого
combobox с listbox-поповером используйте `@instructure/ui` — эта библиотека покрывает нативные контролы.

**Стилизованный select dropdown (экспериментально)** — опциональный `select.css` улучшает тот же
элемент `.instui-simple-select`: он стилизует открывающееся выпадающее меню (панель и каждую опцию, с hover и
selected состояниями) с помощью модели CSS Customizable Select.

> [!WARNING]
> `select.css` опирается на `appearance: base-select` / `::picker(select)`, которые **экспериментальны**
> (Chrome 135+, ещё не Baseline). Он поставляется как отдельная опциональная таблица стилей и каждое правило ограждено
> `@supports (appearance: base-select)`, поэтому в неподдерживаемых браузерах он ничего не делает — контрол `.instui-simple-select` остаётся обычным нативным select. Загружайте его только если хотите
> улучшенный выпадающий список и принимаете ограниченную поддержку.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
