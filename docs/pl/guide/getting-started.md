# Rozpoczęcie

Pantoken pobiera design tokeny i ikony z [Instructure UI](https://instructure.design), jednorazowo je rozwiązuje i przekształca ten jeden
model w pakiety dla wielu platform: zwykłe arkusze stylów, SCSS i Less, React oraz Vue i Svelte,
Tailwind i Panda, natywne Swift i Kotlin, WordPress i Drupal, Figma i więcej.

Instaluje się najmniejszy pakiet pasujący do zadania. Wszystko jest też reeksportowane przez zunifikowany
pakiet `pantoken`, więc można zacząć od niego i później zawęzić wybór.

## Szkielet projektu startowego

Najszybszy sposób, by wypróbować pantoken: wygenerować szkielet projektu z już zainstalowanym i podłączonym pakietem.

```sh
npx create-pantoken-app
```

Platformy: `components` (zwykłe HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Zobacz
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) dla `--dir <path>` oraz
użycia programistycznego.

Korzystasz z agenta kodującego AI? Brak potrzeby instalacji — skieruj go bezpośrednio do tej umiejętności:

```prompt
Pobierz create.pantoken.app/SKILL.md i postępuj zgodnie z jego instrukcjami, aby skonfigurować pantoken w tym projekcie.
```

Jeśli raczej chcesz na stałe włączyć reguły agenta pantoken do repozytorium (AGENTS.md, reguły edytora, lokalna kopia tej umiejętności), uruchom zamiast tego `npx @pantoken/ai init`.

## Model tokenów

Tokeny to własne właściwości CSS nazwane `--instui-<group>-<name>`, na przykład
`--instui-color-background-brand` lub `--instui-spacing-space-md`. Dostarczane są trzy motywy: `rebrand`
(domyślny, z `light-dark()` tam, gdzie występują różnice między jasnym a ciemnym), `canvas` oraz `canvasHighContrast`.
Ikony to tokeny `<image>` (`--instui-icon-<name>`) pochodne z Lucide plus niestandardowe
glify Instructure.

## Stylizowanie aplikacji webowej

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

## Użycie ikon gdziekolwiek

Komponent webowy działa w każdym frameworku, bez portowania.

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

Ikony to własne właściwości CSS (`--instui-icon-<name>`). Załaduj arkusz stylów raz i odwołuj się do każdej
ikony jako `mask-image` lub `background-image` — bez konieczności importu per-ikona.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — pojedyncza ikona vs. cały zestaw

`@pantoken/icons` udostępnia dwa nazwane eksporty. Użyj `iconsByName`, aby pobrać jedną ikonę bez iterowania
po całej tablicy:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Użyj `icons`, gdy potrzebujesz całego zestawu (np. do zbudowania selektora):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba eksporty ładują pełne IR przy inicjalizacji modułu — nie ma tu tree-shakingu per-ikona na tym
poziomie. Dla oszczędnego ładowania tylko CSS użyj [CDN picker](/guide/cdn-picker), aby wygenerować łączony URL
zawierający tylko potrzebne ikony.

## Generowanie dla platformy natywnej

CLI zapisuje źródło tokenów do docelowego repozytorium. Brak instalacji poza runnerem:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Zobacz [pantoken CLI](/guide/cli) dla wszystkich celów.

## Wskazówki do edycji w VS Code

`@pantoken/pantoken` dostarcza teraz pliki custom-data dla VS Code, dzięki czemu projekty zależne mogą uzyskać uzupełnianie klas i
tokenów w HTML/CSS bez instalowania rozszerzenia specyficznego dla pantoken.

1. Zainstaluj zunifikowany pakiet:

```sh
npm i @pantoken/pantoken
```

1. Wskaż VS Code na dołączony plik custom-data JSON z twojego workspace konsumenta:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Przeładuj VS Code (lub uruchom "Developer: Reload Window"), aby zastosować nowe dane.

To włącza sugestie dla tokenów klas `instui-*` (i tokenów klas `-modifier`) oraz
własnych właściwości `--instui-*`.

## Dokąd dalej

- [Mapa pakietów](/api/) — który pakiet wybrać w zależności od zadania.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — zainstaluj zasoby agenta i reguły w repozytorium konsumenta.
- [Architektura](/guide/architecture) — jak model tokenów, core i wyjścia do siebie pasują.
- [Dokumentacja API](/api/) — wszystkie eksportowane symbole, generowane ze źródła.
