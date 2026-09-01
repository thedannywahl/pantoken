# Komponenty

`@pantoken/components` dostarcza style komponentów oparte na klasach zbudowane z tokenów Instructure. Zaimportuj
arkusz stylów i oznacz swoją strukturę — bez potrzeby użycia frameworka.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Wolisz elementy niestandardowe? `@pantoken/web-components` owija te same style jako `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` i więcej — zobacz
> [mapę pakietów](/guide/packages).

## Konwencje

Konwencje CSS w tym pakiecie bazują na zmodyfikowanej wersji [RSCSS](https://ricostacruz.com/rscss/index.html).

Modyfikatory są **klucz-wartość** — `-<prop>-<val>`, dopasowane do nazw właściwości InstUI — więc czytają się same:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Właściwości typu boolean
to sama nazwa właściwości; obecność oznacza `true` (`-has-shadow`, `-clickable`); domyślnie włączony boolean,
gdy zostanie wyłączony, jest odwracany (`-without-background`, `-without-border`). Rozmiary akceptują krótkie i pełne
zapisy (`-size-sm` = `-size-small`). Tam, gdzie nazwa odbiega od InstUI, semantyczna klasa InstUI nadal działa
ale jest przestarzała (np. `-variant-info` → użyj `-color-info`).

### Przykład

Komponent Instructure UI w React:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

komponenty pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

Dla właściwości `timeout` InstUI ustaw bezjednostkową właściwość niestandardową `--timeout` w milisekundach i załaduj
interakcję Alert. Wartość dodatnia planuje zamknięcie; `0` (domyślnie) pozostawia alert na miejscu. Dodaj klasy `instui-transition -fade-entered` narzędzia `transition` dla efektu zanikania InstUI; pomiń
je dla natychmiastowego usunięcia. Interakcja steruje stanem `-fade-exiting` i wyzwala anulowalne,
bąbelkujące zdarzenie `dismiss` przed usunięciem, więc aplikacja może wywołać `preventDefault()` aby utrzymać
alert zamontowany.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Paski postępu akceptują dowolne skale przez `--min` (`0` domyślnie), `--value` i `--max`
(`100` domyślnie), z przestarzałymi aliasami `--value-now` i `--value-max`. Dodaj `-should-animate`
aby zastosować półsekundowe przejście InstUI przy każdej zmianie wartości. `.value` występuje obok `.bar` jako
dziecko korzenia; dodaj `-render-value-inside` aby wyrenderować go nad torem, wyrównanego do początku,
zamiast tego (ostyluj, by był czytelny na tle koloru miernika). Użyj natywnego `<progress>` dla zakresu zerowego i `<meter>` gdy minimum jest różne od zera; web componenty wybierają między nimi
automatycznie na podstawie atrybutu `min`. InstUI nie ma stanu niedeterminate, więc `<progress>`
pozbawiony atrybutu `value` to najlepsze przypuszczenie pantoken: `progress-bar` animuje `.bar` jako
ślizgający się segment, a `progress-circle` kręci swoje koło pod stałym łukiem, oba ukrywając `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Koła postępu akceptują te same dowolne skale przez `--min`, `--value` i `--max`.
`--value-now` i `--value-max` pozostają przestarzałymi aliasami funkcyjnymi. Dodaj `-should-animate` i
załaduj pakiet interakcji skupienia, aby odtworzyć animację montowania InstUI; `--animation-delay` to
bezjednostkowe opóźnienie w milisekundach. Przestarzałe zapisy `-should-animate-on-mount` i
`-shold-animate-on-mount` pozostają funkcjonalnymi aliasami.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Prefiks klas

Każda klasa jest domyślnie przestrzeniona nazwą `instui-`. Zbuduj arkusz stylów z własnym prefiksem — lub bez —
przekazując `prefix` do dowolnego buildera. Każda wartość fałszywa (`null`, `undefined`, `""`, lub pominięcie) usuwa
prefiks całkowicie, więc możesz tworzyć `class="heading -level-h1"` zamiast `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modyfikatory z myślnikiem-przeciwnym (`.-color-secondary`, `.-level-h1`) pozostają niezmienione w obu przypadkach. Arkusze stylów dostarczane przez pakiet zachowują prefiks `instui`.

## Podstawa

`base.css` to reset do załączenia, który ustawia globalne domyślne dokumentu z tokenów: `box-sizing`, reset `body`,
powierzchnię strony, bazowy kolor i font tekstu, `color-scheme` (aby tokeny `light-dark()` i natywne kontrolki śledziły motyw), oraz bazowy link. Załaduj go raz, przed arkuszami komponentów i prose,
gdy pantoken zarządza stroną.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Pomiń go, gdy osadzasz komponenty w hoście, który już nadaje własny motyw dla `html` i `body` —
reset maluje powierzchnię strony, więc nie chcesz, żeby walczył z hostem. Wszystko, co ustawia, używa
niskospecyficznych selektorów `:where()`, więc własne reguły zawsze wygrywają.

`base.css` _stosuje_ font marki (`font-family: var(--instui-font-family-base)`, z systemowymi
fallbackami); aby _załadować_ go, zaimportuj opcjonalny `fonts.css` — `@font-face` reguły dla Atkinson Hyperlegible
Next, wskazujące na woff2 zawarte w pakiecie. Jest oddzielny, ponieważ fonty zajmują ~350 kB i
self-hosting fontów to świadomy wybór.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Zawartość dla czytników ekranu

<p>Po tym zdaniu jest ukryta wiadomość.<span class="instui-screen-reader-content">Tylko czytniki ekranu ją ogłaszają.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ukrywa element wizualnie, zachowując go w drzewie dostępności
— dla etykiet i tekstu statusu, które technologie asystujące powinny czytać, ale projekt nie powinien pokazywać.

## Narzędzia użytkowe

`utilities.css` to opcjonalna warstwa klas przekrojowych: prymityw `View`, odstępy ze skali tokenów, oraz semantyczne nadpisania kolorów. W przeciwieństwie do klas komponentów `-modifier`, te używają **podwójnego
myślnika** (`--mod`), dzięki czemu nigdy nie kolidują z nazwami modyfikatorów komponentu i stosują się do dowolnego
elementu — gołego, lub złożonego na komponencie.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Powierzchnia accent-blue z tekstem on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Wyśrodkowane z mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` to `View` InstUI. To baza, na którą nakładasz odstępy i kolory, i
zawiera modyfikatory klucz-wartość dla własnych właściwości wizualnych, więc nie musisz sięgać po narzędzia:
`-background-*` (jego powierzchnie), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, oraz `-cursor-*` — to są jedno-dashowe
modyfikatory `view` samego komponentu, niezwiązane z podwójno-dashowymi narzędziami poniżej. Właściwości o dowolnej wartości
(szerokość/wysokość/wstawienie) pozostają stylami inline; `margin`/`padding` używają narzędzi odstępów.

**Odstępy** — klasy per-strona na skali odstępów. Czytaj je jako `{m|p}{side}-{step}`: `m` dla
marginesu lub `p` dla paddingu (lub pełne słowa `margin`/`padding`), opcjonalna logiczna strona, a następnie krok. Tak więc `.--m-lg` i `.--margin-lg` są takie same, podobnie jak `.--pt-md` i `.--paddingt-md`.

- Strony: none (wszystkie), `t`/`b` (początek/koniec bloku), `s`/`e` (początek/koniec inline), `x`/`y` (oś inline/block).
  Logiczne strony pozostają poprawne w układach od prawej do lewej.
- Kroki: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` tylko dla marginesu.

Skomponuj je dla skrótu `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Kolor** — semantyczne nadpisania, które pozostają w palecie: `.--bg-<name>` (tło),
`.--text-<name>` (kolor tekstu) i `.--border-<name>` (kolor obramowania). Każdy `<name>` to
semantyczny token koloru — intencje (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus paleta `accent-*` (`accent-blue`, `accent-green` i tak dalej). Nazwa istnieje tylko wtedy, gdy token występuje w tej rodzinie, więc `text-brand` nie jest klasą — tekst nie ma
tokenu marki. Nie ma sposobu, by sięgnąć do prymitywu lub dowolnego hexa, i każde nadpisanie podąża
za motywem.

**Rodziny tokenów** — każda rodzina "jeden token, jedna właściwość" ma klasę na token, nazwaną według tokenu. Komponuj je dowolnie:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (i `-depth1`…`-card`) → `box-shadow`

Każda ustawia tylko swoją pojedynczą właściwość, więc `border-width`/`border-radius` potrzebują `border-*` koloru i stylu obramowania, aby faktycznie narysować ramkę. Te używają pełnej nazwy tokenu (`.--border-radius-md`), podczas gdy pomocniki kolorów i odstępów powyżej używają krótkich aliasów (`.--bg-brand`, `.--mt-lg`) — aliasy to ergonomiczne skróty; klasy tokenów są literalne i wyczerpujące.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) i `.--text-align-<value>` (`start`, `center`, `end`, `justify`) obejmują przekrojowe właściwości `display` i `textAlign` InstUI (View, Button, Metric, Tabs, …) jako kompozycyjne klasy —
więc nie są to modyfikatory per-komponent.

Każda klasa z podwójnym myślnikiem wygrywa kaskadę deterministycznie nad jednorazowym modyfikatorem komponentu o tej samej nazwie, niezależnie od kolejności importu arkuszy stylów — zobacz [Konwencje autorowania](/conventions/authoring)
dla mechanizmu.

Wszystko tutaj to czyste CSS napędzane tokenami `--instui-*`, więc śledzi InstUI przez warstwę tokenów. Zobacz [referencję API](/api/) dla `componentsCss` i builderów per-komponentu.

## Nakładki: dialog i popover

Komponenty nakładkowe używają natywnych prymityw platformy, więc zachowują się dostępnie przy minimalnym lub żadnym
JavaScripcie.

**Modal** — nałóż `.instui-modal` na natywny `<dialog>`. Otrzymuje to pułapkę fokusu, zamykanie przez `Esc` i
`::backdrop` za darmo; tło jest przyciemnione tym samym tokenem `--instui-component-mask-background-color`
co `.instui-mask` (dodaj `-blur` aby zmatowić). Otwieraj i zamykaj za pomocą poleceń invokera — bez skryptu:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — nałóż `.instui-context-view` na element `[popover]` i przełączaj go za pomocą
`popovertarget`. Jest na najwyższej warstwie i zamyka się przy kliknięciu poza (light-dismiss) lub `Esc`, znów bez skryptu:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Szablon Drawer** — nałóż `.instui-drawer-layout` na korzeń layoutu z dziećmi `.tray` i `.content`.
Dodaj atrybut `open` (lub `-open`), aby odsłonić tacę, i użyj `placement="end"`
(lub `-placement-end`) aby zadokować ją po stronie końca inline — pozycjonowanie rozwiązuje się przez logiczne
właściwości `inset-inline-*`/`flex-direction`, więc automatycznie się odwraca pod `dir="rtl"` bez
dodatkowych reguł. Pakiet interakcji skupienia dodaje routowanie poleceń Invoker i przełącza tryb nakładki
(`should-overlay-tray`) gdy szerokość przekracza `--drawer-layout-min-width` (domyślnie
`--instui-breakpoints-sm`, potem `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` pozostaje dla nakładek w przepływie (spinner nad kartą); `::backdrop`
modalnego przypadku pokrywa przypadek modalny.

Oba wzory są także opakowane jako behawioralne elementy niestandardowe w `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` napędzany przez jego atrybut `open`) i `<instui-context-view>` (natywny popover).

Wsparcie przeglądarek: API popover i `popovertarget` są Baseline 2024; polecenia invokera
(`command`/`commandfor`) są Baseline 2025, więc w starszych przeglądarkach powiąż przyciski z `dialog.showModal()`
jako jednoliniowy fallback. Pozycjonowanie popovera obok jego wyzwalacza używa kotwicowania CSS tam, gdzie obsługiwane (Chromium); w innych miejscach centruje się w najwyższej warstwie.

## Formularze

**FormField** — `.instui-form-field` to wrapper CSS-Grid układający etykietę, kontrolkę i wszelkie
wiadomości. Nałóż go na `<label>`, aby etykieta natywnie była powiązana z kontrolką. Ma trzy obszary siatki — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (domyślnie) stosuje obszary pionowo; `-layout-inline` umieszcza etykietę obok kontrolki (dostrój
przez `-label-align-{start,end}` i `-v-align-{top,middle,bottom}`). `-readonly` zmienia kolor etykiety.

**Gwiazdka wymagania** pojawia się, gdy pole jest wymagane przez _albo_ klasę `-required` _albo_ natywną kontrolkę `required` wewnątrz — więc możesz po prostu ustawić `required` na inpucie, a znacznik się pojawi.
Jest dekoracyjna ( `::after` na etykiecie, poza drzewem dostępności); sparuj ją z informacją typu
"pola oznaczone \* są wymagane", chyba że formularz jest oczywisty.

**FormFieldGroup** — `.instui-form-field-group` grupuje powiązane pola w `<fieldset>` z opisem `<legend>`. To czysty layout (bez dedykowanych tokenów): domyślnie stosuje pola;
`-layout-columns` / `-layout-inline` przepływają je do responsywnych kolumn, z `-row-spacing-*` /
`-col-spacing-*` i `-v-align-*` do strojenia siatki.

**RadioInputGroup** — `.instui-radio-input-group` to ten sam `<fieldset>`/`<legend>` grouping,
specjalizowany dla radio. Ponieważ child radio dzielą `name`, selekcja jest natywnie jednokrotna —
więc zestaw przycisków przełączających zachowuje się jak jedno sterowanie, nie luźne przyciski. `-variant-simple` (domyślnie) układa
standardowe radio (`-layout-columns`/`-inline` przepływają je w wiersz); `-variant-toggle` łączy
child `.instui-radio.-variant-toggle` przyciski w pojedynczy sksegmentowany kontroler (złączone obramowania,
zaokrąglone zewnętrzne końce):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Wiadomości** — `.instui-form-field-messages` to kontener; każda `.instui-form-field-message` przyjmuje
`-type-*`: `-type-hint` (szary, domyślnie), `-type-error` (czerwony tekst + glif alertu w kółku), `-type-success`
(zielony tekst + glif check w kółku), i `-type-screenreader-only` (wizualnie obcięte, nadal ogłaszane).
Glify malowane są w `currentColor`, więc zawsze pasują do koloru wiadomości. `-type-new-error` to
przestarzały alias `-type-error`. Podłącz kontener do kontrolki przez `aria-describedby`, i ustaw
`aria-invalid` na kontrolce gdy wystąpi błąd.

Wewnątrz FormField, `-type-error` wiadomość następuje po walidacji po stronie klienta: pozostaje ukryta aż kontrolka
pola stanie się `:user-invalid` (natywne, po interakcji użytkownika) — lub wymuś ją przez `-invalid`
na `.instui-form-field` (dla błędu po stronie serwera). Samodzielna `.instui-form-field-messages` (poza polem) nie jest dotknięta. Pierścień fokusu kontrolki zachowuje się odpowiednio: niebezpieczeństwo przy `:user-invalid`/`-invalid`,
sukces przy `-success`.

**Kontrolki tekstowe** — `.instui-text-input` (natywne `<input>`), `.instui-text-area` (natywne `<textarea>`,
zmienialne rozmiarowo), i `.instui-simple-select` (natywne `<select>` z kursorem) dzielą wygląd i te same
stany: `-invalid` (obramowanie błędu), `-success` (obramowanie sukcesu), `-readonly`, natywne `:disabled`, oraz
`-size-{sm,md,lg}`. Dla ikony przed/po (InstUI `renderBeforeInput`/`renderAfterInput`), opakuj
input w `.instui-input-group` i dodaj slot `.before`/`.after` (glif `-icon-*`); `-should-not-wrap`
utrzymuje go w jednej linii. `.instui-number-input` to ta fasada plus kolumna spinnera +/- `.arrows` (natywne
`type="number"`; powiąż przyciski z `stepUp()`/`stepDown()`). `.instui-range-input` to ostylowany
`input[type="range"]`, którego wartość renderuje się w `.instui-range-input-value` odwrotnej bańce. Dla bogatego
comboboxa z listbox popover, wybierz `@instructure/ui` — ta biblioteka obejmuje natywne kontrolki.

**Ostylowany select (eksperymentalny)** — opcjonalny `select.css` ulepsza ten _sam_
element `.instui-simple-select`: styluje otwarty dropdown (panel i każdą opcję, z hover i stanami wybranego) używając modelu CSS Customizable Select.

> [!WARNING]
> `select.css` polega na `appearance: base-select` / `::picker(select)`, które są **eksperymentalne**
> (Chrome 135+, jeszcze nie Baseline). Jest dostarczane jako oddzielny arkusz opcjonalny i każda reguła jest objęta
> warunkiem `@supports (appearance: base-select)`, więc nic nie robi w przeglądarkach nieobsługujących — kontrolka
> `.instui-simple-select` po prostu pozostaje zwykłym natywnym selectem. Załaduj ją tylko jeśli chcesz
> ulepszonego dropdowna i akceptujesz ograniczone wsparcie.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
