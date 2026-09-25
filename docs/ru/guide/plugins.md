# Плагины

Плагин pantoken расширяет вывод токенов или CSS без форка пакета. Его создают с помощью `definePlugin` из `@pantoken/plugin-kit`, затем передают в `buildTokens` или `toCss`.

## Создание плагина

Передайте `definePlugin` хуки, которые реализуются. Он возвращает обычный плагин, помеченный возможностями, выведенными из этих хуков. Плагин может расширять IR (`tokens`, `icons`), вывод CSS (`css`), или и то, и другое.

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

`buildTokens` и `toCss` выполняют `checkPlugins` над переданными плагинами. Он предупреждает — он никогда не бросает исключений — когда у плагина нет подходящего хука для стадии, в которой он регистрируется, поэтому плагин только для токенов, переданный в `toCss`, будет пропущен с пометкой, а не тихо оставлен без действия.

## Составные плагины

Постройте поверх другого плагина с помощью `extendPlugin`, или объедините сверстников с `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одной и той же стадии компонуются: `tokens` запускает базовый, затем добавочный, `css` объединяет два вклада, а `icons` запускает оба.

## Валидация вывода плагина

Запустите общие проверки дрейфа из `@pantoken/utils` над выводом вашего плагина в его тесте, чтобы опечатка или переименование токена приводили к быстрому локальному падению:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Встроенные плагины

- `@pantoken/plugin-simple-icons` — брендинг иконок из simple-icons, зарегистрированных как токены иконок.
- `@pantoken/plugin-lucide-lab` — иконки Lucide Lab, зарегистрированные как `--instui-icon-*` image-токены.
- `@pantoken/plugin-logos` — логотипы продуктов Instructure в виде SVG, data URI и `--instui-logo-*` image-токенов.
- `@pantoken/plugin-prune-custom-props` — плагин PostCSS (не pantoken-плагин), удаляющий неиспользуемые custom properties из таблицы стилей.
- `@pantoken/plugin-custom-theme-colors` — ребрендит страницу, устанавливая один атрибут (`data-pantoken-color`) в одну из 13 палитр, или в `custom` для любого брендового hex. См. [Цвета темы](#theme-colors).

Реестр Lucide Lab можно загружать лениво, затем передавать в синхронный хук токенов:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Некоторые вещи, которые раньше были плагинами, теперь включены в `@pantoken/components`, поскольку многие компоненты требуют их по умолчанию: тени подъёма (`--instui-elevation-*`, в `components.css`), кольцо фокус-аута (`base.css` — каждый фокусируемый элемент его получает, когда pantoken управляет страницей), и брендовые шрифты Instructure (Atkinson Hyperlegible Next: `base.css` применяет `--instui-font-family-base`; опциональный `@pantoken/components/fonts.css` загружает `@font-face` woff2s).

## Цвета темы

`@pantoken/plugin-custom-theme-colors` генерирует один `[data-pantoken-color="…"]` блок на палитру
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Каждый блок перенаправляет брендовые примитивы (`--instui-primitive-color-navy-*` и `-blue-*`)
на выбранную палитру. Он также повторно выводит производные брендовые поверхности, которые в апстриме были сведены к литеральным hex, сохраняя их запечённую альфу через `color-mix()`. Семантические цвета статуса, явные синие акценты и тени подъёма остаются без изменений. Попробуйте это в демо с выбором образцов ([swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)).

```html
<html data-pantoken-color="sea"></html>
```

### Пользовательский брендовый цвет

Установите `data-pantoken-color="custom"`, чтобы ребрендить от любого hex, например основного цвета, который администратор Canvas вводит в Theme Editor. pantoken выводит полный 10–200 `--instui-primitive-color-custom-*` шкалы из него:

1. **Опорная кривая.** Целевая светлота для каждого шага — это средняя светлота OKLCH по 13 палитрам на этом шаге, с 0 зафиксированным как белый и 210 как чёрный. Таким образом, расстояние между шагами на пользовательской шкале совпадает с расстоянием у поставляемых палитр.
2. **Якорь.** Входной цвет попадает на шаг, чья целевая светлота наиболее близка к его собственной, затем фиксируется на этой точной светлоте. `#cccccc` становится `custom-40` на `#c9c9c9`: близко к входному, но не всегда идентично. «Ближайший» означает ближайший шаг на кривой, а не ближайший существующий палитровый цвет.
3. **Заполнение.** Все остальные шаги сохраняют оттенок входного цвета. Его насыщенность следует средней кривой насыщенности палитр относительно якоря и уменьшается только там, где цвет выходит за пределы sRGB.

Принимаются только `#rgb` и `#rrggbb`; всё остальное бросает `TypeError`, поэтому hex из формы не может внедрить CSS.

Во время сборки выводите целое правило с уже объявленными производными примитивами:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Чтобы выбирать цвет во время выполнения без доставки набора токенов, предварительно вычислите кривую и правило перераспределения во время сборки. Затем используйте беззависимый `/scale` в браузере и установите только 20
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

Пикер темы на сайте документации, редактор тем Canvas и демонстрация выше работают именно так.

См. [API reference](/api/) для экспорта каждого плагина.
