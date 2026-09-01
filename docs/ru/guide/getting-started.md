# Начало работы

pantoken берет дизайн-токены и иконки Instructure UI, разрешает их один раз и преобразует эту единую
модель в пакеты для многих платформ: простые таблицы стилей, SCSS и Less, React и Vue и Svelte,
Tailwind и Panda, нативные Swift и Kotlin, WordPress и Drupal, Figma и другое.

Устанавливается наименьший пакет, подходящий для вашей задачи. Всё также ре-экспортируется через единый
пакет `pantoken`, так что можно начать с него и сузить выбор позже.

## Создать стартовый проект

Самый быстрый способ опробовать pantoken: создать стартовый проект с уже установленным и подключённым пакетом.

```sh
npx create-pantoken-app react
```

Платформы: `components` (обычный HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Смотрите
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` и
программного использования.

Используете AI-кодирующего агента? Установка не нужна — укажите ему навык напрямую:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Работает так же для Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI и Amazon Q
Developer CLI — замените `claude` на `gemini`, `agent`, `codex`, `copilot -p` или `q chat`. Если вы хотите
постоянно подключить правила агента pantoken в репозиторий (AGENTS.md, правила редактора, локальная копия
этого скилла), запустите вместо этого `npx @pantoken/ai init`.

## Модель токенов

Токены — это CSS-пользовательские свойства, называемые `--instui-<group>-<name>`, например
`--instui-color-background-brand` или `--instui-spacing-space-md`. Поставляются три темы: `rebrand`
(по умолчанию, с `light-dark()` там, где светлая и тёмная темы различаются), `canvas` и `canvasHighContrast`.
Иконки — это токены `<image>` (`--instui-icon-<name>`), производные от Lucide плюс собственные
глифы Instructure.

## Стилизовать веб-приложение

Установите таблицу стилей и импортируйте её один раз. Она определяет каждое свойство `--instui-*`, поэтому вы ссылаетесь
на них прямо из своего CSS.

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

## Использовать иконки в любом месте

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

Иконки — это CSS-пользовательские свойства (`--instui-icon-<name>`). Загрузите таблицу стилей один раз и ссылайтесь на любую
иконку как на `mask-image` или `background-image` — отдельный импорт для каждой иконки не требуется.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — отдельная иконка против полного набора

`@pantoken/icons` экспортирует два именованных экспорта. Используйте `iconsByName` чтобы получить одну иконку без перебора
всего массива:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Используйте `icons` когда нужен весь набор (например, для построения селектора):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Оба экспорта загружают полный IR при инициализации модуля — на этом уровне нет посимвольного tree-shaking.
Для лёгкой загрузки только CSS используйте [CDN picker](/guide/cdn-picker) чтобы сгенерировать объединённый URL
только для тех иконок, которые вам нужны.

## Генерировать для нативной платформы

CLI записывает исходники токенов в целевой репозиторий. Никакой установки, кроме раннера:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

См. [the pantoken CLI](/guide/cli) для всех целей.

## Подсказки для разработки в VS Code

`@pantoken/pantoken` теперь включает файлы custom-data для VS Code, чтобы потребляющие проекты могли получить автодополнение классов и
токенов в HTML/CSS без установки специфичного расширения pantoken.

1. Установите единый пакет:

```sh
npm i @pantoken/pantoken
```

1. Укажите VS Code на полученный custom-data JSON из рабочего пространства потребителя:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезагрузите VS Code (или выполните "Developer: Reload Window"), чтобы применить новые данные.

Это включает подсказки для токенов классов `instui-*` (и токенов классов `-modifier`) плюс
пользовательских свойств `--instui-*`.

## Что дальше

- [Карта пакетов](/guide/packages) — какой пакет выбирать, в зависимости от задачи.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — установить ассеты агента и правила в потребляющий репозиторий.
- [Архитектура](/guide/architecture) — как модель токенов, core и выходы взаимодействуют друг с другом.
- [API reference](/api/) — все экспортируемые символы, сгенерированные из исходников.
