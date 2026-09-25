# Wtyczki

Wtyczka pantoken rozszerza wyjście tokenów lub CSS bez forka pakietu. Tworzy się ją za pomocą
`definePlugin` z `@pantoken/plugin-kit`, a następnie przekazuje do `buildTokens` lub `toCss`.

## Tworzenie wtyczki

Podaj `definePlugin` haki, które implementujesz. Zwróci ona normalną wtyczkę, oznaczoną
możliwościami wywnioskowanymi z tych haków. Wtyczka może rozszerzać IR (`tokens`, `icons`), wyjście CSS (`css`), lub oba.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rejestracja z uwzględnieniem możliwości

`buildTokens` i `toCss` uruchamiają `checkPlugins` nad przekazanymi wtyczkami. Ostrzega — nigdy nie rzuca błędem — gdy wtyczka nie ma pasującego haka dla etapu, w którym jest rejestrowana, więc wtyczka tylko-tokenowa przekazana do `toCss` zostanie pominięta z notatką zamiast cicho nie robić nic.

## Komponowanie wtyczek

Buduj na bazie innej wtyczki za pomocą `extendPlugin`, lub łącz peerów z `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Haki tego samego etapu się komponują: `tokens` uruchamia bazę, potem dodatek; `css` scala dwa wkłady; a `icons` uruchamia oba.

## Waliduj wyjście wtyczki

Uruchom wspólne kontrole dryfu z `@pantoken/utils` nad wyjściem twojej wtyczki w jej teście, żeby literówka lub zmieniona nazwa tokena powodowały szybkie, lokalne błędy:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dołączone wtyczki

- `@pantoken/plugin-simple-icons` — ikony brandowe ze simple-icons, zarejestrowane jako tokeny ikon.
- `@pantoken/plugin-lucide-lab` — ikony Lucide Lab, zarejestrowane jako `--instui-icon-*` tokeny obrazów.
- `@pantoken/plugin-logos` — logotypy produktów Instructure jako SVGy, URI danych oraz `--instui-logo-*`
  tokeny obrazów.
- `@pantoken/plugin-prune-custom-props` — wtyczka PostCSS (nie wtyczka pantoken), która usuwa
  nieużywane własne właściwości z arkusza stylów.
- `@pantoken/plugin-custom-theme-colors` — zmienia branding strony ustawiając atrybut
  (`data-pantoken-color`) na jedną z 13 palet, lub na `custom` dla dowolnego hexa marki. Zobacz
  [Kolory motywu](#theme-colors).

Rejestr Lucide Lab można ładować leniwie, a następnie przekazać do synchronicznego haka tokenów:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kilka rzeczy, które kiedyś były wtyczkami, teraz wysyłane są w `@pantoken/components`, ponieważ wiele komponentów potrzebuje ich domyślnie: cienie elewacji (`--instui-elevation-*`, w `components.css`), obwódka focus-outline
(in w `base.css` — każdy element fokusowalny ją otrzymuje, gdy pantoken kontroluje stronę), oraz fonty marki Instructure (Atkinson Hyperlegible Next: `base.css` stosuje `--instui-font-family-base`; opcjonalny `@pantoken/components/fonts.css` ładuje `@font-face` woff2s).

## Kolory motywu {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emituje jeden blok `[data-pantoken-color="…"]` na paletę
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Każdy blok kieruje prymitywy marki (`--instui-primitive-color-navy-*` i `-blue-*`)
na wybraną paletę. Również ponownie wyprowadza powierzchnie marki, które upstream wypłaszczył do literału hex,
zachowując ich zintegrowaną alfę przez `color-mix()`. Semantyczne kolory statusu, jawne niebieskie akcenty i
cienie elewacji pozostają bez zmian. Wypróbuj w
[demo tematyzacji opartej na próbkach kolorów](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Niestandardowy kolor marki

Ustaw `data-pantoken-color="custom"`, aby zmienić branding z dowolnego hexa, na przykład podstawowego koloru wpisywanego przez administratora Canvas
w Edytorze Motywu. pantoken wyprowadza z niego pełną skalę 10–200 `--instui-primitive-color-custom-*`:

1. **Krzywa odniesienia.** Docelowa jasność każdego kroku to średnia jasność OKLCH 13
   palet dla tego kroku, z 0 ustalonym jako biały i 210 jako czarny. Dzięki temu odstępy w niestandardowej skali
   odpowiadają odstępom w dołączonych paletach.
2. **Kotwica.** Wejście ląduje na kroku, którego docelowa jasność jest najbliższa jego własnej, a następnie przyciąga się do
   tej dokładnej jasności. `#cccccc` staje się `custom-40` na `#c9c9c9`: bliskie wejściu, ale nie
   zawsze identyczne. "Najbliższe" oznacza najbliższy krok na krzywej, nie najbliższy istniejący kolor palety.
3. **Wypełnienie.** Każdy inny krok zachowuje odcień wejścia. Jego nasycenie podąża za średnią krzywą nasycenia palet względem kotwicy i jest zmniejszane tylko tam, gdzie kolor wychodzi poza sRGB.

Akceptowane są tylko `#rgb` i `#rrggbb`; cokolwiek innego rzuca `TypeError`, więc hex z formularza
nie może wstrzyknąć CSS.

W czasie budowania, wyemituj całe reguły z już zadeklarowanymi pochodnymi prymitywami:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Aby wybrać kolor w czasie wykonywania bez wysyłania zestawu tokenów, preoblicz krzywą i regułę mapowania
w czasie budowania. Następnie użyj niezależnego od zależności wejścia `/scale` w przeglądarce i ustaw tylko 20
wyprowadzonych prymitywów:

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

Picker motywu na stronie dokumentacji, edytor motywu Canvas i powyższe demo działają w ten sposób.

Zobacz [Dokumentację API](/api/) dla eksportów każdej wtyczki.
