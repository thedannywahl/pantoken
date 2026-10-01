# Плагіни

Плагін pantoken розширює вивід токенів або CSS без форку пакета. Його створюють за допомогою `definePlugin` з `@pantoken/plugin-kit`, а потім передають до `buildTokens` або `toCss`.

## Створення плагіна

Передайте `definePlugin` хуки, які ви реалізуєте. Він повертає звичайний плагін, промаркований можливостями, виведеними з цих хуків. Плагін може розширювати IR (`tokens`, `icons`), CSS-вивід (`css`) або обидва.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Реєстрація з урахуванням можливостей

`buildTokens` і `toCss` запускають `checkPlugins` над переданими плагінами. Вони попереджають — ніколи не кидають винятку — якщо плагін не має відповідного хука для стадії, в якій його реєструють; тому плагін лише для токенів, переданий до `toCss`, буде пропущений з приміткою замість того, щоб мовчки нічого не робити.

## Компонування плагінів

Будуйте поверх іншого плагіна за допомогою `extendPlugin`, або комбінуйте однолітків через `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки того самого етапу компонуються: `tokens` запускає базу, потім доповнення, `css` зливає два внески, а `icons` запускає обидва.

## Перевірте вихід вашого плагіна

Запустіть спільні перевірки дрейфу з `@pantoken/utils` над виходом вашого плагіна в його тесті, щоб помилка в написанні або перейменований токен швидко й локально викликали провал:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Вбудовані плагіни

- `@pantoken/plugin-simple-icons` — брендові іконки з simple-icons, зареєстровані як icon tokens.
- `@pantoken/plugin-lucide-lab` — іконки Lucide Lab, зареєстровані як `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — логотипи продуктів Instructure як SVG, data URI та `--instui-logo-*` image tokens.
- `@pantoken/plugin-prune-custom-props` — плагін PostCSS (не pantoken-плагін), який видаляє невикористані кастомні властивості зі стилю.
- `@pantoken/plugin-custom-theme-colors` — ребрендинг сторінки шляхом встановлення одного атрибута (`data-pantoken-color`) на одну з 13 палітр або на `custom` для будь-якого hex бренду. Див. [Кольори теми](#theme-colors).
- `@pantoken/plugin-custom-components` — контролю з підтримкою токенів, включно з SegmentedControl та SkeletonLoader.

### Сегментований контрол

Використовуйте сегментований контрол для двох-п’яти пов’язаних представлень або фільтрів. Кожен варіант — підписане рідне radio в одній іменованій групі; відмітьте один як checked спочатку. Використовуйте вкладки або випадачку, якщо варіанти не вміщаються зручно, а для дій використовуйте групи кнопок замість вибору. Стиль `-size-md` є за замовчуванням, з `-size-sm` і `-size-lg` для компактніших або більш помітних контекстів.

Імпортуйте `@pantoken/plugin-custom-components/segmented-control.css` для контролу та його кнопок переповнення. Використовуйте клас `-icon-*` на мітці сегмента, коли сегмент потребує гліфа; допоміжник взаємодії також піднімає клас `-icon-*` з рідного input на фарбувальник мітки. Дайте fieldset описовий `aria-label` або видимий legend. Хелпер зберігає рідне оголошення radio, додає клавіатурну навігацію та опційно відкриває один обрізаний сегмент при кожному натисканні стрілки. Використовуйте логічні контролі початку/кінця та доступні підписи кнопок в обох напрямках:

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

Імпортуйте `@pantoken/interactions/segmented-control.iife.js` для реєстрації після готовності DOM, або викликайте `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` з `@pantoken/interactions` і викликайте `cleanup()` при видаленні. CSS та рідні варіанти radio працюють без JS; стрілки переповнення потребують поведінки. Вибраний елемент використовує двошарову дизайнерську тінь з семантичних кольорів drop-shadow; це окрема тінь активного елемента, а не наявний `--instui-elevation-*` композит. Кнопки переповнення використовують upstream токени elevation3 через `--pantoken-segmented-overflow-shadow`.

### Завантаження скелета (Skeleton loading)

Підшлях `skeleton-loader.css` стилізує декоративну форму Text, Avatar або Image. Text приймає `-size-xxs` через `-size-xxl`; Avatar і Image — середнього розміру. Кожен опційний `.skeleton-row` додає один текстовий рядок, не змінюючи розміру. CSS-шимер зупиняється після трьох проходів по 1.5 секунди і залишається статичним, коли користувач віддає перевагу зменшенню руху. Він працює до завантаження JavaScript.

Розміщуйте форми лише там, де з’явиться вміст залежно від запиту, а не над серверно-відомою навігацією, фільтрами, заголовками або контролями. Скелет — не індикатор прогресу і не стан зайнятості дії. Зберігайте видимим існуючий контент під час оновлення у фоні; для дій використовуйте спінер або стан зайнятості кнопки.

Мейн-застосунок відповідає за розмітку станів loading, loaded, empty та error. Забезпечте один регіон empty на сторінку та окреме порожнє сповіщення в HTML сервера, обидва поза зоною зайнятого вмісту:

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

Викликайте поведінку на рівні батька, коли змінюється стан запиту. Вона оновлює `aria-busy` і дві попередньо існуючі оголошення, але ніколи не заміщує контент і не переміщує фокус:

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

Якщо використовується бандл взаємодій на рівні компоненту замість прямого імпорту, диспатчте подію `pantoken:skeleton-state` на елемент `[data-skeleton-region]` з `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Затримуйте _показ_ заповнювачів на 200–500 мс для швидких запитів; поведінка незалежно затримує оголошення про завантаження на 400 мс. При пасивних завантаженнях сторінки залишайте фокус на місці. Переміщуйте фокус до щойно завантаженого результату лише якщо це було запитано дією користувача. Вузол статусу оголошує результати та порожні стани; вузол alert оголошує помилки. Не комбінуйте `aria-busy`, `role="status"` і `role="alert"` на одному елементі.

Реєстр Lucide Lab можна завантажити ліниво, а потім передати синхронному токен-хуку:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Кілька речей, які раніше були плагінами, тепер постачаються в `@pantoken/components`, оскільки багато компонентів потребують їх з коробки: elevation shadows (`--instui-elevation-*`, в `components.css`), кільце фокус-оутлайн (в `base.css` — кожен фокусований отримує його, коли pantoken керує сторінкою) і шрифти бренду Instructure (Atkinson Hyperlegible Next: `base.css` застосовує `--instui-font-family-base`; опційний `@pantoken/components/fonts.css` завантажує `@font-face` woff2).

## Кольори теми {#theme-colors}

`@pantoken/plugin-custom-theme-colors` виводить один `[data-pantoken-color="…"]` блок на палітру
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Кожен блок спрямовує бренд-примітиви (`--instui-primitive-color-navy-*` і `-blue-*`)
на обрану палітру. Він також повторно виводить бренд-фаcади, які upstream запік у літеральні hex, зберігаючи їхній запечений альфа-канал через `color-mix()`. Семантичні кольори статусів, явні сині акценти та elevation shadows залишаються без змін. Спробуйте у
[демо з темінгом на основі зразків](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Користувацький колір бренду

Встановіть `data-pantoken-color="custom"` для ребрендингу з будь-якого hex, наприклад основного кольору, який адміністратор Canvas вводить у Theme Editor. pantoken виводить повну шкалу з 10–200 кроків `--instui-primitive-color-custom-*`
з неї:

1. **Крива-орієнтир.** Цільова світлість кожного кроку — середнє OKLCH lightness 13 палітр на цьому кроці, з 0 зафіксованим на білому і 210 на чорному. Отже, просторове розташування кроків на користувацькій шкалі відповідає інтервалам поставлених палітр.
2. **Якір.** Вхідний колір потрапляє на крок, чия цільова світлість найближча до його власної, а потім «притягується» до цієї точної світлості. `#cccccc` стає `custom-40` на `#c9c9c9`: близько до введення, але не завжди ідентичне. «Найближчий» означає найближчий крок на кривій, а не найближчий існуючий кольор палітри.
3. **Заповнення.** Кожен інший крок зберігає відтінок введення. Його насиченість слідує за середньою кривою насиченості палітр відносно якоря і зменшується тільки там, де колір виходить за межі sRGB.

Приймаються лише `#rgb` і `#rrggbb`; будь-що інше викликає `TypeError`, тому hex з форми не може ін’єктувати CSS.

На етапі збірки виведіть ціле правило з вже оголошеними виведеними примітивами:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Щоб вибирати колір під час виконання без відправки набору токенів, попередньо обчисліть криву та правило ремапу під час збірки. Потім використовуйте беззалежний `/scale` елемент у браузері і встановіть лише 20
виведених примітивів:

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

Пікер тем сайту документації, редактор тем Canvas і демонстрація вище працюють саме так.

Див. [API reference](/api/) для експортів кожного плагіна.
