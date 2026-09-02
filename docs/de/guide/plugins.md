# Plugins

Ein pantoken-Plugin erweitert die Token- oder CSS-Ausgabe, ohne ein Paket zu forken. Du erstellst eines mit
`definePlugin` aus `@pantoken/plugin-kit` und übergibst es dann an `buildTokens` oder `toCss`.

## Ein Plugin erstellen

Gib `definePlugin` die Hooks, die du implementierst. Es gibt ein normales Plugin zurück, gekennzeichnet mit den
Fähigkeiten, die aus diesen Hooks abgeleitet werden. Ein Plugin kann das IR erweitern (`tokens`, `icons`), die CSS-
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
wenn ein Plugin keinen passenden Hook für die Phase hat, in der es registriert wurde, sodass ein nur für Tokens
gedachtes Plugin, das an `toCss` übergeben wird, mit einer Notiz übersprungen wird, anstatt stillschweigend nichts zu tun.

## Plugins zusammenstellen

Baue auf einem anderen Plugin mit `extendPlugin` auf, oder kombiniere Peers mit `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks derselben Phase komponieren: `tokens` führt zuerst die Basis und dann die Ergänzung aus, `css`
verschmilzt die beiden Beiträge, und `icons` führt beide aus.

## Die Ausgabe deines Plugins validieren

Führe die gemeinsamen Drift-Checks von `@pantoken/utils` über die Ausgabe deines Plugins in dessen Test aus, damit ein
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

- `@pantoken/plugin-simple-icons` — brandet Icons aus simple-icons und registriert sie als Icon-Tokens.
- `@pantoken/plugin-logos` — Instructure-Produktlogos als SVGs, Data-URIs und `--instui-logo-*`
  Bild-Tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-Plugin (kein pantoken-Plugin), das ungenutzte Custom Properties aus einem Stylesheet entfernt.

Einige Dinge, die früher Plugins waren, werden jetzt in `@pantoken/components` ausgeliefert, da so viele Komponenten
sie von Haus aus benötigen: Elevation-Schatten (`--instui-elevation-*`, in `components.css`), der Fokus-Outline-
Ring (in `base.css` — jedes fokussierbare Element erhält ihn, wenn pantoken die Seite besitzt) und die Instructure-Brand-
Schriften (Atkinson Hyperlegible Next: `base.css` wendet `--instui-font-family-base` an; das optional aktivierbare
`@pantoken/components/fonts.css` lädt die `@font-face` woff2s).

Siehe die [API-Referenz](/api/) für die Exporte jedes Plugins.
