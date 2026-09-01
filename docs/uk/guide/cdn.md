# CDN і дистрибуція

pantoken публікує кожен пакет на npm, тож ви можете завантажувати токени, компоненти й веб-компоненти безпосередньо
з CDN — без кроку збірки, без бандлера. Ця сторінка охоплює URL для комбінування CSS (з інтерактивним
генератором), а також drop-in для веб-компонентів.

## Основа токенів

Кожен компонент pantoken читає `--instui-*` кастомні властивості з таблиці токенів на сторінці. Постачаються два
варіанти:

- `@pantoken/css/dist/style.lean.css` — рекомендована CDN-основа. Містить усі токени, окрім
  повного набору іконок, тому займає приблизно 23 KB у gzip.
- `@pantoken/css/dist/style.css` — повна таблиця, включно з усіма ~1,777 гліф-токенами іконок
  (`--instui-icon-*`). Близько 140 KB у gzip. Завантажуйте її, якщо ви широко використовуєте іконки через
  `var(--instui-icon-*)`.

Шкала elevation і змінні focus-ring присутні в обох таблицях, тому тіні й обвід фокусу працюють
навіть при завантаженій лише основі.

## Виберіть компоненти й іконки

[Інтерактивний вибір CDN](/guide/cdn-picker) генерує jsDelivr combine URL-адреси для CSS і фрагменти для пакетів JavaScript. Відкрийте його, позначте потрібні елементи й скопіюйте згенерований результат.

- **Вкладка Components** — вибирайте окремі стилі компонентів або весь бревел `components.css`. Додайте базовий reset або утиліти spacing/color за потреби.
- **Вкладка JS** — скопіюйте ESM-сніпет імпорту для `@pantoken/interactions`.
- **Вкладка Icons** — вибирайте окремі іконки з набору InstUI (~1,800 іконок) або зі Simple Icons (~3,300 брендових гліфів). Генератор виводить окремий combine URL для CSS-файлів іконок, щоб ви могли завантажувати лише ті іконки, які реально використовуєте.
- **Вкладка Web Components** — будує фрагменти `@pantoken/web-components` (ESM selective register або класичний скрипт bootstrap).

Кожний файл компоненту малий — більшість близько 2 KB. Компонент, що рендерить іконки (`alert`, `checkbox`,
та кілька інших) потребує цих гліфів, тому генератор додає `@pantoken/components/dist/component-icons.css` (приблизно
0.5 KB у gzip — 11 іконок, які використовує набір компонентів) коли обрано полегшену таблицю. Повна таблиця
вже їх містить.

### Порядок завантаження й шрифти

Спочатку завантажуйте основу токенів, потім опційний базовий reset, далі файли компонентів, і вкінці утиліти — вони є утилітами-оверрайдами, тож фактично переопределяють правило компонента лише коли потрапляють
після нього в каскаді. Combine URL вище вже їх впорядковує. Шрифти — виняток:
`@pantoken/components/dist/fonts.css` вказує на файли шрифтів відносними шляхами, тож combine не може їх переписати — завантажте його окремо як `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Всі одразу

Позначте **All components** у генераторі, щоб переключити його на бревел, або вкажіть його прямо (приблизно 141 KB
у gzip) разом з таблицею токенів:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Веб-компоненти

`@pantoken/web-components` реєструє фреймворк-агностичні `<instui-*>` кастомні елементи. Вони інлайнять свій
CSS, але все одно читають токени з таблиці на сторінці, тож завантажте також основу токенів.

### ES-модулі (рекомендовано)

ESM CDN вирішує залежності пакета за вас. Це реєструє всі елементи:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Використовуйте повну таблицю токенів (або полегшену таблицю плюс `component-icons.css`), щоб елементи, що рендерять іконки, як
`<instui-alert>`, знаходили свої гліфи.

Щоб реєструвати лише деякі елементи — та їхні вкладені залежності — імпортуйте `register` і передайте `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Класичний тег script

Для drop-in без модулів завантажте IIFE-збірку. Вона бандлює залежності й авто-реєструє всі
елементи під час завантаження, відкриваючи глобал `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Вона більша за ESM-шлях — вона інлайнить `@pantoken/components` і `@pantoken/icons` — тож використовуйте її
лише коли неможливо використовувати модулі.

## Фіксація версій

URL-адреси вище — і ті, що генерує вибірник — відслідковують останній реліз. Для продакшену зафіксуйте мажорну (або точну)
версію — наприклад `@pantoken/css@0` — щоб оновлення не стало для вас несподіванкою.
