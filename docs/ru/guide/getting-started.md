# Начало работы

Pantoken берет дизайн-токены и иконки [Instructure UI](https://instructure.design), разрешает их один раз и преобразует эту единую
модель в пакеты для множества платформ: простые таблицы стилей, SCSS и Less, React, Vue и Svelte,
Tailwind и Panda, нативные Swift и Kotlin, WordPress и Drupal, Figma и прочее.

Устанавливают наименьший пакет, подходящий для задачи. Всё также реэкспортируется единым
пакетом `pantoken`, так что можно начать с него и сузить выбор позже.

## Создание стартового проекта

Самый быстрый способ попробовать pantoken: создать стартовый проект с уже установленным и подключённым пакетом.

```sh
npx create-pantoken-app
```

Платформы: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Смотрите
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` и
программного использования.

Используете AI-кодинг-агента? Установка не нужна — укажите навык напрямую:

```prompt
Загрузите create.pantoken.app/SKILL.md и следуйте инструкциям в нём, чтобы настроить pantoken в этом проекте.
```

Если предпочтительнее навсегда подключить правила агента pantoken в репозиторий (AGENTS.md, правила редактора, локальная копия этого навыка), запустите вместо этого `npx @pantoken/ai init`.

## Модель токенов

Токены — это CSS-пользовательские свойства с именами `--instui-<group>-<name>`, например
`--instui-color-background-brand` или `--instui-spacing-space-md`. В комплекте идут три темы: `rebrand`
(по умолчанию, с `light-dark()` там, где светлая и тёмная отличаются), `canvas` и `canvasHighContrast`.
Иконки представлены токенами `<image>` (`--instui-icon-<name>`), полученными из Lucide плюс фирменные
глифы Instructure.

## Стилизация веб-приложения

Установите таблицу стилей и импортируйте её один раз. Она определяет каждое свойство `--instui-*`, так что к ним можно обращаться прямо из собственного CSS.

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

## Использование иконок в любом месте

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

Иконки — это CSS-пользовательские свойства (`--instui-icon-<name>`). Загрузите таблицу стилей один раз и обращайтесь к любой
иконке как к `mask-image` или `background-image` — нет нужды импортировать каждую иконку отдельно.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — отдельная иконка против полного набора

`@pantoken/icons` экспортирует два именованных экспорта. Используйте `iconsByName` чтобы получить одну иконку без итерации
по всему массиву:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Используйте `icons` когда нужен весь набор (например, чтобы собрать селектор):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Оба экспорта загружают полный IR при инициализации модуля — здесь нет дерево-шейкинга по отдельным иконкам. Для легкой загрузки только через CSS используйте [CDN picker](/guide/cdn-picker) чтобы сгенерировать комбинированный URL
только для тех иконок, которые вам нужны.

## Генерация для нативной платформы

CLI записывает исходники токенов в целевой репозиторий. Никакой установки, кроме раннера:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Смотрите [pantoken CLI](/guide/cli) для всех целей.

## Подсказки для VS Code при авторинге

`@pantoken/pantoken` теперь поставляется с файлами custom-data для VS Code, чтобы downstream-проекты могли получать автодополнение классов и
токенов в HTML/CSS без установки специфического расширения pantoken.

1. Установите единый пакет:

```sh
npm i @pantoken/pantoken
```

1. Укажите VS Code на поставляемый custom-data JSON из рабочего пространства потребителя:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезагрузите VS Code (или выполните "Developer: Reload Window"), чтобы применить новые данные.

Это включает подсказки для class-токенов `instui-*` (и class-токенов `-modifier`) плюс
пользовательских свойств `--instui-*`.

## Куда идти дальше

- [Карта пакетов](/guide/packages) — какой пакет выбирать по задаче.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — установить ассеты агента и правила в потребительский репозиторий.
- [Архитектура](/guide/architecture) — как модель токенов, ядро и выходы сочетаются.
- [Справочник API](/api/) — все экспортируемые символы, сгенерированные из исходников.
