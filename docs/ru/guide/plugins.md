# Плагины

Плагин pantoken расширяет вывод токенов или CSS без форка пакета. Его создают с помощью
`definePlugin` из `@pantoken/plugin-kit`, затем передают в `buildTokens` или `toCss`.

## Создание плагина

Передайте `definePlugin` хуки, которые вы реализуете. Он возвращает обычный плагин, помеченный возможностями,
выведенными из этих хуков. Плагин может расширять IR (`tokens`, `icons`), вывод CSS
(`css`), или и то и другое.

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

`buildTokens` и `toCss` запускают `checkPlugins` на плагинах, которые вы передаёте. Он предупреждает — он никогда не выбрасывает исключение —
когда у плагина нет подходящего хука для этапа, в котором он регистрируется, поэтому плагин, работающий только с токенами,
переданный в `toCss`, будет пропущен с заметкой, а не тихо останется без действий.

## Композиция плагинов

Наследуйте поведение другого плагина с помощью `extendPlugin`, или объединяйте равноправные плагины с помощью `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одного и того же этапа компонуются: `tokens` запускает базовый, затем добавочный, `css` сливает оба
вклада, а `icons` запускает оба.

## Проверяйте вывод вашего плагина

Запустите общие проверки дрейфа из `@pantoken/utils` над выводом вашего плагина в его тесте, чтобы
опечатка или переименование токена приводили к быстрому локальному провалу теста:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Включённые плагины

- `@pantoken/plugin-simple-icons` — брендовые иконки из simple-icons, зарегистрированные как токены иконок.
- `@pantoken/plugin-logos` — логотипы продуктов Instructure в виде SVG, data URI и `--instui-logo-*`
  image-токенов.
- `@pantoken/plugin-prune-custom-props` — плагин PostCSS (не pantoken-плагин), который удаляет
  неиспользуемые кастомные свойства из таблицы стилей.

Несколько вещей, которые раньше были плагинами, теперь поставляются в `@pantoken/components`, поскольку многие компоненты
нуждаются в них "из коробки": тени подъёма (`--instui-elevation-*`, в `components.css`), кольцо фокусного контура
(в `base.css` — каждый фокусируемый элемент получает его, когда pantoken владеет страницей), и фирменные шрифты Instructure
(Atkinson Hyperlegible Next: `base.css` применяет `--instui-font-family-base`; опциональный
`@pantoken/components/fonts.css` загружает woff2-файлы `@font-face`).

См. [Справочник API](/api/) для экспортов каждого плагина.
