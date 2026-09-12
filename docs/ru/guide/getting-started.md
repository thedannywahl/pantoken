# Начало работы

Pantoken берёт дизайн-токены и иконки [Instructure UI](https://instructure.design), преобразует их единоразово и формирует из этой модели пакеты для множества платформ: обычные таблицы стилей, SCSS и Less, React, Vue и Svelte, Tailwind и Panda, нативные Swift и Kotlin, WordPress и Drupal, Figma и прочие.

Устанавливается самый маленький пакет, подходящий для вашей задачи. Всё также реэкспортируется объединённым пакетом `pantoken`, так что можно начать с него и затем сузить выбор.

## Создать стартовый проект

Самый быстрый способ попробовать pantoken: создать стартовый проект с уже установленным и подключённым пакетом.

```sh
npx create-pantoken-app
```

Платформы: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Смотрите
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` и
программного использования.

Используется AI-агент для кодирования? Установка не нужна — направьте его прямо на навык:

```prompt
Загрузите create.pantoken.app/SKILL.md и следуйте инструкциям в нём, чтобы настроить pantoken в этом проекте.
```

Если хотите постоянно встроить правила агента pantoken в репозиторий (AGENTS.md, правила редактора, локальная копия этого навыка), запуските вместо этого `npx @pantoken/ai init`.

## Модель токенов

Токены — это CSS кастомные свойства с именем `--instui-<group>-<name>`, например
`--instui-color-background-brand` или `--instui-spacing-space-md`. Поставляются три темы: `rebrand`
(по умолчанию, с `light-dark()` там, где различаются светлая и тёмная темы), `canvas` и `canvasHighContrast`.
Иконки — это токены `<image>` (`--instui-icon-<name>`), полученные из Lucide с добавлением собственных
глифов Instructure.

## Стилизация веб-приложения

Установите таблицу стилей и импортируйте её один раз. Она определяет каждое `--instui-*` свойство, так что вы можете ссылаться
на них напрямую из собственного CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Использование иконок везде

Веб-компонент работает в любом фреймворке, без портирования.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-токены

Иконки — это CSS кастомные свойства (`--instui-icon-<name>`). Загрузите таблицу стилей один раз и обращайтесь к любой
иконке как к `mask-image` или `background-image` — без необходимости импорта каждой иконки отдельно.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — одиночная иконка против полного набора

`@pantoken/icons` экспортирует два именованных экспорта. Используйте `iconsByName` чтобы получить одну иконку без итерации
по полному массиву:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Используйте `icons` когда нужен весь набор (например, для создания селектора):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Оба экспорта загружают полный IR при инициализации модуля — на этом уровне нет посимвольного tree-shaking. Для лёгкой загрузки только CSS используйте [CDN picker](/guide/cdn-picker) чтобы сгенерировать комбинированный URL
только для нужных иконок.

## Генерация для нативной платформы

CLI записывает исходники токенов в целевой репозиторий. Никаких установок, кроме раннера:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

См. [пан-token CLI](/guide/cli) для всех целевых платформ.

## Подсказки для работы в VS Code

`@pantoken/pantoken` теперь включает файлы custom-data для VS Code, поэтому проекты-потребители могут получать автозаполнение классов и токенов в HTML/CSS без установки расширения, специфичного для pantoken.

1. Установите объединённый пакет:

```sh
npm i @pantoken/pantoken
```

1. Укажите VS Code на поставляемый JSON custom-data из рабочего пространства потребителя:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезагрузите VS Code (или выполните "Developer: Reload Window") чтобы применить новые данные.

Это включает подсказки для токенов классов `instui-*` (и токенов классов `-modifier`) плюс
кастомные свойства `--instui-*`.

## Куда дальше

- [Карта пакетов](/api/) — какой пакет выбирать по задаче.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — установить ассеты агента и правила в потребительский репозиторий.
- [Архитектура](/guide/architecture) — как модель токенов, ядро и выводы сочетаются.
- [Справочник API](/api/) — все экспортируемые символы, сгенерированные из исходников.
