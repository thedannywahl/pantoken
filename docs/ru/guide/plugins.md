# Плагины

Плагин pantoken расширяет вывод токенов или CSS без форка пакета. Его создают с помощью
`definePlugin` из `@pantoken/plugin-kit`, затем передают в `buildTokens` или `toCss`.

## Создание плагина

Передайте `definePlugin` хуки, которые вы реализуете. Он возвращает обычный плагин, помеченный
возможностями, выведенными из этих хуков. Плагин может расширять IR (`tokens`, `icons`), вывод CSS
(`css`), или оба.

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

`buildTokens` и `toCss` прогоняют `checkPlugins` по переданным плагинам. Он предупреждает — он никогда не бросает исключения —
когда у плагина нет подходящего хука для этапа, в котором он регистрируется, поэтому плагин только для токенов,
переданный в `toCss`, будет пропущен с уведомлением, а не тихо не выполнится.

## Составные плагины

Наследуйте поведение другого плагина с помощью `extendPlugin`, или объединяйте одноуровневых коллег с помощью `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Хуки одного этапа компонуются: `tokens` запускает базовый, затем добавочный, `css` объединяет два
вклада, и `icons` запускает оба.

## Проверка вывода плагина

Запустите общие проверки дрейфа из `@pantoken/utils` над собственным выводом плагина в его тесте, чтобы
опечатка или переименование токена приводили к быстрому и локальному провалу:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Встроенные плагины

- `@pantoken/plugin-simple-icons` — брендовые иконки из simple-icons, зарегистрированные как токены иконок.
- `@pantoken/plugin-lucide-lab` — иконки Lucide Lab, зарегистрированные как `--instui-icon-*` image токены.
- `@pantoken/plugin-logos` — логотипы продуктов Instructure в виде SVG, data URI и `--instui-logo-*`
  image токенов.
- `@pantoken/plugin-prune-custom-props` — PostCSS-плагин (не pantoken-плагин), который удаляет
  неиспользуемые кастомные свойства из стилевого файла.

Реестр Lucide Lab можно загрузить лениво, а затем передать в синхронный токен-хук:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Некоторые вещи, которые раньше были плагинами, теперь поставляются в `@pantoken/components`, поскольку многие компоненты
нуждаются в них из коробки: тени подъёма (`--instui-elevation-*`, в `components.css`), кольцо фокус-обводки
(в `base.css` — у каждого фокусируемого элемента оно появляется, когда pantoken управляет страницей), и брендовые шрифты Instructure
(Atkinson Hyperlegible Next: `base.css` применяет `--instui-font-family-base`; опциональный
`@pantoken/components/fonts.css` загружает woff2-файлы `@font-face`).

См. [API reference](/api/) для экспортов каждого плагина.
