# Rozpoczęcie

Pantoken pobiera tokeny projektowe i ikony z [Instructure UI](https://instructure.design), rozwiązuje je raz i przekształca ten jeden
model w pakiety dla wielu platform: zwykłe arkusze stylów, SCSS i Less, React, Vue i Svelte,
Tailwind i Panda, natywne Swift i Kotlin, WordPress i Drupal, Figma i inne.

Instaluje się najmniejszy pakiet pasujący do zadania. Wszystko jest też re-eksportowane przez zunifikowany
pakiet `pantoken`, więc można zacząć od niego, a później zawęzić wybór.

## Szkielet projektu startowego

Najszybszy sposób, by wypróbować pantoken: wygenerować projekt startowy z pantoken już zainstalowanym i skonfigurowanym.

```sh
npx create-pantoken-app
```

Platformy: `components` (czysty HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zobacz
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) dla `--dir <path>` oraz użycia programowego.

Używasz agenta AI do kodowania? Instalacja nie jest potrzebna — wskaż mu bezpośrednio tę umiejętność:

```prompt
Pobierz create.pantoken.app/SKILL.md i postępuj zgodnie z nim, aby skonfigurować pantoken w tym projekcie.
```

Jeśli wolisz trwale wpiąć reguły agenta pantoken w repozytorium (AGENTS.md, reguły edytora, lokalna kopia tej umiejętności), uruchom zamiast tego `npx @pantoken/ai init`.

## Model tokenów

Tokeny to właściwości niestandardowe CSS o nazwach `--instui-<group>-<name>`, na przykład
`--instui-color-background-brand` lub `--instui-spacing-space-md`. Dostarczane są trzy tematy: `rebrand`
(domyślny, z `light-dark()` tam, gdzie różni się jasny i ciemny), `canvas` i `canvasHighContrast`.
Ikony to tokeny `<image>` (`--instui-icon-<name>`) pochodzące z Lucide oraz niestandardowych
glifów Instructure.

## Stylowanie aplikacji webowej

Zainstaluj arkusz stylów i zaimportuj go raz. Definiuje on każdą właściwość `--instui-*`, więc odwołujesz
się do nich bezpośrednio ze swojego CSS.

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

## Używanie ikon wszędzie

Web component działa w każdym frameworku, bez portowania.

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

Ikony to niestandardowe właściwości CSS (`--instui-icon-<name>`). Załaduj arkusz stylów raz i odwołuj się do dowolnej
ikony jako `mask-image` lub `background-image` — bez konieczności importu każdej ikony osobno.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — pojedyncza ikona vs. cały zestaw

`@pantoken/icons` udostępnia dwa nazwane eksporty. Użyj `iconsByName` żeby pobrać jedną ikonę bez iterowania
po całej tablicy:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Użyj `icons` gdy potrzebujesz całego zestawu (np. do zbudowania selektora):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba eksporty ładują pełne IR przy inicjalizacji modułu — na tym poziomie nie ma tree-shakingu per-ikona. Dla lekkiego ładowania tylko CSS, użyj [CDN picker](/guide/cdn-picker) by wygenerować skondensowany URL
zawierający tylko potrzebne ikony.

## Generowanie dla platformy natywnej

CLI zapisuje źródła tokenów do docelowego repozytorium. Poza runnerem nie trzeba nic instalować:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zobacz [pantoken CLI](/guide/cli) dla wszystkich celów.

## Wskazówki do edycji w VS Code

`@pantoken/pantoken` teraz dostarcza pliki VS Code custom-data, dzięki czemu projekty konsumujące mogą otrzymać automatyczne uzupełnianie klas i
tokenów w HTML/CSS bez instalowania rozszerzenia specyficznego dla pantoken.

1. Zainstaluj zunifikowany pakiet:

```sh
npm i @pantoken/pantoken
```

1. Wskaż VS Code na dostarczone custom-data JSON z twojego workspace konsumenta:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Przeładuj VS Code (lub uruchom "Developer: Reload Window"), aby zastosować nowe dane.

To umożliwia sugestie dla tokenów klas `instui-*` (oraz tokenów klas `-modifier`) oraz
właściwości niestandardowych `--instui-*`.

## Dokąd dalej

- [Mapa pakietów](/guide/packages) — który pakiet wybrać, w zależności od zadania.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — zainstaluj zasoby agenta i reguły w repozytorium konsumenta.
- [Architektura](/guide/architecture) — jak model tokenów, core i wyjścia do siebie pasują.
- [Dokumentacja API](/api/) — każdy eksportowany symbol, wygenerowany ze źródła.
