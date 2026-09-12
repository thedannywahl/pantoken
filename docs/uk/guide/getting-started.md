# Початок роботи

Pantoken бере дизайн-токени та іконки [Instructure UI](https://instructure.design), одноразово їх обробляє та перетворює цю єдину
модель у пакети для багатьох платформ: прості стилі, SCSS і Less, React, Vue та Svelte,
Tailwind і Panda, нативні Swift і Kotlin, WordPress і Drupal, Figma та інші.

Встановлюється найменший пакет, який підходить для вашого завдання. Усе також ре-експортується через уніфікований
`pantoken` пакет, тож можна почати з нього й потім звужувати вибір.

## Створити стартовий проект

Найшвидший спосіб спробувати pantoken: створити стартовий проект з встановленим і налаштованим пакетом.

```sh
npx create-pantoken-app
```

Платформи: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Див.
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) для `--dir <path>` та
програмного використання.

Використовуєте AI-агента для кодування? Встановлення не потрібне — вкажіть йому навичку безпосередньо:

```prompt
Завантажте create.pantoken.app/SKILL.md і дотримуйтесь його, щоб налаштувати pantoken у цьому проєкті.
```

Якщо потрібно постійно вбудувати правила агента pantoken у репозиторій (AGENTS.md, правила редактора, локальна копія цієї навички), замініть на `npx @pantoken/ai init`.

## Модель токенів

Токени — це CSS-змінні (custom properties) з іменами `--instui-<group>-<name>`, наприклад
`--instui-color-background-brand` або `--instui-spacing-space-md`. Постачаються три теми: `rebrand`
(за замовчуванням, з `light-dark()` там, де світла й темна відрізняються), `canvas` та `canvasHighContrast`.
Іконки — це токени `<image>` (`--instui-icon-<name>`), похідні від Lucide плюс власні
гліфи Instructure.

## Стилізувати веб-додаток

Встановіть стилі та імпортуйте їх один раз. Вони визначають кожну `--instui-*` властивість, тож можна звертатись
до них безпосередньо з вашого CSS.

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

## Використовувати іконки будь-де

Веб-компонент працює в будь-якому фреймворку без портіровання.

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

Іконки — це CSS-змінні (`--instui-icon-<name>`). Завантажте стилі один раз і звертайтесь до будь-якої
іконки як `mask-image` або `background-image` — немає потреби імпортувати кожну іконку окремо.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — одна іконка проти повного набору

`@pantoken/icons` експортує два іменовані експортa. Використовуйте `iconsByName` щоб отримати одну іконку без ітерації
по всьому масиву:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Використовуйте `icons` коли потрібен увесь набір (наприклад, для побудови селектора):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Обидва експорти завантажують повний IR під час ініціалізації модуля — тут немає по-іконного tree-shaking. Для компактного CSS-only завантаження використовуйте [CDN picker](/guide/cdn-picker) щоб згенерувати комбінований URL
тільки для потрібних іконок.

## Генерація для нативної платформи

CLI записує джерела токенів у цільовий репозиторій. Нічого встановлювати, окрім раннера:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Див. [the pantoken CLI](/guide/cli) для всіх цілей.

## Поради для авторингу у VS Code

`@pantoken/pantoken` тепер постачає файли VS Code custom-data, тож споживачі можуть отримати автодоповнення класів і
токенів у HTML/CSS без встановлення специфічного розширення pantoken.

1. Встановіть уніфікований пакет:

```sh
npm i @pantoken/pantoken
```

1. Вкажіть VS Code на наданий custom-data JSON з вашого робочого простору споживача:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Перезавантажте VS Code (або виконайте "Developer: Reload Window") щоб застосувати нові дані.

Це вмикає підказки для `instui-*` класових токенів (та `-modifier` класових токенів) плюс
`--instui-*` custom properties.

## Куди йти далі

- [Карта пакетів](/api/) — який пакет обрати за завданням.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — встановити активи агента та правила в репозиторій споживача.
- [Архітектура](/guide/architecture) — як модель токенів, ядро й виходи взаємодіють.
- [API reference](/api/) — усі експортовані символи, згенеровані з джерел.
