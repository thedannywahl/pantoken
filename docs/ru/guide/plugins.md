# Плагины

Плагин pantoken расширяет вывод токенов или CSS без форка пакета. Его создают с помощью
`definePlugin` из `@pantoken/plugin-kit`, затем передают в `buildTokens` или `toCss`.

## Создание плагина

Передайте `definePlugin` хуки, которые вы реализуете. Он возвращает обычный плагин, маркированный возможностями,
выведенными из этих хуков. Плагин может расширять IR (`tokens`, `icons`), вывод CSS (`css`),
или и то, и другое.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Регистрация с учётом возможностей

`buildTokens` и `toCss` запускают `checkPlugins` над плагинами, которые вы передаёте. Он предупреждает — он никогда не бросает исключение —
когда у плагина нет подходящего хука для этапа, в котором он зарегистрирован, поэтому плагин только для токенов, переданный
в `toCss`, будет пропущен с уведомлением, а не тихо не выполнится.

## Композиция плагинов

Постройте поверх другого плагина с помощью `extendPlugin` или объедините с равными с помощью `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одного этапа компонуются: `tokens` запускает базовый, затем дополнительный; `css` объединяет два
вклада; и `icons` запускает оба.

## Проверка вывода плагина

Запускайте общие проверки дрейфа из `@pantoken/utils` над собственным выводом плагина в его тесте, чтобы опечатка или переименование токена приводили к быстрому локальному провалу:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Включённые плагины

- `@pantoken/plugin-simple-icons` — брендовое отображение иконок из simple-icons, зарегистрированных как икон-токены.
- `@pantoken/plugin-lucide-lab` — иконки Lucide Lab, зарегистрированные как `--instui-icon-*` image-токены.
- `@pantoken/plugin-logos` — логотипы продуктов Instructure в виде SVG, data URI и `--instui-logo-*`
  image-токенов.
- `@pantoken/plugin-prune-custom-props` — плагин PostCSS (не pantoken-плагин), который удаляет
  неиспользуемые пользовательские свойства из стилевого файла.
- `@pantoken/plugin-custom-theme-colors` — переназначает бренд страницы, устанавливая один атрибут
  (`data-pantoken-color`) в одно из 13 цветовых наборов, или в `custom` для любого брендового hex. Смотрите
  [Цвета темы](#theme-colors).
- `@pantoken/plugin-custom-components` — управляемые токенами кастомные контролы, включая SegmentedControl
  и SkeletonLoader.

### Сегментированный контрол

Используйте сегментированный контрол для двух-пяти связанных представлений или фильтров. Каждый вариант — это подписанный нативный
radio в одной именованной группе; пометьте один как выбранный изначально. Используйте вкладки или выпадающий список, если варианты не помещаются
комфортно, а для действий используйте группы кнопок, а не варианты выбора. Стиль `-size-md` является
по умолчанию, с `-size-sm` и `-size-lg` для более плотных и более выделяющихся контекстов.

Импортируйте `@pantoken/plugin-custom-components/segmented-control.css` для контрола и кнопок переполнения.
Используйте класс `-icon-*` на метке сегмента, когда сегменту нужен глиф; помощник по взаимодействию также переносит класс
`-icon-*` с его нативного input на рисователь метки. Дайте fieldset описательный `aria-label` или видимую легенду. Помощник сохраняет нативное
объявление radio, добавляет навигацию с клавиатуры и опционально показывает по одному скрытому сегменту на одно нажатие стрелки. Используйте управляющие элементы логического начала/конца и доступные
подписи кнопок в обоих направлениях:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Импортируйте `@pantoken/interactions/segmented-control.iife.js` для регистрации после загрузки DOM, или вызовите
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` из `@pantoken/interactions`
и вызовите `cleanup()` при удалении. CSS и нативные radio-варианты работают без JS; стрелки переполнения требуют поведения. Выбранный элемент использует двухслойную тень дизайна из семантических
цветов drop-shadow; это отдельная тень active-item, а не существующий
композит `--instui-elevation-*`. Кнопки переполнения используют компоненты elevation3 upstream через `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Подпуть `skeleton-loader.css` стилизует одну декоративную форму Text, Avatar или Image. Text принимает
`-size-xxs` через `-size-xxl`; Avatar и Image имеют средний размер. Каждый необязательный `.skeleton-row`
добавляет одну строку текста без изменения размера. CSS-шиммер останавливается после трёх проходов по 1.5 секунды и
остаётся статичным, когда пользователь предпочитает уменьшенное движение. Он работает до загрузки JavaScript.

Размещайте формы только там, где появится контент, зависящий от запроса, а не поверх серверно-известной навигации,
фильтров, заголовков или контролов. Скелет не является индикатором прогресса или состоянием занятости действия. Сохраняйте
видимый существующий контент во время фоновых обновлений; для действий используйте индикатор загрузки (spinner) или состояние занятости кнопки.

Родительское приложение отвечает за разметку loading, loaded, empty и error. Предоставьте один регион статуса empty
на страницу и отдельный пустой alert в серверном HTML, оба **вНЕ** области загружаемого контента:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Вызывайте поведение на уровне родителя при изменении состояния запроса. Оно обновляет `aria-busy` и два
предварительно существующих оповещения, но никогда не заменяет контент и не перемещает фокус:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Если используется бандл взаимодействий для компонента вместо прямого импорта, отправьте событие
`pantoken:skeleton-state` на элемент `[data-skeleton-region]` с
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Задерживайте _показ_ заполнителей на 200–500 мс для быстрых запросов; поведение независимо задерживает объявление загрузки на 400 мс. При пассивных загрузках страницы оставляйте фокус там, где он есть. Перемещайте фокус к недавно
загруженному результату только когда это было запрошено действием пользователя. Узел статуса объявляет результаты и пустые
состояния; узел alert объявляет ошибки. Не объединяйте `aria-busy`, `role="status"` и
`role="alert"` на одном элементе.

Реестр Lucide Lab можно загрузить лениво, затем передать в синхронный токен-хук:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Некоторые вещи, которые раньше были плагинами, теперь входят в `@pantoken/components`, так как многие компоненты нуждаются в них по умолчанию: тени elevation (`--instui-elevation-*`, в `components.css`), кольцо focus-outline
(в `base.css` — каждый фокусируемый получает его, когда pantoken управляет страницей), и брендовые
шрифты Instructure (Atkinson Hyperlegible Next: `base.css` применяет `--instui-font-family-base`; опциональный
`@pantoken/components/fonts.css` загружает woff2-файлы `@font-face`).

## Цвета темы

`@pantoken/plugin-custom-theme-colors` генерирует один блок `[data-pantoken-color="…"]` на палитру
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Каждый блок направляет брендовые примитивы (`--instui-primitive-color-navy-*` и `-blue-*`)
на выбранную палитру. Он также повторно выводит брендовые поверхности, которые upstream скомпоновал в литеральные hex,
сохраняя их запечённую альфу через `color-mix()`. Семантические статус-цвета, явные синие акценты и
тени elevation остаются без изменений. Попробуйте в
[демо тематизации на свотчах](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Пользовательский брендовый цвет

Установите `data-pantoken-color="custom"` для переназначения от любого hex, например основного цвета, который администратор Canvas
вводит в редакторе темы. pantoken выводит полный шкал 10–200 значений `--instui-primitive-color-custom-*`
из него:

1. **Эталонная кривая.** Целевая светлота каждого шага — это средняя светлота OKLCH 13 палитр на этом шаге, с 0 зафиксированным как белый и 210 как чёрный. Таким образом, расстояния пользовательской шкалы
   соответствуют расстояниям поставляемых палитр.
2. **Якорь.** Входная точка попадает на шаг, чья целевая светлота наиболее близка к её собственной, затем привязывается к
   этой точной светлоте. `#cccccc` становится `custom-40` на `#c9c9c9`: близко к входу, но не
   всегда идентично. «Ближайший» означает ближайший шаг на кривой, а не наиболее близкий существующий цвет палитры.
3. **Заполнение.** Каждый другой шаг сохраняет входной оттенок. Его насыщенность следует средней кривой насыщенности палитр относительно якоря и уменьшается только там, где цвет выходит за пределы sRGB.

Принимаются только `#rgb` и `#rrggbb`; всё остальное вызывает `TypeError`, поэтому hex из формы
не может внедрить CSS.

Во время сборки выведите всё правило с уже объявленными производными примитивами:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Чтобы выбирать цвет во время выполнения без доставки набора токенов, предварительно вычислите кривую и правило перераспределения
на этапе сборки. Затем используйте беззависимый `/scale` в браузере и устанавливайте только 20
производных примитивов:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Пикер темы на сайте документации, редактор тем Canvas и демо выше все работают таким образом.

Смотрите [Справочник по API](/api/) для экспортов каждого плагина.
