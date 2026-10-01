# Plugins

Ein pantoken-Plugin erweitert die Token- oder CSS-Ausgabe, ohne ein Paket zu forken. Es wird mit
`definePlugin` aus `@pantoken/plugin-kit` erstellt und dann an `buildTokens` oder `toCss` übergeben.

## Ein Plugin erstellen

Gib `definePlugin` die Hooks, die du implementierst. Es gibt ein normales Plugin zurück, gebrandet mit den
Fähigkeiten, die aus diesen Hooks abgeleitet wurden. Ein Plugin kann das IR erweitern (`tokens`, `icons`), die CSS-
Ausgabe (`css`) oder beides.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Fähigkeitsbewusste Registrierung

`buildTokens` und `toCss` führen `checkPlugins` über die übergebenen Plugins aus. Es warnt — es wirft nie —
wenn ein Plugin keinen passenden Hook für die Phase hat, in der es registriert wurde; ein nur-Token-Plugin, das
an `toCss` übergeben wird, wird mit einer Notiz übersprungen, statt stillschweigend nichts zu tun.

## Plugins zusammensetzen

Auf einem anderen Plugin mit `extendPlugin` aufbauen oder Peers mit `mergePlugin` kombinieren:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks derselben Phase lassen sich komponieren: `tokens` führt zuerst die Basis und dann die Ergänzung aus, `css` mergen die beiden
Beiträge, und `icons` führt beide aus.

## Die Ausgabe deines Plugins validieren

Führe die gemeinsamen Drift-Checks aus `@pantoken/utils` über die Ausgabe deines Plugins in dessen Test aus, sodass ein
Tippfehler oder ein umbenanntes Token schnell und lokal fehlschlägt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Die mitgelieferten Plugins

- `@pantoken/plugin-simple-icons` — brandet Icons von simple-icons, registriert als Icon-Tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab Icons, registriert als `--instui-icon-*` Image-Tokens.
- `@pantoken/plugin-logos` — Instructure-Produktlogos als SVGs, Data-URIs und `--instui-logo-*`
  Image-Tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-Plugin (kein pantoken-Plugin), das ungenutzte Custom Properties aus einem Stylesheet entfernt.
- `@pantoken/plugin-custom-theme-colors` — rebrandet eine Seite, indem es ein Attribut
  (`data-pantoken-color`) auf eine der 13 Paletten setzt oder auf `custom` für beliebige Brand-Hexwerte. Siehe
  [Theme colors](#theme-colors).
- `@pantoken/plugin-custom-components` — token-gestützte Custom Controls einschließlich SegmentedControl
  und SkeletonLoader.

### Segmented Control

Verwende ein Segmented Control für zwei bis fünf verwandte Ansichten oder Filter. Jede Option ist ein beschriftetes natives
Radio in einer benannten Gruppe; markiere eines davon initial als checked. Verwende Tabs oder ein Dropdown, wenn die Optionen nicht bequem passen,
und benutze Button-Gruppen für Aktionen statt für Auswahlmöglichkeiten. Der `-size-md`-Stil ist der
Standard, mit `-size-sm` und `-size-lg` für engere bzw. prominentere Kontexte.

Importiere `@pantoken/plugin-custom-components/segmented-control.css` für das Control und seine Overflow-
Buttons. Verwende eine `-icon-*`-Klasse auf einem Segment-Label, wenn das Segment ein Glyph braucht; der Interaktions-
Helper fördert außerdem eine `-icon-*`-Klasse vom nativen Input zum Label-Painter. Gib dem Fieldset eine beschreibende `aria-label` oder eine sichtbare Legende. Der Helper bewahrt die native
Radio-Ankündigung, ergänzt Tastatur-Navigation und zeigt optional bei jedem Pfeiltastendruck ein abgeschnittenes Segment an. Verwende logische Start/End-Kontrollen und zugängliche Button-Beschriftungen in beiden Richtungen:

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

Importiere `@pantoken/interactions/segmented-control.iife.js` für die DOM-bereite Registrierung, oder rufe
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` von `@pantoken/interactions`
auf und rufe `cleanup()` beim Entfernen auf. Das CSS und die nativen Radio-Optionen funktionieren ohne JS; Overflow-
Pfeile benötigen das Verhalten. Das ausgewählte Element verwendet den zweilagigen Design-Schatten aus den semantischen
Drop-Shadow-Farben; es ist ein eigenständiger Active-Item-Schatten statt eines vorhandenen
`--instui-elevation-*`-Kompositums. Overflow-Buttons verwenden die upstream elevation3 Component Tokens
durch `--pantoken-segmented-overflow-shadow`.

### Skeleton Loading

Der `skeleton-loader.css`-Subpfad stylt eine dekorative Text-, Avatar- oder Image-Form. Text akzeptiert
`-size-xxs` bis `-size-xxl`; Avatar und Image sind mittelgroß. Jede optionale `.skeleton-row`
fügt eine Textzeile hinzu, ohne die Größe zu ändern. Das CSS-Shimmer stoppt nach drei 1,5‑sekündigen Durchläufen und
bleibt statisch, wenn der Nutzer reduzierte Bewegung bevorzugt. Es funktioniert bereits vor dem Laden von JavaScript.

Platziere Shapes nur dort, wo inhaltsabhängiger Content erscheinen wird, nicht über serverbekannter Navigation,
Filtern, Überschriften oder Kontrollen. Ein Skeleton ist kein Fortschrittsmesser oder ein Busy-Zustand für Aktionen. Halte
bestehenden Inhalt während Hintergrund-Refreshes sichtbar; verwende einen Spinner oder einen Button‑Busy‑State für Aktionen.

Die Parent-Anwendung besitzt das Markup für loading, loaded, empty und error. Stelle pro Seite einen leeren Statusbereich
und ein separates leeres Alert im Server-HTML bereit, beide **außerhalb** des Busy-Content-Bereichs:

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

Rufe das parent-level Verhalten auf, wenn sich der Request-Status ändert. Es aktualisiert `aria-busy` und die beiden
vorhandenen Ansagen, ersetzt jedoch niemals Inhalte oder verschiebt den Fokus:

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

Wenn das per-Komponente Interactions-Bundle statt des direkten Imports verwendet wird, dispatch eine
`pantoken:skeleton-state`-Event auf dem `[data-skeleton-region]`-Element mit
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Verzögere das _Anzeigen_ von Platzhaltern um 200–500 ms bei schnellen Anfragen; das Verhalten verzögert die Lade-
Ansage unabhängig um 400 ms. Bei passiven Seitenladevorgängen den Fokus belassen. Verschiebe den Fokus nur dann auf ein neu geladenes Ergebnis, wenn die Aktion vom Benutzer selbst angefordert wurde. Der Status-Knoten kündigt Ergebnisse und leere
Zustände an; der Alert-Knoten meldet Fehler. Kombiniere nicht `aria-busy`, `role="status"` und
`role="alert"` auf einem Element.

Das Lucide Lab-Registry kann lazy geladen und anschließend an den synchronen Token-Hook übergeben werden:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Einige Dinge, die früher Plugins waren, werden jetzt in `@pantoken/components` ausgeliefert, da so viele Komponenten sie standardmäßig benötigen: Elevation-Shadows (`--instui-elevation-*`, in `components.css`), der Focus-Outline-Ring (in `base.css` — jeder Fokusierbare erhält ihn, wenn pantoken die Seite kontrolliert), und die Instructure Brand-Fonts (Atkinson Hyperlegible Next: `base.css` wendet `--instui-font-family-base` an; das opt-in
`@pantoken/components/fonts.css` lädt die `@font-face` woff2s).

## Theme-Farben {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emittiert einen `[data-pantoken-color="…"]`-Block pro Palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Jeder Block zeigt die Brand-Primitiven (`--instui-primitive-color-navy-*` und `-blue-*`)
auf die gewählte Palette. Er leitet außerdem die Brand‑Surfaces neu ab, die upstream zu literal Hex abgeflacht worden waren,
und bewahrt deren gebackene Alpha-Werte durch `color-mix()`. Semantische Statusfarben, explizite blaue Akzente und
Elevation-Shadows bleiben bestehen. Probiere es in der
[swatch-basierten Theming-Demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Benutzerdefinierte Brand-Farbe

Setze `data-pantoken-color="custom"`, um von einem beliebigen Hex zu rebranden, z. B. die Primärfarbe, die ein Canvas-Admin
im Theme Editor eingibt. pantoken leitet daraus eine vollständige 10–200 `--instui-primitive-color-custom-*`
Skala ab:

1. **Referenzkurve.** Das Ziel‑Lightness jedes Schrittes ist der durchschnittliche OKLCH‑Lightness-Wert der 13
   Paletten an diesem Schritt, mit 0 fix auf Weiß und 210 auf Schwarz. Somit entspricht der Abstand der benutzerdefinierten Skala
   dem der ausgelieferten Paletten.
2. **Anker.** Der Input landet auf dem Schritt, dessen Ziel‑Lightness seiner eigenen am nächsten ist, und snapt dann auf
   genau diese Lightness. `#cccccc` wird zu `custom-40` bei `#c9c9c9`: nahe am Input, aber nicht
   immer identisch. „Nächster“ bedeutet nächster Schritt auf der Kurve, nicht die nächstgelegene Farbe einer bestehenden Palette.
3. **Auffüllen.** Jeder andere Schritt behält die Input‑Farbe im Farbton bei. Seine Sättigung folgt der durchschnittlichen
   Sättigungs‑Kurve der Paletten relativ zum Anker und wird nur reduziert, wenn eine Farbe außerhalb des sRGB‑Gamut fällt.

Nur `#rgb` und `#rrggbb` werden akzeptiert; alles andere wirft eine `TypeError`, sodass ein Hexwert aus einem Formular kein CSS injizieren kann.

Zur Build‑Zeit emittiere die komplette Regel mit den bereits deklarierten abgeleiteten Primitiven:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Um die Farbe zur Laufzeit ohne Versand des Token-Sets auszuwählen, präcompute die Kurve und die Remap-Regel zur Build‑Zeit. Verwende dann den dependenzfreien `/scale`-Entry im Browser und setze nur die 20
abgeleiteten Primitiven:

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

Der Theme-Picker der Doku‑Site, der Canvas Theme Editor und die obige Demo funktionieren alle auf diese Weise.

Siehe das [API-Reference](/api/) für die Exports jedes Plugins.
