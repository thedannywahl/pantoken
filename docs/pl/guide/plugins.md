# Wtyczki

Wtyczka pantoken rozszerza wyjście tokenów lub CSS bez forkowania pakietu. Tworzy się ją za pomocą
`definePlugin` z `@pantoken/plugin-kit`, a następnie przekazuje do `buildTokens` lub `toCss`.

## Tworzenie wtyczki

Przekaż `definePlugin` haki, które implementujesz. Zwraca ona zwykłą wtyczkę, oznaczoną
zdolnościami wywnioskowanymi z tych haków. Wtyczka może rozszerzać IR (`tokens`, `icons`), wyjście CSS
(`css`), lub oba.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rejestracja świadoma możliwości

`buildTokens` i `toCss` uruchamiają `checkPlugins` nad wtyczkami, które przekażesz. Ostrzega — nigdy nie rzuca wyjątku —
gdy wtyczka nie ma pasującego haka dla etapu, w którym jest rejestrowana, więc wtyczka tylko z tokenami przekazana
do `toCss` zostanie pominięta z notatką zamiast cicho nic nie robić.

## Łączenie wtyczek

Buduj na bazie innej wtyczki za pomocą `extendPlugin`, lub łącz równorzędne za pomocą `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Haki tego samego etapu się komponują: `tokens` uruchamia najpierw bazę, potem dodatek, `css` łączy dwa
wkłady, a `icons` uruchamia oba.

## Walidacja wyjścia wtyczki

Uruchom współdzielone kontrole dryfu z `@pantoken/utils` nad wyjściem swojej wtyczki w jej teście, aby
literówka lub zmieniona nazwa tokenu powodowały szybki, lokalny błąd:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dołączone wtyczki

- `@pantoken/plugin-simple-icons` — brandowe ikony z simple-icons, zarejestrowane jako tokeny ikon.
- `@pantoken/plugin-lucide-lab` — ikony Lucide Lab, zarejestrowane jako `--instui-icon-*` tokeny obrazów.
- `@pantoken/plugin-logos` — logotypy produktów Instructure jako SVG, data URI i `--instui-logo-*`
  tokeny obrazów.
- `@pantoken/plugin-prune-custom-props` — wtyczka PostCSS (nie wtyczka pantoken), która usuwa
  nieużywane właściwości niestandardowe ze arkusza stylów.

Rejestr Lucide Lab można załadować leniwie, a następnie przekazać do synchronicznego haka tokenów:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kilka rzeczy, które kiedyś były wtyczkami, teraz są dołączone w `@pantoken/components`, ponieważ tak wiele komponentów potrzebuje
ich od razu: cienie elewacji (`--instui-elevation-*`, w `components.css`), pierścień focus-outline
(w `base.css` — każdy element fokusowalny go otrzymuje, gdy pantoken kontroluje stronę), oraz czcionki brandowe Instructure
(Atkinson Hyperlegible Next: `base.css` stosuje `--instui-font-family-base`; opcjonalne
`@pantoken/components/fonts.css` ładuje pliki `@font-face` w formacie woff2).

Zobacz [referencję API](/api/) dla eksportów każdej wtyczki.
