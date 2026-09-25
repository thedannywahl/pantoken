# Плагіни

Плагін pantoken розширює вихідні дані токенів або CSS без форку пакета. Його створюють за допомогою `definePlugin` з `@pantoken/plugin-kit`, а потім передають у `buildTokens` або `toCss`.

## Створення плагіна

Надайте `definePlugin` хук-и, які реалізуєте. Він повертає звичайний плагін, помічений можливостями, виведеними з цих хуків. Плагін може розширювати IR (`tokens`, `icons`), CSS-вихід (`css`) або обидва одночасно.

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

`buildTokens` та `toCss` застосовують `checkPlugins` до плагінів, які ви передаєте. Він попереджає — ніколи не кидає помилку — коли плагін не має відповідного хуку для стадії, в якій його реєструють, тому плагін тільки для токенів, переданий у `toCss`, буде пропущений з повідомленням замість того, щоб мовчки нічого не робити.

## Компонування плагінів

Побудувати поверх іншого плагіна можна за допомогою `extendPlugin`, або об’єднати рівноправні плагіни з `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одного й того ж етапу компонуются: `tokens` запускає базовий, потім додатковий; `css` зливає обидва внески; а `icons` запускає обидва.

## Перевірте вихід плагіна

Запустіть загальні перевірки дрейфу з `@pantoken/utils` над власним виходом плагіна у його тесті, щоб опечатка або перейменований токен призводили до швидкої локальної помилки:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Вбудовані плагіни

- `@pantoken/plugin-simple-icons` — брендові іконки зі simple-icons, зареєстровані як іконкові токени.
- `@pantoken/plugin-lucide-lab` — іконки Lucide Lab, зареєстровані як `--instui-icon-*` image-токени.
- `@pantoken/plugin-logos` — логотипи продуктів Instructure як SVG, data URI та `--instui-logo-*`
  image-токени.
- `@pantoken/plugin-prune-custom-props` — PostCSS-плагін (не pantoken-плагін), який видаляє
  невикористані кастомні властивості зі стилю.
- `@pantoken/plugin-custom-theme-colors` — переналаштовує бренд сторінки, встановлюючи один атрибут
  (`data-pantoken-color`) на одну з 13 палітр, або на `custom` для будь-якого hex бренду. Див.
  [Кольори теми](#theme-colors).

Реєстр Lucide Lab можна завантажити ліниво, а потім передати в синхронний хук токенів:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Декілька речей, які раніше були плагінами, тепер постачаються в `@pantoken/components`, оскільки багатьом компонентам вони потрібні «з коробки»: тіні піднесення (`--instui-elevation-*`, в `components.css`), кільце контуру фокусу (в `base.css` — кожен фокусований елемент його отримує, коли pantoken контролює сторінку), і бренд-шрифти Instructure (Atkinson Hyperlegible Next: `base.css` застосовує `--instui-font-family-base`; опційний `@pantoken/components/fonts.css` завантажує `@font-face` woff2-файли).

## Кольори теми {#theme-colors}

`@pantoken/plugin-custom-theme-colors` виводить один блок `[data-pantoken-color="…"]` на палітру
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Кожен блок спрямовує бренд-примітиви (`--instui-primitive-color-navy-*` та `-blue-*`)
на обрану палітру. Він також повторно виводить поверхні бренду, які вгорі були сплющені до літерального hex, зберігаючи їхню запечену альфу через `color-mix()`. Семантичні кольори статусів, явні сині акценти та тіні піднесення залишаються без змін. Спробуйте в [демо темізації на основі сектру кольорів](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Користувацький колір бренду

Встановіть `data-pantoken-color="custom"`, щоб переналаштувати бренд з будь-якого hex, наприклад основний колір, який адміністратор Canvas вводить у Редактор тем. pantoken виводить повну шкалу 10–200 `--instui-primitive-color-custom-*`
на її основі:

1. **Крива посилання.** Цільова світлість для кожного кроку — це середня OKLCH-світлість 13 палітр на цьому кроці, причому 0 фіксований як білий, а 210 як чорний. Тому відстань між кроками в користувацькій шкалі відповідає інтервалам у постачених палітрах.
2. **Якір.** Вхідна точка потрапляє на крок, цільова світлість якого найближча до її власної, а потім прив’язується до тієї точної світлості. `#cccccc` стає `custom-40` на `#c9c9c9`: близько до введеного значення, але не завжди ідентичне. «Найближчий» означає найближчий крок на кривій, а не найближчий існуючий колір палітри.
3. **Заповнення.** Кожен інший крок зберігає відтінок введеного кольору. Насиченість слідує середній кривій насиченості палітр відносно якоря і зменшується лише там, де колір виходить за межі sRGB.

Приймаються лише `#rgb` та `#rrggbb`; інше викликає `TypeError`, тому hex з форми не може інжектувати CSS.

На етапі збірки виведіть ціле правило з вже задекларованими похідними примітивами:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Щоб вибирати колір під час виконання без відправлення набору токенів, попередньо обчисліть криву та правило ремапу на етапі збірки. Потім використайте беззалежний `/scale` в браузері й задайте лише 20
похідних примітивів:

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

Пі́кер тем сайту документації, редактор тем Canvas і наведене вище демо всі працюють таким чином.

Див. [API reference](/api/) для експорту кожного плагіна.
