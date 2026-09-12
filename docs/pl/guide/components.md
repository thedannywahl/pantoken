# Komponenty

`@pantoken/components` dostarcza style komponentów oparte na klasach zbudowane z tokenów Instructure. Zaimportuj arkusz stylów i oznacz swoją strukturę HTML — bez potrzeby używania frameworka.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Preferujesz elementy niestandardowe? `@pantoken/web-components` opakowuje te same style jako `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` i więcej — zobacz
> [mapę pakietów](/api/).

## Konwencje

Konwencje CSS w tym pakiecie opierają się na zmodyfikowanej wersji [RSCSS](https://ricostacruz.com/rscss/index.html).

Modyfikatory są **klucz-wartość** — `-<prop>-<val>`, zgodne z nazwami właściwości InstUI — więc czytają się same:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Właściwości typu boolean są
samą nazwą właściwości; obecność oznacza `true` (`-has-shadow`, `-clickable`); boolean o domyślnie włączonym stanie,
wyłączony, jest odwrócony (`-without-background`, `-without-border`). Rozmiary akceptują skrócone i pełne
nazwy (`-size-sm` = `-size-small`). Gdy nazwa odbiega od InstUI, semantyczna klasa InstUI nadal działa
ale jest przestarzała (np. `-variant-info` → użyj `-color-info`).

### Przykład

Komponent React z Instructure UI:

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

Dla właściwości `timeout` InstUI ustaw jednostkową własność niestandardową `--timeout` w milisekundach i załaduj
interakcję Alert. Wartość dodatnia planuje zamknięcie; `0` (domyślnie) pozostawia alert na
miejscu. Dodaj klasy `instui-transition -fade-entered` narzędzia `transition` dla efektu zanikania InstUI; pomiń
je dla natychmiastowego usunięcia. Interakcja steruje stanem `-fade-exiting` i wyzwala anulowalne,
bąbelkowe zdarzenie `dismiss` przed usunięciem, więc aplikacja może wywołać `preventDefault()`, aby
utrzymać alert zamontowany.

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
(`100` domyślnie), z przestarzałymi aliasami `--value-now` i `--value-max`. Dodaj `-should-animate`,
aby zastosować półsekundowe przejście InstUI przy zmianie wartości. `.value` współistnieje z `.bar` jako
dziecko korzenia; dodaj `-render-value-inside`, aby wyrenderować je nad torem, wyrównane do jego początku,
zamiast tego (ostyluj dla czytelności względem koloru miernika). Użyj natywnego `<progress>` dla
zakresu zaczynającego się od zera i `<meter>`, gdy minimum jest różne od zera; web-komponenty wybierają między nimi
automatycznie na podstawie atrybutu `min`. InstUI nie ma stanu „nieokreślony”, więc `<progress>`
bez atrybutu `value` to jedynie najlepsze przypuszczenie pantoken: `progress-bar` animuje `.bar` jako
przesuwający się segment, a `progress-circle` obraca pierścień na stałym łuku, oba ukrywając `.value`.

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
załaduj pakiet interakcji focused, aby odtworzyć animację montowania InstUI; `--animation-delay` to
bezjednostkowe opóźnienie w milisekundach. Przestarzałe zapisy `-should-animate-on-mount` i
`-shold-animate-on-mount` pozostają aliasami funkcyjnymi.

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

Każda klasa jest domyślnie w przestrzeni nazw `instui-`. Zbuduj arkusz stylów z własnym prefiksem — lub bez —
przekazując `prefix` do dowolnego generatora. Każda wartość fałszywa (`null`, `undefined`, `""` lub pominięcie)
usuwa prefiks całkowicie, więc możesz autorować `class="heading -level-h1"` zamiast `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modyfikatory z prefiksem kreski (`.-color-secondary`, `.-level-h1`) pozostają niezmienione w obu przypadkach. Arkusze stylów dostarczane przez pakiet zachowują prefiks `instui`.

## Podstawa

`base.css` to reset opt-in, który ustawia globalne domyślne dokumentu z tokenów: `box-sizing`,
reset `body`, powierzchnię strony, bazowy kolor tekstu i font, `color-scheme` (aby tokeny `light-dark()`
i natywne kontrolki śledziły motyw) oraz bazowy link. Załaduj go raz, przed arkuszami komponentów i prose,
gdy pantoken zarządza stroną.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Pomiń go, gdy osadzasz komponenty w hoście, który już nadaje własny motyw `html` i `body` —
reset maluje powierzchnię strony, więc nie chcesz, by walczył z hostem. Wszystko, co ustawia, używa
selektorów o niskiej specyficzności `:where()`, więc własne reguły zawsze wygrywają.

`base.css` _stosuje_ font brandowy (`font-family: var(--instui-font-family-base)`, z systemowymi
zapasami); aby _załadować_ go, zaimportuj opcjonalny `fonts.css` — `@font-face` reguły dla Atkinson Hyperlegible
Next, wskazujące na woff2 dołączone w pakiecie. Jest osobne, bo czcionki ważą ~350 kB i samohostowanie fontów to świadomy wybór.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Zawartość dla czytników ekranu

<p>Po tym zdaniu znajduje się ukryta wiadomość.<span class="instui-screen-reader-content">Tylko czytniki ekranu ją ogłaszają.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` wizualnie ukrywa element, jednocześnie utrzymując go w drzewie dostępności —
dla etykiet i tekstów statusu, które technologia wspomagająca powinna odczytać, ale projekt nie powinien pokazywać.

## Narzędzia pomocnicze

`utilities.css` to warstwa opt-in klas przekrojowych: prymityw `View`, odstępy wg skali tokenów
i semantyczne nadpisania kolorów. W przeciwieństwie do klas komponentów `-modifier`, te używają **podwójnego
myślnika** (`--mod`), aby nigdy nie kolidować z nazwami modyfikatorów komponentu, i stosują się do dowolnego
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
posiada modyfikatory klucz-wartość dla własnych właściwości wizualnych, więc nie trzeba sięgać po utility:
`-background-*` (jego powierzchnie), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` oraz `-cursor-*` — to
jednokreskowe modyfikatory `view`, niezwiązane z podwójnikowymi narzędziami poniżej. Wartości dowolne
(szerokość/wysokość/inset) pozostają stylem inline; `margin`/`padding` używają narzędzi odstępów.

**Odstępy** — klasy per-strona na skali odstępów. Czytaj je jako `{m|p}{side}-{step}`: `m` dla
marginesu lub `p` dla paddingu (lub pełne słowa `margin`/`padding`), opcjonalna logiczna strona, a następnie
stopień. Zatem `.--m-lg` i `.--margin-lg` są takie same, podobnie jak `.--pt-md` i `.--paddingt-md`.

- Strony: none (wszystkie), `t`/`b` (początek/koniec bloku), `s`/`e` (początek/koniec inline), `x`/`y` (oś inline/blok).
  Logiczne strony pozostają poprawne w układach RTL.
- Stopnie: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, oraz `auto` tylko dla marginesu.

Komponuj je dla skrótu `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Kolor** — semantyczne nadpisania pozostające w palecie: `.--bg-<name>` (tło),
`.--text-<name>` (kolor tekstu) oraz `.--border-<name>` (kolor obramowania). Każde `<name>` to
semantyczny token koloru — intencje (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus paleta `accent-*` (`accent-blue`, `accent-green` i tak dalej). Nazwa istnieje tylko jeśli token istnieje w tej rodzinie, więc `text-brand` nie jest klasą — tekst nie ma tokena brandowego. Nie ma sposobu, by sięgnąć do prymitywu albo dowolnego hexa, i każde nadpisanie podąża za motywem.

**Rodziny tokenów** — każda rodzina „jeden token, jedna właściwość” ma klasę na token, nazwaną wg tokena. Komponuj je dowolnie:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (i `-depth1`…`-card`) → `box-shadow`

Każda ustawia tylko swoją jedną właściwość, więc `border-width`/`border-radius` potrzebują koloru `border-*` i stylu obramowania, aby faktycznie narysować ramkę. Te używają pełnej nazwy tokena (`.--border-radius-md`), podczas gdy pomocniki kolorów i odstępów powyżej używają skrótów (`.--bg-brand`, `.--mt-lg`) — aliasy są ergonomiczne; klasy tokenów są literalne i wyczerpujące.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) oraz `.--text-align-<value>` (`start`, `center`, `end`, `justify`) obejmują przekrojowe właściwości `display` i `textAlign` InstUI (View, Button, Metric, Tabs, …) jako komponowalne klasy —
więc nie są to modyfikatory przypisane do pojedynczych komponentów.

Każda klasa z podwójnym myślnikiem deterministycznie wygrywa w kaskadzie nad modyfikatorem komponentu o tej samej nazwie, niezależnie od kolejności importu arkuszy — zobacz [Authoring conventions](/conventions/authoring)
dla mechanizmu.

Wszystko tutaj jest czystym CSS sterowanym tokenami `--instui-*`, więc śledzi InstUI przez warstwę tokenów. Zobacz [referencję API](/api/) dla `componentsCss` i per-komponentowych generatorów.

## Nakładki: dialog i popover

Komponenty nakładkowe korzystają z natywnych prymitywów platformy, więc zachowują dostępność przy małej lub żadnej ilości
JavaScriptu.

**Modal** — umieść `.instui-modal` na natywnym `<dialog>`. Otrzymuje on blokowanie fokusu, zamykanie przez `Esc`
i `::backdrop` za darmo; tło jest przyciemnione tym samym tokenem `--instui-component-mask-background-color`
co `.instui-mask` (dodaj `-blur`, aby zrobić efekt frost). Otwieraj i zamykaj za pomocą komend invoker — bez skryptu:

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

**Context view / popover** — umieść `.instui-context-view` na elemencie `[popover]` i przełączaj go za pomocą
`popovertarget`. Jest na najwyższej warstwie i zamyka się przy kliknięciu poza lub `Esc`, również bez skryptu:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Układ drawer** — umieść `.instui-drawer-layout` na korzeniu layoutu z dziećmi `.tray` i `.content`.
Dodaj atrybut `open` (lub `-open`), aby odsłonić tacę, i użyj `placement="end"`
(lub `-placement-end`) aby zadokować ją po stronie inline-end — pozycjonowanie rozwiązuje się przez logiczne
właściwości `inset-inline-*`/`flex-direction`, więc flipuje automatycznie przy `dir="rtl"` bez dodatkowych reguł. Pakiet interakcji focused dodaje routowanie komend Invoker i przełącza tryb nakładki
(`should-overlay-tray`) gdy szerokość przekroczy `--drawer-layout-min-width` (domyślnie
`--instui-breakpoints-sm`, następnie `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` pozostaje dla nakładek w przepływie (spinner nad kartą); `::backdrop` modala
pokrywa przypadek modalny.

Oba wzorce są też opakowane jako behawioralne elementy niestandardowe w `@pantoken/web-components`:
`<instui-modal open>` ( `<dialog>` sterowany atrybutem `open`) i `<instui-context-view>` (nattywny popover).

Wsparcie przeglądarek: API popover i `popovertarget` to Baseline 2024; komendy invoker
(`command`/`commandfor`) to Baseline 2025, więc w starszych przeglądarkach podłącz przyciski do `dialog.showModal()`
jako jednowierszowy fallback. Pozycjonowanie popovera obok wyzwalacza używa kotwicowania CSS tam, gdzie jest wspierane (Chromium); gdzie indziej centruje je w najwyższej warstwie.

## Formularze

**FormField** — `.instui-form-field` to wrapper CSS-Grid rozmieszczający etykietę, kontrolkę i ewentualne
wiadomości. Umieść go na `<label>`, aby etykieta powiązała się z kontrolką natywnie. Ma trzy obszary grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (domyślnie) układa obszary w stos; `-layout-inline` umieszcza etykietę obok kontrolki (dostrój
przez `-label-align-{start,end}` i `-v-align-{top,middle,bottom}`). `-readonly` zmienia kolor etykiety.

**Asterisk wymagany** pojawia się, gdy pole jest wymagane przez _albo_ klasę `-required` _albo_ natywną kontrolkę `required` wewnątrz — więc możesz po prostu ustawić `required` na input i znacznik się pojawi.
Jest dekoracyjny ( `::after` na etykiecie, poza drzewem dostępności); sparuj go z notką typu
"pola oznaczone \* są obowiązkowe", jeśli formularz nie jest oczywisty.

**FormFieldGroup** — `.instui-form-field-group` grupuje powiązane pola w `<fieldset>` z opisem `<legend>`. To czysty layout (bez dedykowanych tokenów): domyślnie układa pola w stos;
`-layout-columns` / `-layout-inline` rozkłada je w responsywne kolumny, z `-row-spacing-*` /
`-col-spacing-*` i `-v-align-*` do dopasowania siatki.

**RadioInputGroup** — `.instui-radio-input-group` to ten sam grupujący wrapper `<fieldset>`/`<legend>`,
wyspecjalizowany dla radio. Ponieważ radio-dzieci dzielą `name`, wybór jest natywnie jednokrotny —
więc zestaw przycisków toggle zachowuje się jak jedna kontrolka, nie luźne przyciski. `-variant-simple` (domyślnie) układa
standardowe radio (`-layout-columns`/`-inline` rozkłada je w wiersz); `-variant-toggle` łączy
dziecięce przyciski `.instui-radio.-variant-toggle` w pojedynczą kontrolkę segmentowaną (złączone obramowania,
zaokrąglone końce zewnętrzne):

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

**Wiadomości** — `.instui-form-field-messages` to kontener; każde `.instui-form-field-message` ma `-type-*`: `-type-hint` (szare, domyślnie), `-type-error` (czerwony tekst + glif ostrzegawczy w kółku), `-type-success`
(zielony tekst + glif check w kółku) oraz `-type-screenreader-only` (wizualnie przycięte, nadal ogłaszane).
Glify malowane są w `currentColor`, więc zawsze pasują do koloru wiadomości. `-type-new-error` to
przestarzały alias `-type-error`. Podłącz kontener do kontrolki za pomocą `aria-describedby`, i ustaw
`aria-invalid` na kontrolce gdy jest błąd.

Wewnątrz FormField, `-type-error` wiadomość następuje po walidacji po stronie klienta: pozostaje ukryta aż kontrolka pola będzie `:user-invalid` (natywne, po interakcji użytkownika) — lub wymuś ją przez `-invalid`
na `.instui-form-field` (dla błędu serwera). Samodzielny `.instui-form-field-messages` (poza polem) nie jest tym dotknięty. Pierścień fokusu kontrolki zachowuje się odpowiednio: niebezpieczeństwo przy `:user-invalid`/`-invalid`,
sukces przy `-success`.

**Kontrolki tekstowe** — `.instui-text-input` (natywny `<input>`), `.instui-text-area` (natywny `<textarea>`,
możliwy do zmiany rozmiaru) oraz `.instui-simple-select` (natywny `<select>` z caretem) dzielą wspólny wygląd i te same
stany: `-invalid` (obramowanie błędu), `-success` (obramowanie sukcesu), `-readonly`, natywne `:disabled` oraz
`-size-{sm,md,lg}`. Dla ikony z przodu/tyłu (InstUI `renderBeforeInput`/`renderAfterInput`), owiń
input w `.instui-input-group` i dodaj slot `.before`/`.after` (glif `-icon-*`); `-should-not-wrap`
utrzymuje wszystko w jednej linii. `.instui-number-input` to fasada plus kolumna spinner +/- `.arrows` (natywny
`type="number"`; podłącz przyciski do `stepUp()`/`stepDown()`). `.instui-range-input` to ostylowany
`input[type="range"]`, którego wartość renderuje się w `.instui-range-input-value` jako bąbelek inwersyjny. Dla rozbudowanego
comboboxa z listbox-popover sięgnij po `@instructure/ui` — ta biblioteka obejmuje natywne kontrolki.

**Stylowany select (eksperymentalny)** — opcjonalny `select.css` ulepsza ten sam
element `.instui-simple-select`: styluje otwarty dropdown (panel i każdą opcję, z hover i stanami zaznaczenia) używając modelu CSS Customizable Select.

> [!WARNING]
> `select.css` opiera się na `appearance: base-select` / `::picker(select)`, które są **eksperymentalne**
> (Chrome 135+, jeszcze nie Baseline). Dostarczone jako osobny arkusz opt-in i każda reguła jest ograniczona
> przez `@supports (appearance: base-select)`, więc nic nie robi w przeglądarkach bez wsparcia — kontrolka
> `.instui-simple-select` pozostaje zwykłym natywnym selectem. Ładuj ją tylko jeśli chcesz
> ulepszonego dropdowna i akceptujesz ograniczone wsparcie.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
