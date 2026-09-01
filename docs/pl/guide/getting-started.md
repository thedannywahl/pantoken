# Rozpoczęcie

pantoken pobiera tokeny projektowe i ikony Instructure UI, raz je rozwiązuje i przekształca ten pojedynczy
model w pakiety dla wielu platform: zwykłe arkusze stylów, SCSS i Less, React i Vue i Svelte,
Tailwind i Panda, natywne Swift i Kotlin, WordPress i Drupal, Figma i inne.

Instaluje się najmniejszy pakiet pasujący do zadania. Wszystko jest również re-eksportowane przez zunifikowany
pakiet `pantoken`, więc można zacząć od niego i zawęzić wybór później.

## Szkielet projektu startowego

Najszybszy sposób, by wypróbować pantoken: wygenerować szkielet projektu z już zainstalowanym i podłączonym pantokenem.

```sh
npx create-pantoken-app react
```

Platformy: `components` (zwykłe HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zobacz
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) dla `--dir <path>` oraz
użycia programowego.

Korzystanie z agenta kodującego AI? Instalacja nie jest potrzebna — wskaż mu bezpośrednio tę umiejętność:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Działa to tak samo dla Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI i Amazon Q
Developer CLI — zamień `claude` na `gemini`, `agent`, `codex`, `copilot -p` lub `q chat`. Jeśli wolisz na stałe podłączyć reguły agenta pantoken do repozytorium (AGENTS.md, reguły edytora, lokalna kopia tej umiejętności), uruchom zamiast tego `npx @pantoken/ai init`.

## Model tokenów

Tokeny to właściwości niestandardowe CSS nazwane `--instui-<group>-<name>`, na przykład
`--instui-color-background-brand` lub `--instui-spacing-space-md`. Dostarczane są trzy motywy: `rebrand`
(domyślny, z `light-dark()` tam, gdzie różni się jasny i ciemny), `canvas` i `canvasHighContrast`.
Ikony to tokeny `<image>` (`--instui-icon-<name>`) pochodne z Lucide plus niestandardowe
glify Instructure.

## Stylowanie aplikacji webowej

Zainstaluj arkusz stylów i zaimportuj go raz. Definiuje on każdą właściwość `--instui-*`, więc odwołujesz się
do nich bezpośrednio z własnego CSS.

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

## Używanie ikon w dowolnym miejscu

Komponent webowy działa w dowolnym frameworku, bez portowania.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokeny CSS

Ikony to właściwości niestandardowe CSS (`--instui-icon-<name>`). Załaduj arkusz stylów raz i odwołuj się do dowolnej
ikony jako `mask-image` lub `background-image` — bez konieczności importu pojedynczej ikony.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — pojedyncza ikona vs. cały zestaw

`@pantoken/icons` udostępnia dwa nazewnicze eksporty. Użyj `iconsByName`, by pobrać jedną ikonę bez iterowania
po całej tablicy:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Użyj `icons`, gdy potrzebujesz całego zestawu (np. do budowy selektora):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba eksporty ładują pełne IR przy inicjalizacji modułu — nie ma drzewiastego usuwania nieużywanych ikon na tym
poziomie. Dla oszczędnego ładowania tylko CSS, użyj [CDN picker](/guide/cdn-picker) do wygenerowania łączonego URL
zawierającego tylko potrzebne ikony.

## Generowanie dla platformy natywnej

CLI zapisuje źródło tokenów w docelowym repozytorium. Poza runnerem nic nie trzeba instalować:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zobacz [the pantoken CLI](/guide/cli) dla każdego celu.

## Wskazówki do authoringu w VS Code

`@pantoken/pantoken` teraz dostarcza pliki custom-data dla VS Code, dzięki czemu projekty konsumujące mogą uzyskać uzupełnianie klas i
tokenów w HTML/CSS bez instalowania rozszerzenia specyficznego dla pantoken.

1. Zainstaluj zunifikowany pakiet:

```sh
npm i @pantoken/pantoken
```

1. Wskaż VS Code na dostarczony JSON custom-data z twojego workspace konsumenta:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Przeładuj VS Code (lub uruchom "Developer: Reload Window"), aby zastosować nowe dane.

To umożliwia sugestie dla tokenów klas `instui-*` (i tokenów klas `-modifier`) oraz
właściwości niestandardowych `--instui-*`.

## Co dalej

- [Mapa pakietów](/guide/packages) — który pakiet sięgnąć, według zadania.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — zainstaluj zasoby agenta i reguły w repo konsumenta.
- [Architektura](/guide/architecture) — jak model tokenów, core i wyjścia do siebie pasują.
- [Referencja API](/api/) — każdy eksportowany symbol, wygenerowany ze źródła.
