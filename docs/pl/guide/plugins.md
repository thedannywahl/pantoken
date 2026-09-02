# Wtyczki

Wtyczka pantoken rozszerza dane tokenów lub wynik CSS bez forka pakietu. Tworzy się ją za pomocą
`definePlugin` z `@pantoken/plugin-kit`, a następnie przekazuje do `buildTokens` lub `toCss`.

## Tworzenie wtyczki

Podaj `definePlugin` haki, które implementujesz. Zwróci ona normalną wtyczkę, oznaczoną możliwościami wywnioskowanymi z tych haków. Wtyczka może rozszerzać IR (`tokens`, `icons`), wynik CSS (`css`), lub oba.

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

`buildTokens` i `toCss` uruchamiają `checkPlugins` dla przekazanych wtyczek. Ostrzega — nigdy nie rzuca wyjątku — gdy wtyczka nie ma pasującego haka dla etapu, w którym jest rejestrowana, więc wtyczka tylko z tokenami przekazana do `toCss` zostanie pominięta z notatką zamiast cichego braku działania.

## Komponowanie wtyczek

Rozszerzaj inną wtyczkę za pomocą `extendPlugin`, lub łącz równorzędne za pomocą `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Haki tego samego etapu się komponują: `tokens` uruchamia najpierw bazę, potem dodatek, `css` scala dwa wkłady, a `icons` uruchamia oba.

## Waliduj wynik swojej wtyczki

Uruchom współdzielone sprawdzenia dryfu z `@pantoken/utils` nad wynikiem twojej wtyczki w jej teście, żeby literówka lub przemianowana nazwa tokenu powodowały szybki, lokalny błąd:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dołączone wtyczki

- `@pantoken/plugin-simple-icons` — oznacza ikony z simple-icons jako tokeny ikon.
- `@pantoken/plugin-logos` — logotypy produktów Instructure jako SVG, data URI i `--instui-logo-*`
  tokeny obrazkowe.
- `@pantoken/plugin-prune-custom-props` — wtyczka PostCSS (nie wtyczka pantoken), która usuwa
  nieużywane custom properties ze stylów.

Kilka rzeczy, które kiedyś były wtyczkami, teraz są dostarczane w `@pantoken/components`, ponieważ wiele komponentów potrzebuje ich domyślnie: cienie elewacji (`--instui-elevation-*`, w `components.css`), pierścień obrysu fokusu (w `base.css` — każdy element fokusowalny go otrzymuje, gdy pantoken kontroluje stronę), oraz czcionki marki Instructure (Atkinson Hyperlegible Next: `base.css` stosuje `--instui-font-family-base`; opcjonalne `@pantoken/components/fonts.css` ładuje pliki `@font-face` w formacie woff2).

Zobacz [referencję API](/api/) dla eksportów każdej wtyczki.
