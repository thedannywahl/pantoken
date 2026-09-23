# Плагіни

Плагін pantoken розширює вихідні токени або CSS без форку пакета. Його створюють за допомогою `definePlugin` з `@pantoken/plugin-kit`, а потім передають у `buildTokens` або `toCss`.

## Створення плагіна

Надайте `definePlugin` хуки, які ви реалізуєте. Він повертає звичайний плагін, маркований можливостями, виведеними з цих хуків. Плагін може розширювати IR (`tokens`, `icons`), CSS-вихід (`css`) або обидва одночасно.

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

`buildTokens` та `toCss` виконують `checkPlugins` над плагінами, які ви передаєте. Він попереджає — ніколи не кидає помилку — коли плагін не має відповідного хука для стадії, в якій його реєструють, тому плагін тільки для токенів, переданий у `toCss`, буде пропущений з повідомленням замість того, щоб мовчки нічого не робити.

## Компонування плагінів

Розширюйте існуючий плагін за допомогою `extendPlugin`, або об'єднуйте однолітків за допомогою `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки тієї ж стадії компонуются: `tokens` виконує базовий потім додатковий, `css` зливає обидва внески, а `icons` виконує обидва.

## Перевірте вихід вашого плагіна

Запустіть спільні перевірки drift з `@pantoken/utils` над виходом вашого плагіна в його тесті, щоб описка або перейменований токен викликали швидкий локальний провал:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Вбудовані плагіни

- `@pantoken/plugin-simple-icons` — брендові іконки з simple-icons, зареєстровані як токени іконок.
- `@pantoken/plugin-lucide-lab` — іконки Lucide Lab, зареєстровані як `--instui-icon-*` image токени.
- `@pantoken/plugin-logos` — логотипи продуктів Instructure у вигляді SVG, data URI та `--instui-logo-*`
  image токенів.
- `@pantoken/plugin-prune-custom-props` — PostCSS-плагін (не pantoken-плагін), який видаляє
  невикористані кастомні властивості зі стилю.

Реєстр Lucide Lab можна завантажити ліниво, а потім передати синхронному хукy токенів:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Декілька речей, які раніше були плагінами, тепер поставляються в `@pantoken/components`, оскільки багато компонентів потребують їх "з коробки": тіні піднесення (`--instui-elevation-*`, у `components.css`), кільце фокус-окреслення (у `base.css` — кожен фокусований елемент його отримує, коли pantoken контролює сторінку), та фірмові шрифти Instructure (Atkinson Hyperlegible Next: `base.css` застосовує `--instui-font-family-base`; опційний `@pantoken/components/fonts.css` завантажує woff2-файли `@font-face`).

Див. [API reference](/api/) для експорту кожного плагіна.
