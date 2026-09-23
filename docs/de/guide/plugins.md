# Plugins

Ein pantoken-Plugin erweitert die Token- oder CSS-Ausgabe, ohne ein Paket zu forken. Es wird mit
`definePlugin` aus `@pantoken/plugin-kit` erstellt und dann an `buildTokens` oder `toCss` übergeben.

## Ein Plugin erstellen

Gib `definePlugin` die Hooks, die du implementierst. Es gibt ein normales Plugin zurück, das mit den
Fähigkeiten gebrandet ist, die aus diesen Hooks abgeleitet werden. Ein Plugin kann das IR (`tokens`, `icons`), die CSS-
Ausgabe (`css`) oder beides erweitern.

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

`buildTokens` und `toCss` führen `checkPlugins` über die Plugins aus, die du übergibst. Es warnt — es wirft niemals —
wenn ein Plugin keinen passenden Hook für die Stage hat, in der es registriert wurde; ein token-only Plugin, das an `toCss` übergeben wird,
wird mit einem Hinweis übersprungen, anstatt stillschweigend nichts zu tun.

## Plugins zusammenfügen

Auf einem anderen Plugin aufbauen mit `extendPlugin`, oder Peers mit `mergePlugin` kombinieren:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks derselben Stage komponieren: `tokens` führt zuerst das Basis- dann das Zusatz-Plugin aus, `css` führt die beiden
Beiträge zusammen, und `icons` führt beide aus.

## Die Ausgabe deines Plugins validieren

Führe die gemeinsamen Drift-Checks aus `@pantoken/utils` über die eigene Ausgabe deines Plugins in dessen Test aus, damit ein
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

- `@pantoken/plugin-simple-icons` — brand icons aus simple-icons, registriert als Icon-Tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab Icons, registriert als `--instui-icon-*` Image-Tokens.
- `@pantoken/plugin-logos` — Instructure-Produktlogos als SVGs, Data-URIs und `--instui-logo-*`
  Image-Tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-Plugin (kein pantoken-Plugin), das ungenutzte Custom Properties aus einem Stylesheet entfernt.

Lucide Labs Registry kann lazy geladen und dann an den synchronen Token-Hook übergeben werden:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Einige Dinge, die früher Plugins waren, werden jetzt in `@pantoken/components` ausgeliefert, da so viele Komponenten
sie standardmäßig benötigen: Elevation Shadows (`--instui-elevation-*`, in `components.css`), der Focus-Outline
Ring (in `base.css` — jedes fokusierbare Element erhält ihn, wenn pantoken die Seite steuert), und die Instructure-Brand-Schriftarten
(Atkinson Hyperlegible Next: `base.css` wendet `--instui-font-family-base` an; das opt-in
`@pantoken/components/fonts.css` lädt die `@font-face` woff2s).

Siehe die [API-Referenz](/api/) für die Exports jedes Plugins.
