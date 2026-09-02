# Початок роботи

pantoken бере дизайн-токени та іконки Instructure UI, один раз їх резолює та перетворює цю одну
модель у пакети для багатьох платформ: звичайні таблиці стилів, SCSS і Less, React та Vue та Svelte,
Tailwind і Panda, рідні Swift та Kotlin, WordPress і Drupal, Figma та інші.

Встановлюється найменший пакет, що відповідає вашому завданню. Усе також реекспортується через уніфікований
`pantoken` пакет, тож можна почати звідти й звузити вибір пізніше.

## Створити стартовий проект

Найшвидший спосіб спробувати pantoken: згенерувати стартовий проект з уже встановленим і підключеним пакетом.

```sh
npx create-pantoken-app react
```

Платформи: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Див.
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` та
програмного використання.

Використовуєте AI-кодуючого агента? Встановлення не потрібне — вкажіть його прямо на навичку:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Працює так само для Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI та Amazon Q
Developer CLI — замініть `claude` на `gemini`, `agent`, `codex`, `copilot -p` або `q chat`. Якщо бажаєте
постійно інтегрувати правила агента pantoken у репозиторій (AGENTS.md, правила редактора, локальна копія
цієї навички), замість цього запустіть `npx @pantoken/ai init`.

## Модель токенів

Токени — це CSS-змінні з назвою `--instui-<group>-<name>`, наприклад
`--instui-color-background-brand` або `--instui-spacing-space-md`. Постачаються три теми: `rebrand`
(за замовчуванням, з `light-dark()` там, де відрізняються світла та темна теми), `canvas` та `canvasHighContrast`.
Іконки — це токени `<image>` (`--instui-icon-<name>`), похідні від Lucide плюс власні
гліфи Instructure.

## Оформлення веб-додатка

Встановіть stylesheet і імпортуйте його один раз. Він визначає кожну `--instui-*` властивість, тож ви посилаєтеся
на них прямо з вашого CSS.

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

## Використання іконок будь-де

Веб-компонент працює в будь-якому фреймворку, без портування.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS токени

Іконки — це CSS-змінні (`--instui-icon-<name>`). Завантажте stylesheet один раз і посилайтеся на будь-яку
іконку як `mask-image` або `background-image` — імпорт для кожної іконки не потрібен.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — одна іконка проти повного набору

`@pantoken/icons` експортує два іменовані експорти. Використовуйте `iconsByName` щоб витягти одну іконку без ітерації
всього масиву:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Використовуйте `icons` коли потрібен увесь набір (наприклад, щоб побудувати селектор):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Обидва експорти завантажують повний IR при ініціалізації модуля — на цьому рівні немає по-іконкової tree-shaking. Для мінімального завантаження лише CSS, використовуйте [CDN picker](/guide/cdn-picker) щоб згенерувати комбінований URL
лише для потрібних іконок.

## Генерація для нативної платформи

CLI записує джерело токенів у цільовий репозиторій. Окрім раннера, нічого не потрібно встановлювати:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Див. [the pantoken CLI](/guide/cli) для всіх цілей.

## Підказки для авторингу у VS Code

`@pantoken/pantoken` тепер постачає файли VS Code custom-data, щоб downstream-проекти могли отримувати автозаповнення класів і
токенів у HTML/CSS без встановлення спеціального розширення pantoken.

1. Встановіть уніфікований пакет:

```sh
npm i @pantoken/pantoken
```

1. Вкажіть VS Code на постачаний custom-data JSON з вашого споживацького робочого простору:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезавантажте VS Code (або запустіть "Developer: Reload Window") щоб застосувати нові дані.

Це вмикає пропозиції для клас-токенів `instui-*` (і клас-токенів `-modifier`) плюс
`--instui-*` кастомних властивостей.

## Куди далі

- [Карта пакетів](/guide/packages) — який пакет вибрати залежно від завдання.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — встановити агентні активи і правила в споживацькому репозиторії.
- [Архітектура](/guide/architecture) — як модель токенів, core і виходи взаємодіють.
- [API reference](/api/) — усі експортовані символи, згенеровані з джерела.
