# CDN i dystrybucja

pantoken publikuje każdy pakiet na npm, więc można pobierać tokeny, komponenty i web komponenty bezpośrednio
z CDN — bez kroku budowania, bez bundlera. Ta strona opisuje URL łączenia CSS (z interaktywnym
kreatorem) oraz gotowe wtyczki web-component.

## Fundament tokenów

Każdy komponent pantoken czyta `--instui-*` właściwości niestandardowe z arkusza tokenów na stronie. Dostępne są dwie
warianty:

- `@pantoken/css/dist/style.lean.css` — zalecany fundament CDN. Zawiera wszystkie tokeny poza
  pełnym zestawem ikon, więc ma około 23 KB po gzip.
- `@pantoken/css/dist/style.css` — pełny arkusz, zawierający wszystkie ~1,777 ikon glyph
  (`--instui-icon-*`). Około 140 KB po gzip. Załaduj go, jeśli odwołujesz się do ikon szeroko przez
  `var(--instui-icon-*)`.

Skala elevacji i zmienne focus-ring są w obu arkuszach, więc cienie i obwódka fokusu działają przy
załadowanym tylko fundamencie.

## Wybierz komponenty i ikony

[Interaktywny wybieracz CDN](/guide/cdn-picker) buduje jsDelivr combine URL-e dla CSS i fragmenty dla pakietów JavaScript. Otwórz go, zaznacz potrzebne pozycje i skopiuj wygenerowane wyjście.

- **Karta Components** — wybierz pojedyncze arkusze stylów komponentów lub cały barrel `components.css`. Dodaj base reset albo utility spacing/color jeśli ich potrzebujesz.
- **Karta JS** — skopiuj fragment importu ESM dla `@pantoken/interactions`.
- **Karta Icons** — wybierz pojedyncze ikony z zestawu InstUI (~1,800 ikon) lub z Simple Icons (~3,300 glyphów marek). Wybieracz generuje osobny URL łączenia dla plików CSS ikon, żeby można było załadować tylko używane ikony.
- **Karta Web Components** — buduje fragmenty `@pantoken/web-components` (ESM selektywna rejestracja lub klasyczne bootstrapowanie przez skrypt).

Każdy plik komponentu jest mały — większość ma około 2 KB. Komponent renderujący ikony (`alert`, `checkbox`,
i kilka innych) potrzebuje tych glyphów, więc kreator dodaje `@pantoken/components/dist/component-icons.css` (około
0.5 KB po gzip — 11 ikon używanych przez zestaw komponentów) kiedy wybierzesz lekki arkusz. Pełny arkusz
już je zawiera.

### Kolejność ładowania i fonty

Załaduj najpierw fundament tokenów, potem opcjonalny base reset, następnie pliki komponentów, a na końcu utilities — to są narzędzia nadpisujące, więc faktycznie nadpiszą reguły komponentu tylko gdy trafią
po nich w kaskadzie. Combine URL powyżej już je dla Ciebie porządkuje. Fonty to jedyny wyjątek:
`@pantoken/components/dist/fonts.css` wskazuje pliki fontów ścieżką względną, więc combine nie może ich przepisać — załaduj go jako oddzielny `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Wszystko naraz

Zaznacz w wybieraczu **All components**, aby przełączyć go na barrel, albo wskaż go samodzielnie (około 141 KB
po gzip) obok arkusza tokenów:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` rejestruje agnostyczne wobec frameworków `<instui-*>` elementy niestandardowe. Inline'ują własne
CSS, ale nadal czytają tokeny z arkusza na stronie, więc załaduj też fundament tokenów.

### Moduły ES (zalecane)

CDN ESM rozwiązuje zależności pakietu za Ciebie. To zarejestruje każdy element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Użyj pełnego arkusza tokenów (lub lekkiego arkusza plus `component-icons.css`), aby elementy renderujące ikony takie jak
`<instui-alert>` mogły znaleźć swoje glyphy.

Aby zarejestrować tylko niektóre elementy — i ich zagnieżdżone zależności — importuj `register` i przekaż `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasyczny tag skryptu

Dla drop-ina bez modułów, załaduj build IIFE. Pakuje zależności i auto-rejestruje każdy
element przy ładowaniu, udostępniając globalne `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Jest większy niż ścieżka ESM — inline'uje `@pantoken/components` i `@pantoken/icons` — więc sięgnij po niego
tylko gdy nie możesz użyć modułów.

## Przypinanie wersji

URL-e powyżej — i te, które generuje wybieracz — śledzą najnowsze wydanie. Przypnij wersję major (lub dokładną)
dla produkcji — na przykład `@pantoken/css@0` — aby aktualizacja Cię nigdy nie zaskoczyła.
