# Wtyczki

Wtyczka pantoken rozszerza wyjście tokenów lub CSS bez rozwidlania pakietu. Tworzy się ją za pomocą
`definePlugin` z `@pantoken/plugin-kit`, a następnie przekazuje do `buildTokens` lub `toCss`.

## Tworzenie wtyczki

Przekaż do `definePlugin` hooki, które implementujesz. Zwróci ona zwykłą wtyczkę z brandem opartym na
możliwościach wywnioskowanych z tych hooków. Wtyczka może rozszerzać IR (`tokens`, `icons`), wyjście CSS
(`css`), albo oba.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rejestracja uwzględniająca możliwości

`buildTokens` i `toCss` uruchamiają `checkPlugins` dla przekazanych wtyczek. Ostrzega — nigdy nie rzuca wyjątku —
gdy wtyczka nie ma pasującego hooka dla etapu, w którym jest rejestrowana, więc wtyczka tylko dla tokenów przekazana
do `toCss` zostanie pominięta z notatką zamiast cicho nic nie robić.

## Komponowanie wtyczek

Buduj na bazie innej wtyczki za pomocą `extendPlugin`, albo łącz równorzędne za pomocą `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooki działające na tym samym etapie się komponują: `tokens` uruchamia bazę, a potem dodatek, `css` scala dwa
wkłady, a `icons` uruchamia oba.

## Waliduj wyjście wtyczki

Uruchom wspólne checki drift z `@pantoken/utils` nad wyjściem wtyczki w jej teście, tak aby literówka
lub zmieniona nazwa tokena szybko i lokalnie powodowała błąd:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Bundlowane wtyczki

- `@pantoken/plugin-simple-icons` — brandowe ikony z simple-icons, zarejestrowane jako tokeny ikon.
- `@pantoken/plugin-lucide-lab` — ikony Lucide Lab, zarejestrowane jako `--instui-icon-*` tokeny obrazów.
- `@pantoken/plugin-logos` — logotypy produktów Instructure jako SVG, URI danych i `--instui-logo-*`
  tokeny obrazów.
- `@pantoken/plugin-prune-custom-props` — wtyczka PostCSS (nie wtyczka pantoken), która usuwa
  nieużywane właściwości niestandardowe z arkusza stylów.
- `@pantoken/plugin-custom-theme-colors` — rebranduje stronę ustawiając atrybut
  (`data-pantoken-color`) na jedną z 13 palet, lub na `custom` dla dowolnego hexa marki. Zobacz
  [Kolory motywu](#theme-colors).
- `@pantoken/plugin-custom-components` — kontrolki niestandardowe oparte na tokenach, w tym SegmentedControl
  i SkeletonLoader.

### Segmented control

Użyj segmented control dla dwóch do pięciu powiązanych widoków lub filtrów. Każda opcja to oznaczony natywny
radio w jednej nazwanej grupie; oznacz jedno jako zaznaczone początkowo. Użyj zakładek lub rozwijanego menu jeśli opcje nie mieszczą się
wygodnie, a grup przycisków dla akcji zamiast wyborów. Styl `-size-md` jest domyślny, z `-size-sm` i `-size-lg` dla bardziej zwartego i bardziej wyeksponowanego kontekstu.

Importuj `@pantoken/plugin-custom-components/segmented-control.css` dla kontrolki i jej przycisków przepełnienia. Użyj klasy `-icon-*` na etykiecie segmentu gdy segment potrzebuje glifu; pomocnik interakcji
promuje także klasę `-icon-*` z natywnego inputa do malarki etykiety. Nadaj fieldsetowi opisowy `aria-label` lub widoczną legendę. Pomocnik zachowuje natywne
ogłoszenie radio, dodaje nawigację klawiaturową i opcjonalnie odsłania jeden przycięty segment na każde naciśnięcie strzałki. Użyj logicznych kontrolerów start/koniec i dostępnych etykiet przycisków w obu kierunkach:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Importuj `@pantoken/interactions/segmented-control.iife.js` dla rejestracji po załadowaniu DOM, albo wywołaj
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` z `@pantoken/interactions`
i wywołaj `cleanup()` przy usuwaniu. CSS i natywne wybory radio działają bez JS; strzałki przepełnienia wymagają zachowania. Wybrany element używa cieni projektowych z dwuwarstwowym cieniem z semantycznych
kolorów drop-shadow; jest to wyraźny cień elementu aktywnego, a nie istniejący
kompozyt `--instui-elevation-*`. Przyciski przepełnienia używają tokenów komponentu elevation3 z upstream przez `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Ścieżka `skeleton-loader.css` stylizuje jeden dekoracyjny kształt Tekstu, Awatara lub Obrazu. Tekst przyjmuje
`-size-xxs` przez `-size-xxl`; Avatar i Obraz są średniego rozmiaru. Każdy opcjonalny `.skeleton-row`
dodaje jedną linię tekstu bez zmiany rozmiaru. Efekt połyskujący w CSS zatrzymuje się po trzech przejściach po 1,5 sekundy i
pozostaje statyczny, gdy użytkownik preferuje zmniejszone animacje. Działa przed załadowaniem JavaScript.

Umieszczaj kształty tylko tam, gdzie pojawi się zawartość zależna od zapytania, nie nad nawigacją,
filtrami, nagłówkami ani kontrolkami znanymi z serwera. Skeleton nie jest miernikiem postępu ani stanem zajętości akcji. Zachowaj
istniejącą zawartość widoczną podczas odświeżeń w tle; użyj spinnera lub stanu zajętości przycisku dla akcji.

Aplikacja rodzicielska jest właścicielem markupów loading, loaded, empty i error. Udostępnij jedną region pusty na stronę
i osobny alert pusty w HTML serwera, oba **poza** obszarem zawartości zajętej:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Wywołaj zachowanie na poziomie rodzica, gdy zmienia się stan żądania. Aktualizuje `aria-busy` i dwa
wstępnie istniejące ogłoszenia, ale nigdy nie zastępuje zawartości ani nie przesuwa fokusu:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Jeśli używasz pakietu interakcji per-komponent zamiast bezpośredniego importu, wyemituj zdarzenie
`pantoken:skeleton-state` na elemencie `[data-skeleton-region]` z
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Opóźnij _pokazywanie_
placeholderów o 200–500 ms dla szybkich zapytań; zachowanie niezależnie opóźnia ogłoszenie ładowania o 400 ms. Przy pasywnych załadunkach strony, pozostaw fokus tam gdzie jest. Przesuń fokus do nowo
załadowanego wyniku tylko gdy własne działanie użytkownika go zażądało. Węzeł statusu ogłasza wyniki i stany puste; węzeł alert ogłasza błędy. Nie łącz `aria-busy`, `role="status"` i
`role="alert"` na jednym elemencie.

Rejestr Lucide Lab można ładować leniwie, a następnie przekazać do synchronicznego hooka tokenów:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kilka rzeczy, które kiedyś były wtyczkami, teraz dołączone są w `@pantoken/components`, ponieważ wiele komponentów potrzebuje ich natychmiast: cienie elewacji (`--instui-elevation-*`, w `components.css`), pierścień focus-outline
(w `base.css` — każdy element fokusowalny go otrzymuje gdy pantoken zarządza stroną), oraz fonty marki Instructure (Atkinson Hyperlegible Next: `base.css` stosuje `--instui-font-family-base`; opcjonalny
`@pantoken/components/fonts.css` ładuje pliki `@font-face` w formacie woff2).

## Kolory motywu

`@pantoken/plugin-custom-theme-colors` emituje jeden blok `[data-pantoken-color="…"]` na paletę
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Każdy blok kieruje prymitywy marki (`--instui-primitive-color-navy-*` i `-blue-*`)
na wybraną paletę. Również ponownie wyprowadza prymitywy powierzchni marki, które upstream spłaszczył do literału hex,
zachowując ich wgrane alfa przez `color-mix()`. Semantyczne kolory statusu, wyraźne akcenty niebieskiego i
cienie elewacji pozostają bez zmian. Wypróbuj w
[demie tematyzacji opartej na próbnikach kolorów](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Niestandardowy kolor marki

Ustaw `data-pantoken-color="custom"` aby przebrandować z dowolnego hexa, na przykład podstawowego koloru, który administrator Canvas
wpisuje w Edytorze Motywu. pantoken wyprowadza z niego pełną skalę 10–200 `--instui-primitive-color-custom-*`:

1. **Krzywa odniesienia.** Docelowa jasność każdego kroku to średnia jasność OKLCH 13
   palet w tym kroku, z 0 ustalonym na biały i 210 na czarny. Dzięki temu odstępy w niestandardowej skali
   odpowiadają odstępom w dostarczonych paletach.
2. **Kotwica.** Wejście ląduje na kroku, którego docelowa jasność jest najbliższa jego własnej, a następnie przyciąga się do
   tej dokładnej jasności. `#cccccc` staje się `custom-40` przy `#c9c9c9`: blisko wejścia, ale nie
   zawsze identyczne. „Najbliższy” oznacza najbliższy krok na krzywej, nie najbliższy kolor istniejącej palety.
3. **Wypełnienie.** Każdy inny krok zachowuje odcień wejścia. Jego nasycenie podąża za średnią krzywą nasycenia palet względem kotwicy, i jest zmniejszane tylko tam, gdzie kolor wychodzi poza sRGB.

Akceptowane są tylko `#rgb` i `#rrggbb`; cokolwiek innego rzuca `TypeError`, więc hex z formularza
nie może wstrzyknąć CSS.

Podczas budowania emituj całe reguły z już zadeklarowanymi pochodnymi prymitywami:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Aby wybrać kolor w czasie działania bez wysyłania zestawu tokenów, oblicz uprzednio krzywą i regułę odwzorowania
w czasie budowania. Następnie użyj niezależnego od zależności wpisu `/scale` w przeglądarce i ustaw tylko 20
pochodnych prymitywów:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Picker motywu na stronie dokumentacji, edytor motywu Canvas i powyższe demo wszystkie działają w ten sposób.

Zobacz [Referencję API](/api/) dla eksportów każdej wtyczki.
