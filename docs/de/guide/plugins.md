# Plugins

Ein pantoken-Plugin erweitert die Token- oder CSS-Ausgabe, ohne ein Paket zu fork-en. Es wird mit `definePlugin` aus `@pantoken/plugin-kit` erstellt und dann an `buildTokens` oder `toCss` übergeben.

## Ein Plugin erstellen

Gib `definePlugin` die Hooks, die du implementierst. Es gibt ein normales Plugin zurück, das mit den aus diesen Hooks abgeleiteten Fähigkeiten gekennzeichnet ist. Ein Plugin kann die IR (`tokens`, `icons`), die CSS-Ausgabe (`css`) oder beides erweitern.

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

`buildTokens` und `toCss` führen `checkPlugins` über die Plugins aus, die du übergibst. Es warnt — es wirft nie — wenn ein Plugin keinen passenden Hook für die Phase hat, in der es registriert ist. Ein nur für Tokens vorgesehenes Plugin, das an `toCss` übergeben wird, wird daher mit einer Notiz übersprungen, anstatt stillschweigend nichts zu tun.

## Plugins zusammenstellen

Auf einem anderen Plugin aufbauen mit `extendPlugin`, oder Peers mit `mergePlugin` kombinieren:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks derselben Stufe werden zusammengesetzt: `tokens` führt zuerst die Basis und dann die Ergänzung aus, `css` verschmilzt die beiden Beiträge, und `icons` führt beide aus.

## Die Ausgabe deines Plugins validieren

Führe die gemeinsamen Drift-Checks aus `@pantoken/utils` über die eigene Ausgabe deines Plugins in dessen Test aus, so dass ein Tippfehler oder ein umbenanntes Token schnell und lokal fehlschlägt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Die mitgelieferten Plugins

- `@pantoken/plugin-simple-icons` — brandet Icons von simple-icons und registriert sie als Icon-Tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab Icons, registriert als `--instui-icon-*` Image-Tokens.
- `@pantoken/plugin-logos` — Instructure-Produktlogos als SVGs, Data-URIs und `--instui-logo-*` Image-Tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-Plugin (kein pantoken-Plugin), das ungenutzte Custom Properties aus einem Stylesheet entfernt.
- `@pantoken/plugin-custom-theme-colors` — rebranded eine Seite, indem ein Attribut gesetzt wird (`data-pantoken-color`) auf eine von 13 Paletten oder auf `custom` für beliebiges Marken-Hex. Siehe [Theme colors](#theme-colors).

Das Lucide-Lab-Registry kann lazy geladen und dann an den synchronen Token-Hook übergeben werden:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Einige Dinge, die früher Plugins waren, werden jetzt in `@pantoken/components` ausgeliefert, da so viele Komponenten sie standardmäßig benötigen: Elevation-Schatten (`--instui-elevation-*`, in `components.css`), der Focus-Outline-Ring (in `base.css` — jede fokussierbare Komponente erhält ihn, wenn pantoken die Seite besitzt) und die Instructure-Markenfonts (Atkinson Hyperlegible Next: `base.css` wendet `--instui-font-family-base` an; das opt-in `@pantoken/components/fonts.css` lädt die `@font-face` woff2s).

## Theme-Farben {#theme-colors}

`@pantoken/plugin-custom-theme-colors` erzeugt einen `[data-pantoken-color="…"]` Block pro Palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Jeder Block richtet die Marken-Primitiven (`--instui-primitive-color-navy-*` und `-blue-*`)
auf die gewählte Palette aus. Er leitet außerdem die Markenflächen neu ab, die upstream auf literal Hex reduziert wurden, und bewahrt deren eingebackene Alpha-Werte durch `color-mix()`. Semantische Statusfarben, explizite blaue Akzente und Elevation-Schatten bleiben erhalten. Probiere es in der
[Swatch-basierten Theming-Demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Benutzerdefinierte Markenfarbe

Setze `data-pantoken-color="custom"` um von einem beliebigen Hex zu rebranden, beispielsweise die Primärfarbe, die ein Canvas-Admin in den Theme-Editor eingibt. pantoken leitet daraus eine vollständige 10–200 `--instui-primitive-color-custom-*` Skala ab:

1. **Referenzkurve.** Das Ziel für die Helligkeit jedes Schrittes ist der durchschnittliche OKLCH-Helligkeitswert der 13 Paletten an diesem Schritt, wobei 0 auf Weiß und 210 auf Schwarz festgelegt ist. Dadurch stimmt der Abstand der benutzerdefinierten Skala mit den ausgelieferten Paletten überein.
2. **Anker.** Die Eingabe landet auf dem Schritt, dessen Zielhelligkeit der eigenen am nächsten ist, und schnappt auf genau diese Helligkeit. `#cccccc` wird zu `custom-40` bei `#c9c9c9`: nahe an der Eingabe, aber nicht immer identisch. „Nächster“ bedeutet der nächstgelegene Schritt auf der Kurve, nicht die nächstliegende Farbe einer bestehenden Palette.
3. **Auffüllen.** Jeder andere Schritt behält die Eingabe-Hue. Die Sättigung folgt der durchschnittlichen Sättigungskurve der Paletten relativ zum Anker und wird nur dort reduziert, wo eine Farbe außerhalb von sRGB fällt.

Akzeptiert werden nur `#rgb` und `#rrggbb`; alles andere wirft eine `TypeError`, sodass ein Hex aus einem Formular kein CSS injizieren kann.

Zur Build-Zeit wird die gesamte Regel mit den bereits deklarierten abgeleiteten Primitiven ausgegeben:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Um die Farbe zur Laufzeit auszuwählen, ohne das Token-Set auszuliefern, präkalkuliere die Kurve und die Remap-Regel zur Build-Zeit. Verwende dann den abhängigkeitfreien `/scale` Eintrag im Browser und setze nur die 20 abgeleiteten Primitiven:

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

Der Theme-Picker der Doku-Site, der Canvas Theme Editor und das obige Demo funktionieren alle auf diese Weise.

Siehe die [API-Referenz](/api/) für die Exporte jedes Plugins.
