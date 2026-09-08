# Початок роботи

Pantoken бере дизайн-токени та іконки [Instructure UI](https://instructure.design), один раз їх резольвить і перетворює цю єдину
модель у пакети для багатьох платформ: звичайні стилі, SCSS і Less, React, Vue і Svelte,
Tailwind і Panda, нативні Swift і Kotlin, WordPress і Drupal, Figma та інші.

Встановлюється найменший пакет, який підходить для вашого завдання. Усе також ре-експортується через уніфікований
`pantoken` пакет, тож можна почати звідти й звузити вибір пізніше.

## Створення стартового проекту

Найшвидший спосіб спробувати pantoken: створити стартовий проект з уже встановленим і підключеним пакетом.

```sh
npx create-pantoken-app
```

Платформи: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Див.
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` та
програмного використання.

Використовуєте AI-агента для кодування? Встановлення не потрібне — вкажіть йому навичку безпосередньо:

```prompt
Отримайте create.pantoken.app/SKILL.md і виконайте інструкції в ньому, щоб налаштувати pantoken у цьому проєкті.
```

Якщо бажаєте постійно підключити правила агента pantoken до репозиторію (AGENTS.md, правила редактора, локальна копія цієї навички), запустіть замість цього `npx @pantoken/ai init`.

## Модель токенів

Токени — це CSS-змінні (custom properties) з іменами `--instui-<group>-<name>`, наприклад
`--instui-color-background-brand` або `--instui-spacing-space-md`. Відправляються три теми: `rebrand`
(за замовчуванням, з `light-dark()` там, де світла й темна теми відрізняються), `canvas` і `canvasHighContrast`.
Іконки — це токени `<image>` (`--instui-icon-<name>`), похідні від Lucide плюс власні
гліфи Instructure.

## Стилізація веб-додатка

Встановіть стилі й імпортуйте їх один раз. Вони визначають кожну `--instui-*` властивість, тож ви посилаєтеся
на них безпосередньо з власного CSS.

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

### CSS-токени

Іконки — це CSS-змінні (`--instui-icon-<name>`). Завантажте таблицю стилів один раз і посилайтесь на будь-яку
іконку як `mask-image` або `background-image` — окремий імпорт для кожної іконки не потрібен.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — одна іконка проти повного набору

`@pantoken/icons` експортує два іменовані експортa. Використовуйте `iconsByName` щоб витягнути одну іконку без ітерації
по всьому масиву:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Використовуйте `icons` коли потрібен весь набір (наприклад, щоб побудувати селектор):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Обидва експорти завантажують повний IR при ініціалізації модуля — тут немає tree-shaking на рівні окремих іконок. Для економного завантаження лише CSS використовуйте [CDN picker](/guide/cdn-picker) щоб згенерувати комбінований URL
тільки для потрібних іконок.

## Генерація для нативної платформи

CLI записує джерело токенів у цільовий репозиторій. Більше нічого встановлювати не потрібно, окрім раннера:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Див. [the pantoken CLI](/guide/cli) для всіх цілей.

## Поради для VS Code під час авторингу

`@pantoken/pantoken` тепер постачає файли custom-data для VS Code, тож downstream-проекти можуть отримати автодоповнення класів і
токенів у HTML/CSS без встановлення специфічного розширення pantoken.

1. Встановіть уніфікований пакет:

```sh
npm i @pantoken/pantoken
```

1. Вкажіть VS Code на постачаний custom-data JSON з вашого робочого простору споживача:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезавантажте VS Code (або запустіть "Developer: Reload Window"), щоб застосувати нові дані.

Це вмикає підказки для клас-токенів `instui-*` (та клас-токенів `-modifier`) плюс
`--instui-*` кастомних властивостей.

## Куди йти далі

- [Карта пакетів](/guide/packages) — який пакет обрати для конкретного завдання.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — встановлення активів агента й правил у репозиторій-споживач.
- [Архітектура](/guide/architecture) — як модель токенів, ядро й виходи поєднуються.
- [API reference](/api/) — кожен експортований символ, згенерований із джерела.
