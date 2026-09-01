# Плагіни

Плагін pantoken розширює вихідні дані токенів або CSS без форку пакета. Його створюють за допомогою
`definePlugin` з `@pantoken/plugin-kit`, а потім передають у `buildTokens` або `toCss`.

## Створення плагіна

Передайте `definePlugin` хуки, які ви реалізуєте. Він повертає звичайний плагін, маркований
здатностями, виведеними з цих хуків. Плагін може розширювати IR (`tokens`, `icons`), CSS
вихід (`css`), або обидва.

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

`buildTokens` та `toCss` виконують `checkPlugins` над плагінами, які ви передаєте. Він попереджає — він ніколи не кидає помилку —
коли у плагіна немає відповідного хука для етапу, в якому його реєструють, тож плагін тільки для токенів, переданий
у `toCss`, буде пропущено з повідомленням, а не мовчазно проігноровано.

## Компонування плагінів

Будуйте поверх іншого плагіна за допомогою `extendPlugin`, або комбінуйте однорангові за допомогою `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одного етапу композиціюються: `tokens` виконує базовий потім додатковий, `css` об’єднує два
внески, а `icons` виконує обидва.

## Перевірте вихід вашого плагіна

Запустіть загальні перевірки дрейфу з `@pantoken/utils` над власним виходом плагіна в його тесті, щоб
описка або перейменований токен викликали швидку локальну помилку:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Вбудовані плагіни

- `@pantoken/plugin-simple-icons` — брендує іконки з simple-icons, реєструються як токени іконок.
- `@pantoken/plugin-logos` — логотипи продуктів Instructure як SVG, data URI і `--instui-logo-*`
  image-токени.
- `@pantoken/plugin-prune-custom-props` — плагін PostCSS (не pantoken-плагін), який видаляє
  невикористовувані кастомні властивості зі стилю.

Кілька речей, що раніше були плагінами, тепер постачаються в `@pantoken/components`, оскільки так багато компонентів потребують
їх за замовчуванням: тіні підйому (`--instui-elevation-*`, в `components.css`), кільцевий контур фокусу
(в `base.css` — кожний фокусований елемент його отримує, коли pantoken керує сторінкою), та шрифти бренду Instructure
(Atkinson Hyperlegible Next: `base.css` застосовує `--instui-font-family-base`; опціональний
`@pantoken/components/fonts.css` підвантажує `@font-face` woff2).

Див. [API reference](/api/) для експортів кожного плагіна.
